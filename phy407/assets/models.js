/* Small, bounded teaching algorithms, independent of the DOM. */
(() => {'use strict';
const M=window.PHY_MATH={};
M.linspace=(a,b,n=160)=>Array.from({length:n+1},(_,i)=>a+(b-a)*i/n);
M.leap=y=>(y%4===0&&y%100!==0)||y%400===0;
M.amdahl=(f,p)=>1/(f+(1-f)/p);
M.quad=(f,a,b,n,type='trap')=>{
 if(!Number.isInteger(n)||n<1||n>16384||type==='simpson'&&n%2)throw Error('invalid panel count');
 const h=(b-a)/n;let sum=f(a)+f(b);
 for(let i=1;i<n;i++)sum+=(type==='simpson'?(i%2?4:2):2)*f(a+i*h);
 return h*sum/(type==='simpson'?3:2);
};
M.diff=(f,x,h,type)=>type==='forward'?(f(x+h)-f(x))/h:type==='backward'?(f(x)-f(x-h))/h:(f(x+h)-f(x-h))/(2*h);
M.romberg=(f,a,b,depth)=>{
 const rows=[];for(let i=0;i<=depth;i++){const row=[M.quad(f,a,b,2**i)];for(let j=1;j<=i;j++)row.push(row[j-1]+(row[j-1]-rows[i-1][j-1])/(4**j-1));rows.push(row);}return rows;
};
M.gauss2=(f,a,b)=>{const c=(a+b)/2,d=(b-a)/2;return d*(f(c-d/Math.sqrt(3))+f(c+d/Math.sqrt(3)));};
M.weights=xs=>xs.map((x,i)=>1/xs.reduce((p,y,j)=>i===j?p:p*(x-y),1));
M.bary=(xs,ys,w,x)=>{let a=0,b=0;for(let i=0;i<xs.length;i++){if(Math.abs(x-xs[i])<1e-14)return ys[i];const v=w[i]/(x-xs[i]);a+=v*ys[i];b+=v;}return a/b;};
M.linear=(xs,ys,x)=>{let j=0;while(j<xs.length-2&&xs[j+1]<x)j++;const t=(x-xs[j])/(xs[j+1]-xs[j]);return (1-t)*ys[j]+t*ys[j+1];};
M.fit=(xs,ys)=>{const mx=xs.reduce((a,b)=>a+b)/xs.length,my=ys.reduce((a,b)=>a+b)/ys.length;const den=xs.reduce((s,x)=>s+(x-mx)**2,0);if(den===0)throw Error('rank deficient');const m=xs.reduce((s,x,i)=>s+(x-mx)*(ys[i]-my),0)/den,b=my-m*mx;const residuals=xs.map((x,i)=>ys[i]-(m*x+b));return {m,b,residuals,sse:residuals.reduce((s,r)=>s+r*r,0)};};
M.solve=(matrix,rhs)=>{
 const a=matrix.map(r=>r.slice()),b=rhs.slice(),n=b.length;
 for(let k=0;k<n;k++){let pivot=k;for(let j=k+1;j<n;j++)if(Math.abs(a[j][k])>Math.abs(a[pivot][k]))pivot=j;
  if(!Number.isFinite(a[pivot][k])||a[pivot][k]===0)return null;
  [a[k],a[pivot]]=[a[pivot],a[k]];[b[k],b[pivot]]=[b[pivot],b[k]];
  for(let i=k+1;i<n;i++){const q=a[i][k]/a[k][k];for(let j=k;j<n;j++)a[i][j]-=q*a[k][j];b[i]-=q*b[k];}
 }
 const x=Array(n).fill(0);for(let i=n-1;i>=0;i--){let s=b[i];for(let j=i+1;j<n;j++)s-=a[i][j]*x[j];x[i]=s/a[i][i];}return x.every(Number.isFinite)?x:null;
};
M.rotation=(n,turns)=>{let re=1,im=0;const h=2*Math.PI/n,points=[[0,re,im]];for(let k=1;k<=n*turns;k++){[re,im]=[re-h*im,im+h*re];points.push([k*h,re,im]);}return points;};
M.root=(method,x0,lambda=0.5,max=30)=>{
 const f=x=>x*x-2;let x=x0,a=0,b=2;const points=[];let reason='budget';
 for(let k=0;k<=max;k++){
  if(method==='bisect')x=(a+b)/2;
  if(!Number.isFinite(x)||Math.abs(x)>1e6){reason='diverged';break;}
  points.push([k,x,Math.abs(f(x))]);
  if(Math.abs(f(x))<1e-12){reason='residual';break;}if(k===max)break;
  if(method==='bisect'){if(f(a)*f(x)<=0)b=x;else a=x;}
  else if(method==='newton'){if(Math.abs(2*x)<1e-14){reason='derivative';break;}x-=f(x)/(2*x);}
  else x-=lambda*f(x);
 }
 return {points,reason,width:method==='bisect'?b-a:null};
};
M.golden=(f,left,right,steps)=>{
 const tau=(Math.sqrt(5)-1)/2;let a=left,b=right,c=b-tau*(b-a),d=a+tau*(b-a),fc=f(c),fd=f(d),calls=2;const states=[{a,b,c,d,calls}];
 for(let i=0;i<steps;i++){if(fc<fd){b=d;d=c;fd=fc;c=b-tau*(b-a);fc=f(c);}else{a=c;c=d;fc=fd;d=a+tau*(b-a);fd=f(d);}calls++;states.push({a,b,c,d,calls});}return states;
};
const add=(a,b)=>[a[0]+b[0],a[1]+b[1]],sub=(a,b)=>[a[0]-b[0],a[1]-b[1]],mul=(a,b)=>[a[0]*b[0]-a[1]*b[1],a[0]*b[1]+a[1]*b[0]];
M.dft=(values,inverse=false)=>{const n=values.length;return values.map((_,k)=>{let re=0,im=0;values.forEach((v,j)=>{const z=Array.isArray(v)?v:[v,0],t=(inverse?2:-2)*Math.PI*k*j/n;re+=z[0]*Math.cos(t)-z[1]*Math.sin(t);im+=z[0]*Math.sin(t)+z[1]*Math.cos(t);});return [re/(inverse?n:1),im/(inverse?n:1)];});};
M.fftStages=(values,inverse=false)=>{
 const n=values.length,bits=Math.log2(n);if(!Number.isInteger(bits)||n<1||n>4096)throw Error('radix-2 length required');
 let a=Array.from({length:n},(_,i)=>{let j=0,k=i;for(let t=0;t<bits;t++){j=j*2+(k&1);k>>=1;}const v=values[j];return Array.isArray(v)?v.slice():[v,0];});
 const stages=[a.map(v=>v.slice())];
 for(let len=2;len<=n;len*=2){for(let start=0;start<n;start+=len)for(let j=0;j<len/2;j++){const angle=(inverse?2:-2)*Math.PI*j/len,odd=mul(a[start+j+len/2],[Math.cos(angle),Math.sin(angle)]),even=a[start+j];a[start+j]=add(even,odd);a[start+j+len/2]=sub(even,odd);}stages.push(a.map(v=>v.slice()));}
 if(inverse)stages[stages.length-1]=a.map(v=>v.map(x=>x/n));return stages;
};
M.fft=(v,inverse=false)=>M.fftStages(v,inverse).at(-1);
M.dft2=(values,inverse=false)=>{const m=values.length,n=values[0].length,rows=values.map(row=>M.dft(row,inverse)),out=Array.from({length:m},()=>Array(n));for(let j=0;j<n;j++){const col=M.dft(rows.map(row=>row[j]),inverse);for(let i=0;i<m;i++)out[i][j]=col[i];}return out;};
})();
