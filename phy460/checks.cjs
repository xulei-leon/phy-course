/* Maintenance-only tests; learning needs no Node, build, or server. */
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=__dirname,ctx=vm.createContext({console});ctx.window=ctx;
const scripts=['content/sources.js','content/01-04.js','content/05-09.js','content/10-13.js','assets/models.js','assets/experiments.js','content/study.js','assets/study-labs.js'];
for(const file of scripts)vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),ctx,{filename:file});
const C=ctx.PHY.chapters,M=ctx.PHY_MATH,L=ctx.PHY_LABS,katex=require('../phy489/assets/katex/katex.min.js');
const near=(x,y,tol=1e-8)=>assert.ok(Math.abs(x-y)<tol,`${x} differs from ${y} (tol ${tol})`);
const bilingual=x=>{assert.equal(typeof x.zh,'string');assert.equal(typeof x.en,'string');assert.ok(x.zh.trim()&&x.en.trim());};
let equations=0,sections=0,states=0;
function formulas(text){for(const match of text.matchAll(/\\\((.*?)\\\)/gs)){katex.renderToString(match[1],{throwOnError:true,strict:'ignore'});equations++;}}
function block(b){bilingual(b.title);bilingual(b.text);formulas(b.text.zh);formulas(b.text.en);if(b.math){katex.renderToString(b.math,{throwOnError:true,strict:'ignore'});equations++;}}
assert.equal(C.length,13);
for(const [i,c] of C.entries()){
 const meta=ctx.PHY460_SOURCES[i];assert.equal(c.id,i+1);assert.equal(c.pages[0],meta.page);assert.equal(c.pages[1],meta.end);assert.equal(c.topics.length,meta.sections.length,`chapter ${c.id}: missing source sections`);
 for(const key of ['title','question','intuition','labTitle','labNote'])bilingual(c[key]);
 c.topics.forEach((b,j)=>{block(b);assert.equal(b.source.title,meta.sections[j].title);assert.ok(b.source.page>=c.pages[0]&&b.source.page<=c.pages[1]);sections++;});
 assert.ok(c.derivation.length>=3);c.derivation.forEach(block);block(c.example);c.notes.forEach(bilingual);assert.equal(c.quizzes.length,3);
 c.quizzes.forEach(q=>{bilingual(q.question);q.options.forEach(bilingual);bilingual(q.explanation);assert.ok(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<q.options.length);});
 const lab=L[c.lab],base=Object.fromEntries(lab.controls.map(x=>[x.key,x.options?x.options[0][0]:x.value]));
 const samples=[base];for(const ctrl of lab.controls){bilingual(ctrl.label);if(ctrl.options)for(const [v,b] of ctrl.options){bilingual(b);samples.push({...base,[ctrl.key]:v});}else{assert.ok(ctrl.value>=ctrl.min&&ctrl.value<=ctrl.max);for(const v of [ctrl.min,ctrl.max,0].filter(v=>v>=ctrl.min&&v<=ctrl.max))samples.push({...base,[ctrl.key]:v});}}
 for(const state of samples){const result=lab.calc(state);states++;assert.ok(result.charts.length);result.readings.forEach(r=>{bilingual(r.label);if(typeof r.value==='object')bilingual(r.value);else assert.ok(!/NaN|Infinity|undefined/.test(String(r.value)));});bilingual(result.message);for(const ch of result.charts){bilingual(ch.title);bilingual(ch.x);bilingual(ch.y);for(const s of ch.series){bilingual(s.name);s.points.forEach(p=>assert.ok(p.length===2&&p.every(Number.isFinite),`${c.id}: nonfinite chart`));}for(const m of ch.markers||[])assert.ok(Number.isFinite(m.x)&&Number.isFinite(m.y));}}
}
// Independently known roots and invariants, rather than expected values copied from models.
for(const type of ['sn','tc','super','sub'])for(const r of [-1,-.25,-.16,0,.25,1])for(const x of M.normalRoots(type,r))near(M.normal(type,r,x),0);
assert.equal(M.normalRoots('sub',-.16).length,5);assert.equal(M.normalRoots('sub',-.25).length,3);
for(const r of [-2,0,1,3])for(const h of [-2,-.2,0,.2,2])for(const x of M.cubicRoots(r,h))near(h+r*x-x**3,0,1e-7);
assert.equal(M.cubicRoots(3,0).length,3);assert.equal(M.cubicRoots(3,2).length,2);assert.equal(M.cubicRoots(-1,0).length,1);
assert.equal(M.linear(-1,-2,2,-1).type,'stableSpiral');near(M.linear(-1,-2,2,-1).det,5);assert.equal(M.linear(1,0,0,-1).type,'saddle');assert.equal(M.linear(0,-1,1,0).type,'center');assert.equal(M.linear(0,1,0,-1).type,'nonhyperbolic');assert.equal(M.linear(-1,1,0,-1).type,'stableRepeated');
near(M.waiting(3,0),2.25);near(M.waiting(3,2),.25);near(M.waiting(1,2),0);near(M.circlePeriod(1.25),2*Math.PI/.75);near(M.circlePeriod(-1.25),M.circlePeriod(1.25));assert.equal(M.circlePeriod(1),null);
near(M.radial(-1,1,1.5),.5);assert.equal(M.radial(1,1,.5),null);
for(const [f,index] of [[([x,y])=>[x,y],1],[([x,y])=>[-x,-y],1],[([x,y])=>[x,-y],-1],[([x,y])=>[-y,x],1],[([x,y])=>[x*x-y*y,2*x*y],2]]){near(M.winding(f,0,0,1,[[0,0]]).index,index);assert.equal(M.winding(f,1,0,1,[[0,0]]).index,null);near(M.winding(f,2,0,.5,[[0,0]]).index,0);}
const pair=([x,y])=>[x*x-1,y];near(M.winding(pair,0,0,2,[[-1,0],[1,0]]).index,0);near(M.winding(pair,-1,0,.5,[[-1,0],[1,0]]).index,-1);near(M.winding(pair,1,0,.5,[[-1,0],[1,0]]).index,1);
near(M.lyapunovRate(1,1),-10);for(const x of [-2,-.5,0,.5,2])for(const y of [-2,-.5,0,.5,2]){near(2*x*(-x+4*y)+8*y*(-x-y**3),M.lyapunovRate(x,y));assert.ok(M.lyapunovRate(x,y)<=0);}
// RK4 convergence against analytic exponential and harmonic oscillator.
const expError=h=>Math.abs(M.rk4(([x])=>[x],[1],{h,time:1}).points.at(-1)[1]-Math.E);
assert.ok(expError(.1)/expError(.05)>14);assert.ok(expError(.05)<1.5e-7);
const osc=M.rk4(([x,y])=>[y,-x],[1,0],{h:.01,time:2*Math.PI});near(osc.points.at(-1)[1],1,1e-8);near(osc.points.at(-1)[2],0,1e-8);
const sine=M.rk4(([x])=>[Math.sin(x)],[Math.PI/2],{h:.02,time:Math.log(3)});near(sine.points.at(-1)[1],2*Math.atan(3),1e-8);
const blow=M.rk4(([x])=>[x*x],[1],{time:2,h:.005,bound:20});assert.equal(blow.reason,'boundary');assert.ok(blow.points.at(-1)[0]<1);
const lyap=M.rk4(([x,y])=>[-x+4*y,-x-y**3],[1,1],{h:.005,time:10});let previous=Infinity;for(const p of lyap.points){const v=M.lyapunov(p[1],p[2]);assert.ok(v<=previous+1e-10);previous=v;}
const p1=M.pendulum(.5,1.5,1),p2=M.pendulum(.5,1.5,1,{h:.01});assert.ok(p1.returns.length>10);near(p1.returns[0].time,p2.returns[0].time,1e-4);near(p1.returns[0].speed,p2.returns[0].speed,1e-4);assert.equal(M.pendulum(.5,0,0).returns.length,0);
// Supercritical Hopf radial relaxation agrees with its analytic squared-radius solution.
const hopf=M.rk4(([r])=>[.25*r-r**3],[.8],{h:.01,time:10});const analytic=Math.sqrt(.25/(1+(.25/.64-1)*Math.exp(-.5*10)));near(hopf.points.at(-1)[1],analytic,1e-9);
const zeroCircle=L.ch12.calc({type:'super',mu:1,b:-1,r0:1});assert.ok(zeroCircle.message.en.includes('equilibria'));
// Offline entry points, local fonts, no fetch/module/network runtime.
for(let id=0;id<=13;id++){const f=id?`chapter-${String(id).padStart(2,'0')}.html`:'index.html',html=fs.readFileSync(path.join(root,f),'utf8');assert.ok(html.includes(`data-chapter="${id}"`));assert.ok(html.includes("connect-src 'none'"));for(const m of html.matchAll(/(?:href|src)="([^"]+)"/g)){assert.ok(!/^(?:https?:|\/)/.test(m[1]));assert.ok(fs.existsSync(path.resolve(root,m[1])),`${f}: missing ${m[1]}`);}}
for(const f of [...scripts,'assets/course.js','assets/study-ui.js'])assert.ok(!/\bfetch\s*\(|XMLHttpRequest|https?:\/\//.test(fs.readFileSync(path.join(root,f),'utf8')));
const css=fs.readFileSync(path.join(root,'../phy489/assets/katex/katex.min.css'),'utf8');for(const m of css.matchAll(/url\(([^)]+)\)/g))assert.ok(fs.existsSync(path.join(root,'../phy489/assets/katex',m[1])));
assert.ok(fs.readFileSync(path.join(root,'../.gitignore'),'utf8').includes('/phy460/courseware/'));
assert.ok(fs.readFileSync(path.join(root,'../.github/workflows/pages.yml'),'utf8').includes("--exclude='/phy460/courseware/'"));
console.log(`PASS: 13 chapters, ${sections} source sections, 39 bilingual quizzes, ${equations} equations, ${states} model states; analytic invariants, RK4 convergence, return crossings, offline resources and exclusion rules.`);
