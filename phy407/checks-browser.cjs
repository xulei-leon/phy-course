/* Real-browser maintenance QA. No server is started.
 * node phy407/checks-browser.cjs /absolute/path/to/playwright [chromium-executable]
 * Run only in an environment that permits local-file browser automation.
 * This is independent of checks-dom.cjs and includes actual layout/network checks.
 */
const {chromium}=require(process.argv[2]||'playwright');
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),os=require('node:os');
const {pathToFileURL,fileURLToPath}=require('node:url');
const root=__dirname,output=fs.mkdtempSync(path.join(os.tmpdir(),'phy407-browser-'));
(async()=>{
 const browser=await chromium.launch({headless:true,...(process.argv[3]?{executablePath:process.argv[3]}:{})});
 const context=await browser.newContext({viewport:{width:1440,height:1000},offline:true});
 const page=await context.newPage(),errors=[],external=[];let loads=0,controls=0;
 page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});page.on('request',r=>{if(/^https?:/.test(r.url()))external.push(r.url());});
 const open=async(id,lang)=>{await page.goto(pathToFileURL(path.join(root,id?`chapter-${String(id).padStart(2,'0')}.html`:'index.html')).href+'?lang='+lang);await page.waitForSelector('h1');loads++;};
 try{
 for(const lang of ['zh','en'])for(let id=0;id<=17;id++){
  await open(id,lang);assert.ok((await page.title()).includes('PHY407'));assert.equal(await page.locator('html').getAttribute('lang'),lang==='zh'?'zh-CN':'en');
  assert.equal(await page.locator('.chapter-link').count(),17);assert.equal(await page.locator('.katex-error').count(),0);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`desktop overflow ${id} ${lang}`);
  if(!id){assert.equal(await page.locator('.contents-row').count(),17);assert.equal(await page.locator('.study-overview a[href*="#project"]').count(),3);continue;}
  assert.equal(await page.locator('.learning-section').count(),6);assert.equal(await page.locator('.quiz-item').count(),6);assert.equal(await page.locator('#step-5 .topic').count(),2);
  while(await page.locator('.derivation-step[hidden]').count())await page.locator('.reveal').click();
  await page.locator('#quiz-form button').click();assert.ok((await page.locator('#quiz-score').innerText()).includes('0 / 5'));
  const questions=await page.evaluate(id=>PHY.chapters[id-1].quizzes,id);
  for(const [i,q]of questions.entries()){if(q.type==='choice')await page.locator(`input[name=q${i}][value="${q.answer}"]`).check();else if(q.type==='number')await page.locator(`input[name=q${i}]`).fill(String(q.value));else await page.locator(`textarea[name=q${i}]`).fill('My explanation');}
  await page.locator('#quiz-form button').click();assert.ok((await page.locator('#quiz-score').innerText()).includes('5 / 5'));
  await page.locator('input[name=q3]').fill('');await page.locator('#quiz-form button').click();assert.ok((await page.locator('#quiz-score').innerText()).includes('4 / 5'));assert.equal(await page.locator('input[name=q3]').getAttribute('aria-invalid'),'true');
  await page.locator(`input[name=q0][value="${(questions[0].answer+1)%3}"]`).check();await page.locator('#quiz-form button').click();assert.ok((await page.locator('#quiz-score').innerText()).includes('3 / 5'));
  const labs=await page.evaluate(id=>{const c=PHY.chapters[id-1];return [['experiment',c.lab],['study-experiment',c.extraLab],...(c.project?[['project-experiment',c.project.id]]:[])].map(([id,key])=>({id,controls:PHY_LABS[key].controls}));},id);
  for(const lab of labs){const scope=page.locator('#'+lab.id);for(const c of lab.controls){
   if(c.options){for(const [v]of c.options){await scope.locator(`[data-key="${c.key}"]`).selectOption(v);controls++;}}
   else{const input=scope.locator(`[data-number="${c.key}"]`);assert.equal(await input.evaluate(el=>el.validity.valid),true);for(const v of [c.min,c.max]){await input.fill(String(v));controls++;assert.equal(await input.getAttribute('aria-invalid'),'false');}
    const before=await scope.locator('.readings').innerText();await input.fill(String(c.max+100));assert.equal(await input.getAttribute('aria-invalid'),'true');assert.equal(await scope.locator('.readings').innerText(),before);await input.fill('');assert.equal(await input.getAttribute('aria-invalid'),'true');await input.fill(String(c.value));}
  }
  await scope.locator('.lab-actions button').last().click();assert.equal(await scope.locator('.lab-records article').count(),1);
  assert.equal(await scope.locator('.readings').innerText().then(v=>/NaN|Infinity|undefined/.test(v)),false);
  await scope.locator('.reset-lab').click();assert.equal(await scope.locator('.lab-records article').count(),0);
  const first=lab.controls.find(c=>!c.options);if(first){const range=scope.locator(`[data-key="${first.key}"]`),old=await range.inputValue();await range.focus();await range.press(old===String(first.max)?'ArrowLeft':'ArrowRight');assert.notEqual(await range.inputValue(),old);assert.equal(await range.inputValue(),await scope.locator(`[data-number="${first.key}"]`).inputValue());}
  }
  await page.locator('.answer-stages details > summary').first().click();await page.locator('#study-experiment .lab-actions button').last().click();
  const values=await page.locator('[data-key]').evaluateAll(es=>es.map(e=>e.value));await page.locator(lang==='zh'?'#en':'#zh').click();assert.deepEqual(await page.locator('[data-key]').evaluateAll(es=>es.map(e=>e.value)),values);assert.equal(await page.locator('textarea[name=q5]').inputValue(),'My explanation');assert.equal(await page.locator('.answer-stages details').first().getAttribute('open'),'');assert.equal(await page.locator('#study-experiment .lab-records article').count(),1);assert.ok((await page.locator('#quiz-score').innerText()).includes('3 / 5'));
  assert.equal(await page.locator('.katex-error').count(),0);assert.equal(await page.locator('.derivation-step[hidden]').count(),0);
  assert.equal(await page.locator('[id]').evaluateAll(es=>new Set(es.map(e=>e.id)).size===es.length),true);
  for(const href of await page.locator('[data-course-link]').evaluateAll(es=>es.map(e=>e.href))){assert.ok(fs.existsSync(fileURLToPath(href)));assert.equal(new URL(href).searchParams.get('lang'),lang==='zh'?'en':'zh');}
  assert.deepEqual(await page.locator('a[href^="#"]').evaluateAll(es=>es.filter(e=>!document.querySelector(e.getAttribute('href'))).map(e=>e.getAttribute('href'))),[]);
 }
 for(const id of [7,12,16,17]){await open(id,'en');await page.locator('#study-experiment').scrollIntoViewIfNeeded();await page.screenshot({path:path.join(output,`study-${id}-desktop.png`)});}
 await page.setViewportSize({width:390,height:844});
 for(const lang of ['zh','en'])for(let id=0;id<=17;id++){await open(id,lang);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`phone overflow ${id} ${lang}`);await page.locator('#menu').click();await page.keyboard.press('Escape');assert.equal(await page.locator('#menu').getAttribute('aria-expanded'),'false');assert.equal(await page.locator('#menu').evaluate(e=>e===document.activeElement),true);}
 await open(17,'zh');await page.locator('.lab-heatmaps').first().scrollIntoViewIfNeeded();await page.screenshot({path:path.join(output,'fft-mobile.png')});
 await page.setViewportSize({width:320,height:740});await open(17,'en');assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
 const blocked=await browser.newContext({offline:true});await blocked.addInitScript(()=>Object.defineProperty(window,'localStorage',{get(){throw Error('disabled')}}));const bp=await blocked.newPage();await bp.goto(pathToFileURL(path.join(root,'chapter-01.html')).href);await bp.locator('#en').click();assert.equal(await bp.locator('html').getAttribute('lang'),'en');await blocked.close();
 // Hosted subpath simulation fulfills repository files in memory; it is not a real deployment.
 const hosted=await browser.newContext();await hosted.route('https://course.invalid/**',async route=>{const url=new URL(route.request().url()),rel=decodeURIComponent(url.pathname.replace(/^\/phy-course\//,'')),file=path.resolve(root,'..',rel),repo=path.resolve(root,'..');if(!file.startsWith(repo+path.sep)||file.split(path.sep).includes('courseware'))return route.abort();const ext=path.extname(file),contentType={'.html':'text/html','.js':'text/javascript','.css':'text/css','.woff2':'font/woff2','.woff':'font/woff','.ttf':'font/ttf'}[ext]||'application/octet-stream';await route.fulfill({body:fs.readFileSync(file),contentType});});
 const hp=await hosted.newPage();hp.on('pageerror',e=>errors.push(e.message));for(const file of ['index.html','chapter-01.html','chapter-17.html']){await hp.goto('https://course.invalid/phy-course/phy407/'+file+'?lang=en');assert.equal(await hp.locator('a[href*="courseware/"]').count(),0);for(const href of await hp.locator('[data-course-link]').evaluateAll(es=>es.map(e=>e.href)))assert.ok(new URL(href).pathname.startsWith('/phy-course/phy407/'));}await hosted.close();
 assert.deepEqual(errors,[]);assert.deepEqual(external,[]);console.log(`PASS: ${loads} real-browser page loads; ${controls} control changes, quizzes, language/state, layout, zero-network offline loads, blocked storage and hosted-subpath simulation. Screenshots: ${output}`);
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
