/* Offline content and numerical checks; no browser or server is launched. */
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=__dirname,ctx=vm.createContext({console});ctx.window=ctx;
for(const f of ['content/01-06.js','content/07-12.js','content/13-18.js','content/19-24.js','assets/experiments.js'])vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),ctx,{filename:f});
const katex=require('../phy489/assets/katex/katex.min.js'),C=ctx.PHY.chapters,M=ctx.QM;
const near=(a,b,e=1e-10)=>assert.ok(Math.abs(a-b)<e,`${a} != ${b}`);
const bi=x=>{assert.ok(x&&typeof x.zh==='string'&&x.zh.trim());assert.ok(typeof x.en==='string'&&x.en.trim());};
let equations=0,states=0;
assert.equal(C.length,24);
for(const [i,c] of C.entries()){
 assert.equal(c.id,i+1);for(const k of ['title','question','intuition','labTitle','labNote'])bi(c[k]);
 assert.equal(c.topics.length,3);assert.equal(c.derivation.length,3);assert.equal(c.quizzes.length,2);
 for(const block of [...c.topics,...c.derivation,c.example]){bi(block.title);bi(block.text);if(block.math){katex.renderToString(block.math,{throwOnError:true,strict:'ignore'});equations++;}}
 c.notes.forEach(bi);for(const q of c.quizzes){bi(q.question);bi(q.explanation);q.options.forEach(bi);assert.ok(q.answer>=0&&q.answer<q.options.length);}
 const lab=ctx.PHY_LABS[c.lab];assert.ok(lab);let defaults={};
 let corners=[{}];for(const x of lab.controls){bi(x.label);const vals=x.options?x.options.map(v=>v[0]):[x.min,x.max];if(x.options)x.options.forEach(v=>bi(v[1]));defaults[x.key]=x.options?x.options[0][0]:x.value;corners=corners.flatMap(p=>vals.map(v=>({...p,[x.key]:v})));}
 for(const state of [defaults,...corners]){states++;const r=lab.calc(state);assert.ok(r.readings?.length);for(const v of r.readings)assert.ok(!/NaN|Infinity|undefined/.test(typeof v.value==='string'?v.value:JSON.stringify(v.value)));if(r.formula)katex.renderToString(r.formula,{throwOnError:true});if(r.bars){near(r.bars.reduce((n,v)=>n+v.value,0),1);r.bars.forEach(b=>assert.ok(b.value>=0&&b.value<=1));}if(r.chart){for(const series of r.chart.series)series.points.forEach(p=>assert.ok(p.every(Number.isFinite)));if(r.chart.mark)assert.ok(r.chart.mark.every(Number.isFinite));}}
}
// Independent known values, conservation and limiting relations.
near(M.sinc(0),1);near(M.sinc(Math.PI),0);near(M.lower(0),0);near(M.lower(.1),-.0099019513592785);
near(M.gaussian(1),.5);near(M.gaussian(2),.625);near(M.coulomb(1),-.5);near(M.coulomb(2),0);
near(M.split(0,.2)*2,.4);near(M.golden(.02,3),.007539822368615503);near(M.golden(.04,3),4*M.golden(.02,3));
near(M.born(1,Math.PI/2),Math.exp(-2));near(M.born(1,Math.PI),Math.exp(-4));
for(const e of [.05,.5,.95]){near(M.transmission(e,0),1);let last=1;for(let a=0;a<=8;a+=.1){const t=M.transmission(e,a);assert.ok(t>0&&t<=last+1e-12);last=t;}}
for(const a of [.2,.5,1,2,4])assert.ok(M.gaussian(a)>=.5);
const lab=(n,state)=>ctx.PHY_LABS[n].calc(state);
near(lab(1,{theta:90,phi:0}).bars[0].value,1);near(lab(1,{theta:90,phi:180}).bars[0].value,0);
near(lab(12,{theta:60}).bars[0].value,.75);near(lab(15,{phi:180}).bars[0].value,0);
near(Number(lab(18,{time:10,d:0}).readings[0].value),.16);assert.ok(lab(23,{r:1}).message.en.includes('forbidden'));
for(const space of ['1','-1'])for(const spin of ['1','-1'])assert.equal(lab(24,{space,spin}).readings[1].value.en,Number(space)*Number(spin)===-1?'Allowed':'Forbidden');
for(let n=0;n<=24;n++){const file=n?`chapter-${String(n).padStart(2,'0')}.html`:'index.html',html=fs.readFileSync(path.join(root,file),'utf8');assert.ok(html.includes(`data-chapter="${n}"`));assert.ok(html.includes("connect-src 'none'"));for(const m of html.matchAll(/(?:src|href)="([^"]+)"/g)){assert.ok(!/^https?:/.test(m[1]));assert.ok(fs.existsSync(path.resolve(root,m[1])),`${file}: ${m[1]}`);}}
const renderer=fs.readFileSync(path.join(root,'assets/course.js'),'utf8');assert.ok(!/PHY489|1489|PDF|c\.pages|localSource/.test(renderer));assert.ok(!/\bfetch\s*\(|XMLHttpRequest|WebSocket/.test(renderer));
const css=fs.readFileSync(path.resolve(root,'../phy489/assets/katex/katex.min.css'),'utf8');for(const m of css.matchAll(/url\(([^)]+)\)/g))assert.ok(fs.existsSync(path.resolve(root,'../phy489/assets/katex',m[1])));
if(process.argv.includes('--export')){
 let md='# PHY456H1 — 24 页双语内容稿\n\n独立教学改编；来源与内容边界见 README.md。每一编号对应一个独立网页，不是打印页数。\n\n';
 const pair=x=>`${x.zh}\n\n${x.en}\n\n`,block=x=>`### ${x.title.zh} / ${x.title.en}\n\n${pair(x.text)}${x.math?'$$\n'+x.math+'\n$$\n\n':''}`;
 for(const c of C){md+=`---\n\n## ${String(c.id).padStart(2,'0')} · ${c.title.zh} / ${c.title.en}\n\n`;
 md+='### 直观问题 / Intuition\n\n'+pair(c.question)+pair(c.intuition)+'### 必要概念 / Concepts\n\n'+c.topics.map(block).join('')+'### 公式推导 / Derivation\n\n'+c.derivation.map(block).join('')+'### 交互实验 / Interactive model\n\n'+pair(c.labTitle)+pair(c.labNote);
 md+='### 输入与范围 / Controls and ranges\n\n'+ctx.PHY_LABS[c.lab].controls.map(x=>`- ${x.label.zh} / ${x.label.en}: ${x.options?x.options.map(v=>v[1].zh+' / '+v[1].en).join('; '):`${x.min}–${x.max}, step ${x.step}, default ${x.value}`}\n`).join('')+'\n### 例题 / Worked example\n\n'+block(c.example)+'### 自测与解释 / Self-check\n\n';
 for(const [i,q] of c.quizzes.entries())md+=`${i+1}. ${q.question.zh} / ${q.question.en}\n\n${q.options.map((o,j)=>`   ${String.fromCharCode(65+j)}. ${o.zh} / ${o.en}`).join('\n')}\n\n答案 / Answer: ${String.fromCharCode(65+q.answer)}\n\n${pair(q.explanation)}`;
 for(const note of c.notes)md+=pair(note);
 }fs.writeFileSync(path.join(root,'content/lessons.md'),md.trimEnd()+'\n');
}
console.log(`PASS: 24 lessons, 48 bilingual questions, ${equations} equations, ${states} model states, 25 local HTML entries, physical limits and local assets.`);
