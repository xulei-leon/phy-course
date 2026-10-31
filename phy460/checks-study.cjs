/* Independent mathematics, supplementary coverage and state-preservation checks. */
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const {pathToFileURL}=require('node:url');
const root=__dirname,c={};c.window=c;vm.createContext(c);
for(const f of ['content/sources.js','content/01-04.js','content/05-09.js','content/10-13.js','assets/models.js','assets/experiments.js','content/study.js','assets/study-labs.js'])vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),c);
const katex=require('../phy489/assets/katex/katex.min.js'),M=c.PHY_MATH;
const near=(a,b,tol=1e-6)=>assert.ok(Math.abs(a-b)<tol,`${a} != ${b}`);
let formulas=0,states=0,questions=0;
const bilingual=v=>{assert.ok(v.zh?.trim());assert.ok(v.en?.trim());};
for(const chapter of c.PHY.chapters){const x=c.PHY460_STUDY[chapter.id];bilingual(x.prereq);bilingual(x.goals);bilingual(x.tasks);bilingual(x.review);assert.equal(x.examples.length+1,3);assert.ok(x.lessons.length>=2);assert.ok(x.questions.length+chapter.quizzes.length>=6);
 for(const b of [...x.lessons,...x.examples]){bilingual(b.title);bilingual(b.text);if(b.math){katex.renderToString(b.math,{throwOnError:true});formulas++;}}
 const covered=new Set([...chapter.quizzes,...x.questions].flatMap(q=>q.topics));for(let i=1;i<=chapter.topics.length;i++)assert.ok(covered.has(i),`Missing chapter ${chapter.id} topic ${i}`);
 for(const q of x.questions){questions++;bilingual(q.question);bilingual(q.explanation);if(q.kind==='number'){assert.ok(Number.isFinite(q.value));assert.ok(q.tolerance>0);}}
}
for(const [key,lab] of Object.entries(c.PHY460_STUDY_LABS)){bilingual(lab.title);bilingual(lab.note);const base=Object.fromEntries(lab.controls.map(x=>[x.key,x.value]));const samples=[base,...lab.controls.flatMap(x=>[x.min,x.max].map(v=>({...base,[x.key]:v})))];for(const state of samples){const result=lab.calc(state);states++;bilingual(result.message);for(const r of result.readings){bilingual(r.label);assert.ok(!/NaN|Infinity|undefined/.test(JSON.stringify(r.value)));}for(const chart of result.charts){bilingual(chart.title);bilingual(chart.x);bilingual(chart.y);for(const s of chart.series){bilingual(s.name);for(const point of s.points)assert.ok(point.every(Number.isFinite),key);}}}}
// Independent equilibrium and energy checks.
const coexist=-3/16,u=.75;near(coexist*u/(-2)-u*u/4+u**3/6,0);
near(Math.sqrt(1-.6**2),.8);
const competitionJ=[[-1,-2],[-1,-1]];near(competitionJ[0][0]*competitionJ[1][1]-competitionJ[0][1]*competitionJ[1][0],-1);
for(const u of [.2,.8]){const r=Math.sqrt(u);near(r*(-.16+r*r-r**4),0);near(-.16+3*r*r-5*r**4,2*u*(1-2*u));}
for(const u of [.2,.8])near(-.16+u-u*u,0);
// Fast-layer estimate becomes accurate as epsilon shrinks; full solutions converge with step refinement.
const inertial=(epsilon,h)=>M.rk4(([x,y])=>[y,(1.2-Math.sin(x)-y)/epsilon],[0,2],{time:2,h,bound:100}).points.at(-1);
near(inertial(.1,.005)[1],inertial(.1,.0025)[1],1e-7);
const reduced=M.rk4(([x])=>[1.2-Math.sin(x)],[0],{time:2,h:.002}).points.at(-1)[1];assert.ok(Math.abs(inertial(.02,.001)[1]-reduced)<Math.abs(inertial(.1,.001)[1]-reduced));
// Return multiplier checked against finite differences at a converged rotating state.
const returnAt=y=>M.pendulum(.5,1.5,y,{time:10,h:.001}).returns[0];let speed=3;for(let i=0;i<15;i++)speed=returnAt(speed).speed;
const ret=returnAt(speed),d=.01,derivative=(returnAt(speed+d).speed-returnAt(speed-d).speed)/(2*d);near(derivative,Math.exp(-.5*ret.time),.0001);
// z^n winding, including a zero lying on the contour.
for(let n=2;n<=6;n++){const f=([x,y])=>{const r=Math.hypot(x,y),a=Math.atan2(y,x);return [r**n*Math.cos(n*a),r**n*Math.sin(n*a)];};near(M.winding(f,0,0,1,[[0,0]]).index,n);assert.equal(M.winding(f,1,0,1,[[0,0]]).index,null);}
if(process.argv[2]){
 const {JSDOM}=require(process.argv[2]);
 for(const lang of ['zh','en'])for(let id=1;id<=13;id++){
  const file=path.join(root,`chapter-${String(id).padStart(2,'0')}.html`),dom=new JSDOM(fs.readFileSync(file,'utf8'),{url:pathToFileURL(file).href+'?lang='+lang,runScripts:'outside-only'}),w=dom.window,d=w.document;
  for(const s of d.querySelectorAll('script[src]'))vm.runInContext(fs.readFileSync(path.resolve(root,s.getAttribute('src')),'utf8'),dom.getInternalVMContext());
  const study=w.PHY460_STUDY[id];assert.equal(d.querySelectorAll('.study-quiz').length,4);assert.equal(d.querySelectorAll('.study-lab').length,(study.labs||[]).length);assert.equal(d.querySelectorAll('.study-block[id^="study-example-"]').length,2);
  const form=d.querySelector('#study-practice'),submit=()=>form.dispatchEvent(new w.Event('submit',{cancelable:true}));submit();assert.equal(d.querySelectorAll('.study-feedback:not([hidden])').length,4);
  for(const [i,q] of study.questions.entries())form.elements[`study-${i}`].value=q.kind==='number'?q.value:'My reasoning';submit();assert.ok(form.querySelector('.study-score').textContent.includes('2 / 2')||form.querySelector('.study-score').textContent.includes('1 / 1'));
  const numericIndex=study.questions.findIndex(q=>q.kind==='number'),q=study.questions[numericIndex];form.elements[`study-${numericIndex}`].value=q.value+1;submit();assert.ok(!d.querySelectorAll('.study-feedback')[numericIndex].classList.contains('is-correct'));
  form.elements[`study-${numericIndex}`].value=q.value+q.tolerance/2;submit();assert.ok(d.querySelectorAll('.study-feedback')[numericIndex].classList.contains('is-correct'));
  for(const button of d.querySelectorAll('.study-presets button'))button.click();
  for(const mount of d.querySelectorAll('.study-lab-mount')){const input=mount.querySelector('[data-key]');input.value=input.max;input.dispatchEvent(new w.Event('input',{bubbles:true}));}
  const lesson=d.querySelector('.study-lesson');lesson.open=true;const oldValues=Array.from(d.querySelectorAll('#study-practice input,#study-practice textarea,[data-key]'),e=>e.value);d.getElementById(lang==='zh'?'en':'zh').click();assert.deepEqual(Array.from(d.querySelectorAll('#study-practice input,#study-practice textarea,[data-key]'),e=>e.value),oldValues);assert.ok(lesson.open);assert.equal(d.querySelectorAll('.katex-error').length,0);
  lesson.open=false;w.dispatchEvent(new w.Event('beforeprint'));assert.ok(lesson.open);w.dispatchEvent(new w.Event('afterprint'));assert.equal(lesson.open,false);
  for(const a of d.querySelectorAll('a[href^="#"]'))assert.ok(d.querySelector(a.getAttribute('href')));
  // A supplementary reset affects only its own experiment; every default number input is valid.
  for(const mount of d.querySelectorAll('.study-lab-mount')){for(const input of mount.querySelectorAll('input[type=number]'))assert.ok(input.validity.valid);const other=d.querySelector('#experiment [data-key]'),value=other.value;mount.querySelector('.reset-lab').click();assert.equal(other.value,value);}
  dom.window.close();
 }
}
console.log(`PASS: 13 supplements, 26 added examples, ${questions} added questions, ${formulas} added formulas, ${states} supplementary model states; coverage, independent invariants, convergence and return multiplier${process.argv[2]?'; 26 bilingual DOM sessions, grading, anchors and state retention':''}.`);
