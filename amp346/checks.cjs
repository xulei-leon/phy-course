/* Maintenance checks; no dependencies or server required. */
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=__dirname,ctx={window:{},console};vm.createContext(ctx);
assert.ok(fs.existsSync(path.join(root,'assets/models.js')),'APM346 mathematical models have not been implemented');
vm.runInContext(fs.readFileSync(path.join(root,'assets/models.js'),'utf8'),ctx);const M=ctx.window.APM_MATH;
const near=(a,b,tol=1e-8)=>assert.ok(Math.abs(a-b)<=tol,`${a} != ${b}`);
const diff=(f,x,h=1e-4)=>(f(x+h)-f(x-h))/(2*h);
const d2=(f,x,h=1e-3)=>(f(x+h)-2*f(x)+f(x-h))/(h*h);
// Exact data and independently differentiated equations, including zero coefficients.
for(const a of [-2,0,1])for(const x of [0,.2,1]){near(M.ode(a,3,2,0),2);near(diff(z=>M.ode(a,3,2,z),x)+a*M.ode(a,3,2,x),3,1e-6);}
const flux=M.flux(2,3,1,4,2,-3);near(flux.area,18);near(flux.edges.reduce((a,b)=>a+b,0),18);near(flux.edges[0],6);near(flux.edges[2],6);near(flux.edges[3],-12);
for(const x of [-1,0,1]){near(M.invariant('exp',x,2*Math.exp(x)),2);near(M.invariant('rational',x,-1/(x*x+2)),2);near(M.invariant('circle',x,2),x*x+4);}
near(M.reaction(3,0),9);near(3*diff(x=>M.reaction(x,.7),1)+2*diff(y=>M.reaction(1,y),.7)+M.reaction(1,.7),0,1e-6);
for(const c of [-2,0,2])near(M.transport('gaussian',c,0,.3),Math.exp(-.3*.3/2));
for(const c of [.5,2])for(const t of [0,.3,2])for(const x of [-2,0,1]){near(M.wave(x,0,c,1,.7,1),M.bump(x));near(M.wave(1+c*t+.01,t,c,1,.7,1),0);}
near(diff(t=>M.wave(.3,t,2,1,.7,1),0),.7*M.bump(.3),1e-6);
near(d2(t=>M.wave(.2,t,1.3,1,.7,1),.4)-1.3**2*d2(x=>M.wave(x,.4,1.3,1,.7,1),.2),0,2e-5);
for(const mass of [0,1.5])for(const t of [0,.4,2]){const e=M.energy(2,3,1,mass,t);near(e.K+e.P+e.V,e.total,1e-9);}
for(const a of [-2,0,2])for(const t of [0,.2,3])for(const x of [0,.4,1]){const u=M.heatMode(x,t,.5,1,10,a);assert.ok(u>=Math.min(10,10+a)-1e-12&&u<=Math.max(10,10+a)+1e-12);}
for(const k of [.1,2])for(const t of [.02,1]){const scale=Math.sqrt(2*k*t),limit=10*scale;near(M.integrate(x=>M.kernel(x,t,k),-limit,limit,1000),1,1e-10);near(M.integrate(x=>x*x*M.kernel(x,t,k),-limit,limit,1000),2*k*t,1e-9);near(M.stepHeat(0,t,k),.5);near(M.stepHeat(1,t,k)+M.stepHeat(-1,t,k),1);}
near(M.stepHeat(1,1e-5,1),1);near(M.stepHeat(-1,1e-5,1),0);near(M.gaussian(0,0,1,2,3),2/(Math.sqrt(2*Math.PI)*3));
assert.throws(()=>M.kernel(0,0,1));assert.throws(()=>M.kernel(0,1,0));
console.log('PASS: integrating factors, four-edge oriented flux, characteristic invariants, reaction PDE, transport, wave PDE/initial data/finite support, conserved energy, heat bounds, kernel mass/variance and jump trace.');
// Validate content, formulas, provenance and every allowed corner of each experiment.
const app=vm.createContext({console});app.window=app;
const scripts=['content/01-04.js','content/05-08.js','assets/models.js','assets/experiments.js'];
for(const f of scripts)vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),app,{filename:f});
const chapters=app.PHY.chapters,labs=app.PHY_LABS,katex=require('../phy489/assets/katex/katex.min.js');
const bilingual=x=>{assert.equal(typeof x.zh,'string');assert.equal(typeof x.en,'string');assert.ok(x.zh.trim()&&x.en.trim());};
let equations=0,topics=0,states=0;const sources=new Set(),usedLabs=new Set();
const block=x=>{bilingual(x.title);bilingual(x.text);if(x.math){katex.renderToString(x.math,{throwOnError:true,strict:'ignore'});equations++;}};
assert.equal(chapters.length,8);
for(const [i,c] of chapters.entries()){
 assert.equal(c.id,i+1);['title','question','intuition','labTitle','labNote'].forEach(k=>bilingual(c[k]));
 c.topics.forEach(x=>{block(x);assert.ok(x.source.page>=c.pages[0]&&x.source.page<=c.pages[1],`invalid source page in chapter ${c.id}`);topics++;});
 assert.ok(c.derivation.length>=3);c.derivation.forEach(block);block(c.example);assert.ok(c.notes.length);c.notes.forEach(bilingual);assert.equal(c.quizzes.length,3);
 for(const source of c.sources){assert.ok(fs.existsSync(path.join(root,'courseware',source.file)));sources.add(source.file);assert.ok(source.pages[0]>0&&source.pages[1]>=source.pages[0]);}
 c.quizzes.forEach(q=>{bilingual(q.question);q.options.forEach(bilingual);bilingual(q.explanation);assert.ok(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<q.options.length);});
 for(const key of c.labs){
  const lab=labs[key];assert.ok(lab);usedLabs.add(key);bilingual(lab.title);const base=Object.fromEntries(lab.controls.map(x=>[x.key,x.options?x.options[0][0]:x.value]));const samples=[base];
  for(const ctrl of lab.controls){bilingual(ctrl.label);if(ctrl.options){ctrl.options.forEach(([v,b])=>{bilingual(b);samples.push({...base,[ctrl.key]:v});});}else{assert.ok(ctrl.value>=ctrl.min&&ctrl.value<=ctrl.max);near((ctrl.value-ctrl.min)/ctrl.step,Math.round((ctrl.value-ctrl.min)/ctrl.step),1e-8);for(const value of [ctrl.min,ctrl.max])samples.push({...base,[ctrl.key]:value});}}
  let corners=[base];for(const ctrl of lab.controls)corners=corners.flatMap(s=>(ctrl.options?ctrl.options.map(x=>x[0]):[ctrl.min,ctrl.max]).map(v=>({...s,[ctrl.key]:v})));samples.push(...corners);
  for(const s of samples){const r=lab.calc(s);states++;assert.ok(r.charts.length);bilingual(r.message);r.readings.forEach(x=>{bilingual(x.label);if(typeof x.value==='object')bilingual(x.value);else assert.ok(!/NaN|Infinity|undefined/.test(String(x.value)),`${key}: invalid reading`);});for(const chart of r.charts){bilingual(chart.title);bilingual(chart.x);bilingual(chart.y);chart.series.forEach(s=>{bilingual(s.name);s.points.forEach(p=>assert.ok(p===null||p.length===2&&p.every(Number.isFinite),`${key}: invalid plot point`));});}}
 }
}
assert.equal(sources.size,11);assert.equal(usedLabs.size,11);assert.equal(Object.keys(labs).length,11);
// A wrong sign, a bridged pole, or a c² omission must fail independent mathematics checks.
const g=(x,y)=>-1/y-x*x;
for(const [x,y] of [[.3,.7],[-1,2]])near(diff(z=>g(z,y),x)+2*x*y*y*diff(z=>g(x,z),y),0,1e-6);
const rational=labs.characteristics.calc({mode:'rational',C:-1}).charts[0].series[0].points;
assert.ok(rational.some(p=>p===null),'rational poles must break paths');
const noCircle=labs.characteristics.calc({mode:'circle',C:-1}).charts[0].series[0].points;assert.equal(noCircle.length,0);
const heat=(x,t)=>app.APM_MATH.gaussian(x,t,.7,1,.8);near(diff(t=>heat(.4,t),.3)-.7*d2(x=>heat(x,.3),.4),0,1e-6);
for(let id=0;id<=8;id++){
 const f=id?`chapter-${String(id).padStart(2,'0')}.html`:'index.html',html=fs.readFileSync(path.join(root,f),'utf8');assert.ok(html.includes(`data-chapter="${id}"`));assert.ok(html.includes("connect-src 'none'"));
 for(const m of html.matchAll(/(?:href|src)="([^"]+)"/g)){assert.ok(!/^(https?:|\/)/.test(m[1]));assert.ok(fs.existsSync(path.resolve(root,m[1])),`${f}: missing ${m[1]}`);}
}
for(const file of [...scripts,'assets/course.js'])assert.ok(!/\bfetch\s*\(|XMLHttpRequest|https?:\/\//.test(fs.readFileSync(path.join(root,file),'utf8')));
const css=fs.readFileSync(path.join(root,'../phy489/assets/katex/katex.min.css'),'utf8');for(const m of css.matchAll(/url\(([^)]+)\)/g))assert.ok(fs.existsSync(path.join(root,'../phy489/assets/katex',m[1])));
assert.ok(fs.readFileSync(path.join(root,'../.gitignore'),'utf8').includes('/amp346/courseware/'));
assert.ok(fs.readFileSync(path.join(root,'../.github/workflows/pages.yml'),'utf8').includes("--exclude='/amp346/courseware/'"));
assert.ok(fs.readFileSync(path.join(root,'../index.html'),'utf8').includes('href="amp346/index.html"'));
console.log(`PASS: ${chapters.length} chapters, ${topics} bilingual source topics, 24 explained quizzes, ${equations} formulas, 11 labs / ${states} combined model states, offline resources, root card and source exclusions.`);

near(app.APM_MATH.erf(1),.8427007929497149,1e-10);
near(app.APM_MATH.erf(-2),-.9953222650189527,1e-10);
for(const t of [.2,.7]){
 near(diff(q=>app.APM_MATH.kernel(.6,q,.7),t)-.7*d2(x=>app.APM_MATH.kernel(x,t,.7),.6),0,2e-5);
 const A=1.2,L=2.7,c=1.4,a=.8,w=Math.sqrt(c*c*(Math.PI/L)**2+a*a);
 const integral=M.integrate(x=>.5*((-A*w*Math.sin(Math.PI*x/L)*Math.sin(w*t))**2+c*c*(A*Math.PI/L*Math.cos(Math.PI*x/L)*Math.cos(w*t))**2+a*a*(A*Math.sin(Math.PI*x/L)*Math.cos(w*t))**2),0,L,400);
 near(integral,app.APM_MATH.energy(A,c,L,a,t).total,1e-10);
}
console.log('PASS: independent erf reference values, heat-kernel PDE and direct spatial energy integrals.');
