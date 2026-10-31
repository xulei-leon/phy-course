/* Each experiment exposes controls and a pure calc(state) result. */
(() => {
'use strict';
const M=PHY_MATH,L=window.PHY_LABS={},pi=Math.PI;
const num=(key,zh,en,min,max,step,value)=>({key,label:B(zh,en),min,max,step,value});
const sel=(key,zh,en,options)=>({key,label:B(zh,en),options:options.map(([v,z,e])=>[v,B(z,e)])});
const fmt=x=>Number.isFinite(x)?Number(x.toFixed(5)).toString():'—';
const read=(zh,en,v)=>({label:B(zh,en),value:typeof v==='object'?v:String(v)});
const series=(zh,en,points,extra={})=>({name:B(zh,en),points,...extra});
const graph=(zh,en,x,y,items,extra={})=>({title:B(zh,en),x:typeof x==='string'?B(x,x):x,y:typeof y==='string'?B(y,y):y,series:items,...extra});
const stable=d=>Math.abs(d)<1e-7?'critical':d<0?'stable':'unstable';
const marker=(x,y,type='stable')=>({x,y,type});
const fields=(f,box,n=13)=>M.linspace(box[0],box[1],n).flatMap(x=>M.linspace(box[2],box[3],n).map(y=>{const v=f([x,y]);return [x,y,...v];}));
const xy=path=>path.points.filter((_,i)=>i%3===0).map(p=>[p[1],p[2]]);
const trace=(f,start,time=12,bound=8,h=.02)=>M.rk4(f,start,{time,bound,h});
const warning=path=>path.reason==='horizon'?B('已完成设定时间窗；有限时间图像不是长期行为的证明。','The chosen time window is complete; a finite trajectory is not proof of asymptotic behavior.'):B('轨迹已因越界、非有限数值或步数上限停止；不连接截断后的点。','The path stopped at a domain, nonfinite-value or step-count limit; no post-stop points are connected.');
const line=(f,roots,limit=3)=>graph('相线与速度','Phase line and velocity','x',B('f(x) / 方向','f(x) / direction'),[series('速度','Velocity',M.linspace(-limit,limit).map(x=>[x,f(x)])),series('零线','Zero',[[ -limit,0],[limit,0]],{color:'#94a3b8'})],{markers:roots.map(r=>marker(r.x,0,r.type)),vectors:M.linspace(-limit,limit,24).map(x=>[x,0,f(x),0]),xRange:[-limit,limit]});
const phase=(f,path,box,extras=[])=>graph('相平面','Phase plane','x','y',[series('轨迹','Trajectory',xy(path)),...extras],{vectors:fields(f,box),xRange:box.slice(0,2),yRange:box.slice(2),equal:true});
const classifications={saddle:B('鞍点','Saddle'),center:B('线性中心','Linear center'),nonhyperbolic:B('非双曲：需检查零方向','Nonhyperbolic: inspect zero direction'),stableNode:B('稳定结点','Stable node'),unstableNode:B('不稳定结点','Unstable node'),stableSpiral:B('稳定螺旋','Stable spiral'),unstableSpiral:B('不稳定螺旋','Unstable spiral'),stableRepeated:B('稳定重根：检查特征向量','Stable repeated root: inspect eigenvectors'),unstableRepeated:B('不稳定重根：检查特征向量','Unstable repeated root: inspect eigenvectors')};
L.ch1={controls:[num('x0','初值 x₀','Initial x₀',-6,6,.1,1.5)],calc:s=>{
 const path=trace(([x])=>[Math.sin(x)],[s.x0],10,10);
 const roots=[-2*pi,-pi,0,pi,2*pi].map(x=>({x,type:stable(Math.cos(x))}));
 return {readings:[read('初始速度','Initial velocity',fmt(Math.sin(s.x0))),read('末态 x(10)','Final x(10)',fmt(path.points.at(-1)[1]))],charts:[line(Math.sin,roots,6.3),graph('时间轨迹','Time trajectory','t','x(t)',[series('解','Solution',path.points.map(p=>[p[0],p[1]]))])],message:warning(path)};
}};
L.ch2={controls:[num('delay','等待时间 τ','Waiting time τ',0,6,.1,2)],calc:s=>({readings:[read('x(6)','x(6)',fmt(M.waiting(6,s.delay))),read('相同初值','Same initial state','x(0)=0')],charts:[graph('解析解族','Exact solution family','t','x(t)',[series('选择的等待解','Selected waiting solution',M.linspace(0,8).map(t=>[t,M.waiting(t,s.delay)])),series('立即出发','Immediate departure',M.linspace(0,8).map(t=>[t,t*t/4]),{dash:true}),series('恒零解','Zero solution',[[0,0],[8,0]])])],message:B('所有曲线满足相同微分方程和初值；图示不是求解器误差。','All curves satisfy the same ODE and initial condition; their differences are not solver errors.')})};
L.ch3={controls:[sel('type','标准形','Normal form',[['sn','鞍结','Saddle-node'],['tc','跨临界','Transcritical'],['super','超临界叉形','Supercritical pitchfork'],['sub','饱和次临界叉形','Saturated subcritical pitchfork']]),num('r','参数 r','Parameter r',-1,1,.01,-.16)],calc:s=>{
 const roots=M.normalRoots(s.type,s.r),branches=[];
 // Sample analytic branches separately: never connect distinct roots across folds.
 const branch=(zh,en,points,type)=>branches.push(series(zh,en,points,{dash:type==='unstable',color:type==='stable'?'#087e8b':'#cf8b3e'}));
 const grid=M.linspace(-1,1,240);
 if(s.type==='sn')for(const sign of [-1,1])branch(sign<0?'稳定支':'不稳定支',sign<0?'Stable branch':'Unstable branch',M.linspace(-1,0).map(r=>[r,sign*Math.sqrt(-r)]),sign<0?'stable':'unstable');
 else if(s.type==='tc'){
  for(const side of [-1,1]){const rs=M.linspace(side<0?-1:0,side<0?0:1);branch('零分支','Zero branch',rs.map(r=>[r,0]),side<0?'stable':'unstable');branch('交叉分支','Crossing branch',rs.map(r=>[r,r]),side<0?'unstable':'stable');}
 }else{
  branch('稳定原点','Stable origin',M.linspace(-1,0).map(r=>[r,0]),'stable');branch('不稳定原点','Unstable origin',M.linspace(0,1).map(r=>[r,0]),'unstable');
  if(s.type==='super')for(const sign of [-1,1])branch('稳定外支','Stable outer branch',M.linspace(0,1).map(r=>[r,sign*Math.sqrt(r)]),'stable');
  else for(const sign of [-1,1]){branch('稳定外支','Stable outer branch',M.linspace(-.25,1).map(r=>[r,sign*Math.sqrt((1+Math.sqrt(Math.max(0,1+4*r)))/2)]),'stable');branch('不稳定内支','Unstable inner branch',M.linspace(-.25,0).map(r=>[r,sign*Math.sqrt(Math.max(0,(1-Math.sqrt(Math.max(0,1+4*r)))/2))]),'unstable');}
 }
 const kinds=roots.map(x=>({x,type:stable(M.normalDerivative(s.type,s.r,x))}));
 return {readings:[read('不同固定点数','Distinct equilibria',roots.length),read('固定点','Equilibria',roots.map(fmt).join(', ')||B('无','None'))],charts:[line(x=>M.normal(s.type,s.r,x),kinds,1.65),graph('分岔图：实线稳定、虚线不稳定','Bifurcation diagram: solid stable, dashed unstable','r','x*',branches,{xRange:[-1,1],yRange:[-1.6,1.6],markers:kinds.map(p=>marker(s.r,p.x,p.type))})],message:B('当前参数的固定点以圆点表示。金色点处线性导数为零；需看高阶项。','Dots mark equilibria at the selected parameter. Gold dots have zero linear derivative and require higher-order analysis.')};
}};
L.ch4={controls:[num('r','参数 r','Parameter r',-2,3,.05,1),num('h','外场 h','Field h',-2,2,.02,.2)],calc:s=>{
 const roots=M.cubicRoots(s.r,s.h),V=x=>-s.r*x*x/2+x**4/4-s.h*x,rs=M.linspace(0,3);
 return {readings:[read('判别式 4r³−27h²','Discriminant 4r³−27h²',fmt(4*s.r**3-27*s.h*s.h)),read('不同实根数','Distinct real roots',roots.length),read('固定点 x*','Equilibria x*',roots.map(fmt).join(', '))],charts:[graph('倾斜势能','Tilted potential','x','V(x)',[series('势能','Potential',M.linspace(-2.6,2.6).map(x=>[x,V(x)]))],{markers:roots.map(x=>marker(x,V(x),stable(s.r-3*x*x)))}),line(x=>s.h+s.r*x-x**3,roots.map(x=>({x,type:stable(s.r-3*x*x)})),2.6),graph('尖点参数平面','Cusp parameter plane','r','h',[series('上折线','Upper fold',rs.map(r=>[r,2*(r/3)**1.5])),series('下折线','Lower fold',rs.map(r=>[r,-2*(r/3)**1.5]))],{xRange:[-2,3],yRange:[-2.2,2.2],markers:[marker(s.r,s.h,'selected')]})],message:B('根的稳定性由 r−3x² 判断；金色重根处仅凭线性项不能作双侧稳定结论。','Root stability follows r−3x². At a gold repeated root the linear term cannot establish two-sided stability.')};
}};
L.ch5={controls:[num('gamma','驱动力 γ','Drive γ',-2,2,.01,1.25),num('x0','初始角度 θ₀ (rad)','Initial angle θ₀ (rad)',-3,3,.1,0)],calc:s=>{
 const path=trace(([x])=>[s.gamma-Math.sin(x)],[s.x0],30,100),period=M.circlePeriod(s.gamma),root=[];
 if(Math.abs(s.gamma)<=1){const a=Math.asin(s.gamma);for(const x of M.unique([M.wrap(a),M.wrap(pi-a)]))root.push({x,type:stable(-Math.cos(x))});}
 const last=path.points.at(-1)[1];
 return {readings:[read('旋转周期 T','Rotation period T',period?fmt(period):Math.abs(s.gamma)===1?B('临界：发散','Critical: divergent'):B('锁定区：无旋转周期','Locking regime: no rotation period')),read('末态 θ mod 2π','Final θ modulo 2π',fmt(M.wrap(last)))],charts:[line(x=>s.gamma-Math.sin(x),root,pi),graph('展开角度','Unwrapped angle','t',B('θ (rad)','θ (rad)'),[series('角度','Angle',path.points.map(p=>[p[0],p[1]]))]),graph('单位圆上的末态','Final state on the unit circle','cos θ','sin θ',[series('圆周','Circle',M.linspace(0,2*pi).map(a=>[Math.cos(a),Math.sin(a)]))],{xRange:[-1.2,1.2],yRange:[-1.2,1.2],equal:true,markers:[marker(Math.cos(last),Math.sin(last),'selected')]})],message:warning(path)};
}};
L.ch6={controls:[num('a','矩阵 a','Matrix a',-3,3,.1,-1),num('b','矩阵 b','Matrix b',-3,3,.1,-2),num('c','矩阵 c','Matrix c',-3,3,.1,2),num('d','矩阵 d','Matrix d',-3,3,.1,-1)],calc:s=>{
 const f=([x,y])=>[s.a*x+s.b*y,s.c*x+s.d*y],p=trace(f,[1,.5],10,5),e=M.linear(s.a,s.b,s.c,s.d),eigen=e.D<0?`${fmt(e.eigen[0])} ± ${fmt(e.eigen[1])}i`:e.eigen.map(fmt).join(', ');
 return {readings:[read('分类','Classification',classifications[e.type]),read('特征值','Eigenvalues',eigen),read('迹 τ / 行列式 Δ','Trace τ / determinant Δ',`${fmt(e.trace)} / ${fmt(e.det)}`)],charts:[phase(f,p,[-4,4,-4,4]),graph('迹—行列式平面','Trace–determinant plane','τ','Δ',[series('重根边界 Δ=τ²/4','Repeated-root boundary Δ=τ²/4',M.linspace(-6,6).map(t=>[t,t*t/4])),series('Δ=0','Δ=0',[[-6,0],[6,0]],{dash:true})],{xRange:[-6,6],yRange:[-19,19],markers:[marker(e.trace,e.det,'selected')]})],message:warning(p)};
}};
L.ch7={controls:[num('a','三次系数 a','Cubic coefficient a',-1,1,.05,-.5),num('r0','初始半径 r₀','Initial radius r₀',.1,2,.1,1)],calc:s=>{
 const f=([x,y])=>{const r=x*x+y*y;return [-y+s.a*x*r,x+s.a*y*r];},p=M.rk4(f,[s.r0,0],{time:12,bound:5,h:.005,inside:v=>Math.hypot(...v)<=5});
 const ref=M.linspace(0,2*pi).map(a=>[s.r0*Math.cos(a),s.r0*Math.sin(a)]);
 return {readings:[read('非线性结论','Nonlinear conclusion',s.a<0?B('渐近稳定','Asymptotically stable'):s.a>0?B('不稳定','Unstable'):B('中心','Center')),read('共同线性特征值','Shared linear eigenvalues','±i')],charts:[phase(f,p,[-2.5,2.5,-2.5,2.5],[series('线性中心参照','Linear center reference',ref,{dash:true})]),graph('半径随时间','Radius versus time','t','r',[series('非线性半径','Nonlinear radius',p.points.map(p=>[p[0],Math.hypot(p[1],p[2])])),series('线性半径','Linear radius',[[0,s.r0],[12,s.r0]],{dash:true})])],message:warning(p)};
}};
const windingLab=(s,chapter)=>{
 const field=chapter===9?([x,y])=>[x*x-1,y]:s.type==='saddle'?([x,y])=>[x,-y]:s.type==='center'?([x,y])=>[-y,x]:s.type==='power'?([x,y])=>[x*x-y*y,2*x*y]:([x,y])=>[x,y];
 const zeros=chapter===9?[[-1,0],[1,0]]:[[0,0]],result=M.winding(field,s.cx,0,s.radius,zeros);
 const expected=chapter===9?zeros.reduce((n,p,i)=>n+(Math.hypot(p[0]-s.cx,p[1])<s.radius?(i===0?-1:1):0),0):null;
 return {readings:[read('数值指标','Numerical index',result.index===null?B('不可定义／分辨不足','Undefined / unresolved'):fmt(result.index)),...(chapter===9?[read('内部指标和','Sum of enclosed indices',result.index===null?'—':expected)]:[])],charts:[graph('围道与向量场','Contour and field','x','y',[series('逆时针围道','Counterclockwise contour',result.contour)],{vectors:fields(field,[-4,4,-4,4]),markers:zeros.map(p=>marker(...p,'selected')),xRange:[-4,4],yRange:[-4,4],equal:true}),graph('累计方向绕转','Accumulated direction turns',B('围道完成比例','Contour fraction'),B('累计圈数','Accumulated turns'),[series('绕转','Winding',result.angles)],{xRange:[0,1],yRange:result.index===null?[-1,1]:undefined})],message:result.index===null?B('围道经过或过于接近零点，或采样不足以可靠展开方向；本次不输出整数指标。','The contour crosses or approaches a zero, or sampling cannot reliably unwrap its direction; no integer index is reported.'):B('这是沿围道的向量方向计数，不是沿粒子运动轨迹计时。移动围道跨过零点时指标才可能改变。','This counts field direction along a contour, not motion along a particle orbit. The index can change when the contour crosses a zero.')};
};
L.ch8={controls:[sel('type','向量场','Vector field',[['node','结点 (x,y)','Node (x,y)'],['saddle','鞍点 (x,−y)','Saddle (x,−y)'],['center','中心 (−y,x)','Center (−y,x)'],['power','复场 zⁿ','Complex field zⁿ']]),num('cx','围道中心 x','Contour center x',-2,2,.1,0),num('radius','围道半径','Contour radius',.2,2,.1,1)],calc:s=>windingLab(s,8)};
L.ch9={controls:[num('cx','围道中心 x','Contour center x',-2,2,.1,0),num('radius','围道半径','Contour radius',.2,2,.1,1.5)],calc:s=>windingLab(s,9)};
L.ch10={controls:[sel('type','模型','Model',[['vdp','van der Pol','van der Pol'],['lyap','Lyapunov 系统','Lyapunov system']]),num('mu','阻尼参数 μ（仅 van der Pol）','μ (van der Pol only)',-1,3,.1,1),num('x0','初值 x₀','Initial x₀',-3,3,.1,1),num('y0','初值 y₀','Initial y₀',-2,2,.1,1)],calc:s=>{
 const vdp=s.type==='vdp',f=vdp?([x,y])=>[y,s.mu*(1-x*x)*y-x]:([x,y])=>[-x+4*y,-x-y**3],p=trace(f,[s.x0,s.y0],25,8,.005),energy=vdp?(x,y)=>(x*x+y*y)/2:M.lyapunov;
 return {readings:[read(vdp?'初始 Ė':'初始 V̇',vdp?'Initial Ė':'Initial V̇',fmt(vdp?s.mu*(1-s.x0*s.x0)*s.y0*s.y0:M.lyapunovRate(s.x0,s.y0))),read('终止时间','Final time',fmt(p.points.at(-1)[0]))],charts:[phase(f,p,[-4,4,-5,5]),graph(vdp?'机械能（不一定单调）':'Lyapunov 函数',vdp?'Mechanical energy (not necessarily monotone)':'Lyapunov function','t',vdp?'E':'V',[series(vdp?'机械能':'Lyapunov 函数',vdp?'Mechanical energy':'Lyapunov function',p.points.filter((_,i)=>i%5===0).map(p=>[p[0],energy(p[1],p[2])]))])],message:warning(p)};
}};
L.ch11={controls:[num('mu','参数 μ','Parameter μ',-1,2,.02,.5)],calc:s=>{
 const f=([x,y])=>[y-2*x,s.mu+x*x-y],p=trace(f,[.2,.3],15,8,.01),roots=s.mu>1?[]:M.unique([1-Math.sqrt(1-s.mu),1+Math.sqrt(1-s.mu)]),g=phase(f,p,[-1,3,-1,5],[series('ẋ=0','ẋ=0',M.linspace(-1,3).map(x=>[x,2*x]),{color:'#cf8b3e'}),series('ẏ=0','ẏ=0',M.linspace(-1,3).map(x=>[x,s.mu+x*x]),{color:'#7485ad',dash:true})]);
 g.markers=roots.map(x=>marker(x,2*x,Math.abs(x-1)<1e-7?'critical':x<1?'stable':'unstable'));
 return {readings:[read('固定点数','Equilibria',roots.length),...roots.map(x=>read(`x*=${fmt(x)}`,`x*=${fmt(x)}`,classifications[M.linear(-2,1,2*x,-1).type]))],charts:[g],message:warning(p)};
}};
L.ch12={controls:[sel('type','分岔模型','Bifurcation model',[['super','超临界 Hopf','Supercritical Hopf'],['sub','局部次临界 Hopf','Local subcritical Hopf'],['infinite','无限周期','Infinite-period']]),num('mu','参数 μ','Parameter μ',-2,2,.01,.25),num('b','频率系数 b（仅 Hopf）','Frequency coefficient b (Hopf only)',-2,2,.1,0),num('r0','初始半径 r₀','Initial radius r₀',.1,2,.1,.8)],calc:s=>{
 const infinite=s.type==='infinite',sign=s.type==='sub'?1:-1;
 const f=([r,theta])=>infinite?[r*(1-r*r),s.mu-Math.sin(theta)]:[s.mu*r+sign*r**3,1+s.b*r*r];
 const p=M.rk4(f,[s.r0,0],{time:25,bound:1000,h:.005,inside:v=>v[0]>=0&&v[0]<=5});
 // Stop display at the intended radial domain even if angular coordinate is large.
 const points=[];let escaped=false;for(const row of p.points){if(row[1]>5){escaped=true;break;}points.push(row);}const cart=points.map(v=>[v[1]*Math.cos(v[2]),v[1]*Math.sin(v[2])]);
 const rstar=infinite?1:s.type==='super'?(s.mu>0?Math.sqrt(s.mu):null):(s.mu<0?Math.sqrt(-s.mu):null),omega=rstar===null?null:1+s.b*rstar*rstar;
 let period=infinite?M.circlePeriod(s.mu):rstar!==null&&Math.abs(omega)>1e-10?2*pi/Math.abs(omega):null;
 let message=warning({...p,reason:escaped?'boundary':p.reason});
 if(!infinite&&rstar!==null&&Math.abs(omega)<1e-10)message=B('角速度为零：此半径是固定点圆，不是周期轨道。','Zero angular speed: this radius forms a circle of equilibria, not a periodic orbit.');
 const circle=rstar===null?[]:[series('径向平衡圆','Stationary-radius circle',M.linspace(0,2*pi).map(a=>[rstar*Math.cos(a),rstar*Math.sin(a)]),{dash:s.type==='sub',color:'#cf8b3e'})];
 return {readings:[read('非零平衡半径','Nonzero stationary radius',rstar===null?B('无','None'):fmt(rstar)),read('周期','Period',period===null?B('无周期轨道／临界','No cycle / critical'):fmt(period))],charts:[graph('轨迹与平衡圆','Trajectory and stationary circle','x','y',[series('轨迹','Trajectory',cart.filter((_,i)=>i%4===0)),...circle],{equal:true,xRange:[-2.5,2.5],yRange:[-2.5,2.5]}),graph('半径与时间','Radius and time','t','r',[series('半径','Radius',points.filter((_,i)=>i%4===0).map(p=>[p[0],p[1]]))])],message};
}};
const mapCache=new Map();
L.ch13={controls:[num('alpha','阻尼 α','Damping α',.2,2,.05,.5),num('gamma','恒力矩 Γ','Constant torque Γ',0,2,.05,1.5),num('y0','截面初速度 y₀','Initial section speed y₀',0,5,.1,1)],calc:s=>{
 const p=M.pendulum(s.alpha,s.gamma,s.y0),segments=[[]];let prev=null;
 p.points.filter((_,i)=>i%3===0).forEach(row=>{const x=M.wrap(row[1]);if(prev!==null&&Math.abs(x-prev)>pi)segments.push([]);segments.at(-1).push([x,row[2]]);prev=x;});
 const mapTop=Math.max(5,(s.gamma+1)/s.alpha),key=`${s.alpha}:${s.gamma}`;let map=mapCache.get(key);
 if(!map){map=M.linspace(.1,mapTop,16).map(y=>{const q=M.pendulum(s.alpha,s.gamma,y);return [y,q.returns[0]?.speed??null];});if(mapCache.size>=8)mapCache.delete(mapCache.keys().next().value);mapCache.set(key,map);}
 // Split undefined map intervals; never interpolate across a missing return.
 const pieces=[[]];for(const [a,b] of map){if(b===null){if(pieces.at(-1).length)pieces.push([]);}else pieces.at(-1).push([a,b]);}
 const valid=map.filter(p=>p[1]!==null),speeds=p.points.map(p=>p[2]);const ymax=Math.max(5,...speeds),ymin=Math.min(-1,...speeds);
 const charts=[graph('圆柱相图（±π 切缝）','Cylindrical phase portrait (±π seam)','x mod 2π','y',segments.filter(a=>a.length>1).map((ps,i)=>series(i?'续段':'轨迹',i?'Continuation':'Trajectory',ps,{color:'#087e8b',hideLegend:i>0})),{xRange:[-pi,pi],yRange:[ymin,ymax],vectors:fields(([x,y])=>[y,s.gamma-Math.sin(x)-s.alpha*y],[-pi,pi,ymin,ymax],10)}),graph('逐圈返回速度','Successive return speeds',B('圈数 n','Revolution n'),'yₙ',[series('返回速度','Return speed',p.returns.map((r,i)=>[i+1,r.speed]),{dots:true})]),graph('首次返回映射','First return map','y₀','P(y₀)',[...pieces.filter(p=>p.length).map((ps,i)=>series('P(y₀)','P(y₀)',ps,{dots:true,hideLegend:i>0})),series('恒等线','Identity',[[0,0],[mapTop,mapTop]],{dash:true,color:'#7485ad'})],{xRange:[0,mapTop]})];
 return {readings:[read('检测到的整圈返回','Detected full-turn returns',p.returns.length),read('首次返回时间','First return time',p.returns.length?fmt(p.returns[0].time):B('观察时间内未返回','No return within the observation window')),read('有返回的采样初值','Sampled initial states with returns',`${valid.length} / ${map.length}`)],charts,message:B('截面取正向每整圈穿越。缺失返回值留空，不与相邻点连线；有限时间无返回不能证明永久锁定。映射为有限采样，不据此声称精确临界参数。','Returns are positive crossings after each full turn. Missing values are left blank without bridging. No finite-time return does not prove permanent locking. The map is finitely sampled and does not establish an exact critical parameter.')};
}};
})();
