/* Pure numerical models; no DOM or network dependencies. */
(() => {
'use strict';
const M=window.PHY_MATH={};
M.tau=2*Math.PI;
M.linspace=(a,b,n=160)=>Array.from({length:n+1},(_,i)=>a+(b-a)*i/n);
M.rk4=(f,initial,{h=.02,time=20,bound=50,maxSteps=20000,inside=null}={})=>{
 let y=initial.slice(),t=0;const points=[[t,...y]];let reason='horizon';
 const add=(a,k,s)=>a.map((v,i)=>v+s*k[i]);
 const steps=Math.min(Math.ceil(time/h),maxSteps);
 for(let i=0;i<steps;i++){
  const dt=Math.min(h,time-t);if(dt<=1e-12)break;
  const k1=f(y,t),k2=f(add(y,k1,dt/2),t+dt/2),k3=f(add(y,k2,dt/2),t+dt/2),k4=f(add(y,k3,dt),t+dt);
  const next=y.map((v,j)=>v+dt*(k1[j]+2*k2[j]+2*k3[j]+k4[j])/6);
  if(!next.every(Number.isFinite)){reason='nonfinite';break;}
  if(next.some(v=>Math.abs(v)>bound)||(inside&&!inside(next))){reason='boundary';break;}
  t+=dt;y=next;points.push([t,...y]);
 }
 if(t<time-1e-8&&reason==='horizon')reason='budget';
 return {points,reason};
};
M.normal=(type,r,x)=>type==='sn'?r+x*x:type==='tc'?r*x-x*x:type==='super'?r*x-x**3:r*x+x**3-x**5;
M.normalDerivative=(type,r,x)=>type==='sn'?2*x:type==='tc'?r-2*x:type==='super'?r-3*x*x:r+3*x*x-5*x**4;
M.unique=a=>a.sort((x,y)=>x-y).filter((x,i,s)=>!i||Math.abs(x-s[i-1])>1e-7);
M.normalRoots=(type,r)=>{
 if(type==='sn')return r>0?[]:M.unique([-Math.sqrt(-r),Math.sqrt(-r)]);
 if(type==='tc')return M.unique([0,r]);
 if(type==='super')return r<=0?[0]:[-Math.sqrt(r),0,Math.sqrt(r)];
 const roots=[0],d=1+4*r;
 if(d>=0)for(const u of [(1-Math.sqrt(d))/2,(1+Math.sqrt(d))/2])if(u>=0)roots.push(-Math.sqrt(u),Math.sqrt(u));
 return M.unique(roots);
};
M.cubicRoots=(r,h)=>{
 const discriminant=h*h/4-r*r*r/27;
 if(discriminant>1e-12){const d=Math.sqrt(discriminant);return [Math.cbrt(h/2+d)+Math.cbrt(h/2-d)];}
 if(r<=1e-12)return [Math.cbrt(h)];
 if(Math.abs(discriminant)<=1e-12){const u=Math.cbrt(h/2);return M.unique([2*u,-u]);}
 const a=2*Math.sqrt(r/3),theta=Math.acos(Math.max(-1,Math.min(1,h/(2*(r/3)**1.5))))/3;
 return M.unique([0,1,2].map(k=>a*Math.cos(theta-2*Math.PI*k/3)));
};
M.linear=(a,b,c,d)=>{
 const trace=a+d,det=a*d-b*c,D=trace*trace-4*det,eps=1e-9;
 let type;
 if(Math.abs(det)<eps)type='nonhyperbolic';
 else if(det<0)type='saddle';
 else if(Math.abs(trace)<eps)type='center';
 else type=(trace<0?'stable':'unstable')+(Math.abs(D)<eps?'Repeated':D>0?'Node':'Spiral');
 const eigen=D>=0?[(trace+Math.sqrt(D))/2,(trace-Math.sqrt(D))/2]:[trace/2,Math.sqrt(-D)/2];
 return {trace,det,D,eigen,type};
};
M.waiting=(t,delay)=>t<=delay?0:(t-delay)**2/4;
M.circlePeriod=g=>Math.abs(g)>1?2*Math.PI/Math.sqrt(g*g-1):null;
M.radial=(a,r0,t)=>1-2*a*r0*r0*t>0?r0/Math.sqrt(1-2*a*r0*r0*t):null;
M.lyapunov=(x,y)=>x*x+4*y*y;
M.lyapunovRate=(x,y)=>-2*x*x-8*y**4;
M.winding=(f,cx,cy,r,zeros=[],count=720)=>{
 const contour=M.linspace(0,2*Math.PI,count).map(a=>[cx+r*Math.cos(a),cy+r*Math.sin(a)]);
 const values=contour.map(p=>f(p));
 const invalid=zeros.some(p=>Math.abs(Math.hypot(p[0]-cx,p[1]-cy)-r)<1e-5)||values.some(p=>!p.every(Number.isFinite)||Math.hypot(...p)<1e-7);
 if(invalid)return {contour,angles:[],index:null,reason:'zero'};
 let angle=Math.atan2(values[0][1],values[0][0]),first=angle;const angles=[[0,0]];
 for(let i=1;i<values.length;i++){
  const u=values[i-1],v=values[i];const delta=Math.atan2(u[0]*v[1]-u[1]*v[0],u[0]*v[0]+u[1]*v[1]);
  if(Math.abs(delta)>.6)return {contour,angles:[],index:null,reason:'resolution'};
  angle+=delta;angles.push([i/count,(angle-first)/(2*Math.PI)]);
 }
 return {contour,angles,index:(angle-first)/(2*Math.PI),reason:'ok'};
};
M.pendulum=(alpha,gamma,y0,{time=80,h=.02}={})=>{
 const trajectory=M.rk4(([x,y])=>[y,gamma-Math.sin(x)-alpha*y],[0,y0],{time,h,bound:2000});
 const returns=[];let target=2*Math.PI;
 for(let i=1;i<trajectory.points.length;i++){
  const a=trajectory.points[i-1],b=trajectory.points[i];
  if(a[1]<target&&b[1]>=target&&b[2]>0){
   const fraction=(target-a[1])/(b[1]-a[1]);
   returns.push({time:a[0]+fraction*(b[0]-a[0]),speed:a[2]+fraction*(b[2]-a[2])});target+=2*Math.PI;
  }
 }
 return {...trajectory,returns};
};
M.wrap=x=>((x+Math.PI)%(2*Math.PI)+2*Math.PI)%(2*Math.PI)-Math.PI;
})();
