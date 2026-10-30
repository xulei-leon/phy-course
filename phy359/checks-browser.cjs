/* Isolated browser QA: HTTPS requests are fulfilled from repository files.
 * No server, external network, file:// navigation or browser-policy bypass.
 * node phy359/checks-browser.cjs /absolute/path/to/playwright
 */
const {chromium}=require(process.argv[2]||'playwright');
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),os=require('node:os');
const root=__dirname,repo=path.resolve(root,'..'),output=process.env.PHY359_QA_OUTPUT||fs.mkdtempSync(path.join(os.tmpdir(),'phy359-browser-'));
fs.mkdirSync(output,{recursive:true});
const base='https://phy359.invalid/phy-course/phy359/';
const file=id=>id?`chapter-${String(id).padStart(2,'0')}.html`:'index.html';
(async()=>{
const browser=await chromium.launch({headless:true,...(process.argv[3]?{executablePath:process.argv[3]}:{})});let loaded=0,controls=0;
const errors=[],escaped=[],requests=[];
async function isolated(options={}){
 const context=await browser.newContext({viewport:{width:1440,height:1000},offline:true,reducedMotion:'reduce',...options});
 await context.route('**/*',async route=>{
  const u=new URL(route.request().url());requests.push(u.href);
  if(u.origin!=='https://phy359.invalid'||!u.pathname.startsWith('/phy-course/')){escaped.push(u.href);return route.abort();}
  const local=path.resolve(repo,decodeURIComponent(u.pathname.slice('/phy-course/'.length)));
  if(!local.startsWith(repo+path.sep)||local.includes('/courseware/')||!fs.existsSync(local)){escaped.push(u.href);return route.abort();}
  const type={'.html':'text/html','.js':'text/javascript','.css':'text/css','.woff2':'font/woff2','.woff':'font/woff','.ttf':'font/ttf','.md':'text/plain'}[path.extname(local)]||'application/octet-stream';
  await route.fulfill({body:fs.readFileSync(local),contentType:type});
 });return context;
}
try{
const context=await isolated(),page=await context.newPage();
page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
for(const lang of ['zh','en'])for(let id=0;id<=16;id++){
 await page.goto(base+file(id)+'?lang='+lang);loaded++;await page.waitForFunction(()=>document.querySelector('h1'));
 assert.ok((await page.title()).includes('PHY359'));assert.equal(await page.locator('html').getAttribute('lang'),lang==='zh'?'zh-CN':'en');
 assert.equal(await page.locator('.chapter-link').count(),16);assert.equal(await page.locator('.katex-error').count(),0);
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`desktop overflow ${id} ${lang}`);
 assert.equal(await page.locator('a[href*="courseware/"]').count(),0);
 if(!id){assert.equal(await page.locator('.contents-row').count(),16);if(lang==='zh')await page.screenshot({path:path.join(output,'home-desktop.png')});continue;}
 assert.equal(await page.locator('.learning-section').count(),6);assert.equal(await page.locator('.quiz-item').count(),2);
 assert.ok(await page.locator('.study-panel').count()>=8,'self-study panels must exist');
 assert.equal(await page.locator('.study-panel[open]').count(),0,'compact default');
 const foundationSummary=page.locator('#foundation > summary');await foundationSummary.focus();await foundationSummary.press('Enter');assert.equal(await page.locator('#foundation').getAttribute('open'),'');await foundationSummary.press('Enter');
 await page.locator('#study-expand').click();assert.equal(await page.locator('.study-panel:not([open])').count(),0);assert.equal(await page.locator('.study-answer[open]').count(),0,'bulk expand must not disclose answers');assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'expanded desktop overflow');
 const hint=page.locator('.study-hint').first();await hint.locator('summary').click();const solution=page.locator('.study-answer').first();await solution.locator('summary').click();
 const panelState=await page.locator('.study-panel').evaluateAll(es=>es.map(e=>e.open));
 await page.locator(lang==='zh'?'#en':'#zh').click();assert.deepEqual(await page.locator('.study-panel').evaluateAll(es=>es.map(e=>e.open)),panelState);assert.equal(await hint.getAttribute('open'),'');assert.equal(await solution.getAttribute('open'),'');
 await page.locator('#study-collapse').click();assert.equal(await page.locator('.study-panel[open]').count(),0);
 await page.locator(lang==='zh'?'#zh':'#en').click();
 while(await page.locator('.derivation-step[hidden]').count())await page.locator('.reveal').click();
 await page.locator('#quiz-form button').click();assert.equal(await page.locator('.quiz-feedback:not([hidden])').count(),2);assert.ok((await page.locator('#quiz-score').innerText()).includes('0 / 2'));
 const answers=await page.evaluate(id=>PHY.chapters[id-1].quizzes.map(q=>q.answer),id);
 for(let i=0;i<answers.length;i++)await page.locator(`input[name=q${i}][value="${answers[i]}"]`).check();
 await page.locator('#quiz-form button').click();assert.ok((await page.locator('#quiz-score').innerText()).includes('2 / 2'));
 const optionCount=await page.locator('input[name=q0]').count();await page.locator(`input[name=q0][value="${(answers[0]+1)%optionCount}"]`).check();await page.locator('#quiz-form button').click();assert.ok((await page.locator('#quiz-score').innerText()).includes('1 / 2'));
 const defs=await page.evaluate(id=>PHY_LABS[String(id)].controls,id);
 for(const c of defs){
  if(c.options){for(const [v] of c.options){await page.locator(`[data-key="${c.key}"]`).selectOption(v);controls++;}}
  else{
   const input=page.locator(`[data-number="${c.key}"]`);assert.equal(await input.evaluate(e=>e.validity.valid),true,`default ${id} ${c.key}`);
   for(const value of [c.min,c.max]){await input.fill(String(value));controls++;assert.equal(await page.locator(`[data-key="${c.key}"]`).inputValue(),String(value));}
   const before=await page.locator('.readings').innerText();await input.fill(String(c.max+100));assert.equal(await input.getAttribute('aria-invalid'),'true');assert.equal(await page.locator('.input-error').isVisible(),true);assert.equal(await page.locator('.readings').innerText(),before);
   await input.fill('');assert.equal(await input.getAttribute('aria-invalid'),'true');assert.equal(await page.locator('.readings').innerText(),before);await input.fill(String(c.value));assert.equal(await input.getAttribute('aria-invalid'),'false');assert.equal(await page.locator('.input-error').isVisible(),false);
  }
 }
 assert.equal(/NaN|Infinity|undefined/.test(await page.locator('.readings').innerText()),false);
 assert.equal(await page.locator('svg path').evaluateAll(es=>es.some(e=>/NaN|Infinity/.test(e.getAttribute('d')||''))),false);
 const values=await page.locator('[data-key]').evaluateAll(es=>es.map(e=>e.value));await page.locator(lang==='zh'?'#en':'#zh').click();
 assert.deepEqual(await page.locator('[data-key]').evaluateAll(es=>es.map(e=>e.value)),values);assert.equal(await page.locator('input[type=radio]:checked').count(),2);assert.ok((await page.locator('#quiz-score').innerText()).includes('1 / 2'));assert.equal(await page.locator('.derivation-step[hidden]').count(),0);assert.equal(await page.locator('.katex-error').count(),0);
 assert.equal(await page.locator('[data-zh]').evaluateAll((es,l)=>es.every(e=>e.textContent===e.dataset[l]),lang==='zh'?'en':'zh'),true,`translation state ${id}`);
 for(const href of await page.locator('[data-course-link]').evaluateAll(es=>es.map(e=>e.href))){assert.ok(new URL(href).pathname.startsWith('/phy-course/phy359/'));assert.ok(fs.existsSync(path.join(root,path.basename(new URL(href).pathname))));assert.equal(new URL(href).searchParams.get('lang'),lang==='zh'?'en':'zh');}
 assert.deepEqual(await page.locator('a[href^="#"]').evaluateAll(es=>es.filter(e=>!document.querySelector(e.getAttribute('href'))).map(e=>e.href)),[]);
 await page.locator('.reset-lab').click();for(const c of defs)assert.equal(await page.locator(`[data-key="${c.key}"]`).inputValue(),String(c.options?c.options[0][0]:c.value));
 const first=defs.find(c=>!c.options);if(first){const range=page.locator(`[data-key="${first.key}"]`),v=await range.inputValue();await range.focus();await range.press(v===String(first.max)?'ArrowLeft':'ArrowRight');assert.notEqual(await range.inputValue(),v);assert.equal(await range.inputValue(),await page.locator(`[data-number="${first.key}"]`).inputValue());}
}
// A deep link opens its foundation panel; a real prerequisite link carries language.
await page.goto(base+'chapter-05.html?lang=en');await page.locator('#study-expand').click();await page.locator('.study-answer').first().locator('summary').click();await page.locator('#foundation > summary').click();const beforePrint=await page.locator('.study-panel').evaluateAll(es=>es.map(e=>e.open));await page.evaluate(()=>window.dispatchEvent(new Event('beforeprint')));assert.equal(await page.locator('.study-panel:not([open])').count(),0);assert.equal(await page.locator('.study-answer[open]').count(),1);await page.evaluate(()=>window.dispatchEvent(new Event('afterprint')));assert.deepEqual(await page.locator('.study-panel').evaluateAll(es=>es.map(e=>e.open)),beforePrint);
await page.goto(base+'chapter-05.html?lang=en#foundation');assert.equal(await page.locator('#foundation').getAttribute('open'),'');
await page.locator('.prerequisite-link').first().click();assert.equal(await page.locator('#foundation').getAttribute('open'),'');assert.equal(await page.locator('html').getAttribute('lang'),'en');
// Real link navigation carries language, including first/last boundary links.
await page.goto(base+'chapter-15.html?lang=en');await page.locator('.pager a.primary').click();assert.ok(page.url().includes('chapter-16.html'));await page.locator('h1').waitFor();assert.equal(await page.locator('html').getAttribute('lang'),'en');await page.locator('.pager a.primary').click();assert.ok(page.url().includes('index.html'));
for(const [id,name] of [[4,'logistic-desktop'],[12,'polar-desktop'],[14,'energy-desktop']]){await page.goto(base+file(id)+'?lang=en');await page.locator('#step-4').scrollIntoViewIfNeeded();await page.screenshot({path:path.join(output,name+'.png')});}
await page.setViewportSize({width:390,height:844});
for(const lang of ['zh','en'])for(let id=0;id<=16;id++){
 await page.goto(base+file(id)+'?lang='+lang);loaded++;
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`mobile overflow ${id} ${lang}`);
 await page.locator('#menu').click();assert.equal(await page.locator('#menu').getAttribute('aria-expanded'),'true');await page.keyboard.press('Escape');assert.equal(await page.locator('#menu').getAttribute('aria-expanded'),'false');assert.equal(await page.locator('#menu').evaluate(e=>e===document.activeElement),true);
 if(id){await page.locator('#study-expand').click();assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`expanded phone overflow ${id} ${lang}`);assert.equal(await page.locator('.study-answer[open]').count(),0);await page.locator('.study-answer').evaluateAll(es=>es.forEach(e=>e.open=true));assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`open solutions phone overflow ${id} ${lang}`);await page.locator('#study-collapse').click();await page.locator('#step-4').scrollIntoViewIfNeeded();}
 if(id===9&&lang==='zh')await page.screenshot({path:path.join(output,'sgd-mobile.png')});
}
await page.setViewportSize({width:320,height:740});await page.goto(base+'chapter-16.html?lang=en');await page.locator('#study-expand').click();await page.locator('.study-answer').evaluateAll(es=>es.forEach(e=>e.open=true));assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'320px expanded overflow');
const storage=await isolated();await storage.addInitScript(()=>Object.defineProperty(window,'localStorage',{get(){throw new Error('storage disabled');}}));const p=await storage.newPage();await p.goto(base+'chapter-01.html');await p.locator('#en').click();assert.equal(await p.locator('html').getAttribute('lang'),'en');await storage.close();
assert.deepEqual(errors,[]);assert.deepEqual(escaped,[]);
console.log(`PASS: ${loaded} page loads across 17 pages, both languages, desktop and phone; ${controls} control changes; quizzes, language/state, native keyboard, reset, invalid inputs, formulas, no page overflow, disabled storage and repository subpaths. All ${requests.length} resource requests fulfilled locally; zero external egress. file:// browser navigation was not tested. Screenshots: ${output}`);
}finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
