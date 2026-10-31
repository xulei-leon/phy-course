/* Bounded teaching algorithms. No DOM, Python interpreter or external services. */
(() => {'use strict'; const M=PHY_MATH;
const finite=x=>Number.isFinite(x), copy=a=>a.map(r=>r.slice());
M.identity=n=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>+(i===j)));
M.transpose=a=>a[0].map((_,j)=>a.map(r=>r[j]));
M.multiply=(a,b)=>a.map(r=>b[0].map((_,j)=>r.reduce((s,v,k)=>s+v*b[k][j],0)));
M.norm=a=>Math.hypot(...a.flat());
M.residual=(a,x,b)=>Math.max(...a.map((r,i)=>Math.abs(r.reduce((s,v,j)=>s+v*x[j],0)-b[i])));
M.rotationCompare=(n,turns)=>{const h=2*Math.PI/n,N=n*turns,euler=M.rotation(n,turns),angle=2*Math.atan(h/2);return {euler,midpoint:Array.from({length:N+1},(_,k)=>[k*h,Math.cos(k*angle),Math.sin(k*angle)]),amplitude:Math.hypot(...euler.at(-1).slice(1))-1,eulerPhase:N*(Math.atan(h)-h),midPhase:N*(angle-h)};};
M.integrand=kind=>kind==='peak'?{f:x=>1/(1+10000*(x-.37)**2),exact:(Math.atan(63)+Math.atan(37))/100}:kind==='corner'?{f:x=>Math.abs(x-.37),exact:(.37**2+.63**2)/2}:kind==='alias'?{f:x=>1-Math.cos(16*Math.PI*x),exact:1}:{f:x=>x**4,exact:.2};
M.diffExtended=(f,x,h,kind)=>kind==='one2'?(-3*f(x)+4*f(x+h)-f(x+2*h))/(2*h):kind==='second'?(f(x+h)-2*f(x)+f(x-h))/(h*h):M.diff(f,x,h,kind);
M.rombergReuse=(f,a,b,depth)=>{if(!Number.isInteger(depth)||depth<0||depth>10)throw Error('depth');let calls=2;const rows=[[(b-a)*(f(a)+f(b))/2]];for(let i=1;i<=depth;i++){const n=2**i,h=(b-a)/n;let sum=0;for(let k=1;k<n;k+=2){sum+=f(a+k*h);calls++;}const row=[rows[i-1][0]/2+h*sum];for(let j=1;j<=i;j++)row.push(row[j-1]+(row[j-1]-rows[i-1][j-1])/(4**j-1));rows.push(row);}return {rows,calls};};
M.adaptiveSimpson=(f,a,b,tol=1e-7,maxDepth=12,budget=1000)=>{
 if(!(finite(a)&&finite(b)&&b>a&&tol>0&&Number.isInteger(maxDepth)&&maxDepth>=0&&Number.isInteger(budget)&&budget>=3))throw Error('adaptive input');
 let calls=0,reason='tolerance';const leaves=[];const at=x=>{calls++;const y=f(x);if(!finite(y))throw Error('nonfinite integrand');return y;};
 const simp=(l,r,fl,fm,fr)=>(r-l)*(fl+4*fm+fr)/6;
 const visit=(l,r,fl,fm,fr,S,t,d)=>{if(calls+2>budget){reason='budget';leaves.push([l,r,S,null,d]);return S;}const m=(l+r)/2,ql=at((l+m)/2),qr=at((m+r)/2),sl=simp(l,m,fl,ql,fm),sr=simp(m,r,fm,qr,fr),error=Math.abs(sl+sr-S)/15;
  if(error<=t){const value=sl+sr+(sl+sr-S)/15;leaves.push([l,r,value,error,d]);return value;}
  if(d>=maxDepth){if(reason!=='budget')reason='depth';leaves.push([l,r,sl+sr,error,d]);return sl+sr;}
  return visit(l,m,fl,ql,fm,sl,t/2,d+1)+visit(m,r,fm,qr,fr,sr,t/2,d+1);
 };const fl=at(a),fm=at((a+b)/2),fr=at(b),value=visit(a,b,fl,fm,fr,simp(a,b,fl,fm,fr),tol,0);
 return {value,calls,reason,leaves,error:leaves.some(r=>r[3]===null)?null:leaves.reduce((s,r)=>s+r[3],0)};
};
M.naturalSpline=(xs,ys)=>{
 const n=xs.length;if(n<2||n!==ys.length||xs.some((x,i)=>!finite(x)||i&&x<=xs[i-1])||!ys.every(finite))throw Error('distinct increasing finite nodes required');
 const h=xs.slice(1).map((x,i)=>x-xs[i]),lower=[],diag=[],upper=[],rhs=[];
 for(let i=1;i<n-1;i++){lower.push(h[i-1]);diag.push(2*(h[i-1]+h[i]));upper.push(h[i]);rhs.push(6*((ys[i+1]-ys[i])/h[i]-(ys[i]-ys[i-1])/h[i-1]));}
 for(let i=1;i<diag.length;i++){const q=lower[i]/diag[i-1];diag[i]-=q*upper[i-1];rhs[i]-=q*rhs[i-1];}
 const z=Array(n).fill(0);for(let i=n-3;i>=0;i--)z[i+1]=(rhs[i]-(i<n-3?upper[i]*z[i+2]:0))/diag[i];
 const coefficients=h.map((v,i)=>[ys[i],(ys[i+1]-ys[i])/v-v*(2*z[i]+z[i+1])/6,z[i]/2,(z[i+1]-z[i])/(6*v)]);
 const evaluate=(x,order=0)=>{let i=0;while(i<n-2&&xs[i+1]<x)i++;const t=x-xs[i],[a,b,c,d]=coefficients[i];return order===0?a+b*t+c*t*t+d*t*t*t:order===1?b+2*c*t+3*d*t*t:2*c+6*d*t;};
 return {evaluate,coefficients,second:z};
};
/* Householder QR: same routine supports overdetermined full-rank fits. */
M.householder=matrix=>{
 const R=copy(matrix),m=R.length,n=R[0].length,Q=M.identity(m);
 for(let k=0;k<Math.min(m,n);k++){const v=R.slice(k).map(r=>r[k]),norm=Math.hypot(...v);if(norm===0)continue;v[0]+=(v[0]>=0?1:-1)*norm;const vv=v.reduce((s,x)=>s+x*x,0);if(!vv)continue;
  for(let j=k;j<n;j++){let dot=0;for(let i=k;i<m;i++)dot+=v[i-k]*R[i][j];for(let i=k;i<m;i++)R[i][j]-=2*v[i-k]*dot/vv;}
  for(let i=0;i<m;i++){let dot=0;for(let j=k;j<m;j++)dot+=Q[i][j]*v[j-k];for(let j=k;j<m;j++)Q[i][j]-=2*dot*v[j-k]/vv;}
 }return {Q,R};
};
M.weightedFit=(xs,ys,degree=1,weights=xs.map(()=>1))=>{
 const a=xs.map((x,i)=>Array.from({length:degree+1},(_,j)=>x**j*Math.sqrt(weights[i]))),b=ys.map((y,i)=>y*Math.sqrt(weights[i]));
 if(xs.length<degree+1||weights.some(w=>!(w>0)))throw Error('fit input');const {Q,R}=M.householder(a),qtb=M.transpose(Q).map(r=>r.reduce((s,v,i)=>s+v*b[i],0)),coefficients=Array(degree+1).fill(0);
 for(let i=degree;i>=0;i--){if(Math.abs(R[i][i])<1e-12)throw Error('rank deficient');coefficients[i]=(qtb[i]-coefficients.reduce((s,c,j)=>j>i?s+R[i][j]*c:s,0))/R[i][i];}
 const evaluate=x=>coefficients.reduce((s,c,j)=>s+c*x**j,0),residuals=xs.map((x,i)=>ys[i]-evaluate(x));return {coefficients,evaluate,residuals,sse:residuals.reduce((s,r,i)=>s+weights[i]*r*r,0)};
};
M.luTrace=(matrix,pivoting=true)=>{
 const U=copy(matrix),n=U.length,L=M.identity(n),P=M.identity(n),history=[{step:'start',U:copy(U),L:copy(L),P:copy(P)}];
 for(let k=0;k<n;k++){let p=k;if(pivoting)for(let i=k+1;i<n;i++)if(Math.abs(U[i][k])>Math.abs(U[p][k]))p=i;
  if(U[p][k]===0||!finite(U[p][k]))return {reason:'zero-pivot',L,U,P,history};
  if(p!==k){[U[p],U[k]]=[U[k],U[p]];[P[p],P[k]]=[P[k],P[p]];for(let j=0;j<k;j++)[L[p][j],L[k][j]]=[L[k][j],L[p][j]];history.push({step:`swap ${k+1},${p+1}`,U:copy(U),L:copy(L),P:copy(P)});}
  for(let i=k+1;i<n;i++){L[i][k]=U[i][k]/U[k][k];for(let j=k;j<n;j++)U[i][j]-=L[i][k]*U[k][j];history.push({step:`R${i+1} − (${L[i][k]}) R${k+1}`,U:copy(U),L:copy(L),P:copy(P)});}
 }return {reason:'factored',L,U,P,history};
};
M.luApply=(f,b)=>{if(f.reason!=='factored')return null;const n=b.length,pb=f.P.map(r=>r.reduce((s,v,j)=>s+v*b[j],0)),y=[],x=Array(n).fill(0);for(let i=0;i<n;i++)y[i]=pb[i]-f.L[i].reduce((s,v,j)=>j<i?s+v*y[j]:s,0);for(let i=n-1;i>=0;i--)x[i]=(y[i]-f.U[i].reduce((s,v,j)=>j>i?s+v*x[j]:s,0))/f.U[i][i];return x.every(finite)?x:null;};
M.qrIteration=(matrix,max=30,tol=1e-10)=>{let A=copy(matrix),V=M.identity(A.length);const history=[];let reason='budget';for(let k=0;k<=max;k++){const off=Math.hypot(...A.flatMap((r,i)=>r.filter((_,j)=>i!==j)));history.push({k,A:copy(A),off});if(off<tol){reason='off-diagonal';break;}if(k===max)break;const {Q,R}=M.householder(A);A=M.multiply(R,Q);V=M.multiply(V,Q);}
 const eigenvalues=A.map((r,i)=>r[i]),residual=M.norm(M.multiply(matrix,V).map((r,i)=>r.map((x,j)=>x-V[i][j]*eigenvalues[j])));return {A,V,eigenvalues,residual,history,reason};};
M.rootProblem=kind=>kind==='double'?{f:x=>(x-1)**2,df:x=>2*(x-1),a:0,b:2}:kind==='cycle'?{f:x=>x**3-2*x+2,df:x=>3*x*x-2,a:-3,b:0}:{f:x=>x*x-2,df:x=>2*x,a:0,b:2};
M.rootTrace=(kind,method,x0,lambda=.5,max=30)=>{
 const {f,df,a:left,b:right}=M.rootProblem(kind);let a=left,b=right,x=x0,previous=x0+.2,reason='budget';const history=[];
 if(['bisect','hybrid'].includes(method)&&f(a)*f(b)>0)return {history,reason:'no-bracket'};
 if(method==='hybrid'&&(x<a||x>b))x=(a+b)/2;
 for(let k=0;k<=max;k++){if(method==='bisect')x=(a+b)/2;const fx=f(x);if(!finite(x)||!finite(fx)||Math.abs(x)>1e6){reason='domain';break;}history.push({k,x,residual:Math.abs(fx),a,b});if(Math.abs(fx)<=1e-10){reason='residual';break;}if(k===max)break;
  if(method==='bisect'){if(f(a)*fx<=0)b=x;else a=x;continue;}
  let next;if(method==='fixed')next=x-lambda*fx;else if(method==='secant'){const den=fx-f(previous);if(Math.abs(den)<1e-14){reason='denominator';break;}next=x-fx*(x-previous)/den;}else{
   if(method==='hybrid'){if(f(a)*fx<=0)b=x;else a=x;}
   const d=df(x);if(Math.abs(d)<1e-14){if(method==='hybrid')next=(a+b)/2;else{reason='derivative';break;}}else next=x-fx/d;
   /* Require an interior, central proposal; otherwise take a bisection step. */
   if(method==='hybrid'&&(!finite(next)||next<a+.1*(b-a)||next>b-.1*(b-a)))next=(a+b)/2;
  }previous=x;x=next;
 }return {history,reason};
};
M.spectrumStudy=({n=64,dt=1/64,f=5,f2=9,phase=0,window='rect',pad=1})=>{
 const ys=Array.from({length:n},(_,i)=>Math.sin(2*Math.PI*f*i*dt+phase)+.4*Math.sin(2*Math.PI*f2*i*dt)),w=ys.map((_,i)=>window==='hann'?.5-.5*Math.cos(2*Math.PI*i/n):1),gain=w.reduce((s,x)=>s+x,0),input=ys.map((y,i)=>y*w[i]),padded=input.concat(Array(n*(pad-1)).fill(0)),z=M.fft(padded),back=M.fft(z,true),spectrum=z.slice(0,z.length/2+1).map((v,k)=>[k/(z.length*dt),Math.hypot(...v)*(k===0||k===z.length/2?1:2)/gain]);
 return {ys,input,z,spectrum,duration:n*dt,spacing:1/(n*dt),gridSpacing:1/(z.length*dt),error:Math.max(...back.map((v,i)=>Math.hypot(v[0]-padded[i],v[1])))};
};
M.imageStudy=(size,kind,cutoff)=>{const image=Array.from({length:size},(_,i)=>Array.from({length:size},(_,j)=>kind==='checker'?(-1)**(i+j):Math.cos(2*Math.PI*j/size)+.5*Math.cos(6*Math.PI*i/size))),spectrum=M.dft2(image),filtered=spectrum.map((row,i)=>row.map((z,j)=>Math.hypot(Math.min(i,size-i),Math.min(j,size-j))<=cutoff?z:[0,0])),back=M.dft2(filtered,true),roundtrip=M.dft2(spectrum,true);return {image,spectrum,filtered,back,error:Math.max(...roundtrip.flatMap((r,i)=>r.map((v,j)=>Math.hypot(v[0]-image[i][j],v[1])))),imaginary:Math.max(...back.flat().map(z=>Math.abs(z[1])))};};
})();
