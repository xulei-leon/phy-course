/* Optional DOM-only QA: node checks-dom.cjs /absolute/path/to/jsdom
 * jsdom is not a browser and does not verify layout, CSP or native keyboard UI.
 * No browser is driven, server started, or network resource loaded here.
 */
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),vm=require('node:vm');
const {pathToFileURL,fileURLToPath}=require('node:url');
const {JSDOM}=require(process.argv[2]||'jsdom');
const root=__dirname;
let changes=0;
for(const language of ['zh','en'])for(let id=0;id<=13;id++){
 const file=path.join(root,id?`chapter-${String(id).padStart(2,'0')}.html`:'index.html');
 const dom=new JSDOM(fs.readFileSync(file,'utf8'),{url:pathToFileURL(file).href+'?lang='+language,runScripts:'outside-only'}),w=dom.window,d=w.document;
 const errors=[];w.addEventListener('error',e=>errors.push(e.message));
 for(const script of d.querySelectorAll('script[src]'))vm.runInContext(fs.readFileSync(path.resolve(root,script.getAttribute('src')),'utf8'),dom.getInternalVMContext());
 assert.equal(d.documentElement.lang,language==='zh'?'zh-CN':'en');
 assert.equal(d.querySelectorAll('.chapter-link').length,13);
 assert.ok(!Array.from(d.querySelectorAll('p,span,output,h1,h2,h3,h4')).some(e=>/^(undefined|NaN)$/.test(e.textContent.trim())));assert.equal(d.querySelectorAll('.katex-error').length,0);
 if(!id){assert.equal(d.querySelectorAll('.contents-row').length,13);dom.window.close();continue;}
 assert.equal(d.querySelectorAll('.learning-section').length,6);assert.equal(d.querySelectorAll('.topic-source').length,w.PHY460_SOURCES[id-1].sections.length);assert.equal(d.querySelectorAll('.quiz-item').length,3);
 const chapter=w.PHY.chapters[id-1];
 // Show all derivation steps, then preserve expansion and answers across languages.
 while(d.querySelector('.derivation-step[hidden]'))d.querySelector('.reveal').click();
 assert.equal(d.querySelectorAll('.derivation-step[hidden]').length,0);
 d.querySelector('#quiz-form').dispatchEvent(new w.Event('submit',{bubbles:true,cancelable:true}));
 assert.ok(d.querySelectorAll('.quiz-feedback:not([hidden])').length===3);
 chapter.quizzes.forEach((q,i)=>d.querySelector(`input[name="q${i}"][value="${q.answer}"]`).checked=true);
 d.querySelector('#quiz-form').dispatchEvent(new w.Event('submit',{bubbles:true,cancelable:true}));assert.ok(d.querySelector('#quiz-score').textContent.includes('3 / 3'));
 // Explicitly wrong answer: explanations remain visible and the score changes.
 const q0=chapter.quizzes[0];d.querySelector(`input[name="q0"][value="${(q0.answer+1)%q0.options.length}"]`).checked=true;
 d.querySelector('#quiz-form').dispatchEvent(new w.Event('submit',{bubbles:true,cancelable:true}));assert.ok(d.querySelector('#quiz-score').textContent.includes('2 / 3'));assert.ok(d.querySelector('.quiz-item .quiz-feedback').classList.contains('is-wrong'));
 d.querySelector(`input[name="q0"][value="${q0.answer}"]`).checked=true;d.querySelector('#quiz-form').dispatchEvent(new w.Event('submit',{bubbles:true,cancelable:true}));
 const lab=w.PHY_LABS[chapter.lab];
 for(const ctrl of lab.controls){const input=d.querySelector(`[data-key="${ctrl.key}"]`),numeric=d.querySelector(`[data-number="${ctrl.key}"]`);
  if(numeric)assert.ok(numeric.validity.valid,`default invalid: page ${id}, ${ctrl.key}`);
  const values=ctrl.options?ctrl.options.map(x=>x[0]):[ctrl.min,ctrl.max];
  for(const value of values){input.value=String(value);input.dispatchEvent(new w.Event('input',{bubbles:true}));changes++;assert.ok(!/NaN|undefined|Infinity/.test(d.querySelector('.readings').textContent));if(numeric)assert.equal(Number(numeric.value),Number(value));}
  if(numeric){const before=d.querySelector('.readings').textContent;numeric.value=String(ctrl.max+100);numeric.dispatchEvent(new w.Event('input',{bubbles:true}));assert.equal(d.querySelector('.readings').textContent,before);numeric.value=String(ctrl.max);numeric.dispatchEvent(new w.Event('input',{bubbles:true}));}
 }
 const values=Array.from(d.querySelectorAll('[data-key]'),e=>e.value);
 const other=language==='zh'?'en':'zh';d.getElementById(other).click();
 assert.deepEqual(Array.from(d.querySelectorAll('[data-key]'),e=>e.value),values);
 assert.equal(d.querySelectorAll('input[type=radio]:checked').length,3);assert.ok(d.querySelector('#quiz-score').textContent.includes('3 / 3'));
 assert.equal(d.querySelectorAll('.derivation-step[hidden]').length,0);
 assert.equal(d.querySelectorAll('.katex-error').length,0);
 d.querySelector('.reset-lab').click();lab.controls.forEach(x=>assert.equal(d.querySelector(`[data-key="${x.key}"]`).value,String(x.options?x.options[0][0]:x.value)));
 d.getElementById('menu').click();assert.equal(d.getElementById('menu').getAttribute('aria-expanded'),'true');d.dispatchEvent(new w.KeyboardEvent('keydown',{key:'Escape'}));assert.equal(d.getElementById('menu').getAttribute('aria-expanded'),'false');
 for(const a of d.querySelectorAll('[data-course-link]')){const url=new URL(a.href);assert.equal(url.searchParams.get('lang'),other);assert.ok(fs.existsSync(fileURLToPath(url)));}
 for(const a of d.querySelectorAll('a[href^="#"]'))assert.ok(d.querySelector(a.getAttribute('href')));
 assert.equal(errors.length,0,errors.join('\n'));assert.ok(!Array.from(d.querySelectorAll('p,span,output,h1,h2,h3,h4')).some(e=>/^(undefined|NaN)$/.test(e.textContent.trim())));
 dom.window.close();
}
// Hosted subpath simulation: execute scripts from disk, never request resources.
for(const id of [0,1,13]){
 const file=id?`chapter-${String(id).padStart(2,'0')}.html`:'index.html';
 const dom=new JSDOM(fs.readFileSync(path.join(root,file),'utf8'),{url:'https://example.invalid/phy-course/phy460/'+file+'?lang=en',runScripts:'outside-only'}),d=dom.window.document;
 for(const script of d.querySelectorAll('script[src]'))vm.runInContext(fs.readFileSync(path.resolve(root,script.getAttribute('src')),'utf8'),dom.getInternalVMContext());
 assert.equal(d.querySelectorAll('a[href*="courseware/"]').length,0);
 for(const a of d.querySelectorAll('[data-course-link]'))assert.ok(new URL(a.href).pathname.startsWith('/phy-course/phy460/'));
 dom.window.close();
}
console.log(`PASS: DOM simulation of 14 pages in both languages; ${changes} control changes, unanswered/wrong/correct grading, reset, invalid input, language/state retention, navigation and formula rendering; hosted subpaths and private-link suppression. This is not browser/layout verification.`);
