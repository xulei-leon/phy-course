/* Structured teaching additions. Plain text is escaped by the shared renderer. */
const SP=(zh, en)=>({kind:'p', text: B(zh, en)});
const SH=(zh, en)=>({kind:'h', text: B(zh, en)});
const SM=math=>({kind:'math', math});
const SL=items=>({kind:'list', items});
const STABLE=(headers, rows)=>({kind:'table', headers, rows});
const SX=(zh, en, blocks)=>({title: B(zh, en), blocks});
const SE=(zh, en, hints, solution)=>({question: B(zh, en), hints, solution});
const SK=(predict, action, record, explanation)=>({predict, action, record, explanation});
const SR=(chapter, zh, en)=>({chapter, anchor:'foundation', label: B(zh, en)});
const STUDY=(id, s)=>{const c=PHY.chapters.find(c=>c.id===id); if(!c)throw Error('Missing chapter '+id); c.study=s;};
