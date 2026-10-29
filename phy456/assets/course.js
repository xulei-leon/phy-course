(() => {
 'use strict';
 const chapters=PHY.chapters, id=Number(document.body.dataset.chapter||0);
 const c=chapters.find(x=>x.id===id);
 const ui={
  home:B('课程目录','Course contents'),menu:B('章节目录','Chapters'),source:B('官方课程目录','Official calendar'),previous:B('上一页','Previous page'),next:B('下一页','Next page'),
  steps:[B('直观问题','Intuition'),B('必要概念','Concepts'),B('公式推导','Derivation'),B('交互实验','Experiment'),B('例题','Worked example'),B('自测与解释','Self-check')],
  step:B('下一步','Reveal next step'),reset:B('重置实验','Reset experiment'),check:B('检查答案','Check answers'),correct:B('正确','Correct'),wrong:B('再想一想','Reconsider'),unanswered:B('尚未作答','Not answered'),answer:B('正确答案：','Correct answer: '),
  addition:B('教学补充例题','Teaching example'),notes:B('范围与本页约定','Scope and conventions'),references:B('课程范围与延伸阅读','Scope sources and further reading'),
  intro:B('24 页，从量子动力学到全同粒子，连接公式、模型与物理解释。','24 pages linking equations, models and interpretation, from quantum dynamics to identical particles.'),
  subtitle:B('依据多伦多大学官方课程主题编写 · 中英文交互课件','Original bilingual interactive lessons based on University of Toronto course topics'),
  start:B('开始第一页','Start Page 1'),how:B('每章的学习顺序','The learning sequence'),overview:B('24 页学习目录','24-page contents'),
  help:B('公式和实验可离线使用；中文／英文切换保留当前实验与答案。','Equations and experiments work offline. Switching Chinese/English preserves the current experiment and answers.'),
  noteHome:B('本课件是基于官网主题的自主教学改编，不是多伦多大学官方课件。24 页的划分、推导、交互、例题与自测均为新增内容。尚未取得目标学期完整 syllabus，授课顺序、教材、考核与覆盖深度待核实。','This independently authored teaching adaptation follows official topic listings and is not University of Toronto courseware. The 24-page structure, derivations, models, examples and questions are original additions. A term-specific syllabus was not obtained; order, textbook, assessment and depth remain unverified.'),
  appendix:B('课程范围与来源','Course scope and sources'),
  sourceTitle:B('官网用于确认主题：PHY456H1，先修 PHY356H1，24L/12T。讲解采用标准非相对论量子力学；MIT 开放课程仅作延伸阅读，不代表多伦多大学指定教材。查阅日期：2026-10-29。','Official scope: PHY456H1, prerequisite PHY356H1, 24L/12T. Lessons use standard nonrelativistic quantum mechanics. MIT open courses are further reading, not U of T assigned texts. Sources accessed 2026-10-29.'),
  group:[B('01–06 · 态、动力学与 WKB','01–06 · States, dynamics and WKB'),B('07–12 · 变分、微扰与自旋','07–12 · Variation, perturbation and spin'),B('13–18 · 角动量与含时演化','13–18 · Angular momentum and driven dynamics'),B('19–24 · 跃迁、散射与全同粒子','19–24 · Transitions, scattering and identical particles')]

 };
 let lang=new URLSearchParams(location.search).get('lang');
 if(!['zh','en'].includes(lang)){try{lang=localStorage.getItem('phy456-language');}catch{} }
 if(!['zh','en'].includes(lang))lang='zh';
 const t=v=>typeof v==='object'?(v[lang]??''):String(v??'');
 const esc=s=>String(s).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
 const bi=(tag,b,attrs='')=>`<${tag} data-zh="${esc(b.zh)}" data-en="${esc(b.en)}" ${attrs}>${esc(t(b))}</${tag}>`;
 const math=s=>s?`<div class="equation">\\[${esc(s)}\\]</div>`:'';
 const href=n=>n?`chapter-${String(n).padStart(2,'0')}.html`:'index.html';
 const arrow=dir=>`<svg aria-hidden="true" viewBox="0 0 24 24"><path d="${dir==='left'?'M19 12H5m6-6-6 6 6 6':'M5 12h14m-6-6 6 6-6 6'}"/></svg>`;
 const navlink=(n,b,cls='')=>`<a class="${cls}" data-course-link href="${href(n)}?lang=${lang}">${bi('span',b)}</a>`;
 const topic=(x,i)=>`<article class="topic">${bi('h3',x.title)}${bi('p',x.text)}${math(x.math)}</article>`;
 const section=(n,body)=>`<section id="step-${n}" class="learning-section" aria-labelledby="heading-${n}"><h2 id="heading-${n}"><span class="step-number">${n}</span>${bi('span',ui.steps[n-1])}</h2>${body}</section>`;
 const sourceLink=(page,label)=>`<a href="#sources">${typeof label==='object'?bi('span',label):esc(label)}</a>`;
 const references=()=>`<ul><li><a href="https://artsci.calendar.utoronto.ca/course/phy456h1" target="_blank" rel="noopener">${bi('span',B('S1 · 多伦多大学课程目录','S1 · University of Toronto calendar'))}</a></li><li><a href="https://www.physics.utoronto.ca/undergraduate/current-and-prospective-students/undergraduate-courses/quantum-mechanics-ii/" target="_blank" rel="noopener">${bi('span',B('S2 · 物理系课程说明（含全同粒子）','S2 · Physics department description (including identical particles)'))}</a></li><li><a href="https://ocw.mit.edu/courses/8-05-quantum-physics-ii-fall-2013/pages/lecture-notes/" target="_blank" rel="noopener">${bi('span',B('R1 · MIT 8.05：动力学、自旋与角动量延伸阅读','R1 · MIT 8.05: dynamics, spin and angular momentum reading'))}</a></li><li><a href="https://ocw.mit.edu/courses/8-06-quantum-physics-iii-spring-2018/pages/video-lectures/" target="_blank" rel="noopener">${bi('span',B('R2 · MIT 8.06：近似、散射与全同粒子延伸阅读','R2 · MIT 8.06: approximations, scattering and identical particles reading'))}</a></li></ul>`;

 function renderShell(){
  const sidebar=`<aside id="chapter-nav" class="sidebar" aria-label="${t(ui.menu)}">${navlink(0,ui.home,'home-link')}<nav>${chapters.map(x=>navlink(x.id,B(`${String(x.id).padStart(2,'0')}　${x.title.zh}`,`${String(x.id).padStart(2,'0')}　${x.title.en}`),x.id===id?'chapter-link selected':'chapter-link').replace(x.id===id?'class="chapter-link selected"':'__never__','class="chapter-link selected" aria-current="page"')).join('')}</nav><div class="sidebar-source">${sourceLink(124,ui.appendix)}</div></aside>`;
  document.getElementById('app').innerHTML=`<a class="skip" href="#main">${bi('span',B('跳转正文','Skip to content'))}</a><header class="topbar"><button id="menu" class="menu-button" aria-expanded="false" aria-controls="chapter-nav">${bi('span',ui.menu)}</button><a class="wordmark" data-course-link href="index.html?lang=${lang}">PHY456</a>${bi('span',B('量子力学 II','Quantum Mechanics II'),'class="course-name"')}<div class="language" role="group" aria-label="Language"><button id="zh" lang="zh-CN">中文</button><span aria-hidden="true">/</span><button id="en" lang="en">English</button></div></header>${sidebar}<main id="main" tabindex="-1"></main><footer class="pager"></footer>`;
  document.getElementById('menu').onclick=()=>{const b=document.getElementById('menu');const on=b.getAttribute('aria-expanded')==='true';b.setAttribute('aria-expanded',String(!on));document.body.classList.toggle('nav-open',!on);};
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){document.body.classList.remove('nav-open');document.getElementById('menu').setAttribute('aria-expanded','false');}});
  document.getElementById('zh').onclick=()=>setLanguage('zh');document.getElementById('en').onclick=()=>setLanguage('en');
 }
 function renderHome(){
  document.getElementById('main').innerHTML=`<div class="home-intro">${bi('h1',B('量子力学 II：从态到散射','Quantum Mechanics II: from states to scattering'))}${bi('p',ui.subtitle,'class="subtitle"')}${bi('p',ui.intro,'class="lead"')}${navlink(1,ui.start,'primary start-link')}</div><section class="sequence-home">${bi('h2',ui.how)}<ol>${ui.steps.map((s,i)=>`<li><span>${i+1}</span>${bi('strong',s)}</li>`).join('')}</ol>${bi('p',ui.help)}</section><section class="contents">${bi('h2',ui.overview)}${ui.group.map((g,i)=>`<div class="chapter-group">${bi('h3',g)}${chapters.slice(i*6,i*6+6).map(x=>`<a data-course-link class="contents-row" href="${href(x.id)}?lang=${lang}"><span class="chapter-index">${String(x.id).padStart(2,'0')}</span>${bi('span',x.title,'class="contents-title"')}${arrow('right')}</a>`).join('')}</div>`).join('')}</section><section id="sources" class="sources home-sources">${bi('h2',ui.references)}${bi('p',ui.noteHome)}${bi('p',ui.sourceTitle)}${references()}</section>`;
  document.querySelector('.pager').innerHTML=`<span>PHY456H1</span>${bi('span',B('24 页 · 离线学习','24 pages · Offline learning'))}${navlink(1,ui.start,'primary')}`;
 }
 let labInstance;
 function renderChapter(){
  const pages=B('教学改编 · '+(id===1?'先修复习':id>=23?'S2 补充主题':'S1 / S2 课程主题'),'Teaching adaptation · '+(id===1?'prerequisite review':id>=23?'S2 additional topic':'S1 / S2 course topic'));
  const title=B(`${c.id}. ${c.title.zh}`,`${c.id}. ${c.title.en}`);
  const stepsNav=`<nav class="step-nav" aria-label="Learning sequence">${ui.steps.map((s,i)=>`<a href="#step-${i+1}"><span>${i+1}</span>${bi('span',s)}</a>`).join('')}</nav>`;
  const derivation=`<div class="derivation-list">${c.derivation.map((x,i)=>`<article class="derivation-step" ${i?'hidden':''}><div class="derivation-counter">${String(i+1).padStart(2,'0')}</div><div>${bi('h3',x.title)}${bi('p',x.text)}${math(x.math)}</div></article>`).join('')}</div><button class="secondary reveal">${bi('span',ui.step)}</button>`;
  const quizzes=c.quizzes.map((q,i)=>`<fieldset class="quiz-item"><legend><span class="question-number">${i+1}.</span> ${bi('span',q.question)}</legend>${q.options.map((o,j)=>`<label class="answer-option"><input type="radio" name="q${i}" value="${j}">${bi('span',o)}</label>`).join('')}<div class="quiz-feedback" aria-live="polite" hidden></div></fieldset>`).join('');
  document.getElementById('main').innerHTML=`<div class="chapter-heading">${bi('h1',title)}<div class="source-line">${sourceLink(0,pages)}</div></div>${stepsNav}${section(1,`<div class="intuition-question">${bi('p',c.question)}</div>${bi('p',c.intuition,'class="lead"')}`)}${section(2,c.topics.map(topic).join(''))}${section(3,derivation)}${section(4,`${bi('h3',c.labTitle)}${bi('p',c.labNote,'class="model-note"')}<div id="experiment"></div>`)}${section(5,`${bi('p',ui.addition,'class="addition-label"')}${topic(c.example)}`)}${section(6,`<form id="quiz-form">${quizzes}<button class="primary" type="submit">${bi('span',ui.check)}</button><p id="quiz-score" role="status"></p></form>`)}<section id="sources" class="sources">${bi('h2',ui.references)}${bi('p',ui.sourceTitle)}${bi('p',pages)}${references()}${c.notes.length?`${bi('h3',ui.notes)}<ul>${c.notes.map(n=>bi('li',n)).join('')}</ul>`:''}</section>`;
  const pager=document.querySelector('.pager');
  pager.innerHTML=`<a data-course-link class="secondary" href="${href(id-1)}?lang=${lang}">${arrow('left')}${bi('span',id===1?ui.home:ui.previous)}</a>${bi('span',B(`第 ${id} / 24 页`,`Page ${id} of 24`),'class="page-count"')}<a data-course-link class="primary" href="${href(id===24?0:id+1)}?lang=${lang}">${bi('span',id===24?ui.home:ui.next)}${arrow('right')}</a>`;
  const reveal=document.querySelector('.reveal');reveal.onclick=()=>{const hidden=document.querySelector('.derivation-step[hidden]');if(hidden){hidden.hidden=false;renderMath(hidden);}if(!document.querySelector('.derivation-step[hidden]'))reveal.hidden=true;};
  document.getElementById('quiz-form').onsubmit=e=>{e.preventDefault();grade();};
  labInstance=mountLab(document.getElementById('experiment'),PHY_LABS[c.lab]);
 }
 let graded=false;
 function grade(){
  graded=true;let score=0;
  document.querySelectorAll('.quiz-item').forEach((f,i)=>{const q=c.quizzes[i],selected=f.querySelector('input:checked'),correct=selected&&Number(selected.value)===q.answer;if(correct)score++;const output=f.querySelector('.quiz-feedback');output.hidden=false;output.className='quiz-feedback '+(correct?'is-correct':'is-wrong');output.innerHTML=bi('strong',!selected?ui.unanswered:correct?ui.correct:ui.wrong)+bi('p',B(ui.answer.zh+q.options[q.answer].zh,ui.answer.en+q.options[q.answer].en))+bi('p',q.explanation);});
  document.getElementById('quiz-score').textContent=lang==='zh'?`本次答对 ${score} / ${c.quizzes.length} 题。`:`${score} / ${c.quizzes.length} correct.`;
 }
 function renderMath(root=document.body){if(window.renderMathInElement)renderMathInElement(root,{delimiters:[{left:'\\[',right:'\\]',display:true},{left:'\\(',right:'\\)',display:false}],throwOnError:false,strict:'ignore',trust:false});}
 function mountLab(root,definition){
  const state={};definition.controls.forEach(x=>state[x.key]=x.options?x.options[0][0]:x.value);
  root.innerHTML=`<div class="lab-controls">${definition.controls.map(x=>x.options?`<label class="control">${bi('span',x.label)}<select data-key="${x.key}">${x.options.map(([key,label])=>`<option value="${key}" ${typeof label==='object'?`data-zh="${esc(label.zh)}" data-en="${esc(label.en)}"`:''}>${esc(t(label))}</option>`).join('')}</select></label>`:`<div class="control"><label for="lab-${x.key}">${bi('span',x.label)}</label><div class="slider-row"><input id="lab-${x.key}" data-key="${x.key}" type="range" min="${x.min}" max="${x.max}" step="${x.step}" value="${x.value}"><input data-number="${x.key}" type="number" min="${x.min}" max="${x.max}" step="${x.step}" value="${x.value}" aria-label="${esc(t(x.label))}"></div></div>`).join('')}<button class="secondary reset-lab" type="button">${bi('span',ui.reset)}</button></div><div class="lab-result"><div class="readings" aria-live="polite"></div><div class="lab-visual"></div><div class="lab-message"></div></div>`;
  const update=()=>{
   const result=definition.calc(state);
   root.querySelector('.readings').innerHTML=(result.readings||[]).map(r=>`<div class="reading"><span>${esc(t(r.label))}</span><output>${esc(t(r.value))}</output></div>`).join('');
   const visual=root.querySelector('.lab-visual');
   if(result.chart)visual.innerHTML=chart(result.chart);
   else if(result.bars)visual.innerHTML=`<div class="probability-bars">${result.bars.map((b,i)=>`<div>${bi('p',b.label)}<div class="bar-track"><div style="width:${100*b.value}%;background:${i?'#d08b3e':'#087e8b'}"></div></div><strong>${(b.value*100).toFixed(1)}%</strong></div>`).join('')}</div>`;
   else visual.innerHTML=result.formula?math(result.formula):'';
   root.querySelector('.lab-message').innerHTML=result.message?bi('p',result.message):'';renderMath(visual);
   definition.controls.filter(x=>!x.options).forEach(x=>{root.querySelector(`[data-number="${x.key}"]`).setAttribute('aria-label',t(x.label));});
  };
  root.querySelectorAll('[data-key]').forEach(input=>input.addEventListener('input',()=>{state[input.dataset.key]=input.tagName==='SELECT'?input.value:Number(input.value);const paired=root.querySelector(`[data-number="${input.dataset.key}"]`);if(paired)paired.value=input.value;update();}));
  root.querySelectorAll('[data-number]').forEach(input=>input.addEventListener('input',()=>{if(input.value===''||!input.validity.valid)return;const value=Number(input.value);if(!Number.isFinite(value))return;state[input.dataset.number]=value;root.querySelector(`[data-key="${input.dataset.number}"]`).value=String(value);update();}));
  root.querySelector('.reset-lab').onclick=()=>{definition.controls.forEach(x=>{state[x.key]=x.options?x.options[0][0]:x.value;const input=root.querySelector(`[data-key="${x.key}"]`);input.value=state[x.key];const n=root.querySelector(`[data-number="${x.key}"]`);if(n)n.value=state[x.key];});update();};
  update();return {refresh:update};
 }
 function chart(data){
  const colors=['#087e8b','#cf8b3e','#7485ad'];const W=800,H=350,L=78,R=22,T=20,D=58;
  const pts=data.series.flatMap(s=>s.points).filter(p=>p.every(Number.isFinite));
  if(!pts.length)return '';
  let xmin=Math.min(...pts.map(p=>p[0])),xmax=Math.max(...pts.map(p=>p[0]));
  let ymin=Math.min(0,...pts.map(p=>p[1])),ymax=Math.max(...pts.map(p=>p[1]));
  if(ymax===ymin)ymax=ymin+1;ymax+=(ymax-ymin)*.07;
  const X=x=>L+(x-xmin)/(xmax-xmin||1)*(W-L-R),Y=y=>H-D-(y-ymin)/(ymax-ymin)*(H-T-D);
  const tick=n=>Math.abs(n)>=1000||Math.abs(n)>0&&Math.abs(n)<.001?n.toExponential(1):Number(n.toFixed(2)).toString();
  let grid='';for(let i=0;i<=4;i++){const x=xmin+(xmax-xmin)*i/4,y=ymin+(ymax-ymin)*i/4;grid+=`<line class="grid" x1="${X(x)}" y1="${T}" x2="${X(x)}" y2="${H-D}"/><line class="grid" x1="${L}" y1="${Y(y)}" x2="${W-R}" y2="${Y(y)}"/><text x="${X(x)}" y="${H-D+24}" text-anchor="middle">${tick(x)}</text><text x="${L-10}" y="${Y(y)+5}" text-anchor="end">${tick(y)}</text>`;}
  const paths=data.series.map((s,i)=>`<path d="${s.points.filter(p=>p.every(Number.isFinite)).map((p,j)=>`${j?'L':'M'}${X(p[0]).toFixed(2)},${Y(p[1]).toFixed(2)}`).join(' ')}" fill="none" stroke="${colors[i%colors.length]}" stroke-width="3" ${i===1?'stroke-dasharray="7 5"':''}/>`).join('');
  const mark=data.mark&&data.mark.every(Number.isFinite)?`<circle cx="${X(data.mark[0])}" cy="${Y(data.mark[1])}" r="6" fill="#112547" stroke="white" stroke-width="2"/>`:'';
  return `${bi('p',B('横向滑动查看完整图表','Scroll horizontally to explore the chart'),'class="chart-hint"')}<div class="chart-scroller" tabindex="0" role="region" aria-label="${esc(t(data.y)+' / '+t(data.x))}"><svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(t(data.y)+' / '+t(data.x))}"><title>${esc(t(data.y)+' / '+t(data.x))}</title>${grid}<path class="axes" d="M${L},${T}V${H-D}H${W-R}"/>${paths}${mark}<text class="axis-label" x="${(W+L-R)/2}" y="${H-12}" text-anchor="middle">${esc(t(data.x))}</text><text class="axis-label" transform="translate(20 ${(H-D+T)/2}) rotate(-90)" text-anchor="middle">${esc(t(data.y))}</text></svg></div><div class="chart-legend">${data.series.map((s,i)=>`<span><i style="background:${colors[i%colors.length]}"></i>${esc(t(s.name))}</span>`).join('')}</div>`;
 }
 function setLanguage(next){
  lang=next;try{localStorage.setItem('phy456-language',lang);}catch{}
  document.documentElement.lang=lang==='zh'?'zh-CN':'en';
  document.querySelectorAll('[data-zh]').forEach(e=>e.textContent=e.dataset[lang]);
  document.querySelectorAll('[data-course-link]').forEach(a=>{const url=new URL(a.href);url.searchParams.set('lang',lang);a.href=url.href;});
  ['zh','en'].forEach(l=>document.getElementById(l).setAttribute('aria-pressed',String(l===lang)));
  document.querySelector('.sidebar').setAttribute('aria-label',t(ui.menu));
  document.querySelector('.language').setAttribute('aria-label',lang==='zh'?'语言':'Language');
  const sequence=document.querySelector('.step-nav');if(sequence)sequence.setAttribute('aria-label',lang==='zh'?'学习顺序':'Learning sequence');
  document.title=(c?t(c.title):t(ui.home))+' · PHY456H1';
  try{const url=new URL(location.href);url.searchParams.set('lang',lang);history.replaceState(null,'',url.href);}catch{}
  if(labInstance)labInstance.refresh();if(graded)grade();renderMath();
 }
 renderShell();if(c)renderChapter();else renderHome();setLanguage(lang);
})();
