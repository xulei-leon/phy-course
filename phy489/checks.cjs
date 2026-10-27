/* Run with node checks.cjs. No server and no external test dependency. */
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const crypto=require('node:crypto');
const root=__dirname, ctx=vm.createContext({console});ctx.window=ctx;
for(const file of ['content/01-05.js','content/06-10.js','content/11-15.js','content/16-20.js','assets/experiments.js'])vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),ctx,{filename:file});
const C=ctx.PHY.chapters,M=ctx.PHY_MATH;
const near=(x,y,eps=1e-10)=>assert.ok(Math.abs(x-y)<eps,`${x} != ${y}`);
const katex=require('./assets/katex/katex.min.js');
let equations=0;
assert.equal(C.length,20);assert.equal(new Set(C.map(c=>c.lab)).size,20);
let previousEnd=5;
const bilingual=v=>{assert.equal(typeof v.zh,'string');assert.equal(typeof v.en,'string');assert.ok(v.zh.trim()&&v.en.trim());};
for(const [i,c] of C.entries()){
 assert.equal(c.id,i+1);assert.equal(c.pages[0],previousEnd+1);assert.ok(c.pages[1]>=c.pages[0]);previousEnd=c.pages[1];
 bilingual(c.title);bilingual(c.question);bilingual(c.intuition);bilingual(c.labTitle);bilingual(c.labNote);
 assert.ok(c.topics.length>=3);assert.ok(c.derivation.length>=3);assert.equal(c.quizzes.length,3);assert.ok(ctx.PHY_LABS[c.lab]);
 for(const block of [...c.topics,...c.derivation,c.example]){
  bilingual(block.title);bilingual(block.text);
  if(block.math){katex.renderToString(block.math,{throwOnError:true,strict:'ignore'});equations++;}
 }
 c.notes.forEach(bilingual);
 c.quizzes.forEach(q=>{bilingual(q.question);q.options.forEach(bilingual);assert.ok(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<q.options.length);bilingual(q.explanation);});
 const lab=ctx.PHY_LABS[c.lab],defaults={};
 lab.controls.forEach(x=>defaults[x.key]=x.options?x.options[0][0]:x.value);
 const states=[defaults];
 for(const x of lab.controls){if(x.options)x.options.forEach(([value])=>states.push({...defaults,[x.key]:value}));else for(const value of [x.min,x.max])states.push({...defaults,[x.key]:value});}
 for(const state of states){
  const result=lab.calc(state);assert.ok(result.readings||result.formula||result.message);
  if(result.chart){
   for(const series of result.chart.series){assert.ok(series.points.length>2);series.points.forEach(p=>assert.ok(p.every(Number.isFinite),`${c.lab}: nonfinite plot`));}
   if(result.chart.mark){const points=result.chart.series.flatMap(s=>s.points);for(const axis of [0,1]){const values=points.map(p=>p[axis]);assert.ok(result.chart.mark[axis]>=Math.min(...values)-1e-7&&result.chart.mark[axis]<=Math.max(...values)+1e-7,`${c.lab}: mark outside plot`);}}
  }
  if(result.formula)katex.renderToString(result.formula,{throwOnError:true,strict:'ignore'});
  if(result.bars){near(result.bars.reduce((n,b)=>n+b.value,0),1);result.bars.forEach(b=>assert.ok(b.value>=0&&b.value<=1));}
 }
}
assert.equal(previousEnd,123);
near(M.gamma(0),1);near(M.gamma(.8),5/3);
for(const beta of [-.9,-.3,0,.5,.9]){const p=M.boost(2,1,beta);near(p.t*p.t-p.x*p.x,3);const back=M.boost(p.t,p.x,-beta);near(back.t,2);near(back.x,1);}
assert.equal(M.momentum(150,100,100),null);near(M.momentum(200,100,100),0);near(M.momentum(1000,0,0),500);
const p=M.momentum(497.65,139.57,139.57);near(2*Math.hypot(p,139.57),497.65);near(p,206.01,.02);
near(M.interference(1,Math.PI),0);near(M.interference(1,0),4);
near(M.cp(.5,Math.PI/2,Math.PI/6).asym,-.4);near(M.cp(.5,0,1).asym,0);near(M.cp(.5,1,0).asym,0);
assert.equal(M.cp(1,Math.PI,0).asym,null);
assert.ok(M.alpha(100)>0&&M.alpha(100)<M.alpha(2));
near(M.exchange(Math.PI/2,0),-1);
assert.equal(M.width(150,100,100,10),null);near(M.width(200,100,100,10),0);
near(M.width(1000,0,0,10),100/(16*Math.PI*1000));
near(M.width(1000,0,0,10,.5),.5*M.width(1000,0,0,10));
for(const p of [0,.1,1,10,20]){const c=M.chirality(p);near(c.left+c.right,1);assert.ok(c.left>=0&&c.right<=1);near(Math.sqrt((c.e-p)*(c.e+p)),1);}
near(M.chirality(0).left,.5);assert.ok(M.chirality(10).right>.997);
for(let n=0;n<=20;n++){
 const file=n?`chapter-${String(n).padStart(2,'0')}.html`:'index.html';const html=fs.readFileSync(path.join(root,file),'utf8');
 assert.ok(html.includes(`data-chapter="${n}"`));
 for(const match of html.matchAll(/(?:src|href)="([^"]+)"/g)){assert.ok(!/^https?:/.test(match[1]));assert.ok(fs.existsSync(path.join(root,match[1])),`${file}: ${match[1]} missing`);}
 assert.ok(html.includes("connect-src 'none'"));
}
const css=fs.readFileSync(path.join(root,'assets/katex/katex.min.css'),'utf8');
for(const m of css.matchAll(/url\(([^)]+)\)/g))assert.ok(fs.existsSync(path.join(root,'assets/katex',m[1])));
const visit=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?visit(path.join(dir,e.name)):[path.join(dir,e.name)]);
for(const file of visit(root).filter(f=>/\.(js|cjs|css|html|md)$/.test(f))){const b=fs.readFileSync(file);assert.ok(!b.includes(Buffer.from('\r\n')),`${file}: CRLF`);}
const source=path.resolve(root,'../PHY489_Detailed_Notes.pdf');
if(fs.existsSync(source)){const hash=f=>crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex');assert.equal(hash(source),hash(path.join(root,'courseware/PHY489_Detailed_Notes.pdf')));}
console.log(`PASS: 20 chapters, 60 bilingual questions, ${equations} equations, 20 lab models and boundary cases, 21 entry points, local resources, LF, source SHA-256.`);
