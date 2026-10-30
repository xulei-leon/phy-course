const assert=require('node:assert/strict');
const m=require('./assets/models.js');
const near=(a,b,t=1e-9)=>assert.ok(Math.abs(a-b)<t,`${a} != ${b}`);
near(m.network(1,2,0,3,1,'linear'),7);
const f=m.lineFit([-1,0,1],[0,1,2],0);near(f.w,1);near(f.b,1);near(f.loss,0);
const r=m.lineFit([-1,0,1],[0,1,2],2);near(r.w,.5);near(r.b,.6);
near(m.sigmoid(0),.5);near(m.bce(0,1),Math.log(2));near(m.bce(1000,0),1000);near(m.bce(-1000,1),1000);
for(const w of [-2,0,1.5]){const d=m.backprop(.7,w,.2,1.3,-.1,.8),h=1e-5;const loss=x=>.5*(m.network(.7,x,.2,1.3,-.1,'tanh')-.8)**2;near(d.dw,(loss(w+h)-loss(w-h))/(2*h),1e-8);}
for(const x of [-1,0,1])near(m.kernelPredict(x,.7,0),x*x);
near(m.gd(2,0.5,2,3),0);near(m.gd(2,1,2,3),-2);near(m.gd(2,1.1,2,2),2.88);
near(m.sgd(1,1,2,1,0).variance,2);near(m.sgd(1,.5,2,500,0).variance,2/3);
near(m.momentum(2,.1,0,1,1).x,.8);near(m.momentum(2,.1,.9,1,2).x,.46);
near(m.polar(-3,2,0).p1,-1);near(m.polar(0,2,0).p1,0);
near(m.adam(0,0,0,.1,.9,.999,0,1).x,0);
near(m.adam(1,0,0,.1,.9,.999,.1,1).x,.89,1e-7);
for(const gamma of [.5,1,2]){const a=m.energy(gamma,2,1);near(a.H,.5);assert.ok(a.x<2&&a.x>0);}
near(m.logMeasure(2,1,2),-Math.log(2));near(m.torque(1,0,.6),0);near(m.torque(1,.3,Math.PI/4),.3);
console.log('PASS: known values, independent derivative checks, interpolation, stability boundaries, exact variance, momentum, polar signs, zero-gradient Adam and Hamiltonian invariants.');
// Cross-check equations, rather than only the implementation's returned H.
near(m.lineFit([-1,0,1],[0,1.6,2],0).loss,.04);
assert.equal(m.lineFit([1,1],[0,1],0),null);
for(const gamma of [.5,1,2]){const dt=1e-4,t=.5,b=m.energy(gamma,2,t-dt),c=m.energy(gamma,2,t),a=m.energy(gamma,2,t+dt);const velocity=(a.x-b.x)/(2*dt),acceleration=(a.x-2*c.x+b.x)/(dt*dt),mass=(c.x*c.x/2)**(-gamma);near(velocity,c.p/mass,1e-7);near(acceleration,gamma/c.x*velocity*velocity,1e-6);}
for(const gamma of [.5,1,2])for(const epsilon of [0,.3,.8]){const phi=.6,h=1e-5,H=p=>.5*(1+epsilon*Math.cos(2*p))**gamma;near(m.torque(gamma,epsilon,phi),-(H(phi+h)-H(phi-h))/(2*h),1e-8);}
for(const s1 of [-3,0,2])for(const s2 of [-2,0,4]){const a=m.polar(s1,s2,.4);near(a.P[0]*a.P[0]+a.P[2]*a.P[2],s1===0?0:1);near(a.P[0]*a.P[1]+a.P[2]*a.P[3],0);}
console.log('PASS: regression residuals, singular rank detection, finite-difference Hamilton equations/torque and polar column orthogonality.');
