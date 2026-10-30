/* Independent calculations for the authored worked examples and pitfalls. */
const assert=require('node:assert/strict'),m=require('./assets/models.js');
const near=(a,b,t=1e-8)=>assert.ok(Math.abs(a-b)<t,`${a} != ${b}`);
const dot=(a,b)=>a.reduce((s,x,i)=>s+x*b[i],0);
near(dot([3,-2],[0,3])+1,-5);
near(m.lineFit([-1,0,1],[0,1.6,2],0).loss,.04);
for(const lambda of [.1,1,2]){const w=m.solve([[1+lambda,1],[1,1+lambda]],[2,2]);near(w[0],2/(2+lambda));near(w[1],w[0]);}
near(m.sigmoid(.2),.5498339973);near(m.bce(.2,1),.5981388694);
const entropy=-.25*Math.log(.25)-.75*Math.log(.75);near(entropy,.5623351446);near(Math.log(2)-entropy,.1308120359);
// A two-hidden-neuron ReLU network away from kinks: independent differences of all W entries.
const loss=W=>{const h=W.map(r=>Math.max(0,dot(r,[1,2])));return .5*dot([1,-1],h)**2;};
const W=[[1,0],[0,1]],expected=[[-1,-2],[1,2]],eps=1e-6;
for(let i=0;i<2;i++)for(let j=0;j<2;j++){const A=W.map(r=>r.slice()),B=W.map(r=>r.slice());A[i][j]+=eps;B[i][j]-=eps;near((loss(A)-loss(B))/(2*eps),expected[i][j],1e-7);}
const coeff=m.solve([[1,1],[1,2]],[1,3]);near(coeff[0],-1);near(coeff[1],2);near(dot(coeff,[1,3]),5);
near(m.gd(2,.25,-2,2)+2,1.5);
const quartic=x=>x*x/2+x**4/4;near(quartic(-.2),.0204);near(quartic(-.2)-quartic(1),-.7296);near(quartic(.8),.4224);
const outcomes=[-.5,.5,0,1],mu=outcomes.reduce((s,x)=>s+x,0)/4,second=outcomes.reduce((s,x)=>s+x*x,0)/4;near(mu,.25);near(second,.375);near(second-mu*mu,.3125);near(m.sgd(1,.5,1,2,1).variance,.3125);
near(.1*.1/2,.005);near(.1/2,.05);near(m.momentum(2,.1,.9,1,2).x,.46);
near(.5*.9**2,.405);near(5.5*.9**2,4.455);
near(.9*.2+.1*2,.38);near(.99*.04+.01*4,.0796);near(.38/(1-.9**2),2);near(.0796/(1-.99**2),4);
near(m.energy(2,2,1).x,1);near(m.energy(1,2,1).x,2*Math.exp(-1/Math.sqrt(2)));near(2**(7/4),3.363585661,.000000001);
// Approximate delta integrals with a narrow normalized box, without using the derived density formula.
const width=.01,h=.00001,V=4,E=1;let one=0,two=0;
for(let p=-1;p<=1;p+=h)if(Math.abs(V*p*p-E)<width)one+=h/(2*width);
for(let r=0;r<=1;r+=h)if(Math.abs(V*r*r-E)<width)two+=2*Math.PI*r*h/(2*width);
near(one,.5,.002);near(two,Math.PI/4,.002);
near(m.logMeasure(100,1,2)/Math.LN10,-15.0514997832);
near(m.torque(1,.4,Math.PI/6),.3464101615);
for(const r of [.1,1,3]){const mass=2/(r*r),J=1;near(J*J/(2*mass*r*r),.25);}
console.log('PASS: independent worked-example arithmetic, multi-neuron finite differences, stochastic path enumeration, coefficient/time-scale checks, delta-shell quadrature and variable-mass angular-energy counterexample.');
