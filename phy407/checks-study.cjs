/* Numerical invariants and independent reference cases for the self-study additions. */
const assert=require('node:assert/strict');
module.exports=({ctx,bi,block,near})=>{
 const M=ctx.PHY_MATH,L=ctx.PHY_LABS,C=ctx.PHY.chapters;
 assert.equal(new Set(C.flatMap(c=>c.quizzes.map(q=>q.id))).size,102);
 const visit=(id,seen=new Set())=>{assert.ok(!seen.has(id),'Prerequisite cycle');const next=new Set(seen);next.add(id);C[id-1].prerequisites.forEach(n=>visit(n,next));};C.forEach(c=>visit(c.id));
 assert.equal(C.filter(c=>c.project).length,3);C.filter(c=>c.project).forEach(c=>{bi(c.project.title);c.project.tasks.forEach(bi);bi(c.project.report);});
 let states=0;
 for(const [id,lab] of Object.entries(L).filter(([id])=>!/^ch/.test(id))){
  const base=Object.fromEntries(lab.controls.map(c=>[c.key,c.options?c.options[0][0]:c.value])),samples=[base];
  for(const c of lab.controls){bi(c.label);if(c.options)c.options.forEach(([v,label])=>{bi(label);samples.push({...base,[c.key]:v});});else{near((c.max-c.min)/c.step,Math.round((c.max-c.min)/c.step),1e-7);near((c.value-c.min)/c.step,Math.round((c.value-c.min)/c.step),1e-7);for(const v of [c.min,c.max])samples.push({...base,[c.key]:v});}}
  // All-min/all-max combinations supplement independent sweeps without a combinatorial explosion.
  for(const high of [false,true])samples.push(Object.fromEntries(lab.controls.map(c=>[c.key,c.options?c.options[high?c.options.length-1:0][0]:c[high?'max':'min']])));
  for(const values of samples){const state={...(lab.initial?lab.initial():{}),...values},r=lab.calc(state);states++;bi(r.message);r.readings.forEach(x=>{bi(x.label);if(typeof x.value==='object')bi(x.value);else assert.ok(!/NaN|Infinity|undefined/.test(String(x.value)),id);});r.charts.forEach(g=>{bi(g.title);bi(g.x);bi(g.y);g.series.forEach(s=>{bi(s.name);s.points.forEach(p=>assert.ok(p.length===2&&p.every(Number.isFinite),id));});});(r.heatmaps||[]).forEach(h=>{bi(h.title);assert.ok(h.values.flat().every(Number.isFinite));});}
 }
 // Natural spline reference, nodal interpolation, C1/C2 joins and natural boundaries.
 const spline=M.naturalSpline([0,1,2],[0,1,0]);near(spline.evaluate(.5),.6875);near(spline.second[1],-3);near(spline.evaluate(0,2),0);near(spline.evaluate(2,2),0);
 for(const nodes of [[-1,-.7,.2,1],[0,1]]){const ys=nodes.map(x=>2*x+3),s=M.naturalSpline(nodes,ys);nodes.forEach((x,i)=>near(s.evaluate(x),ys[i]));near(s.evaluate(.1),3.2);near(s.evaluate(.1,1),2);near(s.evaluate(.1,2),0);}
 const xs=[-1,-.3,0,.2,1],sp=M.naturalSpline(xs,xs.map(x=>Math.cos(x)));for(let i=1;i<xs.length-1;i++){const h=xs[i]-xs[i-1],[a,b,c,d]=sp.coefficients[i-1],[A,B,C]=sp.coefficients[i];near(a+b*h+c*h*h+d*h*h*h,A);near(b+2*c*h+3*d*h*h,B);near(2*c+6*d*h,2*C);}
 assert.throws(()=>M.naturalSpline([0,0],[1,2]));assert.throws(()=>M.naturalSpline([1,0],[1,2]));
 // QR identities for square, tall and already triangular matrices.
 for(const A of [[[2,1],[1,2]],[[1,2],[3,4],[5,7]],[[1,0],[0,1]]]){const {Q,R}=M.householder(A),qr=M.multiply(Q,R),qtq=M.multiply(M.transpose(Q),Q);A.forEach((row,i)=>row.forEach((v,j)=>near(qr[i][j],v,1e-12)));qtq.forEach((row,i)=>row.forEach((v,j)=>near(v,+(i===j),1e-12)));for(let i=1;i<R.length;i++)for(let j=0;j<Math.min(i,R[0].length);j++)near(R[i][j],0,1e-12);}
 const fit=M.weightedFit([-1,-.5,0,.5,1],[0,1,3,6,10],2,[1,2,4,2,1]);const residual=fit.residuals;for(let j=0;j<3;j++)near([-1,-.5,0,.5,1].reduce((s,x,i)=>s+[1,2,4,2,1][i]*x**j*residual[i],0),0,1e-11);
 const exactFit=M.weightedFit([-1,0,1,2],[.5,1,2.5,5],2);[1,1,.5].forEach((v,i)=>near(exactFit.coefficients[i],v));assert.throws(()=>M.weightedFit([1,1,1],[1,2,3],2));
 // LU with row swaps after an earlier column has been computed, plus multiple RHS.
 for(const A of [[[0,2,1],[1,1,0],[2,0,1]],[[2,1,0],[1,0,1],[1,5,1]]]){const f=M.luTrace(A),pa=M.multiply(f.P,A),lu=M.multiply(f.L,f.U);assert.equal(f.reason,'factored');pa.forEach((row,i)=>row.forEach((v,j)=>near(v,lu[i][j])));for(const truth of [[1,1,1],[1,2,3]]){const b=A.map(r=>r.reduce((s,v,i)=>s+v*truth[i],0)),x=M.luApply(f,b);x.forEach((v,i)=>near(v,truth[i]));}}
 assert.equal(M.luTrace([[0,1],[1,1]],false).reason,'zero-pivot');assert.equal(M.luTrace([[1,2],[2,4]]).reason,'zero-pivot');
 const q=M.qrIteration([[2,1],[1,2]],60);assert.equal(q.reason,'off-diagonal');near(q.eigenvalues[0],3,1e-8);near(q.eigenvalues[1],1,1e-8);assert.ok(q.residual<1e-9);const stall=M.qrIteration([[0,1],[1,0]],20);assert.equal(stall.reason,'budget');near(stall.history.at(-1).off,Math.SQRT2);
 // Adaptive integration: analytic functions, explicit limits, and evaluation accounting.
 let calls=0;const adapt=M.adaptiveSimpson(x=>{calls++;return Math.exp(x);},0,1,1e-9,15,1001);assert.equal(calls,adapt.calls);assert.equal(adapt.reason,'tolerance');near(adapt.value,Math.expm1(1),1e-9);const budget=M.adaptiveSimpson(Math.exp,0,1,1e-14,15,5);assert.equal(budget.reason,'budget');assert.ok(budget.calls<=5);assert.equal(budget.error,null);assert.equal(M.adaptiveSimpson(Math.exp,0,1,1e-14,0,100).reason,'depth');assert.throws(()=>M.adaptiveSimpson(Math.exp,0,1,1e-7,5,2));
 const reuse=M.rombergReuse(Math.exp,0,1,5);assert.equal(reuse.calls,33);near(reuse.rows.at(-1).at(-1),Math.expm1(1),1e-12);
 const alias=M.integrand('alias');near(M.quad(alias.f,0,1,4),0,1e-12);near(M.quad(alias.f,0,1,8),0,1e-12);near(M.quad(alias.f,0,1,16),1,1e-12);
 const phase=n=>Math.abs(M.rotationCompare(n,1).midPhase);near(phase(100)/phase(200),4,.003);
 near(M.diffExtended(x=>x*x,0,.1,'one2'),0,1e-12);near(M.diffExtended(x=>x*x,.5,.1,'second'),2,1e-12);
 assert.equal(M.rootTrace('double','bisect',0).reason,'no-bracket');assert.equal(M.rootTrace('simple','newton',0).reason,'derivative');const cycle=M.rootTrace('cycle','newton',0,.5,8);assert.equal(cycle.reason,'budget');cycle.history.forEach((v,i)=>near(v.x,i%2));const hybrid=M.rootTrace('cycle','hybrid',-1,.5,80);assert.equal(hybrid.reason,'residual');assert.ok(hybrid.history.every(v=>v.x>=v.a&&v.x<=v.b));
 for(const window of ['rect','hann']){const r=M.spectrumStudy({n:64,dt:1/64,f:5,f2:12,window,pad:1});near(r.spectrum[5][1],1,1e-12);near(r.spectrum[12][1],.4,1e-12);assert.ok(r.error<1e-12);const padded=M.spectrumStudy({n:64,dt:1/64,f:5,f2:12,window,pad:4});near(padded.duration,r.duration);near(padded.spacing,r.spacing);near(padded.gridSpacing,r.spacing/4);near(padded.spectrum[20][1],r.spectrum[5][1]);}
 const img=M.imageStudy(8,'checker',0);assert.ok(img.back.flat().every(v=>Math.abs(v[0])<1e-12));assert.ok(img.error<1e-12&&img.imaginary<1e-12);const all=M.imageStudy(8,'waves',6);all.back.forEach((row,i)=>row.forEach((v,j)=>near(v[0],all.image[i][j])));
 // State machines: stale values, name shadowing, index snapshots, branch conflict.
 const notebook=L.study1,ns={...notebook.initial(),velocity:4};notebook.actions[0].apply(ns);notebook.actions[1].apply(ns);near(ns.energy,16);ns.velocity=5;near(ns.energy,16);notebook.actions[2].apply(ns);notebook.actions[0].apply(ns);notebook.actions[1].apply(ns);near(ns.energy,16);notebook.actions[3].apply(ns);near(ns.energy,25);
 const git=L.study3,gs=git.initial(),act=i=>git.actions[i].apply(gs);act(0);act(2);act(1);act(3);near(gs.branches.main,.05);near(gs.work,.02);
 const branches=git.initial(),action=i=>git.actions[i].apply(branches);action(4);action(0);action(2);action(3);action(5);action(1);action(2);action(3);action(6);assert.equal(branches.conflict,true);
 console.log(`PASS: self-study content contracts, ${states} additional model states, spline C2, QR/LU, adaptive budgets, root failures, windows/padding, 2D masks and state-machine checks.`);
};
