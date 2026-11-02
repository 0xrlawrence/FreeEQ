
(function(){
'use strict';
var C={"freqsHz":[20,21,22,23,24,26,27,29,30,32,34,36,38,40,43,45,48,50,53,56,59,63,66,70,74,78,83,87,92,97,103,109,115,121,128,136,143,151,160,169,178,188,199,210,222,235,248,262,277,292,309,326,345,364,385,406,429,453,479,506,534,565,596,630,665,703,743,784,829,875,924,977,1032,1090,1151,1216,1284,1357,1433,1514,1599,1689,1784,1885,1991,2103,2221,2347,2479,2618,2766,2921,3086,3260,3443,3637,3842,4058,4287,4528,4783,5052,5337,5637,5955,6290,6644,7018,7414,7831,8272,8738,9230,9749,10298,10878,11490,12137,12821,13543,14305,15110,15961,16860,17809,18812,19871],"targetDb":[8.1,8.1,8.2,8.2,8.2,8.2,8.2,8.2,8.2,8.2,8.1,8.1,8,7.9,7.7,7.5,7.3,7.1,6.8,6.5,6.3,5.9,5.6,5.3,4.9,4.6,4.3,4,3.6,3.3,2.9,2.5,2.2,1.9,1.5,1.1,0.8,0.6,0.3,0,-0.3,-0.6,-0.8,-1.1,-1.2,-1.4,-1.5,-1.6,-1.6,-1.7,-1.7,-1.7,-1.7,-1.6,-1.6,-1.6,-1.5,-1.5,-1.4,-1.4,-1.3,-1.2,-1.2,-1.1,-1,-0.9,-0.8,-0.7,-0.6,-0.4,-0.3,-0.1,0.1,0.4,0.6,1,1.3,1.8,2.2,2.6,3.1,3.7,4.3,5,5.7,6.4,7.1,7.7,8.2,8.7,9,9.2,9.4,9.4,9.4,9.2,9,8.8,8.6,8.3,8,7.7,7.4,7.1,6.8,6.4,5.9,5.4,4.6,3.9,3,2.1,1,-0.2,-1.4,-2.5,-3.7,-4.8,-5.9,-6.9,-7.9,-8.9,-10.1,-11.8,-14.1,-16.9,-20.3],"asMeasuredDb":[9.4,9.4,9.4,9.3,9.3,9.1,9.1,9,8.9,8.8,8.6,8.5,8.3,8.2,7.9,7.8,7.6,7.4,7.2,6.9,6.7,6.4,6.1,5.8,5.5,5.2,4.8,4.4,4.1,4.1,4.2,4.2,3.9,3.6,3.3,2.9,2.7,2.4,2.1,1.8,1.5,1.3,1.2,1,0.8,0.6,0.4,0.1,-0.1,-0.2,-0.3,-0.5,-0.6,-0.7,-0.9,-1,-1.1,-1.2,-1.2,-1.3,-1.3,-1.3,-1.3,-1.3,-1.3,-1.2,-1.1,-1,-0.8,-0.6,-0.3,0.1,0.4,0.8,1.3,1.8,2.1,2.6,3.1,3.5,3.9,4.4,4.9,5.2,5.7,6.2,6.7,7,7.3,7.5,7.5,7.5,7.4,7.3,7.1,7,6.9,6.7,6.6,6.4,6.1,5.5,4.9,4.1,3.4,2.9,2.6,3.3,4.7,6.8,6.4,1.7,-1.8,-5.4,-8.1,-8.8,-7,-3.4,-0.3,0.6,-1.5,-3.4,-3.8,-6.4,-10.9,-13.7,-12.8],"withFreeEqDb":[11.2,11.1,11.1,10.9,10.7,10.4,10.1,9.9,9.7,9.4,9.3,9,8.9,8.7,8.4,8.2,7.9,7.8,7.5,7.3,7.1,6.8,6.5,6.1,5.8,5.4,5,4.8,4.4,4,3.6,3.3,2.9,2.6,2.3,1.9,1.7,1.4,1,0.5,0,-0.1,-0.5,-0.8,-1.1,-1.5,-2,-2.3,-2.6,-2.7,-2.7,-2.7,-2.6,-2.6,-2.5,-2.3,-2.2,-2.1,-1.9,-1.7,-1.6,-1.4,-1.2,-1,-0.9,-0.7,-0.6,-0.5,-0.4,-0.3,-0.2,-0.1,0.2,0.5,0.9,1.2,1.6,2,2.5,3,3.5,4.2,4.9,5.5,6.1,6.8,7.5,8,8.7,9.2,9.5,9.6,9.6,9.6,9.5,9.4,9.3,9.3,9.5,9.8,9.6,8.8,8.1,7.3,6.9,6.6,6.1,5.4,5.2,5.8,6.2,1,-2.2,-4.8,-7.4,-9.9,-11.8,-13.6,-14.1,-13.2,-10.6,-4.2,-9.7,-15.9,-18.6,-24.5,-30.9]};
var calm=matchMedia('(prefers-reduced-motion: reduce)').matches;
var $=function(s){return document.querySelector(s)};

/* ---------- curve data: resampled onto an even log axis ---------- */
var N=256,TOP=14,BOT=-33,fLo=C.freqsHz[0],fHi=C.freqsHz[C.freqsHz.length-1];
function X(f){return Math.log(f/fLo)/Math.log(fHi/fLo)}
function Y(db){return (TOP-db)/(TOP-BOT)}
function resample(arr){
  var out=new Float32Array(N),j=0,xs=C.freqsHz.map(X);
  for(var i=0;i<N;i++){var u=i/(N-1);
    while(j<xs.length-2&&xs[j+1]<u)j++;
    var t=Math.min(1,Math.max(0,(u-xs[j])/(xs[j+1]-xs[j])));
    out[i]=Y(arr[j]+(arr[j+1]-arr[j])*t);}
  return out;
}
var As=resample(C.asMeasuredDb),Wi=resample(C.withFreeEqDb),Ta=resample(C.targetDb);
var buf=new Float32Array(N*4);
for(var i=0;i<N;i++){buf[i*4]=calm?Wi[i]:As[i];buf[i*4+1]=Ta[i];buf[i*4+2]=As[i];buf[i*4+3]=1}

/* ---------- axis, in the DOM so it stays real text ---------- */
var plot=$('#plot'),hz=$('#hz');
[10,0,-10,-20,-30].forEach(function(d){
  var t=document.createElement('div');t.className='tick';t.style.top=(Y(d)*100)+'%';
  t.innerHTML='<b>'+(d>0?'+':'')+String(d).replace('-','−')+' dB</b>';plot.appendChild(t)});
[[20,'20 Hz'],[100,'100'],[1000,'1k'],[10000,'10k'],[fHi,'20k']].forEach(function(a){
  var t=document.createElement('i');t.textContent=a[1];t.style.left=(X(a[0])*100)+'%';hz.appendChild(t)});

/* ---------- suminagashi ring glyphs ---------- */
function ring(cx,cy,r,seed,wob){
  var d='',n=48;wob=wob==null?.05:wob;
  for(var i=0;i<=n;i++){var a=i/n*6.28318,
    k=r*(1+wob*Math.sin(a*2+seed)+wob*.6*Math.sin(a*3-seed*1.7)+wob*.3*Math.sin(a*5+seed*2.3));
    d+=(i?'L':'M')+(cx+Math.cos(a)*k).toFixed(1)+' '+(cy+Math.sin(a)*k).toFixed(1)}
  return d+'Z';
}
function stack(cx,cy,rs,seed,core){
  var o='';rs.forEach(function(r,i){o+='<path d="'+ring(cx,cy,r,seed+i*.35)+'" fill="none" stroke="#1E2D4A" stroke-width="'+(i%3==0?1.2:.7)+'"/>'});
  if(core)o+='<path d="'+ring(cx,cy,core,seed,.07)+'" fill="#0A1A33"/>';
  return o;
}
$('#g1').innerHTML=stack(82,44,[9,13,18,24,31],1.2,6)+stack(26,28,[6,10],3)+stack(30,92,[6,10,15],4.4)+stack(94,102,[5,9],2.1)
  +'<path d="M30 40C40 66 60 64 73 54" fill="none" stroke="#7E8A9B" stroke-width=".8" stroke-dasharray="1 3" stroke-linecap="round"/>';
$('#g2').innerHTML=stack(36,60,[8,12,17,23,30],.6,5)+stack(88,60,[8,12,17,23,30],2.9);
$('#g3').innerHTML='<path d="M4 60C24 52 34 66 60 60S98 54 116 60" fill="none" stroke="#7E8A9B" stroke-width=".8"/>'+stack(32,60,[9,14,20,27],1.7,5.5)+stack(88,60,[9,14,20,27],4.8,5.5);

/* ---------- the search has no data in a preview: say so plainly ---------- */
var water=null;

/* ---------- WebGL ---------- */
var canvas=$('#basin');
var gl=canvas.getContext('webgl2',{alpha:false,antialias:false,depth:false,stencil:false,powerPreference:'low-power'});
function bail(){document.documentElement.classList.add('nogl');canvas.style.display='none';drawFallback()}
function drawFallback(){
  function path(a){var d='';for(var i=0;i<N;i+=2)d+=(i?'L':'M')+(i/(N-1)*1000).toFixed(1)+' '+(a[i]*400).toFixed(1);return d}
  var s=document.createElementNS('http://www.w3.org/2000/svg','svg');
  s.setAttribute('viewBox','0 0 1000 400');s.setAttribute('preserveAspectRatio','none');
  s.style.cssText='position:absolute;inset:0;width:100%;height:100%;overflow:visible';
  s.innerHTML='<path d="'+path(Ta)+'" fill="none" stroke="#4C5A70" stroke-width="2" stroke-dasharray=".1 6" stroke-linecap="round" vector-effect="non-scaling-stroke"/><path d="'+path(As)+'" fill="none" stroke="#7E8A9B" stroke-width="1.5" vector-effect="non-scaling-stroke"/><path d="'+path(Wi)+'" fill="none" stroke="#0A1A33" stroke-width="2.6" vector-effect="non-scaling-stroke"/>';
  plot.appendChild(s);
}
var okF=gl&&(gl.getExtension('EXT_color_buffer_float')||gl.getExtension('EXT_color_buffer_half_float'));
if(!okF){bail();return}

var VS='#version 300 es\nin vec2 a;out vec2 vUv;void main(){vUv=a*.5+.5;gl_Position=vec4(a,0.,1.);}';
var H='#version 300 es\nprecision highp float;in vec2 vUv;out vec4 o;\n';

/* The pattern is baked once: a warped, tile-able phase field. Every hairline on
   screen is a contour of it, drawn per pixel, so lines stay sharp at any stretch. */
var FS_BAKE=H+`
uniform float uB;
const float T=6.2831853;
float w(vec2 p,vec2 k,float f){return sin(T*dot(p,k)+f);}
void main(){vec2 p=vUv;
 vec2 q=vec2(w(p,vec2(1,2),.3)+.55*w(p,vec2(3,-1),1.7)+.28*w(p,vec2(-2,5),4.),
             w(p,vec2(2,-1),2.1)+.55*w(p,vec2(1,3),.9)+.28*w(p,vec2(5,2),3.3));
 vec2 r=vec2(w(p+.10*q,vec2(2,3),1.)+.5*w(p+.06*q,vec2(-4,3),2.6),
             w(p+.10*q,vec2(3,-2),5.)+.5*w(p+.06*q,vec2(4,5),.4));
 vec2 u=p+.085*q+.05*r;
 float s=.9*w(u,vec2(1,1),.2)+.55*w(u,vec2(2,1),2.)+.42*w(u,vec2(1,3),4.1)+.2*w(u,vec2(4,3),1.1)+.1*w(u,vec2(5,7),3.);
 vec2 v=p+.12*r+.05*q;
 float d=.5+.5*(.62*w(v,vec2(1,1),2.4)+.3*w(v,vec2(3,2),.7)+.2*w(v,vec2(2,5),5.2));
 float g=fract(sin(dot(gl_FragCoord.xy,vec2(12.9898,78.233)))*43758.5453);
 o=vec4(s,d,g,length(vec2(dFdx(s),dFdy(s)))*uB);}`;

var FS_SPLAT=H+`
uniform sampler2D uT;uniform vec2 uA,uB,uF;uniform float uR,uAsp;
void main(){vec2 p=vUv,a=uA,b=uB;p.x*=uAsp;a.x*=uAsp;b.x*=uAsp;
 vec2 ab=b-a;float h=clamp(dot(p-a,ab)/max(dot(ab,ab),1e-7),0.,1.);
 float d=length(p-a-ab*h);
 o=texture(uT,vUv)+vec4(uF*exp(-d*d/uR),0.,0.);}`;
var FS_ADV_V=H+`
uniform sampler2D uV;uniform vec2 uTx;uniform float uDt,uK,uTime;
void main(){vec2 c=vUv-uDt*texture(uV,vUv).xy*uTx;vec4 v=texture(uV,c)*uK;
 v.xy+=uDt*1.1*vec2(sin(vUv.y*5.+uTime*.21)+.5*sin(vUv.y*11.-uTime*.13),.8*cos(vUv.x*4.-uTime*.17));
 o=v;}`;
var FS_DIV=H+`
uniform sampler2D uV;uniform vec2 uTx;
void main(){float L=texture(uV,vUv-vec2(uTx.x,0)).x,R=texture(uV,vUv+vec2(uTx.x,0)).x,
 B=texture(uV,vUv-vec2(0,uTx.y)).y,T=texture(uV,vUv+vec2(0,uTx.y)).y;
 o=vec4(.5*(R-L+T-B));}`;
var FS_JAC=H+`
uniform sampler2D uP,uD;uniform vec2 uTx;
void main(){float L=texture(uP,vUv-vec2(uTx.x,0)).x,R=texture(uP,vUv+vec2(uTx.x,0)).x,
 B=texture(uP,vUv-vec2(0,uTx.y)).x,T=texture(uP,vUv+vec2(0,uTx.y)).x;
 o=vec4((L+R+B+T-texture(uD,vUv).x)*.25);}`;
var FS_GRAD=H+`
uniform sampler2D uP,uV;uniform vec2 uTx;
void main(){float L=texture(uP,vUv-vec2(uTx.x,0)).x,R=texture(uP,vUv+vec2(uTx.x,0)).x,
 B=texture(uP,vUv-vec2(0,uTx.y)).x,T=texture(uP,vUv+vec2(0,uTx.y)).x;
 vec4 v=texture(uV,vUv);v.xy-=.5*vec2(R-L,T-B);o=v;}`;
/* Displacement, not position: small numbers keep half-float precision. It relaxes
   slowly, so the basin heals itself instead of smearing forever. */
var FS_MAP=H+`
uniform sampler2D uV,uM;uniform vec2 uTxV;uniform float uDt,uRelax;
void main(){vec2 s=uDt*texture(uV,vUv).xy*uTxV;
 o=vec4((texture(uM,vUv-s).xy-s)*uRelax,0.,1.);}`;

var FS_SHOW=H+`
uniform sampler2D uBase,uMap,uCurve;
uniform vec2 uRes,uFlood;uniform float uDpr,uScroll,uTime,uTile;
uniform vec4 uQuiet[6];uniform vec4 uRect;uniform vec3 uPool,uTip;
const vec3 PAPER=vec3(.965,.957,.937),INDIGO=vec3(.039,.102,.2),CUR=vec3(.118,.176,.29),PALE=vec3(.867,.886,.91);
float box(vec2 p,vec4 r){vec2 c=r.xy+r.zw*.5,d=abs(p-c)-r.zw*.5;return length(max(d,0.))+min(max(d.x,d.y),0.);}
float hair(float x,float k,float l){float f=abs(fract(x)-.5);
 float w=l*k;float a=(1.-smoothstep(max(w-.75*l,0.),w+.75*l,f))*min(1.,1.6*k+.3);
 return mix(a,.14,smoothstep(.4,1.1,l));}
float wash(vec2 n,vec2 pn,float s){ /* the main current: it rises out of the curve and winds into the pool */
 float t=smoothstep(.34,pn.x+.03,n.x);
 float y=mix(.8,pn.y,t*t*(3.-2.*t))+.03*s+.03*sin(n.x*9.+1.);
 return exp(-pow((n.y-y)/(.06+.11*(1.-t)),2.))*smoothstep(.26,.5,n.x);}
void pool(inout vec3 c,vec2 p,vec3 P,float s,float dpr){
 if(P.z<=.01)return;vec2 v=p-P.xy;v.y*=1.22;float r=length(v),a=atan(v.y,v.x);
 float R=P.z*(1.+.06*sin(a*3.+s*2.)+.04*sin(a*5.-s));
 float e=smoothstep(R+1.2*dpr,R-1.2*dpr,r);
 vec3 inner=mix(INDIGO,CUR,.75*smoothstep(.35,.0,abs(r/R-.6))*smoothstep(-.2,1.,sin(a+1.)));
 c=mix(c,inner,e);
 float halo=exp(-max(r-R,0.)/(R*.32));c=mix(c,INDIGO,.42*halo*(1.-e));
 float rim=1.-smoothstep(0.,1.*dpr,abs(r-R*1.32-.5*dpr));c=mix(c,PAPER,.5*rim);
}
void main(){
 vec2 D=texture(uMap,vUv).xy;
 vec2 px=vec2(vUv.x,1.-vUv.y)*uRes;
 vec2 w=px+vec2(D.x,-D.y)*uRes;
 /* the standing eddy around the pool */
 vec2 rel=w-uPool.xy;float r=length(rel),R=.3*min(uRes.x*1.1,uRes.y);
 float an=1.8*exp(-r*r/(R*R))+.8*exp(-r/(R*.2));
 float cs=cos(an),sn=sin(an);
 vec2 sw=uPool.xy+mat2(cs,sn,-sn,cs)*rel;
 vec2 tc=(sw+vec2(0.,uScroll*.3))/uTile+uTime*vec2(.0011,-.0007);
 vec4 b=texture(uBase,tc);
 float s=b.r,d=b.g;
 vec2 n=(w+vec2(0.,uScroll))/uRes;
 float hero=exp(-pow(max(n.y-.75,0.)*1.6,2.)*3.);
 float wm=wash(n,uPool.xy/uRes,s);
 float E=exp(-r*r/(R*R*1.9));
 float M=mix(.34+.3*d,.16+1.3*wm+.8*E*E,hero);
 /* keep every text block legible: ink thins out around it */
 float q=1e5;for(int i=0;i<6;i++)if(uQuiet[i].z>0.)q=min(q,box(px,uQuiet[i]));
 float keep=mix(.05,1.,smoothstep(0.,80.*uDpr,q));
 float dk=pow(d,1.5);
 float lw=.55+1.5*dk*dk;
 float sc=b.a*length(fwidth(tc))*.72;
 float l=hair(s*7.,.36*lw,sc*7.)*(.42+.58*dk)+hair(s*19.,.3,sc*19.)*.5*(.3+dk)+hair(s*41.+d,.2,sc*41.)*.3*(.2+dk);
 float veil=smoothstep(.6,.98,d)*.34;
 float dark=(smoothstep(.2,.95,hair(s*3.+d*.5,.9,sc*3.))*.55+veil)*max(wm,E)*hero;
 float py=(px.y-uRect.y)/uRect.w;
 float a=clamp(l*M+dark*.8+veil*.2*M,0.,1.)*keep*(1.-.6*smoothstep(-.12,.06,py)*(1.-smoothstep(1.,1.1,py)));

 /* the privacy section: the ink floods in under a marbled edge */
 float wob=(s*44.+sin(w.x*.006+1.)*34.)*uDpr;
 float F=smoothstep(-1.5,1.5,w.y+wob-uFlood.x)*(1.-smoothstep(-1.5,1.5,w.y+wob*.8-uFlood.y));
 vec3 c=mix(PAPER*(1.-.012*(b.b-.5)),INDIGO,F);
 c=mix(c,mix(mix(CUR,INDIGO,a),PALE,F),a*(1.-.62*F));

 /* the measured curve, floating in the same water */
 vec2 dc=clamp(vec2(D.x,-D.y)*uRes,-90.*uDpr,90.*uDpr)*.3;
 vec2 u=(px+dc-uRect.xy)/uRect.zw;
 if(uRect.w>0.&&u.y>-.45&&u.y<1.45){
  float e=2./256.;
  float x=clamp(u.x,0.,1.);
  vec4 k=texture(uCurve,vec2(x,.5)),k2=texture(uCurve,vec2(x+e,.5));
  float asp=uRect.w/uRect.z;
  vec3 m=(k2.rgb-k.rgb)/e*asp;
  vec3 dist=(u.y-k.rgb)*uRect.w/sqrt(1.+m*m);
  float dp=dist.r/uDpr;
  /* filaments that hug the current */
  float nar=uRect.z/uDpr<720.?1.:0.;
  float fall=exp(-abs(dp)/mix(48.,24.,nar));
  float bund=hair(dp/mix(7.,10.,nar)+.55*s,.26,fwidth(dp)/mix(7.,10.,nar)+sc*.55)*(.42+.58*d)*fall;
  float vein=pow(.5+.5*sin(dp*.55+s*11.+x*19.),4.)*exp(-abs(dp)/24.)*(.25+.75*d)*smoothstep(0.,.08,x);
  c=mix(c,CUR,clamp(bund*.95+vein*.62,0.,1.)*keep);
  /* as measured */
  float gl=1.-smoothstep(.6,1.5,abs(dist.b)/uDpr);
  float gh=1.-smoothstep(2.2,3.6,abs(dist.b)/uDpr);
  c=mix(c,PAPER,gh*.75*keep);c=mix(c,vec3(.42,.47,.55),gl*keep);
  /* target: a chain of beads */
  float bead=length(vec2(fract(x*150.)-.5,0.)*vec2(uRect.z/150./uDpr,1.)+vec2(0.,dist.g/uDpr));
  c=mix(c,vec3(.298,.353,.439),(1.-smoothstep(.9,1.5,bead))*keep);
  /* with FreeEQ: a loaded brush line */
  float wd=1.9+.5*sin(x*70.+s*2.)+.7*d;
  float core=1.-smoothstep(wd-.7,wd+.7,abs(dist.r)/uDpr);
  c=mix(c,INDIGO,core*keep);
 }
 float sg=s;
 /* the thread the drop fell along */
 {float y=(uPool.y-w.y)/uDpr;
  if(y>0.&&y<uRes.y){float xw=uPool.x/uDpr+y*.34+22.*sin(y*.021+1.)+9.*sin(y*.067)+3.5*sin(y*.19);
   float th=abs(w.x/uDpr-xw);float gate=smoothstep(-.35,.25,sin(y*.031+2.)+.5*sin(y*.083));
   float bd=.75+1.5*pow(.5+.5*sin(y*.23+sin(y*.05)*2.),6.);
   c=mix(c,CUR,(1.-smoothstep(bd-.5,bd+.6,th))*gate*keep*.9);}}
 pool(c,px,uTip,sg,uDpr);
 pool(c,w,uPool,sg,uDpr);
 o=vec4(c,1.);}`;

function sh(t,src){var s=gl.createShader(t);gl.shaderSource(s,src);gl.compileShader(s);
  if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))console.error(gl.getShaderInfoLog(s));return s}
var vs=sh(gl.VERTEX_SHADER,VS);
function prog(fs){var p=gl.createProgram();gl.attachShader(p,vs);gl.attachShader(p,sh(gl.FRAGMENT_SHADER,fs));
  gl.bindAttribLocation(p,0,'a');gl.linkProgram(p);
  if(!gl.getProgramParameter(p,gl.LINK_STATUS)){console.error(gl.getProgramInfoLog(p));return null}
  var u={},n=gl.getProgramParameter(p,gl.ACTIVE_UNIFORMS);
  for(var i=0;i<n;i++){var a=gl.getActiveUniform(p,i),nm=a.name.replace('[0]','');u[nm]=gl.getUniformLocation(p,a.name)}
  return{p:p,u:u}}
var P={bake:prog(FS_BAKE),splat:prog(FS_SPLAT),advV:prog(FS_ADV_V),div:prog(FS_DIV),jac:prog(FS_JAC),grad:prog(FS_GRAD),map:prog(FS_MAP),show:prog(FS_SHOW)};
for(var k in P)if(!P[k]){bail();return}

var vb=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,vb);
gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),gl.STATIC_DRAW);
gl.enableVertexAttribArray(0);gl.vertexAttribPointer(0,2,gl.FLOAT,false,0,0);
gl.disable(gl.BLEND);

function tex(w,h,wrap,type,data){var t=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,t);
  gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA16F,w,h,0,gl.RGBA,type||gl.HALF_FLOAT,data||null);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,wrap);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,wrap);return t}
function fbo(w,h,wrap){var t=tex(w,h,wrap||gl.CLAMP_TO_EDGE),f=gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER,f);gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D,t,0);
  gl.clearColor(0,0,0,1);gl.clear(gl.COLOR_BUFFER_BIT);return{t:t,f:f,w:w,h:h}}
function dbl(w,h){var a=fbo(w,h),b=fbo(w,h);return{get r(){return a},get w(){return b},swap:function(){var x=a;a=b;b=x}}}
function bind(unit,t,loc){gl.activeTexture(gl.TEXTURE0+unit);gl.bindTexture(gl.TEXTURE_2D,t);gl.uniform1i(loc,unit)}
function draw(tg){if(tg){gl.bindFramebuffer(gl.FRAMEBUFFER,tg.f);gl.viewport(0,0,tg.w,tg.h)}
  else{gl.bindFramebuffer(gl.FRAMEBUFFER,null);gl.viewport(0,0,canvas.width,canvas.height)}
  gl.drawArrays(gl.TRIANGLES,0,3)}

var phone=Math.min(screen.width,screen.height)<700;
var base=fbo(phone?768:1024,phone?768:1024,gl.REPEAT);
if(gl.checkFramebufferStatus(gl.FRAMEBUFFER)!==gl.FRAMEBUFFER_COMPLETE){bail();return}
gl.useProgram(P.bake.p);gl.uniform1f(P.bake.u.uB,base.w);draw(base);
var curveT=tex(N,1,gl.CLAMP_TO_EDGE,gl.FLOAT,buf);

var vel,prs,map,div,simW,simH,dprMax=Math.min(devicePixelRatio||1,phone?2:1.75),dpr=dprMax,cw=0;
function alloc(){
  var aspect=innerWidth/innerHeight,minSide=phone?64:96;
  simW=aspect>1?Math.round(minSide*aspect):minSide;simH=aspect>1?minSide:Math.round(minSide/aspect);
  vel=dbl(simW,simH);prs=dbl(simW,simH);div=fbo(simW,simH);
  var m=phone?220:320,mw=aspect>1?Math.round(m*aspect):m,mh=aspect>1?m:Math.round(m/aspect);
  map=dbl(mw,mh);
}
function size(){
  var w=canvas.clientWidth,h=canvas.clientHeight;
  canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);
  if(w!==cw){cw=w;alloc()}
  measure();dirty=true;
}

/* layout is cached in document space so the frame loop never touches the DOM */
var quiet=[],rect={},floodR={},poolR={},dirty=true;
function docRect(el){var r=el.getBoundingClientRect();return{x:r.left,y:r.top+scrollY,w:r.width,h:r.height}}
function measure(){
  quiet=[].slice.call(document.querySelectorAll('[data-quiet]')).slice(0,6).map(docRect);
  rect=docRect(plot);var f=docRect($('#flood'));floodR={a:f.y,b:f.y+f.h};poolR=docRect($('#pool'));
}

/* ---------- input ---------- */
var pend=[];
function push(x0,y0,x1,y1,gain,rad){pend.push([x0,y0,x1,y1,gain,rad])}
var last=null;
addEventListener('pointermove',function(e){if(e.pointerType==='touch')return;
  if(last)push(last[0],last[1],e.clientX,e.clientY,1,1);last=[e.clientX,e.clientY]},{passive:true});
document.addEventListener('pointerleave',function(){last=null});
/* touch: passive, so the page still scrolls and the finger still stirs the water */
var tl=null;
addEventListener('touchstart',function(e){var t=e.touches[0];tl=[t.clientX,t.clientY]},{passive:true});
addEventListener('touchmove',function(e){var t=e.touches[0];if(tl)push(tl[0],tl[1],t.clientX,t.clientY,1.25,1.2);tl=[t.clientX,t.clientY]},{passive:true});
addEventListener('touchend',function(){tl=null},{passive:true});
water={tap:function(el){var r=el.getBoundingClientRect(),x=r.right-20-Math.random()*40,y=r.top+r.height/2;
  push(x,y,x+(Math.random()-.5)*30,y+22,.7,.6)}};

function flushSplats(){
  if(!pend.length)return;
  var W=canvas.clientWidth,Hh=canvas.clientHeight,asp=W/Hh;
  gl.useProgram(P.splat.p);var u=P.splat.u;
  pend.slice(-5).forEach(function(s){
    var ax=s[0]/W,ay=1-s[1]/Hh,bx=s[2]/W,by=1-s[3]/Hh;
    var fx=(bx-ax)*simW*26*s[4],fy=(by-ay)*simH*26*s[4];
    var m=Math.hypot(fx,fy),cap=220;if(m>cap){fx*=cap/m;fy*=cap/m}
    bind(0,vel.r.t,u.uT);gl.uniform2f(u.uA,ax,ay);gl.uniform2f(u.uB,bx,by);gl.uniform2f(u.uF,fx,fy);
    gl.uniform1f(u.uR,.0028*s[5]*(phone?1.8:1));gl.uniform1f(u.uAsp,asp);draw(vel.w);vel.swap();
  });pend.length=0;
}
function step(dt,t){
  var tx=[1/simW,1/simH];
  flushSplats();
  gl.useProgram(P.advV.p);var u=P.advV.u;
  bind(0,vel.r.t,u.uV);gl.uniform2fv(u.uTx,tx);gl.uniform1f(u.uDt,dt);gl.uniform1f(u.uK,Math.pow(.2,dt));gl.uniform1f(u.uTime,t);draw(vel.w);vel.swap();
  gl.useProgram(P.div.p);bind(0,vel.r.t,P.div.u.uV);gl.uniform2fv(P.div.u.uTx,tx);draw(div);
  gl.useProgram(P.jac.p);u=P.jac.u;gl.uniform2fv(u.uTx,tx);bind(1,div.t,u.uD);
  for(var i=0;i<(phone?8:12);i++){bind(0,prs.r.t,u.uP);draw(prs.w);prs.swap()}
  gl.useProgram(P.grad.p);u=P.grad.u;bind(0,prs.r.t,u.uP);bind(1,vel.r.t,u.uV);gl.uniform2fv(u.uTx,tx);draw(vel.w);vel.swap();
  gl.useProgram(P.map.p);u=P.map.u;bind(0,vel.r.t,u.uV);bind(1,map.r.t,u.uM);gl.uniform2fv(u.uTxV,tx);gl.uniform1f(u.uDt,dt);gl.uniform1f(u.uRelax,Math.exp(-dt*.07));draw(map.w);map.swap();
}

/* ---------- the once-only correction ---------- */
var sweepStart=null,sweepDone=calm,tip=[0,0,0],delay=1100,dur=3600;
function ease(k){return 1-Math.pow(2,-9*k)}
function sweep(now){
  if(sweepDone)return;if(sweepStart===null)sweepStart=now+delay;
  var e=(now-sweepStart)/dur;if(e<0)return;
  var front=Math.min(1,e/.72),idx=Math.min(N-1,Math.floor(front*(N-1)));
  for(var i=0;i<N;i++){var k=Math.min(1,Math.max(0,(e-(i/(N-1))*.72)/.28));buf[i*4]=As[i]+(Wi[i]-As[i])*ease(k)}
  gl.bindTexture(gl.TEXTURE_2D,curveT);gl.texSubImage2D(gl.TEXTURE_2D,0,0,0,N,1,gl.RGBA,gl.FLOAT,buf);
  var sy=scrollY,px=front*canvas.clientWidth,py=rect.y-sy+buf[idx*4]*rect.h;
  tip=[px,py,(front<1?1:0)*(4.5+3*Math.sin(front*3.14))];
  if(front<1){var push0=(Wi[idx]-As[idx])*rect.h;
    pend.push([px-10,py-push0*.5,px+4,py+push0*.5,.16,.5])}
  if(e>=1){sweepDone=true;tip=[0,0,0]}
}

/* ---------- frame ---------- */
var prev=0,slow=0,tick=0,running=false;
function render(now){
  var S=P.show,u=S.u,sy=scrollY;
  gl.useProgram(S.p);
  bind(0,base.t,u.uBase);bind(1,map.r.t,u.uMap);bind(2,curveT,u.uCurve);
  gl.uniform2f(u.uRes,canvas.width,canvas.height);gl.uniform1f(u.uDpr,dpr);
  gl.uniform1f(u.uScroll,sy*dpr);gl.uniform1f(u.uTime,calm?0:now/1000);
  gl.uniform1f(u.uTile,(phone?1000:1700)*dpr);
  var q=new Float32Array(24),n=0,vh=canvas.clientHeight;
  for(var i=0;i<quiet.length&&n<6;i++){var r=quiet[i],y=r.y-sy;
    if(y+r.h<-120||y>vh+120)continue;
    q.set([r.x*dpr,y*dpr,r.w*dpr,r.h*dpr],n*4);n++}
  gl.uniform4fv(u.uQuiet,q);
  gl.uniform4f(u.uRect,0,(rect.y-sy)*dpr,canvas.width,rect.h*dpr);
  gl.uniform2f(u.uFlood,(floodR.a-sy)*dpr,(floodR.b-sy)*dpr);
  gl.uniform3f(u.uPool,poolR.x*dpr,(poolR.y-sy)*dpr,(cw<720?11:20)*dpr);
  gl.uniform3f(u.uTip,tip[0]*dpr,tip[1]*dpr,tip[2]*dpr);
  draw(null);
}
function loop(now){
  if(document.hidden){running=false;return}
  requestAnimationFrame(loop);
  var ms=now-prev;prev=now;var dt=Math.min(ms/1000,1/30)||1/60;
  /* thin the display before the phone starts dropping frames */
  if(ms<200){slow=slow*.96+(ms>26?1:0)*.04;if(slow>.6&&dpr>1){dpr=Math.max(1,dpr-.25);slow=0;size()}}
  sweep(now);
  if(!phone||(tick++&1)===0)step(phone?dt*2:dt,now/1000);
  render(now);
}
function start(){if(running)return;running=true;prev=performance.now();requestAnimationFrame(loop)}
function still(){render(0)}
function go(){size();
  if(calm){still();addEventListener('scroll',function(){requestAnimationFrame(still)},{passive:true})}
  else start()}
var rz;addEventListener('resize',function(){clearTimeout(rz);rz=setTimeout(function(){size();if(calm)still()},120)});
document.addEventListener('visibilitychange',function(){if(!document.hidden&&!calm)start()});
canvas.addEventListener('webglcontextlost',function(e){e.preventDefault();running=false;bail()});
/* web fonts and late layout shift the plot: the shader must always match the axis */
function remeasure(){measure();if(calm)still()}
var ro=new ResizeObserver(remeasure);ro.observe(document.body);ro.observe(plot);ro.observe($('.copy'));
addEventListener('load',remeasure);
if(document.fonts&&document.fonts.addEventListener)document.fonts.addEventListener('loadingdone',remeasure);
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(function(){measure();if(calm)still()});
go();
})();
