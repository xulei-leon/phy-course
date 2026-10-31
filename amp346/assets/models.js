/* Analytic teaching models. No finite-difference time solver is used. */
(() => {
'use strict';
const M=window.APM_MATH={};
M.linspace=(a,b,n=240)=>Array.from({length:n+1},(_,i)=>a+(b-a)*i/n);
M.integrate=(f,a,b,n=400)=>{if(a===b)return 0;if(n%2)n++;const h=(b-a)/n;let sum=f(a)+f(b);for(let i=1;i<n;i++)sum+=(i%2?4:2)*f(a+i*h);return sum*h/3;};
M.ode=(a,f,y0,x)=>Math.exp(-a*x)*y0+(Math.abs(a)<1e-12?f*x:-f*Math.expm1(-a*x)/a);
M.flux=(a,b,p,q,r,s)=>({edges:[-s*a,(p*a+q)*b,(r*b+s)*a,-q*b],area:(p+r)*a*b});
M.invariant=(mode,x,y)=>mode==='straight'?x-2*y:mode==='exp'?Math.exp(-x)*y:mode==='circle'?x*x+y*y:y===0?null:-1/y-x*x;
M.reaction=(x,y)=>(x-1.5*y)**2*Math.exp(-y/2);
// u_x+u_y=0 with data u(r,mr)=r or 0. Coordinates are dimensionless.
M.transverse=(m,x,y,data='linear')=>{const determinant=m-1;if(determinant===0)return {determinant,status:data==='zero'?'nonunique':'incompatible',footpoint:null,value:null,sensitivity:null};const r=(y-x)/determinant;return {determinant,status:'transverse',footpoint:[r,m*r],value:data==='zero'?0:r,sensitivity:data==='zero'?0:1/Math.abs(determinant)};};
M.bump=(x,R=1)=>Math.abs(x)<R?(1-(x/R)**2)**3:0;
M.bumpIntegral=(a,b,R=1)=>{const F=x=>{const z=Math.max(-1,Math.min(1,x/R));return R*(z-z**3+3*z**5/5-z**7/7);};return F(b)-F(a);};
M.transport=(profile,c,t,x)=>profile==='bump'?M.bump(x-c*t):Math.exp(-((x-c*t)**2)/2);
M.wave=(x,t,c,A=1,B=0,R=1)=>{if(!(c>0&&R>0))throw new RangeError('c and R must be positive');return A*(M.bump(x-c*t,R)+M.bump(x+c*t,R))/2+B*M.bumpIntegral(x-c*t,x+c*t,R)/(2*c);};
// Standing mode on [0,L] with fixed ends. a is a frequency, not a signed mass squared.
M.energy=(A,c,L,a,t)=>{const q=Math.PI/L,w=Math.sqrt(c*c*q*q+a*a),K=L*A*A*w*w*Math.sin(w*t)**2/4,P=L*A*A*c*c*q*q*Math.cos(w*t)**2/4,V=L*A*A*a*a*Math.cos(w*t)**2/4;return {K,P,V,total:L*A*A*w*w/4,w};};
M.heatMode=(x,t,k,L,base,A)=>base+A*Math.exp(-k*(Math.PI/L)**2*t)*Math.sin(Math.PI*x/L);
M.kernel=(x,t,k)=>{if(!(t>0&&k>0))throw new RangeError('kernel requires t>0 and k>0');return Math.exp(-x*x/(4*k*t))/Math.sqrt(4*Math.PI*k*t);};
// Composite Simpson quadrature for erf. Tail beyond 8 contributes less than 2e-29.
M.erf=z=>Math.sign(z)*2/Math.sqrt(Math.PI)*M.integrate(x=>Math.exp(-x*x),0,Math.min(8,Math.abs(z)),320);
M.stepHeat=(x,t,k)=>{if(!(t>0&&k>0))throw new RangeError('step solution requires t>0 and k>0');return (1+M.erf(x/Math.sqrt(4*k*t)))/2;};
M.gaussian=(x,t,k,m=1,sigma=1)=>{if(!(t>=0&&k>0&&sigma>0))throw new RangeError('invalid Gaussian parameters');const v=sigma*sigma+2*k*t;return m*Math.exp(-x*x/(2*v))/Math.sqrt(2*Math.PI*v);};
})();
