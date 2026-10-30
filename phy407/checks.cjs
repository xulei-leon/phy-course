/* Maintenance checks only. Students need no Node, installation, or server. */
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=__dirname,ctx=vm.createContext({console});ctx.window=ctx;
const scripts=['content/01-06.js','content/07-11.js','content/12-17.js','assets/models.js','assets/experiments.js'];
for(const f of scripts)vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),ctx,{filename:f});
const C=ctx.PHY.chapters,M=ctx.PHY_MATH,L=ctx.PHY_LABS,katex=require('../phy489/assets/katex/katex.min.js');
const near=(a,b,tol=1e-9)=>assert.ok(Math.abs(a-b)<=tol,`${a} differs from ${b}; tolerance ${tol}`);
const bi=x=>{assert.equal(typeof x.zh,'string');assert.equal(typeof x.en,'string');assert.ok(x.zh.trim()&&x.en.trim());};
let equations=0,topics=0,states=0;const sources=new Set();
const block=x=>{bi(x.title);bi(x.text);if(x.math){katex.renderToString(x.math,{throwOnError:true,strict:'ignore'});equations++;}};
assert.equal(C.length,17);
for(const [i,c] of C.entries()){
 assert.equal(c.id,i+1);assert.ok(c.lecture>=1&&c.lecture<=6);['title','question','intuition','labTitle','labNote'].forEach(k=>bi(c[k]));
 assert.ok(c.topics.length>=3);c.topics.forEach(x=>{block(x);assert.ok(x.source.page>=c.sources[x.source.sourceIndex||0].pages[0]&&x.source.page<=c.sources[x.source.sourceIndex||0].pages[1],`source page ${c.id}: ${x.source.page}`);topics++;});
 assert.ok(c.derivation.length>=3);c.derivation.forEach(block);block(c.example);assert.ok(c.notes.length);c.notes.forEach(bi);assert.ok(c.code);assert.equal(c.quizzes.length,3);
 for(const source of c.sources){assert.ok(fs.existsSync(path.join(root,'courseware',source.file)));sources.add(source.file);if(source.pages)assert.ok(source.pages[0]>0&&source.pages[1]>=source.pages[0]);}
 c.quizzes.forEach(q=>{bi(q.question);q.options.forEach(bi);bi(q.explanation);assert.ok(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<q.options.length);});
 const lab=L[c.lab],base=Object.fromEntries(lab.controls.map(x=>[x.key,x.options?x.options[0][0]:x.value]));const samples=[base];
 for(const ctrl of lab.controls){bi(ctrl.label);if(ctrl.options){ctrl.options.forEach(([v,b])=>{bi(b);samples.push({...base,[ctrl.key]:v});});}else{assert.ok(ctrl.value>=ctrl.min&&ctrl.value<=ctrl.max);near((ctrl.value-ctrl.min)/ctrl.step,Math.round((ctrl.value-ctrl.min)/ctrl.step),1e-8);for(const value of [ctrl.min,ctrl.max])samples.push({...base,[ctrl.key]:value});}}
 // Check combined corners and all select alternatives, as well as individual boundaries.
 let combos=[base];for(const ctrl of lab.controls){combos=combos.flatMap(s=>(ctrl.options?ctrl.options.map(x=>x[0]):[ctrl.min,ctrl.max]).map(v=>({...s,[ctrl.key]:v})));}samples.push(...combos);
 for(const s of samples){const r=lab.calc(s);states++;assert.ok(r.charts.length);bi(r.message);r.readings.forEach(x=>{bi(x.label);if(typeof x.value==='object')bi(x.value);else assert.ok(!/NaN|Infinity|undefined/.test(String(x.value)),`${c.id}: reading ${x.value}`);});for(const chart of r.charts){bi(chart.title);bi(chart.x);bi(chart.y);chart.series.forEach(s=>{bi(s.name);s.points.forEach(p=>assert.ok(p.length===2&&p.every(Number.isFinite),`${c.id}: nonfinite plot`));});}}
}
assert.equal(sources.size,13); // 12 PDFs and 1 HTML source.
// Independently known results and invariants.
assert.equal(M.leap(1900),false);assert.equal(M.leap(2000),true);assert.equal(M.leap(2100),false);assert.equal(M.leap(2024),true);
near(M.amdahl(.05,16),64/7);near(M.amdahl(0,16),16);near(M.amdahl(1,16),1);
assert.equal(Math.fround(Math.fround(1+2**-24)-1),0);near(Math.fround(1+2**-23)-1,2**-23,0);
const rot=M.rotation(200,1).at(-1);near(Math.hypot(rot[1],rot[2]),1.1036770429380234,1e-12);
near(M.quad(x=>x**3,0,1,4,'simpson'),.25);near(M.quad(x=>x**4,0,1,4,'simpson'),.20052083333333333);
assert.throws(()=>M.quad(x=>x,0,1,3,'simpson'));
const trapE=n=>Math.abs(M.quad(Math.exp,0,1,n)-Math.expm1(1));near(trapE(32)/trapE(64),4,.001);
const simE=n=>Math.abs(M.quad(Math.exp,0,1,n,'simpson')-Math.expm1(1));near(simE(16)/simE(32),16,.01);
near(M.diff(Math.exp,1,.1,'central'),2.722814563947417,1e-11);
const centralE=h=>Math.abs(M.diff(Math.exp,1,h,'central')-Math.E);near(centralE(.02)/centralE(.01),4,.001);
for(let degree=0;degree<=3;degree++)near(M.gauss2(x=>x**degree,-1,1),degree%2?0:2/(degree+1));
near(M.romberg(Math.exp,-1,1,5).at(-1).at(-1),Math.E-1/Math.E,1e-12);
const xs=[-1,0,1],ys=xs.map(x=>2*x*x+3*x+4),w=M.weights(xs);for(const x of [-1,-.7,0,.3,1])near(M.bary(xs,ys,w,x),2*x*x+3*x+4);
const fit=M.fit([0,1,2],[1,2,2]);near(fit.m,.5);near(fit.b,7/6);near(fit.sse,1/6);
const pivot=M.solve([[0,1],[1,1]],[1,0]);near(pivot[0],-1);near(pivot[1],1);assert.equal(M.solve([[1,2],[2,4]],[3,6]),null);
const condition=M.solve([[1,1],[1,1.000001]],[2,2.00000101]);near(condition[0],.99,1e-8);near(condition[1],1.01,1e-8);
for(const method of ['newton','bisect','fixed']){const r=M.root(method,1,.5,60);assert.equal(r.reason,'residual');near(r.points.at(-1)[1],Math.SQRT2,1e-9);}assert.equal(M.root('bisect',1,.5,30).reason,'budget');assert.equal(M.root('newton',0).reason,'derivative');assert.notEqual(M.root('fixed',3,1).reason,'residual');
const gs=M.golden(x=>(x-.7)**2+1,-2,3,10),g=gs.at(-1),tau=(Math.sqrt(5)-1)/2;near(g.b-g.a,5*tau**10);assert.ok(g.a<=.7&&g.b>=.7);assert.equal(g.calls,12);
// Direct DFT, radix-2 FFT and both inverses, varied lengths and complex samples.
for(const n of [1,2,4,8,16,32,64])for(const kind of ['constant','impulse','complex']){
 const y=Array.from({length:n},(_,i)=>kind==='constant'?[1,0]:kind==='impulse'?[i===0?1:0,0]:[Math.cos(.7*i),Math.sin(.9*i)]),d=M.dft(y),f=M.fft(y),di=M.dft(d,true),fi=M.fft(f,true);
 for(let i=0;i<n;i++){near(f[i][0],d[i][0],1e-10);near(f[i][1],d[i][1],1e-10);for(let j=0;j<2;j++){near(di[i][j],y[i][j],1e-11);near(fi[i][j],y[i][j],1e-11);}}
 if(kind==='constant'){near(f[0][0],n);for(let i=1;i<n;i++)near(Math.hypot(...f[i]),0);}
 if(kind==='impulse')f.forEach(v=>{near(v[0],1);near(v[1],0);});
}
const sine=Array.from({length:64},(_,i)=>Math.sin(2*Math.PI*5*i/64)),spec=M.dft(sine);near(spec[5][0],0);near(spec[5][1],-32);near(spec[59][1],32);
const alias=M.dft(Array.from({length:64},(_,i)=>Math.sin(2*Math.PI*59*i/64)));near(alias[5][1],32);
// Rectangular 2D transform: compare to an independent double-sum formula, not only a round trip.
const image=Array.from({length:3},(_,m)=>Array.from({length:4},(_,n)=>m*4+n)),d2=M.dft2(image),back=M.dft2(d2,true);
for(let k=0;k<3;k++)for(let l=0;l<4;l++){let re=0,im=0;for(let m=0;m<3;m++)for(let n=0;n<4;n++){const angle=-2*Math.PI*(k*m/3+l*n/4);re+=image[m][n]*Math.cos(angle);im+=image[m][n]*Math.sin(angle);}near(d2[k][l][0],re);near(d2[k][l][1],im);near(back[k][l][0],image[k][l]);near(back[k][l][1],0);}
for(let id=0;id<=17;id++){const f=id?`chapter-${String(id).padStart(2,'0')}.html`:'index.html',html=fs.readFileSync(path.join(root,f),'utf8');assert.ok(html.includes(`data-chapter="${id}"`));assert.ok(html.includes("connect-src 'none'"));for(const m of html.matchAll(/(?:href|src)="([^"]+)"/g)){assert.ok(!/^(https?:|\/)/.test(m[1]));assert.ok(fs.existsSync(path.resolve(root,m[1])),`${f}: missing ${m[1]}`);}}
for(const file of [...scripts,'assets/course.js'])assert.ok(!/\bfetch\s*\(|XMLHttpRequest|https?:\/\//.test(fs.readFileSync(path.join(root,file),'utf8')));
const css=fs.readFileSync(path.join(root,'../phy489/assets/katex/katex.min.css'),'utf8');for(const m of css.matchAll(/url\(([^)]+)\)/g))assert.ok(fs.existsSync(path.join(root,'../phy489/assets/katex',m[1])));
assert.ok(fs.readFileSync(path.join(root,'../.gitignore'),'utf8').includes('/phy407/courseware/'));
assert.ok(fs.readFileSync(path.join(root,'../.github/workflows/pages.yml'),'utf8').includes("--exclude='/phy407/courseware/'"));
console.log(`PASS: 17 chapters, ${topics} bilingual source topics, 51 explained quizzes, ${equations} formulas, ${states} model states, analytic/convergence checks, FFT/DFT and rectangular 2D checks, offline resources and source exclusions.`);
