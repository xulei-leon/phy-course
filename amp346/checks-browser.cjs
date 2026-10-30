/* Maintenance-only Chromium verification. Uses file URLs and request interception; no server.
 * node amp346/checks-browser.cjs /absolute/path/to/playwright [chromium-executable]
 */
const {chromium}=require(process.argv[2]||'playwright');
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),os=require('node:os');
const {pathToFileURL,fileURLToPath}=require('node:url');
const root=__dirname,out=fs.mkdtempSync(path.join(os.tmpdir(),'amp346-browser-'));
const entry=id=>id?`chapter-${String(id).padStart(2,'0')}.html`:'index.html';
(async()=>{
 const browser=await chromium.launch({headless:true,...(process.argv[3]?{executablePath:process.argv[3]}:{})});
 const context=await browser.newContext({viewport:{width:1440,height:1000},offline:true,reducedMotion:"reduce"});
 const page=await context.newPage(),errors=[],external=[],failed=[];let loaded=0,controls=0;
 page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});page.on('request',r=>{if(/^https?:/.test(r.url()))external.push(r.url());});page.on('requestfailed',r=>failed.push(r.url()));
 try{
 for(const lang of ['zh','en'])for(let id=0;id<=8;id++){
  await page.goto(pathToFileURL(path.join(root,entry(id))).href+'?lang='+lang);loaded++;
  await page.waitForFunction(()=>document.querySelector('h1'));
  assert.ok((await page.title()).includes('APM346'));assert.equal(await page.locator('html').getAttribute('lang'),lang==='zh'?'zh-CN':'en');
  assert.equal(await page.locator('.chapter-link').count(),8);assert.equal(await page.locator('.katex-error').count(),0);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`desktop overflow ${id} ${lang}`);
  const ids=await page.locator('[id]').evaluateAll(es=>es.map(e=>e.id));assert.equal(new Set(ids).size,ids.length,'duplicate element IDs');
  for(const href of await page.locator('a[href*="courseware/"]').evaluateAll(es=>es.map(e=>e.href)))assert.ok(fs.existsSync(fileURLToPath(href)),href);
  assert.deepEqual(await page.locator('a[href^="#"]').evaluateAll(es=>es.filter(e=>!document.querySelector(e.getAttribute('href'))).map(e=>e.getAttribute('href'))),[]);
  if(!id){assert.equal(await page.locator('.contents-row').count(),8);if(lang==='zh')await page.screenshot({path:path.join(out,'home-desktop.png')});continue;}
  assert.equal(await page.locator('.learning-section').count(),6);assert.equal(await page.locator('.quiz-item').count(),3);
  while(await page.locator('.derivation-step[hidden]').count())await page.locator('.reveal').click();
  assert.equal(await page.locator('.katex-error').count(),0);
  await page.locator('#quiz-form button').click();assert.equal(await page.locator('.quiz-feedback:not([hidden])').count(),3);
  const answers=await page.evaluate(id=>PHY.chapters[id-1].quizzes.map(q=>q.answer),id);
  for(let i=0;i<answers.length;i++)await page.locator(`input[name=q${i}][value="${answers[i]}"]`).check();
  await page.locator('#quiz-form button').click();assert.ok((await page.locator('#quiz-score').innerText()).includes('3 / 3'));
  await page.locator(`input[name=q0][value="${(answers[0]+1)%3}"]`).check();await page.locator('#quiz-form button').click();assert.ok((await page.locator('#quiz-score').innerText()).includes('2 / 3'));
  const labs=await page.evaluate(id=>PHY.chapters[id-1].labs.map(key=>({key,controls:PHY_LABS[key].controls})),id);
  for(const lab of labs){
   const scope=page.locator('#experiment-'+lab.key);
   for(const c of lab.controls){
    if(c.options){for(const [v] of c.options){await scope.locator(`[data-key="${c.key}"]`).selectOption(v);controls++;}}
    else{
     const input=scope.locator(`[data-number="${c.key}"]`);assert.equal(await input.evaluate(e=>e.validity.valid),true,`invalid default ${lab.key} ${c.key}`);
     for(const value of [c.min,c.max]){await input.fill(String(value));controls++;assert.equal(await scope.locator(`[data-key="${c.key}"]`).inputValue(),String(value));}
     const before=await scope.locator('.readings').innerText();await input.fill(String(c.max+100));assert.equal(await input.getAttribute('aria-invalid'),'true');assert.equal(await scope.locator('.readings').innerText(),before);
     assert.equal(await scope.locator('.lab-validation').isVisible(),true);await input.fill(String(c.min+c.step/2));assert.equal(await input.getAttribute('aria-invalid'),'true');assert.equal(await scope.locator('.readings').innerText(),before);await input.fill('');assert.equal(await input.getAttribute('aria-invalid'),'true');assert.equal(await scope.locator('.readings').innerText(),before);await input.fill(String(c.value));
    }
   }
   assert.equal(await scope.locator('.readings').innerText().then(t=>/NaN|Infinity|undefined/.test(t)),false);
   assert.equal(await scope.locator('svg path').evaluateAll(es=>es.some(e=>/NaN|Infinity/.test(e.getAttribute('d')||''))),false);
  }
  // Multiple independent experiments must retain both state and feedback when switching language.
  const values=await page.locator('[data-key]').evaluateAll(es=>es.map(e=>e.value)),paths=await page.locator('svg path[stroke-width="2.5"]').evaluateAll(es=>es.map(e=>e.getAttribute('d')));
  await page.locator(lang==='zh'?'#en':'#zh').click();
  assert.deepEqual(await page.locator('[data-key]').evaluateAll(es=>es.map(e=>e.value)),values);assert.deepEqual(await page.locator('svg path[stroke-width="2.5"]').evaluateAll(es=>es.map(e=>e.getAttribute('d'))),paths);
  assert.equal(await page.locator('input[type=radio]:checked').count(),3);assert.ok((await page.locator('#quiz-score').innerText()).includes('2 / 3'));assert.equal(await page.locator('.derivation-step[hidden]').count(),0);assert.equal(await page.locator('.katex-error').count(),0);
  for(const href of await page.locator('[data-course-link]').evaluateAll(es=>es.map(e=>e.href))){assert.ok(fs.existsSync(fileURLToPath(href)));assert.equal(new URL(href).searchParams.get('lang'),lang==='zh'?'en':'zh');}
  for(const lab of labs){const scope=page.locator('#experiment-'+lab.key);await scope.locator('.reset-lab').click();for(const c of lab.controls)assert.equal(await scope.locator(`[data-key="${c.key}"]`).inputValue(),String(c.options?c.options[0][0]:c.value));
   const c=lab.controls.find(c=>!c.options);if(c){const range=scope.locator(`[data-key="${c.key}"]`),value=await range.inputValue();await range.focus();await range.press(value===String(c.max)?'ArrowLeft':'ArrowRight');assert.notEqual(await range.inputValue(),value);assert.equal(await range.inputValue(),await scope.locator(`[data-number="${c.key}"]`).inputValue());}
  }
 }
 // Inspect an actual singularity branch and no-circle state in the rendered SVG.
 await page.goto(pathToFileURL(path.join(root,entry(3))).href+'?lang=en');
 const chars=page.locator('#experiment-characteristics');await chars.locator('select').selectOption('rational');await chars.locator('[data-number=C]').fill('-1');
 const d=await chars.locator('svg path[stroke-width="2.5"]').first().getAttribute('d');assert.ok((d.match(/M/g)||[]).length>=3,'rational branches bridged');
 await page.locator('#experiment-characteristics').scrollIntoViewIfNeeded();await page.screenshot({path:path.join(out,'characteristics-desktop.png')});
 await chars.locator('select').selectOption('circle');assert.ok((await chars.locator('.lab-message').innerText()).includes('no real circle'));
 await page.goto(pathToFileURL(path.join(root,entry(8))).href+'?lang=en');await page.locator('#experiment-kernel .lab-figure').first().evaluate(e=>e.scrollIntoView({block:'center'}));await page.screenshot({path:path.join(out,'heat-desktop.png')});
 // Actual next/back links carry language; the last page returns to contents.
 await page.locator('.pager .primary').click();assert.ok(page.url().includes('index.html'));assert.equal(await page.locator('html').getAttribute('lang'),'en');await page.locator('.start-link').click();assert.ok(page.url().includes('chapter-01.html'));await page.locator('.pager .primary').click();assert.ok(page.url().includes('chapter-02.html'));
 // Responsive sweeps, both languages, and mobile menu keyboard behavior.
 await page.setViewportSize({width:390,height:844});
 for(const lang of ['zh','en'])for(let id=0;id<=8;id++){
  await page.goto(pathToFileURL(path.join(root,entry(id))).href+'?lang='+lang);loaded++;
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`mobile overflow ${id} ${lang}`);
  await page.locator('#menu').click();assert.equal(await page.locator('#menu').getAttribute('aria-expanded'),'true');await page.keyboard.press('Escape');assert.equal(await page.locator('#menu').getAttribute('aria-expanded'),'false');assert.equal(await page.locator('#menu').evaluate(e=>e===document.activeElement),true);
  if(id){await page.locator('#step-4').scrollIntoViewIfNeeded();assert.equal(await page.locator('.chart-scroller').evaluateAll(es=>es.every(e=>e.scrollWidth>=e.clientWidth)),true);}
  if(id===5&&lang==='zh'){await page.locator('.lab-figure').first().evaluate(e=>e.scrollIntoView({block:'center'}));await page.screenshot({path:path.join(out,'wave-mobile.png')});}
 }
 await page.setViewportSize({width:320,height:740});for(let id=0;id<=8;id++){await page.goto(pathToFileURL(path.join(root,entry(id))).href+'?lang=en');assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`320px overflow ${id}`);}
 // No storage access must not break language switching.
 const blocked=await browser.newContext({offline:true});await blocked.addInitScript(()=>Object.defineProperty(window,'localStorage',{get(){throw new Error('storage disabled');}}));const bp=await blocked.newPage();await bp.goto(pathToFileURL(path.join(root,entry(1))).href);await bp.locator('#en').click();assert.equal(await bp.locator('html').getAttribute('lang'),'en');await blocked.close();
 // Simulate GitHub Pages repository subpaths through interception, without starting a server.
 const hosted=await browser.newContext();await hosted.route('https://course.invalid/**',async route=>{
  const url=new URL(route.request().url()),rel=decodeURIComponent(url.pathname.replace(/^\/phy-course\//,'')),file=path.resolve(root,'..',rel);
  if(!file.startsWith(path.resolve(root,'..')+path.sep)||file.includes('/courseware/'))return route.abort();
  const contentType={'.html':'text/html','.js':'text/javascript','.css':'text/css','.woff2':'font/woff2','.woff':'font/woff','.ttf':'font/ttf'}[path.extname(file)]||'application/octet-stream';await route.fulfill({body:fs.readFileSync(file),contentType});
 });
 const hp=await hosted.newPage();hp.on('pageerror',e=>errors.push(e.message));
 await hp.goto('https://course.invalid/phy-course/index.html');await hp.locator('a[href="amp346/index.html"]').click();assert.ok(hp.url().includes('/phy-course/amp346/index.html'));
 for(let id=0;id<=8;id++){await hp.goto('https://course.invalid/phy-course/amp346/'+entry(id)+'?lang=en');assert.ok((await hp.title()).includes('APM346'));assert.equal(await hp.locator('a[href*="courseware/"]').count(),0);assert.equal(await hp.locator('.katex-error').count(),0);for(const href of await hp.locator('[data-course-link]').evaluateAll(es=>es.map(e=>e.href)))assert.ok(new URL(href).pathname.startsWith('/phy-course/amp346/'));}await hosted.close();
 assert.deepEqual(errors,[]);assert.deepEqual(external,[]);assert.deepEqual(failed,[]);
 console.log(`PASS: ${loaded} desktop/phone file-page loads plus 9 narrow pages; ${controls} control changes; all quizzes, derivations, state/language, keyboard/reset/invalid inputs, rational branch breaks, source links, no overflow, no errors or network requests, blocked storage and hosted-subpath checks. Screenshots: ${out}`);
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
