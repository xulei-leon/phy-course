/* Maintenance-only real-browser QA. Opens file URLs; never starts a server.
 * node phy407/checks-browser.cjs /absolute/path/to/playwright [chromium-executable]
 */
const {chromium}=require(process.argv[2]||'playwright');
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),os=require('node:os');
const {pathToFileURL,fileURLToPath}=require('node:url');
const root=__dirname,output=fs.mkdtempSync(path.join(os.tmpdir(),'phy407-browser-'));
(async()=>{
 const browser=await chromium.launch({headless:true,...(process.argv[3]?{executablePath:process.argv[3]}:{})});
 const context=await browser.newContext({viewport:{width:1440,height:1000},offline:true});
 const page=await context.newPage(),errors=[],external=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});page.on('request',r=>{if(/^https?:/.test(r.url()))external.push(r.url());});
 let controls=0,loaded=0;
 try{
 for(const lang of ['zh','en'])for(let id=0;id<=17;id++){
  const name=id?`chapter-${String(id).padStart(2,'0')}.html`:'index.html';
  await page.goto(pathToFileURL(path.join(root,name)).href+'?lang='+lang);loaded++;
  await page.waitForFunction(()=>document.querySelector('h1'));
  assert.ok((await page.title()).includes('PHY407'));assert.equal(await page.locator('html').getAttribute('lang'),lang==='zh'?'zh-CN':'en');
  assert.equal(await page.locator('.chapter-link').count(),17);assert.equal(await page.locator('.katex-error').count(),0);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`desktop overflow ${id} ${lang}`);
  if(id===0){assert.equal(await page.locator('.contents-row').count(),17);if(lang==='zh')await page.screenshot({path:path.join(output,'home-desktop.png')});continue;}
  assert.equal(await page.locator('.learning-section').count(),6);assert.equal(await page.locator('.quiz-item').count(),3);assert.equal(await page.locator('pre code').count(),1);
  while(await page.locator('.derivation-step[hidden]').count())await page.locator('.reveal').click();
  await page.locator('#quiz-form button').click();assert.equal(await page.locator('.quiz-feedback:not([hidden])').count(),3);
  const answers=await page.evaluate(id=>PHY.chapters[id-1].quizzes.map(q=>q.answer),id);
  for(let i=0;i<answers.length;i++)await page.locator(`input[name=q${i}][value="${answers[i]}"]`).check();
  await page.locator('#quiz-form button').click();assert.ok((await page.locator('#quiz-score').innerText()).includes('3 / 3'));
  await page.locator(`input[name=q0][value="${(answers[0]+1)%3}"]`).check();await page.locator('#quiz-form button').click();assert.ok((await page.locator('#quiz-score').innerText()).includes('2 / 3'));
  const defs=await page.evaluate(id=>PHY_LABS['ch'+id].controls,id);
  for(const c of defs){
   if(c.options){for(const [v] of c.options){await page.locator(`[data-key="${c.key}"]`).selectOption(v);controls++;}}
   else{
    const input=page.locator(`[data-number="${c.key}"]`);assert.equal(await input.evaluate(el=>el.validity.valid),true,`invalid default ${id} ${c.key}`);
    for(const value of [c.min,c.max]){await input.fill(String(value));controls++;assert.equal(await page.locator(`[data-key="${c.key}"]`).inputValue(),String(value));}
    const before=await page.locator('.readings').innerText();await input.fill(String(c.max+100));assert.equal(await input.getAttribute('aria-invalid'),'true');assert.equal(await page.locator('.readings').innerText(),before);
    await input.fill('');assert.equal(await input.getAttribute('aria-invalid'),'true');assert.equal(await page.locator('.readings').innerText(),before);await input.fill(String(c.value));
   }
  }
  assert.equal(await page.locator('.readings').innerText().then(t=>/NaN|Infinity|undefined/.test(t)),false);
  assert.equal(await page.locator('svg path').evaluateAll(es=>es.some(e=>/NaN|Infinity/.test(e.getAttribute('d')||''))),false);
  const values=await page.locator('[data-key]').evaluateAll(es=>es.map(e=>e.value));
  await page.locator(lang==='zh'?'#en':'#zh').click();
  assert.deepEqual(await page.locator('[data-key]').evaluateAll(es=>es.map(e=>e.value)),values);
  assert.equal(await page.locator('input[type=radio]:checked').count(),3);assert.ok((await page.locator('#quiz-score').innerText()).includes('2 / 3'));
  assert.equal(await page.locator('.derivation-step[hidden]').count(),0);assert.equal(await page.locator('.katex-error').count(),0);
  for(const href of await page.locator('[data-course-link]').evaluateAll(es=>es.map(e=>e.href))){assert.ok(fs.existsSync(fileURLToPath(href)));assert.equal(new URL(href).searchParams.get('lang'),lang==='zh'?'en':'zh');}
  const brokenAnchors=await page.locator('a[href^="#"]').evaluateAll(es=>es.filter(e=>!document.querySelector(e.getAttribute('href'))).map(e=>e.getAttribute('href')));assert.deepEqual(brokenAnchors,[]);
  for(const href of await page.locator('a[href*="courseware/"]').evaluateAll(es=>es.map(e=>e.href)))assert.ok(fs.existsSync(fileURLToPath(href)));
  await page.locator('.reset-lab').click();for(const c of defs)assert.equal(await page.locator(`[data-key="${c.key}"]`).inputValue(),String(c.options?c.options[0][0]:c.value));
  // A native range key action, rather than a synthetic event, changes a paired number.
  const first=defs.find(c=>!c.options);if(first){const range=page.locator(`[data-key="${first.key}"]`);const value=await range.inputValue();await range.focus();await range.press(value===String(first.max)?'ArrowLeft':'ArrowRight');assert.notEqual(await range.inputValue(),value);assert.equal(await range.inputValue(),await page.locator(`[data-number="${first.key}"]`).inputValue());}
 }
 // Language survives navigation through actual links.
 await page.goto(pathToFileURL(path.join(root,'chapter-16.html')).href+'?lang=en');await page.locator('.pager a.primary').click();assert.ok(page.url().includes('chapter-17.html'));assert.equal(await page.locator('html').getAttribute('lang'),'en');
 await page.locator('#step-4').scrollIntoViewIfNeeded();await page.screenshot({path:path.join(output,'fft-desktop.png')});
 await page.goto(pathToFileURL(path.join(root,'chapter-08.html')).href+'?lang=en');await page.locator('#step-4').scrollIntoViewIfNeeded();await page.screenshot({path:path.join(output,'difference-desktop.png')});
 // All pages, both languages, at a phone width; check layout and menu Escape.
 await page.setViewportSize({width:390,height:844});
 for(const lang of ['zh','en'])for(let id=0;id<=17;id++){
  await page.goto(pathToFileURL(path.join(root,id?`chapter-${String(id).padStart(2,'0')}.html`:'index.html')).href+'?lang='+lang);loaded++;
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`phone overflow ${id} ${lang}`);
  await page.locator('#menu').click();assert.equal(await page.locator('#menu').getAttribute('aria-expanded'),'true');await page.keyboard.press('Escape');assert.equal(await page.locator('#menu').getAttribute('aria-expanded'),'false');assert.equal(await page.locator('#menu').evaluate(e=>e===document.activeElement),true);
  if(id){await page.locator('#step-4').scrollIntoViewIfNeeded();assert.equal(await page.locator('.chart-scroller').evaluateAll(es=>es.every(e=>e.scrollWidth>=e.clientWidth)),true);}
  if(id===16&&lang==='zh')await page.screenshot({path:path.join(output,'sampling-mobile.png')});
 }
 await page.setViewportSize({width:320,height:740});await page.goto(pathToFileURL(path.join(root,'chapter-17.html')).href+'?lang=en');assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'320px overflow');
 // Storage unavailable: still load and switch language.
 const blocked=await browser.newContext({offline:true});await blocked.addInitScript(()=>Object.defineProperty(window,'localStorage',{get(){throw new Error('storage disabled')}}));const p=await blocked.newPage();await p.goto(pathToFileURL(path.join(root,'chapter-01.html')).href);await p.locator('#en').click();assert.equal(await p.locator('html').getAttribute('lang'),'en');await blocked.close();
 // Hosted subpath simulation via request interception, without a web server.
 const hosted=await browser.newContext();await hosted.route('https://course.invalid/**',async route=>{const url=new URL(route.request().url()),rel=decodeURIComponent(url.pathname.replace(/^\/phy-course\//,'')),file=path.resolve(root,'..',rel);if(!file.startsWith(path.resolve(root,'..')+path.sep)||file.includes('/courseware/'))return route.abort();const ext=path.extname(file),contentType={'.html':'text/html','.js':'text/javascript','.css':'text/css','.woff2':'font/woff2','.woff':'font/woff','.ttf':'font/ttf'}[ext]||'application/octet-stream';await route.fulfill({body:fs.readFileSync(file),contentType});});
 const hp=await hosted.newPage();hp.on('pageerror',e=>errors.push(e.message));for(const file of ['index.html','chapter-01.html','chapter-17.html']){await hp.goto('https://course.invalid/phy-course/phy407/'+file+'?lang=en');assert.ok((await hp.title()).includes('PHY407'));assert.equal(await hp.locator('a[href*="courseware/"]').count(),0);for(const href of await hp.locator('[data-course-link]').evaluateAll(es=>es.map(e=>e.href)))assert.ok(new URL(href).pathname.startsWith('/phy-course/phy407/'));}await hosted.close();
 assert.deepEqual(errors,[]);assert.deepEqual(external,[]);
 console.log(`PASS: ${loaded} file-page loads at desktop/phone widths; ${controls} control changes; correct/wrong/unanswered quizzes, language/state, native keyboard, reset, invalid inputs, formula rendering, no page overflow, offline zero-network loads, blocked storage and hosted-subpath simulation. Screenshots: ${output}`);
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
