/* Dimensionless teaching models. No training service or empirical NN claim. */
(function(root){
'use strict';
const m={};
m.sigmoid=x=>x>=0?1/(1+Math.exp(-x)):Math.exp(x)/(1+Math.exp(x));
m.bce=(z,y)=>Math.max(z,0)+Math.log1p(Math.exp(-Math.abs(z)))-y*z;
m.network=(x,w,b,v,c,activation='tanh')=>v*(activation==='linear'?w*x+b:activation==='relu'?Math.max(0,w*x+b):Math.tanh(w*x+b))+c;
m.backprop=(x,w,b,v,c,y)=>{const h=Math.tanh(w*x+b),z=v*h+c,e=z-y;return{z,loss:e*e/2,dw:e*v*(1-h*h)*x,db:e*v*(1-h*h),dv:e*h,dc:e};};
// Objective: half summed residual squares + lambda/2*(w²+b²); bias is penalized.
m.lineFit=(xs,ys,lambda)=>{const n=xs.length,sx=xs.reduce((a,b)=>a+b,0),sxx=xs.reduce((a,b)=>a+b*b,0),sy=ys.reduce((a,b)=>a+b,0),sxy=xs.reduce((a,b,i)=>a+b*ys[i],0),det=(sxx+lambda)*(n+lambda)-sx*sx;if(Math.abs(det)<1e-14)return null;const w=(sxy*(n+lambda)-sx*sy)/det,b=((sxx+lambda)*sy-sx*sxy)/det;return{w,b,loss:xs.reduce((a,x,i)=>a+.5*(w*x+b-ys[i])**2,0)/n};};
m.solve=(A,b)=>{const a=A.map((row,i)=>[...row,b[i]]),n=b.length;for(let k=0;k<n;k++){let p=k;for(let i=k+1;i<n;i++)if(Math.abs(a[i][k])>Math.abs(a[p][k]))p=i;if(Math.abs(a[p][k])<1e-14)throw Error('Singular teaching matrix');[a[k],a[p]]=[a[p],a[k]];const t=a[k][k];for(let j=k;j<=n;j++)a[k][j]/=t;for(let i=0;i<n;i++)if(i!==k){const s=a[i][k];for(let j=k;j<=n;j++)a[i][j]-=s*a[k][j];}}return a.map(r=>r[n]);};
m.kernelPredict=(x,ell,lambda)=>{const xs=[-1,0,1],k=(a,b)=>Math.exp(-((a-b)**2)/(2*ell*ell)),K=xs.map((a,i)=>xs.map((b,j)=>k(a,b)+(i===j?lambda:0))),c=m.solve(K,[1,0,1]);return xs.reduce((a,xi,i)=>a+k(x,xi)*c[i],0);};
m.gd=(a,eta,x0,n)=>x0*(1-eta*a)**n;
m.sgd=(a,eta,q,n,x0)=>{const u=1-eta*a;let variance=0;for(let i=0;i<n;i++)variance=u*u*variance+eta*eta*q;return{mean:u**n*x0,variance};};
m.momentum=(a,eta,mu,x0,n)=>{let x=x0,v=0;for(let i=0;i<n;i++){v=mu*v-eta*a*x;x+=v;}return{x,v};};
// G=R(angle) diag(s1,s2). Moore-Penrose polar factor is used at rank loss.
m.polar=(s1,s2,angle)=>({p1:Math.sign(s1),p2:Math.sign(s2),G:[Math.cos(angle)*s1,-Math.sin(angle)*s2,Math.sin(angle)*s1,Math.cos(angle)*s2],P:[Math.cos(angle)*Math.sign(s1),-Math.sin(angle)*Math.sign(s2),Math.sin(angle)*Math.sign(s1),Math.cos(angle)*Math.sign(s2)]});
m.adam=(x,m0,v0,eta,b1,b2,decay,n)=>{let first=m0,second=v0;for(let t=1;t<=n;t++){const g=x;first=b1*first+(1-b1)*g;second=b2*second+(1-b2)*g*g;const mh=first/(1-b1**t),vh=second/(1-b2**t);x=(1-eta*decay)*x-eta*mh/(Math.sqrt(vh)+1e-8);}return{x,m:first,v:second};};
// H=p²/(2m), m=(x²/2)^(-gamma), H=1/2 and x(0)=x0>0, inward branch.
m.energy=(gamma,x0,t)=>{const C=2**(-gamma/2);let x;if(Math.abs(gamma-1)<1e-12)x=x0*Math.exp(-C*t);else{const u=x0**(1-gamma)-(1-gamma)*C*t;if(u<=0)return{x:0,p:0,H:0,ended:true};x=u**(1/(1-gamma));}const mass=(x*x/2)**(-gamma),p=-Math.sqrt(mass);return{x,p,H:p*p/(2*mass),ended:false};};
m.logMeasure=(n,gamma,ratio)=>-n*gamma/2*Math.log(ratio);
// H=.5*[r²(1+epsilon*cos(2phi))]^gamma |p|²; r=1, |p|=1.
m.torque=(gamma,epsilon,phi)=>gamma*epsilon*Math.sin(2*phi)*(1+epsilon*Math.cos(2*phi))**(gamma-1);
root.PHY359_MODELS=m;if(typeof module!=='undefined')module.exports=m;
})(typeof window!=='undefined'?window:globalThis);
