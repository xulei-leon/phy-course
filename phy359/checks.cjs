/* Maintenance-only structural and numerical QA. */
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
require('./checks-models.cjs');
const root=__dirname,context={window:{},console};context.window=context;vm.createContext(context);
for(const f of ['content/part1.js','content/part2.js','assets/models.js','assets/experiments.js'])vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),context,{filename:f});
const {PHY,PHY_LABS}=context;assert.equal(PHY.chapters.length,16);
let formulas=0,cases=0;const katex=require('../phy489/assets/katex/katex.min.js');
const bilingual=v=>{assert.ok(v&&typeof v.zh==='string'&&v.zh.trim()&&typeof v.en==='string'&&v.en.trim(),'missing translation');};
const inspect=o=>{if(typeof o==='number')assert.ok(Number.isFinite(o),'nonfinite model result');else if(o&&typeof o==='object'){if('zh'in o||'en'in o)bilingual(o);for(const v of Object.values(o))inspect(v);}};
const sources=new Set();
for(const [i,c] of PHY.chapters.entries()){
 assert.equal(c.id,i+1);bilingual(c.title);bilingual(c.question);bilingual(c.intuition);bilingual(c.labTitle);bilingual(c.labNote);assert.equal(c.topics.length,3);assert.equal(c.derivation.length,3);assert.equal(c.quizzes.length,2);assert.ok(c.notes.length);
 for(const x of [...c.topics,...c.derivation,c.example]){bilingual(x.title);bilingual(x.text);if(x.math){try{katex.renderToString(x.math,{throwOnError:true,strict:'error'});}catch(e){console.error('Formula chapter '+c.id+': '+x.math+'\n'+e.message);process.exit(1);}formulas++;}}
 for(const q of c.quizzes){bilingual(q.question);bilingual(q.explanation);q.options.forEach(bilingual);assert.ok(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<q.options.length);}
 c.notes.forEach(bilingual);assert.ok(fs.existsSync(path.join(root,'courseware',c.source.file)));sources.add(c.source.file);
 assert.ok(c.pages[0]>0&&c.pages[1]>=c.pages[0]);c.topics.forEach(t=>assert.ok(t.source.page>=c.pages[0]&&t.source.page<=c.pages[1]));
 const lab=PHY_LABS[c.lab],state={};assert.ok(lab);lab.controls.forEach(x=>bilingual(x.label));
 const combos=(k)=>{if(k===lab.controls.length){const result=lab.calc(state);inspect(result);assert.ok(result.readings.length&&result.charts.length);for(const chart of result.charts){bilingual(chart.title);assert.ok(chart.series.some(s=>s.points.length>1));}cases++;return;}
 const ctrl=lab.controls[k],values=ctrl.options?ctrl.options.map(x=>x[0]):[ctrl.min,ctrl.value,ctrl.max];for(const value of [...new Set(values)]){state[ctrl.key]=value;combos(k+1);}};combos(0);
}
assert.equal(sources.size,10);
for(let i=0;i<=16;i++){
 const name=i?`chapter-${String(i).padStart(2,'0')}.html`:'index.html',html=fs.readFileSync(path.join(root,name),'utf8');assert.ok(html.includes(`data-chapter="${i}"`));assert.ok(!/https?:\/\//.test(html));assert.ok(!/type="module"/.test(html));
 for(const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)){assert.ok(fs.existsSync(path.resolve(root,match[1])),match[1]);}
}
const js=fs.readFileSync(path.join(root,'assets/course.js'),'utf8');assert.ok(!/fetch\(|XMLHttpRequest|https?:\/\//.test(js));
assert.ok(fs.readFileSync(path.join(root,'../.gitignore'),'utf8').includes('/phy359/courseware/'));assert.ok(fs.readFileSync(path.join(root,'../.github/workflows/pages.yml'),'utf8').includes("--exclude='/phy359/courseware/'"));
console.log(`PASS: 16 chapters, 32 explained quizzes, 10 mapped sources, ${formulas} formulas rendered strictly, ${cases} default/boundary/choice model combinations finite, offline relative assets and source exclusion.`);
if(process.argv.includes('--export')){
 const clean=s=>s.replace(/\|/g,'\\|').replace(/\n/g,' ');
 let md='# PHY359 来源与覆盖 / Sources and coverage\n\n10 份 PDF，31 页；实际 PDF 页序与印刷页码分别标注。所有网页讲解、例题、交互和自测均为教学改编。Part 3/4 未提供。原始 PDF 只在本地保存，不在线发布。 / Ten PDFs, 31 pages; actual PDF and printed pages are distinguished. All web explanations, examples, interactions and quizzes are teaching adaptations. Parts 3/4 were not supplied. Original PDFs remain local.\n\n';
 let lessons='# PHY359 双语内容稿 / Bilingual content manuscript\n\nGenerated from content/part1.js and part2.js by checks.cjs --export.\n\n';
 for(const c of PHY.chapters){md+=`## ${String(c.id).padStart(2,'0')} ${c.title.zh} / ${c.title.en}\n\n来源 / Source: \`${c.source.file}\` · PDF ${c.source.pages} · 印刷页 / printed pp. ${c.source.printed}\n\n| 主要小节 / Main topic | PDF page |\n|---|---|\n`+c.topics.map(t=>`| ${clean(t.title.zh)} / ${clean(t.title.en)} | ${t.source.page} |`).join('\n')+'\n\n'+c.notes.map(n=>'- '+n.zh+' / '+n.en).join('\n')+'\n\n';
 lessons+=`## ${c.id}. ${c.title.zh} / ${c.title.en}\n\nSource: ${c.source.file}, PDF ${c.source.pages}, printed ${c.source.printed}.\n\n`;
 const pair=(label,v)=>`### ${label}\n\n${v.zh}\n\n${v.en}\n\n`;
 lessons+=pair('直观问题 / Intuition question',c.question)+pair('讲解 / Explanation',c.intuition);
 for(const [group,items] of [['必要概念 / Concepts',c.topics],['公式推导 / Derivation',c.derivation],['例题 / Worked example',[c.example]]]){lessons+=`### ${group}\n\n`;for(const x of items)lessons+=`**${x.title.zh} / ${x.title.en}**\n\n${x.text.zh}\n\n${x.text.en}\n\n`+(x.math?'$$\n'+x.math+'\n$$\n\n':'');}
 lessons+=pair('交互模型 / Interactive model',c.labTitle)+pair('单位、假设与边界 / Units, assumptions and limits',c.labNote);
 c.quizzes.forEach((q,i)=>{lessons+=pair('自测 '+(i+1)+' / Self-check '+(i+1),q.question)+q.options.map((o,j)=>`${j+1}. ${o.zh} / ${o.en}`).join('\n')+`\n\nAnswer: ${q.answer+1}\n\n${q.explanation.zh}\n\n${q.explanation.en}\n\n`;});
 }
 fs.writeFileSync(path.join(root,'SOURCE-MAP.md'),md);fs.writeFileSync(path.join(root,'content/lessons.md'),lessons);
}
