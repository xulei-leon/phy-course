/* DOM emulation only: no browser, layout, font, screenshot or deployment validation.
 * node phy407/checks-dom.cjs /absolute/path/to/jsdom
 * jsdom is a maintenance dependency only; no resources are fetched.
 */
const {JSDOM,VirtualConsole}=require(process.argv[2]||'jsdom');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict'),{pathToFileURL}=require('node:url');
const root=__dirname;let loads=0,changes=0;const errors=[];
function load(id,lang='zh',hosted=false,blockedStorage=false){
 const name=id?`chapter-${String(id).padStart(2,'0')}.html`:'index.html',html=fs.readFileSync(path.join(root,name),'utf8');
 const virtualConsole=new VirtualConsole();virtualConsole.on('jsdomError',e=>errors.push(e.message));
 const dom=new JSDOM(html,{url:(hosted?'https://course.invalid/phy-course/phy407/'+name:pathToFileURL(path.join(root,name)).href)+'?lang='+lang,runScripts:'outside-only',virtualConsole});
 const w=dom.window;if(blockedStorage)Object.defineProperty(w,'localStorage',{get(){throw Error('disabled');}});
 w.fetch=()=>{throw Error('Unexpected network');};
 for(const script of w.document.querySelectorAll('script[src]'))vm.runInContext(fs.readFileSync(path.resolve(root,script.getAttribute('src')),'utf8'),dom.getInternalVMContext(),{filename:script.getAttribute('src')});
 loads++;return dom;
}
function input(w,el,value){el.value=String(value);el.dispatchEvent(new w.Event('input',{bubbles:true}));changes++;}
for(const lang of ['zh','en'])for(let id=0;id<=17;id++){
 const dom=load(id,lang),w=dom.window,d=w.document;
 assert.equal(d.documentElement.lang,lang==='zh'?'zh-CN':'en');assert.ok(d.querySelector('h1'));assert.equal(d.querySelectorAll('.chapter-link').length,17);
 if(!id){assert.equal(d.querySelectorAll('.contents-row').length,17);assert.equal(d.querySelectorAll('.study-overview a[href*="#project"]').length,3);dom.window.close();continue;}
 const c=w.PHY.chapters[id-1];assert.equal(d.querySelectorAll('.learning-section').length,6);assert.equal(d.querySelectorAll('.quiz-item').length,6);assert.equal(d.querySelectorAll('#step-5 .topic').length,2);assert.equal(d.querySelectorAll('.katex-error').length,0);
 for(const rootId of ['experiment','study-experiment',...(c.project?['project-experiment']:[])]){
  const el=d.getElementById(rootId),lab=w.PHY_LABS[rootId==='experiment'?c.lab:rootId==='study-experiment'?c.extraLab:c.project.id];
  for(const ctrl of lab.controls){if(ctrl.options){for(const [v]of ctrl.options)input(w,el.querySelector(`[data-key="${ctrl.key}"]`),v);}else{const number=el.querySelector(`[data-number="${ctrl.key}"]`);assert.ok(number.validity.valid,`invalid default ${id}/${rootId}/${ctrl.key}`);for(const v of [ctrl.min,ctrl.max]){input(w,number,v);assert.notEqual(number.getAttribute('aria-invalid'),'true');}
   const before=el.querySelector('.readings').textContent;input(w,number,ctrl.max+100);assert.equal(number.getAttribute('aria-invalid'),'true');assert.equal(el.querySelector('.readings').textContent,before);input(w,number,'');assert.equal(number.getAttribute('aria-invalid'),'true');input(w,number,ctrl.value);
  }}
  assert.ok(!/NaN|Infinity|undefined/.test(el.querySelector('.readings').textContent));
  const buttons=el.querySelectorAll('.lab-actions button');buttons[buttons.length-1].click();assert.equal(el.querySelectorAll('.lab-records article').length,1);
  el.querySelector('.reset-lab').click();assert.equal(el.querySelectorAll('.lab-records article').length,0);
 }
 // Unanswered, correct, wrong and blank numeric feedback; reflection is never automatically scored.
 d.querySelector('#quiz-form button').click();assert.ok(d.getElementById('quiz-score').textContent.includes('0 / 5'));
 c.quizzes.forEach((q,i)=>{if(q.type==='choice')d.querySelector(`input[name=q${i}][value="${q.answer}"]`).click();if(q.type==='number')d.querySelector(`input[name=q${i}]`).value=q.value;if(q.type==='reflection')d.querySelector(`textarea[name=q${i}]`).value='My own explanation';});
 d.querySelector('#quiz-form button').click();assert.ok(d.getElementById('quiz-score').textContent.includes('5 / 5'));
 d.querySelector('input[name=q3]').value='';d.querySelector('#quiz-form button').click();assert.ok(d.getElementById('quiz-score').textContent.includes('4 / 5'));assert.equal(d.querySelector('input[name=q3]').getAttribute('aria-invalid'),'true');
 d.querySelector('input[name=q3]').value=c.quizzes[3].value+10;d.querySelector('#quiz-form button').click();assert.ok(d.getElementById('quiz-score').textContent.includes('4 / 5'));
 const hint=d.querySelector('.answer-stages details');hint.open=true;const check=d.querySelector('.answer-stages input[type=checkbox]');check.checked=true;
 while(d.querySelector('.derivation-step[hidden]'))d.querySelector('.reveal').click();
 const values=Array.from(d.querySelectorAll('[data-key]'),e=>e.value);
 const recordButtons=d.querySelectorAll('#study-experiment .lab-actions button');recordButtons[recordButtons.length-1].click();
 const reports=Array.from(d.querySelectorAll('textarea'));reports.forEach(e=>e.value='Saved working');
 d.getElementById(lang==='zh'?'en':'zh').click();assert.deepEqual(Array.from(d.querySelectorAll('[data-key]'),e=>e.value),values);assert.equal(hint.open,true);assert.equal(check.checked,true);assert.equal(d.querySelectorAll('.derivation-step[hidden]').length,0);assert.equal(d.querySelectorAll('#study-experiment .lab-records article').length,1);reports.forEach(e=>assert.equal(e.value,'Saved working'));assert.equal(d.querySelectorAll('.katex-error').length,0);assert.ok(d.getElementById('quiz-score').textContent.includes('4 / 5'));
 const baseBefore=d.querySelector('#experiment .readings').textContent;d.querySelector('#study-experiment .reset-lab').click();assert.equal(d.querySelector('#experiment .readings').textContent,baseBefore);
 const ids=Array.from(d.querySelectorAll('[id]'),e=>e.id);assert.equal(new Set(ids).size,ids.length,'duplicate element IDs');
 d.querySelectorAll('a[href^="#"]').forEach(a=>assert.ok(d.querySelector(a.getAttribute('href')),'broken anchor'));
 d.querySelectorAll('label[for]').forEach(label=>assert.ok(d.getElementById(label.htmlFor),'broken label'));
 d.querySelectorAll('[data-course-link]').forEach(a=>{const u=new URL(a.href);assert.equal(u.searchParams.get('lang'),lang==='zh'?'en':'zh');assert.ok(fs.existsSync(path.join(root,path.basename(u.pathname))));});
 d.querySelectorAll('svg path').forEach(p=>assert.ok(!/NaN|Infinity/.test(p.getAttribute('d')||'')));
 d.getElementById('menu').click();assert.equal(d.getElementById('menu').getAttribute('aria-expanded'),'true');d.dispatchEvent(new w.KeyboardEvent('keydown',{key:'Escape',bubbles:true}));assert.equal(d.getElementById('menu').getAttribute('aria-expanded'),'false');
 dom.window.close();
}
for(const id of [0,1,7,12,16,17]){const dom=load(id,'en',true);assert.equal(dom.window.document.querySelectorAll('a[href*="courseware/"]').length,0);dom.window.document.querySelectorAll('[data-course-link]').forEach(a=>assert.ok(new URL(a.href).pathname.startsWith('/phy-course/phy407/')));dom.window.close();}
const disabled=load(1,'zh',false,true);disabled.window.document.getElementById('en').click();assert.equal(disabled.window.document.documentElement.lang,'en');disabled.window.close();
assert.deepEqual(errors,[]);console.log(`PASS: ${loads} DOM-emulated page loads, ${changes} control events, mixed quizzes, language/state, unique IDs, labels, formulas, hosted-link generation and disabled storage. NOT a browser/layout/offline-network test.`);
