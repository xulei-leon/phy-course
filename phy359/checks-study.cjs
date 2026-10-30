/* Self-study content contract; rendering behaviors are covered in checks-browser.cjs. */
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=__dirname,ctx={window:{},console};ctx.window=ctx;vm.createContext(ctx);
for(const f of ['part1.js','part2.js','study-helpers.js','study-01-04.js','study-05-08.js','study-09-12.js','study-13-16.js']){
 const p=path.join(root,'content',f);if(fs.existsSync(p))vm.runInContext(fs.readFileSync(p,'utf8'),ctx,{filename:f});
}
const katex=require('../phy489/assets/katex/katex.min.js');let formulas=0,exercises=0,examples=0;const ids=new Set();
const bi=x=>assert.ok(x&&typeof x.zh==='string'&&x.zh.trim()&&typeof x.en==='string'&&x.en.trim(),'both languages required');
const blocks=xs=>{assert.ok(Array.isArray(xs)&&xs.length);for(const b of xs){if(b.kind==='math'){katex.renderToString(b.math,{throwOnError:true,strict:'error'});formulas++;}else if(b.kind==='table'){b.headers.forEach(bi);b.rows.forEach(r=>{assert.equal(r.length,b.headers.length);r.forEach(bi);});}else if(b.kind==='list')b.items.forEach(bi);else {assert.ok(['p','h'].includes(b.kind));bi(b.text);}}};
for(const c of ctx.PHY.chapters){const s=c.study;assert.ok(s,`chapter ${c.id} needs complete self-study content`);assert.ok(s.goals.length>=3&&s.goals.length<=5);s.goals.forEach(bi);bi(s.bridge);bi(s.foundation.title);blocks(s.foundation.blocks);ids.add(`${c.id}#foundation`);
 for(const k of ['intuition','concepts','derivation'])blocks(s[k]);assert.ok(s.derivation.filter(b=>b.kind==='math').length>=3);
 assert.ok(s.tasks.length>=3);for(const t of s.tasks)for(const k of ['predict','action','record','explanation'])bi(t[k]);
 assert.ok(s.examples.length>=2);for(const e of s.examples){bi(e.title);blocks(e.blocks);examples++;}
 assert.ok(s.exercises.length>=3);for(const e of s.exercises){bi(e.question);assert.ok(e.hints.length>=2);e.hints.forEach(bi);blocks(e.solution);exercises++;}
 bi(s.review.connections);assert.ok(s.review.mistakes.length>=2&&s.review.checklist.length>=3);s.review.mistakes.forEach(bi);s.review.checklist.forEach(bi);assert.equal(s.choiceNotes.length,c.quizzes.length);s.choiceNotes.forEach(bi);
}
for(const c of ctx.PHY.chapters)for(const p of c.study.prerequisites){bi(p.label);assert.ok(ids.has(`${p.chapter}#${p.anchor}`),`missing prerequisite ${p.chapter}#${p.anchor}`);assert.ok(p.chapter<c.id,'first introduction must precede review link');}
console.log(`PASS: 16 bilingual self-study chapters; ${examples} worked examples, ${exercises} open exercises, ${formulas} strict formulas, foundations and review links.`);
module.exports={chapters:ctx.PHY.chapters,blocks};
