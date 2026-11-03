(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=1e3,t=1001,n=1002,r=1003,i=1004,a=1005,o=1006,s=1007,c=1008,l=1009,u=1010,d=1011,f=1012,p=1013,m=1014,h=1015,g=1016,_=1017,v=1018,y=1020,b=35902,x=35899,S=1021,C=1022,w=1023,T=1026,E=1027,D=1028,O=1029,k=1030,A=1031,ee=1033,j=33776,te=33777,M=33778,ne=33779,N=35840,re=35841,P=35842,ie=35843,ae=36196,oe=37492,se=37496,ce=37488,F=37489,le=37490,ue=37491,de=37808,fe=37809,pe=37810,me=37811,he=37812,ge=37813,_e=37814,ve=37815,ye=37816,be=37817,xe=37818,Se=37819,Ce=37820,we=37821,Te=36492,Ee=36494,De=36495,Oe=36283,ke=36284,Ae=36285,je=36286,Me=2300,Ne=2301,I=2302,Pe=2303,Fe=2400,Ie=2401,L=2402,Le=3200,R=3201,Re=`srgb`,z=`srgb-linear`,ze=`linear`,Be=`srgb`,Ve=7680,He=35044,Ue=35048,We=2e3;function Ge(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function Ke(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function qe(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function Je(){let e=qe(`canvas`);return e.style.display=`block`,e}var Ye={};function Xe(...e){let t=`THREE.`+e.shift();console.log(t,...e)}function Ze(e){let t=e[0];if(typeof t==`string`&&t.startsWith(`TSL:`)){let t=e[1];t&&t.isStackTrace?e[0]+=` `+t.getLocation():e[1]=`Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.`}return e}function B(...e){e=Ze(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function V(...e){e=Ze(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function Qe(...e){let t=e.join(` `);t in Ye||(Ye[t]=!0,B(...e))}function $e(e,t,n){return new Promise(function(r,i){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:i();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:r()}}setTimeout(a,n)})}var et={0:0,2:6,4:4,3:5,1:1,6:2,7:7,5:3},tt=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let e=r.indexOf(t);e!==-1&&r.splice(e,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let t=n.slice(0);for(let n=0,r=t.length;n<r;n++)t[n].call(this,e);e.target=null}}},nt=`00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),rt=1234567,it=Math.PI/180,at=180/Math.PI;function ot(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(nt[e&255]+nt[e>>8&255]+nt[e>>16&255]+nt[e>>24&255]+`-`+nt[t&255]+nt[t>>8&255]+`-`+nt[t>>16&15|64]+nt[t>>24&255]+`-`+nt[n&63|128]+nt[n>>8&255]+`-`+nt[n>>16&255]+nt[n>>24&255]+nt[r&255]+nt[r>>8&255]+nt[r>>16&255]+nt[r>>24&255]).toLowerCase()}function H(e,t,n){return Math.max(t,Math.min(n,e))}function st(e,t){return(e%t+t)%t}function ct(e,t,n,r,i){return r+(e-t)*(i-r)/(n-t)}function lt(e,t,n){return e===t?0:(n-e)/(t-e)}function ut(e,t,n){return(1-n)*e+n*t}function dt(e,t,n,r){return ut(e,t,1-Math.exp(-n*r))}function ft(e,t=1){return t-Math.abs(st(e,t*2)-t)}function pt(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*(3-2*e))}function mt(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*e*(e*(e*6-15)+10))}function ht(e,t){return e+Math.floor(Math.random()*(t-e+1))}function gt(e,t){return e+Math.random()*(t-e)}function _t(e){return e*(.5-Math.random())}function vt(e){e!==void 0&&(rt=e);let t=rt+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function yt(e){return e*it}function bt(e){return e*at}function xt(e){return e>0&&Number.isInteger(e)&&2**Math.round(Math.log2(e))===e}function St(e){return 2**Math.ceil(Math.log(e)/Math.LN2)}function Ct(e){return 2**Math.floor(Math.log(e)/Math.LN2)}function wt(e,t,n,r,i){let a=Math.cos,o=Math.sin,s=a(n/2),c=o(n/2),l=a((t+r)/2),u=o((t+r)/2),d=a((t-r)/2),f=o((t-r)/2),p=a((r-t)/2),m=o((r-t)/2);switch(i){case`XYX`:e.set(s*u,c*d,c*f,s*l);break;case`YZY`:e.set(c*f,s*u,c*d,s*l);break;case`ZXZ`:e.set(c*d,c*f,s*u,s*l);break;case`XZX`:e.set(s*u,c*m,c*p,s*l);break;case`YXY`:e.set(c*p,s*u,c*m,s*l);break;case`ZYZ`:e.set(c*m,c*p,s*u,s*l);break;default:B(`MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: `+i)}}function Tt(e){switch(e.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function Et(e,t){if(t.constructor===Float32Array)return e;let n=Tt(t);if(n===void 0)throw Error(`THREE.MathUtils: Invalid component type.`);return Math.max(e/n,-1)}function Dt(e,t){if(t.constructor===Float32Array)return e;let n=Tt(t);if(n===void 0)throw Error(`THREE.MathUtils: Invalid component type.`);return Math.round(e*n)}var Ot={DEG2RAD:it,RAD2DEG:at,generateUUID:ot,clamp:H,euclideanModulo:st,mapLinear:ct,inverseLerp:lt,lerp:ut,damp:dt,pingpong:ft,smoothstep:pt,smootherstep:mt,randInt:ht,randFloat:gt,randFloatSpread:_t,seededRandom:vt,degToRad:yt,radToDeg:bt,isPowerOfTwo:xt,ceilPowerOfTwo:St,floorPowerOfTwo:Ct,setQuaternionFromProperEuler:wt,normalize:Dt,denormalize:Et},U=class{static{this.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`THREE.Vector2: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`THREE.Vector2: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=H(this.x,e.x,t.x),this.y=H(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=H(this.x,e,t),this.y=H(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(H(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(H(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},kt=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(u!==m||s!==d||c!==f||l!==p){let e=s*d+c*f+l*p+u*m;e<0&&(d=-d,f=-f,p=-p,m=-m,e=-e);let t=1-o;if(e<.9995){let n=Math.acos(e),r=Math.sin(n);t=Math.sin(t*n)/r,o=Math.sin(o*n)/r,s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o}else{s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o;let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:B(`Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(H(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,i=-i,a=-a,o=-o);let s=1-t;if(o<.9995){let e=Math.acos(o),c=Math.sin(e);s=Math.sin(s*e)/c,t=Math.sin(t*e)/c,this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this._onChangeCallback()}else this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},W=class{static{this.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`THREE.Vector3: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`THREE.Vector3: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(jt.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(jt.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=H(this.x,e.x,t.x),this.y=H(this.y,e.y,t.y),this.z=H(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=H(this.x,e,t),this.y=H(this.y,e,t),this.z=H(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(H(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return At.copy(this).projectOnVector(e),this.sub(At)}reflect(e){return this.sub(At.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(H(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},At=new W,jt=new kt,G=class{static{this.prototype.isMatrix3=!0}constructor(e,t,n,r,i,a,o,s,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return Qe(`Matrix3: .scale() is deprecated. Use .makeScale() instead.`),this.premultiply(Mt.makeScale(e,t)),this}rotate(e){return Qe(`Matrix3: .rotate() is deprecated. Use .makeRotation() instead.`),this.premultiply(Mt.makeRotation(-e)),this}translate(e,t){return Qe(`Matrix3: .translate() is deprecated. Use .makeTranslation() instead.`),this.premultiply(Mt.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Mt=new G,Nt=new G().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Pt=new G().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Ft(){let e={enabled:!0,workingColorSpace:z,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n||(this.spaces[t].transfer===`srgb`&&(e.r=Lt(e.r),e.g=Lt(e.g),e.b=Lt(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===`srgb`&&(e.r=Rt(e.r),e.g=Rt(e.g),e.b=Rt(e.b))),e},workingToColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},colorSpaceToWorking:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===``?ze:this.spaces[e].transfer},getToneMappingMode:function(e){return this.spaces[e].outputColorSpaceConfig.toneMappingMode||`standard`},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[n].fromXYZ).multiply(this.spaces[t].toXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return e.define({[z]:{primaries:t,whitePoint:r,transfer:ze,toXYZ:Nt,fromXYZ:Pt,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:Re},outputColorSpaceConfig:{drawingBufferColorSpace:Re}},[Re]:{primaries:t,whitePoint:r,transfer:Be,toXYZ:Nt,fromXYZ:Pt,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:Re}}}),e}var It=Ft();function Lt(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function Rt(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}var zt,Bt=class{static getDataURL(e,t=`image/png`){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{zt===void 0&&(zt=qe(`canvas`)),zt.width=e.width,zt.height=e.height;let t=zt.getContext(`2d`);e instanceof ImageData?t.putImageData(e,0,0):t.drawImage(e,0,0,e.width,e.height),n=zt}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=qe(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=Lt(i[e]/255)*255;return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(Lt(t[e]/255)*255):t[e]=Lt(t[e]);return{data:t,width:e.width,height:e.height}}return B(`ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},Vt=0,Ht=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Vt++}),this.uuid=ot(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<`u`&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t===null?e.set(0,0,0):e.set(t.width||0,t.height||0,t.depth||0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(Ut(r[t].image)):e.push(Ut(r[t]))}else e=Ut(r);n.url=e}return t||(e.images[this.uuid]=n),n}};function Ut(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?Bt.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(B(`Texture: Unable to serialize Texture.`),{})}var Wt=0,Gt=new W,Kt=class r extends tt{constructor(e=r.DEFAULT_IMAGE,n=r.DEFAULT_MAPPING,i=t,a=t,s=o,u=c,d=w,f=l,p=r.DEFAULT_ANISOTROPY,m=``){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Wt++}),this.uuid=ot(),this.name=``,this.source=new Ht(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=a,this.magFilter=s,this.minFilter=u,this.anisotropy=p,this.format=d,this.internalFormat=null,this.type=f,this.offset=new U(0,0),this.repeat=new U(1,1),this.center=new U(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new G,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=m,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(Gt).x}get height(){return this.source.getSize(Gt).y}get depth(){return this.source.getSize(Gt).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.mipmapsAutoUpdate=e.mipmapsAutoUpdate,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isPMREMTexture=e.isPMREMTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){B(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];r===void 0?B(`Texture.setValues(): property '${t}' does not exist.`):r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(r){if(this.mapping!==300)return r;if(r.applyMatrix3(this.matrix),r.x<0||r.x>1)switch(this.wrapS){case e:r.x-=Math.floor(r.x);break;case t:r.x=r.x<0?0:1;break;case n:Math.abs(Math.floor(r.x)%2)===1?r.x=Math.ceil(r.x)-r.x:r.x-=Math.floor(r.x)}if(r.y<0||r.y>1)switch(this.wrapT){case e:r.y-=Math.floor(r.y);break;case t:r.y=r.y<0?0:1;break;case n:Math.abs(Math.floor(r.y)%2)===1?r.y=Math.ceil(r.y)-r.y:r.y-=Math.floor(r.y)}return this.flipY&&(r.y=1-r.y),r}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Kt.DEFAULT_IMAGE=null,Kt.DEFAULT_MAPPING=300,Kt.DEFAULT_ANISOTROPY=1;var qt=class{static{this.prototype.isVector4=!0}constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`THREE.Vector4: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`THREE.Vector4: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=H(this.x,e.x,t.x),this.y=H(this.y,e.y,t.y),this.z=H(this.z,e.z,t.z),this.w=H(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=H(this.x,e,t),this.y=H(this.y,e,t),this.z=H(this.z,e,t),this.w=H(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(H(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Jt=class extends tt{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:o,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new qt(0,0,e,t),this.scissorTest=!1,this.viewport=new qt(0,0,e,t),this.textures=[];let r=n.count;for(let i=0;i<r;i++)this.textures[i]=new Kt({width:e,height:t,depth:n.depth}),this.textures[i].isRenderTargetTexture=!0,this.textures[i].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:o,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.mipmapsAutoUpdate!==void 0&&(t.mipmapsAutoUpdate=e.mipmapsAutoUpdate),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let e=0;e<this.textures.length;e++)this.textures[e].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,i=this.textures.length;r<i;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new Ht(n)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null){if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture}else this.depthTexture=null;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:`dispose`})}},Yt=class extends Jt{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Xt=class extends Kt{constructor(e=null,n=1,i=1,a=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:a},this.magFilter=r,this.minFilter=r,this.wrapR=t,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},Zt=class extends Kt{constructor(e=null,n=1,i=1,a=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:a},this.magFilter=r,this.minFilter=r,this.wrapR=t,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}},Qt=class e{static{this.prototype.isMatrix4=!0}constructor(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/$t.setFromMatrixColumn(e,0).length(),i=1/$t.setFromMatrixColumn(e,1).length(),a=1/$t.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(tn,e,nn)}lookAt(e,t,n){let r=this.elements;return on.subVectors(e,t),on.lengthSq()===0&&(on.z=1),on.normalize(),rn.crossVectors(n,on),rn.lengthSq()===0&&(Math.abs(n.z)===1?on.x+=1e-4:on.z+=1e-4,on.normalize(),rn.crossVectors(n,on)),rn.normalize(),an.crossVectors(on,rn),r[0]=rn.x,r[4]=an.x,r[8]=on.x,r[1]=rn.y,r[5]=an.y,r[9]=on.y,r[2]=rn.z,r[6]=an.z,r[10]=on.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],O=r[13],k=r[2],A=r[6],ee=r[10],j=r[14],te=r[3],M=r[7],ne=r[11],N=r[15];return i[0]=a*x+o*T+s*k+c*te,i[4]=a*S+o*E+s*A+c*M,i[8]=a*C+o*D+s*ee+c*ne,i[12]=a*w+o*O+s*j+c*N,i[1]=l*x+u*T+d*k+f*te,i[5]=l*S+u*E+d*A+f*M,i[9]=l*C+u*D+d*ee+f*ne,i[13]=l*w+u*O+d*j+f*N,i[2]=p*x+m*T+h*k+g*te,i[6]=p*S+m*E+h*A+g*M,i[10]=p*C+m*D+h*ee+g*ne,i[14]=p*w+m*O+h*j+g*N,i[3]=_*x+v*T+y*k+b*te,i[7]=_*S+v*E+y*A+b*M,i[11]=_*C+v*D+y*ee+b*ne,i[15]=_*w+v*O+y*j+b*N,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15],_=s*f-c*d,v=o*f-c*u,y=o*d-s*u,b=a*f-c*l,x=a*d-s*l,S=a*u-o*l;return t*(m*_-h*v+g*y)-n*(p*_-h*b+g*x)+r*(p*v-m*b+g*S)-i*(p*y-m*x+h*S)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[1],a=e[5],o=e[9],s=e[2],c=e[6],l=e[10];return t*(a*l-o*c)-n*(i*l-o*s)+r*(i*c-a*s)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=t*o-n*a,v=t*s-r*a,y=t*c-i*a,b=n*s-r*o,x=n*c-i*o,S=r*c-i*s,C=l*m-u*p,w=l*h-d*p,T=l*g-f*p,E=u*h-d*m,D=u*g-f*m,O=d*g-f*h,k=_*O-v*D+y*E+b*T-x*w+S*C;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/k;return e[0]=(o*O-s*D+c*E)*A,e[1]=(r*D-n*O-i*E)*A,e[2]=(m*S-h*x+g*b)*A,e[3]=(d*x-u*S-f*b)*A,e[4]=(s*T-a*O-c*w)*A,e[5]=(t*O-r*T+i*w)*A,e[6]=(h*y-p*S-g*v)*A,e[7]=(l*S-d*y+f*v)*A,e[8]=(a*D-o*T+c*C)*A,e[9]=(n*T-t*D-i*C)*A,e[10]=(p*x-m*y+g*_)*A,e[11]=(u*y-l*x-f*_)*A,e[12]=(o*w-a*E-s*C)*A,e[13]=(t*E-n*w+r*C)*A,e[14]=(m*v-p*b-h*_)*A,e[15]=(l*b-u*v+d*_)*A,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let i=this.determinantAffine();if(i===0)return n.set(1,1,1),t.identity(),this;let a=$t.set(r[0],r[1],r[2]).length(),o=$t.set(r[4],r[5],r[6]).length(),s=$t.set(r[8],r[9],r[10]).length();i<0&&(a=-a),en.copy(this);let c=1/a,l=1/o,u=1/s;return en.elements[0]*=c,en.elements[1]*=c,en.elements[2]*=c,en.elements[4]*=l,en.elements[5]*=l,en.elements[6]*=l,en.elements[8]*=u,en.elements[9]*=u,en.elements[10]*=u,t.setFromRotationMatrix(en),n.x=a,n.y=o,n.z=s,this}makePerspective(e,t,n,r,i,a,o=We,s=!1){let c=this.elements,l=2*i/(t-e),u=2*i/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),p,m;if(s)p=i/(a-i),m=a*i/(a-i);else if(o===2e3)p=-(a+i)/(a-i),m=-2*a*i/(a-i);else if(o===2001)p=-a/(a-i),m=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=We,s=!1){let c=this.elements,l=2/(t-e),u=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r),p,m;if(s)p=1/(a-i),m=a/(a-i);else if(o===2e3)p=-2/(a-i),m=-(a+i)/(a-i);else if(o===2001)p=-1/(a-i),m=-i/(a-i);else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},$t=new W,en=new Qt,tn=new W(0,0,0),nn=new W(1,1,1),rn=new W,an=new W,on=new W,sn=new Qt,cn=new kt,ln=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin(H(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-H(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(H(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-H(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(H(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-H(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:B(`Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return sn.makeRotationFromQuaternion(e),this.setFromRotationMatrix(sn,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return cn.setFromEuler(this),this.setFromQuaternion(cn,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};ln.DEFAULT_ORDER=`XYZ`;var un=class{constructor(){this.mask=1}set(e){this.mask=1<<e>>>0}enable(e){this.mask|=1<<e}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e}disable(e){this.mask&=~(1<<e)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&1<<e)}},dn=0,fn=new W,pn=new kt,mn=new Qt,hn=new W,gn=new W,_n=new W,vn=new kt,yn=new W(1,0,0),bn=new W(0,1,0),xn=new W(0,0,1),Sn={type:`added`},Cn={type:`removed`},wn={type:`childadded`,child:null},Tn={type:`childremoved`,child:null},En=class e extends tt{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:dn++}),this.uuid=ot(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new W,n=new ln,r=new kt,i=new W(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Qt},normalMatrix:{value:new G}}),this.matrix=new Qt,this.matrixWorld=new Qt,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new un,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return pn.setFromAxisAngle(e,t),this.quaternion.multiply(pn),this}rotateOnWorldAxis(e,t){return pn.setFromAxisAngle(e,t),this.quaternion.premultiply(pn),this}rotateX(e){return this.rotateOnAxis(yn,e)}rotateY(e){return this.rotateOnAxis(bn,e)}rotateZ(e){return this.rotateOnAxis(xn,e)}translateOnAxis(e,t){return fn.copy(e).applyQuaternion(this.quaternion),this.position.add(fn.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(yn,e)}translateY(e){return this.translateOnAxis(bn,e)}translateZ(e){return this.translateOnAxis(xn,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(mn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?hn.copy(e):hn.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),gn.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?mn.lookAt(gn,hn,this.up):mn.lookAt(hn,gn,this.up),this.quaternion.setFromRotationMatrix(mn),r&&(mn.extractRotation(r.matrixWorld),pn.setFromRotationMatrix(mn),this.quaternion.premultiply(pn.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(V(`Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Sn),wn.child=e,this.dispatchEvent(wn),wn.child=null):V(`Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Cn),Tn.child=e,this.dispatchEvent(Tn),Tn.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),mn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),mn.multiply(e.parent.matrixWorld)),e.applyMatrix4(mn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Sn),wn.child=e,this.dispatchEvent(wn),wn.child=null,this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(gn,e,_n),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(gn,vn,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,i=this.matrix.elements;i[12]+=t-i[0]*t-i[4]*n-i[8]*r,i[13]+=n-i[1]*t-i[5]*n-i[9]*r,i[14]+=r-i[2]*t-i[6]*n-i[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let e=this.children;for(let t=0,r=e.length;t<r;t++)e[t].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox?e.boundingBox.toJSON():void 0,boundingSphere:e.boundingSphere?e.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(e=>({...e})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0){if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material)}if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot===null?null:e.pivot.clone(),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}dispose(){this.dispatchEvent({type:`dispose`})}};En.DEFAULT_UP=new W(0,1,0),En.DEFAULT_MATRIX_AUTO_UPDATE=!0,En.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Dn=class extends En{constructor(){super(),this.isGroup=!0,this.type=`Group`}},On={type:`move`},kn=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Dn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Dn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new W,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new W),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Dn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new W,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new W,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(c&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(c,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.quaternion,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=c.joints[`index-finger-tip`],i=c.joints[`thumb-tip`],o=r.position.distanceTo(i.position);c.inputState.pinching&&o>.025?(c.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!c.inputState.pinching&&o<=.015&&(c.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(s.matrix.fromArray(i.transform.matrix),s.matrix.decompose(s.position,s.quaternion,s.scale),s.matrixWorldNeedsUpdate=!0,i.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(i.linearVelocity)):s.hasLinearVelocity=!1,i.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(i.angularVelocity)):s.hasAngularVelocity=!1,s.eventsEnabled&&s.dispatchEvent({type:`gripUpdated`,data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(On)))}return o!==null&&(o.visible=r!==null),s!==null&&(s.visible=i!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Dn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},An={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},jn={h:0,s:0,l:0},Mn={h:0,s:0,l:0};function Nn(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var K=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Re){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,It.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=It.workingColorSpace){return this.r=e,this.g=t,this.b=n,It.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=It.workingColorSpace){if(e=st(e,1),t=H(t,0,1),n=H(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=Nn(i,r,e+1/3),this.g=Nn(i,r,e),this.b=Nn(i,r,e-1/3)}return It.colorSpaceToWorking(this,r),this}setStyle(e,t=Re){function n(t){t!==void 0&&parseFloat(t)<1&&B(`Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseFloat(i[1]))/100,Math.min(100,parseFloat(i[2]))/100,Math.min(100,parseFloat(i[3]))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:B(`Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);B(`Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Re){let n=An[e.toLowerCase()];return n===void 0?B(`Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Lt(e.r),this.g=Lt(e.g),this.b=Lt(e.b),this}copyLinearToSRGB(e){return this.r=Rt(e.r),this.g=Rt(e.g),this.b=Rt(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Re){return It.workingToColorSpace(Pn.copy(this),e),Math.round(H(Pn.r*255,0,255))*65536+Math.round(H(Pn.g*255,0,255))*256+Math.round(H(Pn.b*255,0,255))}getHexString(e=Re){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=It.workingColorSpace){It.workingToColorSpace(Pn.copy(this),t);let n=Pn.r,r=Pn.g,i=Pn.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=It.workingColorSpace){return It.workingToColorSpace(Pn.copy(this),t),e.r=Pn.r,e.g=Pn.g,e.b=Pn.b,e}getStyle(e=Re){It.workingToColorSpace(Pn.copy(this),e);let t=Pn.r,n=Pn.g,r=Pn.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(jn),this.setHSL(jn.h+e,jn.s+t,jn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(jn),e.getHSL(Mn);let n=ut(jn.h,Mn.h,t),r=ut(jn.s,Mn.s,t),i=ut(jn.l,Mn.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Pn=new K;K.NAMES=An;var Fn=class e{constructor(e,t=25e-5){this.isFogExp2=!0,this.name=``,this.color=new K(e),this.density=t}clone(){return new e(this.color,this.density)}toJSON(){return{type:`FogExp2`,name:this.name,color:this.color.getHex(),density:this.density}}},In=class extends En{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ln,this.environmentIntensity=1,this.environmentRotation=new ln,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),this.background=e.background===null?null:e.background.clone(),this.environment=e.environment===null?null:e.environment.clone(),this.fog=e.fog===null?null:e.fog.clone(),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),this.overrideMaterial=e.overrideMaterial===null?null:e.overrideMaterial.clone(),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Ln=new W,Rn=new W,zn=new W,Bn=new W,Vn=new W,Hn=new W,Un=new W,Wn=new W,Gn=new W,Kn=new W,qn=new qt,Jn=new qt,Yn=new qt,Xn=class e{constructor(e=new W,t=new W,n=new W){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Ln.subVectors(e,t),r.cross(Ln);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){Ln.subVectors(r,t),Rn.subVectors(n,t),zn.subVectors(e,t);let a=Ln.dot(Ln),o=Ln.dot(Rn),s=Ln.dot(zn),c=Rn.dot(Rn),l=Rn.dot(zn),u=a*c-o*o;if(u===0)return i.set(0,0,0),null;let d=1/u,f=(c*s-o*l)*d,p=(a*l-o*s)*d;return i.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,Bn)!==null&&Bn.x>=0&&Bn.y>=0&&Bn.x+Bn.y<=1}static getInterpolation(e,t,n,r,i,a,o,s){return this.getBarycoord(e,t,n,r,Bn)===null?(s.x=0,s.y=0,`z`in s&&(s.z=0),`w`in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(i,Bn.x),s.addScaledVector(a,Bn.y),s.addScaledVector(o,Bn.z),s)}static getInterpolatedAttribute(e,t,n,r,i,a){return qn.setScalar(0),Jn.setScalar(0),Yn.setScalar(0),qn.fromBufferAttribute(e,t),Jn.fromBufferAttribute(e,n),Yn.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(qn,i.x),a.addScaledVector(Jn,i.y),a.addScaledVector(Yn,i.z),a}static isFrontFacing(e,t,n,r){return Ln.subVectors(n,t),Rn.subVectors(e,t),Ln.cross(Rn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Ln.subVectors(this.c,this.b),Rn.subVectors(this.a,this.b),Ln.cross(Rn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;Vn.subVectors(r,n),Hn.subVectors(i,n),Wn.subVectors(e,n);let s=Vn.dot(Wn),c=Hn.dot(Wn);if(s<=0&&c<=0)return t.copy(n);Gn.subVectors(e,r);let l=Vn.dot(Gn),u=Hn.dot(Gn);if(l>=0&&u<=l)return t.copy(r);let d=s*u-l*c;if(d<=0&&s>=0&&l<=0&&s-l>0)return a=s/(s-l),t.copy(n).addScaledVector(Vn,a);Kn.subVectors(e,i);let f=Vn.dot(Kn),p=Hn.dot(Kn);if(p>=0&&f<=p)return t.copy(i);let m=f*c-s*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(Hn,o);let h=l*p-f*u;if(h<=0&&u-l>=0&&f-p>=0)return Un.subVectors(i,r),o=(u-l)/(u-l+(f-p)),t.copy(r).addScaledVector(Un,o);let g=1/(h+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(Vn,a).addScaledVector(Hn,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Zn=class{constructor(e=new W(1/0,1/0,1/0),t=new W(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint($n.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint($n.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=$n.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0&&e.isBatchedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,$n):$n.fromBufferAttribute(r,t),$n.applyMatrix4(e.matrixWorld),this.expandByPoint($n);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),er.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),er.copy(e.boundingBox)),er.applyMatrix4(e.matrixWorld),this.union(er)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,$n),$n.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(sr),cr.subVectors(this.max,sr),tr.subVectors(e.a,sr),nr.subVectors(e.b,sr),rr.subVectors(e.c,sr),ir.subVectors(nr,tr),ar.subVectors(rr,nr),or.subVectors(tr,rr);let t=[0,-ir.z,ir.y,0,-ar.z,ar.y,0,-or.z,or.y,ir.z,0,-ir.x,ar.z,0,-ar.x,or.z,0,-or.x,-ir.y,ir.x,0,-ar.y,ar.x,0,-or.y,or.x,0];return!dr(t,tr,nr,rr,cr)||(t=[1,0,0,0,1,0,0,0,1],!dr(t,tr,nr,rr,cr))?!1:(lr.crossVectors(ir,ar),t=[lr.x,lr.y,lr.z],dr(t,tr,nr,rr,cr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,$n).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize($n).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||(Qn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Qn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Qn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Qn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Qn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Qn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Qn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Qn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Qn)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Qn=[new W,new W,new W,new W,new W,new W,new W,new W],$n=new W,er=new Zn,tr=new W,nr=new W,rr=new W,ir=new W,ar=new W,or=new W,sr=new W,cr=new W,lr=new W,ur=new W;function dr(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){ur.fromArray(e,a);let o=i.x*Math.abs(ur.x)+i.y*Math.abs(ur.y)+i.z*Math.abs(ur.z),s=t.dot(ur),c=n.dot(ur),l=r.dot(ur);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>o)return!1}return!0}var fr=new W,pr=new U,mr=0,hr=class extends tt{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:mr++}),this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=He,this.updateRanges=[],this.gpuType=h,this.version=0,this._normalizationScale=e===void 0?void 0:Tt(e)}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this._normalizationScale=e._normalizationScale,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)pr.fromBufferAttribute(this,t),pr.applyMatrix3(e),this.setXY(t,pr.x,pr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)fr.fromBufferAttribute(this,t),fr.applyMatrix3(e),this.setXYZ(t,fr.x,fr.y,fr.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)fr.fromBufferAttribute(this,t),fr.applyMatrix4(e),this.setXYZ(t,fr.x,fr.y,fr.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)fr.fromBufferAttribute(this,t),fr.applyNormalMatrix(e),this.setXYZ(t,fr.x,fr.y,fr.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)fr.fromBufferAttribute(this,t),fr.transformDirection(e),this.setXYZ(t,fr.x,fr.y,fr.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=this._denormalize(t)),t}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=this._denormalize(t)),t}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=this._denormalize(t)),t}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=this._denormalize(t)),t}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),r=this._normalize(r)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),r=this._normalize(r),i=this._normalize(i)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:`dispose`})}_denormalize(e){let t=this._normalizationScale;return t===void 0?Et(e,this.array):Math.max(e/t,-1)}_normalize(e){let t=this._normalizationScale;return t===void 0?Dt(e,this.array):Math.round(e*t)}},gr=class extends hr{constructor(e,t,n){super(new Uint16Array(e),t,n)}},_r=class extends hr{constructor(e,t,n){super(new Uint32Array(e),t,n)}},vr=class extends hr{constructor(e,t,n){super(new Float32Array(e),t,n)}},yr=new Zn,br=new W,xr=new W,Sr=class{constructor(e=new W,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?yr.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;br.subVectors(e,this.center);let t=br.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(br,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(xr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(br.copy(e.center).add(xr)),this.expandByPoint(br.copy(e.center).sub(xr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Cr=0,wr=new Qt,Tr=new En,Er=new W,Dr=new Zn,Or=new Zn,kr=new W,Ar=class e extends tt{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Cr++}),this.uuid=ot(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return this.index=Array.isArray(e)?new(Ge(e)?_r:gr)(e,1):e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new G().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return wr.makeRotationFromQuaternion(e),this.applyMatrix4(wr),this}rotateX(e){return wr.makeRotationX(e),this.applyMatrix4(wr),this}rotateY(e){return wr.makeRotationY(e),this.applyMatrix4(wr),this}rotateZ(e){return wr.makeRotationZ(e),this.applyMatrix4(wr),this}translate(e,t,n){return wr.makeTranslation(e,t,n),this.applyMatrix4(wr),this}scale(e,t,n){return wr.makeScale(e,t,n),this.applyMatrix4(wr),this}lookAt(e){return Tr.lookAt(e),Tr.updateMatrix(),this.applyMatrix4(Tr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Er).negate(),this.translate(Er.x,Er.y,Er.z),this}setFromPoints(e){let t=this.getAttribute(`position`);if(t===void 0){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}this.setAttribute(`position`,new vr(t,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let n=e[r];t.setXYZ(r,n.x,n.y,n.z||0)}e.length>t.count&&B(`BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Zn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)V(`BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`,this),this.boundingBox.set(new W(-1/0,-1/0,-1/0),new W(1/0,1/0,1/0));else{if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Dr.setFromBufferAttribute(n),this.morphTargetsRelative?(kr.addVectors(this.boundingBox.min,Dr.min),this.boundingBox.expandByPoint(kr),kr.addVectors(this.boundingBox.max,Dr.max),this.boundingBox.expandByPoint(kr)):(this.boundingBox.expandByPoint(Dr.min),this.boundingBox.expandByPoint(Dr.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&V(`BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Sr);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)V(`BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`,this),this.boundingSphere.set(new W,1/0);else if(e){let n=this.boundingSphere.center;if(Dr.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Or.setFromBufferAttribute(n),this.morphTargetsRelative?(kr.addVectors(Dr.min,Or.min),Dr.expandByPoint(kr),kr.addVectors(Dr.max,Or.max),Dr.expandByPoint(kr)):(Dr.expandByPoint(Or.min),Dr.expandByPoint(Or.max))}Dr.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)kr.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared(kr));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)kr.fromBufferAttribute(a,t),o&&(Er.fromBufferAttribute(e,t),kr.add(Er)),r=Math.max(r,n.distanceToSquared(kr))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&V(`BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){V(`BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=t.position,r=t.normal,i=t.uv,a=this.getAttribute(`tangent`);(a===void 0||a.count!==n.count)&&(a=new hr(new Float32Array(4*n.count),4),this.setAttribute(`tangent`,a));let o=[],s=[],c=new Uint8Array(n.count);for(let e=0;e<n.count;e++)o[e]=new W,s[e]=new W;let l=new W,u=new W,d=new W,f=new U,p=new U,m=new U,h=new W,g=new W;function _(e,t,r){c[e]=c[t]=c[r]=1,l.fromBufferAttribute(n,e),u.fromBufferAttribute(n,t),d.fromBufferAttribute(n,r),f.fromBufferAttribute(i,e),p.fromBufferAttribute(i,t),m.fromBufferAttribute(i,r),u.sub(l),d.sub(l),p.sub(f),m.sub(f);let a=1/(p.x*m.y-m.x*p.y);isFinite(a)&&(h.copy(u).multiplyScalar(m.y).addScaledVector(d,-p.y).multiplyScalar(a),g.copy(d).multiplyScalar(p.x).addScaledVector(u,-m.x).multiplyScalar(a),o[e].add(h),o[t].add(h),o[r].add(h),s[e].add(g),s[t].add(g),s[r].add(g))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let t=0,n=v.length;t<n;++t){let n=v[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)_(e.getX(t+0),e.getX(t+1),e.getX(t+2))}let y=new W,b=new W,x=new W,S=new W;function C(e){x.fromBufferAttribute(r,e),S.copy(x);let t=o[e];y.copy(t),y.sub(x.multiplyScalar(x.dot(t))).normalize(),b.crossVectors(S,t);let n=b.dot(s[e])<0?-1:1;a.setXYZW(e,y.x,y.y,y.z,n)}for(let e=0,t=n.count;e<t;++e)c[e]&&C(e);this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0||n.count!==t.count)n=new hr(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new W,i=new W,a=new W,o=new W,s=new W,c=new W,l=new W,u=new W;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)kr.fromBufferAttribute(e,t),kr.normalize(),e.setXYZ(t,kr.x,kr.y,kr.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,s=0;for(let i=0,c=t.length;i<c;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[s++]=n[o++]}return new hr(a,r,i)}if(this.index===null)return B(`BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=i[e],o=t(a,r);n.setAttribute(e,o)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=o[e],a=t(n,r);i.push(a)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.7,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?`BufferGeometry`:this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:`dispose`})}},jr=new W,Mr=new W,Nr=new G,Pr=class{constructor(e=new W(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=jr.subVectors(n,t).cross(Mr.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(jr),i=this.normal.dot(r);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/i;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Nr.getNormalMatrix(e),r=this.coplanarPoint(jr).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Fr=0,Ir=class extends tt{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Fr++}),this.uuid=ot(),this.name=``,this.type=`Material`,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new K(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ve,this.stencilZFail=Ve,this.stencilZPass=Ve,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){B(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];r===void 0?B(`Material: '${t}' is not a property of THREE.${this.type}.`):r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(e).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(e=>e.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new K().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.diffuseRoughness!==void 0&&(this.diffuseRoughness=e.diffuseRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum),e.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1]),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(e=>new Pr().fromJSON(e))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(this.vertexColors=typeof e.vertexColors==`number`?e.vertexColors>0:e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let t=e.normalScale;Array.isArray(t)===!1&&(t=[t,t]),this.normalScale=new U().fromArray(t)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new U().fromArray(e.clearcoatNormalScale)),e.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=t[e.diffuseRoughnessMap]||null),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}},Lr=new W,Rr=new W,zr=new W,Br=new W,Vr=class{constructor(e=new W,t=new W(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Lr)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Lr.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Lr.copy(this.origin).addScaledVector(this.direction,t),Lr.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Rr.copy(e).add(t).multiplyScalar(.5),zr.copy(t).sub(e).normalize(),Br.copy(this.origin).sub(Rr);let i=e.distanceTo(t)*.5,a=-this.direction.dot(zr),o=Br.dot(this.direction),s=-Br.dot(zr),c=Br.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0){if(u=a*s-o,d=a*o-s,p=i*l,u>=0){if(d>=-p){if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c)}else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(Rr).addScaledVector(zr,d),f}intersectSphere(e,t){if(e.radius<0)return null;Lr.subVectors(e.center,this.origin);let n=Lr.dot(this.direction),r=Lr.dot(Lr)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,Lr)!==null}intersectTriangle(e,t,n,r,i){let a=this.origin,o=this.direction,s=o.x,c=o.y,l=o.z,u=e.x-a.x,d=e.y-a.y,f=e.z-a.z,p=t.x-a.x,m=t.y-a.y,h=t.z-a.z,g=n.x-a.x,_=n.y-a.y,v=n.z-a.z,y=Math.abs(s),b=Math.abs(c),x=Math.abs(l),S,C,w,T,E,D,O,k,A,ee,j,te;if(y>=b&&y>=x?(w=s,D=u,A=p,te=g,s>=0?(S=c,C=l,T=d,E=f,O=m,k=h,ee=_,j=v):(S=l,C=c,T=f,E=d,O=h,k=m,ee=v,j=_)):b>=x?(w=c,D=d,A=m,te=_,c>=0?(S=l,C=s,T=f,E=u,O=h,k=p,ee=v,j=g):(S=s,C=l,T=u,E=f,O=p,k=h,ee=g,j=v)):(w=l,D=f,A=h,te=v,l>=0?(S=s,C=c,T=u,E=d,O=p,k=m,ee=g,j=_):(S=c,C=s,T=d,E=u,O=m,k=p,ee=_,j=g)),w===0)return null;let M=S/w,ne=C/w,N=1/w,re=T-M*D,P=E-ne*D,ie=O-M*A,ae=k-ne*A,oe=ee-M*te,se=j-ne*te,ce=oe*ae-se*ie,F=re*se-P*oe,le=ie*P-ae*re;if(r){if(ce<0||F<0||le<0)return null}else if((ce<0||F<0||le<0)&&(ce>0||F>0||le>0))return null;let ue=ce+F+le;if(ue===0)return null;let de=N*(ce*D+F*A+le*te);return(ue>0?de<0:de>0)?null:this.at(de/ue,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Hr=class extends Ir{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type=`MeshBasicMaterial`,this.color=new K(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ln,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Ur=new Qt,Wr=new Vr,Gr=new Sr,Kr=new W,qr=new W,Jr=new W,Yr=new W,Xr=new W,Zr=new W,Qr=new W,$r=new W,q=class extends En{constructor(e=new Ar,t=new Hr){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.morphTargetInfluences=e.morphTargetInfluences===void 0?void 0:e.morphTargetInfluences.slice(),this.morphTargetDictionary=e.morphTargetDictionary===void 0?void 0:Object.assign({},e.morphTargetDictionary),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){Zr.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],s=i[n];r!==0&&(Xr.fromBufferAttribute(s,e),a?Zr.addScaledVector(Xr,r):Zr.addScaledVector(Xr.sub(t),r))}t.add(Zr)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Gr.copy(n.boundingSphere),Gr.applyMatrix4(i),Wr.copy(e.ray).recast(e.near),Gr.containsPoint(Wr.origin)===!1&&(Wr.intersectSphere(Gr,Kr)===null||Wr.origin.distanceToSquared(Kr)>(e.far-e.near)**2)||(Ur.copy(i).invert(),Wr.copy(e.ray).applyMatrix4(Ur),(n.boundingBox===null||Wr.intersectsBox(n.boundingBox)!==!1)&&this._computeIntersections(e,t,Wr)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,s=i.attributes.position,c=i.attributes.uv,l=i.attributes.uv1,u=i.attributes.normal,d=i.groups,f=i.drawRange;if(o!==null){if(Array.isArray(a))for(let i=0,s=d.length;i<s;i++){let s=d[i],p=a[s.materialIndex],m=Math.max(s.start,f.start),h=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=o.getX(i),d=o.getX(i+1),f=o.getX(i+2);r=ti(this,p,e,n,c,l,u,a,d,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=s.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),s=Math.min(o.count,f.start+f.count);for(let d=i,f=s;d<f;d+=3){let i=o.getX(d),s=o.getX(d+1),f=o.getX(d+2);r=ti(this,a,e,n,c,l,u,i,s,f),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}}else if(s!==void 0){if(Array.isArray(a))for(let i=0,o=d.length;i<o;i++){let o=d[i],p=a[o.materialIndex],m=Math.max(o.start,f.start),h=Math.min(s.count,Math.min(o.start+o.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=i,s=i+1,d=i+2;r=ti(this,p,e,n,c,l,u,a,s,d),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),o=Math.min(s.count,f.start+f.count);for(let s=i,d=o;s<d;s+=3){let i=s,o=s+1,d=s+2;r=ti(this,a,e,n,c,l,u,i,o,d),r&&(r.faceIndex=Math.floor(s/3),t.push(r))}}}}};function ei(e,t,n,r,i,a,o,s){let c;if(c=t.side===1?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,t.side===0,s),c===null)return null;$r.copy(s),$r.applyMatrix4(e.matrixWorld);let l=n.ray.origin.distanceTo($r);return l<n.near||l>n.far?null:{distance:l,point:$r.clone(),object:e}}function ti(e,t,n,r,i,a,o,s,c,l){e.getVertexPosition(s,qr),e.getVertexPosition(c,Jr),e.getVertexPosition(l,Yr);let u=ei(e,t,n,r,qr,Jr,Yr,Qr);if(u){let e=new W;Xn.getBarycoord(Qr,qr,Jr,Yr,e),i&&(u.uv=Xn.getInterpolatedAttribute(i,s,c,l,e,new U)),a&&(u.uv1=Xn.getInterpolatedAttribute(a,s,c,l,e,new U)),o&&(u.normal=Xn.getInterpolatedAttribute(o,s,c,l,e,new W),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let t={a:s,b:c,c:l,normal:new W,materialIndex:0};Xn.getNormal(qr,Jr,Yr,t.normal),u.face=t,u.barycoord=e}return u}var ni=class extends Kt{constructor(e=null,t=1,n=1,i,a,o,s,c,l=r,u=r,d,f){super(null,o,s,c,l,u,i,a,d,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},ri=class extends hr{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},ii=new Qt,ai=new Qt,oi=[],si=new Zn,ci=new Qt,li=new q,ui=new Sr,di=class extends q{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new ri(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let e=0;e<n;e++)this.setMatrixAt(e,ci)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Zn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ii),si.copy(e.boundingBox).applyMatrix4(ii),this.boundingBox.union(si)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Sr),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ii),ui.copy(e.boundingSphere).applyMatrix4(ii),this.boundingSphere.union(ui)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),this.morphTexture=e.morphTexture===null?null:e.morphTexture.clone(),this.instanceColor=e.instanceColor===null?null:e.instanceColor.clone(),this.count=e.count,this.boundingBox=e.boundingBox===null?null:e.boundingBox.clone(),this.boundingSphere=e.boundingSphere===null?null:e.boundingSphere.clone(),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,i=e*(n.length+1)+1;for(let e=0;e<n.length;e++)n[e]=r[i+e]}raycast(e,t){let n=this.matrixWorld,r=this.count;if(li.geometry=this.geometry,li.material=this.material,li.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ui.copy(this.boundingSphere),ui.applyMatrix4(n),e.ray.intersectsSphere(ui)!==!1))for(let i=0;i<r;i++){this.getMatrixAt(i,ii),ai.multiplyMatrices(n,ii),li.matrixWorld=ai,li.raycast(e,oi);for(let e=0,n=oi.length;e<n;e++){let n=oi[e];n.instanceId=i,n.object=this,t.push(n)}oi.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new ri(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new ni(new Float32Array(r*this.count),r,this.count,D,h));let i=this.morphTexture.source.data.data,a=0;for(let e=0;e<n.length;e++)a+=n[e];let o=this.geometry.morphTargetsRelative?1:1-a,s=r*e;return i[s]=o,i.set(n,s+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.instanceMatrix.dispose(),this.instanceColor!==null&&this.instanceColor.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},fi=new Sr,pi=new U(.5,.5),mi=new W,hi=class{constructor(e=new Pr,t=new Pr,n=new Pr,r=new Pr,i=new Pr,a=new Pr){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=We,n=!1){let r=this.planes,i=e.elements,a=i[0],o=i[1],s=i[2],c=i[3],l=i[4],u=i[5],d=i[6],f=i[7],p=i[8],m=i[9],h=i[10],g=i[11],_=i[12],v=i[13],y=i[14],b=i[15];if(r[0].setComponents(c-a,f-l,g-p,b-_).normalize(),r[1].setComponents(c+a,f+l,g+p,b+_).normalize(),r[2].setComponents(c+o,f+u,g+m,b+v).normalize(),r[3].setComponents(c-o,f-u,g-m,b-v).normalize(),n)r[4].setComponents(s,d,h,y).normalize(),r[5].setComponents(c-s,f-d,g-h,b-y).normalize();else if(r[4].setComponents(c-s,f-d,g-h,b-y).normalize(),t===2e3)r[5].setComponents(c+s,f+d,g+h,b+y).normalize();else if(t===2001)r[5].setComponents(s,d,h,y).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),fi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),fi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(fi)}intersectsSprite(e){return fi.center.set(0,0,0),fi.radius=.7071067811865476+pi.distanceTo(e.center),fi.applyMatrix4(e.matrixWorld),this.intersectsSphere(fi)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(mi.x=r.normal.x>0?e.max.x:e.min.x,mi.y=r.normal.y>0?e.max.y:e.min.y,mi.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(mi)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},gi=new Qt,_i=class e{constructor(){this.coordinateSystem=We,this._frustums=[],this._count=0}setFromArrayCamera(e){let t=e.cameras,n=this._frustums;for(let e=0;e<t.length;e++){let r=t[e];gi.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[e]===void 0&&(n[e]=new hi),n[e].setFromProjectionMatrix(gi,r.coordinateSystem,r.reversedDepth)}return this._count=t.length,this}getFrustum(e){return this._frustums[e]}intersectsObject(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsObject(e))return!0;return!1}intersectsSprite(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSprite(e))return!0;return!1}intersectsSphere(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSphere(e))return!0;return!1}intersectsBox(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsBox(e))return!0;return!1}containsPoint(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;let t=this._frustums,n=e._frustums;for(let r=0;r<e._count;r++)t[r]===void 0&&(t[r]=new hi),t[r].copy(n[r]);return this._count=e._count,this}clone(){return new e().copy(this)}},vi=class extends Ir{constructor(e){super(),this.isPointsMaterial=!0,this.type=`PointsMaterial`,this.color=new K(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},yi=new Qt,bi=new Vr,xi=new Sr,Si=new W,Ci=class extends En{constructor(e=new Ar,t=new vi){super(),this.isPoints=!0,this.type=`Points`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.morphTargetInfluences=e.morphTargetInfluences===void 0?void 0:e.morphTargetInfluences.slice(),this.morphTargetDictionary=e.morphTargetDictionary===void 0?void 0:Object.assign({},e.morphTargetDictionary),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),xi.copy(n.boundingSphere),xi.applyMatrix4(r),xi.radius+=i,e.ray.intersectsSphere(xi)===!1)return;yi.copy(r).invert(),bi.copy(e.ray).applyMatrix4(yi);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=n.index,l=n.attributes.position;if(c!==null){let n=Math.max(0,a.start),i=Math.min(c.count,a.start+a.count);for(let a=n,o=i;a<o;a++){let n=c.getX(a);Si.fromBufferAttribute(l,n),wi(Si,n,s,r,e,t,this)}}else{let n=Math.max(0,a.start),i=Math.min(l.count,a.start+a.count);for(let a=n,o=i;a<o;a++)Si.fromBufferAttribute(l,a),wi(Si,a,s,r,e,t,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function wi(e,t,n,r,i,a,o){let s=bi.distanceSqToPoint(e);if(s<n){let n=new W;bi.closestPointToPoint(e,n),n.applyMatrix4(r);let c=i.ray.origin.distanceTo(n);if(c<i.near||c>i.far)return;a.push({distance:c,distanceToRay:Math.sqrt(s),point:n,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var Ti=class extends Kt{constructor(e=[],t=301,n,r,i,a,o,s,c,l){super(e,t,n,r,i,a,o,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Ei=class extends Kt{constructor(e,t,n,r,i,a,o,s,c){super(e,t,n,r,i,a,o,s,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},Di=class extends Kt{constructor(e,t,n=m,i,a,o,s=r,c=r,l,u=T,d=1){if(u!==1026&&u!==1027)throw Error(`THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);super({width:e,height:t,depth:d},i,a,o,s,c,u,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Ht(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Oi=class extends Di{constructor(e,t=m,n=301,i,a,o=r,s=r,c,l=T){let u={width:e,height:e,depth:1},d=[u,u,u,u,u,u];super(e,e,t,n,i,a,o,s,c,l),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},ki=class extends Kt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Ai=class e extends Ar{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let s=[],c=[],l=[],u=[],d=0,f=0;p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(s),this.setAttribute(`position`,new vr(c,3)),this.setAttribute(`normal`,new vr(l,3)),this.setAttribute(`uv`,new vr(u,2));function p(e,t,n,r,i,a,p,m,h,g,_){let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,T=0,E=0,D=new W;for(let a=0;a<w;a++){let o=a*y-x;for(let s=0;s<C;s++)D[e]=(s*v-b)*r,D[t]=o*i,D[n]=S,c.push(D.x,D.y,D.z),D[e]=0,D[t]=0,D[n]=m>0?1:-1,l.push(D.x,D.y,D.z),u.push(s/h),u.push(1-a/g),T+=1}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d+t+C*e,r=d+t+C*(e+1),i=d+(t+1)+C*(e+1),a=d+(t+1)+C*e;s.push(n,r,a),s.push(r,i,a),E+=6}o.addGroup(f,E,_),f+=E,d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},ji=class e extends Ar{constructor(e=1,t=1,n=1,r=32,i=1,a=!1,o=0,s=Math.PI*2){super(),this.type=`CylinderGeometry`,this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:i,openEnded:a,thetaStart:o,thetaLength:s};let c=this;r=Math.floor(r),i=Math.floor(i);let l=[],u=[],d=[],f=[],p=0,m=[],h=n/2,g=0;_(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(l),this.setAttribute(`position`,new vr(u,3)),this.setAttribute(`normal`,new vr(d,3)),this.setAttribute(`uv`,new vr(f,2));function _(){let a=new W,_=new W,v=0,y=(t-e)/n;for(let c=0;c<=i;c++){let l=[],g=c/i,v=g*(t-e)+e;for(let e=0;e<=r;e++){let t=e/r,i=t*s+o,c=Math.sin(i),m=Math.cos(i);_.x=v*c,_.y=-g*n+h,_.z=v*m,u.push(_.x,_.y,_.z),a.set(c,y,m).normalize(),d.push(a.x,a.y,a.z),f.push(t,1-g),l.push(p++)}m.push(l)}for(let n=0;n<r;n++)for(let r=0;r<i;r++){let a=m[r][n],o=m[r+1][n],s=m[r+1][n+1],c=m[r][n+1];(e>0||r!==0)&&(l.push(a,o,c),v+=3),(t>0||r!==i-1)&&(l.push(o,s,c),v+=3)}c.addGroup(g,v,0),g+=v}function v(n){let i=p,a=new U,m=new W,_=0,v=n===!0?e:t,y=n===!0?1:-1;for(let e=1;e<=r;e++)u.push(0,h*y,0),d.push(0,y,0),f.push(.5,.5),p++;let b=p;for(let e=0;e<=r;e++){let t=e/r*s+o,n=Math.cos(t),i=Math.sin(t);m.x=v*i,m.y=h*y,m.z=v*n,u.push(m.x,m.y,m.z),d.push(0,y,0),a.x=n*.5+.5,a.y=i*.5*y+.5,f.push(a.x,a.y),p++}for(let e=0;e<r;e++){let t=i+e,r=b+e;n===!0?l.push(r,r+1,t):l.push(r+1,r,t),_+=3}c.addGroup(g,_,n===!0?1:2),g+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Mi=class e extends Ar{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}this.setIndex(f),this.setAttribute(`position`,new vr(p,3)),this.setAttribute(`normal`,new vr(m,3)),this.setAttribute(`uv`,new vr(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}},Ni=class e extends Ar{constructor(e=.5,t=1,n=32,r=1,i=0,a=Math.PI*2){super(),this.type=`RingGeometry`,this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:i,thetaLength:a},n=Math.max(3,n),r=Math.max(1,r);let o=[],s=[],c=[],l=[],u=e,d=(t-e)/r,f=new W,p=new U;for(let e=0;e<=r;e++){for(let e=0;e<=n;e++){let r=i+e/n*a;f.x=u*Math.cos(r),f.y=u*Math.sin(r),s.push(f.x,f.y,f.z),c.push(0,0,1),p.x=(f.x/t+1)/2,p.y=(f.y/t+1)/2,l.push(p.x,p.y)}u+=d}for(let e=0;e<r;e++){let t=e*(n+1);for(let e=0;e<n;e++){let r=e+t,i=r,a=r+n+1,s=r+n+2,c=r+1;o.push(i,a,c),o.push(a,s,c)}}this.setIndex(o),this.setAttribute(`position`,new vr(s,3)),this.setAttribute(`normal`,new vr(c,3)),this.setAttribute(`uv`,new vr(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}},Pi=class e extends Ar{constructor(e=1,t=32,n=16,r=0,i=Math.PI*2,a=0,o=Math.PI){super(),this.type=`SphereGeometry`,this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:i,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let s=Math.min(a+o,Math.PI),c=0,l=[],u=new W,d=new W,f=[],p=[],m=[],h=[];for(let f=0;f<=n;f++){let g=[],_=f/n,v=a+_*o,y=e*Math.cos(v),b=Math.sqrt(e*e-y*y),x=0;f===0&&a===0?x=.5/t:f===n&&s===Math.PI&&(x=-.5/t);for(let e=0;e<=t;e++){let n=e/t,a=r+n*i;u.x=-b*Math.cos(a),u.y=y,u.z=b*Math.sin(a),p.push(u.x,u.y,u.z),d.copy(u).normalize(),m.push(d.x,d.y,d.z),h.push(n+x,1-_),g.push(c++)}l.push(g)}for(let e=0;e<n;e++)for(let r=0;r<t;r++){let t=l[e][r+1],i=l[e][r],o=l[e+1][r],c=l[e+1][r+1];(e!==0||a>0)&&f.push(t,i,c),(e!==n-1||s<Math.PI)&&f.push(i,o,c)}this.setIndex(f),this.setAttribute(`position`,new vr(p,3)),this.setAttribute(`normal`,new vr(m,3)),this.setAttribute(`uv`,new vr(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}},Fi=class e extends Ar{constructor(e=1,t=.4,n=12,r=48,i=Math.PI*2,a=0,o=Math.PI*2){super(),this.type=`TorusGeometry`,this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:i,thetaStart:a,thetaLength:o},n=Math.floor(n),r=Math.floor(r);let s=[],c=[],l=[],u=[],d=new W,f=new W,p=new W;for(let s=0;s<=n;s++){let m=a+s/n*o;for(let a=0;a<=r;a++){let o=a/r*i;f.x=(e+t*Math.cos(m))*Math.cos(o),f.y=(e+t*Math.cos(m))*Math.sin(o),f.z=t*Math.sin(m),c.push(f.x,f.y,f.z),d.x=e*Math.cos(o),d.y=e*Math.sin(o),p.subVectors(f,d).normalize(),l.push(p.x,p.y,p.z),u.push(a/r),u.push(s/n)}}for(let e=1;e<=n;e++)for(let t=1;t<=r;t++){let n=(r+1)*e+t-1,i=(r+1)*(e-1)+t-1,a=(r+1)*(e-1)+t,o=(r+1)*e+t;s.push(n,i,o),s.push(i,a,o)}this.setIndex(s),this.setAttribute(`position`,new vr(c,3)),this.setAttribute(`normal`,new vr(l,3)),this.setAttribute(`uv`,new vr(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}};function Ii(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];if(Ri(i))i.isRenderTargetTexture?(B(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone();else if(Array.isArray(i)){if(Ri(i[0])){let e=[];for(let t=0,n=i.length;t<n;t++)e[t]=i[t].clone();t[n][r]=e}else t[n][r]=i.slice()}else t[n][r]=i}}return t}function Li(e){let t={};for(let n=0;n<e.length;n++){let r=Ii(e[n]);for(let e in r)t[e]=r[e]}return t}function Ri(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function zi(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function Bi(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:It.workingColorSpace}var Vi={clone:Ii,merge:Li},Hi=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Ui=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Wi=class extends Ir{constructor(e){super(),this.isShaderMaterial=!0,this.type=`ShaderMaterial`,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Hi,this.fragmentShader=Ui,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ii(e.uniforms),this.uniformsGroups=zi(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case`t`:this.uniforms[n].value=t[r.value]||null;break;case`c`:this.uniforms[n].value=new K().setHex(r.value);break;case`v2`:this.uniforms[n].value=new U().fromArray(r.value);break;case`v3`:this.uniforms[n].value=new W().fromArray(r.value);break;case`v4`:this.uniforms[n].value=new qt().fromArray(r.value);break;case`m3`:this.uniforms[n].value=new G().fromArray(r.value);break;case`m4`:this.uniforms[n].value=new Qt().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let t in e.extensions)this.extensions[t]=e.extensions[t];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Gi=class extends Wi{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type=`RawShaderMaterial`}},Ki=class extends Ir{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type=`MeshStandardMaterial`,this.defines={STANDARD:``},this.color=new K(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new K(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new U(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ln,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:``},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},qi=class extends Ki{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:``,PHYSICAL:``},this.type=`MeshPhysicalMaterial`,this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new U(1,1),this.clearcoatNormalMap=null,this.diffuseRoughnessMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return H(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessMinimum=100,this.iridescenceThicknessMaximum=400,this.iridescenceThicknessMap=null,this.sheenColor=new K(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new K(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new K(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._diffuseRoughness=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get diffuseRoughness(){return this._diffuseRoughness}set diffuseRoughness(e){this._diffuseRoughness>0!=e>0&&this.version++,this._diffuseRoughness=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(e){this._retroreflectivity>0!=e>0&&this.version++,this._retroreflectivity=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}get iridescenceThicknessRange(){return Qe(`MeshPhysicalMaterial: The "iridescenceThicknessRange" property has been replaced by "iridescenceThicknessMinimum" and "iridescenceThicknessMaximum".`),[this.iridescenceThicknessMinimum,this.iridescenceThicknessMaximum]}set iridescenceThicknessRange(e){Qe(`MeshPhysicalMaterial: The "iridescenceThicknessRange" property has been replaced by "iridescenceThicknessMinimum" and "iridescenceThicknessMaximum".`),this.iridescenceThicknessMinimum=e[0],this.iridescenceThicknessMaximum=e[1]}copy(e){return super.copy(e),this.defines={STANDARD:``,PHYSICAL:``},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.diffuseRoughness=e.diffuseRoughness,this.diffuseRoughnessMap=e.diffuseRoughnessMap,this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum,this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum,this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.retroreflectivity=e.retroreflectivity,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}},Ji=class extends Ir{constructor(e){super(),this.isMeshNormalMaterial=!0,this.type=`MeshNormalMaterial`,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new U(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this}},Yi=class extends Ir{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type=`MeshDepthMaterial`,this.depthPacking=Le,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Xi=class extends Ir{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type=`MeshDistanceMaterial`,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Zi(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}function Qi(e){return e!==void 0&&e.inTangents!==void 0&&e.outTangents!==void 0}var $i=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`THREE.Interpolant: Call to abstract method.`)}intervalChanged_(){}},ea=class extends $i{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Fe,endingEnd:Fe}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case Ie:i=e,o=2*t-n;break;case L:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case Ie:a=e,s=2*n-t;break;case L:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},ta=class extends $i{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},na=class extends $i{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},ra=class extends $i{interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this.inTangents,u=this.outTangents;if(!l||!u){let e=(n-t)/(r-t),l=1-e;for(let t=0;t!==o;++t)i[t]=a[c+t]*l+a[s+t]*e;return i}let d=o*2,f=e-1;for(let p=0;p!==o;++p){let o=a[c+p],m=a[s+p],h=f*d+p*2,g=u[h],_=u[h+1],v=e*d+p*2,y=l[v],b=l[v+1],x=oa(n,t,g,y,r);i[p]=ia(x,o,_,b,m)}return i}};function ia(e,t,n,r,i){let a=1-e;return a*a*a*t+3*a*a*e*n+3*a*e*e*r+e*e*e*i}function aa(e,t,n,r,i){let a=1-e;return 3*a*a*(n-t)+6*a*e*(r-n)+3*e*e*(i-r)}function oa(e,t,n,r,i){let a=(e-t)/(i-t);for(let o=0;o<8;o++){let o=ia(a,t,n,r,i)-e;if(Math.abs(o)<1e-10)break;let s=aa(a,t,n,r,i);if(Math.abs(s)<1e-10)break;a=Math.max(0,Math.min(1,a-o/s))}return a}var sa=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=Zi(t,this.TimeBufferType),this.values=Zi(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Zi(e.times,Array),values:Zi(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t),Qi(e.settings)&&(n.settings={inTangents:Zi(e.settings.inTangents,Array),outTangents:Zi(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new na(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new ta(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new ea(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new ra(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Me:t=this.InterpolantFactoryMethodDiscrete;break;case Ne:t=this.InterpolantFactoryMethodLinear;break;case I:t=this.InterpolantFactoryMethodSmooth;break;case Pe:t=this.InterpolantFactoryMethodBezier}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0){if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t)}return B(`KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Me;case this.InterpolantFactoryMethodLinear:return Ne;case this.InterpolantFactoryMethodSmooth:return I;case this.InterpolantFactoryMethodBezier:return Pe}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e;Qi(this.settings)&&(ca(this.settings.inTangents,e),ca(this.settings.outTangents,e))}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e;Qi(this.settings)&&(la(this.settings.inTangents,e),la(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(V(`KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(V(`KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){V(`KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){V(`KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&Ke(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){V(`KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===I,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0])){if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,Qi(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}};function ca(e,t){for(let n=0,r=e.length;n!==r;n+=2)e[n]+=t}function la(e,t){for(let n=0,r=e.length;n!==r;n+=2)e[n]*=t}sa.prototype.ValueTypeName=``,sa.prototype.TimeBufferType=Float32Array,sa.prototype.ValueBufferType=Float32Array,sa.prototype.DefaultInterpolation=Ne;var ua=class extends sa{constructor(e,t,n){super(e,t,n)}};ua.prototype.ValueTypeName=`bool`,ua.prototype.ValueBufferType=Array,ua.prototype.DefaultInterpolation=Me,ua.prototype.InterpolantFactoryMethodLinear=void 0,ua.prototype.InterpolantFactoryMethodSmooth=void 0;var da=class extends sa{constructor(e,t,n,r){super(e,t,n,r)}};da.prototype.ValueTypeName=`color`;var fa=class extends sa{constructor(e,t,n,r){super(e,t,n,r)}};fa.prototype.ValueTypeName=`number`;var pa=class extends $i{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)kt.slerpFlat(i,0,a,c-o,a,c,s);return i}},ma=class extends sa{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new pa(this.times,this.values,this.getValueSize(),e)}};ma.prototype.ValueTypeName=`quaternion`,ma.prototype.InterpolantFactoryMethodSmooth=void 0;var ha=class extends sa{constructor(e,t,n){super(e,t,n)}};ha.prototype.ValueTypeName=`string`,ha.prototype.ValueBufferType=Array,ha.prototype.DefaultInterpolation=Me,ha.prototype.InterpolantFactoryMethodLinear=void 0,ha.prototype.InterpolantFactoryMethodSmooth=void 0;var ga=class extends sa{constructor(e,t,n,r){super(e,t,n,r)}};ga.prototype.ValueTypeName=`vector`;var _a=class extends En{static registerNode(e){this.prototype._lightNode=e}constructor(e,t=1){super(),this.isLight=!0,this.type=`Light`,this.color=new K(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},va=class extends _a{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type=`HemisphereLight`,this.position.copy(En.DEFAULT_UP),this.updateMatrix(),this.groundColor=new K(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},ya=new Qt,ba=new W,xa=new W,Sa=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new U(512,512),this.mapType=l,this.map=null,this.mapPass=null,this.matrix=new Qt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new hi,this._frameExtents=new U(1,1),this._viewportCount=1,this._viewports=[new qt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;ba.setFromMatrixPosition(e.matrixWorld),t.position.copy(ba),xa.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(xa),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,r){ya.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(ya,e.coordinateSystem,e.reversedDepth);let i=this._frameExtents,a=r?r.z/i.x:1,o=r?r.w/i.y:1,s=r?r.x/i.x:0,c=r?r.y/i.y:0;e.coordinateSystem===2001||e.reversedDepth?t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(ya)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.mapType=e.mapType,this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.mapType=this.mapType,e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Ca=new W,wa=new kt,Ta=new W,Ea=class extends En{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new Qt,this.projectionMatrix=new Qt,this.projectionMatrixInverse=new Qt,this.coordinateSystem=We,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Ca,wa,Ta),Ta.x===1&&Ta.y===1&&Ta.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ca,wa,Ta.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Ca,wa,Ta),Ta.x===1&&Ta.y===1&&Ta.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ca,wa,Ta.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Da=new W,Oa=new U,ka=new U,Aa=class extends Ea{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=at*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(it*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return at*2*Math.atan(Math.tan(it*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Da.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Da.x,Da.y).multiplyScalar(-e/Da.z),Da.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Da.x,Da.y).multiplyScalar(-e/Da.z)}getViewSize(e,t){return this.getViewBounds(e,Oa,ka),t.subVectors(ka,Oa)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(it*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},ja=class extends Ea{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,s=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Ma=class extends Sa{constructor(){super(new ja(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Na=class extends _a{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type=`DirectionalLight`,this.position.copy(En.DEFAULT_UP),this.updateMatrix(),this.target=new En,this.shadow=new Ma}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},Pa=class extends Ar{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type=`InstancedBufferGeometry`,this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){let e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}},Fa=-90,Ia=1,La=class extends En{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new Aa(Fa,Ia,e,t);r.layers=this.layers,this.add(r);let i=new Aa(Fa,Ia,e,t);i.layers=this.layers,this.add(i);let a=new Aa(Fa,Ia,e,t);a.layers=this.layers,this.add(a);let o=new Aa(Fa,Ia,e,t);o.layers=this.layers,this.add(o);let s=new Aa(Fa,Ia,e,t);s.layers=this.layers,this.add(s);let c=new Aa(Fa,Ia,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,s]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,s,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let h=!1;h=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,i),e.setRenderTarget(n,1,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,4,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.mipmapsAutoUpdate=m,e.setRenderTarget(n,5,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},Ra=class extends Aa{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e,this.perCameraFrustumCulled=!1}},za=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=Ba.bind(this),e.addEventListener(`visibilitychange`,this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener(`visibilitychange`,this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e===void 0?performance.now():e)-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function Ba(){this._document.hidden===!1&&this.reset()}var Va=`\\[\\]\\.:\\/`,Ha=RegExp(`[\\[\\]\\.:\\/]`,`g`),Ua=`[^\\[\\]\\.:\\/]`,Wa=`[^`+Va.replace(`\\.`,``)+`]`,Ga=`((?:WC+[\\/:])*)`.replace(`WC`,Ua),Ka=`(WCOD+)?`.replace(`WCOD`,Wa),qa=`(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,Ua),Ja=`\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,Ua),Ya=RegExp(`^`+Ga+Ka+qa+Ja+`$`),Xa=[`material`,`materials`,`bones`,`map`],Za=class{constructor(e,t,n){let r=n||Qa.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Qa=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace(Ha,``)}static parseTrackName(e){let t=Ya.exec(e);if(t===null)throw Error(`THREE.PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);Xa.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`THREE.PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){B(`PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){V(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){V(`PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){V(`PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){V(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){V(`PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){V(`PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){V(`PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;V(`PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?s=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(s=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){V(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){V(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Qa.Composite=Za,Qa.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},Qa.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},Qa.prototype.GetterByBindingType=[Qa.prototype._getValue_direct,Qa.prototype._getValue_array,Qa.prototype._getValue_arrayElement,Qa.prototype._getValue_toArray],Qa.prototype.SetterByBindingTypeAndVersioning=[[Qa.prototype._setValue_direct,Qa.prototype._setValue_direct_setNeedsUpdate,Qa.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Qa.prototype._setValue_array,Qa.prototype._setValue_array_setNeedsUpdate,Qa.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Qa.prototype._setValue_arrayElement,Qa.prototype._setValue_arrayElement_setNeedsUpdate,Qa.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Qa.prototype._setValue_fromArray,Qa.prototype._setValue_fromArray_setNeedsUpdate,Qa.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var $a=new Qt,eo=class{constructor(e,t,n=0,r=1/0){this.ray=new Vr(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new un,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):V(`Raycaster: Unsupported camera type: `+t.type)}setFromXRController(e){return $a.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4($a),this}intersectObject(e,t=!0,n=[]){return no(e,this,n,t),n.sort(to),n}intersectObjects(e,t=!0,n=[]){for(let r=0,i=e.length;r<i;r++)no(e[r],this,n,t);return n.sort(to),n}};function to(e,t){return e.distance-t.distance}function no(e,t,n,r){let i=!0;if(e.layers.test(t.layers)&&e.raycast(t,n)===!1&&(i=!1),i===!0&&r===!0){let r=e.children;for(let e=0,i=r.length;e<i;e++)no(r[e],t,n,!0)}}(class{static{this.prototype.isMatrix2=!0}constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let i=this.elements;return i[0]=e,i[2]=t,i[1]=n,i[3]=r,this}});function ro(e,t,n,r){let i=io(r);switch(n){case S:return e*t;case D:return e*t/i.components*i.byteLength;case O:return e*t/i.components*i.byteLength;case k:return e*t*2/i.components*i.byteLength;case A:return e*t*2/i.components*i.byteLength;case C:return e*t*3/i.components*i.byteLength;case w:return e*t*4/i.components*i.byteLength;case ee:return e*t*4/i.components*i.byteLength;case j:case te:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case M:case ne:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case re:case ie:return Math.max(e,16)*Math.max(t,8)/4;case N:case P:return Math.max(e,8)*Math.max(t,8)/2;case ae:case oe:case ce:case F:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case se:case le:case ue:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case de:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case fe:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case pe:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case me:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case he:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case ge:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case _e:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case ve:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case ye:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case be:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case xe:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case Se:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case Ce:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case we:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case Te:case Ee:case De:return Math.ceil(e/4)*Math.ceil(t/4)*16;case Oe:case ke:return Math.ceil(e/4)*Math.ceil(t/4)*8;case Ae:case je:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function io(e){switch(e){case l:case u:return{byteLength:1,components:1};case f:case d:case g:return{byteLength:2,components:1};case _:case v:return{byteLength:2,components:4};case m:case p:case h:return{byteLength:4,components:1};case b:case x:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`187`}})),typeof window<`u`&&(window.__THREE__?B(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`187`);function ao(){let e=null,t=!1,n=null,r=null;function i(t,a){r=e.requestAnimationFrame(i),n(t,a)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function oo(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var J={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:`gl_FragColor = linearToOutputTexel( gl_FragColor );`,colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_PMREM
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.045 );
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef USE_DIFFUSE_ROUGHNESS
	float diffuseRoughnessFactor = diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;
	#endif
	material.diffuseRoughness = saturate( diffuseRoughnessFactor );
#endif
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float diffuseRoughness;
	#endif
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
#ifdef USE_DIFFUSE_ROUGHNESS
	const float EON_EPSILON = 1e-7;
	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {
		float muComp = 1.0 - mu;
		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );
		return A * ( 1.0 + roughness * gOverPi );
	}
	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float s = dot( lightDir, viewDir ) - dotNL * dotNV;
		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );
		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI
			* max( EON_EPSILON, 1.0 - albedoV )
			* max( EON_EPSILON, 1.0 - albedoL )
			/ max( EON_EPSILON, 1.0 - averageAlbedo );
		return singleScatter + multiScatter;
	}
	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return rho;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );
	}
#endif
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = max( material.clearcoatRoughness, 0.045 );
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = max( material.roughness, 0.045 );
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float alphaT = max( material.alphaT, alpha );
		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );
	#else
		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );
	#endif
	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );
		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );
	#else
		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#endif
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );
	#else
		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	#endif
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_LIGHT_PROBE_GRIDS > 0
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		int probeGrid = - 1;
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( isInsideLightProbeGrid( probeWorldPos, probeWorldNormal, probesMin[ i ], probesMax[ i ], probesResolution[ i ] ) ) probeGrid = UNROLLED_LOOP_INDEX;
		}
		#pragma unroll_loop_end
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( probeGrid == UNROLLED_LOOP_INDEX ) irradiance += getLightProbeGridIrradiance( probesSH[ i ], probesMin[ i ], probesMax[ i ], probesResolution[ i ], probeWorldPos, probeWorldNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lightprobes_pars_fragment:`#if NUM_LIGHT_PROBE_GRIDS > 0
uniform highp sampler3D probesSH[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMin[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMax[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesResolution[ NUM_LIGHT_PROBE_GRIDS ];
bool isInsideLightProbeGrid( vec3 worldPos, vec3 worldNormal, vec3 probesMin, vec3 probesMax, vec3 probesResolution ) {
	vec3 spacing = ( probesMax - probesMin ) / probesResolution;
	vec3 samplePos = worldPos + worldNormal * spacing * 0.5;
	vec3 margin = spacing * 0.01;
	return all( greaterThanEqual( samplePos, probesMin - margin ) ) && all( lessThanEqual( samplePos, probesMax + margin ) );
}
vec3 getLightProbeGridIrradiance( highp sampler3D probesSH, vec3 probesMin, vec3 probesMax, vec3 probesResolution, vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 probeSpacing = gridRange / res;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.5 / res, 1.0 - 0.5 / res );
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	#if defined( USE_COLOR_ALPHA )
		vColor *= morphTargetBaseInfluence;
	#elif defined( USE_COLOR )
		vColor.rgb *= morphTargetBaseInfluence;
	#endif
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor.rgb += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				vec2 radius = shadowRadius * texelSize;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float lightDistance = length( lightToPosition );
			float depthRange = shadowCameraFar - shadowCameraNear;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float depthA = - shadowCameraNear / depthRange - shadowBias;
				float depthB = shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#else
				float depthA = shadowCameraFar / depthRange + shadowBias;
				float depthB = - shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			shadow = 0.0;
			for ( int i = 0; i < 5; i ++ ) {
				vec2 offset = vogelDiskSample( i, 5, phi );
				vec3 direction = bd3D + ( tangent * offset.x + bitangent * offset.y ) * texelSize;
				vec3 absDirection = abs( direction );
				float dp = depthA + depthB / max( max( absDirection.x, absDirection.y ), absDirection.z );
				shadow += texture( shadowMap, vec4( direction, dp ) );
			}
			shadow *= 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	uniform mat3 diffuseRoughnessMapTransform;
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <envmap_common_pars_fragment>
void main() {
	#ifdef ENVMAP_TYPE_PMREM
		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );
	#else
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distance_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distance_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DIFFUSE_ROUGHNESS
	uniform float diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		uniform sampler2D diffuseRoughnessMap;
	#endif
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},Y={common:{diffuse:{value:new K(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new G},alphaMap:{value:null},alphaMapTransform:{value:new G},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new G}},envmap:{envMap:{value:null},envMapRotation:{value:new G},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new G}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new G}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new G},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new G},normalScale:{value:new U(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new G},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new G}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new G}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new G}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new K(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new K(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new G},alphaTest:{value:0},uvTransform:{value:new G}},sprite:{diffuse:{value:new K(16777215)},opacity:{value:1},center:{value:new U(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new G},alphaMap:{value:null},alphaMapTransform:{value:new G},alphaTest:{value:0}}},so={basic:{uniforms:Li([Y.common,Y.specularmap,Y.envmap,Y.aomap,Y.lightmap,Y.fog]),vertexShader:J.meshbasic_vert,fragmentShader:J.meshbasic_frag},lambert:{uniforms:Li([Y.common,Y.specularmap,Y.envmap,Y.aomap,Y.lightmap,Y.emissivemap,Y.bumpmap,Y.normalmap,Y.displacementmap,Y.fog,Y.lights,{emissive:{value:new K(0)},envMapIntensity:{value:1}}]),vertexShader:J.meshlambert_vert,fragmentShader:J.meshlambert_frag},phong:{uniforms:Li([Y.common,Y.specularmap,Y.envmap,Y.aomap,Y.lightmap,Y.emissivemap,Y.bumpmap,Y.normalmap,Y.displacementmap,Y.fog,Y.lights,{emissive:{value:new K(0)},specular:{value:new K(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:J.meshphong_vert,fragmentShader:J.meshphong_frag},standard:{uniforms:Li([Y.common,Y.envmap,Y.aomap,Y.lightmap,Y.emissivemap,Y.bumpmap,Y.normalmap,Y.displacementmap,Y.roughnessmap,Y.metalnessmap,Y.fog,Y.lights,{emissive:{value:new K(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:J.meshphysical_vert,fragmentShader:J.meshphysical_frag},toon:{uniforms:Li([Y.common,Y.aomap,Y.lightmap,Y.emissivemap,Y.bumpmap,Y.normalmap,Y.displacementmap,Y.gradientmap,Y.fog,Y.lights,{emissive:{value:new K(0)}}]),vertexShader:J.meshtoon_vert,fragmentShader:J.meshtoon_frag},matcap:{uniforms:Li([Y.common,Y.bumpmap,Y.normalmap,Y.displacementmap,Y.fog,{matcap:{value:null}}]),vertexShader:J.meshmatcap_vert,fragmentShader:J.meshmatcap_frag},points:{uniforms:Li([Y.points,Y.fog]),vertexShader:J.points_vert,fragmentShader:J.points_frag},dashed:{uniforms:Li([Y.common,Y.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:J.linedashed_vert,fragmentShader:J.linedashed_frag},depth:{uniforms:Li([Y.common,Y.displacementmap]),vertexShader:J.depth_vert,fragmentShader:J.depth_frag},normal:{uniforms:Li([Y.common,Y.bumpmap,Y.normalmap,Y.displacementmap,{opacity:{value:1}}]),vertexShader:J.meshnormal_vert,fragmentShader:J.meshnormal_frag},sprite:{uniforms:Li([Y.sprite,Y.fog]),vertexShader:J.sprite_vert,fragmentShader:J.sprite_frag},background:{uniforms:{uvTransform:{value:new G},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:J.background_vert,fragmentShader:J.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new G}},vertexShader:J.backgroundCube_vert,fragmentShader:J.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:J.cube_vert,fragmentShader:J.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:J.equirect_vert,fragmentShader:J.equirect_frag},distance:{uniforms:Li([Y.common,Y.displacementmap,{referencePosition:{value:new W},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:J.distance_vert,fragmentShader:J.distance_frag},shadow:{uniforms:Li([Y.lights,Y.fog,{color:{value:new K(0)},opacity:{value:1}}]),vertexShader:J.shadow_vert,fragmentShader:J.shadow_frag}};so.physical={uniforms:Li([so.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new G},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new G},clearcoatNormalScale:{value:new U(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new G},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new G},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new G},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new G},sheen:{value:0},sheenColor:{value:new K(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new G},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new G},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new G},transmissionSamplerSize:{value:new U},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new G},attenuationDistance:{value:0},attenuationColor:{value:new K(0)},specularColor:{value:new K(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new G},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new G},anisotropyVector:{value:new U},anisotropyMap:{value:null},anisotropyMapTransform:{value:new G}}]),vertexShader:J.meshphysical_vert,fragmentShader:J.meshphysical_frag};var co={r:0,b:0,g:0},lo=new Qt,uo=new G;uo.set(-1,0,0,0,1,0,0,0,1);function fo(e,t,n,r,i,a){let o=new K(0),s=i===!0?0:1,c,l,u=null,d=0,f=null;function p(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function m(t){let r=!1,i=p(t);i===null?g(o,s):i&&i.isColor&&(g(i,1),r=!0);let c=e.xr.getEnvironmentBlendMode();c===`additive`?n.buffers.color.setClear(0,0,0,1,a):c===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function h(t,n){let i=p(n);i&&i.isCubeTexture?(l===void 0&&(l=new q(new Ai(1,1,1),new Wi({name:`BackgroundCubeMaterial`,uniforms:Ii(so.backgroundCube.uniforms),vertexShader:so.backgroundCube.vertexShader,fragmentShader:so.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),l.geometry.deleteAttribute(`uv`),l.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),l.material.uniforms.envMap.value=i,l.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(lo.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(uo),l.material.toneMapped=It.getTransfer(i.colorSpace)!==Be,(u!==i||d!==i.version||f!==e.toneMapping)&&(l.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null)):i&&i.isTexture&&(c===void 0&&(c=new q(new Mi(2,2),new Wi({name:`BackgroundMaterial`,uniforms:Ii(so.background.uniforms),vertexShader:so.background.vertexShader,fragmentShader:so.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute(`normal`),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=i,c.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,c.material.toneMapped=It.getTransfer(i.colorSpace)!==Be,i.matrixAutoUpdate===!0&&i.updateMatrix(),c.material.uniforms.uvTransform.value.copy(i.matrix),(u!==i||d!==i.version||f!==e.toneMapping)&&(c.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),c.layers.enableAll(),t.unshift(c,c.geometry,c.material,0,0,null))}function g(t,r){t.getRGB(co,Bi(e)),n.buffers.color.setClear(co.r,co.g,co.b,r,a)}function _(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(e,t=1){o.set(e),s=t,g(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(e){s=e,g(o,s)},render:m,addToRenderList:h,dispose:_}}function po(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.isInterleavedBuffer===!0?t.stride:t.itemSize,p=s.offset;if(t.isInstancedInterleavedBuffer||t.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function mo(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function ho(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&n!==1015&&!i&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE))}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(B(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`),f=n.logarithmicDepthBuffer===!0&&d===!1;n.reversedDepthBuffer===!0&&d===!1&&B(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`),n.logarithmicDepthBuffer===!0&&d===!0&&B(`WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.`);let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=e.getParameter(e.MAX_SAMPLES),S=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:f,reversedDepthBuffer:d,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,maxSamples:x,samples:S}}function go(e){let t=this,n=null,r=0,i=!1,a=!1,o=new Pr,s=new G,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var _o=class extends Yt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Ti(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Ai(5,5,5),i=new Wi({name:`CubemapFromEquirect`,uniforms:Ii(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new q(r,i),s=t.minFilter;return t.minFilter===1008&&(t.minFilter=o),new La(1,10,this).update(e,a),t.minFilter=s,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}},vo=256,yo=3,bo=20,xo=256,So=16,Co=3,wo=new W,To=new K,Eo=class e{constructor(e){this._renderer=e,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new La(1,10,null),this._boxMesh=new q(new Ai(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=wo}=i,s=this._renderer;this._setSize(a);let c=this._allocateTarget(),l=this._getSourceTarget(!0);t>0&&(l.texture.mipmapsAutoUpdate=!1);let u=s.autoClear,d=s.autoClearColor,f=s.autoClearDepth,p=s.autoClearStencil,m=e.background;s.autoClear=!0,s.autoClearColor=!0,s.autoClearDepth=!0,s.autoClearStencil=!0,m===null&&(e.background=s.getClearColor(To));let h=new La(n,r,l);return h.position.copy(o),h.update(s,e),s.autoClear=u,s.autoClearColor=d,s.autoClearDepth=f,s.autoClearStencil=p,e.background=m,t>0&&(l.texture.mipmapsAutoUpdate=!0,this._blur(c,t)),this._applyPMREM(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=No(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Mo(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(e,t){return t>0?1-Math.sqrt(1-e/t):0}_setSize(e){this._cubeSize=Math.max(vo,Ct(e))}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?vo:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4);let n=t||this._allocateTarget();return this._textureToCubemap(e),this._applyPMREM(n),n}_allocateTarget(){let e=this._cubeSize,t=Do(e,!1,!1),n=Math.log2(e)-yo;for(let r=0;r<=n;r++)t.texture.mipmaps.push({width:e>>r,height:e>>r});return t.texture.name=`PMREM`,t.texture.isPMREMTexture=!0,t}_getSourceTarget(e=!1){let t=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==t||e&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=Do(t,!0,e)),this._sourceTarget}_compileMaterial(e){this._boxMesh.material=e,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(e,t,n){let r=this._boxMesh,i=this._cubeCamera;r.material=n,i.renderTarget=e,i.activeMipmapLevel=t;let a=e.width>>t;e.viewport.set(0,0,a,a),i.update(this._renderer,r),e.viewport.set(0,0,e.width,e.height)}_textureToCubemap(e){let t;e.mapping===301||e.mapping===302?(this._cubemapMaterial===null&&(this._cubemapMaterial=No()),t=this._cubemapMaterial,t.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=Mo()),t=this._equirectMaterial),t.uniforms.envMap.value=e,this._renderCube(this._getSourceTarget(),0,t)}_applyPMREM(t){this._ggxMaterial===null&&(this._ggxMaterial=ko(),this._integrationMaterial=Ao());let n=this._cubeSize,r=t.texture.mipmaps.length-1,i=this._ggxMaterial.uniforms;i.envMap.value=this._sourceTarget.texture;let a=this._integrationMaterial.uniforms;a.envMap.value=this._sourceTarget.texture,a.sourceLod.value=Math.log2(n/So);for(let o=0;o<=r;o++){let s=e.lodToRoughness(o,r);if(o>r-Co)a.roughness.value=s,this._renderCube(t,o,this._integrationMaterial);else{let e=s>0?Math.log2(n)+.5*Math.log2(6/(xo*s**4))+.5:0;i.roughness.value=s,i.lodBias.value=e,this._renderCube(t,o,this._ggxMaterial)}}}_blur(e,t){this._blurMaterial===null&&(this._blurMaterial=jo());let n=this._blurMaterial,r=n.uniforms,i=this._sourceTarget;r.sigma.value=Math.min(t,Math.PI)/Math.SQRT2,r.envMap.value=i.texture,this._renderCube(e,0,n),r.envMap.value=e.texture,this._renderCube(i,0,n)}};function Do(e,t,n){return new _o(e,{minFilter:c,generateMipmaps:t,type:g,colorSpace:z,depthBuffer:n})}function Oo(e,t,n){return new Wi({name:e,uniforms:t,vertexShader:J.cube_vert,fragmentShader:n,side:1,blending:0,depthTest:!1,depthWrite:!1})}function ko(){return Oo(`PMREMGGXConvolution`,{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${xo}u

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float lodBias;

		#include <common>

		// Van der Corput radical inverse
		float radicalInverse_VdC( uint bits ) {

			bits = ( bits << 16u ) | ( bits >> 16u );
			bits = ( ( bits & 0x55555555u ) << 1u ) | ( ( bits & 0xAAAAAAAAu ) >> 1u );
			bits = ( ( bits & 0x33333333u ) << 2u ) | ( ( bits & 0xCCCCCCCCu ) >> 2u );
			bits = ( ( bits & 0x0F0F0F0Fu ) << 4u ) | ( ( bits & 0xF0F0F0F0u ) >> 4u );
			bits = ( ( bits & 0x00FF00FFu ) << 8u ) | ( ( bits & 0xFF00FF00u ) >> 8u );
			return float( bits ) * 2.3283064365386963e-10; // / 0x100000000

		}

		// Hammersley sequence
		vec2 hammersley( uint i, uint N ) {

			return vec2( float( i ) / float( N ), radicalInverse_VdC( i ) );

		}

		void main() {

			vec3 N = normalize( vWorldDirection );

			// For very low roughness, just sample the environment directly
			if ( roughness < 0.001 ) {

				gl_FragColor = vec4( textureLod( envMap, N, 0.0 ).rgb, 1.0 );
				return;

			}

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			// Tangent space basis for VNDF sampling
			vec3 up = abs( N.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, N ) );
			vec3 bitangent = cross( N, tangent );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			for ( uint i = 0u; i < GGX_SAMPLES; i ++ ) {

				vec2 Xi = hammersley( i, GGX_SAMPLES );

				// With V = N, sample the reflected direction directly.
				float invQ = 1.0 / ( 1.0 - Xi.x + alpha2 * Xi.x );
				float NdotL = ( 1.0 - Xi.x - alpha2 * Xi.x ) * invQ;

				if ( NdotL > 0.0 ) {

					float phi = 2.0 * PI * Xi.y;
					float sinTheta = 2.0 * alpha * sqrt( Xi.x * ( 1.0 - Xi.x ) ) * invQ;
					vec3 L = N * NdotL + ( tangent * cos( phi ) + bitangent * sin( phi ) ) * sinTheta;

					// Match the source mip to the sample's solid angle. The terms
					// independent of the sample are precomputed in lodBias.
					float d = alpha2 * invQ;
					float lod = max( log2( d ) + lodBias, 0.0 );

					// Weight by NdotL for the split-sum approximation
					prefilteredColor += textureLod( envMap, L, lod ).rgb * NdotL;
					totalWeight += NdotL;

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function Ao(){return Oo(`PMREMGGXIntegration`,{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:So}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float sourceLod;
		uniform int sourceSize;

		void main() {

			vec3 N = normalize( vWorldDirection );

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			float texelSize = 2.0 / float( sourceSize );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			// Pair opposite texels: only the one in N's hemisphere contributes.
			for ( int face = 0; face < 3; face ++ ) {

				for ( int y = 0; y < sourceSize; y ++ ) {

					for ( int x = 0; x < sourceSize; x ++ ) {

						vec2 uv = ( vec2( x, y ) + 0.5 ) * texelSize - 1.0;
						vec3 texelDirection = face == 0 ? vec3( 1.0, uv ) : ( face == 1 ? vec3( uv.x, 1.0, uv.y ) : vec3( uv, 1.0 ) );

						float invDistance = inversesqrt( 1.0 + dot( uv, uv ) );
						float NdotL = dot( N, texelDirection );
						texelDirection *= NdotL < 0.0 ? - 1.0 : 1.0;
						NdotL = abs( NdotL ) * invDistance;

						// With V = N, NdotH squared is ( 1 + NdotL ) / 2. Common factors
						// in the GGX distribution and texel solid angle cancel when normalized.
						float d = 1.0 + alpha2 + ( alpha2 - 1.0 ) * NdotL;
						float weight = NdotL * invDistance * invDistance * invDistance / ( d * d );

						prefilteredColor += textureLod( envMap, texelDirection, sourceLod ).rgb * weight;
						totalWeight += weight;

					}

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function jo(){return Oo(`PMREMSphericalGaussianBlur`,{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${bo}
		#define GOLDEN_ANGLE 2.39996322973

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float sigma;

		#include <common>

		void main() {

			vec3 outputDirection = normalize( vWorldDirection );

			vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, outputDirection ) );
			vec3 bitangent = cross( outputDirection, tangent );

			// Truncate the kernel at three standard deviations or at the antipode.
			float thetaMax = min( 3.0 * sigma, PI );
			float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

			vec3 accumColor = vec3( 0.0 );
			float accumWeight = 0.0;

			for ( int i = 0; i < SAMPLES; i ++ ) {

				// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
				float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
				float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
				float phi = float( i ) * GOLDEN_ANGLE;

				vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
				vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

				// Correct the planar sample density to solid angle.
				float weight = sin( theta ) / theta;

				accumColor += weight * textureLod( envMap, sampleDirection, 0.0 ).rgb;
				accumWeight += weight;

			}

			gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

		}
	`)}function Mo(){return Oo(`PMREMEquirectangularToCubemap`,{envMap:{value:null}},`

		varying vec3 vWorldDirection;

		uniform sampler2D envMap;

		#include <common>

		void main() {

			// Average four subpixel samples to preserve small, bright features.
			vec3 direction = normalize( vWorldDirection );
			vec3 dx = dFdx( direction ) * 0.25;
			vec3 dy = dFdy( direction ) * 0.25;

			vec3 color = textureLod( envMap, equirectUv( normalize( direction - dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction - dx + dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx + dy ) ), 0.0 ).rgb;
			gl_FragColor = vec4( color * 0.25, 1.0 );

		}
	`)}function No(){return Oo(`PMREMCubemapToCubemap`,{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function Po(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304){if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}{let r=n.image;if(r&&r.height>0){let i=new _o(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}return null}}}return n}function o(t){if(t&&t.isTexture&&t.isPMREMTexture!==!0){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new Eo(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new Eo(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function Fo(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&Qe(`WebGLRenderer: `+e+` extension not supported.`),t}}}function Io(e,t,n,r){let i={},a=new WeakMap,o=new FinalizationRegistry(e=>delete i[e]);function s(e){c(e.target)}function c(e){e.index!==null&&t.remove(e.index);for(let n in e.attributes)t.remove(e.attributes[n]);e.removeEventListener(`dispose`,s),delete i[e.id],o.unregister(e);let c=a.get(e);c&&(t.remove(c),a.delete(e)),r.releaseStatesOfGeometry(e),e.isInstancedBufferGeometry===!0&&delete e._maxInstanceCount,n.memory.geometries--}function l(e,t){return i[t.id]===void 0&&(t.addEventListener(`dispose`,s),i[t.id]=new WeakRef(t),o.register(t,t.id,t),n.memory.geometries++),t}function u(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function d(e){let n=e.index,r=e.attributes.position,i=0;if(r===void 0)return;let o=n===null?r.array.length/3-1:n.array.length,s=new(r.count>=65535?_r:gr)(Math.ceil(o/3)*6,1),c=s.array;if(n!==null){let e=n.array;i=n.version;for(let t=0,n=0;t<o;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];c[n++]=r,c[n++]=i,c[n++]=i,c[n++]=a,c[n++]=a,c[n++]=r}}else{i=r.version;for(let e=0,t=0;e<o;e+=3){let n=e+0,r=e+1,i=e+2;c[t++]=n,c[t++]=r,c[t++]=r,c[t++]=i,c[t++]=i,c[t++]=n}}s.version=i;let l=a.get(e);l&&t.remove(l),a.set(e,s)}function f(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&d(e)}else d(e);return a.get(e)}function p(){for(let e in i){let t=i[e].deref();t!==void 0&&c(t)}}return{get:l,update:u,getWireframeAttribute:f,dispose:p}}function Lo(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function Ro(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:V(`WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function zo(e,t,n){let r=new WeakMap,i=new qt;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let g=new Float32Array(p*m*4*u),_=new Xt(g,p,m,u);_.type=h,_.needsUpdate=!0;let v=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*v;e===!0&&(i.fromBufferAttribute(r,t),g[d+s+0]=i.x,g[d+s+1]=i.y,g[d+s+2]=i.z,g[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),g[d+s+4]=i.x,g[d+s+5]=i.y,g[d+s+6]=i.z,g[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),g[d+s+8]=i.x,g[d+s+9]=i.y,g[d+s+10]=i.z,g[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:_,size:new U(p,m)},r.set(o,d);function y(){_.dispose(),r.delete(o),o.removeEventListener(`dispose`,y)}o.addEventListener(`dispose`,y)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function Bo(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var Vo={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function Ho(e,t,n,r,i,a){let o=new Yt(t,n,{type:e,depthBuffer:i,stencilBuffer:a,samples:r?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),s=null,c=null,l=null,u=new Ar;u.setAttribute(`position`,new vr([-1,3,0,-1,-1,0,3,-1,0],3)),u.setAttribute(`uv`,new vr([0,2,0,0,2,0],2));let d=new Gi({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),f=new q(u,d),p=new ja(-1,1,1,-1,0,1),m=null,h=null,_=!1,v,b=null,x=[],S=!1;this.setSize=function(e,t){o.setSize(e,t),s!==null&&s.setSize(e,t),c!==null&&c.setSize(e,t);for(let n=0;n<x.length;n++){let r=x[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){x=e,S=x.length>0&&x[0].isRenderPass===!0;let t=o.width,n=o.height;x.length>0&&s===null&&(s=new Yt(t,n,{type:g,depthBuffer:!1,stencilBuffer:!1}),c=new Yt(t,n,{type:g,depthBuffer:!1,stencilBuffer:!1}));let r=i===!0&&x.some(e=>e.needsDepthTexture===!0);r!==(o.depthTexture!==null)&&(r===!0&&l===null&&(l=new Di(t,n),a===!0&&(l.format=E,l.type=y)),o.dispose(),o.depthTexture=r?l:null,o.resolveDepthBuffer=r,o.storeMultisampledDepthBuffer=r);for(let e=0;e<x.length;e++){let i=x[e];i.setSize&&i.setSize(t,n),r&&i.needsDepthTexture===!0&&i.setDepthTexture&&i.setDepthTexture(l)}},this.begin=function(e,t){if(_||e.toneMapping===0&&x.length===0)return!1;if(b=t,t!==null){let e=t.width,n=t.height;(o.width!==e||o.height!==n)&&this.setSize(e,n)}return S===!1&&e.setRenderTarget(o),v=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return S},this.end=function(e,t){e.toneMapping=v,_=!0;let n=o,r=s;for(let i=0;i<x.length;i++){let a=x[i];a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1&&(n=r,r=r===s?c:s))}if(m!==e.outputColorSpace||h!==e.toneMapping){m=e.outputColorSpace,h=e.toneMapping,d.defines={},It.getTransfer(m)===`srgb`&&(d.defines.SRGB_TRANSFER=``);let t=Vo[h];t&&(d.defines[t]=``),d.needsUpdate=!0}d.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(b),e.render(f,p),b=null,_=!1},this.isCompositing=function(){return _},this.dispose=function(){o.dispose(),s!==null&&s.dispose(),c!==null&&c.dispose(),u.dispose(),d.dispose()}}var Uo=new Kt,Wo=new Di(1,1),Go=new Oi(1),Ko=new Xt,qo=new Zt,Jo=new Ti,Yo=[],Xo=[],Zo=new Float32Array(16),Qo=new Float32Array(9),$o=new Float32Array(4);function es(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=Yo[i];if(a===void 0&&(a=new Float32Array(i),Yo[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function ts(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function ns(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function rs(e,t){let n=Xo[t];n===void 0&&(n=new Int32Array(t),Xo[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function is(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function as(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(ts(n,t))return;e.uniform2fv(this.addr,t),ns(n,t)}}function os(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(ts(n,t))return;e.uniform3fv(this.addr,t),ns(n,t)}}function ss(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(ts(n,t))return;e.uniform4fv(this.addr,t),ns(n,t)}}function cs(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(ts(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),ns(n,t)}else{if(ts(n,r))return;$o.set(r),e.uniformMatrix2fv(this.addr,!1,$o),ns(n,r)}}function ls(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(ts(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),ns(n,t)}else{if(ts(n,r))return;Qo.set(r),e.uniformMatrix3fv(this.addr,!1,Qo),ns(n,r)}}function us(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(ts(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),ns(n,t)}else{if(ts(n,r))return;Zo.set(r),e.uniformMatrix4fv(this.addr,!1,Zo),ns(n,r)}}function ds(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function fs(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(ts(n,t))return;e.uniform2iv(this.addr,t),ns(n,t)}}function ps(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(ts(n,t))return;e.uniform3iv(this.addr,t),ns(n,t)}}function ms(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(ts(n,t))return;e.uniform4iv(this.addr,t),ns(n,t)}}function hs(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function gs(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(ts(n,t))return;e.uniform2uiv(this.addr,t),ns(n,t)}}function _s(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(ts(n,t))return;e.uniform3uiv(this.addr,t),ns(n,t)}}function vs(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(ts(n,t))return;e.uniform4uiv(this.addr,t),ns(n,t)}}function ys(e){return e.version===0&&(e.compareFunction=519,e.needsUpdate=!0),e}function bs(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;a=this.type===e.SAMPLER_2D_SHADOW?ys(Wo):Uo,n.setTexture2D(t||a,i)}function xs(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||qo,i)}function Ss(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;a=this.type===e.SAMPLER_CUBE_SHADOW?ys(Go):Jo,n.setTextureCube(t||a,i)}function Cs(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||Ko,i)}function ws(e){switch(e){case 5126:return is;case 35664:return as;case 35665:return os;case 35666:return ss;case 35674:return cs;case 35675:return ls;case 35676:return us;case 5124:case 35670:return ds;case 35667:case 35671:return fs;case 35668:case 35672:return ps;case 35669:case 35673:return ms;case 5125:return hs;case 36294:return gs;case 36295:return _s;case 36296:return vs;case 35678:case 36198:case 36298:case 36306:case 35682:return bs;case 35679:case 36299:case 36307:return xs;case 35680:case 36300:case 36308:case 36293:return Ss;case 36289:case 36303:case 36311:case 36292:return Cs}}function Ts(e,t){e.uniform1fv(this.addr,t)}function Es(e,t){let n=es(t,this.size,2);e.uniform2fv(this.addr,n)}function Ds(e,t){let n=es(t,this.size,3);e.uniform3fv(this.addr,n)}function Os(e,t){let n=es(t,this.size,4);e.uniform4fv(this.addr,n)}function ks(e,t){let n=es(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function As(e,t){let n=es(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function js(e,t){let n=es(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function Ms(e,t){e.uniform1iv(this.addr,t)}function Ns(e,t){e.uniform2iv(this.addr,t)}function Ps(e,t){e.uniform3iv(this.addr,t)}function Fs(e,t){e.uniform4iv(this.addr,t)}function Is(e,t){e.uniform1uiv(this.addr,t)}function Ls(e,t){e.uniform2uiv(this.addr,t)}function Rs(e,t){e.uniform3uiv(this.addr,t)}function zs(e,t){e.uniform4uiv(this.addr,t)}function Bs(e,t,n){let r=this.cache,i=t.length,a=rs(n,i);ts(r,a)||(e.uniform1iv(this.addr,a),ns(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?ys(Wo):Uo;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function Vs(e,t,n){let r=this.cache,i=t.length,a=rs(n,i);ts(r,a)||(e.uniform1iv(this.addr,a),ns(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||qo,a[e])}function Hs(e,t,n){let r=this.cache,i=t.length,a=rs(n,i);ts(r,a)||(e.uniform1iv(this.addr,a),ns(r,a));let o;o=this.type===e.SAMPLER_CUBE_SHADOW?ys(Go):Jo;for(let e=0;e!==i;++e)n.setTextureCube(t[e]||o,a[e])}function Us(e,t,n){let r=this.cache,i=t.length,a=rs(n,i);ts(r,a)||(e.uniform1iv(this.addr,a),ns(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||Ko,a[e])}function Ws(e){switch(e){case 5126:return Ts;case 35664:return Es;case 35665:return Ds;case 35666:return Os;case 35674:return ks;case 35675:return As;case 35676:return js;case 5124:case 35670:return Ms;case 35667:case 35671:return Ns;case 35668:case 35672:return Ps;case 35669:case 35673:return Fs;case 5125:return Is;case 36294:return Ls;case 36295:return Rs;case 36296:return zs;case 35678:case 36198:case 36298:case 36306:case 35682:return Bs;case 35679:case 36299:case 36307:return Vs;case 35680:case 36300:case 36308:case 36293:return Hs;case 36289:case 36303:case 36311:case 36292:return Us}}var Gs=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=ws(t.type)}},Ks=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Ws(t.type)}},qs=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},Js=/(\w+)(\])?(\[|\.)?/g;function Ys(e,t){e.seq.push(t),e.map[t.id]=t}function Xs(e,t,n){let r=e.name,i=r.length;for(Js.lastIndex=0;;){let a=Js.exec(r),o=Js.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){Ys(n,l===void 0?new Gs(s,e,t):new Ks(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new qs(s),Ys(n,e)),n=e}}}var Zs=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);Xs(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function Qs(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var $s=37297,ec=0;function tc(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var nc=new G;function rc(e){It._getMatrix(nc,It.workingColorSpace,e);let t=`mat3( ${nc.elements.map(e=>e.toFixed(4))} )`;switch(It.getTransfer(e)){case ze:return[t,`LinearTransferOETF`];case Be:return[t,`sRGBTransferOETF`];default:return B(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function ic(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+tc(e.getShaderSource(t),r)}return i}function ac(e,t){let n=rc(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( ${n[0]} * value.rgb, value.a ) );`,`}`].join(`
`)}var oc={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function sc(e,t){let n=oc[t];return n===void 0?(B(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var cc=new W;function lc(){return It.getLuminanceCoefficients(cc),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${cc.x.toFixed(4)}, ${cc.y.toFixed(4)}, ${cc.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function uc(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(pc).join(`
`)}function dc(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function fc(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function pc(e){return e!==``}function mc(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,t.numLightProbeGrids)}function hc(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var gc=/^[ \t]*#include +<([\w\d./]+)>/gm;function _c(e){return e.replace(gc,vc)}function vc(e,t){let n=J[t];if(n===void 0)throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`);return _c(n)}var yc=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function bc(e){return e.replace(yc,xc)}function xc(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function Sc(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision===`highp`?t+=`
#define HIGH_PRECISION`:e.precision===`mediump`?t+=`
#define MEDIUM_PRECISION`:e.precision===`lowp`&&(t+=`
#define LOW_PRECISION`),t}var Cc={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function wc(e){return Cc[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var Tc={302:`ENVMAP_MODE_REFRACTION`};function Ec(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:Tc[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var Dc={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function Oc(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:Dc[e.combine]||`ENVMAP_BLENDING_NONE`}function kc(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=wc(n),l=n.envMapPMREM===!0?`ENVMAP_TYPE_PMREM`:`ENVMAP_TYPE_CUBE`,u=Ec(n),d=Oc(n),f=uc(n),p=dc(a),m=i.createProgram(),h,g,_=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(h=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p].filter(pc).join(`
`),h.length>0&&(h+=`
`),g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p].filter(pc).join(`
`),g.length>0&&(g+=`
`)):(h=[Sc(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.diffuseRoughnessMap?`#define USE_DIFFUSE_ROUGHNESSMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.diffuseRoughnessMapUv?`#define DIFFUSE_ROUGHNESSMAP_UV `+n.diffuseRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(pc).join(`
`),g=[Sc(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,n.envMapPMREM?`#define ENVMAP_MAX_LOD `+n.envMapMaxLod+`.0`:``,n.envMapPMREM?`#define ENVMAP_SIZE `+n.envMapSize+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.diffuseRoughness?`#define USE_DIFFUSE_ROUGHNESS`:``,n.diffuseRoughnessMap?`#define USE_DIFFUSE_ROUGHNESSMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.retroreflection?`#define USE_RETROREFLECTION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:J.tonemapping_pars_fragment,n.toneMapping===0?``:sc(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,J.colorspace_pars_fragment,ac(`linearToOutputTexel`,n.outputColorSpace),lc(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(pc).join(`
`)),o=_c(o),o=mc(o,n),o=hc(o,n),s=_c(s),s=mc(s,n),s=hc(s,n),o=bc(o),s=bc(s),n.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,h=[f,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+h,g=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+g);let v=_+h+o,y=_+g+s,b=Qs(i,i.VERTEX_SHADER,v),x=Qs(i,i.FRAGMENT_SHADER,y);i.attachShader(m,b),i.attachShader(m,x),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&i.bindAttribLocation(m,0,`position`):i.bindAttribLocation(m,0,n.index0AttributeName),i.linkProgram(m);function S(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(m)||``,r=i.getShaderInfoLog(b)||``,a=i.getShaderInfoLog(x)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(m,i.LINK_STATUS)===!1){if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,m,b,x);else{let e=ic(i,b,`vertex`),n=ic(i,x,`fragment`);V(`WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(m,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}}else o===``?(s===``||c===``)&&(u=!1):B(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:h},fragmentShader:{log:c,prefix:g}})}i.deleteShader(b),i.deleteShader(x),C=new Zs(i,m),w=fc(i,m)}let C;this.getUniforms=function(){return C===void 0&&S(this),C};let w;this.getAttributes=function(){return w===void 0&&S(this),w};let T=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return T===!1&&(T=i.getProgramParameter(m,$s)),T},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(m),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=ec++,this.cacheKey=t,this.usedTimes=1,this.program=m,this.vertexShader=b,this.fragmentShader=x,this}var Ac=0,jc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Mc(e),t.set(e,n)),n}},Mc=class{constructor(e){this.id=Ac++,this.code=e,this.usedTimes=0}};function Nc(e){return e===1030||e===37490||e===36285}function Pc(e,t,n,r,i,a){let o=new un,s=new jc,c=new Set,l=[],u=new Map,d=r.logarithmicDepthBuffer,f={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function p(e){return c.add(e),e===0?`uv`:`uv${e}`}function m(i,o,l,u,m,h){let g=u.fog,_=m.geometry,v=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,y=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,b=t.get(i.envMap||v,y),x=f[i.type],S=r.precision;i.precision!==null&&(S=r.getMaxPrecision(i.precision),S!==i.precision&&B(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,S,`instead.`));let C=_.morphAttributes.position||_.morphAttributes.normal||_.morphAttributes.color,w=C===void 0?0:C.length,T=0;_.morphAttributes.position!==void 0&&(T=1),_.morphAttributes.normal!==void 0&&(T=2),_.morphAttributes.color!==void 0&&(T=3);let E,D,O,k;if(x){let e=so[x];E=e.vertexShader,D=e.fragmentShader}else{E=i.vertexShader,D=i.fragmentShader;let e=s.getVertexShaderStage(i),t=s.getFragmentShaderStage(i);s.update(i,e,t),O=e.id,k=t.id}let A=e.getRenderTarget(),ee=e.state.buffers.depth.getReversed(),j=m.isInstancedMesh===!0,te=m.isBatchedMesh===!0,M=!!i.map,ne=!!i.matcap,N=!!b,re=N&&b.isPMREMTexture===!0,P=!!i.aoMap,ie=!!i.lightMap,ae=!!i.bumpMap&&i.wireframe===!1,oe=!!i.normalMap,se=!!i.displacementMap,ce=!!i.emissiveMap,F=!!i.metalnessMap,le=!!i.roughnessMap,ue=i.anisotropy>0,de=i.clearcoat>0,fe=i.diffuseRoughness>0,pe=i.dispersion>0,me=i.retroreflectivity>0,he=i.iridescence>0,ge=i.sheen>0,_e=i.transmission>0,ve=ue&&!!i.anisotropyMap,ye=de&&!!i.clearcoatMap,be=de&&!!i.clearcoatNormalMap,xe=de&&!!i.clearcoatRoughnessMap,Se=fe&&!!i.diffuseRoughnessMap,Ce=he&&!!i.iridescenceMap,we=he&&!!i.iridescenceThicknessMap,Te=ge&&!!i.sheenColorMap,Ee=ge&&!!i.sheenRoughnessMap,De=!!i.specularMap,Oe=!!i.specularColorMap,ke=!!i.specularIntensityMap,Ae=_e&&!!i.transmissionMap,je=_e&&!!i.thicknessMap,Me=!!i.gradientMap,Ne=!!i.alphaMap,I=i.alphaTest>0,Pe=!!i.alphaHash,Fe=!!i.extensions,Ie=0;i.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(Ie=e.toneMapping);let L=re?b.isCompressedCubeTexture?b.image[0].mipmaps:b.mipmaps:null,Le={shaderID:x,shaderType:i.type,shaderName:i.name,vertexShader:E,fragmentShader:D,defines:i.defines,customVertexShaderID:O,customFragmentShaderID:k,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:S,batching:te,batchingColor:te&&m._colorsTexture!==null,instancing:j,instancingColor:j&&m.instanceColor!==null,instancingMorph:j&&m.morphTexture!==null,outputColorSpace:A===null?e.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:It.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:M,matcap:ne,envMap:N,envMapMode:N&&b.mapping,envMapPMREM:re,envMapMaxLod:re?L.length-1:null,envMapSize:re?L[0].width:null,aoMap:P,lightMap:ie,bumpMap:ae,normalMap:oe,displacementMap:se,emissiveMap:ce,normalMapObjectSpace:oe&&i.normalMapType===1,normalMapTangentSpace:oe&&i.normalMapType===0,packedNormalMap:oe&&i.normalMapType===0&&Nc(i.normalMap.format),metalnessMap:F,roughnessMap:le,anisotropy:ue,anisotropyMap:ve,clearcoat:de,clearcoatMap:ye,clearcoatNormalMap:be,clearcoatRoughnessMap:xe,diffuseRoughness:fe,diffuseRoughnessMap:Se,dispersion:pe,retroreflection:me,iridescence:he,iridescenceMap:Ce,iridescenceThicknessMap:we,sheen:ge,sheenColorMap:Te,sheenRoughnessMap:Ee,specularMap:De,specularColorMap:Oe,specularIntensityMap:ke,transmission:_e,transmissionMap:Ae,thicknessMap:je,gradientMap:Me,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:Ne,alphaTest:I,alphaHash:Pe,combine:i.combine,mapUv:M&&p(i.map.channel),aoMapUv:P&&p(i.aoMap.channel),lightMapUv:ie&&p(i.lightMap.channel),bumpMapUv:ae&&p(i.bumpMap.channel),normalMapUv:oe&&p(i.normalMap.channel),displacementMapUv:se&&p(i.displacementMap.channel),emissiveMapUv:ce&&p(i.emissiveMap.channel),metalnessMapUv:F&&p(i.metalnessMap.channel),roughnessMapUv:le&&p(i.roughnessMap.channel),anisotropyMapUv:ve&&p(i.anisotropyMap.channel),clearcoatMapUv:ye&&p(i.clearcoatMap.channel),clearcoatNormalMapUv:be&&p(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:xe&&p(i.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:Se&&p(i.diffuseRoughnessMap.channel),iridescenceMapUv:Ce&&p(i.iridescenceMap.channel),iridescenceThicknessMapUv:we&&p(i.iridescenceThicknessMap.channel),sheenColorMapUv:Te&&p(i.sheenColorMap.channel),sheenRoughnessMapUv:Ee&&p(i.sheenRoughnessMap.channel),specularMapUv:De&&p(i.specularMap.channel),specularColorMapUv:Oe&&p(i.specularColorMap.channel),specularIntensityMapUv:ke&&p(i.specularIntensityMap.channel),transmissionMapUv:Ae&&p(i.transmissionMap.channel),thicknessMapUv:je&&p(i.thicknessMap.channel),alphaMapUv:Ne&&p(i.alphaMap.channel),vertexTangents:!!_.attributes.tangent&&(oe||ue),vertexNormals:!!_.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!_.attributes.color&&_.attributes.color.itemSize===4,pointsUvs:m.isPoints===!0&&!!_.attributes.uv&&(M||Ne),fog:!!g,useFog:i.fog===!0,fogExp2:!!g&&g.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||_.attributes.normal===void 0&&oe===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:ee,skinning:m.isSkinnedMesh===!0,hasPositionAttribute:_.attributes.position!==void 0,morphTargets:_.morphAttributes.position!==void 0,morphNormals:_.morphAttributes.normal!==void 0,morphColors:_.morphAttributes.color!==void 0,morphTargetsCount:w,morphTextureStride:T,numSunLights:o.sun.length,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numSunLightShadows:o.sunShadowMap.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numLightProbeGrids:h.filter(e=>e.texture!==null).length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:Ie,decodeVideoTexture:M&&i.map.isVideoTexture===!0&&It.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:ce&&i.emissiveMap.isVideoTexture===!0&&It.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:Fe&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(Fe&&i.extensions.multiDraw===!0||te)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return Le.vertexUv1s=c.has(1),Le.vertexUv2s=c.has(2),Le.vertexUv3s=c.has(3),c.clear(),Le}function h(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(g(n,t),_(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function g(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapPMREM),e.push(t.envMapMaxLod),e.push(t.envMapSize),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.diffuseRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.numSunLights),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numSunLightShadows),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.numLightProbeGrids),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function _(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.retroreflection&&o.enable(24),t.diffuseRoughness&&o.enable(25),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),t.packedNormalMap&&o.enable(22),t.vertexNormals&&o.enable(23),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),t.numLightProbeGrids>0&&o.enable(22),t.hasPositionAttribute&&o.enable(23),e.push(o.mask)}function v(e){let t=f[e.type],n;if(t){let e=so[t];n=Vi.clone(e.uniforms)}else n=e.uniforms;return n}function y(t,n){let r=u.get(n);return r===void 0?(r=new kc(e,n,t,i),l.push(r),u.set(n,r)):++r.usedTimes,r}function b(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),u.delete(e.cacheKey),e.destroy()}}function x(e){s.remove(e)}function S(){s.dispose()}return{getParameters:m,getProgramCacheKey:h,getUniforms:v,acquireProgram:y,releaseProgram:b,releaseShaderCache:x,programs:l,dispose:S}}function Fc(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function Ic(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function Lc(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function Rc(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l,u){u.reversedDepth===!0&&(c=-c);let d=s(e,t,a,o,c,l);a.transmission>0?r.push(d):a.transparent===!0?i.push(d):n.push(d)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t){n.length>1&&n.sort(e||Ic),r.length>1&&r.sort(t||Lc),i.length>1&&i.sort(t||Lc)}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function zc(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new Rc,e.set(t,[i])):n>=r.length?(i=new Rc,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function Bc(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={direction:new W,color:new K};break;case`SpotLight`:n={position:new W,direction:new W,color:new K,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new W,color:new K,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new W,skyColor:new K,groundColor:new K};break;case`RectAreaLight`:n={color:new K,position:new W,halfWidth:new W,halfHeight:new W}}return e[t.id]=n,n}}}function Vc(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new U};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new U};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new U,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var Hc=0;function Uc(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function Wc(e){let t=new Bc,n=Vc(),r={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new W);let i=new W,a=new Qt,o=new Qt;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0,y=0,b=0,x=0;i.sort(Uc);for(let e=0,S=i.length;e<S;e++){let S=i[e],C=S.color,w=S.intensity,T=S.distance,E=null;if(S.shadow&&S.shadow.map&&(E=S.shadow.map.texture.format===1030?S.shadow.map.texture:S.shadow.map.depthTexture||S.shadow.map.texture),S.isAmbientLight)a+=C.r*w,o+=C.g*w,s+=C.b*w;else if(S.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(S.sh.coefficients[e],w);x++}else if(S.isSunLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize.copy(e.mapSize).multiply(e.getFrameExtents()),r.sunShadow[l]=t,r.sunShadowMap[l]=E;let i=e.getViewportCount();for(let t=0;t<i;t++)r.sunShadowMatrix[u+t]=e.getMatrix(t),r.sunShadowCascade[u+t]=e._cascadeData[t];u+=i,l++}r.sun[c]=e,c++}else if(S.isDirectionalLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[d]=t,r.directionalShadowMap[d]=E,r.directionalShadowMatrix[d]=S.shadow.matrix,g++}r.directional[d]=e,d++}else if(S.isSpotLight){let e=t.get(S);e.position.setFromMatrixPosition(S.matrixWorld),e.color.copy(C).multiplyScalar(w),e.distance=T,e.coneCos=Math.cos(S.angle),e.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),e.decay=S.decay,r.spot[p]=e;let i=S.shadow;if(S.map&&(r.spotLightMap[y]=S.map,y++,i.updateMatrices(S),S.castShadow&&b++),r.spotLightMatrix[p]=i.matrix,S.castShadow){let e=n.get(S);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[p]=e,r.spotShadowMap[p]=E,v++}p++}else if(S.isRectAreaLight){let e=t.get(S);e.color.copy(C).multiplyScalar(w),e.halfWidth.set(S.width*.5,0,0),e.halfHeight.set(0,S.height*.5,0),r.rectArea[m]=e,m++}else if(S.isPointLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),e.distance=S.distance,e.decay=S.decay,S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[f]=t,r.pointShadowMap[f]=E,r.pointShadowMatrix[f]=S.shadow.matrix,_++}r.point[f]=e,f++}else if(S.isHemisphereLight){let e=t.get(S);e.skyColor.copy(S.color).multiplyScalar(w),e.groundColor.copy(S.groundColor).multiplyScalar(w),r.hemi[h]=e,h++}}m>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=Y.LTC_FLOAT_1,r.rectAreaLTC2=Y.LTC_FLOAT_2):(r.rectAreaLTC1=Y.LTC_HALF_1,r.rectAreaLTC2=Y.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let S=r.hash;(S.sunLength!==c||S.directionalLength!==d||S.pointLength!==f||S.spotLength!==p||S.rectAreaLength!==m||S.hemiLength!==h||S.numSunShadows!==l||S.numDirectionalShadows!==g||S.numPointShadows!==_||S.numSpotShadows!==v||S.numSpotMaps!==y||S.numLightProbes!==x)&&(r.sun.length=c,r.directional.length=d,r.spot.length=p,r.rectArea.length=m,r.point.length=f,r.hemi.length=h,r.sunShadow.length=l,r.sunShadowMap.length=l,r.sunShadowMatrix.length=u,r.sunShadowCascade.length=u,r.directionalShadow.length=g,r.directionalShadowMap.length=g,r.directionalShadowMatrix.length=g,r.pointShadow.length=_,r.pointShadowMap.length=_,r.pointShadowMatrix.length=_,r.spotShadow.length=v,r.spotShadowMap.length=v,r.spotLightMatrix.length=v+y-b,r.spotLightMap.length=y,r.numSpotLightShadowsWithMaps=b,r.numLightProbes=x,S.sunLength=c,S.directionalLength=d,S.pointLength=f,S.spotLength=p,S.rectAreaLength=m,S.hemiLength=h,S.numSunShadows=l,S.numDirectionalShadows=g,S.numPointShadows=_,S.numSpotShadows=v,S.numSpotMaps=y,S.numLightProbes=x,r.version=Hc++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=0,f=t.matrixWorldInverse;for(let t=0,p=e.length;t<p;t++){let p=e[t];if(p.isSunLight){let e=r.sun[n];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),n++}else if(p.isDirectionalLight){let e=r.directional[s];e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),s++}else if(p.isSpotLight){let e=r.spot[l];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),l++}else if(p.isRectAreaLight){let e=r.rectArea[u];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),o.identity(),a.copy(p.matrixWorld),a.premultiply(f),o.extractRotation(a),e.halfWidth.set(p.width*.5,0,0),e.halfHeight.set(0,p.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),u++}else if(p.isPointLight){let e=r.point[c];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),c++}else if(p.isHemisphereLight){let e=r.hemi[d];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),d++}}}return{setup:s,setupView:c,state:r}}function Gc(e){let t=new Wc(e),n=[],r=[],i=[];function a(e){u.camera=e,n.length=0,r.length=0,i.length=0}function o(e){e.isLightProbeGrid?i.push(e):n.push(e)}function s(e){r.push(e)}function c(){t.setup(n),i.sort((e,t)=>e.priority-t.priority||e.id-t.id)}function l(e){t.setupView(n,e)}let u={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:u,setupLights:c,setupLightsView:l,pushLight:o,pushShadow:s}}function Kc(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new Gc(e),t.set(n,[a])):r>=i.length?(a=new Gc(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var qc=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Jc=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Yc=[new W(1,0,0),new W(-1,0,0),new W(0,1,0),new W(0,-1,0),new W(0,0,1),new W(0,0,-1)],Xc=[new W(0,-1,0),new W(0,-1,0),new W(0,0,1),new W(0,0,-1),new W(0,-1,0),new W(0,-1,0)],Zc=new Qt,Qc=new W,$c=new W;function el(e,t,n){let i=new hi,a=new U,s=new U,c=new qt,l=new Yi,u=new Xi,d={},f=n.maxTextureSize,p={0:1,1:0,2:2},_=new Wi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new U},radius:{value:4}},vertexShader:qc,fragmentShader:Jc}),v=_.clone();v.defines.HORIZONTAL_PASS=1;let y=new Ar;y.setAttribute(`position`,new hr(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let b=new q(y,_),x=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let S=this.type;this.render=function(t,n,l){if(x.enabled===!1||x.autoUpdate===!1&&x.needsUpdate===!1||t.length===0)return;this.type===2&&(B(`WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead.`),this.type=1);let u=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),_=e.state;_.setBlending(0),_.buffers.depth.getReversed()===!0?_.buffers.color.setClear(0,0,0,0):_.buffers.color.setClear(1,1,1,1),_.buffers.depth.setTest(!0),_.setScissorTest(!1);let v=S!==this.type;v&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let u=0,d=t.length;u<d;u++){let d=t[u],p=d.shadow;if(p===void 0){B(`WebGLShadowMap:`,d,`has no shadow.`);continue}if(p.autoUpdate===!1&&p.needsUpdate===!1)continue;a.copy(p.mapSize);let y=p.getFrameExtents();a.multiply(y),s.copy(p.mapSize),(a.x>f||a.y>f)&&(a.x>f&&(s.x=Math.floor(f/y.x),a.x=s.x*y.x,p.mapSize.x=s.x),a.y>f&&(s.y=Math.floor(f/y.y),a.y=s.y*y.y,p.mapSize.y=s.y));let b=e.state.buffers.depth.getReversed();if(p.camera._reversedDepth=b,p.map===null||v===!0){if(p.map!==null&&(p.map.depthTexture!==null&&(p.map.depthTexture.dispose(),p.map.depthTexture=null),p.map.dispose()),this.type===3){if(d.isPointLight){B(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}p.map=new Yt(a.x,a.y,{format:k,type:g,minFilter:o,magFilter:o,generateMipmaps:!1}),p.map.texture.name=d.name+`.shadowMap`,p.map.depthTexture=new Di(a.x,a.y,h),p.map.depthTexture.name=d.name+`.shadowMapDepth`,p.map.depthTexture.format=T,p.map.depthTexture.compareFunction=null,p.map.depthTexture.minFilter=r,p.map.depthTexture.magFilter=r}else d.isPointLight?(p.map=new _o(a.x),p.map.depthTexture=new Oi(a.x,m)):(p.map=new Yt(a.x,a.y),p.map.depthTexture=new Di(a.x,a.y,m)),p.map.depthTexture.name=d.name+`.shadowMap`,p.map.depthTexture.format=T,this.type===1?(p.map.depthTexture.compareFunction=b?518:515,p.map.depthTexture.minFilter=o,p.map.depthTexture.magFilter=o):(p.map.depthTexture.compareFunction=null,p.map.depthTexture.minFilter=r,p.map.depthTexture.magFilter=r);p.camera.updateProjectionMatrix()}p.map.isWebGLCubeRenderTarget!==!0&&(p.map.width!==a.x||p.map.height!==a.y)&&p.map.setSize(a.x,a.y);let x=p.map.isWebGLCubeRenderTarget?6:p.getViewportCount();d.isPointLight!==!0&&p.updateMatrices(d,l);let S=p.camera.layers.mask&4294967294?p.camera.layers:l.layers;for(let t=0;t<x;t++){let r=p.getCamera(t);if(d.isPointLight){let e=p.camera,n=p.matrix,r=d.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),Qc.setFromMatrixPosition(d.matrixWorld),e.position.copy(Qc),$c.copy(e.position),$c.add(Yc[t]),e.up.copy(Xc[t]),e.lookAt($c),e.updateMatrixWorld(),n.makeTranslation(-Qc.x,-Qc.y,-Qc.z),Zc.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),p._frustum.setFromProjectionMatrix(Zc,e.coordinateSystem,e.reversedDepth)}if(p.map.isWebGLCubeRenderTarget)e.setRenderTarget(p.map,t),e.clear();else{t===0&&(e.setRenderTarget(p.map),e.clear());let n=p.getViewport(t);c.set(s.x*n.x,s.y*n.y,s.x*n.z,s.y*n.w),_.viewport(c)}i=p.getFrustum(t),E(n,l,r,d,S,this.type)}p.isPointLightShadow!==!0&&this.type===3&&C(p,l),p.needsUpdate=!1}S=this.type,x.needsUpdate=!1,e.setRenderTarget(u,d,p)};function C(n,r){let i=t.update(b);_.defines.VSM_SAMPLES!==n.blurSamples&&(_.defines.VSM_SAMPLES=n.blurSamples,v.defines.VSM_SAMPLES=n.blurSamples,_.needsUpdate=!0,v.needsUpdate=!0),n.mapPass===null?n.mapPass=new Yt(a.x,a.y,{format:k,type:g}):(n.mapPass.width!==n.map.width||n.mapPass.height!==n.map.height)&&n.mapPass.setSize(n.map.width,n.map.height),_.uniforms.shadow_pass.value=n.map.depthTexture,_.uniforms.resolution.value.set(n.map.width,n.map.height),_.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,i,_,b,null),v.uniforms.shadow_pass.value=n.mapPass.texture,v.uniforms.resolution.value.set(n.map.width,n.map.height),v.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,i,v,b,null)}function w(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?u:l,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=d[e];r===void 0&&(r={},d[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,D)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?p[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function E(n,r,a,o,s,c){if(n.visible===!1)return;if(n.layers.test(s)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&c===3)&&(!n.frustumCulled||n.intersectsFrustum(i))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let i=t.update(n),s=n.material;if(Array.isArray(s)){let t=i.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=s[u.materialIndex];if(d&&d.visible){let t=w(n,d,o,c);n.onBeforeShadow(e,n,r,a,i,t,u),e.renderBufferDirect(a,null,i,t,n,u),n.onAfterShadow(e,n,r,a,i,t,u)}}}else if(s.visible){let t=w(n,s,o,c);n.onBeforeShadow(e,n,r,a,i,t,null),e.renderBufferDirect(a,null,i,t,n,null),n.onAfterShadow(e,n,r,a,i,t,null)}}let l=n.children;for(let e=0,t=l.length;e<t;e++)E(l[e],r,a,o,s,c)}function D(e){e.target.removeEventListener(`dispose`,D);for(let t in d){let n=d[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function tl(e,t){function n(){let t=!1,n=new qt,r=null,i=new qt(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?F(e.DEPTH_TEST):le(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=et[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?F(e.STENCIL_TEST):le(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c={},l=new WeakMap,u={},d={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new K(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,ee=null,j=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),te=!1,M=0,ne=e.getParameter(e.VERSION);ne.indexOf(`WebGL`)===-1?ne.indexOf(`OpenGL ES`)!==-1&&(M=parseFloat(/^OpenGL ES (\d)/.exec(ne)[1]),te=M>=2):(M=parseFloat(/^WebGL (\d)/.exec(ne)[1]),te=M>=1);let N=null,re={},P=e.getParameter(e.SCISSOR_BOX),ie=e.getParameter(e.VIEWPORT),ae=new qt().fromArray(P),oe=new qt().fromArray(ie);function se(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let ce={};ce[e.TEXTURE_2D]=se(e.TEXTURE_2D,e.TEXTURE_2D,1),ce[e.TEXTURE_CUBE_MAP]=se(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),ce[e.TEXTURE_2D_ARRAY]=se(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),ce[e.TEXTURE_3D]=se(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),F(e.DEPTH_TEST),o.setFunc(3),_e(!1),ve(1),F(e.CULL_FACE),he(0);function F(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function le(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function ue(t,n){return f[t]!==n&&(e.bindFramebuffer(t,n),f[t]=n,t===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=n),!0)}function de(t,n){let r=m,i=!1;if(t){r=p.get(n),r===void 0&&(r=[],p.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function fe(t){return h!==t&&(e.useProgram(t),h=t,!0)}let pe={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};pe[103]=e.MIN,pe[104]=e.MAX;let me={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function he(t,n,r,i,a,o,s,c,l,u){if(t===0)g===!0&&(le(e.BLEND),g=!1);else if(g===!1&&(F(e.BLEND),g=!0),t!==5){if(t!==_||u!==E){if((v!==100||x!==100)&&(e.blendEquation(e.FUNC_ADD),v=100,x=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:V(`WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:V(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:V(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:V(`WebGLState: Invalid blending: `,t)}y=null,b=null,S=null,C=null,w.set(0,0,0),T=0,_=t,E=u}}else a||=n,o||=r,s||=i,(n!==v||a!==x)&&(e.blendEquationSeparate(pe[n],pe[a]),v=n,x=a),(r!==y||i!==b||o!==S||s!==C)&&(e.blendFuncSeparate(me[r],me[i],me[o],me[s]),y=r,b=i,S=o,C=s),(c.equals(w)===!1||l!==T)&&(e.blendColor(c.r,c.g,c.b,l),w.copy(c),T=l),_=t,E=!1}function ge(t,n){t.side===2?le(e.CULL_FACE):F(e.CULL_FACE);let r=t.side===1;n&&(r=!r),_e(r),t.blending===1&&t.transparent===!1?he(0):he(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),be(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?F(e.SAMPLE_ALPHA_TO_COVERAGE):le(e.SAMPLE_ALPHA_TO_COVERAGE)}function _e(t){D!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),D=t)}function ve(t){t===0?le(e.CULL_FACE):(F(e.CULL_FACE),t!==O&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),O=t}function ye(t){t!==k&&(te&&e.lineWidth(t),k=t)}function be(t,n,r){t?(F(e.POLYGON_OFFSET_FILL),(A!==n||ee!==r)&&(A=n,ee=r,o.getReversed()&&(n=-n,r=-r),e.polygonOffset(n,r))):le(e.POLYGON_OFFSET_FILL)}function xe(t){t?F(e.SCISSOR_TEST):le(e.SCISSOR_TEST)}function Se(t){t===void 0&&(t=e.TEXTURE0+j-1),N!==t&&(e.activeTexture(t),N=t)}function Ce(t,n,r){r===void 0&&(r=N===null?e.TEXTURE0+j-1:N);let i=re[r];i===void 0&&(i={type:void 0,texture:void 0},re[r]=i),(i.type!==t||i.texture!==n)&&(N!==r&&(e.activeTexture(r),N=r),e.bindTexture(t,n||ce[t]),i.type=t,i.texture=n)}function we(){let t=re[N];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function Te(){try{e.compressedTexImage2D(...arguments)}catch(e){V(`WebGLState:`,e)}}function Ee(){try{e.compressedTexImage3D(...arguments)}catch(e){V(`WebGLState:`,e)}}function De(){try{e.texSubImage2D(...arguments)}catch(e){V(`WebGLState:`,e)}}function Oe(){try{e.texSubImage3D(...arguments)}catch(e){V(`WebGLState:`,e)}}function ke(){try{e.compressedTexSubImage2D(...arguments)}catch(e){V(`WebGLState:`,e)}}function Ae(){try{e.compressedTexSubImage3D(...arguments)}catch(e){V(`WebGLState:`,e)}}function je(){try{e.texStorage2D(...arguments)}catch(e){V(`WebGLState:`,e)}}function Me(){try{e.texStorage3D(...arguments)}catch(e){V(`WebGLState:`,e)}}function Ne(){try{e.texImage2D(...arguments)}catch(e){V(`WebGLState:`,e)}}function I(){try{e.texImage3D(...arguments)}catch(e){V(`WebGLState:`,e)}}function Pe(t){return d[t]===void 0?e.getParameter(t):d[t]}function Fe(t,n){d[t]!==n&&(e.pixelStorei(t,n),d[t]=n)}function Ie(t){ae.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),ae.copy(t))}function L(t){oe.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),oe.copy(t))}function Le(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),e.uniformBlockBinding(n,i,i),r.set(t,i))}function R(t,n,r){let i=l.get(n).get(t);c[i]!==r&&(e.bindBufferBase(e.UNIFORM_BUFFER,i,r),c[i]=r)}function Re(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},d={},N=null,re={},f={},c={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new K(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,ee=null,ae.set(0,0,e.canvas.width,e.canvas.height),oe.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:F,disable:le,bindFramebuffer:ue,drawBuffers:de,useProgram:fe,setBlending:he,setMaterial:ge,setFlipSided:_e,setCullFace:ve,setLineWidth:ye,setPolygonOffset:be,setScissorTest:xe,activeTexture:Se,bindTexture:Ce,unbindTexture:we,compressedTexImage2D:Te,compressedTexImage3D:Ee,texImage2D:Ne,texImage3D:I,pixelStorei:Fe,getParameter:Pe,updateUBOMapping:Le,uniformBlockBinding:R,texStorage2D:je,texStorage3D:Me,texSubImage2D:De,texSubImage3D:Oe,compressedTexSubImage2D:ke,compressedTexSubImage3D:Ae,scissor:Ie,viewport:L,reset:Re}}function nl(l,u,d,f,p,m,h){let g=u.has(`WEBGL_multisampled_render_to_texture`)?u.get(`WEBGL_multisampled_render_to_texture`):null,_=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),v=new U,y=new WeakMap,b=new Set,x,S=new WeakMap,C=new Set,w=new FinalizationRegistry(e=>C.delete(e)),T=!1;try{T=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function D(e,t){return T?new OffscreenCanvas(e,t):qe(`canvas`)}function O(e,t,n){let r=1,i=Re(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);x===void 0&&(x=D(n,a));let o=t?D(n,a):x;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),B(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}return`data`in e&&B(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e}return e}function k(e){return e.generateMipmaps}function A(e){l.generateMipmap(e)}function ee(e){return e.isWebGLCubeRenderTarget?l.TEXTURE_CUBE_MAP:e.isWebGL3DRenderTarget?l.TEXTURE_3D:e.isWebGLArrayRenderTarget||e.isCompressedArrayTexture?l.TEXTURE_2D_ARRAY:l.TEXTURE_2D}function j(e,t,n,r,i,a=!1){if(e!==null){if(l[e]!==void 0)return l[e];B(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+e+`'`)}let o;r&&(o=u.get(`EXT_texture_norm16`),o||B(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let s=t;if(t===l.RED&&(n===l.FLOAT&&(s=l.R32F),n===l.HALF_FLOAT&&(s=l.R16F),n===l.UNSIGNED_BYTE&&(s=l.R8),n===l.UNSIGNED_SHORT&&o&&(s=o.R16_EXT),n===l.SHORT&&o&&(s=o.R16_SNORM_EXT)),t===l.RED_INTEGER&&(n===l.UNSIGNED_BYTE&&(s=l.R8UI),n===l.UNSIGNED_SHORT&&(s=l.R16UI),n===l.UNSIGNED_INT&&(s=l.R32UI),n===l.BYTE&&(s=l.R8I),n===l.SHORT&&(s=l.R16I),n===l.INT&&(s=l.R32I)),t===l.RG&&(n===l.FLOAT&&(s=l.RG32F),n===l.HALF_FLOAT&&(s=l.RG16F),n===l.UNSIGNED_BYTE&&(s=l.RG8),n===l.UNSIGNED_SHORT&&o&&(s=o.RG16_EXT),n===l.SHORT&&o&&(s=o.RG16_SNORM_EXT)),t===l.RG_INTEGER&&(n===l.UNSIGNED_BYTE&&(s=l.RG8UI),n===l.UNSIGNED_SHORT&&(s=l.RG16UI),n===l.UNSIGNED_INT&&(s=l.RG32UI),n===l.BYTE&&(s=l.RG8I),n===l.SHORT&&(s=l.RG16I),n===l.INT&&(s=l.RG32I)),t===l.RGB_INTEGER&&(n===l.UNSIGNED_BYTE&&(s=l.RGB8UI),n===l.UNSIGNED_SHORT&&(s=l.RGB16UI),n===l.UNSIGNED_INT&&(s=l.RGB32UI),n===l.BYTE&&(s=l.RGB8I),n===l.SHORT&&(s=l.RGB16I),n===l.INT&&(s=l.RGB32I)),t===l.RGBA_INTEGER&&(n===l.UNSIGNED_BYTE&&(s=l.RGBA8UI),n===l.UNSIGNED_SHORT&&(s=l.RGBA16UI),n===l.UNSIGNED_INT&&(s=l.RGBA32UI),n===l.BYTE&&(s=l.RGBA8I),n===l.SHORT&&(s=l.RGBA16I),n===l.INT&&(s=l.RGBA32I)),t===l.RGB&&(n===l.UNSIGNED_SHORT&&o&&(s=o.RGB16_EXT),n===l.SHORT&&o&&(s=o.RGB16_SNORM_EXT),n===l.UNSIGNED_INT_5_9_9_9_REV&&(s=l.RGB9_E5),n===l.UNSIGNED_INT_10F_11F_11F_REV&&(s=l.R11F_G11F_B10F)),t===l.RGBA){let e=a?ze:It.getTransfer(i);n===l.FLOAT&&(s=l.RGBA32F),n===l.HALF_FLOAT&&(s=l.RGBA16F),n===l.UNSIGNED_BYTE&&(s=e===`srgb`?l.SRGB8_ALPHA8:l.RGBA8),n===l.UNSIGNED_SHORT&&o&&(s=o.RGBA16_EXT),n===l.SHORT&&o&&(s=o.RGBA16_SNORM_EXT),n===l.UNSIGNED_SHORT_4_4_4_4&&(s=l.RGBA4),n===l.UNSIGNED_SHORT_5_5_5_1&&(s=l.RGB5_A1)}return(s===l.R16F||s===l.R32F||s===l.RG16F||s===l.RG32F||s===l.RGBA16F||s===l.RGBA32F)&&u.get(`EXT_color_buffer_float`),s}function te(e,t){let n;return e?t===null||t===1014||t===1020?n=l.DEPTH24_STENCIL8:t===1015?n=l.DEPTH32F_STENCIL8:t===1012&&(n=l.DEPTH24_STENCIL8,B(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):t===null||t===1014||t===1020?n=l.DEPTH_COMPONENT24:t===1015?n=l.DEPTH_COMPONENT32F:t===1012&&(n=l.DEPTH_COMPONENT16),n}function M(e,t){return k(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function ne(e){let t=new WeakRef(e);f.get(e).__ref=t,C.add(t),w.register(e,t,t)}function N(e){let t=f.get(e).__ref;t!==void 0&&(C.delete(t),w.unregister(t))}function re(e){ie(e.target)}function P(e){ae(e.target)}function ie(e){e.removeEventListener(`dispose`,re),N(e),se(e),e.isVideoTexture&&y.delete(e),e.isHTMLTexture&&b.delete(e)}function ae(e){e.removeEventListener(`dispose`,P),N(e),F(e)}function oe(){for(let e of C){let t=e.deref();t!==void 0&&(t.isRenderTarget===!0?ae(t):ie(t))}C.clear(),b.clear()}function se(e){let t=f.get(e);if(t.__webglInit===void 0)return;let n=e.source,r=S.get(n);if(r){let i=r[t.__cacheKey];i.usedTimes--,i.usedTimes===0&&ce(e),Object.keys(r).length===0&&S.delete(n)}f.remove(e)}function ce(e){let t=f.get(e);l.deleteTexture(t.__webglTexture);let n=e.source,r=S.get(n);delete r[t.__cacheKey],h.memory.textures--}function F(e){let t=f.get(e);t.__depthDisposeCallback&&t.__depthDisposeCallback();let n=e.depthTexture;if(n&&n.renderTarget===e&&ie(n),e.isWebGLCubeRenderTarget)for(let e=0;e<6;e++){if(Array.isArray(t.__webglFramebuffer[e]))for(let n=0;n<t.__webglFramebuffer[e].length;n++)l.deleteFramebuffer(t.__webglFramebuffer[e][n]);else l.deleteFramebuffer(t.__webglFramebuffer[e]);t.__webglDepthbuffer&&l.deleteRenderbuffer(t.__webglDepthbuffer[e])}else{if(Array.isArray(t.__webglFramebuffer))for(let e=0;e<t.__webglFramebuffer.length;e++)l.deleteFramebuffer(t.__webglFramebuffer[e]);else l.deleteFramebuffer(t.__webglFramebuffer);if(t.__webglDepthbuffer&&l.deleteRenderbuffer(t.__webglDepthbuffer),t.__webglMultisampledFramebuffer&&l.deleteFramebuffer(t.__webglMultisampledFramebuffer),t.__webglColorRenderbuffer)for(let e=0;e<t.__webglColorRenderbuffer.length;e++)t.__webglColorRenderbuffer[e]&&l.deleteRenderbuffer(t.__webglColorRenderbuffer[e]);t.__webglDepthRenderbuffer&&l.deleteRenderbuffer(t.__webglDepthRenderbuffer)}let r=e.textures;for(let e=0,t=r.length;e<t;e++){let t=f.get(r[e]);t.__webglTexture&&(l.deleteTexture(t.__webglTexture),h.memory.textures--),f.remove(r[e])}f.remove(e)}let le=0;function ue(){le=0}function de(){return le}function fe(e){le=e}function pe(){let e=le;return e>=p.maxTextures&&B(`WebGLTextures: Trying to use `+(e+1)+` texture units while this GPU supports only `+p.maxTextures),le+=1,e}function me(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.mipmapsAutoUpdate),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function he(e,t){let n=f.get(e);if(e.isVideoTexture&&Le(e),e.isRenderTargetTexture===!1&&e.isExternalTexture!==!0&&e.version>0&&n.__version!==e.version){let r=e.image;if(r===null)B(`WebGLRenderer: Texture marked for update but no image data found.`);else if(r.complete===!1)B(`WebGLRenderer: Texture marked for update but image is incomplete`);else{Ee(n,e,t);return}}else e.isExternalTexture&&(n.__webglTexture=e.sourceTexture?e.sourceTexture:null);d.bindTexture(l.TEXTURE_2D,n.__webglTexture,l.TEXTURE0+t)}function ge(e,t){let n=f.get(e);e.isRenderTargetTexture===!1&&e.version>0&&n.__version!==e.version?Ee(n,e,t):(e.isExternalTexture&&(n.__webglTexture=e.sourceTexture?e.sourceTexture:null),d.bindTexture(l.TEXTURE_2D_ARRAY,n.__webglTexture,l.TEXTURE0+t))}function _e(e,t){let n=f.get(e);e.isRenderTargetTexture===!1&&e.version>0&&n.__version!==e.version?Ee(n,e,t):d.bindTexture(l.TEXTURE_3D,n.__webglTexture,l.TEXTURE0+t)}function ve(e,t){let n=f.get(e);e.version>0&&n.__version!==e.version?De(n,e,t):d.bindTexture(l.TEXTURE_CUBE_MAP,n.__webglTexture,l.TEXTURE0+t)}let ye={[e]:l.REPEAT,[t]:l.CLAMP_TO_EDGE,[n]:l.MIRRORED_REPEAT},be={[r]:l.NEAREST,[i]:l.NEAREST_MIPMAP_NEAREST,[a]:l.NEAREST_MIPMAP_LINEAR,[o]:l.LINEAR,[s]:l.LINEAR_MIPMAP_NEAREST,[c]:l.LINEAR_MIPMAP_LINEAR},xe={512:l.NEVER,519:l.ALWAYS,513:l.LESS,515:l.LEQUAL,514:l.EQUAL,518:l.GEQUAL,516:l.GREATER,517:l.NOTEQUAL};function Se(e,t){if(t.type===1015&&u.has(`OES_texture_float_linear`)===!1&&(t.magFilter===1006||t.magFilter===1007||t.magFilter===1005||t.magFilter===1008||t.minFilter===1006||t.minFilter===1007||t.minFilter===1005||t.minFilter===1008)&&B(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),l.texParameteri(e,l.TEXTURE_WRAP_S,ye[t.wrapS]),l.texParameteri(e,l.TEXTURE_WRAP_T,ye[t.wrapT]),(e===l.TEXTURE_3D||e===l.TEXTURE_2D_ARRAY)&&l.texParameteri(e,l.TEXTURE_WRAP_R,ye[t.wrapR]),l.texParameteri(e,l.TEXTURE_MAG_FILTER,be[t.magFilter]),l.texParameteri(e,l.TEXTURE_MIN_FILTER,be[t.minFilter]),t.compareFunction&&(l.texParameteri(e,l.TEXTURE_COMPARE_MODE,l.COMPARE_REF_TO_TEXTURE),l.texParameteri(e,l.TEXTURE_COMPARE_FUNC,xe[t.compareFunction])),u.has(`EXT_texture_filter_anisotropic`)===!0){if(t.magFilter===1003||t.minFilter!==1005&&t.minFilter!==1008||t.type===1015&&u.has(`OES_texture_float_linear`)===!1)return;if(t.anisotropy>1||f.get(t).__currentAnisotropy){let n=u.get(`EXT_texture_filter_anisotropic`);l.texParameterf(e,n.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(t.anisotropy,p.getMaxAnisotropy())),f.get(t).__currentAnisotropy=t.anisotropy}}}function Ce(e,t){let n=!1;e.__webglInit===void 0&&(e.__webglInit=!0,t.addEventListener(`dispose`,re),ne(t));let r=t.source,i=S.get(r);i===void 0&&(i={},S.set(r,i));let a=me(t);if(a!==e.__cacheKey){i[a]===void 0&&(i[a]={texture:l.createTexture(),usedTimes:0},h.memory.textures++,n=!0),i[a].usedTimes++;let r=i[e.__cacheKey];r!==void 0&&(i[e.__cacheKey].usedTimes--,r.usedTimes===0&&ce(t)),e.__cacheKey=a,e.__webglTexture=i[a].texture}return n}function we(e,t,n){return Math.floor(Math.floor(e/n)/t)}function Te(e,t,n,r){let i=e.updateRanges;if(i.length===0)d.texSubImage2D(l.TEXTURE_2D,0,0,0,t.width,t.height,n,r,t.data);else{i.sort((e,t)=>e.start-t.start);let a=0;for(let e=1;e<i.length;e++){let n=i[a],r=i[e],o=n.start+n.count,s=we(r.start,t.width,4),c=we(n.start,t.width,4);r.start<=o+1&&s===c&&we(r.start+r.count-1,t.width,4)===s?n.count=Math.max(n.count,r.start+r.count-n.start):(++a,i[a]=r)}i.length=a+1;let o=d.getParameter(l.UNPACK_ROW_LENGTH),s=d.getParameter(l.UNPACK_SKIP_PIXELS),c=d.getParameter(l.UNPACK_SKIP_ROWS);d.pixelStorei(l.UNPACK_ROW_LENGTH,t.width);for(let e=0,a=i.length;e<a;e++){let a=i[e],o=Math.floor(a.start/4),s=Math.ceil(a.count/4),c=o%t.width,u=Math.floor(o/t.width),f=s;d.pixelStorei(l.UNPACK_SKIP_PIXELS,c),d.pixelStorei(l.UNPACK_SKIP_ROWS,u),d.texSubImage2D(l.TEXTURE_2D,0,c,u,f,1,n,r,t.data)}e.clearUpdateRanges(),d.pixelStorei(l.UNPACK_ROW_LENGTH,o),d.pixelStorei(l.UNPACK_SKIP_PIXELS,s),d.pixelStorei(l.UNPACK_SKIP_ROWS,c)}}function Ee(e,t,n){let r=l.TEXTURE_2D;(t.isDataArrayTexture||t.isCompressedArrayTexture)&&(r=l.TEXTURE_2D_ARRAY),t.isData3DTexture&&(r=l.TEXTURE_3D);let i=Ce(e,t),a=t.source;d.bindTexture(r,e.__webglTexture,l.TEXTURE0+n);let o=f.get(a);if(a.version!==o.__version||i===!0){if(d.activeTexture(l.TEXTURE0+n),!(typeof ImageBitmap<`u`&&t.image instanceof ImageBitmap)){let e=It.getPrimaries(It.workingColorSpace),n=t.colorSpace===``?null:It.getPrimaries(t.colorSpace),r=t.colorSpace===``||e===n?l.NONE:l.BROWSER_DEFAULT_WEBGL;d.pixelStorei(l.UNPACK_FLIP_Y_WEBGL,t.flipY),d.pixelStorei(l.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),d.pixelStorei(l.UNPACK_COLORSPACE_CONVERSION_WEBGL,r)}d.pixelStorei(l.UNPACK_ALIGNMENT,t.unpackAlignment);let e=O(t.image,!1,p.maxTextureSize);e=R(t,e);let s=m.convert(t.format,t.colorSpace),c=m.convert(t.type),u=j(t.internalFormat,s,c,t.normalized,t.colorSpace,t.isVideoTexture);Se(r,t);let f,h=t.mipmaps,g=t.isVideoTexture!==!0,_=o.__version===void 0||i===!0,v=a.dataReady,y=M(t,e);if(t.isDepthTexture)u=te(t.format===E,t.type),_&&(g?d.texStorage2D(l.TEXTURE_2D,1,u,e.width,e.height):d.texImage2D(l.TEXTURE_2D,0,u,e.width,e.height,0,s,c,null));else if(t.isDataTexture){if(h.length>0){g&&_&&d.texStorage2D(l.TEXTURE_2D,y,u,h[0].width,h[0].height);for(let e=0,t=h.length;e<t;e++)f=h[e],g?v&&d.texSubImage2D(l.TEXTURE_2D,e,0,0,f.width,f.height,s,c,f.data):d.texImage2D(l.TEXTURE_2D,e,u,f.width,f.height,0,s,c,f.data);t.generateMipmaps=!1}else g?(_&&d.texStorage2D(l.TEXTURE_2D,y,u,e.width,e.height),v&&Te(t,e,s,c)):d.texImage2D(l.TEXTURE_2D,0,u,e.width,e.height,0,s,c,e.data)}else if(t.isCompressedTexture){if(t.isCompressedArrayTexture){g&&_&&d.texStorage3D(l.TEXTURE_2D_ARRAY,y,u,h[0].width,h[0].height,e.depth);for(let n=0,r=h.length;n<r;n++)if(f=h[n],t.format!==1023){if(s!==null){if(g){if(v){if(t.layerUpdates.size>0){let e=ro(f.width,f.height,t.format,t.type);for(let r of t.layerUpdates){let t=f.data.subarray(r*e/f.data.BYTES_PER_ELEMENT,(r+1)*e/f.data.BYTES_PER_ELEMENT);d.compressedTexSubImage3D(l.TEXTURE_2D_ARRAY,n,0,0,r,f.width,f.height,1,s,t)}}else d.compressedTexSubImage3D(l.TEXTURE_2D_ARRAY,n,0,0,0,f.width,f.height,e.depth,s,f.data)}}else d.compressedTexImage3D(l.TEXTURE_2D_ARRAY,n,u,f.width,f.height,e.depth,0,f.data,0,0)}else B(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else g?v&&d.texSubImage3D(l.TEXTURE_2D_ARRAY,n,0,0,0,f.width,f.height,e.depth,s,c,f.data):d.texImage3D(l.TEXTURE_2D_ARRAY,n,u,f.width,f.height,e.depth,0,s,c,f.data);t.layerUpdates.size>0&&t.clearLayerUpdates()}else{g&&_&&d.texStorage2D(l.TEXTURE_2D,y,u,h[0].width,h[0].height);for(let e=0,n=h.length;e<n;e++)f=h[e],t.format===1023?g?v&&d.texSubImage2D(l.TEXTURE_2D,e,0,0,f.width,f.height,s,c,f.data):d.texImage2D(l.TEXTURE_2D,e,u,f.width,f.height,0,s,c,f.data):s===null?B(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):g?v&&d.compressedTexSubImage2D(l.TEXTURE_2D,e,0,0,f.width,f.height,s,f.data):d.compressedTexImage2D(l.TEXTURE_2D,e,u,f.width,f.height,0,f.data)}}else if(t.isDataArrayTexture){if(g){if(_&&d.texStorage3D(l.TEXTURE_2D_ARRAY,y,u,e.width,e.height,e.depth),v){if(t.layerUpdates.size>0){let n=ro(e.width,e.height,t.format,t.type);for(let r of t.layerUpdates){let t=e.data.subarray(r*n/e.data.BYTES_PER_ELEMENT,(r+1)*n/e.data.BYTES_PER_ELEMENT);d.texSubImage3D(l.TEXTURE_2D_ARRAY,0,0,0,r,e.width,e.height,1,s,c,t)}t.clearLayerUpdates()}else d.texSubImage3D(l.TEXTURE_2D_ARRAY,0,0,0,0,e.width,e.height,e.depth,s,c,e.data)}}else d.texImage3D(l.TEXTURE_2D_ARRAY,0,u,e.width,e.height,e.depth,0,s,c,e.data)}else if(t.isData3DTexture)g?(_&&d.texStorage3D(l.TEXTURE_3D,y,u,e.width,e.height,e.depth),v&&d.texSubImage3D(l.TEXTURE_3D,0,0,0,0,e.width,e.height,e.depth,s,c,e.data)):d.texImage3D(l.TEXTURE_3D,0,u,e.width,e.height,e.depth,0,s,c,e.data);else if(t.isFramebufferTexture){if(_){if(g)d.texStorage2D(l.TEXTURE_2D,y,u,e.width,e.height);else{let t=e.width,n=e.height;for(let e=0;e<y;e++)d.texImage2D(l.TEXTURE_2D,e,u,t,n,0,s,c,null),t>>=1,n>>=1}}}else if(t.isHTMLTexture){if(`texElementImage2D`in l){let n=l.canvas;if(n.hasAttribute(`layoutsubtree`)||n.setAttribute(`layoutsubtree`,`true`),e.parentNode!==n){n.appendChild(e),b.add(t),n.onpaint=e=>{let t=e.changedElements;for(let e of b)t.includes(e.image)&&(e.needsUpdate=!0)},n.requestPaint();return}if(l.texElementImage2D.length===3)l.texElementImage2D(l.TEXTURE_2D,l.RGBA8,e);else{let t=l.RGBA,n=l.RGBA,r=l.UNSIGNED_BYTE;l.texElementImage2D(l.TEXTURE_2D,0,t,n,r,e)}l.texParameteri(l.TEXTURE_2D,l.TEXTURE_MIN_FILTER,l.LINEAR),l.texParameteri(l.TEXTURE_2D,l.TEXTURE_WRAP_S,l.CLAMP_TO_EDGE),l.texParameteri(l.TEXTURE_2D,l.TEXTURE_WRAP_T,l.CLAMP_TO_EDGE)}}else if(h.length>0){if(g&&_){let e=Re(h[0]);d.texStorage2D(l.TEXTURE_2D,y,u,e.width,e.height)}for(let e=0,t=h.length;e<t;e++)f=h[e],g?v&&d.texSubImage2D(l.TEXTURE_2D,e,0,0,s,c,f):d.texImage2D(l.TEXTURE_2D,e,u,s,c,f);t.generateMipmaps=!1}else if(g){if(_){let t=Re(e);d.texStorage2D(l.TEXTURE_2D,y,u,t.width,t.height)}v&&d.texSubImage2D(l.TEXTURE_2D,0,0,0,s,c,e)}else d.texImage2D(l.TEXTURE_2D,0,u,s,c,e);k(t)&&t.mipmapsAutoUpdate===!0&&A(r),o.__version=a.version,t.onUpdate&&t.onUpdate(t)}e.__version=t.version}function De(e,t,n){if(t.image.length!==6)return;let r=Ce(e,t),i=t.source;d.bindTexture(l.TEXTURE_CUBE_MAP,e.__webglTexture,l.TEXTURE0+n);let a=f.get(i);if(i.version!==a.__version||r===!0){d.activeTexture(l.TEXTURE0+n);let e=It.getPrimaries(It.workingColorSpace),o=t.colorSpace===``?null:It.getPrimaries(t.colorSpace),s=t.colorSpace===``||e===o?l.NONE:l.BROWSER_DEFAULT_WEBGL;d.pixelStorei(l.UNPACK_FLIP_Y_WEBGL,t.flipY),d.pixelStorei(l.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),d.pixelStorei(l.UNPACK_ALIGNMENT,t.unpackAlignment),d.pixelStorei(l.UNPACK_COLORSPACE_CONVERSION_WEBGL,s);let c=t.isCompressedTexture||t.image[0].isCompressedTexture,u=t.image[0]&&t.image[0].isDataTexture,f=[];for(let e=0;e<6;e++)!c&&!u?f[e]=O(t.image[e],!0,p.maxCubemapSize):f[e]=u?t.image[e].image:t.image[e],f[e]=R(t,f[e]);let h=f[0],g=m.convert(t.format,t.colorSpace),_=m.convert(t.type),v=j(t.internalFormat,g,_,t.normalized,t.colorSpace),y=t.isVideoTexture!==!0,b=a.__version===void 0||r===!0,x=i.dataReady,S=M(t,h);Se(l.TEXTURE_CUBE_MAP,t);let C;if(t.isDepthTexture){if(v=te(t.format===E,t.type),b){if(y)d.texStorage2D(l.TEXTURE_CUBE_MAP,1,v,h.width,h.height);else for(let e=0;e<6;e++)d.texImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,0,v,h.width,h.height,0,g,_,null)}}else if(c){y&&b&&d.texStorage2D(l.TEXTURE_CUBE_MAP,S,v,h.width,h.height);for(let e=0;e<6;e++){C=f[e].mipmaps;for(let n=0;n<C.length;n++){let r=C[n];t.format===1023?y?x&&d.texSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,n,0,0,r.width,r.height,g,_,r.data):d.texImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,n,v,r.width,r.height,0,g,_,r.data):g===null?B(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):y?x&&d.compressedTexSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,n,0,0,r.width,r.height,g,r.data):d.compressedTexImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,n,v,r.width,r.height,0,r.data)}}}else{if(C=t.mipmaps,y&&b){C.length>0&&S++;let e=Re(f[0]);d.texStorage2D(l.TEXTURE_CUBE_MAP,S,v,e.width,e.height)}for(let e=0;e<6;e++)if(u){y?x&&d.texSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,0,0,0,f[e].width,f[e].height,g,_,f[e].data):d.texImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,0,v,f[e].width,f[e].height,0,g,_,f[e].data);for(let t=0;t<C.length;t++){let n=C[t].image[e].image;y?x&&d.texSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,t+1,0,0,n.width,n.height,g,_,n.data):d.texImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,t+1,v,n.width,n.height,0,g,_,n.data)}}else{y?x&&d.texSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,0,0,0,g,_,f[e]):d.texImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,0,v,g,_,f[e]);for(let t=0;t<C.length;t++){let n=C[t];y?x&&d.texSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,t+1,0,0,g,_,n.image[e]):d.texImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,t+1,v,g,_,n.image[e])}}}k(t)&&t.mipmapsAutoUpdate===!0&&A(l.TEXTURE_CUBE_MAP),a.__version=i.version,t.onUpdate&&t.onUpdate(t)}e.__version=t.version}function Oe(e,t,n,r,i,a){let o=m.convert(n.format,n.colorSpace),s=m.convert(n.type),c=j(n.internalFormat,o,s,n.normalized,n.colorSpace),u=f.get(t),p=f.get(n);if(p.__renderTarget=t,!u.__hasExternalTextures){let e=Math.max(1,t.width>>a),n=Math.max(1,t.height>>a);i===l.TEXTURE_3D||i===l.TEXTURE_2D_ARRAY?d.texImage3D(i,a,c,e,n,t.depth,0,o,s,null):d.texImage2D(i,a,c,e,n,0,o,s,null)}d.bindFramebuffer(l.FRAMEBUFFER,e),L(t)?g.framebufferTexture2DMultisampleEXT(l.FRAMEBUFFER,r,i,p.__webglTexture,0,Ie(t)):(i===l.TEXTURE_2D||i>=l.TEXTURE_CUBE_MAP_POSITIVE_X&&i<=l.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&l.framebufferTexture2D(l.FRAMEBUFFER,r,i,p.__webglTexture,a),d.bindFramebuffer(l.FRAMEBUFFER,null)}function ke(e,t,n){if(l.bindRenderbuffer(l.RENDERBUFFER,e),t.depthBuffer){let r=t.depthTexture,i=r&&r.isDepthTexture?r.type:null,a=te(t.stencilBuffer,i),o=t.stencilBuffer?l.DEPTH_STENCIL_ATTACHMENT:l.DEPTH_ATTACHMENT;L(t)?g.renderbufferStorageMultisampleEXT(l.RENDERBUFFER,Ie(t),a,t.width,t.height):n?l.renderbufferStorageMultisample(l.RENDERBUFFER,Ie(t),a,t.width,t.height):l.renderbufferStorage(l.RENDERBUFFER,a,t.width,t.height),l.framebufferRenderbuffer(l.FRAMEBUFFER,o,l.RENDERBUFFER,e)}else{let e=t.textures;for(let r=0;r<e.length;r++){let i=e[r],a=m.convert(i.format,i.colorSpace),o=m.convert(i.type),s=j(i.internalFormat,a,o,i.normalized,i.colorSpace);L(t)?g.renderbufferStorageMultisampleEXT(l.RENDERBUFFER,Ie(t),s,t.width,t.height):n?l.renderbufferStorageMultisample(l.RENDERBUFFER,Ie(t),s,t.width,t.height):l.renderbufferStorage(l.RENDERBUFFER,s,t.width,t.height)}}l.bindRenderbuffer(l.RENDERBUFFER,null)}function Ae(e,t,n){let r=t.isWebGLCubeRenderTarget===!0;if(d.bindFramebuffer(l.FRAMEBUFFER,e),!(t.depthTexture&&t.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let i=f.get(t.depthTexture);i.__renderTarget=t;let a=r?t.depthTexture.image[0]:t.depthTexture.image;i.__webglTexture&&a.width===t.width&&a.height===t.height||(a.width=t.width,a.height=t.height,t.depthTexture.needsUpdate=!0),r?ve(t.depthTexture,0):he(t.depthTexture,0);let o=i.__webglTexture,s=Ie(t),c=r?l.TEXTURE_CUBE_MAP_POSITIVE_X+n:l.TEXTURE_2D,u=t.depthTexture.format===1027?l.DEPTH_STENCIL_ATTACHMENT:l.DEPTH_ATTACHMENT;if(t.depthTexture.format===1026)L(t)?g.framebufferTexture2DMultisampleEXT(l.FRAMEBUFFER,u,c,o,0,s):l.framebufferTexture2D(l.FRAMEBUFFER,u,c,o,0);else if(t.depthTexture.format===1027)L(t)?g.framebufferTexture2DMultisampleEXT(l.FRAMEBUFFER,u,c,o,0,s):l.framebufferTexture2D(l.FRAMEBUFFER,u,c,o,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function je(e){let t=f.get(e),n=e.isWebGLCubeRenderTarget===!0;if(t.__boundDepthTexture!==e.depthTexture){let n=e.depthTexture;if(t.__depthDisposeCallback&&t.__depthDisposeCallback(),n){let e=()=>{delete t.__boundDepthTexture,delete t.__depthDisposeCallback,n.removeEventListener(`dispose`,e)};n.addEventListener(`dispose`,e),t.__depthDisposeCallback=e}t.__boundDepthTexture=n}if(e.depthTexture&&!t.__autoAllocateDepthBuffer){if(n)for(let n=0;n<6;n++)Ae(t.__webglFramebuffer[n],e,n);else e.texture.mipmaps.length>0?Ae(t.__webglFramebuffer[0],e,0):Ae(t.__webglFramebuffer,e,0)}else if(n){t.__webglDepthbuffer=[];for(let n=0;n<6;n++)if(d.bindFramebuffer(l.FRAMEBUFFER,t.__webglFramebuffer[n]),t.__webglDepthbuffer[n]===void 0)t.__webglDepthbuffer[n]=l.createRenderbuffer(),ke(t.__webglDepthbuffer[n],e,!1);else{let r=e.stencilBuffer?l.DEPTH_STENCIL_ATTACHMENT:l.DEPTH_ATTACHMENT,i=t.__webglDepthbuffer[n];l.bindRenderbuffer(l.RENDERBUFFER,i),l.framebufferRenderbuffer(l.FRAMEBUFFER,r,l.RENDERBUFFER,i)}}else if(e.texture.mipmaps.length>0?d.bindFramebuffer(l.FRAMEBUFFER,t.__webglFramebuffer[0]):d.bindFramebuffer(l.FRAMEBUFFER,t.__webglFramebuffer),t.__webglDepthbuffer===void 0)t.__webglDepthbuffer=l.createRenderbuffer(),ke(t.__webglDepthbuffer,e,!1);else{let n=e.stencilBuffer?l.DEPTH_STENCIL_ATTACHMENT:l.DEPTH_ATTACHMENT,r=t.__webglDepthbuffer;l.bindRenderbuffer(l.RENDERBUFFER,r),l.framebufferRenderbuffer(l.FRAMEBUFFER,n,l.RENDERBUFFER,r)}d.bindFramebuffer(l.FRAMEBUFFER,null)}function Me(e,t,n){let r=f.get(e);t!==void 0&&Oe(r.__webglFramebuffer,e,e.texture,l.COLOR_ATTACHMENT0,l.TEXTURE_2D,0),n!==void 0&&je(e)}function Ne(e){let t=e.texture,n=f.get(e),r=f.get(t);e.addEventListener(`dispose`,P),ne(e);let i=e.textures,a=e.isWebGLCubeRenderTarget===!0,o=i.length>1;if(o||(r.__webglTexture===void 0&&(r.__webglTexture=l.createTexture()),r.__version=t.version,h.memory.textures++),a){n.__webglFramebuffer=[];for(let e=0;e<6;e++)if(t.mipmaps.length>0){n.__webglFramebuffer[e]=[];for(let r=0;r<t.mipmaps.length;r++)n.__webglFramebuffer[e][r]=l.createFramebuffer()}else n.__webglFramebuffer[e]=l.createFramebuffer()}else{if(t.mipmaps.length>0){n.__webglFramebuffer=[];for(let e=0;e<t.mipmaps.length;e++)n.__webglFramebuffer[e]=l.createFramebuffer()}else n.__webglFramebuffer=l.createFramebuffer();if(o)for(let e=0,t=i.length;e<t;e++){let t=f.get(i[e]);t.__webglTexture===void 0&&(t.__webglTexture=l.createTexture(),h.memory.textures++)}if(e.samples>0&&L(e)===!1){n.__webglMultisampledFramebuffer=l.createFramebuffer(),n.__webglColorRenderbuffer=[],d.bindFramebuffer(l.FRAMEBUFFER,n.__webglMultisampledFramebuffer);for(let t=0;t<i.length;t++){let r=i[t];n.__webglColorRenderbuffer[t]=l.createRenderbuffer(),l.bindRenderbuffer(l.RENDERBUFFER,n.__webglColorRenderbuffer[t]);let a=m.convert(r.format,r.colorSpace),o=m.convert(r.type),s=j(r.internalFormat,a,o,r.normalized,r.colorSpace,e.isXRRenderTarget===!0),c=Ie(e);l.renderbufferStorageMultisample(l.RENDERBUFFER,c,s,e.width,e.height),l.framebufferRenderbuffer(l.FRAMEBUFFER,l.COLOR_ATTACHMENT0+t,l.RENDERBUFFER,n.__webglColorRenderbuffer[t])}l.bindRenderbuffer(l.RENDERBUFFER,null),e.depthBuffer&&(n.__webglDepthRenderbuffer=l.createRenderbuffer(),ke(n.__webglDepthRenderbuffer,e,!0)),d.bindFramebuffer(l.FRAMEBUFFER,null)}}if(a){d.bindTexture(l.TEXTURE_CUBE_MAP,r.__webglTexture),Se(l.TEXTURE_CUBE_MAP,t);for(let r=0;r<6;r++)if(t.mipmaps.length>0)for(let i=0;i<t.mipmaps.length;i++)Oe(n.__webglFramebuffer[r][i],e,t,l.COLOR_ATTACHMENT0,l.TEXTURE_CUBE_MAP_POSITIVE_X+r,i);else Oe(n.__webglFramebuffer[r],e,t,l.COLOR_ATTACHMENT0,l.TEXTURE_CUBE_MAP_POSITIVE_X+r,0);k(t)?A(l.TEXTURE_CUBE_MAP):t.mipmaps.length>0&&l.texParameteri(l.TEXTURE_CUBE_MAP,l.TEXTURE_MAX_LEVEL,t.mipmaps.length-1),d.unbindTexture()}else if(o){for(let t=0,r=i.length;t<r;t++){let r=i[t],a=f.get(r),o=l.TEXTURE_2D;(e.isWebGL3DRenderTarget||e.isWebGLArrayRenderTarget)&&(o=e.isWebGL3DRenderTarget?l.TEXTURE_3D:l.TEXTURE_2D_ARRAY),d.bindTexture(o,a.__webglTexture),Se(o,r),Oe(n.__webglFramebuffer,e,r,l.COLOR_ATTACHMENT0+t,o,0),k(r)&&A(o)}d.unbindTexture()}else{let i=l.TEXTURE_2D;if((e.isWebGL3DRenderTarget||e.isWebGLArrayRenderTarget)&&(i=e.isWebGL3DRenderTarget?l.TEXTURE_3D:l.TEXTURE_2D_ARRAY),d.bindTexture(i,r.__webglTexture),Se(i,t),t.mipmaps.length>0)for(let r=0;r<t.mipmaps.length;r++)Oe(n.__webglFramebuffer[r],e,t,l.COLOR_ATTACHMENT0,i,r);else Oe(n.__webglFramebuffer,e,t,l.COLOR_ATTACHMENT0,i,0);k(t)?A(i):t.mipmaps.length>0&&l.texParameteri(i,l.TEXTURE_MAX_LEVEL,t.mipmaps.length-1),d.unbindTexture()}e.depthBuffer&&je(e)}function I(e){let t=e.textures;for(let n=0,r=t.length;n<r;n++){let r=t[n];if(k(r)&&r.mipmapsAutoUpdate===!0){let t=ee(e),n=f.get(r).__webglTexture;d.bindTexture(t,n),A(t),d.unbindTexture()}}}let Pe=[];function Fe(e){if(e.samples>0){if(L(e)===!1){let t=e.textures,n=e.width,r=e.height,i=l.COLOR_BUFFER_BIT,a=e.stencilBuffer?l.DEPTH_STENCIL_ATTACHMENT:l.DEPTH_ATTACHMENT,o=f.get(e),s=t.length>1;if(s)for(let e=0;e<t.length;e++)d.bindFramebuffer(l.FRAMEBUFFER,o.__webglMultisampledFramebuffer),l.framebufferRenderbuffer(l.FRAMEBUFFER,l.COLOR_ATTACHMENT0+e,l.RENDERBUFFER,null),d.bindFramebuffer(l.FRAMEBUFFER,o.__webglFramebuffer),l.framebufferTexture2D(l.DRAW_FRAMEBUFFER,l.COLOR_ATTACHMENT0+e,l.TEXTURE_2D,null,0);d.bindFramebuffer(l.READ_FRAMEBUFFER,o.__webglMultisampledFramebuffer),e.texture.mipmaps.length>0?d.bindFramebuffer(l.DRAW_FRAMEBUFFER,o.__webglFramebuffer[0]):d.bindFramebuffer(l.DRAW_FRAMEBUFFER,o.__webglFramebuffer);for(let c=0;c<t.length;c++){if(e.resolveDepthBuffer&&(e.depthBuffer&&(i|=l.DEPTH_BUFFER_BIT),e.stencilBuffer&&e.resolveStencilBuffer&&(i|=l.STENCIL_BUFFER_BIT)),s){l.framebufferRenderbuffer(l.READ_FRAMEBUFFER,l.COLOR_ATTACHMENT0,l.RENDERBUFFER,o.__webglColorRenderbuffer[c]);let e=f.get(t[c]).__webglTexture;l.framebufferTexture2D(l.DRAW_FRAMEBUFFER,l.COLOR_ATTACHMENT0,l.TEXTURE_2D,e,0)}l.blitFramebuffer(0,0,n,r,0,0,n,r,i,l.NEAREST),_===!0&&(Pe.length=0,Pe.push(l.COLOR_ATTACHMENT0+c),e.depthBuffer&&e.storeMultisampledDepthBuffer===!1&&Pe.push(a),l.invalidateFramebuffer(l.READ_FRAMEBUFFER,Pe))}if(d.bindFramebuffer(l.READ_FRAMEBUFFER,null),d.bindFramebuffer(l.DRAW_FRAMEBUFFER,null),s)for(let e=0;e<t.length;e++){d.bindFramebuffer(l.FRAMEBUFFER,o.__webglMultisampledFramebuffer),l.framebufferRenderbuffer(l.FRAMEBUFFER,l.COLOR_ATTACHMENT0+e,l.RENDERBUFFER,o.__webglColorRenderbuffer[e]);let n=f.get(t[e]).__webglTexture;d.bindFramebuffer(l.FRAMEBUFFER,o.__webglFramebuffer),l.framebufferTexture2D(l.DRAW_FRAMEBUFFER,l.COLOR_ATTACHMENT0+e,l.TEXTURE_2D,n,0)}d.bindFramebuffer(l.DRAW_FRAMEBUFFER,o.__webglMultisampledFramebuffer)}else if(e.depthBuffer&&e.storeMultisampledDepthBuffer===!1&&_){let t=e.stencilBuffer?l.DEPTH_STENCIL_ATTACHMENT:l.DEPTH_ATTACHMENT;l.invalidateFramebuffer(l.DRAW_FRAMEBUFFER,[t])}}}function Ie(e){return Math.min(p.maxSamples,e.samples)}function L(e){let t=f.get(e);return e.samples>0&&u.has(`WEBGL_multisampled_render_to_texture`)===!0&&t.__useRenderToTexture!==!1}function Le(e){let t=h.render.frame;y.get(e)!==t&&(y.set(e,t),e.update())}function R(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(It.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&B(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):V(`WebGLTextures: Unsupported texture color space:`,n)),t}function Re(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(v.width=e.naturalWidth||e.width,v.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(v.width=e.displayWidth,v.height=e.displayHeight):(v.width=e.width,v.height=e.height),v}this.allocateTextureUnit=pe,this.resetTextureUnits=ue,this.getTextureUnits=de,this.setTextureUnits=fe,this.setTexture2D=he,this.setTexture2DArray=ge,this.setTexture3D=_e,this.setTextureCube=ve,this.rebindTextures=Me,this.setupRenderTarget=Ne,this.updateRenderTargetMipmap=I,this.updateMultisampleRenderTarget=Fe,this.setupDepthRenderbuffer=je,this.setupFrameBufferTexture=Oe,this.useMultisampledRTT=L,this.dispose=oe}function rl(e,t){function n(n,r=``){let i,a=It.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(a===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var il=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,al=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,ol=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new ki(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Wi({vertexShader:il,fragmentShader:al,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new q(new Mi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},sl=class extends tt{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,c=null,u=null,d=null,f=null,p=null,h=null,g=typeof XRWebGLBinding<`u`,_=new ol,v={},b=t.getContextAttributes(),x=null,S=null,C=[],D=[],O=new U,k=null,A=null,ee=new Aa;ee.viewport=new qt;let j=new Aa;j.viewport=new qt;let te=[ee,j],M=new Ra,ne=null,N=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=C[e];return t===void 0&&(t=new kn,C[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=C[e];return t===void 0&&(t=new kn,C[e]=t),t.getGripSpace()},this.getHand=function(e){let t=C[e];return t===void 0&&(t=new kn,C[e]=t),t.getHandSpace()};function re(e){let t=D.indexOf(e.inputSource);if(t===-1)return;let n=C[t];n!==void 0&&(n.update(e.inputSource,e.frame,c||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function P(){r.removeEventListener(`select`,re),r.removeEventListener(`selectstart`,re),r.removeEventListener(`selectend`,re),r.removeEventListener(`squeeze`,re),r.removeEventListener(`squeezestart`,re),r.removeEventListener(`squeezeend`,re),r.removeEventListener(`end`,P),r.removeEventListener(`inputsourceschange`,ie);for(let e=0;e<C.length;e++){let t=D[e];t!==null&&(D[e]=null,C[e].disconnect(t))}ne=null,N=null,_.reset();for(let e in v)delete v[e];if(e.setRenderTarget(x),p=null,f=null,d=null,r=null,S=null,F.stop(),n.isPresenting=!1,e.setPixelRatio(k),e.setSize(O.width,O.height,!1),A!==null){let e=A.camera;e.fov=A.fov,e.zoom=A.zoom,e.updateProjectionMatrix(),A=null}n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&B(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&B(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(e){c=e},this.getBaseLayer=function(){return f===null?p:f},this.getBinding=function(){return d===null&&g&&(d=new XRWebGLBinding(r,t)),d},this.getFrame=function(){return h},this.getSession=function(){return r},this.setSession=async function(u){if(r=u,r!==null){if(x=e.getRenderTarget(),r.addEventListener(`select`,re),r.addEventListener(`selectstart`,re),r.addEventListener(`selectend`,re),r.addEventListener(`squeeze`,re),r.addEventListener(`squeezestart`,re),r.addEventListener(`squeezeend`,re),r.addEventListener(`end`,P),r.addEventListener(`inputsourceschange`,ie),b.xrCompatible!==!0&&await t.makeXRCompatible(),k=e.getPixelRatio(),e.getSize(O),g&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,o=null;b.depth&&(o=b.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=b.stencil?E:T,a=b.stencil?y:m);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};d=this.getBinding(),f=d.createProjectionLayer(s),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),S=new Yt(f.textureWidth,f.textureHeight,{format:w,type:l,depthTexture:new Di(f.textureWidth,f.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:b.stencil,colorSpace:e.outputColorSpace,samples:b.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}else{let n={antialias:b.antialias,alpha:!0,depth:b.depth,stencil:b.stencil,framebufferScaleFactor:i};p=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),S=new Yt(p.framebufferWidth,p.framebufferHeight,{format:w,type:l,colorSpace:e.outputColorSpace,stencilBuffer:b.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(s),c=null,a=await r.requestReferenceSpace(o),F.setContext(r),F.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function ie(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=D.indexOf(n);r>=0&&(D[r]=null,C[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=D.indexOf(n);if(r===-1){for(let e=0;e<C.length;e++)if(e>=D.length){D.push(n),r=e;break}else if(D[e]===null){D[e]=n,r=e;break}if(r===-1)break}let i=C[r];i&&i.connect(n)}}function ae(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;_.texture!==null&&(_.depthNear>0&&(t=_.depthNear),_.depthFar>0&&(n=_.depthFar)),M.near=j.near=ee.near=t,M.far=j.far=ee.far=n,(ne!==M.near||N!==M.far)&&(r.updateRenderState({depthNear:M.near,depthFar:M.far}),ne=M.near,N=M.far),M.layers.mask=e.layers.mask|6,ee.layers.mask=M.layers.mask&-5,j.layers.mask=M.layers.mask&-3;let i=e.parent,a=M.cameras;ae(M,i);for(let e=0;e<a.length;e++)ae(a[e],i);M.projectionMatrix.copy(ee.projectionMatrix),M.projectionMatrixInverse.copy(ee.projectionMatrixInverse),A===null&&e.isPerspectiveCamera&&(A={camera:e,fov:e.fov,zoom:e.zoom}),oe(e,M,i)};function oe(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=at*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(f!==null||p!==null)return s},this.setFoveation=function(e){s=e,f!==null&&(f.fixedFoveation=e),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=e)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(M)},this.getCameraTexture=function(e){return v[e]};let se=null;function ce(t,i){if(u=i.getViewerPose(c||a),h=i,u!==null){let t=u.views;p!==null&&(e.setRenderTargetFramebuffer(S,p.framebuffer),e.setRenderTarget(S));let i=!1;t.length!==M.cameras.length&&(M.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(p!==null)a=p.getViewport(r);else{let t=d.getViewSubImage(f,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(S,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(S))}let o=te[n];o===void 0&&(o=new Aa,o.layers.enable(n),o.viewport=new qt,te[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(M.matrix.copy(o.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),i===!0&&M.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&g){d=n.getBinding();let e=d.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&_.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&g){e.state.unbindTexture(),d=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=v[n];e||(e=new ki,v[n]=e);let t=d.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<C.length;e++){let t=D[e],n=C[e];t!==null&&n!==void 0&&n.update(t,i,c||a)}se&&se(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),h=null}let F=new ao;F.setAnimationLoop(ce),this.setAnimationLoop=function(e){se=e},this.dispose=function(){}}},cl=new Qt,ll=new G;ll.set(-1,0,0,0,1,0,0,0,1);function ul(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,Bi(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(cl.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(ll),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.diffuseRoughness>0&&(e.diffuseRoughness.value=t.diffuseRoughness,t.diffuseRoughnessMap&&(e.diffuseRoughnessMap.value=t.diffuseRoughnessMap,n(t.diffuseRoughnessMap,e.diffuseRoughnessMapTransform))),t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.retroreflectivity>0&&(e.retroreflectivity.value=t.retroreflectivity),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessMinimum,e.iridescenceThicknessMaximum.value=t.iridescenceThicknessMaximum,t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function dl(e,t,n,r){let i={},a={};function o(e,t){let n=t.program;r.uniformBlockBinding(e,n,i[e.id])}function s(e,n){let o=i[e.id];o===void 0&&(m(e),o=c(e),i[e.id]=o,e.addEventListener(`dispose`,g));let s=n.program;r.updateUBOMapping(e,s);let u=t.render.frame;a[e.id]!==u&&(l(e),a[e.id]=u)}function c(t){let n=e.createBuffer(),r=t.__size,i=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,n),e.bufferData(e.UNIFORM_BUFFER,r,i),e.bindBuffer(e.UNIFORM_BUFFER,null),n}function l(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)u(t[n],e,n,a);else u(t,e,0,a)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function u(t,n,r,i){if(f(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=h(i,!0);d(i,t.__data,e),e+=a.storage/Float32Array.BYTES_PER_ELEMENT}}else d(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function d(e,t,n){typeof e==`number`||typeof e==`boolean`?t[n]=e:e.isMatrix3?(t[n]=e.elements[0],t[n+1]=e.elements[1],t[n+2]=e.elements[2],t[n+3]=0,t[n+4]=e.elements[3],t[n+5]=e.elements[4],t[n+6]=e.elements[5],t[n+7]=0,t[n+8]=e.elements[6],t[n+9]=e.elements[7],t[n+10]=e.elements[8],t[n+11]=0):ArrayBuffer.isView(e)?t.set(e.subarray(0,t.length-n),n):e.toArray(t,n)}function f(e,t,n,r){let i=e.value,a=t+`_`+n;if(Array.isArray(i)){r[a]===void 0&&(r[a]=[]);let e=r[a],t=!1;for(let n=0;n<i.length;n++)p(i[n],e,n)===!0&&(t=!0);return t}return p(i,r,a)}function p(e,t,n){if(t[n]===void 0)return t[n]=typeof e==`number`||typeof e==`boolean`?e:ArrayBuffer.isView(e)?e.slice():e.clone(),!0;{let r=t[n];if(typeof e==`number`||typeof e==`boolean`){if(r!==e)return t[n]=e,!0}else if(ArrayBuffer.isView(e))return!0;else if(r.equals(e)===!1)return r.copy(e),!0}return!1}function m(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let i=0,a=r.length;i<a;i++){let a=r[i],o=Array.isArray(a.value)?a.value:[a.value],s=Array.isArray(t[e])||Array.isArray(a.value),c=n;for(let e=0,t=o.length;e<t;e++){let t=o[e],r=h(t,s),i=n%16,a=i%r.boundary,l=i+a;n+=a,l!==0&&16-l<r.storage&&(n+=16-l),e===0&&(c=n),n+=r.storage}a.__data=new(a.type===`int`?Int32Array:a.type===`uint`?Uint32Array:Float32Array)((n-c)/Float32Array.BYTES_PER_ELEMENT),a.__offset=c}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function h(e,t){let n={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(n.boundary=4,n.storage=4):e.isVector2?(n.boundary=8,n.storage=8):e.isVector3||e.isColor?(n.boundary=16,n.storage=12):e.isVector4?(n.boundary=16,n.storage=16):e.isMatrix3?(n.boundary=16,n.storage=48):e.isMatrix4?(n.boundary=16,n.storage=64):e.isTexture?B(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(n.boundary=16,n.storage=e.byteLength):B(`WebGLRenderer: Unsupported uniform value type.`,e),t===!0&&(n.boundary=16,n.storage=Math.ceil(n.storage/16)*16),n}function g(t){let n=t.target;n.removeEventListener(`dispose`,g),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function _(){for(let t in i)e.deleteBuffer(i[t]);i={},a={}}return{bind:o,update:s,dispose:_}}var fl=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),pl=null;function ml(){return pl===null&&(pl=new ni(fl,16,16,k,g),pl.name=`DFG_LUT`,pl.minFilter=o,pl.magFilter=o,pl.wrapS=t,pl.wrapT=t,pl.generateMipmaps=!1,pl.needsUpdate=!0),pl}var hl=class{constructor(e={}){let{canvas:t=Je(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:u=!1,powerPreference:d=`default`,failIfMajorPerformanceCaveat:p=!1,reversedDepthBuffer:h=!1,outputBufferType:b=l}=e;this.isWebGLRenderer=!0;let x;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);x=n.getContextAttributes().alpha}else x=a;let S=b,C=new Set([ee,A,O]),w=new Set([l,m,f,y,_,v]),T=new Uint32Array(4),E=new Int32Array(4),D={textures:[],min:[],max:[],resolution:[]},k=null,j=null,te=[],M=[],ne=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let N=this,re=!1,P=null,ie=null,ae=null,oe=null;this._outputColorSpace=Re;let se=0,ce=0,F=null,le=-1,ue=null,de=new qt,fe=new qt,pe=null,me=new K(0),he=0,ge=t.width,_e=t.height,ve=1,ye=null,be=null,xe=new qt(0,0,ge,_e),Se=new qt(0,0,ge,_e),Ce=!1,we=new hi,Te=new _i,Ee=!1,De=!1,Oe=new Qt,ke=new W,Ae=new qt,je={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Me=!1;function Ne(){return F===null?ve:1}let I=n;function Pe(e,n){return t.getContext(e,n)}let Fe,Ie,L,Le,R,z,ze,Be,Ve,He,Ue,Ge,Ke,qe,Ye,Ze,Qe,et,tt,nt,rt,it,at;try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:u,powerPreference:d,failIfMajorPerformanceCaveat:p};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r187`),t.addEventListener(`webglcontextlost`,st,!1),t.addEventListener(`webglcontextrestored`,ct,!1),t.addEventListener(`webglcontextcreationerror`,lt,!1),I===null){let t=`webgl2`;if(I=Pe(t,e),I===null)throw Pe(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}ot()}catch(e){throw t.removeEventListener(`webglcontextlost`,st,!1),t.removeEventListener(`webglcontextrestored`,ct,!1),t.removeEventListener(`webglcontextcreationerror`,lt,!1),V(`WebGLRenderer: `+e.message),e}function ot(){Fe=new Fo(I),Fe.init(),rt=new rl(I,Fe),Ie=new ho(I,Fe,e,rt),L=new tl(I,Fe),Ie.reversedDepthBuffer&&h&&L.buffers.depth.setReversed(!0),ie=I.createFramebuffer(),ae=I.createFramebuffer(),oe=I.createFramebuffer(),Le=new Ro(I),R=new Fc,z=new nl(I,Fe,L,R,Ie,rt,Le),ze=new Po(N),Be=new oo(I),it=new po(I,Be),Ve=new Io(I,Be,Le,it),He=new Bo(I,Ve,Be,it,Le),et=new zo(I,Ie,z),Ye=new go(R),Ue=new Pc(N,ze,Fe,Ie,it,Ye),Ge=new ul(N,R),Ke=new zc,qe=new Kc(Fe),Qe=new fo(N,ze,L,He,x,s),Ze=new el(N,He,Ie),at=new dl(I,Le,Ie,L),tt=new mo(I,Fe,Le),nt=new Lo(I,Fe,Le),Le.programs=Ue.programs,N.capabilities=Ie,N.extensions=Fe,N.properties=R,N.renderLists=Ke,N.shadowMap=Ze,N.state=L,N.info=Le}S!==1009&&(ne=new Ho(S,t.width,t.height,o,r,i));let H=new sl(N,I);this.xr=H,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){let e=Fe.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=Fe.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return ve},this.setPixelRatio=function(e){e!==void 0&&(ve=e,this.setSize(ge,_e,!1))},this.getSize=function(e){return e.set(ge,_e)},this.setSize=function(e,n,r=!0){H.isPresenting?B(`WebGLRenderer: Can't change size while VR device is presenting.`):(ge=e,_e=n,t.width=Math.floor(e*ve),t.height=Math.floor(n*ve),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),ne!==null&&ne.setSize(t.width,t.height),this.setViewport(0,0,e,n))},this.getDrawingBufferSize=function(e){return e.set(ge*ve,_e*ve).floor()},this.setDrawingBufferSize=function(e,n,r){ge=e,_e=n,ve=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(S===1009)V(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);else{if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){B(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}ne.setEffects(e||[])}},this.getCurrentViewport=function(e){return e.copy(de)},this.getViewport=function(e){return e.copy(xe)},this.setViewport=function(e,t,n,r){e.isVector4?xe.set(e.x,e.y,e.z,e.w):xe.set(e,t,n,r),L.viewport(de.copy(xe).multiplyScalar(Ne()).round())},this.getScissor=function(e){return e.copy(Se)},this.setScissor=function(e,t,n,r){e.isVector4?Se.set(e.x,e.y,e.z,e.w):Se.set(e,t,n,r),L.scissor(fe.copy(Se).multiplyScalar(Ne()).round())},this.getScissorTest=function(){return Ce},this.setScissorTest=function(e){L.setScissorTest(Ce=e)},this.setOpaqueSort=function(e){ye=e},this.setTransparentSort=function(e){be=e},this.getClearColor=function(e){return e.copy(Qe.getClearColor())},this.setClearColor=function(){Qe.setClearColor(...arguments)},this.getClearAlpha=function(){return Qe.getClearAlpha()},this.setClearAlpha=function(){Qe.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(F!==null){let t=F.texture.format;e=C.has(t)}if(e){let e=F.texture.type,t=w.has(e),n=Qe.getClearColor(),r=Qe.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(T[0]=i,T[1]=a,T[2]=o,T[3]=r,I.clearBufferuiv(I.COLOR,0,T)):(E[0]=i,E[1]=a,E[2]=o,E[3]=r,I.clearBufferiv(I.COLOR,0,E))}else r|=I.COLOR_BUFFER_BIT}t&&(r|=I.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&I.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),P=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,st,!1),t.removeEventListener(`webglcontextrestored`,ct,!1),t.removeEventListener(`webglcontextcreationerror`,lt,!1),Qe.dispose(),Ke.dispose(),qe.dispose(),z.dispose(),R.dispose(),ze.dispose(),He.dispose(),Ve.dispose(),it.dispose(),at.dispose(),Ue.dispose(),H.dispose(),H.removeEventListener(`sessionstart`,gt),H.removeEventListener(`sessionend`,_t),vt.stop()};function st(e){e.preventDefault(),Xe(`WebGLRenderer: Context Lost.`),re=!0}function ct(){Xe(`WebGLRenderer: Context Restored.`),re=!1;let e=Le.autoReset,t=Ze.enabled,n=Ze.autoUpdate,r=Ze.needsUpdate,i=Ze.type;ot(),Le.autoReset=e,Ze.enabled=t,Ze.autoUpdate=n,Ze.needsUpdate=r,Ze.type=i}function lt(e){V(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function ut(e){let t=e.target;t.removeEventListener(`dispose`,ut),dt(t)}function dt(e){ft(e),R.remove(e)}function ft(e){let t=R.get(e).programs;t!==void 0&&(t.forEach(function(e){Ue.releaseProgram(e)}),e.isShaderMaterial&&Ue.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=je);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,s=U(e,t,n,r,i);L.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=Ve.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;it.setup(i,r,s,n,c);let h,g=tt;if(c!==null&&(h=Be.get(c),g=nt,g.setIndex(h)),i.isMesh)r.wireframe===!0?(L.setLineWidth(r.wireframeLinewidth*Ne()),g.setMode(I.LINES)):g.setMode(I.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),L.setLineWidth(e*Ne()),i.isLineSegments?g.setMode(I.LINES):i.isLineLoop?g.setMode(I.LINE_LOOP):g.setMode(I.LINE_STRIP)}else i.isPoints?g.setMode(I.POINTS):i.isSprite&&g.setMode(I.TRIANGLES);if(i.isBatchedMesh){if(Fe.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?Be.get(c).bytesPerElement:1,o=R.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(I,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function pt(e,t,n,r){P!==null&&e.isNodeMaterial&&P.setObject(r,e),Ee===!0&&Ye.setState(e,n,!1),e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,Tt(e,t,r),e.side=0,e.needsUpdate=!0,Tt(e,t,r),e.side=2):Tt(e,t,r)}this.compile=function(e,t,n=null){n===null&&(n=e),P!==null&&P.renderStart(e,t,n),j=qe.get(n),j.init(t),M.push(j),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(j.pushLight(e),e.castShadow&&j.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(j.pushLight(e),e.castShadow&&j.pushShadow(e))}),j.setupLights(),P!==null&&P.updateLights(j.state.lightsArray),De=this.localClippingEnabled,Ee=Ye.init(this.clippingPlanes,De),Ee===!0&&Ye.setGlobalState(this.clippingPlanes,t),P!==null&&Ze.render(j.state.shadowsArray,n,t);let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let i=e.material;if(i){if(Array.isArray(i))for(let a=0;a<i.length;a++){let o=i[a];pt(o,n,t,e),r.add(o)}else pt(i,n,t,e),r.add(i)}}),j=M.pop(),P!==null&&P.renderEnd(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){r.forEach(function(e){let t=R.get(e).currentProgram;(t===void 0||t.isReady())&&r.delete(e)}),r.size===0?t(e):setTimeout(n,10)}Fe.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let mt=null;function ht(e){mt&&mt(e)}function gt(){vt.stop()}function _t(){vt.start()}let vt=new ao;vt.setAnimationLoop(ht),typeof self<`u`&&vt.setContext(self),this.setAnimationLoop=function(e){mt=e,H.setAnimationLoop(e),e===null?vt.stop():vt.start()},H.addEventListener(`sessionstart`,gt),H.addEventListener(`sessionend`,_t),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){V(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(re===!0)return;P!==null&&P.renderStart(e,t);let n=H.enabled===!0&&H.isPresenting===!0,r=ne!==null&&(F===null||n)&&ne.begin(N,F);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),H.enabled===!0&&H.isPresenting===!0&&(ne===null||ne.isCompositing()===!1)&&(H.cameraAutoUpdate===!0&&H.updateCamera(t),t=H.getCamera()),e.isScene===!0&&e.onBeforeRender(N,e,t,F),j=qe.get(e,M.length),j.init(t),j.state.textureUnits=z.getTextureUnits(),M.push(j),Oe.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),t.isArrayCamera?Te.setFromArrayCamera(t):we.setFromProjectionMatrix(Oe,We,t.reversedDepth),De=this.localClippingEnabled,Ee=Ye.init(this.clippingPlanes,De),k=Ke.get(e,te.length),k.init(),te.push(k),this.info.render.frame++,H.enabled===!0&&H.isPresenting===!0){let e=N.xr.getDepthSensingMesh();e!==null&&yt(e,t,-1/0,N.sortObjects)}yt(e,t,0,N.sortObjects),k.finish(),P!==null&&P.updateLights(j.state.lightsArray),N.sortObjects===!0&&k.sort(ye,be),Me=H.enabled===!1||H.isPresenting===!1||H.hasDepthSensing()===!1,Me&&Qe.addToRenderList(k,e),this.info.autoReset===!0&&this.info.reset(),Ee===!0&&Ye.beginShadows();let i=j.state.shadowsArray;if(Ze.render(i,e,t),Ee===!0&&Ye.endShadows(),(r&&ne.hasRenderPass())===!1){let n=k.opaque,r=k.transmissive;if(j.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];xt(n,r,e,a)}Me&&Qe.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];bt(k,e,n,n.viewport)}}else r.length>0&&xt(n,r,e,t),Me&&Qe.render(e),bt(k,e,t)}F!==null&&ce===0&&(z.updateMultisampleRenderTarget(F),z.updateRenderTargetMipmap(F)),r&&ne.end(N),e.isScene===!0&&e.onAfterRender(N,e,t),it.resetDefaultState(),le=-1,ue=null,M.pop(),M.length>0?(j=M[M.length-1],z.setTextureUnits(j.state.textureUnits),Ee===!0&&Ye.setGlobalState(N.clippingPlanes,j.state.camera)):j=null,te.pop(),k=te.length>0?te[te.length-1]:null,P!==null&&P.renderEnd()};function yt(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLight)j.pushLight(e),e.castShadow&&j.pushShadow(e);else if(e.isSprite){let i=t.isArrayCamera?Te:we;if(!e.frustumCulled||e.intersectsFrustum(i)){r&&Ae.setFromMatrixPosition(e.matrixWorld).applyMatrix4(Oe);let i=He.update(e),a=e.material;a.visible&&k.push(e,i,a,n,Ae.z,null,t)}}else if(e.isMesh||e.isLine||e.isPoints){let i=t.isArrayCamera?Te:we;if(!e.frustumCulled||e.intersectsFrustum(i)){let i=He.update(e),a=e.material;if(r&&(e.boundingSphere===void 0?(i.boundingSphere===null&&i.computeBoundingSphere(),Ae.copy(i.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),Ae.copy(e.boundingSphere.center)),Ae.applyMatrix4(e.matrixWorld).applyMatrix4(Oe)),Array.isArray(a)){let r=i.groups;for(let o=0,s=r.length;o<s;o++){let s=r[o],c=a[s.materialIndex];c&&c.visible&&k.push(e,i,c,n,Ae.z,s,t)}}else a.visible&&k.push(e,i,a,n,Ae.z,null,t)}}}let i=e.children;for(let e=0,a=i.length;e<a;e++)yt(i[e],t,n,r)}function bt(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;j.setupLightsView(n),Ee===!0&&Ye.setGlobalState(N.clippingPlanes,n),r&&L.viewport(de.copy(r)),i.length>0&&St(i,t,n),a.length>0&&St(a,t,n),o.length>0&&St(o,t,n),L.buffers.depth.setTest(!0),L.buffers.depth.setMask(!0),L.buffers.color.setMask(!0),L.setPolygonOffset(!1)}function xt(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(j.state.transmissionRenderTarget[r.id]===void 0){let e=Fe.has(`EXT_color_buffer_half_float`)||Fe.has(`EXT_color_buffer_float`);j.state.transmissionRenderTarget[r.id]=new Yt(1,1,{generateMipmaps:!0,type:e?g:l,minFilter:c,samples:Math.max(4,Ie.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:It.workingColorSpace})}let a=j.state.transmissionRenderTarget[r.id],o=r.viewport||de;a.setSize(o.z*N.transmissionResolutionScale,o.w*N.transmissionResolutionScale);let s=N.getRenderTarget(),u=N.getActiveCubeFace(),d=N.getActiveMipmapLevel();N.setRenderTarget(a),N.getClearColor(me),he=N.getClearAlpha(),he<1&&N.setClearColor(16777215,.5),N.clear(),Me&&Qe.render(n);let f=N.toneMapping;N.toneMapping=0;let p=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),j.setupLightsView(r),Ee===!0&&Ye.setGlobalState(N.clippingPlanes,r),St(e,n,r),z.updateMultisampleRenderTarget(a),z.updateRenderTargetMipmap(a),Fe.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,Ct(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(z.updateMultisampleRenderTarget(a),z.updateRenderTargetMipmap(a))}N.setRenderTarget(s,u,d),N.setClearColor(me,he),p!==void 0&&(r.viewport=p),N.toneMapping=f}function St(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&Ct(o,t,n,s,l,c)}}function Ct(e,t,n,r,i,a){P!==null&&i.isNodeMaterial&&P.setObject(e,i),e.onBeforeRender(N,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(N,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,N.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,N.renderBufferDirect(n,t,r,i,e,a),i.side=2):N.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(N,t,n,r,i,a)}function wt(e){let t=0;for(let n of e)n.texture!==null&&t++;return t}function Tt(e,t,n){t.isScene!==!0&&(t=je);let r=R.get(e),i=j.state.lights,a=j.state.shadowsArray,o=i.state.version,s=Ue.getParameters(e,i.state,a,t,n,j.state.lightProbeGridArray),c=Ue.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=ze.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,ut),l=new Map,r.programs=l,r.programVariants=new Map);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return Ot(e,s),d}else s.uniforms=Ue.getUniforms(e),P!==null&&e.isNodeMaterial&&P.build(e,n,s),e.onBeforeCompile(s,N),d=Ue.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=Ye.uniform),Ot(e,s),r.needsLights=At(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.sunLights.value=i.state.sun,f.sunLightShadows.value=i.state.sunShadow,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.sunShadowMatrix.value=i.state.sunShadowMatrix,f.sunShadowCascade.value=i.state.sunShadowCascade,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.numLightProbeGrids=wt(j.state.lightProbeGridArray),r.currentProgram=d,r.uniformsList=null,d}function Et(e,t,n,r,i){let a=R.get(e),o=a.currentProgram.id+`,`+r+`,`+i,s=a.programVariants.get(o);return s===void 0?(s=Tt(e,t,n),a.programVariants.set(o,s)):(a.currentProgram=s,a.uniformsList=null,a.outputColorSpace=r,a.toneMapping=i),s}function Dt(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=Zs.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function Ot(e,t){let n=R.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function U(e,t,n,r,i){t.isScene!==!0&&(t=je),z.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=F===null?N.outputColorSpace:F.isXRRenderTarget===!0?F.texture.colorSpace:It.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=ze.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(F===null||F.isXRRenderTarget===!0)&&(h=N.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=R.get(r),y=j.state.lights;if(Ee===!0&&(De===!0||e!==ue)){let t=e===ue&&r.id===le;Ye.setState(r,e,t)}let b=!1,x=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==y.state.version||i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i._colorsTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i._colorsTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?b=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==Ye.numPlanes||v.numIntersection!==Ye.numIntersection)?b=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.morphTargetsCount===_&&v.numLightProbeGrids===wt(j.state.lightProbeGridArray)?(v.outputColorSpace!==s||v.toneMapping!==h)&&(x=!0):b=!0:b=!0:(b=!0,v.__version=r.version);let S=v.currentProgram;(b===!0||x===!0)&&(S=x===!0?Et(r,t,i,s,h):Tt(r,t,i),P&&r.isNodeMaterial&&P.onUpdateProgram(r,S,v));let C=!1,w=!1,T=!1,E=S.getUniforms(),O=v.uniforms;if(L.useProgram(S.program)&&(C=!0,w=!0,T=!0),r.id!==le&&(le=r.id,w=!0),C||ue!==e){L.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),E.setValue(I,`projectionMatrix`,e.projectionMatrix),E.setValue(I,`viewMatrix`,e.matrixWorldInverse);let t=E.map.cameraPosition;t!==void 0&&t.setValue(I,ke.setFromMatrixPosition(e.matrixWorld)),Ie.logarithmicDepthBuffer&&E.setValue(I,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&E.setValue(I,`isOrthographic`,e.isOrthographicCamera===!0),ue!==e&&(ue=e,w=!0,T=!0)}if(v.needsLights&&(y.state.sunShadowMap.length>0&&E.setValue(I,`sunShadowMap`,y.state.sunShadowMap,z),y.state.directionalShadowMap.length>0&&E.setValue(I,`directionalShadowMap`,y.state.directionalShadowMap,z),y.state.spotShadowMap.length>0&&E.setValue(I,`spotShadowMap`,y.state.spotShadowMap,z),y.state.pointShadowMap.length>0&&E.setValue(I,`pointShadowMap`,y.state.pointShadowMap,z)),i.isSkinnedMesh){E.setOptional(I,i,`bindMatrix`),E.setOptional(I,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),E.setValue(I,`boneTexture`,e.boneTexture,z))}i.isBatchedMesh&&(E.setOptional(I,i,`batchingTexture`),E.setValue(I,`batchingTexture`,i._matricesTexture,z),E.setOptional(I,i,`batchingIdTexture`),E.setValue(I,`batchingIdTexture`,i._indirectTexture,z),E.setOptional(I,i,`batchingColorTexture`),i._colorsTexture!==null&&E.setValue(I,`batchingColorTexture`,i._colorsTexture,z));let k=n.morphAttributes;if((k.position!==void 0||k.normal!==void 0||k.color!==void 0)&&et.update(i,n,S),(w||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,E.setValue(I,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(O.envMapIntensity.value=t.environmentIntensity),O.dfgLUT!==void 0&&(O.dfgLUT.value=ml()),w){if(E.setValue(I,`toneMappingExposure`,N.toneMappingExposure),v.needsLights&&kt(O,T),a&&r.fog===!0&&Ge.refreshFogUniforms(O,a),Ge.refreshMaterialUniforms(O,r,ve,_e,j.state.transmissionRenderTarget[e.id]),v.needsLights&&v.numLightProbeGrids>0){let e=D,t=0;for(let n of j.state.lightProbeGridArray)n.texture!==null&&(e.textures[t]=n.texture,e.min[t]=n.boundingBox.min,e.max[t]=n.boundingBox.max,e.resolution[t]=n.resolution,t++);for(let n in e)e[n].length=t;O.probesSH.value=e.textures,O.probesMin.value=e.min,O.probesMax.value=e.max,O.probesResolution.value=e.resolution}Zs.upload(I,Dt(v),O,z)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(Zs.upload(I,Dt(v),O,z),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&E.setValue(I,`center`,i.center),E.setValue(I,`modelViewMatrix`,i.modelViewMatrix),E.setValue(I,`normalMatrix`,i.normalMatrix),E.setValue(I,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];at.update(n,S),at.bind(n,S)}}return S}function kt(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.sunLights.needsUpdate=t,e.sunLightShadows.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function At(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return se},this.getActiveMipmapLevel=function(){return ce},this.getRenderTarget=function(){return F},this.setRenderTargetTextures=function(e,t,n){let r=R.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),R.get(e.texture).__webglTexture=t,R.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=R.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){F=e,se=t,ce=n;let r=null,i=!1,a=!1;if(e){let o=R.get(e);if(o.__useDefaultFramebuffer!==void 0){L.bindFramebuffer(I.FRAMEBUFFER,o.__webglFramebuffer),de.copy(e.viewport),fe.copy(e.scissor),pe=e.scissorTest,L.viewport(de),L.scissor(fe),L.setScissorTest(pe),le=-1;return}if(o.__webglFramebuffer===void 0)z.setupRenderTarget(e);else if(o.__hasExternalTextures)z.rebindTextures(e,R.get(e.texture).__webglTexture,R.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&R.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);z.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=R.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&z.useMultisampledRTT(e)===!1?R.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,de.copy(e.viewport),fe.copy(e.scissor),pe=e.scissorTest}else de.copy(xe).multiplyScalar(ve).floor(),fe.copy(Se).multiplyScalar(ve).floor(),pe=Ce;if(n!==0&&(r=ie),L.bindFramebuffer(I.FRAMEBUFFER,r)&&L.drawBuffers(e,r),L.viewport(de),L.scissor(fe),L.setScissorTest(pe),i){let r=R.get(e.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=R.get(e.textures[t]);I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=R.get(e.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,t.__webglTexture,n)}le=-1};function jt(e){let t=R.get(e);return(t.__readFormat!==e.format||t.__readType!==e.type)&&(t.__readFormat=e.format,t.__readType=e.type,t.__formatReadable=Ie.textureFormatReadable(e.format),t.__typeReadable=Ie.textureTypeReadable(e.type)),t}this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){V(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=R.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o],Array.isArray(c)&&(c=c[0])),c){L.bindFramebuffer(I.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;e.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+s);let u=jt(o);if(u.__formatReadable===!1){V(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(u.__typeReadable===!1){V(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&I.readPixels(t,n,r,i,rt.convert(c),rt.convert(l),a)}finally{let e=F===null?null:R.get(F).__webglFramebuffer;L.bindFramebuffer(I.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=R.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o],Array.isArray(c)&&(c=c[0])),c){if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){L.bindFramebuffer(I.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;e.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+s);let d=jt(o);if(d.__formatReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(d.__typeReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let f=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,f),I.bufferData(I.PIXEL_PACK_BUFFER,a.byteLength,I.STREAM_READ),I.readPixels(t,n,r,i,rt.convert(l),rt.convert(u),0),I.bindBuffer(I.PIXEL_PACK_BUFFER,null);let p=F===null?null:R.get(F).__webglFramebuffer;L.bindFramebuffer(I.FRAMEBUFFER,p);let m=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await $e(I,m,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,f),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,a),I.bindBuffer(I.PIXEL_PACK_BUFFER,null),I.deleteBuffer(f),I.deleteSync(m),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;z.setTexture2D(e,0),I.copyTexSubImage2D(I.TEXTURE_2D,n,0,0,o,s,i,a),L.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=rt.convert(t.format),_=rt.convert(t.type),v;t.isData3DTexture?(z.setTexture3D(t,0),v=I.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(z.setTexture2DArray(t,0),v=I.TEXTURE_2D_ARRAY):(z.setTexture2D(t,0),v=I.TEXTURE_2D),L.activeTexture(I.TEXTURE0),L.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,t.flipY),L.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),L.pixelStorei(I.UNPACK_ALIGNMENT,t.unpackAlignment);let y=L.getParameter(I.UNPACK_ROW_LENGTH),b=L.getParameter(I.UNPACK_IMAGE_HEIGHT),x=L.getParameter(I.UNPACK_SKIP_PIXELS),S=L.getParameter(I.UNPACK_SKIP_ROWS),C=L.getParameter(I.UNPACK_SKIP_IMAGES);L.pixelStorei(I.UNPACK_ROW_LENGTH,h.width),L.pixelStorei(I.UNPACK_IMAGE_HEIGHT,h.height),L.pixelStorei(I.UNPACK_SKIP_PIXELS,l),L.pixelStorei(I.UNPACK_SKIP_ROWS,u),L.pixelStorei(I.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=R.get(e),r=R.get(t),h=R.get(n.__renderTarget),g=R.get(r.__renderTarget);L.bindFramebuffer(I.READ_FRAMEBUFFER,h.__webglFramebuffer),L.bindFramebuffer(I.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,R.get(e).__webglTexture,i,d+n),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,R.get(t).__webglTexture,a,m+n)),I.blitFramebuffer(l,u,l+o,u+s,f,p,f+o,p+s,I.DEPTH_BUFFER_BIT,I.NEAREST);L.bindFramebuffer(I.READ_FRAMEBUFFER,null),L.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||R.has(e)){let n=R.get(e),r=R.get(t);L.bindFramebuffer(I.READ_FRAMEBUFFER,ae),L.bindFramebuffer(I.DRAW_FRAMEBUFFER,oe);for(let e=0;e<c;e++)w?I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,n.__webglTexture,i),T?I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,r.__webglTexture,a),i===0?T?I.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):I.copyTexSubImage2D(v,a,f,p,l,u,o,s):I.blitFramebuffer(l,u,l+o,u+s,f,p,f+o,p+s,I.COLOR_BUFFER_BIT,I.NEAREST);L.bindFramebuffer(I.READ_FRAMEBUFFER,null),L.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?I.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?I.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):I.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):I.texSubImage2D(I.TEXTURE_2D,a,f,p,o,s,g,_,h);L.pixelStorei(I.UNPACK_ROW_LENGTH,y),L.pixelStorei(I.UNPACK_IMAGE_HEIGHT,b),L.pixelStorei(I.UNPACK_SKIP_PIXELS,x),L.pixelStorei(I.UNPACK_SKIP_ROWS,S),L.pixelStorei(I.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps===!0&&t.mipmapsAutoUpdate===!0&&I.generateMipmap(v),L.unbindTexture()},this.initRenderTarget=function(e){R.get(e).__webglFramebuffer===void 0&&z.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?z.setTextureCube(e,0):e.isData3DTexture?z.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?z.setTexture2DArray(e,0):z.setTexture2D(e,0),L.unbindTexture()},this.resetState=function(){se=0,ce=0,F=null,L.reset(),it.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return We}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=It._getDrawingBufferColorSpace(e),t.unpackColorSpace=It._getUnpackColorSpace()}},gl=class{ctx=null;master;crowdBus;sfxBus;murmur;roar;roarFilter;chant;drone;noise;heartbeatTimer=0;chantTimer=0;chantStep=0;excitement=.3;tension=0;chantOn=!1;volumes={master:.8,crowd:.8,sfx:.9};narrator=!0;voice=null;whistleTimer=3;async start(){if(this.ctx){this.ctx.state!==`running`&&await this.ctx.resume();return}let e=window.AudioContext||window.webkitAudioContext;if(!e)return;let t=this.ctx=new e;this.master=t.createGain(),this.master.gain.value=this.volumes.master;let n=t.createDynamicsCompressor();n.threshold.value=-14,n.ratio.value=3,this.master.connect(n).connect(t.destination),this.crowdBus=t.createGain(),this.crowdBus.gain.value=this.volumes.crowd,this.crowdBus.connect(this.master),this.sfxBus=t.createGain(),this.sfxBus.gain.value=this.volumes.sfx,this.sfxBus.connect(this.master);let r=t.sampleRate*4;this.noise=t.createBuffer(2,r,t.sampleRate);for(let e=0;e<2;e++){let t=this.noise.getChannelData(e),n=0,i=0,a=0,o=1234+e*999;for(let e=0;e<r;e++){o=o*1664525+1013904223>>>0;let r=o/4294967296-.5;n=.997*n+r*.029591,i=.985*i+r*.032534,a=.95*a+r*.048056,t[e]=(n+i+a+r*.05)*2.2}}this.murmur=t.createGain(),this.murmur.gain.value=.5,this.murmur.connect(this.crowdBus);for(let e=0;e<4;e++){let n=t.createBufferSource();n.buffer=this.noise,n.loop=!0,n.playbackRate.value=.82+e*.07;let r=t.createBiquadFilter();r.type=`bandpass`,r.frequency.value=420+e*260,r.Q.value=.7;let i=t.createGain();i.gain.value=.18;let a=t.createOscillator();a.frequency.value=.07+e*.045;let o=t.createGain();o.gain.value=.08,a.connect(o).connect(i.gain),a.start();let s=t.createStereoPanner();s.pan.value=(e-1.5)*.4,n.connect(r).connect(i).connect(s).connect(this.murmur),n.start(0,e*.7)}this.roar=t.createGain(),this.roar.gain.value=0,this.roarFilter=t.createBiquadFilter(),this.roarFilter.type=`lowpass`,this.roarFilter.frequency.value=1800;let i=t.createBufferSource();i.buffer=this.noise,i.loop=!0,i.connect(this.roarFilter).connect(this.roar).connect(this.crowdBus),i.start(0,1.3),this.chant=t.createGain(),this.chant.gain.value=0;let a=t.createBiquadFilter();a.type=`bandpass`,a.frequency.value=520,a.Q.value=4;let o=t.createBiquadFilter();o.type=`bandpass`,o.frequency.value=880,o.Q.value=5;let s=t.createGain();s.gain.value=.9,a.connect(s),o.connect(s),s.connect(this.chant).connect(this.crowdBus),this.chantOscs=[];for(let e=0;e<10;e++){let n=t.createOscillator();n.type=`sawtooth`,n.frequency.value=196,n.detune.value=(e-5)*9;let r=t.createGain();r.gain.value=.05,n.connect(r),r.connect(a),r.connect(o),n.start(),this.chantOscs.push(n)}this.drone=t.createGain(),this.drone.gain.value=0;for(let e of[55,82.4]){let n=t.createOscillator();n.type=`sine`,n.frequency.value=e,n.connect(this.drone),n.start()}this.drone.connect(this.sfxBus),this.pickVoice()}chantOscs=[];pickVoice(){try{let e=()=>{let e=window.speechSynthesis?.getVoices()??[];this.voice=e.find(e=>e.lang===`pt-BR`)??e.find(e=>e.lang.startsWith(`pt`))??null};e(),window.speechSynthesis?.addEventListener?.(`voiceschanged`,e)}catch{}}setVolumes(e){if(Object.assign(this.volumes,e),!this.ctx)return;let t=this.ctx.currentTime;this.master.gain.setTargetAtTime(this.volumes.master,t,.05),this.crowdBus.gain.setTargetAtTime(this.volumes.crowd,t,.05),this.sfxBus.gain.setTargetAtTime(this.volumes.sfx,t,.05)}setExcitement(e){this.excitement=e}setTension(e){this.tension=e}setChant(e){this.chantOn=e}updateListener(e,t){let n=this.ctx;if(!n)return;let r=n.listener;r.positionX&&(r.positionX.value=e.x,r.positionY.value=e.y,r.positionZ.value=e.z,r.forwardX.value=t.x,r.forwardY.value=t.y,r.forwardZ.value=t.z,r.upX.value=0,r.upY.value=1,r.upZ.value=0)}update(e){let t=this.ctx;if(!t)return;let n=t.currentTime,r=1-.75*this.tension;if(this.murmur.gain.setTargetAtTime((.35+.45*this.excitement)*r,n,.4),this.roar.gain.setTargetAtTime(Math.max(0,this.excitement-.45)*1.4*r,n,.25),this.roarFilter.frequency.setTargetAtTime(900+2600*this.excitement,n,.3),this.drone.gain.setTargetAtTime(.06*this.tension,n,.5),this.tension>.35&&(this.heartbeatTimer-=e,this.heartbeatTimer<=0&&(this.heartbeatTimer=60/(68+50*this.tension),this.thump(52,.32*this.tension,.11),setTimeout(()=>this.thump(48,.22*this.tension,.1),190))),this.chantOn&&this.tension<.3){if(this.chantTimer-=e,this.chantTimer<=0){let e=[196,196,220,246.9,220,196,174.6,196],t=e[this.chantStep%e.length];this.chantStep++,this.chantTimer=this.chantStep%4==0?.62:.31;for(let e of this.chantOscs)e.frequency.setTargetAtTime(t,n,.02);this.chant.gain.cancelScheduledValues(n),this.chant.gain.setValueAtTime(this.chant.gain.value,n),this.chant.gain.linearRampToValueAtTime(.22*this.volumes.crowd,n+.05),this.chant.gain.linearRampToValueAtTime(.05,n+this.chantTimer*.95)}}else this.chant.gain.setTargetAtTime(0,n,.3);this.whistleTimer-=e,this.whistleTimer<=0&&(this.whistleTimer=2.5+this.chantStep*7919%50/10,this.tension>.2&&this.tension<.8&&this.crowdWhistle())}env(e,t,n,r,i){e.gain.setValueAtTime(1e-4,t),e.gain.exponentialRampToValueAtTime(Math.max(2e-4,r),t+n),e.gain.exponentialRampToValueAtTime(1e-4,t+n+i)}spatial(e){let t=this.ctx;if(!e)return this.sfxBus;let n=t.createPanner();return n.panningModel=`HRTF`,n.distanceModel=`inverse`,n.refDistance=4,n.rolloffFactor=.6,n.positionX&&(n.positionX.value=e.x,n.positionY.value=e.y,n.positionZ.value=e.z),n.connect(this.sfxBus),n}noiseBurst(e,t,n,r,i,a,o=`bandpass`){let s=this.ctx,c=s.createBufferSource();c.buffer=this.noise;let l=s.createBiquadFilter();l.type=o,l.frequency.value=n,l.Q.value=r;let u=s.createGain();this.env(u,t,.003,i,a),c.connect(l).connect(u).connect(e),c.start(t,n%3+.1,a+.1)}thump(e,t,n,r=this.sfxBus){let i=this.ctx;if(!i)return;let a=i.currentTime,o=i.createOscillator();o.type=`sine`,o.frequency.setValueAtTime(e*2.2,a),o.frequency.exponentialRampToValueAtTime(e,a+n*.6);let s=i.createGain();this.env(s,a,.004,t,n),o.connect(s).connect(r),o.start(a),o.stop(a+n+.05)}kick(e,t,n){if(!this.ctx)return;let r=this.spatial(t),i=Math.min(1,e/30),a=this.ctx.currentTime;this.thump(n===`laces`?62:74,.5+.7*i,.12,r),this.noiseBurst(r,a,n===`inside`?900:1400,1.2,.25+.5*i,.05),this.noiseBurst(r,a,3500,2,.1*i,.025)}post(e,t){let n=this.ctx;if(!n)return;let r=this.spatial(t),i=n.currentTime,a=Math.min(1,e/25);for(let[e,t,o]of[[612,1.4,1],[1490,.9,.6],[2730,.6,.42],[4180,.4,.3],[5930,.25,.18]]){let s=n.createOscillator();s.type=`sine`,s.frequency.value=e*(1+.002*a);let c=n.createGain();this.env(c,i,.002,.35*o*(.3+a),t*(.5+.5*a)),s.connect(c).connect(r),s.start(i),s.stop(i+t+.1)}this.thump(70,.6*a+.2,.09,r),this.noiseBurst(r,i,2e3,.8,.3*a,.04)}net(e,t){if(!this.ctx)return;let n=this.spatial(t),r=this.ctx.currentTime,i=Math.min(1,e/25);this.noiseBurst(n,r,4200,.6,.35*i+.05,.45),this.noiseBurst(n,r+.02,800,.8,.25*i,.3)}glove(e,t){if(!this.ctx)return;let n=this.spatial(t),r=this.ctx.currentTime,i=Math.min(1,e/25);this.noiseBurst(n,r,1100,1.4,.45*i+.1,.07),this.thump(95,.35*i+.1,.07,n)}bounce(e,t){if(!this.ctx)return;let n=this.spatial(t);this.thump(85,Math.min(.5,e/18),.07,n),this.noiseBurst(n,this.ctx.currentTime,600,.9,Math.min(.15,e/60),.05)}board(e,t){if(!this.ctx)return;let n=this.spatial(t);this.thump(120,Math.min(.6,e/20),.1,n),this.noiseBurst(n,this.ctx.currentTime,300,1.5,Math.min(.4,e/30),.15)}whistle(e=!1){let t=this.ctx;if(!t)return;let n=t.currentTime,r=e?1.1:.45,i=t.createGain();i.gain.setValueAtTime(1e-4,n),i.gain.exponentialRampToValueAtTime(.18,n+.02),i.gain.setValueAtTime(.18,n+r-.05),i.gain.exponentialRampToValueAtTime(1e-4,n+r);let a=t.createOscillator();a.frequency.value=28;let o=t.createGain();o.gain.value=.08,a.connect(o).connect(i.gain);for(let e of[2950,3180]){let a=t.createOscillator();a.type=`sine`,a.frequency.value=e,a.connect(i),a.start(n),a.stop(n+r+.05)}a.start(n),a.stop(n+r),i.connect(this.sfxBus)}crowdWhistle(){let e=this.ctx,t=e.currentTime,n=e.createOscillator();n.type=`sine`;let r=2200+this.chantStep*331%900;n.frequency.setValueAtTime(r,t),n.frequency.linearRampToValueAtTime(r*1.15,t+.35);let i=e.createGain();this.env(i,t,.03,.035,.4);let a=e.createStereoPanner();a.pan.value=this.chantStep*.37%2-1,n.connect(i).connect(a).connect(this.crowdBus),n.start(t),n.stop(t+.5)}reaction(e,t=1){let n=this.ctx;if(!n)return;let r=n.currentTime,i=n.createGain(),a=n.createBufferSource();a.buffer=this.noise;let o=n.createBiquadFilter();o.type=e===`miss`||e===`gasp`?`bandpass`:`lowpass`,a.connect(o).connect(i).connect(this.crowdBus),e===`goal`||e===`save`?(o.frequency.setValueAtTime(900,r),o.frequency.linearRampToValueAtTime(3800,r+.4),i.gain.setValueAtTime(1e-4,r),i.gain.exponentialRampToValueAtTime(1.2*t,r+.25),i.gain.setTargetAtTime(.5*t,r+1.2,1.2),i.gain.setTargetAtTime(1e-4,r+4.5,.8),a.start(r,.5,8)):(o.Q.value=3,o.frequency.setValueAtTime(e===`post`?780:700,r),o.frequency.exponentialRampToValueAtTime(330,r+1.4),i.gain.setValueAtTime(1e-4,r),i.gain.exponentialRampToValueAtTime(1.4*t,r+.15),i.gain.exponentialRampToValueAtTime(1e-4,r+2.2),a.start(r,1.1,3))}say(e,t=!1){if(this.narrator)try{let n=window.speechSynthesis;if(!n)return;n.cancel();let r=new SpeechSynthesisUtterance(e);r.lang=`pt-BR`,this.voice&&(r.voice=this.voice),r.rate=t?1.15:1,r.pitch=t?1.2:1,r.volume=.9*this.volumes.master,n.speak(r)}catch{}}},X=(e,t,n)=>e<t?t:e>n?n:e,_l=(e,t,n)=>e+(t-e)*n,vl=e=>{let t=X(e,0,1);return t*t*(3-2*t)},yl=e=>{let t=X(e,0,1);return t*t*t*(t*(t*6-15)+10)},bl=(e,t)=>1-Math.exp(-e/Math.max(1e-4,t));function xl(e,t,n,r,i,a,o){let s=a*a,c=s*a,l=2*c-3*s+1,u=c-2*s+a,d=-2*c+3*s,f=c-s;return o.copy(e).multiplyScalar(l).addScaledVector(t,u*i).addScaledVector(n,d).addScaledVector(r,f*i)}function Sl(e,t,n,r,i,a,o){let s=a*a,c=6*s-6*a,l=3*s-4*a+1,u=-6*s+6*a,d=3*s-2*a;return o.copy(e).multiplyScalar(c/i).addScaledVector(t,l).addScaledVector(n,u/i).addScaledVector(r,d)}function Cl(e){return Math.atan2(e.x,e.z)}var wl={behind:`Atrás do cobrador`,firstPerson:`Primeira pessoa`,side:`Lateral`,keeper:`Atrás do goleiro`,tv:`Transmissão TV`,cinematic:`Cinematográfica`,keeperPOV:`Visão do goleiro`},Tl=[`behind`,`firstPerson`,`side`,`keeper`,`tv`,`cinematic`],El=[`keeperPOV`,`keeper`,`tv`,`side`,`behind`,`cinematic`],Dl=class{camera;mode=`behind`;eye=new W(0,1.7,15);target=new W(0,1.2,0);fov=42;shakeAmt=0;shakeT=0;cutNext=!0;dofFocus=10;dofWanted=!1;constructor(e){this.camera=e}setMode(e,t=!0){this.mode=e,t&&(this.cutNext=!0)}shake(e){this.shakeAmt=Math.max(this.shakeAmt,e)}update(e,t){let n=new W,r=new W,i=42,a=.25,o=!1,s=t.kicked&&t.followBall&&t.sinceKick>.05;switch(this.mode){case`behind`:t.kicked?n.set(.35,2.75,15.6):n.set(t.kickerPos.x*.45+.35,2.75,Math.max(t.kickerPos.z+4.2,15.6)),r.set(t.aim.x*.22,.95,0),i=34,s&&(r.lerp(t.ball,.45),i=31);break;case`firstPerson`:n.copy(t.kickerHead).add(new W(0,.06,0)).addScaledVector(t.kickerFwd,.12),r.set(t.aim.x*.4,1,0),t.kicked?t.followBall&&r.lerp(t.ball,.6):r.lerp(t.ball,.25),i=64,a=.06;break;case`side`:n.set(17,3.2,6.5),r.set(0,1,5.5),s&&r.lerp(t.ball,.5),i=44;break;case`keeper`:n.set(.6,2.25,-7.8),r.set(0,1,9.5),s&&r.lerp(t.ball,.35),i=38;break;case`keeperPOV`:n.set(t.keeperPos.x*.6,1.95,-1.35),r.set(t.keeperPos.x*.3,.9,11),i=56,a=.12;break;case`tv`:n.set(-46,19,16),r.set(0,.8,4.5),s&&r.lerp(t.ball,.4),i=15;break;case`cinematic`:if(t.kicked){let e=t.ballVel.clone();e.lengthSq()<1&&e.set(0,0,-1),e.normalize();let o=t.ball.clone().addScaledVector(e,-2.4).add(new W(.7,.45,0));o.z<2.5&&o.set(t.ball.x*.4+1.2,1.2,3),n.copy(o),r.copy(t.ball),i=40,a=.1,this.dofFocus=n.distanceTo(t.ball)}else{let e=t.kickerFwd.clone().cross(new W(0,1,0)).normalize();n.copy(t.ball).addScaledVector(e,1.6).add(new W(0,.35,.9)),r.copy(t.kickerPos).add(new W(0,.7,0)).lerp(t.ball,.5),i=34,this.dofFocus=n.distanceTo(r)}o=!0}if(this.dofWanted=o,o||(this.dofFocus=n.distanceTo(t.kicked?t.ball:t.kickerPos)),this.cutNext)this.eye.copy(n),this.target.copy(r),this.fov=i,this.cutNext=!1;else{let t=bl(e,a);this.eye.lerp(n,t),this.target.lerp(r,bl(e,a*.7)),this.fov+=(i-this.fov)*t}this.apply(e)}place(e,t,n,r,i=0){i<=0||this.cutNext?(this.eye.copy(e),this.target.copy(t),this.fov=n,this.cutNext=!1):(this.eye.lerp(e,bl(r,i)),this.target.lerp(t,bl(r,i*.7)),this.fov+=(n-this.fov)*bl(r,i)),this.apply(r)}apply(e){let t=this.camera;if(t.position.copy(this.eye),this.shakeT+=e,this.shakeAmt>.001){let n=this.shakeAmt;t.position.x+=Math.sin(this.shakeT*53)*n*.03,t.position.y+=Math.sin(this.shakeT*71+1)*n*.025,this.shakeAmt*=Math.exp(-e*7)}t.lookAt(this.target),Math.abs(t.fov-this.fov)>.01&&(t.fov=this.fov,t.updateProjectionMatrix())}};function Ol(e){let t=e.height/1.83;return{hipsY:.985*t,spine:.1*t,chest:.17*t,neck:.215*t,head:.09*t,shoulderX:.19*t*(.94+.06*e.build),shoulderY:.165*t,upperArm:.29*t,foreArm:.26*t,hand:.19*t,hipX:.092*t,hipDrop:.075*t,thigh:.44*t,shin:.405*t,ankleH:.075*t,footLen:.26*t}}var kl=new Qt,Al=new kt,jl=new kt,Ml=new W,Nl=new W,Pl=new W,Fl=new W,Il=new W,Ll=class{dims;root=new En;bones={};prop;rest={};constructor(e){this.dims=e;let t=this.prop=Ol(e),n=(e,t,n,r,i)=>{let a=new En;return a.name=e,a.position.set(n,r,i),t.add(a),this.bones[e]=a,this.rest[e]=new W(n,r,i),a},r=n(`hips`,this.root,0,t.hipsY,0),i=n(`chest`,n(`spine`,r,0,t.spine,-.005),0,t.chest,-.01);n(`head`,n(`neck`,i,0,t.neck,-.005),0,t.head,.012);for(let e of[`L`,`R`]){let a=e===`L`?1:-1,o=n(`clav${e}`,i,a*.035,t.shoulderY-.005,-.005),s=n(`upperArm${e}`,o,a*(t.shoulderX-.035),0,0),c=n(`foreArm${e}`,s,0,-t.upperArm,0);n(`hand${e}`,c,0,-t.foreArm,0);let l=n(`thigh${e}`,r,a*t.hipX,-t.hipDrop,0),u=n(`shin${e}`,l,0,-t.thigh,0),d=n(`foot${e}`,u,0,-t.shin,0);n(`toe${e}`,d,0,-t.ankleH*.4,t.footLen*.62)}this.root.updateMatrixWorld(!0)}resetPose(){for(let e of Object.keys(this.bones))this.bones[e].quaternion.identity(),this.bones[e].position.copy(this.rest[e])}worldPos(e,t=new W){return this.bones[e].getWorldPosition(t)}update(){this.root.updateMatrixWorld(!0)}setWorldBasis(e,t,n){let r=this.bones[e];Nl.copy(t).normalize(),Pl.copy(n).addScaledVector(Nl,-n.dot(Nl)),Pl.lengthSq()<1e-8&&(Pl.set(0,0,1).addScaledVector(Nl,-Nl.z),Pl.lengthSq()<1e-8&&Pl.set(1,0,0)),Pl.normalize(),Ml.crossVectors(Nl,Pl).normalize(),kl.makeBasis(Ml,Nl,Pl),Al.setFromRotationMatrix(kl),r.parent.getWorldQuaternion(jl),r.quaternion.copy(jl.invert().multiply(Al)),r.updateMatrixWorld(!0)}aimLimb(e,t,n){Fl.copy(t).negate(),this.setWorldBasis(e,Fl,n)}setWorldQuat(e,t){let n=this.bones[e];n.parent.getWorldQuaternion(jl),n.quaternion.copy(jl.invert().multiply(t)),n.updateMatrixWorld(!0)}twoBoneIK(e,t,n,r,i,a,o){let s=this.bones[e];s.parent.updateMatrixWorld(!0);let c=s.getWorldPosition(new W),l=Il.subVectors(r,c),u=l.length(),d=u/(a+o),f=(a+o)*.9995,p=Math.abs(a-o)+.01;u=Math.max(p,Math.min(f,u));let m=l.normalize(),h=(a*a+u*u-o*o)/(2*a*u),g=Math.acos(Math.max(-1,Math.min(1,h))),_=new W().copy(i).addScaledVector(m,-i.dot(m));_.lengthSq()<1e-8&&_.set(0,0,1).addScaledVector(m,-m.z),_.normalize();let v=new W().copy(m).multiplyScalar(Math.cos(g)).addScaledVector(_,Math.sin(g)),y=c.clone().addScaledVector(v,a),b=c.clone().addScaledVector(m,u).sub(y).normalize();return this.aimLimb(e,v,_),this.aimLimb(t,b,_),d}},Rl=class{keys=new Set;pressedKeys=new Set;releasedKeys=new Set;pointer={x:0,y:0,active:!1,moved:!1};pointerDown=!1;pointerPressed=!1;pointerReleased=!1;wheel=0;drag={x:0,y:0};virtual={action:!1,stutter:!1,faster:!1,slower:!1};vPrev={action:!1,stutter:!1};pad=null;padPrev=[];padNow=[];lastDevice=`keyboard`;enabled=!0;constructor(e){window.addEventListener(`keydown`,e=>{e.target?.tagName!==`INPUT`&&([`Space`,`ArrowUp`,`ArrowDown`,`ArrowLeft`,`ArrowRight`,`Tab`].includes(e.code)&&e.preventDefault(),this.keys.has(e.code)||this.pressedKeys.add(e.code),this.keys.add(e.code),this.lastDevice=`keyboard`)}),window.addEventListener(`keyup`,e=>{this.keys.delete(e.code),this.releasedKeys.add(e.code)}),window.addEventListener(`blur`,()=>this.keys.clear()),e.addEventListener(`pointermove`,t=>{let n=e.getBoundingClientRect();this.pointer.x=(t.clientX-n.left)/n.width*2-1,this.pointer.y=-((t.clientY-n.top)/n.height*2-1),this.pointer.active=!0,this.pointer.moved=!0,t.pointerType===`touch`?(this.drag.x+=t.movementX||0,this.drag.y+=t.movementY||0,this.lastDevice=`touch`):this.lastDevice=`keyboard`}),e.addEventListener(`pointerdown`,e=>{e.pointerType===`touch`?(this.lastDevice=`touch`,this.lastTouch={x:e.clientX,y:e.clientY}):e.button===0&&(this.pointerDown=!0,this.pointerPressed=!0)}),e.addEventListener(`touchmove`,e=>{let t=e.touches[0];t&&this.lastTouch&&(this.drag.x+=t.clientX-this.lastTouch.x,this.drag.y+=t.clientY-this.lastTouch.y,this.lastTouch={x:t.clientX,y:t.clientY}),e.preventDefault()},{passive:!1}),window.addEventListener(`pointerup`,e=>{e.pointerType===`touch`?this.lastTouch=null:e.button===0&&this.pointerDown&&(this.pointerDown=!1,this.pointerReleased=!0)}),e.addEventListener(`pointerleave`,()=>this.pointer.active=!1),e.addEventListener(`wheel`,e=>{this.wheel+=Math.sign(e.deltaY),e.preventDefault()},{passive:!1}),e.addEventListener(`contextmenu`,e=>e.preventDefault())}lastTouch=null;poll(){let e=navigator.getGamepads?navigator.getGamepads():[];this.pad=null;for(let t of e)if(t&&t.connected){this.pad=t;break}this.padPrev=this.padNow,this.padNow=this.pad?this.pad.buttons.map(e=>e.pressed):[],this.pad&&(this.padNow.some(e=>e)||this.pad.axes.some(e=>Math.abs(e)>.3))&&(this.lastDevice=`gamepad`)}endFrame(){this.pressedKeys.clear(),this.releasedKeys.clear(),this.pointerPressed=!1,this.pointerReleased=!1,this.pointer.moved=!1,this.wheel=0,this.drag.x=this.drag.y=0,this.vPrev.action=this.virtual.action,this.vPrev.stutter=this.virtual.stutter}key(e){return this.enabled&&this.keys.has(e)}pressed(e){return this.enabled&&this.pressedKeys.has(e)}padBtn(e){return!!this.padNow[e]}padPressed(e){return!!this.padNow[e]&&!this.padPrev[e]}padAxis(e){let t=this.pad?.axes[e]??0;return Math.abs(t)<.15?0:t}padTrigger(e){return this.pad?.buttons[e]?.value??0}actionDown(){return this.key(`Space`)||this.pointerDown||this.padBtn(0)||this.virtual.action}actionPressed(){return this.pressed(`Space`)||this.pointerPressed||this.padPressed(0)||this.virtual.action&&!this.vPrev.action}actionReleased(){return this.releasedKeys.has(`Space`)||this.pointerReleased||!!this.padPrev[0]&&!this.padNow[0]||!this.virtual.action&&this.vPrev.action}stutterPressed(){return this.pressed(`ShiftLeft`)||this.pressed(`ShiftRight`)||this.padPressed(1)||this.virtual.stutter&&!this.vPrev.stutter}speedAxis(){let e=0;return(this.key(`KeyW`)||this.key(`ArrowUp`)||this.virtual.faster)&&(e+=1),(this.key(`KeyS`)||this.key(`ArrowDown`)||this.virtual.slower)&&--e,e+=this.padTrigger(7)-this.padTrigger(6),Math.max(-1,Math.min(1,e))}aimAxis(){let e=0,t=0;return(this.key(`KeyA`)||this.key(`ArrowLeft`))&&--e,(this.key(`KeyD`)||this.key(`ArrowRight`))&&(e+=1),(this.key(`KeyW`)||this.key(`ArrowUp`))&&(t+=1),(this.key(`KeyS`)||this.key(`ArrowDown`))&&--t,e+=this.padAxis(0)+ +!!this.padBtn(15)-+!!this.padBtn(14),t+=-this.padAxis(1)+ +!!this.padBtn(12)-+!!this.padBtn(13),{x:Math.max(-1,Math.min(1,e)),y:Math.max(-1,Math.min(1,t))}}spinAxis(){let e=this.padAxis(2),t=-this.padAxis(3);return this.key(`KeyJ`)&&--e,this.key(`KeyL`)&&(e+=1),this.key(`KeyI`)&&(t+=1),this.key(`KeyK`)&&--t,{x:e,y:t}}techniquePressed(){for(let e=1;e<=7;e++)if(this.pressed(`Digit`+e)||this.pressed(`Numpad`+e))return e-1;return null}techniqueCycle(){return(this.pressed(`KeyE`)||this.padPressed(5)?1:0)-(this.pressed(`KeyQ`)||this.padPressed(4)?1:0)}footPressed(){return this.pressed(`KeyT`)||this.padPressed(2)}cameraPressed(){return this.pressed(`KeyC`)||this.padPressed(3)}followPressed(){return this.pressed(`KeyV`)}pausePressed(){return this.pressed(`Escape`)||this.pressed(`KeyP`)||this.padPressed(9)}replayPressed(){return this.pressed(`KeyR`)||this.padPressed(8)}continuePressed(){return this.pressed(`Enter`)||this.pressed(`Space`)||this.padPressed(0)}runAdjust(){return{dist:+!!this.pressed(`BracketRight`)-!!this.pressed(`BracketLeft`),angle:+!!this.pressed(`Period`)-!!this.pressed(`Comma`)}}hasGamepad(){return!!this.pad}},zl=9.81,Bl=1.204,Vl=1516e-8,Z={mass:.43,radius:.11,get area(){return Math.PI*this.radius*this.radius},get inertia(){return 2/3*this.mass*this.radius*this.radius}},Q={halfWidth:3.66,height:2.44,postRadius:.06,lineWidth:.12,netDepthTop:1,netDepthBottom:2,get postX(){return this.halfWidth+this.postRadius},get barY(){return this.height+this.postRadius},get postZ(){return-this.lineWidth/2}},Hl=-Q.lineWidth-Z.radius,Ul=1/240,Wl=.02,Gl=class e{p=new W;v=new W;w=new W;q=new kt;copy(e){return this.p.copy(e.p),this.v.copy(e.v),this.w.copy(e.w),this.q.copy(e.q),this}clone(){return new e().copy(this)}},Kl=()=>({wind:new W,airDensity:Bl});function ql(e){return e*2*Z.radius/Vl}function Jl(e,t){let n=ql(e);return .2+.27/(1+Math.exp((n-2e5)/25e3))+.12*Math.min(t,.6)}function Yl(e){let t=Math.min(e,1.2);return 1.2*t/(1+1.8*t)}function Xl(e,t){let n=Math.min(1,Math.max(0,(e-14)/8)),r=n*n*(3-2*n);return .05*Math.exp(-t/.012)*r}var Zl=new W(.8,.36,.48).normalize(),Ql=new W,$l=new W,eu=new W;function tu(e,t,n,r,i){i.set(0,-zl,0),Ql.copy(e).sub(r.wind);let a=Ql.length();if(a<1e-4)return i;let o=t.length(),s=Z.radius*o/a,c=.5*r.airDensity*Z.area/Z.mass,l=Jl(a,s);if(i.addScaledVector(Ql,-c*l*a),o>.001){let e=Yl(s);$l.crossVectors(t,Ql);let n=$l.length();n>1e-9&&i.addScaledVector($l,c*e*a*a/n)}let u=Xl(a,s);if(u>1e-5){eu.copy(Zl).applyQuaternion(n);let e=eu.dot(Ql)/a;eu.addScaledVector(Ql,-e/a);let t=Math.sin(3*Math.acos(Math.max(-1,Math.min(1,e))));i.addScaledVector(eu,c*u*a*a*t)}return i}function nu(e){return .03+.0045*e}var ru=new W,iu=new W,au=new W,ou=new W,su=new W,cu=new W,lu=new W,uu=new W,du=new W,fu=new kt,pu=new W;function mu(e,t,n,r,i,a){return tu(t,n.w,n.q,r,a),i&&(pu.set(0,0,0),i(e,t,pu),a.add(pu)),a}var hu=new W;function gu(e,t,n,r=null){let i=e.p,a=e.v;mu(i,a,e,n,r,su),ru.copy(a),hu.copy(i).addScaledVector(ru,t/2),du.copy(a).addScaledVector(su,t/2),iu.copy(du),mu(hu,du,e,n,r,cu),hu.copy(i).addScaledVector(iu,t/2),du.copy(a).addScaledVector(cu,t/2),au.copy(du),mu(hu,du,e,n,r,lu),hu.copy(i).addScaledVector(au,t),du.copy(a).addScaledVector(lu,t),ou.copy(du),mu(hu,du,e,n,r,uu),i.addScaledVector(ru,t/6).addScaledVector(iu,t/3).addScaledVector(au,t/3).addScaledVector(ou,t/6),a.addScaledVector(su,t/6).addScaledVector(cu,t/3).addScaledVector(lu,t/3).addScaledVector(uu,t/6),e.w.multiplyScalar(Math.exp(-nu(Ql.copy(a).sub(n.wind).length())*t)),_u(e,t)}function _u(e,t){let n=e.w,r=n.length();if(r<1e-9)return;let i=r*t;fu.setFromAxisAngle($l.copy(n).divideScalar(r),i),e.q.premultiply(fu).normalize()}var vu=class{radius;kind;material;effectiveMass;part;a=new W;b=new W;prevA=new W;prevB=new W;constructor(e,t,n,r=1/0,i=``){this.radius=e,this.kind=t,this.material=n,this.effectiveMass=r,this.part=i}set(e,t){return this.a.copy(e),this.b.copy(t),this.prevA.copy(e),this.prevB.copy(t),this}moveTo(e,t){this.prevA.copy(this.a),this.prevB.copy(this.b),this.a.copy(e),this.b.copy(t)}settle(){this.prevA.copy(this.a),this.prevB.copy(this.b)}},yu=new W,bu=new W;function xu(e,t,n){yu.subVectors(t,e);let r=yu.lengthSq();return r<1e-12?0:(bu.subVectors(n,e),Math.max(0,Math.min(1,bu.dot(yu)/r)))}function Su(e,t,n,r){let i=xu(e,t,n);return r.copy(e).lerp(t,i)}var Cu=new W,wu=new W,Tu=new W;function Eu(e,t,n,r){n.copy(e.prevA).lerp(e.a,t),r.copy(e.prevB).lerp(e.b,t)}function Du(e,t,n){return Eu(e,t,Cu,wu),Su(Cu,wu,n,Tu),Tu.distanceTo(n)-(Z.radius+e.radius)}var Ou=new W,ku=new W,Au=new W,ju=new W,Mu=new W;function Nu(e,t,n,r,i,a){let o=Z.mass,s=Z.radius,c=Z.inertia;Ou.copy(t).multiplyScalar(-s),ku.crossVectors(e.w,Ou).add(e.v).sub(n);let l=ku.dot(t);if(l>=0)return null;let u=Number.isFinite(i)?1/i:0,d=-(1+r.restitution(-l))*l/(1/o+u);e.v.addScaledVector(t,d/o),Au.copy(ku).addScaledVector(t,-l);let f=Au.length();if(f>1e-6){let t=f/(1/o+s*s/c+u),n=Math.min(t,r.friction*d);ju.copy(Au).multiplyScalar(-n/f),e.v.addScaledVector(ju,1/o),Mu.crossVectors(Ou,ju),e.w.addScaledVector(Mu,1/c)}let p=a??{vn:0,slip:0,impulse:0,point:new W,normal:new W};return p.vn=-l,p.slip=f,p.impulse=d,p.point.copy(e.p).add(Ou),p.normal.copy(t),p}var Pu=(e,t,n)=>Math.max(t,Math.min(n,e)),Fu={restitution:e=>e<.25?0:Pu(.68-.012*e,.48,.68),friction:.55},Iu={restitution:e=>Pu(.74-.008*e,.5,.74),friction:.28},Lu={restitution:e=>Pu(.45-.006*e,.25,.45),friction:.4},Ru={restitution:e=>Pu(.42-.006*e,.18,.42),friction:.85},zu={restitution:e=>Pu(.5-.007*e,.25,.5),friction:.5},Bu={restitution:e=>Pu(.55-.006*e,.3,.55),friction:.45},Vu=Q.postZ-Q.postRadius,Hu=Q.barY,Uu=Q.postX,Wu=Vu-Q.netDepthTop,Gu=Vu-Q.netDepthBottom;function Ku(e,t,n,r,i,a,o=-1){let s=new W().subVectors(n,t),c=new W().subVectors(r,t),l=new W().crossVectors(s,c).normalize();l.dot(new W().subVectors(a,t))<0&&l.negate();let u=t.clone(),d=new W,f=new W,p=new W;return{id:e,n:l,o:u,toAB:e=>{let a=.5,o=.5;for(let s=0;s<6;s++){f.copy(t).lerp(n,a),p.copy(r).lerp(i,a);let s=d.copy(f).lerp(p,o).sub(e),c=new W().subVectors(n,t).multiplyScalar(1-o).addScaledVector(new W().subVectors(i,r),o),l=new W().subVectors(p,f),u=c.dot(c),m=c.dot(l),h=l.dot(l),g=-s.dot(c),_=-s.dot(l),v=u*h-m*m;if(Math.abs(v)<1e-12)break;a+=(g*h-_*m)/v,o+=(u*_-m*g)/v}return a<0||a>1||o<0||o>1?null:[a,o]},corners:[t,n,r,i],looseB:o}}var qu=new W(0,1,(Vu+Gu)/2),Ju=[Ku(`roof`,new W(-Uu,Hu,Vu),new W(Uu,Hu,Vu),new W(-Uu,Hu,Wu),new W(Uu,Hu,Wu),qu),Ku(`back`,new W(-Uu,Hu,Wu),new W(Uu,Hu,Wu),new W(-Uu,0,Gu),new W(Uu,0,Gu),qu,1),Ku(`left`,new W(-Uu,0,Vu),new W(-Uu,0,Gu),new W(-Uu,Hu,Vu),new W(-Uu,Hu,Wu),qu,0),Ku(`right`,new W(Uu,0,Vu),new W(Uu,0,Gu),new W(Uu,Hu,Vu),new W(Uu,Hu,Wu),qu,0)],Yu={k1:260,k3:3200,zetaIn:.8,zetaOut:2.6,grip:.55,maxDeflection:.95};function Xu(e,t,n=-1){let r=n===1?t*.5:n===0?.5+t*.5:t;return 1/(.12+.88*(16*e*(1-e)*r*(1-r)))}var Zu=new W,Qu=new W,$u=class{engaged=new Int8Array(Ju.length);lastSide=new Int8Array(Ju.length);deflection=new Float32Array(Ju.length);reset(e){for(let t=0;t<Ju.length;t++){let n=Ju[t],r=Zu.subVectors(e,n.o).dot(n.n);this.lastSide[t]=r>=0?1:-1,this.engaged[t]=0,this.deflection[t]=0}}updateState(e,t,n){let r=Z.radius;for(let i=0;i<Ju.length;i++){let a=Ju[i],o=Zu.subVectors(e,a.o).dot(a.n),s=this.engaged[i];if(s!==0){let e=r-s*o;e<=0?(this.engaged[i]=0,this.lastSide[i]=s,this.deflection[i]=0):this.deflection[i]=e}else if(Math.abs(o)<r&&a.toAB(e)){let s=this.lastSide[i];this.engaged[i]=s,this.deflection[i]=r-s*o,n&&n.push({panel:a.id,speed:Math.abs(t.dot(a.n)),point:e.clone()})}else this.lastSide[i]=o>=0?1:-1}}field=(e,t,n)=>{let r=Z.radius;for(let i=0;i<Ju.length;i++){let a=this.engaged[i];if(a===0)continue;let o=Ju[i],s=Zu.subVectors(e,o.o).dot(o.n),c=r-a*s;if(c<=0)continue;let l=o.toAB(Zu.copy(e).addScaledVector(o.n,-s)),u=Xu(l?l[0]:.02,l?l[1]:.02,o.looseB),d=Yu,f=u*(d.k1*c+d.k3*c*c*c),p=-a*t.dot(o.n),m=u*(d.k1+3*d.k3*c*c),h=2*Math.sqrt(m*Z.mass);f+=(p>0?d.zetaIn:d.zetaOut)*h*p,c>d.maxDeflection&&(f+=4e4*(c-d.maxDeflection)+60*Math.max(0,p)),f<0&&(f=0),n.addScaledVector(o.n,a*f/Z.mass),Qu.copy(t).addScaledVector(o.n,-t.dot(o.n));let g=Qu.length();if(g>1e-4){let e=Math.min(d.grip*f,Z.mass*g/.004);n.addScaledVector(Qu,-e/(Z.mass*g))}}}},ed=-5.2,td=.95,nd=class{ball=new Gl;env=Kl();net=new $u;time=0;frame=[];dynamic=[];events=[];holder=null;resting=!1;onGround=!1;crossedLine=!1;lastSubsteps=0;netEvents=[];contact={vn:0,slip:0,impulse:0,point:new W,normal:new W};constructor(){let e=Q.postX,t=Q.postZ,n=Q.postRadius,r=new vu(n,`post`,Iu,1/0,`leftPost`).set(new W(-e,-.5,t),new W(-e,Q.barY,t)),i=new vu(n,`post`,Iu,1/0,`rightPost`).set(new W(e,-.5,t),new W(e,Q.barY,t)),a=new vu(n,`bar`,Iu,1/0,`crossbar`).set(new W(-e,Q.barY,t),new W(e,Q.barY,t));this.frame.push(r,i,a)}reset(e){this.ball.p.copy(e),this.ball.v.set(0,0,0),this.ball.w.set(0,0,0),this.ball.q.identity(),this.time=0,this.events.length=0,this.holder=null,this.resting=!0,this.onGround=!0,this.crossedLine=!1,this.net.reset(e)}wake(){this.resting=!1}step(e){this.events.length=0;let t=this.ball;if(this.holder){t.v.subVectors(this.holder.target,t.p).divideScalar(e),t.p.copy(this.holder.target),t.w.multiplyScalar(Math.exp(-8*e)),this.time+=e;return}if(this.resting){this.time+=e;return}let n=t.v.length(),r=Math.ceil(n*e/Wl);r=Math.max(4,Math.min(96,r)),this.lastSubsteps=r;let i=e/r;for(let e=0;e<r;e++)this.substep(i,(e+1)/r,e/r);this.time+=e,this.onGround&&t.v.lengthSq()<4e-4&&t.w.lengthSq()<.04&&(t.v.set(0,0,0),t.w.set(0,0,0),this.resting=!0)}p0=new W;tmpA=new W;tmpB=new W;tmpC=new W;tmpN=new W;tmpV=new W;substep(e,t,n){let r=this.ball,i=Z.radius;this.p0.copy(r.p);let a=this.anyNetEngaged()||this.nearNet(r.p)?this.net.field:null;gu(r,e,this.env,a),this.netEvents.length=0,this.net.updateState(r.p,r.v,this.netEvents);for(let e of this.netEvents)this.events.push({type:`net`,time:this.time,speed:e.speed,point:e.point,part:e.panel});if(!this.crossedLine&&this.p0.z>=Hl&&r.p.z<Hl){let e=(this.p0.z-Hl)/(this.p0.z-r.p.z),t=this.p0.x+(r.p.x-this.p0.x)*e,n=this.p0.y+(r.p.y-this.p0.y)*e;this.crossedLine=!0;let i=Math.abs(t)<Q.halfWidth&&n<Q.height&&n>-.01;this.events.push({type:`goalLine`,time:this.time,speed:r.v.length(),point:new W(t,n,Hl),inside:i})}for(let r of this.frame)this.collideCapsule(r,n,t,e);for(let r of this.dynamic)this.collideCapsule(r,n,t,e);if(r.p.z-i<ed&&this.p0.z-i>=ed&&r.p.y<td+i&&Math.abs(r.p.x)<30){r.p.z=ed+i;let e=Nu(r,this.tmpN.set(0,0,1),this.tmpV.set(0,0,0),Lu,1/0,this.contact);e&&this.events.push({type:`board`,time:this.time,speed:e.vn,point:e.point.clone()})}if(this.onGround=!1,r.p.y<=i+1e-4){if(r.p.y=i,this.onGround=!0,r.v.y<-.25){let e=Nu(r,this.tmpN.set(0,1,0),this.tmpV.set(0,0,0),Fu,1/0,this.contact);e&&e.vn>.6&&this.events.push({type:`ground`,time:this.time,speed:e.vn,point:e.point.clone()})}else this.rollOnGrass(e)}}rollOnGrass(e){let t=this.ball,n=Z.radius,r=Z.mass;t.v.y<0&&(t.v.y=0);let i=this.tmpV.set(t.v.x+t.w.z*n,0,t.v.z-t.w.x*n),a=i.length();if(a>1e-5){let o=r*9.81,s=a/(1/r+n*n/Z.inertia),c=Math.min(s,Fu.friction*o*e),l=-i.x/a*c,u=-i.z/a*c;t.v.x+=l/r,t.v.z+=u/r,t.w.x+=-n*u/Z.inertia,t.w.z+=n*l/Z.inertia}let o=Math.hypot(t.v.x,t.v.z);if(o>1e-5){let n=(o-Math.min(o,(.45+.05*o)*e))/o;t.v.x*=n,t.v.z*=n,t.w.x*=n,t.w.z*=n}t.w.y*=Math.exp(-4*e)}collideCapsule(e,t,n,r){let i=this.ball;if(Du(e,n,i.p)>=0)return;let a=0,o=1,s=this.tmpC.copy(i.p),c=new W;if(Du(e,t,this.p0)<0)a=0,o=0;else for(let r=0;r<18;r++){let r=(a+o)/2;c.copy(this.p0).lerp(s,r),Du(e,t+(n-t)*r,c)<0?o=r:a=r}let l=o,u=t+(n-t)*l;c.copy(this.p0).lerp(s,l),Eu(e,u,this.tmpA,this.tmpB);let d=Su(this.tmpA,this.tmpB,c,new W),f=this.tmpN.subVectors(c,d),p=f.length();p<1e-6?f.set(0,0,1):f.divideScalar(p),i.p.copy(d).addScaledVector(f,Z.radius+e.radius+1e-4);let m=Nu(i,f,this.capsulePointVelocity(e,d,r),e.material,e.effectiveMass,this.contact);m&&this.events.push({type:e.kind===`frame`?`post`:e.kind,time:this.time,speed:m.vn,point:m.point.clone(),normal:f.clone(),part:e.part}),i.p.addScaledVector(i.v,r*(1-l)),Eu(e,n,this.tmpA,this.tmpB);let h=Su(this.tmpA,this.tmpB,i.p,new W),g=i.p.distanceTo(h),_=Z.radius+e.radius;if(g<_){let e=new W().subVectors(i.p,h);e.lengthSq()<1e-12&&e.copy(f),e.normalize(),i.p.copy(h).addScaledVector(e,_+1e-4)}}capsulePointVelocity(e,t,n){let r=new W,i=new W().subVectors(e.a,e.prevA),a=new W().subVectors(e.b,e.prevB);if(i.lengthSq()+a.lengthSq()<1e-14)return r;let o=new W().subVectors(e.b,e.a),s=o.lengthSq(),c=s>1e-12?Math.max(0,Math.min(1,new W().subVectors(t,e.a).dot(o)/s)):0,l=this.stepDt;return r.copy(i).lerp(a,c).divideScalar(l),r}stepDt=1/240;anyNetEngaged(){let e=this.net.engaged;for(let t=0;t<e.length;t++)if(e[t]!==0)return!0;return!1}nearNet(e){return e.z<.2&&e.z>-3&&Math.abs(e.x)<Q.postX+.5&&e.y<Q.barY+.4}},rd={placed:{id:`placed`,label:`Colocado`,short:`COL`,footSpeed:[9.5,20.5],footMass:1.6,restitution:.46,friction:.55,contactPitch:.07,contactYaw:.07,errorMult:.72,surface:`inside`,tell:.85,description:`Parte interna do pé. Preciso, potência média, leve efeito natural.`},power:{id:`power`,label:`Forte`,short:`FOR`,footSpeed:[12,24.5],footMass:2.1,restitution:.5,friction:.42,contactPitch:.015,contactYaw:0,errorMult:1.3,surface:`laces`,tell:.4,description:`Peito do pé. Muito veloz, pouco giro (pode flutuar), menos preciso.`},chip:{id:`chip`,label:`Cavadinha`,short:`CAV`,footSpeed:[9.5,18],footMass:1.4,restitution:.42,friction:.62,contactPitch:.62,contactYaw:0,errorMult:1,surface:`toeUnder`,tell:.3,description:`Ponta do pé por baixo da bola: lenta, alta, com muito backspin.`},low:{id:`low`,label:`Rasteiro`,short:`RAS`,footSpeed:[11,22],footMass:1.9,restitution:.48,friction:.48,contactPitch:-.09,contactYaw:.03,errorMult:.9,surface:`laces`,tell:.65,description:`Corpo sobre a bola, contato acima do centro: rasteiro com topspin.`},curl:{id:`curl`,label:`Efeito`,short:`EFE`,footSpeed:[10.5,20],footMass:1.6,restitution:.45,friction:.68,contactPitch:.08,contactYaw:.4,errorMult:1.1,surface:`inside`,tell:.7,description:`Parte interna “abraçando” a bola: curva para dentro.`},trivela:{id:`trivela`,label:`Trivela`,short:`TRI`,footSpeed:[10.5,20.5],footMass:1.7,restitution:.46,friction:.62,contactPitch:.05,contactYaw:-.34,errorMult:1.25,surface:`outside`,tell:.35,description:`Parte externa do pé: curva para fora, difícil de ler.`},center:{id:`center`,label:`No meio`,short:`MEI`,footSpeed:[12,23.5],footMass:2,restitution:.5,friction:.44,contactPitch:.03,contactYaw:0,errorMult:.95,surface:`laces`,tell:.15,description:`Firme pelo meio. Corpo neutro: engana goleiros que saltam cedo.`}},id=[`placed`,`power`,`chip`,`low`,`curl`,`trivela`,`center`];function ad(e,t,n=new W){let r=Math.cos(t);return n.set(Math.sin(e)*r,Math.sin(t),-Math.cos(e)*r)}function od(e,t){let n=Z.mass,r=Z.radius,i=Z.inertia,a=t.footMass,o=t.normal.clone().normalize(),s=o.clone().multiplyScalar(-r),c=new W().crossVectors(e.w,s).add(e.v),l=t.footVelocity.clone().sub(c),u=l.dot(o),d={v:e.v.clone(),w:e.w.clone(),contactPoint:e.p.clone().add(s),impulse:0};if(u<=0)return d;let f=(1+t.restitution)*u/(1/n+1/a);e.v.addScaledVector(o,f/n);let p=l.clone().addScaledVector(o,-u),m=p.length();if(m>1e-6){let o=m/(1/n+r*r/i+1/a),c=Math.min(o,t.friction*f),l=p.multiplyScalar(c/m);e.v.addScaledVector(l,1/n),e.w.addScaledVector(new W().crossVectors(s,l),1/i)}return d.v.copy(e.v),d.w.copy(e.w),d.impulse=f,d}function sd(e,t,n){let r=Math.max(0,t),i=e.footSpeed[0]+(e.footSpeed[1]-e.footSpeed[0])*Math.min(r,1),a=Math.max(0,r-1)/.15,o=1+.025*Math.max(0,Math.min(3,n-2.5));return i*(1+.06*a)*o}function cd(e,t,n,r,i,a,o){let s=t===`right`?1:-1,c=ad(n,r);return{footVelocity:ad(n+s*o,r-a).multiplyScalar(i),normal:c,footMass:e.footMass,restitution:e.restitution,friction:e.friction}}var ld=new nd;ld.frame=[];function ud(e,t,n,r=3,i,a=ld){a.reset(e),a.ball.v.copy(t),a.ball.w.copy(n),a.wake();let o=1/240,s=Q.postZ,c=0,l=e.clone();for(;c<r;){l.copy(a.ball.p),a.step(o),c+=o,i&&Math.round(c/o)%3==0&&i.push(a.ball.p.clone());let e=a.ball.p;if(e.z<=s){let t=(l.z-s)/(l.z-e.z);return{x:l.x+(e.x-l.x)*t,y:l.y+(e.y-l.y)*t,time:c-o+t*o,reached:!0}}if(a.resting||a.ball.v.z>0&&c>.1)break}let u=a.ball.p;return{x:u.x,y:u.y,time:c,reached:!1}}function dd(e,t=new W(0,Z.radius,11)){let n=rd[e.technique],r=sd(n,e.power,e.approachSpeed),i=n.contactPitch+e.spinPitch,a=n.contactYaw+e.spinYaw,o=e.target.x,s=e.target.y,c=t.z-Q.postZ,l=new Gl,u=(o,s)=>{l.p.copy(t),l.v.set(0,0,0),l.w.set(0,0,0);let c=cd(n,e.foot,o,s,r,i,a);return od(l,c),ud(t,l.v,l.w,3)},d=Math.atan2(o-t.x,c),f=r*1.15,p=c/Math.max(4,f),m=Math.max(-.15,i-.06),h=Math.atan2(s-t.y+4.905*p*p,c)+i*.5;h=Math.max(m,Math.min(1.1,h));let g={yaw:d,pitch:h,err:1/0,res:u(d,h)},_=.003;for(let e=0;e<8;e++){let t=e===0?g.res:u(d,h),n=t.x-o,r=t.reached?t.y-s:-3,i=Math.hypot(n,r);if(i<g.err&&(g={yaw:d,pitch:h,err:i,res:t}),i<.01)break;let a=u(d+_,h),c=u(d,h+_),l=(a.x-t.x)/_,f=((a.reached?a.y:-3)-(t.reached?t.y:-3))/_,p=(c.x-t.x)/_,v=((c.reached?c.y:-3)-(t.reached?t.y:-3))/_,y=l*v-p*f;if(Math.abs(y)<1e-6){h+=r<0?.04:-.02;continue}let b=(-n*v+r*p)/y,x=(-r*l+n*f)/y,S=.15;b=Math.max(-.15,Math.min(S,b)),x=Math.max(-.15,Math.min(S,x)),d+=b,h=Math.max(m,Math.min(1.25,h+x))}let v=cd(n,e.foot,g.yaw,g.pitch,r,i,a);return{yaw:g.yaw,pitch:g.pitch,footSpeed:r,contactPitch:i,contactYaw:a,strike:v,predicted:g.res}}function fd(e,t,n){let r=rd[e.technique],i=e.foot===`right`?1:-1,a=[],o=1.3-.75*(n.precision/100),s=1+n.pressure*(1.1-n.composure/100),c=r.errorMult*o*s,l=n.timing===null?.45:n.timing;n.timing===null&&a.push(`Sem timing: contato padrão`),Math.abs(l)<.12&&(l=0);let u=Math.max(0,e.power-1)/.15,d=Math.max(0,n.approachSpeed-4.3)/2.2,f=Math.max(-1,Math.min(1,n.plantError/.18)),p=i*(t.yaw-n.bodyAngle),m=r.surface===`inside`?Math.max(0,p-.12)*1.6:Math.max(0,-p-.25)*.6,h=-l*.06+u*.07+d*.025+f*.045,g=i*(l*.035-u*.022)-i*m*.03;g+=Math.sign(n.lateAimChange)*Math.min(.05,Math.abs(n.lateAimChange)*.03),h*=c,g*=c;let _=1-.09*Math.abs(l)-.05*Math.abs(f)+.015*d*(n.powerSkill/100),v=t.footSpeed*_*(.94+.08*(n.powerSkill/100)),y=(l*.028-f*.02)*r.errorMult,b=t.contactPitch-y/Z.radius,x=.85+.3*(n.curlSkill/100),S=t.contactYaw*(r.contactYaw===0?1:x)+i*l*.04;l<-.3?a.push(`Chute antecipado: corpo para trás`):l>.3&&a.push(`Chute atrasado: pegou por cima`),u>.05&&a.push(`Potência excessiva`),d>.3&&a.push(`Corrida rápida demais`),Math.abs(f)>.4&&a.push(f>0?`Pé de apoio longe da bola`:`Pé de apoio colado à bola`),m>.15&&a.push(`Lado não natural`),Math.abs(n.lateAimChange)>.4&&a.push(`Mudou de ideia tarde`);let C=Math.hypot(h,g)+Math.abs(1-_)*.2,w=Math.max(0,Math.min(100,100-C*900));return{yaw:t.yaw+g,pitch:t.pitch+h,footSpeed:v,contactPitch:b,contactYaw:S,contactOffset:{x:i*Math.sin(S)*Z.radius*.9,y:-Math.sin(b)*Z.radius},quality:w,notes:a}}function pd(e,t){return cd(rd[e.technique],e.foot,t.yaw,t.pitch,t.footSpeed,t.contactPitch,t.contactYaw)}var md={name:`CopyShader`,uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`},hd=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error(`THREE.Pass: .render() must be implemented in derived pass.`)}dispose(){}},gd=new ja(-1,1,1,-1,0,1),_d=new class extends Ar{constructor(){super(),this.setAttribute(`position`,new vr([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute(`uv`,new vr([0,2,0,0,2,0],2))}},vd=class{constructor(e){this._mesh=new q(_d,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,gd)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}},yd=class extends hd{constructor(e,t=`tDiffuse`){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof Wi?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Vi.clone(e.uniforms),this.material=new Wi({name:e.name===void 0?`unspecified`:e.name,defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new vd(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},bd=class extends hd{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let r=e.getContext(),i=e.state;i.buffers.color.setMask(!1),i.buffers.depth.setMask(!1),i.buffers.color.setLocked(!0),i.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),i.buffers.stencil.setTest(!0),i.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),i.buffers.stencil.setFunc(r.ALWAYS,a,4294967295),i.buffers.stencil.setClear(o),i.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),i.buffers.color.setLocked(!1),i.buffers.depth.setLocked(!1),i.buffers.color.setMask(!0),i.buffers.depth.setMask(!0),i.buffers.stencil.setLocked(!1),i.buffers.stencil.setFunc(r.EQUAL,1,4294967295),i.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),i.buffers.stencil.setLocked(!0)}},xd=class extends hd{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}},Sd=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let n=e.getSize(new U);this._width=n.width,this._height=n.height,t=new Yt(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:g}),t.texture.name=`EffectComposer.rt1`}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name=`EffectComposer.rt2`,this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new yd(md),this.copyPass.material.blending=0,this.timer=new za}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());let t=this.renderer.getRenderTarget(),n=!1;for(let t=0,r=this.passes.length;t<r;t++){let r=this.passes[t];if(r.enabled!==!1){if(r.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(t),r.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),r.needsSwap){if(n){let t=this.renderer.getContext(),n=this.renderer.state.buffers.stencil;n.setFunc(t.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),n.setFunc(t.EQUAL,1,4294967295)}this.swapBuffers()}bd!==void 0&&(r instanceof bd?n=!0:r instanceof xd&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new U);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(n,r),this.renderTarget2.setSize(n,r);for(let e=0;e<this.passes.length;e++)this.passes[e].setSize(n,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}},Cd=class extends hd{constructor(e,t,n=null,r=null,i=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=r,this.clearAlpha=i,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new K}render(e,t,n){let r=e.autoClear;e.autoClear=!1;let i,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(i=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==1&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(i),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=r}},wd={name:`LuminosityHighPassShader`,uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new K(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`},Td=class e extends hd{constructor(e,t=1,n,r){super(),this.strength=t,this.radius=n,this.threshold=r,this.resolution=e===void 0?new U(256,256):new U(e.x,e.y),this.clearColor=new K(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let i=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new Yt(i,a,{type:g,depthBuffer:!1}),this.renderTargetBright.texture.name=`UnrealBloomPass.bright`,this.renderTargetBright.texture.generateMipmaps=!1;for(let e=0;e<this.nMips;e++){let t=new Yt(i,a,{type:g,depthBuffer:!1});t.texture.name=`UnrealBloomPass.h`+e,t.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(t);let n=new Yt(i,a,{type:g,depthBuffer:!1});n.texture.name=`UnrealBloomPass.v`+e,n.texture.generateMipmaps=!1,this.renderTargetsVertical.push(n),i=Math.round(i/2),a=Math.round(a/2)}let o=wd;this.highPassUniforms=Vi.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=r,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Wi({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];let s=[6,10,14,18,22];i=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let e=0;e<this.nMips;e++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(s[e])),this.separableBlurMaterials[e].uniforms.invSize.value=new U(1/i,1/a),i=Math.round(i/2),a=Math.round(a/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;let c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new W(1,1,1),new W(1,1,1),new W(1,1,1),new W(1,1,1),new W(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=Vi.clone(md.uniforms),this.blendMaterial=new Wi({uniforms:this.copyUniforms,vertexShader:md.vertexShader,fragmentShader:md.fragmentShader,premultipliedAlpha:!0,blending:2,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new K,this._oldClearAlpha=1,this._basic=new Hr,this._fsQuad=new vd(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),r=Math.round(t/2);this.renderTargetBright.setSize(n,r);for(let e=0;e<this.nMips;e++)this.renderTargetsHorizontal[e].setSize(n,r),this.renderTargetsVertical[e].setSize(n,r),this.separableBlurMaterials[e].uniforms.invSize.value=new U(1/n,1/r),n=Math.round(n/2),r=Math.round(r/2)}render(t,n,r,i,a){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();let o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),a&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=r.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=r.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let s=this.renderTargetBright;for(let n=0;n<this.nMips;n++)this._fsQuad.material=this.separableBlurMaterials[n],this.separableBlurMaterials[n].uniforms.colorTexture.value=s.texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[n]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[n].uniforms.colorTexture.value=this.renderTargetsHorizontal[n].texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[n]),t.clear(),this._fsQuad.render(t),s=this.renderTargetsVertical[n];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,a&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(r),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=o}_getSeparableBlurMaterial(e){let t=[],n=e/3;for(let r=0;r<e;r++)t.push(.39894*Math.exp(-.5*r*r/(n*n))/n);let r=[],i=[];for(let n=1;n<e;n+=2){let a=t[n],o=n+1<e?t[n+1]:0,s=a+o;r.push((n*a+(n+1)*o)/s),i.push(s)}return new Wi({defines:{KERNEL_PAIRS:r.length},uniforms:{colorTexture:{value:null},invSize:{value:new U(.5,.5)},direction:{value:new U(.5,.5)},centerWeight:{value:t[0]},gaussianOffsets:{value:r},gaussianWeights:{value:i}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float centerWeight;
				uniform float gaussianOffsets[KERNEL_PAIRS];
				uniform float gaussianWeights[KERNEL_PAIRS];

				void main() {

					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * centerWeight;

					for ( int i = 0; i < KERNEL_PAIRS; i ++ ) {

						vec2 uvOffset = direction * invSize * gaussianOffsets[ i ];
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * gaussianWeights[ i ];

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(e){return new Wi({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}};Td.BlurDirectionX=new U(1,0),Td.BlurDirectionY=new U(0,1);var Ed={name:`OutputShader`,uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`},Dd=class extends hd{constructor(){super(),this.isOutputPass=!0,this.uniforms=Vi.clone(Ed.uniforms),this.material=new Gi({name:Ed.name,uniforms:this.uniforms,vertexShader:Ed.vertexShader,fragmentShader:Ed.fragmentShader}),this._fsQuad=new vd(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},It.getTransfer(this._outputColorSpace)===`srgb`&&(this.material.defines.SRGB_TRANSFER=``),this._toneMapping===1?this.material.defines.LINEAR_TONE_MAPPING=``:this._toneMapping===2?this.material.defines.REINHARD_TONE_MAPPING=``:this._toneMapping===3?this.material.defines.CINEON_TONE_MAPPING=``:this._toneMapping===4?this.material.defines.ACES_FILMIC_TONE_MAPPING=``:this._toneMapping===6?this.material.defines.AGX_TONE_MAPPING=``:this._toneMapping===7?this.material.defines.NEUTRAL_TONE_MAPPING=``:this._toneMapping===5&&(this.material.defines.CUSTOM_TONE_MAPPING=``),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},Od={name:`BokehShader`,defines:{DEPTH_PACKING:1,PERSPECTIVE_CAMERA:1},uniforms:{tColor:{value:null},tDepth:{value:null},focus:{value:1},aspect:{value:1},aperture:{value:.025},maxblur:{value:.01},nearClip:{value:1},farClip:{value:1e3}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		#include <common>

		varying vec2 vUv;

		uniform sampler2D tColor;
		uniform sampler2D tDepth;

		uniform float maxblur; // max blur amount
		uniform float aperture; // aperture - bigger values for shallower depth of field

		uniform float nearClip;
		uniform float farClip;

		uniform float focus;
		uniform float aspect;

		#include <packing>

		float getDepth( const in vec2 screenPosition ) {
			#if DEPTH_PACKING == 1
			return unpackRGBAToDepth( texture2D( tDepth, screenPosition ) );
			#else
			return texture2D( tDepth, screenPosition ).x;
			#endif
		}

		float getViewZ( const in float depth ) {
			#if PERSPECTIVE_CAMERA == 1
			return perspectiveDepthToViewZ( depth, nearClip, farClip );
			#else
			return orthographicDepthToViewZ( depth, nearClip, farClip );
			#endif
		}


		void main() {

			vec2 aspectcorrect = vec2( 1.0, aspect );

			float viewZ = getViewZ( getDepth( vUv ) );

			float factor = ( focus + viewZ ); // viewZ is <= 0, so this is a difference equation

			vec2 dofblur = vec2 ( clamp( factor * aperture, -maxblur, maxblur ) );

			vec2 dofblur9 = dofblur * 0.9;
			vec2 dofblur7 = dofblur * 0.7;
			vec2 dofblur4 = dofblur * 0.4;

			vec4 col = vec4( 0.0 );

			col += texture2D( tColor, vUv.xy );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,   0.4  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.15,  0.37 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29,  0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37,  0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.40,  0.0  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37, -0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29, -0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15, -0.37 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,  -0.4  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15,  0.37 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29,  0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37,  0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.4,   0.0  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37, -0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29, -0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.15, -0.37 ) * aspectcorrect ) * dofblur );

			col += texture2D( tColor, vUv.xy + ( vec2(  0.15,  0.37 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37,  0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37, -0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15, -0.37 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15,  0.37 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37,  0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37, -0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.15, -0.37 ) * aspectcorrect ) * dofblur9 );

			col += texture2D( tColor, vUv.xy + ( vec2(  0.29,  0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.40,  0.0  ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29, -0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,  -0.4  ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29,  0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.4,   0.0  ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29, -0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,   0.4  ) * aspectcorrect ) * dofblur7 );

			col += texture2D( tColor, vUv.xy + ( vec2(  0.29,  0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.4,   0.0  ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29, -0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,  -0.4  ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29,  0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.4,   0.0  ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29, -0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,   0.4  ) * aspectcorrect ) * dofblur4 );

			gl_FragColor = col / 41.0;
			gl_FragColor.a = 1.0;

		}`},kd=class extends hd{constructor(e,t,n){super(),this.scene=e,this.camera=t;let i=n.focus===void 0?1:n.focus,a=n.aperture===void 0?.025:n.aperture,o=n.maxblur===void 0?1:n.maxblur;this._renderTargetDepth=new Yt(1,1,{minFilter:r,magFilter:r,type:g}),this._renderTargetDepth.texture.name=`BokehPass.depth`,this._materialDepth=new Yi,this._materialDepth.depthPacking=R,this._materialDepth.blending=0;let s=Vi.clone(Od.uniforms);s.tDepth.value=this._renderTargetDepth.texture,s.focus.value=i,s.aspect.value=t.aspect,s.aperture.value=a,s.maxblur.value=o,s.nearClip.value=t.near,s.farClip.value=t.far,this.materialBokeh=new Wi({defines:Object.assign({},Od.defines),uniforms:s,vertexShader:Od.vertexShader,fragmentShader:Od.fragmentShader}),this.uniforms=s,this._fsQuad=new vd(this.materialBokeh),this._oldClearColor=new K}render(e,t,n){this.scene.overrideMaterial=this._materialDepth,e.getClearColor(this._oldClearColor);let r=e.getClearAlpha(),i=e.autoClear;e.autoClear=!1,e.setClearColor(16777215),e.setClearAlpha(1),e.setRenderTarget(this._renderTargetDepth),e.clear(),e.render(this.scene,this.camera),this.uniforms.tColor.value=n.texture,this.uniforms.nearClip.value=this.camera.near,this.uniforms.farClip.value=this.camera.far,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),e.clear(),this._fsQuad.render(e)),this.scene.overrideMaterial=null,e.setClearColor(this._oldClearColor),e.setClearAlpha(r),e.autoClear=i}setSize(e,t){this.materialBokeh.uniforms.aspect.value=e/t,this._renderTargetDepth.setSize(e,t)}dispose(){this._renderTargetDepth.dispose(),this._materialDepth.dispose(),this.materialBokeh.dispose(),this._fsQuad.dispose()}},Ad={name:`GTAOShader`,defines:{PERSPECTIVE_CAMERA:1,SAMPLES:16,NORMAL_VECTOR_TYPE:1,SCREEN_SPACE_RADIUS:0,SCREEN_SPACE_RADIUS_SCALE:100,SCENE_CLIP_BOX:0},uniforms:{tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new U},cameraNear:{value:null},cameraFar:{value:null},cameraProjectionMatrix:{value:new Qt},cameraProjectionMatrixInverse:{value:new Qt},cameraWorldMatrix:{value:new Qt},radius:{value:.25},distanceExponent:{value:1},thickness:{value:1},distanceFallOff:{value:1},scale:{value:1},sceneBoxMin:{value:new W(-1,-1,-1)},sceneBoxMax:{value:new W(1,1,1)}},vertexShader:`

		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		varying vec2 vUv;
		uniform highp sampler2D tNormal;
		uniform highp sampler2D tDepth;
		uniform sampler2D tNoise;
		uniform vec2 resolution;
		uniform float cameraNear;
		uniform float cameraFar;
		uniform mat4 cameraProjectionMatrix;
		uniform mat4 cameraProjectionMatrixInverse;
		uniform mat4 cameraWorldMatrix;
		uniform float radius;
		uniform float distanceExponent;
		uniform float thickness;
		uniform float distanceFallOff;
		uniform float scale;
		#if SCENE_CLIP_BOX == 1
			uniform vec3 sceneBoxMin;
			uniform vec3 sceneBoxMax;
		#endif

		#include <common>
		#include <packing>

		#ifndef FRAGMENT_OUTPUT
		#define FRAGMENT_OUTPUT vec4(vec3(ao), 1.)
		#endif

		vec3 getViewPosition( const in vec2 screenPosition, const in float depth ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				vec4 clipSpacePosition = vec4( vec2( screenPosition ) * 2.0 - 1.0, depth, 1.0 );
			#else
				vec4 clipSpacePosition = vec4( vec3( screenPosition, depth ) * 2.0 - 1.0, 1.0 );
			#endif
			vec4 viewSpacePosition = cameraProjectionMatrixInverse * clipSpacePosition;
			return viewSpacePosition.xyz / viewSpacePosition.w;
		}

		float getDepth(const vec2 uv) {
			return textureLod(tDepth, uv.xy, 0.0).r;
		}

		float fetchDepth(const ivec2 uv) {
			return texelFetch(tDepth, uv.xy, 0).r;
		}

		float getViewZ(const in float depth) {
			#if PERSPECTIVE_CAMERA == 1
				return perspectiveDepthToViewZ(depth, cameraNear, cameraFar);
			#else
				return orthographicDepthToViewZ(depth, cameraNear, cameraFar);
			#endif
		}

		vec3 computeNormalFromDepth(const vec2 uv) {
			vec2 size = vec2(textureSize(tDepth, 0));
			ivec2 p = ivec2(uv * size);
			float c0 = fetchDepth(p);
			float l2 = fetchDepth(p - ivec2(2, 0));
			float l1 = fetchDepth(p - ivec2(1, 0));
			float r1 = fetchDepth(p + ivec2(1, 0));
			float r2 = fetchDepth(p + ivec2(2, 0));
			float b2 = fetchDepth(p - ivec2(0, 2));
			float b1 = fetchDepth(p - ivec2(0, 1));
			float t1 = fetchDepth(p + ivec2(0, 1));
			float t2 = fetchDepth(p + ivec2(0, 2));
			float dl = abs((2.0 * l1 - l2) - c0);
			float dr = abs((2.0 * r1 - r2) - c0);
			float db = abs((2.0 * b1 - b2) - c0);
			float dt = abs((2.0 * t1 - t2) - c0);
			vec3 ce = getViewPosition(uv, c0).xyz;
			vec3 dpdx = (dl < dr) ? ce - getViewPosition((uv - vec2(1.0 / size.x, 0.0)), l1).xyz : -ce + getViewPosition((uv + vec2(1.0 / size.x, 0.0)), r1).xyz;
			vec3 dpdy = (db < dt) ? ce - getViewPosition((uv - vec2(0.0, 1.0 / size.y)), b1).xyz : -ce + getViewPosition((uv + vec2(0.0, 1.0 / size.y)), t1).xyz;
			return normalize(cross(dpdx, dpdy));
		}

		vec3 getViewNormal(const vec2 uv) {
			#if NORMAL_VECTOR_TYPE == 2
				return normalize(textureLod(tNormal, uv, 0.).rgb);
			#elif NORMAL_VECTOR_TYPE == 1
				return unpackRGBToNormal(textureLod(tNormal, uv, 0.).rgb);
			#else
				return computeNormalFromDepth(uv);
			#endif
		}

		vec3 getSceneUvAndDepth(vec3 sampleViewPos) {
			vec4 sampleClipPos = cameraProjectionMatrix * vec4(sampleViewPos, 1.);
			vec2 sampleUv = sampleClipPos.xy / sampleClipPos.w * 0.5 + 0.5;
			float sampleSceneDepth = getDepth(sampleUv);
			return vec3(sampleUv, sampleSceneDepth);
		}

		void main() {
			float depth = getDepth(vUv.xy);

			#ifdef USE_REVERSED_DEPTH_BUFFER
				if (depth <= 0.0) {
					discard;
					return;
				}
			#else
				if (depth >= 1.0) {
					discard;
					return;
				}
			#endif
			
			vec3 viewPos = getViewPosition(vUv, depth);
			vec3 viewNormal = getViewNormal(vUv);

			float radiusToUse = radius;
			float distanceFalloffToUse = thickness;
			#if SCREEN_SPACE_RADIUS == 1
				float radiusScale = getViewPosition(vec2(0.5 + float(SCREEN_SPACE_RADIUS_SCALE) / resolution.x, 0.0), depth).x;
				radiusToUse *= radiusScale;
				distanceFalloffToUse *= radiusScale;
			#endif

			#if SCENE_CLIP_BOX == 1
				vec3 worldPos = (cameraWorldMatrix * vec4(viewPos, 1.0)).xyz;
				float boxDistance = length(max(vec3(0.0), max(sceneBoxMin - worldPos, worldPos - sceneBoxMax)));
				if (boxDistance > radiusToUse) {
					discard;
					return;
				}
			#endif

			vec2 noiseResolution = vec2(textureSize(tNoise, 0));
			vec2 noiseUv = vUv * resolution / noiseResolution;
			vec4 noiseTexel = textureLod(tNoise, noiseUv, 0.0);
			vec3 randomVec = noiseTexel.xyz * 2.0 - 1.0;
			vec3 tangent = normalize(vec3(randomVec.xy, 0.));
			vec3 bitangent = vec3(-tangent.y, tangent.x, 0.);
			mat3 kernelMatrix = mat3(tangent, bitangent, vec3(0., 0., 1.));

			const int DIRECTIONS = SAMPLES < 30 ? 3 : 5;
			const int STEPS = (SAMPLES + DIRECTIONS - 1) / DIRECTIONS;
			float ao = 0.0;
			for (int i = 0; i < DIRECTIONS; ++i) {

				float angle = float(i) / float(DIRECTIONS) * PI;
				vec4 sampleDir = vec4(cos(angle), sin(angle), 0., 0.5 + 0.5 * noiseTexel.w);
				sampleDir.xyz = normalize(kernelMatrix * sampleDir.xyz);

				#if PERSPECTIVE_CAMERA == 1
					vec3 viewDir = normalize(-viewPos.xyz);
				#else
					vec3 viewDir = vec3(0., 0., 1.);
				#endif
				vec3 sliceBitangent = normalize(cross(sampleDir.xyz, viewDir));
				vec3 sliceTangent = cross(sliceBitangent, viewDir);
				vec3 normalInSlice = normalize(viewNormal - sliceBitangent * dot(viewNormal, sliceBitangent));

				vec3 tangentToNormalInSlice = cross(normalInSlice, sliceBitangent);
				vec2 cosHorizons = vec2(dot(viewDir, tangentToNormalInSlice), dot(viewDir, -tangentToNormalInSlice));

				for (int j = 0; j < STEPS; ++j) {
					vec3 sampleViewOffset = sampleDir.xyz * radiusToUse * sampleDir.w * pow(float(j + 1) / float(STEPS), distanceExponent);

					vec3 sampleSceneUvDepth = getSceneUvAndDepth(viewPos + sampleViewOffset);
					vec3 sampleSceneViewPos = getViewPosition(sampleSceneUvDepth.xy, sampleSceneUvDepth.z);
					vec3 viewDelta = sampleSceneViewPos - viewPos;
					if (abs(viewDelta.z) < thickness) {
						float sampleCosHorizon = dot(viewDir, normalize(viewDelta));
						cosHorizons.x += max(0., (sampleCosHorizon - cosHorizons.x) * mix(1., 2. / float(j + 2), distanceFallOff));
					}

					sampleSceneUvDepth = getSceneUvAndDepth(viewPos - sampleViewOffset);
					sampleSceneViewPos = getViewPosition(sampleSceneUvDepth.xy, sampleSceneUvDepth.z);
					viewDelta = sampleSceneViewPos - viewPos;
					if (abs(viewDelta.z) < thickness) {
						float sampleCosHorizon = dot(viewDir, normalize(viewDelta));
						cosHorizons.y += max(0., (sampleCosHorizon - cosHorizons.y) * mix(1., 2. / float(j + 2), distanceFallOff));
					}
				}

				vec2 sinHorizons = sqrt(1. - cosHorizons * cosHorizons);
				float nx = dot(normalInSlice, sliceTangent);
				float ny = dot(normalInSlice, viewDir);
				float nxb = 1. / 2. * (acos(cosHorizons.y) - acos(cosHorizons.x) + sinHorizons.x * cosHorizons.x - sinHorizons.y * cosHorizons.y);
				float nyb = 1. / 2. * (2. - cosHorizons.x * cosHorizons.x - cosHorizons.y * cosHorizons.y);
				float occlusion = nx * nxb + ny * nyb;
				ao += occlusion;
			}

			ao = clamp(ao / float(DIRECTIONS), 0., 1.);
		#if SCENE_CLIP_BOX == 1
			ao = mix(ao, 1., smoothstep(0., radiusToUse, boxDistance));
		#endif
			ao = pow(ao, scale);

			gl_FragColor = FRAGMENT_OUTPUT;
		}`},jd={name:`GTAODepthShader`,defines:{PERSPECTIVE_CAMERA:1},uniforms:{tDepth:{value:null},cameraNear:{value:null},cameraFar:{value:null}},vertexShader:`
		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		uniform sampler2D tDepth;
		uniform float cameraNear;
		uniform float cameraFar;
		varying vec2 vUv;

		#include <packing>

		float getLinearDepth( const in vec2 screenPosition ) {
			#if PERSPECTIVE_CAMERA == 1
				float fragCoordZ = texture2D( tDepth, screenPosition ).x;
				float viewZ = perspectiveDepthToViewZ( fragCoordZ, cameraNear, cameraFar );
				return viewZToOrthographicDepth( viewZ, cameraNear, cameraFar );
			#else
				return texture2D( tDepth, screenPosition ).x;
			#endif
		}

		void main() {
			float depth = getLinearDepth( vUv );
			gl_FragColor = vec4( vec3( 1.0 - depth ), 1.0 );

		}`},Md={name:`GTAOBlendShader`,uniforms:{tDiffuse:{value:null},intensity:{value:1}},vertexShader:`
		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		uniform float intensity;
		uniform sampler2D tDiffuse;
		varying vec2 vUv;

		void main() {
			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = vec4(mix(vec3(1.), texel.rgb, intensity), texel.a);
		}`};function Nd(t=5){let n=Math.floor(t)%2==0?Math.floor(t)+1:Math.floor(t),r=Pd(n),i=r.length,a=new Uint8Array(i*4);for(let e=0;e<i;++e){let t=r[e],n=2*Math.PI*t/i,o=new W(Math.cos(n),Math.sin(n),0).normalize();a[e*4]=(o.x*.5+.5)*255,a[e*4+1]=(o.y*.5+.5)*255,a[e*4+2]=127,a[e*4+3]=255}let o=new ni(a,n,n);return o.wrapS=e,o.wrapT=e,o.needsUpdate=!0,o}function Pd(e){let t=Math.floor(e)%2==0?Math.floor(e)+1:Math.floor(e),n=t*t,r=Array(n).fill(0),i=Math.floor(t/2),a=t-1;for(let e=1;e<=n;)i===-1&&a===t?(a=t-2,i=0):(a===t&&(a=0),i<0&&(i=t-1)),r[i*t+a]===0?(r[i*t+a]=e++,a++,i--):(a-=2,i++);return r}var Fd={name:`PoissonDenoiseShader`,defines:{SAMPLES:16,SAMPLE_VECTORS:Id(16,2,1),NORMAL_VECTOR_TYPE:1},uniforms:{tDiffuse:{value:null},tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new U},cameraProjectionMatrixInverse:{value:new Qt},lumaPhi:{value:5},depthPhi:{value:5},normalPhi:{value:5},radius:{value:4},index:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`

		varying vec2 vUv;

		uniform sampler2D tDiffuse;
		uniform sampler2D tNormal;
		uniform sampler2D tDepth;
		uniform sampler2D tNoise;
		uniform vec2 resolution;
		uniform mat4 cameraProjectionMatrixInverse;
		uniform float lumaPhi;
		uniform float depthPhi;
		uniform float normalPhi;
		uniform float radius;
		uniform int index;

		#include <common>
		#include <packing>

		#ifndef SAMPLE_LUMINANCE
		#define SAMPLE_LUMINANCE dot(vec3(0.2125, 0.7154, 0.0721), a)
		#endif

		#ifndef FRAGMENT_OUTPUT
		#define FRAGMENT_OUTPUT vec4(denoised, 1.)
		#endif

		float getLuminance(const in vec3 a) {
			return SAMPLE_LUMINANCE;
		}

		const vec3 poissonDisk[SAMPLES] = SAMPLE_VECTORS;

		vec3 getViewPosition( const in vec2 screenPosition, const in float depth ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				vec4 clipSpacePosition = vec4( vec2( screenPosition ) * 2.0 - 1.0, depth, 1.0 );
			#else
				vec4 clipSpacePosition = vec4( vec3( screenPosition, depth ) * 2.0 - 1.0, 1.0 );
			#endif
			vec4 viewSpacePosition = cameraProjectionMatrixInverse * clipSpacePosition;
			return viewSpacePosition.xyz / viewSpacePosition.w;
		}

		float getDepth(const vec2 uv) {
			return textureLod(tDepth, uv.xy, 0.0).r;
		}

		float fetchDepth(const ivec2 uv) {
			return texelFetch(tDepth, uv.xy, 0).r;
		}

		vec3 computeNormalFromDepth(const vec2 uv) {
			vec2 size = vec2(textureSize(tDepth, 0));
			ivec2 p = ivec2(uv * size);
			float c0 = fetchDepth(p);
			float l2 = fetchDepth(p - ivec2(2, 0));
			float l1 = fetchDepth(p - ivec2(1, 0));
			float r1 = fetchDepth(p + ivec2(1, 0));
			float r2 = fetchDepth(p + ivec2(2, 0));
			float b2 = fetchDepth(p - ivec2(0, 2));
			float b1 = fetchDepth(p - ivec2(0, 1));
			float t1 = fetchDepth(p + ivec2(0, 1));
			float t2 = fetchDepth(p + ivec2(0, 2));
			float dl = abs((2.0 * l1 - l2) - c0);
			float dr = abs((2.0 * r1 - r2) - c0);
			float db = abs((2.0 * b1 - b2) - c0);
			float dt = abs((2.0 * t1 - t2) - c0);
			vec3 ce = getViewPosition(uv, c0).xyz;
			vec3 dpdx = (dl < dr) ?  ce - getViewPosition((uv - vec2(1.0 / size.x, 0.0)), l1).xyz
									: -ce + getViewPosition((uv + vec2(1.0 / size.x, 0.0)), r1).xyz;
			vec3 dpdy = (db < dt) ?  ce - getViewPosition((uv - vec2(0.0, 1.0 / size.y)), b1).xyz
									: -ce + getViewPosition((uv + vec2(0.0, 1.0 / size.y)), t1).xyz;
			return normalize(cross(dpdx, dpdy));
		}

		vec3 getViewNormal(const vec2 uv) {
		#if NORMAL_VECTOR_TYPE == 2
			return normalize(textureLod(tNormal, uv, 0.).rgb);
		#elif NORMAL_VECTOR_TYPE == 1
			return unpackRGBToNormal(textureLod(tNormal, uv, 0.).rgb);
		#else
			return computeNormalFromDepth(uv);
		#endif
		}

		void denoiseSample(in vec3 center, in vec3 viewNormal, in vec3 viewPos, in vec2 sampleUv, inout vec3 denoised, inout float totalWeight) {
			vec4 sampleTexel = textureLod(tDiffuse, sampleUv, 0.0);
			float sampleDepth = getDepth(sampleUv);
			vec3 sampleNormal = getViewNormal(sampleUv);
			vec3 neighborColor = sampleTexel.rgb;
			vec3 viewPosSample = getViewPosition(sampleUv, sampleDepth);

			float normalDiff = dot(viewNormal, sampleNormal);
			float normalSimilarity = pow(max(normalDiff, 0.), normalPhi);
			float lumaDiff = abs(getLuminance(neighborColor) - getLuminance(center));
			float lumaSimilarity = max(1.0 - lumaDiff / lumaPhi, 0.0);
			float depthDiff = abs(dot(viewPos - viewPosSample, viewNormal));
			float depthSimilarity = max(1. - depthDiff / depthPhi, 0.);
			float w = lumaSimilarity * depthSimilarity * normalSimilarity;

			denoised += w * neighborColor;
			totalWeight += w;
		}

		void main() {
			float depth = getDepth(vUv.xy);
			vec3 viewNormal = getViewNormal(vUv);
			if (depth == 1. || dot(viewNormal, viewNormal) == 0.) {
				discard;
				return;
			}
			vec4 texel = textureLod(tDiffuse, vUv, 0.0);
			vec3 center = texel.rgb;
			vec3 viewPos = getViewPosition(vUv, depth);

			vec2 noiseResolution = vec2(textureSize(tNoise, 0));
			vec2 noiseUv = vUv * resolution / noiseResolution;
			vec4 noiseTexel = textureLod(tNoise, noiseUv, 0.0);
      		vec2 noiseVec = vec2(sin(noiseTexel[index % 4] * 2. * PI), cos(noiseTexel[index % 4] * 2. * PI));
    		mat2 rotationMatrix = mat2(noiseVec.x, -noiseVec.y, noiseVec.x, noiseVec.y);

			float totalWeight = 1.0;
			vec3 denoised = texel.rgb;
			for (int i = 0; i < SAMPLES; i++) {
				vec3 sampleDir = poissonDisk[i];
				vec2 offset = rotationMatrix * (sampleDir.xy * (1. + sampleDir.z * (radius - 1.)) / resolution);
				vec2 sampleUv = vUv + offset;
				denoiseSample(center, viewNormal, viewPos, sampleUv, denoised, totalWeight);
			}

			if (totalWeight > 0.) {
				denoised /= totalWeight;
			}
			gl_FragColor = FRAGMENT_OUTPUT;
		}`};function Id(e,t,n){let r=Ld(e,t,n),i=`vec3[SAMPLES](`;for(let t=0;t<e;t++){let n=r[t];i+=`vec3(${n.x}, ${n.y}, ${n.z})${t<e-1?`,`:`)`}`}return i}function Ld(e,t,n){let r=[];for(let i=0;i<e;i++){let a=2*Math.PI*t*i/e,o=(i/(e-1))**n;r.push(new W(Math.cos(a),Math.sin(a),o))}return r}var Rd=class{constructor(e=Math){this.grad3=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]],this.grad4=[[0,1,1,1],[0,1,1,-1],[0,1,-1,1],[0,1,-1,-1],[0,-1,1,1],[0,-1,1,-1],[0,-1,-1,1],[0,-1,-1,-1],[1,0,1,1],[1,0,1,-1],[1,0,-1,1],[1,0,-1,-1],[-1,0,1,1],[-1,0,1,-1],[-1,0,-1,1],[-1,0,-1,-1],[1,1,0,1],[1,1,0,-1],[1,-1,0,1],[1,-1,0,-1],[-1,1,0,1],[-1,1,0,-1],[-1,-1,0,1],[-1,-1,0,-1],[1,1,1,0],[1,1,-1,0],[1,-1,1,0],[1,-1,-1,0],[-1,1,1,0],[-1,1,-1,0],[-1,-1,1,0],[-1,-1,-1,0]],this.p=[];for(let t=0;t<256;t++)this.p[t]=Math.floor(e.random()*256);this.perm=[];for(let e=0;e<512;e++)this.perm[e]=this.p[e&255];this.simplex=[[0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0],[0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0],[1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0],[2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]]}noise(e,t){let n,r,i,a=.5*(Math.sqrt(3)-1),o=(e+t)*a,s=Math.floor(e+o),c=Math.floor(t+o),l=(3-Math.sqrt(3))/6,u=(s+c)*l,d=s-u,f=c-u,p=e-d,m=t-f,h,g;p>m?(h=1,g=0):(h=0,g=1);let _=p-h+l,v=m-g+l,y=p-1+2*l,b=m-1+2*l,x=s&255,S=c&255,C=this.perm[x+this.perm[S]]%12,w=this.perm[x+h+this.perm[S+g]]%12,T=this.perm[x+1+this.perm[S+1]]%12,E=.5-p*p-m*m;E<0?n=0:(E*=E,n=E*E*this._dot(this.grad3[C],p,m));let D=.5-_*_-v*v;D<0?r=0:(D*=D,r=D*D*this._dot(this.grad3[w],_,v));let O=.5-y*y-b*b;return O<0?i=0:(O*=O,i=O*O*this._dot(this.grad3[T],y,b)),70*(n+r+i)}noise3d(e,t,n){let r,i,a,o,s=(e+t+n)*(1/3),c=Math.floor(e+s),l=Math.floor(t+s),u=Math.floor(n+s),d=1/6,f=(c+l+u)*d,p=c-f,m=l-f,h=u-f,g=e-p,_=t-m,v=n-h,y,b,x,S,C,w;g>=_?_>=v?(y=1,b=0,x=0,S=1,C=1,w=0):g>=v?(y=1,b=0,x=0,S=1,C=0,w=1):(y=0,b=0,x=1,S=1,C=0,w=1):_<v?(y=0,b=0,x=1,S=0,C=1,w=1):g<v?(y=0,b=1,x=0,S=0,C=1,w=1):(y=0,b=1,x=0,S=1,C=1,w=0);let T=g-y+d,E=_-b+d,D=v-x+d,O=g-S+2*d,k=_-C+2*d,A=v-w+2*d,ee=g-1+3*d,j=_-1+3*d,te=v-1+3*d,M=c&255,ne=l&255,N=u&255,re=this.perm[M+this.perm[ne+this.perm[N]]]%12,P=this.perm[M+y+this.perm[ne+b+this.perm[N+x]]]%12,ie=this.perm[M+S+this.perm[ne+C+this.perm[N+w]]]%12,ae=this.perm[M+1+this.perm[ne+1+this.perm[N+1]]]%12,oe=.6-g*g-_*_-v*v;oe<0?r=0:(oe*=oe,r=oe*oe*this._dot3(this.grad3[re],g,_,v));let se=.6-T*T-E*E-D*D;se<0?i=0:(se*=se,i=se*se*this._dot3(this.grad3[P],T,E,D));let ce=.6-O*O-k*k-A*A;ce<0?a=0:(ce*=ce,a=ce*ce*this._dot3(this.grad3[ie],O,k,A));let F=.6-ee*ee-j*j-te*te;return F<0?o=0:(F*=F,o=F*F*this._dot3(this.grad3[ae],ee,j,te)),32*(r+i+a+o)}noise4d(e,t,n,r){let i=this.grad4,a=this.simplex,o=this.perm,s=(Math.sqrt(5)-1)/4,c=(5-Math.sqrt(5))/20,l,u,d,f,p,m=(e+t+n+r)*s,h=Math.floor(e+m),g=Math.floor(t+m),_=Math.floor(n+m),v=Math.floor(r+m),y=(h+g+_+v)*c,b=h-y,x=g-y,S=_-y,C=v-y,w=e-b,T=t-x,E=n-S,D=r-C,O=w>T?32:0,k=w>E?16:0,A=T>E?8:0,ee=w>D?4:0,j=T>D?2:0,te=+(E>D),M=O+k+A+ee+j+te,ne=+(a[M][0]>=3),N=+(a[M][1]>=3),re=+(a[M][2]>=3),P=+(a[M][3]>=3),ie=+(a[M][0]>=2),ae=+(a[M][1]>=2),oe=+(a[M][2]>=2),se=+(a[M][3]>=2),ce=+(a[M][0]>=1),F=+(a[M][1]>=1),le=+(a[M][2]>=1),ue=+(a[M][3]>=1),de=w-ne+c,fe=T-N+c,pe=E-re+c,me=D-P+c,he=w-ie+2*c,ge=T-ae+2*c,_e=E-oe+2*c,ve=D-se+2*c,ye=w-ce+3*c,be=T-F+3*c,xe=E-le+3*c,Se=D-ue+3*c,Ce=w-1+4*c,we=T-1+4*c,Te=E-1+4*c,Ee=D-1+4*c,De=h&255,Oe=g&255,ke=_&255,Ae=v&255,je=o[De+o[Oe+o[ke+o[Ae]]]]%32,Me=o[De+ne+o[Oe+N+o[ke+re+o[Ae+P]]]]%32,Ne=o[De+ie+o[Oe+ae+o[ke+oe+o[Ae+se]]]]%32,I=o[De+ce+o[Oe+F+o[ke+le+o[Ae+ue]]]]%32,Pe=o[De+1+o[Oe+1+o[ke+1+o[Ae+1]]]]%32,Fe=.6-w*w-T*T-E*E-D*D;Fe<0?l=0:(Fe*=Fe,l=Fe*Fe*this._dot4(i[je],w,T,E,D));let Ie=.6-de*de-fe*fe-pe*pe-me*me;Ie<0?u=0:(Ie*=Ie,u=Ie*Ie*this._dot4(i[Me],de,fe,pe,me));let L=.6-he*he-ge*ge-_e*_e-ve*ve;L<0?d=0:(L*=L,d=L*L*this._dot4(i[Ne],he,ge,_e,ve));let Le=.6-ye*ye-be*be-xe*xe-Se*Se;Le<0?f=0:(Le*=Le,f=Le*Le*this._dot4(i[I],ye,be,xe,Se));let R=.6-Ce*Ce-we*we-Te*Te-Ee*Ee;return R<0?p=0:(R*=R,p=R*R*this._dot4(i[Pe],Ce,we,Te,Ee)),27*(l+u+d+f+p)}_dot(e,t,n){return e[0]*t+e[1]*n}_dot3(e,t,n,r){return e[0]*t+e[1]*n+e[2]*r}_dot4(e,t,n,r,i){return e[0]*t+e[1]*n+e[2]*r+e[3]*i}},zd=class t extends hd{constructor(e,t,n=512,r=512,i,a,o){super(),this.width=n,this.height=r,this.clear=!0,this.camera=t,this.scene=e,this.output=0,this._renderGBuffer=!0,this._visibilityCache=[],this.blendIntensity=1,this.pdRings=2,this.pdRadiusExponent=2,this.pdSamples=16,this.gtaoNoiseTexture=Nd(),this.pdNoiseTexture=this._generateNoise(),this.gtaoRenderTarget=new Yt(this.width,this.height,{type:g,depthBuffer:!1}),this.pdRenderTarget=this.gtaoRenderTarget.clone(),this.gtaoMaterial=new Wi({defines:Object.assign({},Ad.defines),uniforms:Vi.clone(Ad.uniforms),vertexShader:Ad.vertexShader,fragmentShader:Ad.fragmentShader,blending:0,depthTest:!1,depthWrite:!1}),this.gtaoMaterial.defines.PERSPECTIVE_CAMERA=+!!this.camera.isPerspectiveCamera,this.gtaoMaterial.uniforms.tNoise.value=this.gtaoNoiseTexture,this.gtaoMaterial.uniforms.resolution.value.set(this.width,this.height),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.normalMaterial=new Ji,this.normalMaterial.blending=0,this.pdMaterial=new Wi({defines:Object.assign({},Fd.defines),uniforms:Vi.clone(Fd.uniforms),vertexShader:Fd.vertexShader,fragmentShader:Fd.fragmentShader,depthTest:!1,depthWrite:!1}),this.pdMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.pdMaterial.uniforms.tNoise.value=this.pdNoiseTexture,this.pdMaterial.uniforms.resolution.value.set(this.width,this.height),this.pdMaterial.uniforms.lumaPhi.value=10,this.pdMaterial.uniforms.depthPhi.value=2,this.pdMaterial.uniforms.normalPhi.value=3,this.pdMaterial.uniforms.radius.value=8,this.depthRenderMaterial=new Wi({defines:Object.assign({},jd.defines),uniforms:Vi.clone(jd.uniforms),vertexShader:jd.vertexShader,fragmentShader:jd.fragmentShader,blending:0}),this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.copyMaterial=new Wi({uniforms:Vi.clone(md.uniforms),vertexShader:md.vertexShader,fragmentShader:md.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blendSrc:208,blendDst:200,blendEquation:100,blendSrcAlpha:206,blendDstAlpha:200,blendEquationAlpha:100}),this.blendMaterial=new Wi({uniforms:Vi.clone(Md.uniforms),vertexShader:Md.vertexShader,fragmentShader:Md.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blending:5,blendSrc:208,blendDst:200,blendEquation:100,blendSrcAlpha:206,blendDstAlpha:200,blendEquationAlpha:100}),this._fsQuad=new vd(null),this._originalClearColor=new K,this.setGBuffer(i?i.depthTexture:void 0,i?i.normalTexture:void 0),a!==void 0&&this.updateGtaoMaterial(a),o!==void 0&&this.updatePdMaterial(o)}setSize(e,t){this.width=e,this.height=t,this.gtaoRenderTarget.setSize(e,t),this.normalRenderTarget&&this.normalRenderTarget.setSize(e,t),this.pdRenderTarget.setSize(e,t),this.gtaoMaterial.uniforms.resolution.value.set(e,t),this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.pdMaterial.uniforms.resolution.value.set(e,t),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse)}dispose(){this.gtaoNoiseTexture.dispose(),this.pdNoiseTexture.dispose(),this.normalRenderTarget&&this.normalRenderTarget.dispose(),this.gtaoRenderTarget.dispose(),this.pdRenderTarget.dispose(),this.normalMaterial.dispose(),this.pdMaterial.dispose(),this.copyMaterial.dispose(),this.depthRenderMaterial.dispose(),this._fsQuad.dispose()}get gtaoMap(){return this.pdRenderTarget.texture}setGBuffer(e,t){if(e!==void 0)this.depthTexture=e,this.normalTexture=t,this._renderGBuffer=!1;else{if(this.normalRenderTarget===void 0){let e=new Di;e.format=E,e.type=y,this.normalRenderTarget=new Yt(this.width,this.height,{minFilter:r,magFilter:r,type:g,depthTexture:e})}this.depthTexture=this.normalRenderTarget.depthTexture,this.normalTexture=this.normalRenderTarget.texture,this._renderGBuffer=!0}let n=+!!this.normalTexture;this.gtaoMaterial.defines.NORMAL_VECTOR_TYPE=n,this.gtaoMaterial.needsUpdate=!0,this.gtaoMaterial.uniforms.tNormal.value=this.normalTexture,this.gtaoMaterial.uniforms.tDepth.value=this.depthTexture,this.pdMaterial.defines.NORMAL_VECTOR_TYPE=n,this.pdMaterial.needsUpdate=!0,this.pdMaterial.uniforms.tNormal.value=this.normalTexture,this.pdMaterial.uniforms.tDepth.value=this.depthTexture,this.depthRenderMaterial.uniforms.tDepth.value=this.depthTexture}setSceneClipBox(e){e?(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX!==1,this.gtaoMaterial.defines.SCENE_CLIP_BOX=1,this.gtaoMaterial.uniforms.sceneBoxMin.value.copy(e.min),this.gtaoMaterial.uniforms.sceneBoxMax.value.copy(e.max)):(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX===0,this.gtaoMaterial.defines.SCENE_CLIP_BOX=0)}updateGtaoMaterial(e){e.radius!==void 0&&(this.gtaoMaterial.uniforms.radius.value=e.radius),e.distanceExponent!==void 0&&(this.gtaoMaterial.uniforms.distanceExponent.value=e.distanceExponent),e.thickness!==void 0&&(this.gtaoMaterial.uniforms.thickness.value=e.thickness),e.distanceFallOff!==void 0&&(this.gtaoMaterial.uniforms.distanceFallOff.value=e.distanceFallOff,this.gtaoMaterial.needsUpdate=!0),e.scale!==void 0&&(this.gtaoMaterial.uniforms.scale.value=e.scale),e.samples!==void 0&&e.samples!==this.gtaoMaterial.defines.SAMPLES&&(this.gtaoMaterial.defines.SAMPLES=e.samples,this.gtaoMaterial.needsUpdate=!0),e.screenSpaceRadius!==void 0&&+!!e.screenSpaceRadius!==this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS&&(this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS=+!!e.screenSpaceRadius,this.gtaoMaterial.needsUpdate=!0)}updatePdMaterial(e){let t=!1;e.lumaPhi!==void 0&&(this.pdMaterial.uniforms.lumaPhi.value=e.lumaPhi),e.depthPhi!==void 0&&(this.pdMaterial.uniforms.depthPhi.value=e.depthPhi),e.normalPhi!==void 0&&(this.pdMaterial.uniforms.normalPhi.value=e.normalPhi),e.radius!==void 0&&e.radius!==this.radius&&(this.pdMaterial.uniforms.radius.value=e.radius),e.radiusExponent!==void 0&&e.radiusExponent!==this.pdRadiusExponent&&(this.pdRadiusExponent=e.radiusExponent,t=!0),e.rings!==void 0&&e.rings!==this.pdRings&&(this.pdRings=e.rings,t=!0),e.samples!==void 0&&e.samples!==this.pdSamples&&(this.pdSamples=e.samples,t=!0),t&&(this.pdMaterial.defines.SAMPLES=this.pdSamples,this.pdMaterial.defines.SAMPLE_VECTORS=Id(this.pdSamples,this.pdRings,this.pdRadiusExponent),this.pdMaterial.needsUpdate=!0)}render(e,n,r){switch(this._renderGBuffer&&(this._overrideVisibility(),this._renderOverride(e,this.normalMaterial,this.normalRenderTarget,7829503,1),this._restoreVisibility()),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.gtaoMaterial.uniforms.cameraWorldMatrix.value.copy(this.camera.matrixWorld),this._renderPass(e,this.gtaoMaterial,this.gtaoRenderTarget,16777215,1),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this._renderPass(e,this.pdMaterial,this.pdRenderTarget,16777215,1),this.output){case t.OUTPUT.Off:break;case t.OUTPUT.Diffuse:this.copyMaterial.uniforms.tDiffuse.value=r.texture,this.copyMaterial.blending=0,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:n);break;case t.OUTPUT.AO:this.copyMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.copyMaterial.blending=0,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:n);break;case t.OUTPUT.Denoise:this.copyMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this.copyMaterial.blending=0,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:n);break;case t.OUTPUT.Depth:this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this._renderPass(e,this.depthRenderMaterial,this.renderToScreen?null:n);break;case t.OUTPUT.Normal:this.copyMaterial.uniforms.tDiffuse.value=this.normalTexture||null,this.copyMaterial.blending=0,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:n);break;case t.OUTPUT.Default:this.copyMaterial.uniforms.tDiffuse.value=r.texture,this.copyMaterial.blending=0,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:n),this.blendMaterial.uniforms.intensity.value=this.blendIntensity,this.blendMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this._renderPass(e,this.blendMaterial,this.renderToScreen?null:n);break;default:console.warn(`THREE.GTAOPass: Unknown output type.`)}}_renderPass(e,t,n,r,i){e.getClearColor(this._originalClearColor);let a=e.getClearAlpha(),o=e.autoClear;e.setRenderTarget(n),e.autoClear=!1,r!=null&&(e.setClearColor(r),e.setClearAlpha(i||0),e.clear()),this._fsQuad.material=t,this._fsQuad.render(e),e.autoClear=o,e.setClearColor(this._originalClearColor),e.setClearAlpha(a)}_renderOverride(e,t,n,r,i){e.getClearColor(this._originalClearColor);let a=e.getClearAlpha(),o=e.autoClear;e.setRenderTarget(n),e.autoClear=!1,r=t.clearColor||r,i=t.clearAlpha||i,r!=null&&(e.setClearColor(r),e.setClearAlpha(i||0),e.clear()),this.scene.overrideMaterial=t,e.render(this.scene,this.camera),this.scene.overrideMaterial=null,e.autoClear=o,e.setClearColor(this._originalClearColor),e.setClearAlpha(a)}_overrideVisibility(){let e=this.scene,t=this._visibilityCache;e.traverse(function(e){(e.isPoints||e.isLine||e.isLine2)&&e.visible&&(e.visible=!1,t.push(e))})}_restoreVisibility(){let e=this._visibilityCache;for(let t=0;t<e.length;t++)e[t].visible=!0;e.length=0}_generateNoise(t=64){let n=new Rd,r=t*t*4,i=new Uint8Array(r);for(let e=0;e<t;e++)for(let r=0;r<t;r++){let a=e,o=r;i[(e*t+r)*4]=(n.noise(a,o)*.5+.5)*255,i[(e*t+r)*4+1]=(n.noise(a+t,o)*.5+.5)*255,i[(e*t+r)*4+2]=(n.noise(a,o+t)*.5+.5)*255,i[(e*t+r)*4+3]=(n.noise(a+t,o+t)*.5+.5)*255}let a=new ni(i,t,t,w,l);return a.wrapS=e,a.wrapT=e,a.needsUpdate=!0,a}};zd.OUTPUT={Off:-1,Default:0,Diffuse:1,Depth:2,Normal:3,AO:4,Denoise:5};var Bd={name:`FXAAShader`,uniforms:{tDiffuse:{value:null},resolution:{value:new U(1/1024,1/512)}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec2 resolution;
		varying vec2 vUv;

		#define EDGE_STEP_COUNT 6
		#define EDGE_GUESS 8.0
		#define EDGE_STEPS 1.0, 1.5, 2.0, 2.0, 2.0, 4.0
		const float edgeSteps[EDGE_STEP_COUNT] = float[EDGE_STEP_COUNT]( EDGE_STEPS );

		float _ContrastThreshold = 0.0312;
		float _RelativeThreshold = 0.063;
		float _SubpixelBlending = 1.0;

		vec4 Sample( sampler2D  tex2D, vec2 uv ) {

			return texture( tex2D, uv );

		}

		float SampleLuminance( sampler2D tex2D, vec2 uv ) {

			return dot( Sample( tex2D, uv ).rgb, vec3( 0.3, 0.59, 0.11 ) );

		}

		float SampleLuminance( sampler2D tex2D, vec2 texSize, vec2 uv, float uOffset, float vOffset ) {

			uv += texSize * vec2(uOffset, vOffset);
			return SampleLuminance(tex2D, uv);

		}

		struct LuminanceData {

			float m, n, e, s, w;
			float ne, nw, se, sw;
			float highest, lowest, contrast;

		};

		LuminanceData SampleLuminanceNeighborhood( sampler2D tex2D, vec2 texSize, vec2 uv ) {

			LuminanceData l;
			l.m = SampleLuminance( tex2D, uv );
			l.n = SampleLuminance( tex2D, texSize, uv,  0.0,  1.0 );
			l.e = SampleLuminance( tex2D, texSize, uv,  1.0,  0.0 );
			l.s = SampleLuminance( tex2D, texSize, uv,  0.0, -1.0 );
			l.w = SampleLuminance( tex2D, texSize, uv, -1.0,  0.0 );

			l.ne = SampleLuminance( tex2D, texSize, uv,  1.0,  1.0 );
			l.nw = SampleLuminance( tex2D, texSize, uv, -1.0,  1.0 );
			l.se = SampleLuminance( tex2D, texSize, uv,  1.0, -1.0 );
			l.sw = SampleLuminance( tex2D, texSize, uv, -1.0, -1.0 );

			l.highest = max( max( max( max( l.n, l.e ), l.s ), l.w ), l.m );
			l.lowest = min( min( min( min( l.n, l.e ), l.s ), l.w ), l.m );
			l.contrast = l.highest - l.lowest;
			return l;

		}

		bool ShouldSkipPixel( LuminanceData l ) {

			float threshold = max( _ContrastThreshold, _RelativeThreshold * l.highest );
			return l.contrast < threshold;

		}

		float DeterminePixelBlendFactor( LuminanceData l ) {

			float f = 2.0 * ( l.n + l.e + l.s + l.w );
			f += l.ne + l.nw + l.se + l.sw;
			f *= 1.0 / 12.0;
			f = abs( f - l.m );
			f = clamp( f / l.contrast, 0.0, 1.0 );

			float blendFactor = smoothstep( 0.0, 1.0, f );
			return blendFactor * blendFactor * _SubpixelBlending;

		}

		struct EdgeData {

			bool isHorizontal;
			float pixelStep;
			float oppositeLuminance, gradient;

		};

		EdgeData DetermineEdge( vec2 texSize, LuminanceData l ) {

			EdgeData e;
			float horizontal =
				abs( l.n + l.s - 2.0 * l.m ) * 2.0 +
				abs( l.ne + l.se - 2.0 * l.e ) +
				abs( l.nw + l.sw - 2.0 * l.w );
			float vertical =
				abs( l.e + l.w - 2.0 * l.m ) * 2.0 +
				abs( l.ne + l.nw - 2.0 * l.n ) +
				abs( l.se + l.sw - 2.0 * l.s );
			e.isHorizontal = horizontal >= vertical;

			float pLuminance = e.isHorizontal ? l.n : l.e;
			float nLuminance = e.isHorizontal ? l.s : l.w;
			float pGradient = abs( pLuminance - l.m );
			float nGradient = abs( nLuminance - l.m );

			e.pixelStep = e.isHorizontal ? texSize.y : texSize.x;

			if (pGradient < nGradient) {

				e.pixelStep = -e.pixelStep;
				e.oppositeLuminance = nLuminance;
				e.gradient = nGradient;

			} else {

				e.oppositeLuminance = pLuminance;
				e.gradient = pGradient;

			}

			return e;

		}

		float DetermineEdgeBlendFactor( sampler2D  tex2D, vec2 texSize, LuminanceData l, EdgeData e, vec2 uv ) {

			vec2 uvEdge = uv;
			vec2 edgeStep;
			if (e.isHorizontal) {

				uvEdge.y += e.pixelStep * 0.5;
				edgeStep = vec2( texSize.x, 0.0 );

			} else {

				uvEdge.x += e.pixelStep * 0.5;
				edgeStep = vec2( 0.0, texSize.y );

			}

			float edgeLuminance = ( l.m + e.oppositeLuminance ) * 0.5;
			float gradientThreshold = e.gradient * 0.25;

			vec2 puv = uvEdge + edgeStep * edgeSteps[0];
			float pLuminanceDelta = SampleLuminance( tex2D, puv ) - edgeLuminance;
			bool pAtEnd = abs( pLuminanceDelta ) >= gradientThreshold;

			for ( int i = 1; i < EDGE_STEP_COUNT && !pAtEnd; i++ ) {

				puv += edgeStep * edgeSteps[i];
				pLuminanceDelta = SampleLuminance( tex2D, puv ) - edgeLuminance;
				pAtEnd = abs( pLuminanceDelta ) >= gradientThreshold;

			}

			if ( !pAtEnd ) {

				puv += edgeStep * EDGE_GUESS;

			}

			vec2 nuv = uvEdge - edgeStep * edgeSteps[0];
			float nLuminanceDelta = SampleLuminance( tex2D, nuv ) - edgeLuminance;
			bool nAtEnd = abs( nLuminanceDelta ) >= gradientThreshold;

			for ( int i = 1; i < EDGE_STEP_COUNT && !nAtEnd; i++ ) {

				nuv -= edgeStep * edgeSteps[i];
				nLuminanceDelta = SampleLuminance( tex2D, nuv ) - edgeLuminance;
				nAtEnd = abs( nLuminanceDelta ) >= gradientThreshold;

			}

			if ( !nAtEnd ) {

				nuv -= edgeStep * EDGE_GUESS;

			}

			float pDistance, nDistance;
			if ( e.isHorizontal ) {

				pDistance = puv.x - uv.x;
				nDistance = uv.x - nuv.x;

			} else {

				pDistance = puv.y - uv.y;
				nDistance = uv.y - nuv.y;

			}

			float shortestDistance;
			bool deltaSign;
			if ( pDistance <= nDistance ) {

				shortestDistance = pDistance;
				deltaSign = pLuminanceDelta >= 0.0;

			} else {

				shortestDistance = nDistance;
				deltaSign = nLuminanceDelta >= 0.0;

			}

			if ( deltaSign == ( l.m - edgeLuminance >= 0.0 ) ) {

				return 0.0;

			}

			return 0.5 - shortestDistance / ( pDistance + nDistance );

		}

		vec4 ApplyFXAA( sampler2D  tex2D, vec2 texSize, vec2 uv ) {

			LuminanceData luminance = SampleLuminanceNeighborhood( tex2D, texSize, uv );
			if ( ShouldSkipPixel( luminance ) ) {

				return Sample( tex2D, uv );

			}

			float pixelBlend = DeterminePixelBlendFactor( luminance );
			EdgeData edge = DetermineEdge( texSize, luminance );
			float edgeBlend = DetermineEdgeBlendFactor( tex2D, texSize, luminance, edge, uv );
			float finalBlend = max( pixelBlend, edgeBlend );

			if (edge.isHorizontal) {

				uv.y += edge.pixelStep * finalBlend;

			} else {

				uv.x += edge.pixelStep * finalBlend;

			}

			return Sample( tex2D, uv );

		}

		void main() {

			gl_FragColor = ApplyFXAA( tDiffuse, resolution.xy, vUv );

		}`},Vd=class extends yd{constructor(){super(Bd)}setSize(e,t){this.material.uniforms.resolution.value.set(1/e,1/t)}},Hd=class e extends q{constructor(){let t=e.SkyShader,n=new Wi({name:t.name,uniforms:Vi.clone(t.uniforms),vertexShader:t.vertexShader,fragmentShader:t.fragmentShader,side:1,depthWrite:!1});super(new Ai(1,1,1),n),this.isSky=!0}};Hd.SkyShader={name:`SkyShader`,uniforms:{turbidity:{value:2},rayleigh:{value:1},mieCoefficient:{value:.005},mieDirectionalG:{value:.8},sunPosition:{value:new W},cloudScale:{value:2e-4},cloudSpeed:{value:2e-5},cloudCoverage:{value:.4},cloudDensity:{value:.4},cloudElevation:{value:.5},showSunDisc:{value:1},time:{value:0}},vertexShader:`
		uniform vec3 sunPosition;
		uniform float rayleigh;
		uniform float turbidity;
		uniform float mieCoefficient;

		varying vec3 vWorldPosition;
		varying vec3 vSunDirection;
		varying float vSunfade;
		varying vec3 vBetaR;
		varying vec3 vBetaM;
		varying float vSunE;

		// constants for atmospheric scattering
		const float e = 2.71828182845904523536028747135266249775724709369995957;
		const float pi = 3.141592653589793238462643383279502884197169;

		// wavelength of used primaries, according to preetham
		const vec3 lambda = vec3( 680E-9, 550E-9, 450E-9 );
		// this pre-calculation replaces older TotalRayleigh(vec3 lambda) function:
		// (8.0 * pow(pi, 3.0) * pow(pow(n, 2.0) - 1.0, 2.0) * (6.0 + 3.0 * pn)) / (3.0 * N * pow(lambda, vec3(4.0)) * (6.0 - 7.0 * pn))
		const vec3 totalRayleigh = vec3( 5.804542996261093E-6, 1.3562911419845635E-5, 3.0265902468824876E-5 );

		// mie stuff
		// K coefficient for the primaries
		const float v = 4.0;
		const vec3 K = vec3( 0.686, 0.678, 0.666 );
		// MieConst = pi * pow( ( 2.0 * pi ) / lambda, vec3( v - 2.0 ) ) * K
		const vec3 MieConst = vec3( 1.8399918514433978E14, 2.7798023919660528E14, 4.0790479543861094E14 );

		// earth shadow hack
		// cutoffAngle = pi / 1.95;
		const float cutoffAngle = 1.6110731556870734;
		const float steepness = 1.5;
		const float EE = 1000.0;

		float sunIntensity( float zenithAngleCos ) {
			zenithAngleCos = clamp( zenithAngleCos, -1.0, 1.0 );
			return EE * max( 0.0, 1.0 - pow( e, -( ( cutoffAngle - acos( zenithAngleCos ) ) / steepness ) ) );
		}

		vec3 totalMie( float T ) {
			float c = ( 0.2 * T ) * 10E-18;
			return 0.434 * c * MieConst;
		}

		void main() {

			vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
			vWorldPosition = worldPosition.xyz;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			gl_Position.z = gl_Position.w; // set z to camera.far

			vSunDirection = normalize( sunPosition );

			vSunE = sunIntensity( vSunDirection.y );

			vSunfade = 1.0 - clamp( 1.0 - exp( ( sunPosition.y / 450000.0 ) ), 0.0, 1.0 );

			float rayleighCoefficient = rayleigh - ( 1.0 * ( 1.0 - vSunfade ) );

			// extinction (absorption + out scattering)
			// rayleigh coefficients
			vBetaR = totalRayleigh * rayleighCoefficient;

			// mie coefficients
			vBetaM = totalMie( turbidity ) * mieCoefficient;

		}`,fragmentShader:`
		varying vec3 vWorldPosition;
		varying vec3 vSunDirection;
		varying vec3 vBetaR;
		varying vec3 vBetaM;
		varying float vSunE;

		uniform float mieDirectionalG;
		uniform float cloudScale;
		uniform float cloudSpeed;
		uniform float cloudCoverage;
		uniform float cloudDensity;
		uniform float cloudElevation;
		uniform float showSunDisc;
		uniform float time;

		// gradient at a lattice corner; sinless hash so every GPU produces the same clouds
		vec2 gradient( vec2 i ) {
			vec3 p = fract( i.xyx * vec3( 0.1031, 0.1030, 0.0973 ) );
			p += dot( p, p.yzx + 33.33 );
			return fract( ( p.xx + p.yz ) * p.zy ) * 2.0 - 1.0;
		}

		// 2D gradient noise: isotropic lobes like Perlin at value-noise cost
		float noise( vec2 p ) {
			vec2 i = floor( p );
			vec2 f = fract( p );
			vec2 u = f * f * f * ( f * ( f * 6.0 - 15.0 ) + 10.0 ); // quintic fade
			float a = dot( gradient( i ), f );
			float b = dot( gradient( i + vec2( 1.0, 0.0 ) ), f - vec2( 1.0, 0.0 ) );
			float c = dot( gradient( i + vec2( 0.0, 1.0 ) ), f - vec2( 0.0, 1.0 ) );
			float d = dot( gradient( i + vec2( 1.0, 1.0 ) ), f - vec2( 1.0, 1.0 ) );
			return mix( mix( a, b, u.x ), mix( c, d, u.x ), u.y ) * 1.6; // ~[-1,1]
		}

		// fbm; per-octave drift makes clouds billow instead of scrolling as a rigid stamp
		float fbm( vec2 p, float drift ) {
			float result = 0.0;
			float amplitude = 1.0;
			for ( int i = 0; i < 4; i ++ ) {
				result += amplitude * noise( p );
				amplitude *= 0.5;
				p = p * 2.0 + drift;
			}
			return result;
		}

		// constants for atmospheric scattering
		const float pi = 3.141592653589793238462643383279502884197169;

		const float n = 1.0003; // refractive index of air
		const float N = 2.545E25; // number of molecules per unit volume for air at 288.15K and 1013mb (sea level -45 celsius)

		// optical length at zenith for molecules
		const float rayleighZenithLength = 8.4E3;
		const float mieZenithLength = 1.25E3;
		// 66 arc seconds -> degrees, and the cosine of that
		const float sunAngularDiameterCos = 0.999956676946448443553574619906976478926848692873900859324;

		// 3.0 / ( 16.0 * pi )
		const float THREE_OVER_SIXTEENPI = 0.05968310365946075;
		// 1.0 / ( 4.0 * pi )
		const float ONE_OVER_FOURPI = 0.07957747154594767;

		float rayleighPhase( float cosTheta ) {
			return THREE_OVER_SIXTEENPI * ( 1.0 + pow( cosTheta, 2.0 ) );
		}

		float hgPhase( float cosTheta, float g ) {
			float g2 = pow( g, 2.0 );
			float inverse = 1.0 / pow( 1.0 - 2.0 * g * cosTheta + g2, 1.5 );
			return ONE_OVER_FOURPI * ( ( 1.0 - g2 ) * inverse );
		}

		void main() {

			vec3 direction = normalize( vWorldPosition - cameraPosition );

			// optical length
			// cutoff angle at 90 to avoid singularity in next formula.
			float zenithAngle = acos( max( 0.0, direction.y ) );
			float inverse = 1.0 / ( cos( zenithAngle ) + 0.15 * pow( 93.885 - ( ( zenithAngle * 180.0 ) / pi ), -1.253 ) );
			float sR = rayleighZenithLength * inverse;
			float sM = mieZenithLength * inverse;

			// combined extinction factor
			vec3 Fex = exp( -( vBetaR * sR + vBetaM * sM ) );

			// in scattering
			float cosTheta = dot( direction, vSunDirection );

			float rPhase = rayleighPhase( cosTheta * 0.5 + 0.5 );
			vec3 betaRTheta = vBetaR * rPhase;

			float mPhase = hgPhase( cosTheta, mieDirectionalG );
			vec3 betaMTheta = vBetaM * mPhase;

			vec3 Lin = pow( vSunE * ( ( betaRTheta + betaMTheta ) / ( vBetaR + vBetaM ) ) * ( 1.0 - Fex ), vec3( 1.5 ) );
			Lin *= mix( vec3( 1.0 ), pow( vSunE * ( ( betaRTheta + betaMTheta ) / ( vBetaR + vBetaM ) ) * Fex, vec3( 1.0 / 2.0 ) ), clamp( pow( 1.0 - vSunDirection.y, 5.0 ), 0.0, 1.0 ) );

			// nightsky
			float theta = acos( direction.y ); // elevation --> y-axis, [-pi/2, pi/2]
			float phi = atan( direction.z, direction.x ); // azimuth --> x-axis [-pi/2, pi/2]
			vec2 uv = vec2( phi, theta ) / vec2( 2.0 * pi, pi ) + vec2( 0.5, 0.0 );
			vec3 L0 = vec3( 0.1 ) * Fex;

			// composition + solar disc
			float sundisc = clamp( ( cosTheta - sunAngularDiameterCos ) * 50000.0, 0.0, 1.0 ) * showSunDisc;
			vec3 sundiscColor = ( 760.0 * sundisc ) * min( vSunE * Fex, 80.0 );

			vec3 texColor = ( Lin + L0 ) * 0.04 + sundiscColor + vec3( 0.0, 0.0003, 0.00075 );

			// Clouds
			if ( direction.y > 0.0 && cloudCoverage > 0.0 ) {

				// Project to cloud plane (higher elevation = clouds appear lower/closer)
				float elevation = mix( 1.0, 0.1, cloudElevation );
				vec2 cloudUV = direction.xz / ( direction.y * elevation );
				cloudUV *= cloudScale;
				cloudUV += time * cloudSpeed;

				// Cloud density field
				float evolve = time * cloudSpeed * 300.0;
				float cloudNoise = clamp( fbm( cloudUV * 1000.0, evolve ) * 0.7 + 0.5, 0.0, 1.0 );

				// Large-scale coverage variation: clear gaps next to dense banks
				float region = noise( cloudUV * 300.0 ) * 0.37 + 0.5;
				float cov = clamp( cloudCoverage + ( region - 0.5 ) * 0.6, 0.0, 1.0 );

				// Carve clouds where noise rises above the coverage level
				float threshold = 1.0 - cov;
				float cloudMask = smoothstep( threshold, threshold + 0.3, cloudNoise );

				// Fade clouds near horizon (adjusted by elevation)
				float horizonFade = smoothstep( 0.0, 0.03 + 0.06 * cloudElevation, direction.y );
				cloudMask *= horizonFade;

				// Cloud lighting from the sky's own radiance
				float dayFactor = smoothstep( -0.08, 0.3, vSunDirection.y );
				vec3 sunColor = vSunE * Fex * 0.22 * 0.04; // 0.22 ~ albedo/pi, 0.04 = exposure; the aerial composite adds the eye-leg extinction
				vec3 skyAmbient = Lin * 0.04 + vec3( 0.0, 0.0003, 0.00075 );

				// Beer-powder self-shadow from the sampled density
				float depth = max( 0.0, cloudNoise - threshold );
				float beer = exp( depth * -4.0 );
				float powder = 1.0 - beer * beer; // beer*beer == exp(-8*depth)
				float shade = mix( 0.45, 1.0, clamp( beer * powder * 2.6, 0.0, 1.0 ) ); // 2.6 = 1/0.385, normalizes beer*powder peak to 1

				// Henyey-Greenstein forward lobe ( g = 0.7 ): silver lining on rims toward the sun
				float silver = clamp( 0.51 / pow( 1.49 - cosTheta * 1.4, 1.5 ), 0.0, 3.0 ); // 0.51=1-g^2, 1.49=1+g^2, 1.4=2g
				float edge = cloudMask * ( 1.0 - cloudMask ) * 4.0;

				vec3 cloudColor = skyAmbient + sunColor * shade;
				cloudColor += sunColor * silver * edge * 0.6;
				cloudColor *= max( dayFactor, 0.03 );

				// Cloud opacity via Beer's law: density sets how solid the clouds get
				float alpha = ( 1.0 - exp( depth * cloudDensity * -12.0 ) ) * horizonFade;

				// Occlude the sun disc/glow behind opaque cloud
				texColor -= L0 * 0.04 * alpha;

				// Composite through the atmosphere so distant clouds dissolve into haze
				vec3 cloudAerial = mix( texColor, cloudColor, Fex );
				texColor = mix( texColor, cloudAerial, alpha );

			}

			gl_FragColor = vec4( texColor, 1.0 );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>

		}`};function Ud(e,t,n=0){let r=e*374761393+t*668265263+n*982451653|0;return r=Math.imul(r^r>>>13,1274126177),r^=r>>>16,(r>>>0)/4294967296}function Wd(e){let t=e>>>0;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function Gd(e,t,n,r){let i=Math.floor(e),a=Math.floor(t),o=e-i,s=t-a,c=e=>(e%n+n)%n,l=Ud(c(i),c(a),r),u=Ud(c(i+1),c(a),r),d=Ud(c(i),c(a+1),r),f=Ud(c(i+1),c(a+1),r),p=o*o*(3-2*o),m=s*s*(3-2*s);return l+(u-l)*p+(d-l)*m+(l-u-d+f)*p*m}function Kd(e,t,n,r,i=4){let a=0,o=.5,s=1,c=0;for(let l=0;l<i;l++)a+=o*Gd(e*s,t*s,n*s,r+l*17),c+=o,o*=.5,s*=2;return a/c}function qd(e,t){let n=document.createElement(`canvas`);return n.width=e,n.height=t,[n,n.getContext(`2d`)]}var Jd=new Map;function Yd(e,t){let n=Jd.get(e);if(n)return n;let r=t();return Jd.set(e,r),r}function Xd(t=512){return Yd(`grassNoise`+t,()=>{let n=new Uint8Array(t*t*4);for(let e=0;e<t;e++)for(let r=0;r<t;r++){let i=(e*t+r)*4,a=Ud(r,e,3),o=Kd(r/t*32,e/t*32,32,5,3),s=Kd(r/t*4,e/t*4,4,9,4),c=Ud(r>>1,e>>2,11)**.65*(.6+.4*o);n[i]=a*255,n[i+1]=o*255,n[i+2]=s*255,n[i+3]=c*255}let r=new ni(n,t,t,w,l);return r.wrapS=r.wrapT=e,r.magFilter=o,r.minFilter=c,r.generateMipmaps=!0,r.anisotropy=8,r.needsUpdate=!0,r})}function Zd(t=512){return Yd(`grassNormal`+t,()=>{let n=new Float32Array(t*t);for(let e=0;e<t;e++)for(let r=0;r<t;r++)n[e*t+r]=.6*Ud(r,e,21)+.4*Kd(r/t*64,e/t*64,64,23,2);let r=new Uint8Array(t*t*4),i=(e,r)=>n[(r+t)%t*t+(e+t)%t];for(let e=0;e<t;e++)for(let n=0;n<t;n++){let a=(i(n+1,e)-i(n-1,e))*2.2,o=(i(n,e+1)-i(n,e-1))*2.2,s=Math.hypot(a,o,1),c=(e*t+n)*4;r[c]=(-a/s*.5+.5)*255,r[c+1]=(-o/s*.5+.5)*255,r[c+2]=1/s*.5*255+127,r[c+3]=255}let a=new ni(r,t,t,w,l);return a.wrapS=a.wrapT=e,a.minFilter=c,a.magFilter=o,a.generateMipmaps=!0,a.anisotropy=8,a.needsUpdate=!0,a})}function Qd(){return Yd(`net`,()=>{let[t,n]=qd(256,256);n.clearRect(0,0,256,256),n.strokeStyle=`#ffffff`,n.lineCap=`round`,n.lineWidth=9;for(let e=-1;e<=2;e++)for(let t=-1;t<=2;t++){let r=e*128+64,i=t*128+64;n.beginPath(),n.moveTo(r,i-64),n.lineTo(r+64,i),n.lineTo(r,i+64),n.lineTo(r-64,i),n.closePath(),n.stroke()}n.fillStyle=`#ffffff`;for(let e=0;e<=2;e++)for(let t=0;t<=2;t++)for(let[r,i]of[[0,64],[64,0]])n.beginPath(),n.arc(e*128+r,t*128+i,7,0,Math.PI*2),n.fill();let r=new Ei(t);return r.wrapS=r.wrapT=e,r.anisotropy=8,r})}function $d(){return{map:Yd(`ballMap`,()=>{let e=1024,[t,n]=qd(e,512),r=n.createImageData(e,512),[i,a]=qd(e,512),o=a.createImageData(e,512);for(let t=0;t<512;t++){let n=t/512*Math.PI;for(let i=0;i<e;i++){let a=i/e*Math.PI*2,s=Math.sin(n)*Math.cos(a),c=Math.cos(n),l=Math.sin(n)*Math.sin(a),u=.55,d=s*Math.cos(u*c)-l*Math.sin(u*c),f=s*Math.sin(u*c)+l*Math.cos(u*c),p=Math.abs(d),m=Math.abs(c),h=Math.abs(f),g=Math.max(p,m,h),_=g-(p+m+h-g-Math.min(p,m,h)),v=g===p?d>0?0:1:g===m?c>0?2:3:f>0?4:5,y=246,b=246,x=242,S=Math.abs(_-.16);if(S<.045){let e=v%2==0,t=1-S/.045,n=e?214:32,r=e?160:38,i=e?52:46;y+=(n-y)*Math.min(1,t*2.2),b+=(r-b)*Math.min(1,t*2.2),x+=(i-x)*Math.min(1,t*2.2)}Math.abs(_-.24)<.006&&(y=40,b=44,x=52);let C=255;if(_<.012){let e=_/.012;y*=.55+.45*e,b*=.55+.45*e,x*=.55+.45*e,C=255*e}let w=Ud(i,t,77)*10-5,T=(t*e+i)*4;r.data[T]=Math.max(0,Math.min(255,y+w)),r.data[T+1]=Math.max(0,Math.min(255,b+w)),r.data[T+2]=Math.max(0,Math.min(255,x+w)),r.data[T+3]=255;let E=((i*7+t*13)%9==0?220:255)*(_<.012?0:1),D=Math.min(C,E||C);o.data[T]=o.data[T+1]=o.data[T+2]=D,o.data[T+3]=255}}n.putImageData(r,0,0),n.save(),n.font=`700 34px "Big Shoulders Display", Impact, sans-serif`,n.fillStyle=`#1d2330`,n.textAlign=`center`,n.fillText(`PK·ONE`,e*.25,266.24),n.fillText(`PK·ONE`,e*.75,266.24),n.restore(),a.putImageData(o,0,0),Jd.set(`ballBump`,new Ei(i));let s=new Ei(t);return s.colorSpace=Re,s.anisotropy=8,s}),bump:Jd.get(`ballBump`)}}function ef(n,r,i){return Yd(`jersey-${JSON.stringify(n)}-${r}-${i}`,()=>{let[a,o]=qd(512,512);switch(o.fillStyle=n.primary,o.fillRect(0,0,512,512),o.fillStyle=n.secondary,n.pattern){case`stripes`:for(let e=0;e<12;e+=2)o.fillRect(e*512/12,0,512/12,512);break;case`hoops`:for(let e=0;e<8;e+=2)o.fillRect(0,e*512/8,512,64);break;case`sash`:o.save(),o.translate(0,512),o.rotate(-.75),o.fillRect(-512,-40,1126.4,80),o.restore();break;case`halves`:o.fillRect(0,0,128,512),o.fillRect(384,0,128,512);break;case`gradient`:{let e=o.createLinearGradient(0,512,0,0);e.addColorStop(0,n.secondary),e.addColorStop(1,n.primary),o.fillStyle=e,o.fillRect(0,0,512,512);break}}o.globalAlpha=.06;for(let e=0;e<512;e+=3)o.fillStyle=e%6==0?`#000`:`#fff`,o.fillRect(0,e,512,1);o.globalAlpha=1,o.fillStyle=n.accent,o.fillRect(0,0,512,20),o.fillRect(120.32,0,10,512),o.fillRect(386.56,0,10,512),o.fillStyle=n.numberColor,o.textAlign=`center`,o.font=`800 170px "Big Shoulders Display", Impact, sans-serif`,o.fillText(String(r),256,317.44),o.font=`700 38px "Big Shoulders Display", Impact, sans-serif`,o.fillText(i.toUpperCase(),256,102.4),o.font=`800 64px "Big Shoulders Display", Impact, sans-serif`,o.fillText(String(r),490.496,256),o.fillText(String(r),21.504,256),o.beginPath(),o.fillStyle=n.accent,o.arc(38.4,153.6,18,0,Math.PI*2),o.fill();let s=new Ei(a);return s.colorSpace=Re,s.wrapS=e,s.wrapT=t,s.anisotropy=4,s})}function tf(t,n,r){return Yd(`face-${t}-${n}-${r}`,()=>{let[i,a]=qd(256,256);a.fillStyle=t,a.fillRect(0,0,256,256),a.fillStyle=n,a.fillRect(0,0,256,30.72);for(let e of[0,256])a.fillStyle=n,a.fillRect(e-30,92.16,22,5),a.fillRect(e+8,92.16,22,5),a.fillStyle=`#f2efe9`,a.beginPath(),a.ellipse(e-19,107.52,9,5,0,0,Math.PI*2),a.ellipse(e+19,107.52,9,5,0,0,Math.PI*2),a.fill(),a.fillStyle=`#2b1d14`,a.beginPath(),a.arc(e-19,107.52,4,0,Math.PI*2),a.arc(e+19,107.52,4,0,Math.PI*2),a.fill(),a.strokeStyle=`rgba(80,30,30,0.6)`,a.lineWidth=3,a.beginPath(),a.moveTo(e-12,179.2),a.quadraticCurveTo(e,184.32,e+12,179.2),a.stroke(),r%3==0&&(a.fillStyle=`rgba(30,20,15,0.25)`,a.beginPath(),a.ellipse(e,192,34,22,0,0,Math.PI*2),a.fill());let o=a.createLinearGradient(0,0,0,256);o.addColorStop(0,`rgba(0,0,0,0.1)`),o.addColorStop(.5,`rgba(0,0,0,0)`),o.addColorStop(1,`rgba(0,0,0,0.15)`),a.fillStyle=o,a.fillRect(0,0,256,256);let s=new Ei(i);return s.colorSpace=Re,s.wrapS=e,s})}function nf(){return Yd(`crowd`,()=>{let[e,t]=qd(512,256);t.clearRect(0,0,512,256);let n=Wd(42);for(let e=0;e<2;e++)for(let r=0;r<8;r++){let i=r*64;t.save(),t.translate(i,0);let a=e*128;.75+n()*.25,t.fillStyle=`rgb(255,255,255)`;let o=34+n()*10;t.beginPath(),t.moveTo(32-o/2,128+a),t.lineTo(32-o/2+2,62+a),t.quadraticCurveTo(32,52+a,32+o/2-2,62+a),t.lineTo(32+o/2,128+a),t.closePath(),t.fill(),e===1&&(t.lineWidth=9,t.strokeStyle=`#ffffff`,t.lineCap=`round`,t.beginPath(),t.moveTo(32-o/2+4,66+a),t.lineTo(32-o/2-6,26+a),t.moveTo(32+o/2-4,66+a),t.lineTo(32+o/2+6,26+a),t.stroke(),t.fillStyle=`rgb(0,255,0)`,t.beginPath(),t.arc(32-o/2-7,22+a,5,0,7),t.arc(32+o/2+7,22+a,5,0,7),t.fill()),t.fillStyle=`rgb(0,255,0)`,t.beginPath(),t.ellipse(32,42+a,10,12,0,0,Math.PI*2),t.fill(),t.fillStyle=`rgb(0,0,255)`,t.beginPath(),t.ellipse(32,36+a,10.5,8+n()*3,0,Math.PI,Math.PI*2),t.fill(),t.restore()}let r=new Ei(e);return r.anisotropy=4,r})}function rf(e,t){let[n,r]=qd(e,t),i=new Ei(n);return i.colorSpace=Re,i.anisotropy=8,{canvas:n,ctx:r,tex:i}}function af(e,t,n,r,i=24){let a=new q(new ji(n,n,e.distanceTo(t),i,1,!0),r);return a.position.copy(e).add(t).multiplyScalar(.5),a.quaternion.setFromUnitVectors(new W(0,1,0),t.clone().sub(e).normalize()),a.castShadow=!0,a.receiveShadow=!0,a}var of=class{n;pos;prev;pinned;cons;rest;geometry;mesh;awake=1.5;quiet=0;constructor(e){let t=[],n=[],r=[],i=[],a=[],o=.24;for(let s of Ju){let[c,l,u,d]=s.corners,f=Math.max(c.distanceTo(l),u.distanceTo(d)),p=Math.max(c.distanceTo(u),l.distanceTo(d)),m=Math.max(3,Math.round(f/e)),h=Math.max(3,Math.round(p/e)),g=t.length/3,_=new W,v=new W,y=new W;for(let e=0;e<=h;e++)for(let i=0;i<=m;i++){let a=i/m,s=e/h;v.copy(c).lerp(l,a),y.copy(u).lerp(d,a),_.copy(v).lerp(y,s),t.push(_.x,_.y,_.z),n.push(+(i===0||e===0||i===m||e===h)),r.push(a*f/o,s*p/o)}let b=(e,t)=>g+t*(m+1)+e;for(let e=0;e<=h;e++)for(let t=0;t<=m;t++)t<m&&a.push(b(t,e),b(t+1,e)),e<h&&a.push(b(t,e),b(t,e+1)),t<m&&e<h&&(a.push(b(t,e),b(t+1,e+1)),i.push(b(t,e),b(t+1,e),b(t+1,e+1),b(t,e),b(t+1,e+1),b(t,e+1)))}this.n=t.length/3,this.pos=new Float32Array(t),this.prev=new Float32Array(t),this.pinned=new Uint8Array(n),this.cons=new Int32Array(a),this.rest=new Float32Array(a.length/2);for(let e=0;e<this.rest.length;e++){let t=this.cons[2*e]*3,n=this.cons[2*e+1]*3,r=Math.hypot(this.pos[t]-this.pos[n],this.pos[t+1]-this.pos[n+1],this.pos[t+2]-this.pos[n+2]);this.rest[e]=r*1.035}let s=new Ar;s.setAttribute(`position`,new hr(this.pos,3)),s.setAttribute(`uv`,new hr(new Float32Array(r),2)),s.setIndex(i),s.computeVertexNormals(),this.geometry=s;let c=Qd(),l=new Ki({color:16053488,map:c,alphaMap:c,alphaTest:.45,transparent:!1,side:2,roughness:.85,metalness:0});l.alphaToCoverage=!0,this.mesh=new q(s,l),this.mesh.castShadow=!0,this.mesh.receiveShadow=!0,this.mesh.frustumCulled=!1,this.mesh.customDepthMaterial=new Yi({depthPacking:R,alphaMap:c,alphaTest:.45,side:2}),this.mesh.name=`net`,this.snapshot0=new Float32Array(this.pos);for(let e=0;e<360;e++)this.step(1/240,null,null);this.snapshot0.set(this.pos),this.prev.set(this.pos),this.awake=0}snapshot0;reset(){this.pos.set(this.snapshot0),this.prev.set(this.snapshot0),this.awake=0,this.geometry.attributes.position.needsUpdate=!0,this.geometry.computeVertexNormals()}wake(){this.awake=1.6}step(e,t,n){if(n&&n.z<.4&&n.z>-3&&Math.abs(n.x)<Q.postX+.6&&n.y<Q.barY+.5&&(this.awake=Math.max(this.awake,.8)),this.awake<=0)return;let r=e/2,i=-9.81*r*r,a=this.pos,o=this.prev,s=this.pinned,c=this.n,l=Z.radius+.014,u=0;for(let e=0;e<2;e++){for(let e=0;e<c;e++){if(s[e])continue;let t=e*3,n=(a[t]-o[t])*.985,r=(a[t+1]-o[t+1])*.985,c=(a[t+2]-o[t+2])*.985;o[t]=a[t],o[t+1]=a[t+1],o[t+2]=a[t+2],a[t]+=n,a[t+1]+=r+i,a[t+2]+=c,u+=n*n+r*r+c*c}for(let e=0;e<4;e++){let e=this.cons,t=this.rest;for(let n=0,r=t.length;n<r;n++){let r=e[2*n],i=e[2*n+1],o=r*3,c=i*3,l=a[c]-a[o],u=a[c+1]-a[o+1],d=a[c+2]-a[o+2],f=Math.sqrt(l*l+u*u+d*d);if(f<=t[n]||f<1e-9)continue;let p=+!s[r],m=+!s[i],h=p+m;if(h===0)continue;let g=(f-t[n])/(f*h);a[o]+=l*g*p,a[o+1]+=u*g*p,a[o+2]+=d*g*p,a[c]-=l*g*m,a[c+1]-=u*g*m,a[c+2]-=d*g*m}}let r=0,d=0,f=0,p=!!(t&&n);if(p){let i=(e+1)/2;r=t.x+(n.x-t.x)*i,d=t.y+(n.y-t.y)*i,f=t.z+(n.z-t.z)*i}for(let e=0;e<c;e++){if(s[e])continue;let t=e*3;if(a[t+1]<.01&&(a[t+1]=.01),!p)continue;let n=a[t]-r,i=a[t+1]-d,o=a[t+2]-f,c=n*n+i*i+o*o;if(c<l*l&&c>1e-12){let e=l/Math.sqrt(c);a[t]=r+n*e,a[t+1]=d+i*e,a[t+2]=f+o*e}}}u<1e-7*c?this.quiet+=e:this.quiet=0,this.awake-=e,this.quiet<.3&&(this.awake=Math.max(this.awake,.05)),this.geometry.attributes.position.needsUpdate=!0}refresh(){this.awake>0&&this.geometry.computeVertexNormals()}capture(e){let t=e??new Float32Array(this.pos.length);return t.set(this.pos),t}restore(e){this.pos.set(e),this.prev.set(e),this.geometry.attributes.position.needsUpdate=!0,this.geometry.computeVertexNormals()}},sf=class{group=new Dn;net;frameMat;constructor(e){let t=Q.postX,n=Q.postZ,r=Q.postRadius,i=Q.barY;this.frameMat=new qi({color:16185336,roughness:.32,metalness:.18,clearcoat:1,clearcoatRoughness:.08,envMapIntensity:1});let a=this.group;a.add(af(new W(-t,-.02,n),new W(-t,i,n),r,this.frameMat,40)),a.add(af(new W(t,-.02,n),new W(t,i,n),r,this.frameMat,40)),a.add(af(new W(-t,i,n),new W(t,i,n),r,this.frameMat,40));for(let e of[-1,1]){let o=new q(new Pi(r,32,16),this.frameMat);o.position.set(e*t,i,n),o.castShadow=!0,a.add(o)}let o=new qi({color:15264492,roughness:.45,metalness:.3,clearcoat:.5}),s=n-r,c=s-Q.netDepthTop,l=s-Q.netDepthBottom,u=.022;for(let e of[-1,1])a.add(af(new W(e*t,i,s),new W(e*t,i,c),u,o,12)),a.add(af(new W(e*t,i,c),new W(e*t,.02,l),u,o,12)),a.add(af(new W(e*t,.02,s),new W(e*t,.02,l),u,o,12));a.add(af(new W(-t,i,c),new W(t,i,c),u,o,12)),a.add(af(new W(-t,.02,l),new W(t,.02,l),u,o,12)),this.net=new of(e),a.add(this.net.mesh)}},cf=`
uniform sampler2D uGrassNoise;
uniform vec3 uGrassA;
uniform vec3 uGrassB;
uniform float uWear;
varying vec3 vTurfWorld;

float segDist(vec2 p, vec2 a, vec2 b) {
  vec2 pa = p - a, ba = b - a;
  float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
  return length(pa - ba * h);
}
float endMarkings(vec2 p) {
  // p.x lateral, p.y distance from that end's goal line (>= 0 on the field)
  float d = 1e4;
  d = min(d, segDist(p, vec2(-34.0, 0.0), vec2(34.0, 0.0)));
  d = min(d, segDist(p, vec2(-20.16, 0.0), vec2(-20.16, 16.5)));
  d = min(d, segDist(p, vec2(20.16, 0.0), vec2(20.16, 16.5)));
  d = min(d, segDist(p, vec2(-20.16, 16.5), vec2(20.16, 16.5)));
  d = min(d, segDist(p, vec2(-9.16, 0.0), vec2(-9.16, 5.5)));
  d = min(d, segDist(p, vec2(9.16, 0.0), vec2(9.16, 5.5)));
  d = min(d, segDist(p, vec2(-9.16, 5.5), vec2(9.16, 5.5)));
  float arc = abs(length(p - vec2(0.0, 11.0)) - 9.15);
  if (p.y > 16.5) d = min(d, arc);
  // corner arcs
  d = min(d, max(abs(length(p - vec2(-34.0, 0.0)) - 1.0), -min(p.y, 34.0 + p.x) ));
  d = min(d, max(abs(length(p - vec2(34.0, 0.0)) - 1.0), -min(p.y, 34.0 - p.x) ));
  return d;
}
float pitchLineMask(vec3 w) {
  vec2 p = vec2(w.x, w.z);
  float d = 1e4;
  if (p.y > -0.5 && p.y < 105.5 && abs(p.x) < 34.5) {
    d = min(d, endMarkings(p));
    d = min(d, endMarkings(vec2(p.x, 105.0 - p.y)));
    d = min(d, abs(abs(p.x) - 34.0) + max(0.0, max(-p.y, p.y - 105.0)));
    d = min(d, abs(p.y - 52.5) + max(0.0, abs(p.x) - 34.0));
    d = min(d, abs(length(p - vec2(0.0, 52.5)) - 9.15));
  }
  float hw = 0.06;
  float spot = length(p - vec2(0.0, 11.0)) - 0.11;
  float spot2 = length(p - vec2(0.0, 94.0)) - 0.11;
  float cs = length(p - vec2(0.0, 52.5)) - 0.15;
  float aa = max(fwidth(d), 0.002) * 0.8;
  float m = 1.0 - smoothstep(hw - aa, hw + aa, d);
  float s = min(min(spot, spot2), cs);
  m = max(m, 1.0 - smoothstep(-aa, aa, s));
  return m;
}
vec3 turfColor(vec3 w, out float lineM) {
  vec2 p = w.xz;
  // Mow stripes: 5.5 m bands parallel to the goal line, slightly sheared highlights.
  float band = mod(floor((p.y + 0.0) / 5.5), 2.0);
  float edge = abs(fract(p.y / 5.5) - 0.5);
  vec3 base = mix(uGrassA, uGrassB, band);
  base = mix(base, (uGrassA + uGrassB) * 0.5, smoothstep(0.5, 0.47, edge) * 0.0);
  vec4 nFine = texture2D(uGrassNoise, p / 0.45);
  vec4 nMid = texture2D(uGrassNoise, p / 3.7 + 0.13);
  vec4 nMac = texture2D(uGrassNoise, p / 31.0 + 0.71);
  float v = (nFine.r - 0.5) * 0.18 + (nMid.g - 0.5) * 0.22 + (nMac.b - 0.5) * 0.28;
  vec3 col = base * (1.0 + v);
  // Hue drift towards yellow/blue greens
  col = mix(col, col * vec3(1.08, 1.02, 0.82), clamp(nMac.g - 0.45, 0.0, 1.0) * 0.6);
  // Wear: penalty spot, six-yard box front, keeper's line.
  float wearSpot = exp(-pow(length(p - vec2(0.0, 11.3)) / 0.9, 2.0));
  float wearRun = exp(-pow(length((p - vec2(-1.2, 13.0)) * vec2(1.0, 0.6)) / 1.4, 2.0)) * 0.6;
  float wearKeeper = exp(-pow(p.y / 0.9, 2.0)) * exp(-pow(p.x / 2.6, 2.0));
  float wear = clamp((wearSpot + wearRun + wearKeeper) * uWear * (0.6 + 0.8 * nMid.r), 0.0, 1.0);
  col = mix(col, vec3(0.30, 0.27, 0.17), wear * 0.55);
  lineM = pitchLineMask(w);
  col = mix(col, vec3(0.92, 0.93, 0.9) * (0.92 + 0.08 * nFine.r), lineM * 0.95);
  return col;
}
`;function lf(e,t,n){e.onBeforeCompile=e=>{Object.assign(e.uniforms,t),e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
varying vec3 vTurfWorld;
`+(n?`varying float vLayer;
uniform float uShellH;
`:``)).replace(`#include <worldpos_vertex>`,`#include <worldpos_vertex>
        vec4 tw = vec4(transformed, 1.0);
        #ifdef USE_INSTANCING
          tw = instanceMatrix * tw;
        #endif
        tw = modelMatrix * tw;
        vTurfWorld = tw.xyz;
        ${n?`vLayer = clamp(tw.y / uShellH, 0.0, 1.0);`:``}`),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
`+cf+(n?`varying float vLayer;
uniform float uTime;
uniform vec3 uBall;
`:``)).replace(`#include <color_fragment>`,`#include <color_fragment>
        float lineM;
        vec3 turf = turfColor(vTurfWorld, lineM);
        diffuseColor.rgb = turf;
        ${n?`
        // Shell grass: each layer keeps only blades taller than its height.
        vec2 wp = vTurfWorld.xz;
        vec2 sway = vec2(sin(uTime * 1.3 + wp.y * 0.7), cos(uTime * 1.1 + wp.x * 0.5)) * 0.004 * vLayer * vLayer;
        vec4 bl = texture2D(uGrassNoise, (wp + sway) / 0.09);
        vec4 cl = texture2D(uGrassNoise, wp / 1.7);
        float height = bl.a * (0.75 + 0.5 * cl.g);
        // Blades are pressed down under the ball.
        float dBall = length(wp - uBall.xz);
        height *= mix(0.25, 1.0, smoothstep(0.06, 0.16, dBall + max(0.0, uBall.y - 0.12) * 3.0));
        if (height < vLayer) discard;
        diffuseColor.rgb *= mix(0.55, 1.12, vLayer);
        diffuseColor.rgb = mix(diffuseColor.rgb, diffuseColor.rgb * vec3(1.06, 1.08, 0.86), vLayer * 0.5);
        `:`
        diffuseColor.rgb *= 0.86;
        `}`)}}var uf=class{group=new Dn;shells=null;uniforms={uGrassNoise:{value:Xd()},uGrassA:{value:new K(3041834)},uGrassB:{value:new K(4029491)},uWear:{value:1},uShellH:{value:.032},uTime:{value:0},uBall:{value:new W(0,.11,11)}};constructor(e){let t=Zd(),n=new Ki({color:16777215,roughness:.93,metalness:0,normalMap:t,normalScale:new U(.55,.55)});t.repeat.set(1,1),lf(n,this.uniforms,!1);let r=new Mi(220,280,1,1),i=r.attributes.uv;for(let e=0;e<i.count;e++)i.setXY(e,i.getX(e)*220/.6,i.getY(e)*280/.6);let a=new q(r,n);if(a.rotation.x=-Math.PI/2,a.position.set(0,0,52.5),a.receiveShadow=!0,a.name=`turf`,this.group.add(a),e.shells>0){let t=new Mi(44,40,1,1);t.rotateX(-Math.PI/2),t.translate(0,0,14);let n=new Ki({color:16777215,roughness:.9,metalness:0,side:2});lf(n,this.uniforms,!0);let r=e.shells,i=new di(t,n,r),a=new Qt;for(let e=0;e<r;e++)a.makeTranslation(0,(e+1)/r*this.uniforms.uShellH.value,0),i.setMatrixAt(e,a);i.receiveShadow=!0,i.castShadow=!1,i.frustumCulled=!1,i.renderOrder=1,this.shells=i,this.group.add(i)}}update(e,t){this.uniforms.uTime.value=e,this.uniforms.uBall.value.set(t.x,t.y,t.z)}setPalette(e,t){this.uniforms.uGrassA.value.set(e),this.uniforms.uGrassB.value.set(t)}};function df(e,t,n,r,i){let a=[];e-r,-(e-r);let o=[{c:new U(e-r,t+r),a0:-Math.PI/2,a1:0},{c:new U(e-r,n-r),a0:0,a1:Math.PI/2},{c:new U(-(e-r),n-r),a0:Math.PI/2,a1:Math.PI},{c:new U(-(e-r),t+r),a0:Math.PI,a1:3*Math.PI/2}],s=(e,t,n)=>{let r=e.distanceTo(t),o=Math.max(1,Math.round(r/i));for(let r=0;r<o;r++)a.push({p:e.clone().lerp(t,r/o),n:n.clone()})},c=(e,t,n)=>{let o=Math.max(4,Math.round(r*(n-t)/(i*.6)));for(let i=0;i<o;i++){let s=t+(n-t)*i/o,c=new U(Math.cos(s),Math.sin(s));a.push({p:e.clone().addScaledVector(c,r),n:c})}};return s(new U(-(e-r),t),new U(e-r,t),new U(0,-1)),c(o[0].c,o[0].a0,o[0].a1),s(new U(e,t+r),new U(e,n-r),new U(1,0)),c(o[1].c,o[1].a0,o[1].a1),s(new U(e-r,n),new U(-(e-r),n),new U(0,1)),c(o[2].c,o[2].a0,o[2].a1),s(new U(-e,n-r),new U(-e,t+r),new U(-1,0)),c(o[3].c,o[3].a0,o[3].a1),a}var ff=class{mesh;material;constructor(e,t){let n=new Pa,r=new Mi(.56,1);r.translate(0,.5,0),n.index=r.index,n.attributes.position=r.attributes.position,n.attributes.uv=r.attributes.uv;let i=Math.min(e.length,t.count),a=e.length/i,o=new Float32Array(i*3),s=new Float32Array(i),c=new Float32Array(i*3),l=new Float32Array(i*3),u=new Float32Array(i*3),d=new Float32Array(i*4),f=[`#f1c9a5`,`#d9a77c`,`#b57e55`,`#8a5a3b`,`#5e3b26`,`#e8b896`].map(e=>new K(e)),p=[`#1b1410`,`#3a2618`,`#6b4a2b`,`#c9a35f`,`#222`,`#8a8a8a`].map(e=>new K(e)),m=t.homeColors.map(e=>new K(e)),h=t.awayColors.map(e=>new K(e)),g=[`#2b2f38`,`#f2f2f2`,`#1e3a5c`,`#5a5f66`,`#7d2b2b`].map(e=>new K(e)),_=Wd(7);for(let t=0;t<i;t++){let n=e[Math.floor(t*a)];o[t*3]=n.pos.x+(_()-.5)*.12,o[t*3+1]=n.pos.y,o[t*3+2]=n.pos.z+(_()-.5)*.12,s[t]=n.yaw;let r=_()<.82?n.home?m:h:g,i=r[Math.floor(_()*r.length)].clone().multiplyScalar(.75+_()*.3);c.set([i.r,i.g,i.b],t*3);let v=f[Math.floor(_()*f.length)];l.set([v.r,v.g,v.b],t*3);let y=p[Math.floor(_()*p.length)];u.set([y.r,y.g,y.b],t*3),d.set([Math.floor(_()*8),_()*6.283,+!!n.home,.92+_()*.16],t*4)}n.setAttribute(`aOffset`,new ri(o,3)),n.setAttribute(`aYaw`,new ri(s,1)),n.setAttribute(`aShirt`,new ri(c,3)),n.setAttribute(`aSkin`,new ri(l,3)),n.setAttribute(`aHair`,new ri(u,3)),n.setAttribute(`aMisc`,new ri(d,4)),n.instanceCount=i,this.material=new Wi({uniforms:{uAtlas:{value:nf()},uTime:{value:0},uExcite:{value:.3},uHomeJump:{value:0},uAwayJump:{value:0},uLight:{value:new K(1,1,1)},uFlash:{value:0}},vertexShader:`
        attribute vec3 aOffset; attribute float aYaw; attribute vec3 aShirt; attribute vec3 aSkin; attribute vec3 aHair; attribute vec4 aMisc;
        uniform float uTime; uniform float uExcite; uniform float uHomeJump; uniform float uAwayJump;
        varying vec2 vUv; varying vec3 vShirt; varying vec3 vSkin; varying vec3 vHair; varying float vShade; varying float vFlash;
        uniform float uFlash;
        void main() {
          float variant = aMisc.x; float phase = aMisc.y; float isHome = aMisc.z; float scale = aMisc.w;
          float jump = mix(uAwayJump, uHomeJump, isHome);
          float t = uTime;
          float bob = sin(t * (1.6 + 0.5 * fract(phase)) + phase) * 0.015 * (0.4 + uExcite);
          float hop = max(0.0, sin(t * 8.5 + phase * 3.0)) * 0.32 * jump;
          float armsUp = step(0.35, jump) * step(0.0, sin(t * 4.0 + phase));
          armsUp = max(armsUp, step(0.86, uExcite) * step(0.6, sin(t * 2.0 + phase)));
          vec3 p = position * scale;
          float c = cos(aYaw), s = sin(aYaw);
          vec3 w = vec3(p.x * c + p.z * s, p.y, -p.x * s + p.z * c) + aOffset;
          w.y += bob + hop;
          w.x += sin(t * 1.3 + phase) * 0.02 * uExcite;
          vUv = vec2((variant + uv.x) / 8.0, (1.0 - armsUp + uv.y) * 0.5);
          vShirt = aShirt; vSkin = aSkin; vHair = aHair;
          vShade = 0.75 + 0.25 * clamp(aOffset.y / 20.0, 0.0, 1.0);
          vFlash = uFlash * step(0.985, fract(sin(dot(aOffset.xz, vec2(12.9898, 78.233)) + floor(t * 6.0)) * 43758.5453));
          gl_Position = projectionMatrix * viewMatrix * vec4(w, 1.0);
        }`,fragmentShader:`
        uniform sampler2D uAtlas; uniform vec3 uLight;
        varying vec2 vUv; varying vec3 vShirt; varying vec3 vSkin; varying vec3 vHair; varying float vShade; varying float vFlash;
        void main() {
          vec4 t = texture2D(uAtlas, vUv);
          if (t.a < 0.5) discard;
          vec3 col = t.r * vShirt + max(t.g - t.r, 0.0) * vSkin + max(t.b - t.r, 0.0) * vHair;
          col *= uLight * vShade;
          col += vec3(vFlash * 3.0);
          gl_FragColor = vec4(col, 1.0);
          #include <colorspace_fragment>
        }`,side:2}),this.mesh=new q(n,this.material),this.mesh.frustumCulled=!1,this.mesh.name=`crowd`}},pf=[{t:`VOLTARA`,bg:`#0c2340`,fg:`#ffd23f`},{t:`NORTEX ENERGIA`,bg:`#e8edf2`,fg:`#123`},{t:`AURUM BANK`,bg:`#1a1208`,fg:`#e6b54a`},{t:`KAIRO MOTORS`,bg:`#b3001b`,fg:`#fff`},{t:`PIXELA TV`,bg:`#3b1d6e`,fg:`#9cf`},{t:`MARÉ ALTA`,bg:`#005f73`,fg:`#e9d8a6`},{t:`SERRA CAFÉ`,bg:`#2d1e12`,fg:`#f4e4c1`},{t:`TRILHA AIR`,bg:`#f7f7f7`,fg:`#d62828`}],mf=class{group=new Dn;crowd;boardTex;ribbonTex;screens=[];lightMat;flags=[];flagMat;floodlightPositions=[];constructor(t){let n=[],r=df(41,-9.5,114.5,16,2.2),i=[{startOut:0,startH:1.1,rows:24,depth:.82,rise:.43},{startOut:22,startH:13.5,rows:20,depth:.88,rise:.56}],a=[],o=[],s=[],c=new K(`#25324a`),l=new K(`#b8202f`),u=new K(`#d8d8d8`),d=new K(`#6d6f73`),f=(e,t,n,r,i)=>{let c=a.length/3;for(let s of[e,t,n,r])a.push(s.x,s.y,s.z),o.push(i.r,i.g,i.b);s.push(c,c+1,c+2,c,c+2,c+3)},p=(e,t,n)=>{let i=r[(e+r.length)%r.length];return new W(i.p.x+i.n.x*t,n,i.p.y+i.n.y*t)};Wd(3);for(let e=0;e<i.length;e++){let t=i[e];for(let i=0;i<r.length;i++){let a=i+1;f(p(i,t.startOut,0),p(a,t.startOut,0),p(a,t.startOut,t.startH),p(i,t.startOut,t.startH),d);for(let o=0;o<t.rows;o++){let s=t.startOut+o*t.depth,m=s+t.depth,h=t.startH+o*t.rise,g=h+t.rise,_=r[i].n.y<-.5||r[i].n.x!==0&&r[i].p.y<52,v=i%9==0,y=v?d:(o+e)%7==0?u:_?l:c;if(f(p(i,s,h),p(a,s,h),p(a,m,h),p(i,m,h),y),f(p(i,m,h),p(a,m,h),p(a,m,g),p(i,m,g),d),!v){let c=r[i],l=r[(i+1)%r.length],u=c.p.distanceTo(l.p),d=Math.max(1,Math.floor(u/.56));for(let r=0;r<d;r++){if(Ud(i*97+r,o*13+e*101,5)>.94)continue;let u=(r+.5)/d,f=p(i,s+t.depth*.45,h),m=p(a,s+t.depth*.45,h),g=f.lerp(m,u),v=new U().copy(c.n).lerp(l.n,u);n.push({pos:g,yaw:Math.atan2(-v.x,-v.y),home:_})}}}let o=t.startOut+t.rows*t.depth,s=t.startH+t.rows*t.rise;f(p(i,o,s),p(a,o,s),p(a,o,s+3),p(i,o,s+3),d)}}let m=new Ar;m.setAttribute(`position`,new vr(a,3)),m.setAttribute(`color`,new vr(o,3)),m.setIndex(s),m.computeVertexNormals();let h=new q(m,new Ki({vertexColors:!0,roughness:.85,metalness:.05,side:2}));h.receiveShadow=!0,h.name=`stands`,this.group.add(h);let g=[],_=[];for(let e=0;e<=r.length;e++){let t=p(e,-2,33),n=p(e,45.6,30);if(g.push(t.x,t.y,t.z,n.x,n.y,n.z),e<r.length){let t=e*2;_.push(t,t+2,t+1,t+1,t+2,t+3)}}let v=new Ar;v.setAttribute(`position`,new vr(g,3)),v.setIndex(_),v.computeVertexNormals();let y=new q(v,new Ki({color:10134445,roughness:.6,metalness:.4,side:2}));y.name=`roof`,this.group.add(y),this.lightMat=new Hr({color:new K(6,6,5.6)});let b=new Mi(1.6,.7);for(let e=0;e<r.length;e+=2){let t=p(e,-.8,32.4),n=new q(b,this.lightMat);n.position.copy(t),n.lookAt(0,0,52.5),this.group.add(n),e%24==0&&this.floodlightPositions.push(t.clone())}let{canvas:x,ctx:S,tex:C}=rf(4096,128);pf.forEach((e,t)=>{let n=4096/pf.length;S.fillStyle=e.bg,S.fillRect(t*n,0,n,128),S.fillStyle=e.fg,S.font=`800 78px "Big Shoulders Display", Impact, sans-serif`,S.textAlign=`center`,S.textBaseline=`middle`,S.fillText(e.t,t*n+n/2,68)}),C.wrapS=e,C.needsUpdate=!0,this.boardTex=C;let w=new Ki({map:C,emissiveMap:C,emissive:new K(1,1,1),emissiveIntensity:1.25,roughness:.4}),T=(e,t,n,r,i)=>{let a=Math.hypot(n-e,r-t),o=new Mi(a,.9),s=o.attributes.uv;for(let e=0;e<s.count;e++)s.setX(e,s.getX(e)*i);let c=new q(o,w);c.position.set((e+n)/2,.45,(t+r)/2),c.rotation.y=Math.atan2(-(r-t),n-e),c.castShadow=!0,c.receiveShadow=!0,this.group.add(c);let l=new q(new Mi(a,.9),new Ki({color:1382429,roughness:.7}));l.position.copy(c.position),l.rotation.y=c.rotation.y+Math.PI,l.position.addScaledVector(new W(Math.sin(c.rotation.y),0,Math.cos(c.rotation.y)),-.05),this.group.add(l)};T(-30,-5.2,30,-5.2,1.6),T(-37,2,-37,50,1.3),T(37,50,37,2,1.3);let{ctx:E,tex:D}=rf(2048,64);for(let e=0;e<8;e++)E.fillStyle=e%2?`#0a0f1a`:`#111a2b`,E.fillRect(e*256,0,256,64),E.fillStyle=e%2?`#f2b636`:`#e8edf2`,E.font=`700 40px "Big Shoulders Display", Impact, sans-serif`,E.textAlign=`center`,E.textBaseline=`middle`,E.fillText(e%2?`PENALTY KINGS`:pf[e].t,e*256+128,34);D.wrapS=e,D.needsUpdate=!0,this.ribbonTex=D;let O=[],k=[],A=[],ee=0,j=i[1],te=j.startOut-.4;for(let e=0;e<=r.length;e++){let t=p(e,te,j.startH-1.3),n=p(e,te,j.startH-.1);if(e>0&&(ee+=r[e%r.length].p.distanceTo(r[e-1].p)/18),O.push(t.x,t.y,t.z,n.x,n.y,n.z),k.push(ee,0,ee,1),e<r.length){let t=e*2;A.push(t,t+2,t+1,t+1,t+2,t+3)}}let M=new Ar;M.setAttribute(`position`,new vr(O,3)),M.setAttribute(`uv`,new vr(k,2)),M.setIndex(A);let ne=new q(M,new Hr({map:D,side:2,color:new K(1.6,1.6,1.6)}));this.group.add(ne);for(let e of[-1,1]){let{canvas:t,ctx:n,tex:r}=rf(1024,512),i=new q(new Mi(16,8),new Hr({map:r,color:new K(1.5,1.5,1.5)}));i.position.set(e*30,25,-22),i.lookAt(e*6,4,20),this.group.add(i);let a=new q(new Mi(16.8,8.8),new Ki({color:1118481,roughness:.5}));a.position.copy(i.position).addScaledVector(new W(0,0,-1).applyQuaternion(i.quaternion),.05),a.quaternion.copy(i.quaternion),this.group.add(a),this.screens.push({canvas:t,ctx:n,tex:r})}let{ctx:N,tex:re}=rf(2048,256),P=N.createLinearGradient(0,0,2048,0);P.addColorStop(0,t.homeColors[0]),P.addColorStop(.5,t.homeColors[1]??t.homeColors[0]),P.addColorStop(1,t.homeColors[0]),N.fillStyle=P,N.fillRect(0,0,2048,256),N.fillStyle=`#fff`,N.font=`800 150px "Big Shoulders Display", Impact, sans-serif`,N.textAlign=`center`,N.textBaseline=`middle`,N.fillText(`NINGUÉM PARA OS REIS`,1024,135),re.needsUpdate=!0;let ie=new q(new Mi(36,4.5),new Ki({map:re,roughness:.9,side:2}));ie.position.set(0,6.65,-17.7),ie.rotation.x=-1.09,this.group.add(ie),this.flagMat=new Wi({uniforms:{uTime:{value:0},uMap:{value:null}},vertexShader:`
        uniform float uTime; varying vec2 vUv; varying float vShade;
        void main() {
          vUv = uv;
          vec3 p = position;
          float w = sin(uv.x * 6.0 - uTime * 4.0) * 0.18 * uv.x + sin(uv.x * 13.0 - uTime * 6.3) * 0.05 * uv.x;
          p.z += w;
          vShade = 0.85 + 0.6 * cos(uv.x * 6.0 - uTime * 4.0) * 0.2;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }`,fragmentShader:`
        uniform sampler2D uMap; varying vec2 vUv; varying float vShade;
        void main() { vec4 c = texture2D(uMap, vUv); gl_FragColor = vec4(c.rgb * vShade, 1.0);
          #include <colorspace_fragment>
        }`,side:2});let{ctx:ae,tex:oe}=rf(256,128);ae.fillStyle=t.homeColors[0],ae.fillRect(0,0,256,128),ae.fillStyle=t.homeColors[1]??`#fff`,ae.fillRect(0,42,256,44),oe.needsUpdate=!0,this.flagMat.uniforms.uMap.value=oe;let se=new Mi(3,1.8,16,4);se.translate(1.5,0,0);let ce=Wd(11);for(let e=0;e<18;e++){let e=Math.floor(ce()*r.length),t=4+Math.floor(ce()*16),n=r[e],i=p(e,t*.82,1.1+t*.43+2.2),a=new q(se,this.flagMat);a.position.copy(i),a.rotation.y=Math.atan2(-n.n.x,-n.n.y)+Math.PI/2,this.flags.push(a),this.group.add(a)}let F=new q(new Mi(300,320),new Ki({color:2767398,roughness:1}));F.rotation.x=-Math.PI/2,F.position.set(0,-.02,52.5),F.receiveShadow=!0,this.group.add(F),this.crowd=new ff(n,{count:t.crowd,homeColors:t.homeColors,awayColors:t.awayColors}),this.group.add(this.crowd.mesh),t.detail}update(e,t){this.boardTex.offset.x=e*.035%1,this.ribbonTex.offset.x=-(e*.02)%1,this.crowd.material.uniforms.uTime.value=e,this.flagMat.uniforms.uTime.value=e}drawScreens(e){for(let t of this.screens){let n=t.ctx,r=t.canvas.width,i=t.canvas.height,a=n.createLinearGradient(0,0,0,i);a.addColorStop(0,`#0b1424`),a.addColorStop(1,`#04070d`),n.fillStyle=a,n.fillRect(0,0,r,i),n.fillStyle=`#f2b636`,n.fillRect(0,i-16,r,16),n.textAlign=`center`,n.fillStyle=`#fff`,n.font=`800 150px "Big Shoulders Display", Impact, sans-serif`,n.fillText(e.title,r/2,i*.42),n.font=`600 64px "Big Shoulders Display", Impact, sans-serif`,n.fillStyle=`#c9d4e3`,n.fillText(e.sub,r/2,i*.66),e.score&&(n.font=`800 96px "Big Shoulders Display", Impact, sans-serif`,n.fillStyle=`#f2b636`,n.fillText(e.score,r/2,i*.9)),t.tex.needsUpdate=!0}}setCrowdLight(e){this.crowd.material.uniforms.uLight.value.copy(e)}};function hf(e=`rgba(0,0,0,0.85)`,t=`rgba(0,0,0,0)`){let n=document.createElement(`canvas`);n.width=n.height=128;let r=n.getContext(`2d`),i=r.createRadialGradient(64,64,0,64,64,64);return i.addColorStop(0,e),i.addColorStop(1,t),r.fillStyle=i,r.fillRect(0,0,128,128),new Ei(n)}var gf=class{mesh;constructor(e,t=.75){let n=new Hr({map:hf(`rgba(0,0,0,${t})`),transparent:!0,depthWrite:!1,color:16777215});this.mesh=new q(new Mi(e,e),n),this.mesh.rotation.x=-Math.PI/2,this.mesh.renderOrder=2}update(e,t,n,r=.5){let i=Math.max(0,1-n/r);this.mesh.position.set(e,.036,t),this.mesh.material.opacity=i,this.mesh.scale.setScalar(1+n*1.5),this.mesh.visible=i>.01}},_f=class{points;pos;vel;life;n=220;next=0;constructor(){this.pos=new Float32Array(this.n*3).fill(-100),this.vel=new Float32Array(this.n*3),this.life=new Float32Array(this.n);let e=new Ar;e.setAttribute(`position`,new hr(this.pos,3).setUsage(Ue));let t=new Float32Array(this.n*3),n=Wd(5);for(let e=0;e<this.n;e++){let r=n()<.3?new K(4864806):new K(4160046).multiplyScalar(.7+n()*.5);t.set([r.r,r.g,r.b],e*3)}e.setAttribute(`color`,new hr(t,3)),this.points=new Ci(e,new vi({size:.025,vertexColors:!0,sizeAttenuation:!0})),this.points.frustumCulled=!1}burst(e,t,n,r){for(let i=0;i<n;i++){let n=this.next;this.next=(this.next+1)%this.n;let a=i*2.399963,o=.4+i*37%11/11;this.pos.set([e.x,e.y+.02,e.z],n*3),this.vel.set([t.x*r*o+Math.cos(a)*.9,1.2+o*1.6,t.z*r*o+Math.sin(a)*.9],n*3),this.life[n]=.9+o*.6}}update(e){for(let t=0;t<this.n;t++){if(this.life[t]<=0)continue;this.life[t]-=e;let n=t*3;this.vel[n+1]-=9.81*e,this.vel[n]*=.985,this.vel[n+2]*=.985,this.pos[n]+=this.vel[n]*e,this.pos[n+1]+=this.vel[n+1]*e,this.pos[n+2]+=this.vel[n+2]*e,this.pos[n+1]<.01&&(this.pos[n+1]=.01,this.vel[n]=this.vel[n+1]=this.vel[n+2]=0),this.life[t]<=0&&(this.pos[n+1]=-100)}this.points.geometry.attributes.position.needsUpdate=!0}},vf=class{mesh;p;v;rot;n=700;active=0;m=new Qt;q=new kt;constructor(){let e=new Ki({side:2,roughness:.4,metalness:.3});this.mesh=new di(new Mi(.06,.035),e,this.n),this.p=new Float32Array(this.n*3),this.v=new Float32Array(this.n*3),this.rot=new Float32Array(this.n*3);let t=Wd(9),n=[`#f2b636`,`#ffffff`,`#d62839`,`#2a9d8f`,`#457b9d`];for(let e=0;e<this.n;e++)this.mesh.setColorAt(e,new K(n[Math.floor(t()*n.length)]));this.mesh.visible=!1,this.mesh.frustumCulled=!1}fire(e){let t=Wd(13);for(let n=0;n<this.n;n++)this.p.set([e.x+(t()-.5)*16,14+t()*10,e.z+(t()-.5)*16],n*3),this.v.set([(t()-.5)*1.2,-.6-t()*.8,(t()-.5)*1.2],n*3),this.rot.set([t()*6,t()*6,t()*6],n*3);this.active=9,this.mesh.visible=!0}update(e,t){if(this.active<=0)return;this.active-=e;let n=new En;for(let r=0;r<this.n;r++){let i=r*3;this.p[i]+=(this.v[i]+Math.sin(t*2+r)*.4)*e,this.p[i+1]=Math.max(.01,this.p[i+1]+this.v[i+1]*e),this.p[i+2]+=(this.v[i+2]+Math.cos(t*1.7+r)*.4)*e,n.position.set(this.p[i],this.p[i+1],this.p[i+2]);let a=+(this.p[i+1]>.02);n.rotation.set(this.rot[i]+t*3*a,this.rot[i+1]+t*2*a,this.rot[i+2]),n.updateMatrix(),this.mesh.setMatrixAt(r,n.matrix)}this.mesh.instanceMatrix.needsUpdate=!0,this.active<=0&&(this.mesh.visible=!1),this.m,this.q}},yf=class{mesh;pts=[];max=90;geo;posArr;alphaArr;enabled=!0;constructor(e=new K(1.6,1.25,.4)){this.geo=new Ar,this.posArr=new Float32Array(this.max*2*3),this.alphaArr=new Float32Array(this.max*2),this.geo.setAttribute(`position`,new hr(this.posArr,3).setUsage(Ue)),this.geo.setAttribute(`alpha`,new hr(this.alphaArr,1).setUsage(Ue));let t=[];for(let e=0;e<this.max-1;e++){let n=e*2;t.push(n,n+1,n+2,n+1,n+3,n+2)}this.geo.setIndex(t);let n=new Wi({uniforms:{uColor:{value:e}},vertexShader:`attribute float alpha; varying float vA; void main(){ vA = alpha; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,fragmentShader:`uniform vec3 uColor; varying float vA; void main(){ gl_FragColor = vec4(uColor * vA, vA); }`,transparent:!0,depthWrite:!1,blending:2,side:2});this.mesh=new q(this.geo,n),this.mesh.frustumCulled=!1,this.mesh.renderOrder=5}clear(){this.pts.length=0,this.geo.setDrawRange(0,0)}push(e){let t=this.pts[this.pts.length-1];t&&t.distanceToSquared(e)<9e-4||(this.pts.push(e.clone()),this.pts.length>this.max&&this.pts.shift())}setPoints(e){this.pts=e.slice(-this.max).map(e=>e.clone())}update(e){let t=this.pts.length;if(this.mesh.visible=this.enabled&&t>1,t<2)return;let n=new W().setFromMatrixPosition(e.matrixWorld),r=new W;for(let e=0;e<t;e++){let i=this.pts[e],a=this.pts[Math.min(t-1,e+1)],o=this.pts[Math.max(0,e-1)],s=a.clone().sub(o).normalize(),c=n.clone().sub(i).normalize();r.crossVectors(s,c).normalize();let l=e/t*.045;this.posArr.set([i.x+r.x*l,i.y+r.y*l,i.z+r.z*l,i.x-r.x*l,i.y-r.y*l,i.z-r.z*l],e*6);let u=(e/t)**1.6*.8;this.alphaArr[e*2]=this.alphaArr[e*2+1]=u}this.geo.attributes.position.needsUpdate=!0,this.geo.attributes.alpha.needsUpdate=!0,this.geo.setDrawRange(0,(t-1)*6)}},bf=class{group=new Dn;ring;dot;constructor(){let e=new Hr({color:new K(2.2,1.6,.4),transparent:!0,opacity:.9,depthWrite:!1,side:2});this.ring=new q(new Ni(.15,.19,48),e),this.dot=new q(new Ni(0,.035,16),e);let t=e;for(let e=0;e<4;e++){let n=new q(new Mi(.02,.09),t),r=e*Math.PI/2;n.position.set(Math.cos(r)*.24,Math.sin(r)*.24,0),n.rotation.z=r+Math.PI/2,this.group.add(n)}this.group.add(this.ring,this.dot),this.group.renderOrder=10}set(e,t,n,r,i=1){this.group.position.set(e,t,n),this.group.scale.setScalar(i*(1+.06*Math.sin(r*6)))}},xf=class{group=new Dn;hoops=[];mat=new Hr({color:new K(.4,2.2,1.8),transparent:!0,opacity:.85,depthWrite:!1});hitMat=new Hr({color:new K(2.6,2,.5),transparent:!0,opacity:.95,depthWrite:!1});set(e,t){for(let e of this.hoops)this.group.remove(e.mesh);this.hoops=e.map(e=>{let n=new q(new Fi(e.r,.022,10,64),this.mat);return n.position.set(e.x,e.y,t),this.group.add(n),{mesh:n,...e,hit:0}})}flash(e){let t=this.hoops[e];t&&(t.mesh.material=this.hitMat,t.hit=1.2)}update(e,t){for(let n of this.hoops)n.mesh.rotation.z=t*.3,n.hit>0&&(n.hit-=e,n.mesh.scale.setScalar(1+.15*Math.sin(n.hit*20)),n.hit<=0&&(n.mesh.material=this.mat,n.mesh.scale.setScalar(1)))}},Sf=class{mesh;n=40;constructor(){this.mesh=new di(new Pi(.025,8,6),new Hr({color:new K(1.8,1.8,1.8),transparent:!0,opacity:.7}),this.n),this.mesh.frustumCulled=!1,this.mesh.count=0}set(e){let t=new Qt,n=Math.min(this.n,e.length),r=e.length/Math.max(1,n);for(let i=0;i<n;i++){let n=e[Math.floor(i*r)];t.makeTranslation(n.x,n.y,n.z),this.mesh.setMatrixAt(i,t)}this.mesh.count=n,this.mesh.instanceMatrix.needsUpdate=!0}},Cf={low:{pixelRatio:1,shadowMap:1024,shells:0,crowd:9e3,msaa:0,bloom:!1,gtao:!1,dof:!1,netSpacing:.2,nightShadows:1,ballGhosts:0},high:{pixelRatio:1.5,shadowMap:2048,shells:10,crowd:26e3,msaa:4,bloom:!0,gtao:!1,dof:!0,netSpacing:.12,nightShadows:2,ballGhosts:5},ultra:{pixelRatio:2,shadowMap:4096,shells:20,crowd:48e3,msaa:4,bloom:!0,gtao:!0,dof:!0,netSpacing:.1,nightShadows:3,ballGhosts:8}},wf={uniforms:{tDiffuse:{value:null},uTime:{value:0},uVignette:{value:.32},uTension:{value:0},uPulse:{value:0},uSat:{value:1.06},uGrain:{value:.025},uFlash:{value:0},uResolution:{value:new U(1,1)}},vertexShader:`varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,fragmentShader:`
    uniform sampler2D tDiffuse; uniform float uTime; uniform float uVignette; uniform float uTension; uniform float uPulse;
    uniform float uSat; uniform float uGrain; uniform float uFlash; uniform vec2 uResolution;
    varying vec2 vUv;
    float rand(vec2 co){ return fract(sin(dot(co, vec2(12.9898,78.233))) * 43758.5453); }
    void main() {
      vec2 c = vUv - 0.5;
      float r2 = dot(c, c);
      float ca = (0.0015 + 0.004 * uTension) * r2 * 4.0;
      vec3 col;
      col.r = texture2D(tDiffuse, vUv + c * ca).r;
      col.g = texture2D(tDiffuse, vUv).g;
      col.b = texture2D(tDiffuse, vUv - c * ca).b;
      float l = dot(col, vec3(0.2126, 0.7152, 0.0722));
      col = mix(vec3(l), col, uSat - 0.35 * uTension);
      float vig = 1.0 - (uVignette + 0.35 * uTension + 0.12 * uPulse) * smoothstep(0.1, 0.75, r2 * 2.0);
      col *= vig;
      col += (rand(vUv * uResolution + uTime) - 0.5) * uGrain * (0.5 + l);
      col += vec3(uFlash);
      gl_FragColor = vec4(col, 1.0);
    }`};function Tf(){let e=new Wi({side:1,depthWrite:!1,uniforms:{},vertexShader:`varying vec3 vDir; void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,fragmentShader:`
      varying vec3 vDir;
      float h(vec3 p){ return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453); }
      void main(){
        float y = max(vDir.y, 0.0);
        vec3 top = vec3(0.006, 0.01, 0.025);
        vec3 hor = vec3(0.07, 0.065, 0.075);
        vec3 col = mix(hor, top, pow(y, 0.45));
        vec3 q = floor(vDir * 420.0);
        float s = step(0.9975, h(q)) * smoothstep(0.15, 0.5, y);
        col += vec3(s) * 0.9;
        gl_FragColor = vec4(col, 1.0);
      }`});return new q(new Pi(3e3,32,16),e)}var Ef=class{container;quality;timeOfDay;renderer;scene=new In;camera;composer;grade;bloom=null;bokeh=null;gtao=null;spec;pitch;goal;stadium;ball;ballGhosts=[];ballShadow;footShadows=[];aim=new bf;trail=new yf;spray=new _f;confetti=new vf;hoops=new xf;guide=new Sf;lights=[];hemi;sky=null;characters=new Dn;dofEnabled=!1;dofFocus=10;pmrem;time=0;flash=0;constructor(e,t,n,r){this.container=e,this.quality=t,this.timeOfDay=n;let i=this.spec=Cf[t];this.renderer=new hl({antialias:!1,powerPreference:`high-performance`,stencil:!1}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,i.pixelRatio)),this.renderer.setSize(e.clientWidth,e.clientHeight),this.renderer.outputColorSpace=Re,this.renderer.toneMapping=4,this.renderer.toneMappingExposure=1,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=1,e.appendChild(this.renderer.domElement),this.camera=new Aa(42,e.clientWidth/e.clientHeight,.05,4e3),this.camera.position.set(0,1.7,15.5),this.camera.lookAt(0,1.2,0),this.pmrem=new Eo(this.renderer),this.pitch=new uf({shells:i.shells}),this.scene.add(this.pitch.group),this.goal=new sf(i.netSpacing),this.scene.add(this.goal.group),this.stadium=new mf({crowd:i.crowd,homeColors:r.home,awayColors:r.away,detail:1}),this.scene.add(this.stadium.group),this.scene.add(this.characters);let a=$d(),o=new qi({map:a.map,bumpMap:a.bump,bumpScale:.6,roughness:.38,metalness:0,clearcoat:.7,clearcoatRoughness:.28});this.ball=new q(new Pi(Z.radius,64,48),o),this.ball.castShadow=!0,this.ball.receiveShadow=!0,this.scene.add(this.ball);for(let e=0;e<i.ballGhosts;e++){let e=o.clone();e.transparent=!0,e.depthWrite=!1,e.opacity=0;let t=new q(this.ball.geometry,e);t.visible=!1,this.ballGhosts.push(t),this.scene.add(t)}this.ballShadow=new gf(.42,.8),this.scene.add(this.ballShadow.mesh);for(let e=0;e<4;e++){let e=new gf(.36,.55);this.footShadows.push(e),this.scene.add(e.mesh)}this.scene.add(this.aim.group,this.trail.mesh,this.spray.points,this.confetti.mesh,this.hoops.group,this.guide.mesh),this.hemi=new va(12572415,2771490,.8),this.scene.add(this.hemi),this.setupAtmosphere(n);let s=this.renderer.getDrawingBufferSize(new U),c=new Yt(s.x,s.y,{type:g,samples:i.msaa});this.composer=new Sd(this.renderer,c),this.composer.addPass(new Cd(this.scene,this.camera)),i.gtao&&(this.gtao=new zd(this.scene,this.camera,s.x/2,s.y/2),this.gtao.blendIntensity=.85,this.gtao.updateGtaoMaterial({radius:.35,distanceExponent:1.4,thickness:1.2,scale:1}),this.composer.addPass(this.gtao)),i.dof&&(this.bokeh=new kd(this.scene,this.camera,{focus:10,aperture:.0025,maxblur:.008}),this.bokeh.enabled=!1,this.composer.addPass(this.bokeh)),i.bloom&&(this.bloom=new Td(new U(s.x/2,s.y/2),.32,.55,.95),this.composer.addPass(this.bloom)),this.grade=new yd(wf),this.composer.addPass(this.grade),this.composer.addPass(new Dd),i.msaa||this.composer.addPass(new Vd),this.resize(),window.addEventListener(`resize`,this.onResize)}onResize=()=>this.resize();resize(){let e=this.container.clientWidth,t=this.container.clientHeight;this.renderer.setSize(e,t),this.camera.aspect=e/Math.max(1,t),this.camera.updateProjectionMatrix(),this.composer.setSize(e,t);let n=this.renderer.getPixelRatio();this.grade.uniforms.uResolution.value.set(e*n,t*n)}setupAtmosphere(e){this.timeOfDay=e;for(let e of this.lights)this.scene.remove(e),this.scene.remove(e.target),e.dispose();this.lights=[],this.sky&&this.scene.remove(this.sky);let t=this.spec,n=(e,t,n,r,i)=>{let a=new Na(t,n);if(a.position.copy(e),a.target.position.set(0,0,6),r){a.castShadow=!0,a.shadow.mapSize.set(i,i);let e=a.shadow.camera;e.left=-15,e.right=15,e.top=16,e.bottom=-12,e.near=1,e.far=220,a.shadow.bias=-25e-5,a.shadow.normalBias=.025,a.shadow.radius=2.5}return this.scene.add(a,a.target),this.lights.push(a),a},r;if(e===`night`){this.sky=Tf(),this.scene.add(this.sky),this.scene.fog=new Fn(329484,.0035),this.hemi.color.set(9413316),this.hemi.groundColor.set(1845784),this.hemi.intensity=.55,[new W(-55,48,-30),new W(55,48,-30),new W(-50,50,60),new W(50,50,60)].forEach((e,r)=>n(e,16052735,r<2?1.9:1.3,r<t.nightShadows,t.shadowMap)),this.stadium.lightMat.color.setRGB(9,9,8.4),this.stadium.setCrowdLight(new K(.75,.75,.8)),r=new In;let e=Tf();r.add(e);let i=new q(new Pi(60,32,8,0,Math.PI*2,Math.PI*.18,.08),new Hr({color:new K(14,14,13),side:1}));r.add(i),this.renderer.toneMappingExposure=1.05}else{let i=new Hd;i.scale.setScalar(3500);let a=i.material.uniforms,o=e===`sunset`;a.turbidity.value=o?6:2.2,a.rayleigh.value=o?2.4:1.1,a.mieCoefficient.value=o?.009:.004,a.mieDirectionalG.value=.82,a.cloudCoverage&&(a.cloudCoverage.value=o?.35:.3);let s=o?5.5:48,c=o?-128:-140,l=new W().setFromSphericalCoords(1,Ot.degToRad(90-s),Ot.degToRad(c));a.sunPosition.value.copy(l),this.sky=i,this.scene.add(i),this.scene.fog=new Fn(o?9071192:12110044,o?.0016:.0011),n(l.clone().multiplyScalar(120),o?16757370:16774368,o?2.4:3.3,!0,t.shadowMap).target.position.set(0,0,6),o&&n(new W(40,45,-20),15265535,.9,t.nightShadows>1,t.shadowMap/2),this.hemi.color.set(o?16763296:12375295),this.hemi.groundColor.set(2902562),this.hemi.intensity=o?.6:.9,this.stadium.lightMat.color.setRGB(o?7:2.2,o?7:2.2,o?6.6:2.1),this.stadium.setCrowdLight(o?new K(.85,.72,.62):new K(.95,.95,.95)),r=new In;let u=new Hd;u.scale.setScalar(1e3),Object.assign(u.material.uniforms.sunPosition.value,l),u.material.uniforms.turbidity.value=a.turbidity.value,u.material.uniforms.rayleigh.value=a.rayleigh.value,r.add(u),this.renderer.toneMappingExposure=o?.95:.82}let i=this.pmrem.fromScene(r,.02).texture;this.scene.environment=i,this.scene.environmentIntensity=e===`night`?.55:.75,this.pitch.setPalette(e===`night`?2910764:3107368,e===`night`?3898678:4094768)}updateBall(e,t,n,r=!0){this.ball.position.copy(e),this.ball.quaternion.set(t.x,t.y,t.z,t.w),this.ball.visible=r,this.ballShadow.update(e.x,e.z,e.y-Z.radius,.6);let i=n.length(),a=this.ballGhosts.length,o=r&&i>7;for(let t=0;t<a;t++){let r=this.ballGhosts[t];if(r.visible=o,!o)continue;let i=(t+1)/(a+1);r.position.copy(e).addScaledVector(n,-i/120),r.quaternion.copy(this.ball.quaternion),r.material.opacity=.55/a*(1-i*.6)}}flashScreen(e){this.flash=Math.max(this.flash,e)}render(e,t,n){this.time+=e,this.stadium.update(this.time,e),this.pitch.update(this.time,this.ball.position),this.trail.update(this.camera),this.spray.update(e),this.confetti.update(e,this.time),this.hoops.update(e,this.time),this.goal.net.refresh(),this.flash*=Math.exp(-e*6);let r=this.grade.uniforms;if(r.uTime.value=this.time,r.uTension.value=t,r.uPulse.value=n,r.uFlash.value=this.flash,this.bokeh){this.bokeh.enabled=this.dofEnabled;let e=this.bokeh.uniforms;e.focus.value=this.dofFocus,e.aperture.value=.0018,e.maxblur.value=.007}this.composer.render(e)}dispose(){window.removeEventListener(`resize`,this.onResize),this.composer.dispose(),this.renderer.dispose(),this.pmrem.dispose(),this.renderer.domElement.remove()}};function Df(e,t,n={}){let r=n.dir??-1,i=n.t0??0,a=n.t1??1,o=n.radial??20,s=n.rings??14,c=[],[l,u]=t(i),[d,f]=t(a),p=Math.min(l,u)/e,m=Math.min(d,f)/e;if(n.capStart)for(let e=5;e>=1;e--)c.push(-e);for(let e=0;e<=s;e++)c.push(i+(a-i)*e/s);if(n.capEnd)for(let e=1;e<=5;e++)c.push(100+e);let h=[],g=[],_=[];for(let n=0;n<c.length;n++){let s=c[n],l,u=1;if(s<0){let e=-s/5;l=i-p*Math.sin(e*Math.PI/2)*.9,u=Math.cos(e*Math.PI/2)*.98+.02}else if(s>50){let e=(s-100)/5;l=a+m*Math.sin(e*Math.PI/2)*.9,u=Math.cos(e*Math.PI/2)*.98+.02}else l=s;let d=Math.max(i,Math.min(a,l)),[f,_,v]=t(d);for(let t=0;t<=o;t++){let n=t/o*Math.PI*2;h.push(Math.sin(n)*f*u,r*l*e,Math.cos(n)*_*u+v),g.push(t/o,(d-i)/Math.max(1e-6,a-i))}}for(let e=0;e<c.length-1;e++)for(let t=0;t<o;t++){let n=e*(o+1)+t,i=n+o+1;r<0?_.push(n,n+1,i,n+1,i+1,i):_.push(n,i,n+1,n+1,i,i+1)}let v=new Ar;return v.setAttribute(`position`,new vr(h,3)),v.setAttribute(`uv`,new vr(g,2)),v.setIndex(_),v.computeVertexNormals(),v}function Of(e,t,n){let r=e.attributes.uv;for(let e=0;e<r.count;e++)r.setY(e,t+(n-t)*r.getY(e));r.needsUpdate=!0}var kf=(e,t,n)=>Math.exp(-((e-t)*(e-t))/(n*n));function Af(e,t){return new qi({color:new K(e),map:t??null,roughness:.78,metalness:0,sheen:.6,sheenRoughness:.5,sheenColor:new K(e).lerp(new K(`#ffffff`),.4)})}function jf(e){let t=Af(`#ffffff`,ef(e.kit,e.number,e.name)),n=new qi({color:new K(e.skin),roughness:.52,metalness:0,sheen:.25,sheenColor:new K(e.skin).lerp(new K(`#ff9a7a`),.4),sheenRoughness:.6}),r=new qi({map:tf(e.skin,e.hair,e.seed),roughness:.5,sheen:.25,sheenColor:new K(e.skin).lerp(new K(`#ff9a7a`),.4)});return{jersey:t,sleeve:Af(e.kit.primary),shorts:Af(e.kit.shorts),socks:Af(e.kit.socks),skin:n,face:r,hair:new Ki({color:new K(e.hair),roughness:.85}),boots:new qi({color:new K(e.boots),roughness:.28,metalness:.05,clearcoat:.8,clearcoatRoughness:.2}),sole:new Ki({color:1710618,roughness:.6}),gloves:new qi({color:new K(e.gloves??`#e9f542`),roughness:.6,sheen:.3,sheenColor:new K(`#ffffff`)})}}function Mf(e,t,n,r=``){let i=new q(t,n);return i.castShadow=!0,i.receiveShadow=!0,i.name=r,e.add(i),i}function Nf(e,t){let n=e.prop,r=e.bones,i=jf(t),a=e.dims.height/1.83,o=e.dims.build,s=[],c=(e,t,n,i=``)=>s.push(Mf(r[e],t,n,i));c(`hips`,Df(.2*a,e=>[(.155+.02*kf(e,.6,.3))*a*o,(.105+.015*kf(e,.5,.3))*a*o,-.004],{dir:-1,t0:-.45,t1:.75,capEnd:!0,radial:24}),i.shorts);let l=Df(n.spine+.03*a,e=>[(.148+.006*e)*a*o,(.098+.004*e)*a*o,.004],{dir:1,t0:-.35,t1:1.05,radial:24});Of(l,0,.2),c(`spine`,l,i.jersey),c(`chest`,Df(.24*a,e=>[(.152+.04*Math.sin(Math.min(1,e*1.2)*Math.PI*.75)-.06*(Math.max(0,e-.82)/.18)**2)*a*o,(.102+.022*kf(e,.5,.35)-.035*(Math.max(0,e-.85)/.15)**2)*a*o,.008*kf(e,.55,.3)],{dir:1,t0:-.05,t1:1,capEnd:!0,radial:28,rings:18}),i.jersey,`chest`),Of(s[s.length-1].geometry,.2,1);for(let e of[`L`,`R`]){let c=e===`L`?1:-1,l=new q(new Pi(.056*a*o,18,12),(t.keeper,i.sleeve));l.position.set(c*(n.shoulderX-.03*a),n.shoulderY-.035*a,-.005),l.scale.set(1.05,.9,1),l.castShadow=!0,r.chest.add(l),s.push(l)}c(`neck`,Df(.12*a,e=>[(.056-.006*e)*a,(.058-.006*e)*a,.005],{dir:1,t0:-.2,t1:1,radial:16}),i.skin);let u=new q(new Pi(1,32,24),i.face);u.scale.set(.083*a,.112*a,.098*a),u.position.set(0,.085*a,.012*a),u.rotation.y=Math.PI/2,u.castShadow=!0,r.head.add(u),s.push(u);let d=new q(new Pi(1,20,14),i.skin);d.scale.set(.07*a,.06*a,.075*a),d.position.set(0,.035*a,.03*a),d.castShadow=!0,r.head.add(d),s.push(d);let f=new q(new Pi(1,10,8),i.skin);f.scale.set(.014*a,.022*a,.018*a),f.position.set(0,.08*a,.108*a),r.head.add(f);for(let e of[-1,1]){let t=new q(new Pi(1,10,8),i.skin);t.scale.set(.012*a,.03*a,.022*a),t.position.set(e*.084*a,.085*a,0),r.head.add(t)}if(t.hairStyle!==`bald`){let e=t.hairStyle,n=new q(new Pi(1,28,16,0,Math.PI*2,0,e===`long`?Math.PI*.62:Math.PI*.5),i.hair),o=e===`curly`?1.14:e===`buzz`?1.02:1.07;n.scale.set(.088*a*o,.118*a*o,.104*a*o),n.position.set(0,.092*a,0),n.rotation.x=-.25,n.castShadow=!0,r.head.add(n),s.push(n)}for(let e of[`L`,`R`]){let r=`upperArm${e}`,s=`foreArm${e}`,l=`hand${e}`,u=e=>[(.05-.012*e+.008*kf(e,.35,.25))*a*o,(.05-.01*e+.01*kf(e,.4,.25))*a*o,0],d=t.keeper?1:.5;c(r,Df(n.upperArm,u,{t0:-.05,t1:d,capStart:!0,radial:16,capEnd:d===1}),i.sleeve),d<1&&c(r,Df(n.upperArm,u,{t0:d,t1:1,capEnd:!0,radial:16}),i.skin),c(s,Df(n.foreArm,e=>[(.041-.012*e+.006*kf(e,.25,.2))*a*o,(.037-.012*e+.008*kf(e,.25,.2))*a*o,0],{t0:0,t1:1,capStart:!0,capEnd:!0,radial:14}),t.keeper?i.sleeve:i.skin);let f=t.keeper?1.35:1;c(l,Df(.17*a*f,e=>[(.043+.008*kf(e,.45,.3))*a*f,(.02+.004*kf(e,.3,.3))*a*f,.006],{t0:0,t1:1,capStart:!0,capEnd:!0,radial:12}),t.keeper?i.gloves:i.skin)}for(let e of[`L`,`R`]){let r=`thigh${e}`,s=`shin${e}`,l=`foot${e}`,u=e=>[(.083-.028*e+.01*kf(e,.3,.25))*a*o,(.085-.03*e+.012*kf(e,.25,.25))*a*o,.006*kf(e,.3,.3)],d=t.keeper?.45:.36;c(r,Df(n.thigh,e=>{let t=u(e);return[t[0]*1.08,t[1]*1.08,t[2]]},{t0:-.08,t1:d,radial:18,capStart:!0}),i.shorts),c(r,Df(n.thigh,u,{t0:d,t1:1,capEnd:!0,radial:18}),i.skin),c(s,Df(n.shin,e=>[(.05-.016*e+.008*kf(e,.3,.2))*a*o,(.052-.02*e+.014*kf(e,.28,.18))*a*o,-.012*kf(e,.3,.2)*a],{t0:0,t1:1,capStart:!0,capEnd:!0,radial:16}),i.socks);let f=Df(.27*a,e=>[(.043+.008*kf(e,.6,.3)-.02*(Math.max(0,e-.8)/.2)**2)*a,(.034+.01*kf(e,.2,.25)-.016*e)*a,0],{t0:0,t1:1,capStart:!0,capEnd:!0,radial:16,dir:1});f.rotateX(Math.PI/2),f.translate(0,-n.ankleH*.55,-.06*a),c(l,f,i.boots);let p=Df(.27*a,e=>[(.044+.006*kf(e,.6,.3)-.02*(Math.max(0,e-.85)/.15)**2)*a,.008*a,0],{t0:0,t1:1,capStart:!0,capEnd:!0,radial:12,dir:1});p.rotateX(Math.PI/2),p.translate(0,-n.ankleH*.55-.03*a,-.06*a),c(l,p,i.sole)}return s}var Pf=[`hips`,`spine`,`chest`,`neck`,`head`,`clavL`,`upperArmL`,`foreArmL`,`handL`,`clavR`,`upperArmR`,`foreArmR`,`handR`,`thighL`,`shinL`,`footL`,`toeL`,`thighR`,`shinR`,`footR`,`toeR`],Ff=3+Pf.length*4,If=10+Ff*2,Lf=class{frames=[];net=[];markers=[];kickT=-1;contactT=-1;stepCount=0;netEvery=2;clear(){this.frames=[],this.net=[],this.markers=[],this.kickT=-1,this.contactT=-1,this.stepCount=0}get duration(){return this.frames.length/120}record(e,t,n,r,i){if(this.stepCount++,this.stepCount%2||this.frames.length>1680)return;let a=new Float32Array(If);a.set([e.p.x,e.p.y,e.p.z,e.q.x,e.q.y,e.q.z,e.q.w,e.v.x,e.v.y,e.v.z]),Bf(t,a,10),Bf(n,a,10+Ff),this.frames.push(a);let o=this.frames.length-1;r&&i&&o%this.netEvery===0?this.net[o]=new Float32Array(r):this.net[o]=null}mark(e){let t=this.frames.length/120;this.markers.push({t,type:e}),e===`kick`&&(this.contactT=t)}apply(e,t,n,r){let i=this.frames.length;if(!i)return;let a=Math.max(0,Math.min(i-1.001,e*120)),o=Math.floor(a),s=a-o,c=this.frames[o],l=this.frames[Math.min(i-1,o+1)];r.p.set(c[0]+(l[0]-c[0])*s,c[1]+(l[1]-c[1])*s,c[2]+(l[2]-c[2])*s),r.q.set(c[3],c[4],c[5],c[6]).slerp(Rf.set(l[3],l[4],l[5],l[6]),s),r.v.set(c[7],c[8],c[9]),Vf(t,c,l,s,10),Vf(n,c,l,s,10+Ff)}netAt(e){let t=Math.min(this.net.length-1,Math.floor(e*120));for(;t>=0;t--){let e=this.net[t];if(e)return e;if(t<this.firstNet())return null}return null}_first=-2;firstNet(){return this._first!==-2&&this.frames.length===this._len||(this._len=this.frames.length,this._first=this.net.findIndex(e=>!!e)),this._first}_len=0;path(e,t){let n=[],r=Math.max(0,Math.floor(e*120)),i=Math.min(this.frames.length-1,Math.floor(t*120));for(let e=r;e<=i;e+=2){let t=this.frames[e];n.push(new W(t[0],t[1],t[2]))}return n}},Rf=new kt,zf=new kt;function Bf(e,t,n){let r=e.bones.hips.position;t[n]=r.x,t[n+1]=r.y,t[n+2]=r.z;let i=n+3;for(let n of Pf){let r=e.bones[n].quaternion;t[i++]=r.x,t[i++]=r.y,t[i++]=r.z,t[i++]=r.w}}function Vf(e,t,n,r,i){e.bones.hips.position.set(t[i]+(n[i]-t[i])*r,t[i+1]+(n[i+1]-t[i+1])*r,t[i+2]+(n[i+2]-t[i+2])*r);let a=i+3;for(let i of Pf)Rf.set(t[a],t[a+1],t[a+2],t[a+3]),zf.set(n[a],n[a+1],n[a+2],n[a+3]),e.bones[i].quaternion.copy(Rf).slerp(zf,r),a+=4;e.root.updateMatrixWorld(!0)}var Hf={beginner:{id:`beginner`,label:`Iniciante`,name:`T. Barros`,height:1.82,rating:58,reaction:.31,pushTime:.21,maxLateral:3.3,maxVertical:2.7,armSpeed:6.5,rollRate:5.5,model:`linear`,cueRead:0,memory:0,commitThreshold:0,commitLead:-.12,rhythmTimer:!0,adjustPush:!1,catchSpeed:13,handMass:1.1,shuffleSpeed:1.6},intermediate:{id:`intermediate`,label:`Intermediário`,name:`R. Quaresma`,height:1.86,rating:71,reaction:.26,pushTime:.185,maxLateral:3.8,maxVertical:3,armSpeed:7.5,rollRate:6.5,model:`ballistic`,cueRead:.35,memory:.2,commitThreshold:.55,commitLead:-.04,rhythmTimer:!0,adjustPush:!1,catchSpeed:16.5,handMass:1.5,shuffleSpeed:2},advanced:{id:`advanced`,label:`Avançado`,name:`D. Ferraz`,height:1.89,rating:82,reaction:.215,pushTime:.165,maxLateral:4.3,maxVertical:3.3,armSpeed:8.5,rollRate:7.5,model:`drag`,cueRead:.6,memory:.35,commitThreshold:.5,commitLead:0,rhythmTimer:!1,adjustPush:!0,catchSpeed:19.5,handMass:1.9,shuffleSpeed:2.3},pro:{id:`pro`,label:`Profissional`,name:`M. Albuquerque`,height:1.92,rating:90,reaction:.18,pushTime:.15,maxLateral:4.75,maxVertical:3.55,armSpeed:9.5,rollRate:8.5,model:`full`,cueRead:.8,memory:.5,commitThreshold:.62,commitLead:.01,rhythmTimer:!1,adjustPush:!0,catchSpeed:23,handMass:2.3,shuffleSpeed:2.6}},Uf=[`beginner`,`intermediate`,`advanced`,`pro`],Wf=(e,t,n,r,i,a,o,s,c,l,u,d=`#111111`,f=1)=>({id:e,name:t,number:n,foot:r,height:i,build:f,favorite:o,attrs:{precision:a[0],power:a[1],curl:a[2],composure:a[3]},run:{distance:s[0],angle:s[1],tempo:s[2]},skin:c,hair:l,hairStyle:u,boots:d}),Gf=[{id:`aurora`,name:`Atlético Aurora`,short:`AUR`,kit:{primary:`#b0122a`,secondary:`#7d0b1d`,accent:`#f2b636`,shorts:`#f4f4f4`,socks:`#b0122a`,pattern:`stripes`,numberColor:`#ffffff`},keeperKit:{primary:`#1f2a36`,secondary:`#2f3f52`,accent:`#f2b636`,shorts:`#1f2a36`,socks:`#1f2a36`,pattern:`gradient`,numberColor:`#f2b636`},crowd:[`#b0122a`,`#ffffff`,`#7d0b1d`],keeper:{name:`Ferraz`,number:1,level:`advanced`,skin:`#c58c63`,hair:`#1b1410`,hairStyle:`buzz`},players:[Wf(`aur9`,`Bastos`,9,`right`,1.84,[82,85,70,78],`power`,[5,.5,3.8],`#8a5a3b`,`#1b1410`,`curly`,`#f2b636`),Wf(`aur10`,`Lima`,10,`left`,1.74,[90,70,88,84],`placed`,[4,.6,3.3],`#e8b896`,`#3a2618`,`short`,`#ffffff`),Wf(`aur7`,`Teixeira`,7,`right`,1.78,[80,78,82,72],`curl`,[4.5,.55,3.6],`#d9a77c`,`#1b1410`,`short`,`#d62828`),Wf(`aur8`,`Moura`,8,`right`,1.8,[78,72,70,86],`placed`,[3.8,.45,3.2],`#b57e55`,`#1b1410`,`buzz`),Wf(`aur11`,`Santana`,11,`left`,1.76,[74,80,78,70],`low`,[5.5,.6,4.2],`#5e3b26`,`#111`,`bald`,`#2a9d8f`),Wf(`aur5`,`Correia`,5,`right`,1.88,[68,88,55,74],`power`,[6,.4,4.4],`#f1c9a5`,`#6b4a2b`,`short`),Wf(`aur6`,`Prado`,6,`right`,1.79,[76,70,64,80],`center`,[3.5,.35,3],`#d9a77c`,`#3a2618`,`long`),Wf(`aur4`,`Alves`,4,`right`,1.9,[62,84,50,68],`power`,[5,.4,4],`#8a5a3b`,`#1b1410`,`buzz`,`#111`,1.1),Wf(`aur3`,`Rocha`,3,`left`,1.86,[64,76,60,66],`placed`,[4.5,.55,3.6],`#e8b896`,`#c9a35f`,`short`),Wf(`aur2`,`Nunes`,2,`right`,1.77,[66,72,66,70],`low`,[4,.5,3.4],`#b57e55`,`#1b1410`,`curly`),Wf(`aur1`,`Ferraz`,1,`right`,1.91,[55,80,45,72],`power`,[5,.4,3.8],`#c58c63`,`#1b1410`,`buzz`)]},{id:`uniao`,name:`União Ferroviária`,short:`UNF`,kit:{primary:`#f4f4f4`,secondary:`#0c2a55`,accent:`#0c2a55`,shorts:`#0c2a55`,socks:`#f4f4f4`,pattern:`sash`,numberColor:`#0c2a55`},keeperKit:{primary:`#e8f542`,secondary:`#c8d630`,accent:`#111111`,shorts:`#111111`,socks:`#e8f542`,pattern:`plain`,numberColor:`#111111`},crowd:[`#0c2a55`,`#ffffff`,`#1e4b8f`],keeper:{name:`Quaresma`,number:1,level:`intermediate`,skin:`#f1c9a5`,hair:`#3a2618`,hairStyle:`short`},players:[Wf(`unf9`,`Vidal`,9,`right`,1.86,[80,88,60,76],`power`,[6,.45,4.1],`#f1c9a5`,`#1b1410`,`short`,`#ffffff`),Wf(`unf10`,`Okafor`,10,`right`,1.81,[86,74,84,80],`curl`,[4.2,.6,3.4],`#5e3b26`,`#111`,`buzz`,`#f2b636`),Wf(`unf7`,`Duarte`,7,`left`,1.75,[84,70,86,74],`placed`,[4,.55,3.3],`#d9a77c`,`#6b4a2b`,`long`),Wf(`unf8`,`Sá`,8,`right`,1.78,[78,76,70,82],`chip`,[3.6,.4,2.9],`#e8b896`,`#1b1410`,`short`),Wf(`unf11`,`Ramires`,11,`right`,1.73,[76,72,80,70],`trivela`,[4.5,.3,3.6],`#b57e55`,`#1b1410`,`curly`,`#d62828`),Wf(`unf5`,`Marques`,5,`right`,1.89,[66,86,52,72],`power`,[5.5,.4,4.3],`#c58c63`,`#3a2618`,`buzz`),Wf(`unf6`,`Couto`,6,`left`,1.82,[74,74,66,78],`low`,[4,.5,3.5],`#f1c9a5`,`#c9a35f`,`short`),Wf(`unf4`,`Bento`,4,`right`,1.92,[60,84,48,70],`center`,[5,.35,4],`#8a5a3b`,`#111`,`bald`,`#111`,1.12),Wf(`unf3`,`Leite`,3,`right`,1.84,[64,74,58,64],`placed`,[4.4,.5,3.6],`#e8b896`,`#3a2618`,`short`),Wf(`unf2`,`Pires`,2,`right`,1.76,[68,70,62,68],`low`,[4,.55,3.4],`#d9a77c`,`#1b1410`,`long`),Wf(`unf1`,`Quaresma`,1,`right`,1.88,[52,78,40,70],`power`,[5,.45,3.8],`#f1c9a5`,`#3a2618`,`short`)]}];function Kf(e,t){return{kit:e.kit,number:t.number,name:t.name,skin:t.skin,hair:t.hair,hairStyle:t.hairStyle,boots:t.boots,keeper:!1,seed:t.number*7+t.name.length}}function qf(e,t,n){let r=e.keeper;return{kit:e.keeperKit,number:r.number,name:n??r.name,skin:r.skin,hair:r.hair,hairStyle:r.hairStyle,boots:`#111111`,keeper:!0,gloves:t===`pro`?`#f2f2f2`:t===`advanced`?`#e9f542`:t===`intermediate`?`#ff7b2e`:`#5aa9e6`,seed:3+t.length}}function Jf(e,t,n){return Wf(`user`,e,10,n,1.81,[t.precision,t.power,t.curl,t.composure],`placed`,[4.5,.55,3.6],`#d9a77c`,`#1b1410`,`short`,`#f2b636`)}var Yf=`penalty-kings:v1`;function Xf(){return{quality:typeof navigator<`u`&&/Android|iPhone|iPad|Mobile/i.test(navigator.userAgent)?`low`:`high`,timeOfDay:`night`,wind:`none`,kickerCamera:`behind`,keeperCamera:`keeperPOV`,followBall:!0,autoReplay:!0,guide:!1,narrator:!0,master:.8,crowd:.8,sfx:.9,difficulty:`intermediate`,foot:`right`}}function Zf(){return{settings:Xf(),shots:[],career:{name:`Você`,stage:0,xp:0,points:0,attrs:{precision:58,power:60,curl:55,composure:55},best:{}},records:{maxSpeed:0,maxCurve:0,precisionBest:{}}}}var Qf=null;function $f(){if(Qf)return Qf;let e=Zf();try{let t=localStorage.getItem(Yf);if(t){let n=JSON.parse(t);e={settings:{...e.settings,...n.settings??{}},shots:n.shots??[],career:{...e.career,...n.career??{},attrs:{...e.career.attrs,...n.career?.attrs??{}}},records:{...e.records,...n.records??{}}}}}catch{}return Qf=e,e}function ep(){if(Qf)try{localStorage.setItem(Yf,JSON.stringify(Qf))}catch{}}function tp(e){let t=$f();t.shots.push(e),t.shots.length>1500&&t.shots.splice(0,t.shots.length-1500),ep()}function np(){let e=$f();e.shots=[],e.records={maxSpeed:0,maxCurve:0,precisionBest:{}},ep()}var rp=e=>e.outcome===`goal`,ip=class{level;drill;user;team;opp;id=`training`;title=`Treinamento`;shots=0;goals=0;best={speed:0,curve:0,precision:1/0};targets=[];tIdx=0;constructor(e,t,n,r,i){this.level=e,this.drill=t,this.user=n,this.team=r,this.opp=i,t===`precision`&&(this.targets=sp.medium)}next(){let e={role:`kick`,kickerTeam:this.team,kicker:this.user,keeperTeam:this.opp,keeperLevel:this.level,attrs:this.user.attrs,pressure:0,label:`Treino · ${ap[this.drill]}`,cpuSeed:this.shots,userTeamIsKicking:!0};return this.drill===`precision`&&(e.targets=[this.targets[this.tIdx%this.targets.length]]),e}onResult(e){if(e.outcome===`retake`)return`Goleiro adiantado — cobrança repetida`;if(this.shots++,rp(e)&&this.goals++,this.best.speed=Math.max(this.best.speed,e.speedKmh),rp(e)&&(this.best.curve=Math.max(this.best.curve,e.curveCm)),this.drill===`precision`){let t=this.targets[this.tIdx%this.targets.length],n=Math.hypot(e.crossing.x-t.x,e.crossing.y-t.y);return this.tIdx++,rp(e)&&n<t.r?`Alvo acertado! ${Math.round(n*100)} cm do centro`:`Fora do alvo (${Math.round(n*100)} cm)`}return this.drill===`power`?`${e.speedKmh.toFixed(1)} km/h — recorde da sessão ${this.best.speed.toFixed(1)} km/h`:this.drill===`curl`?`Curva de ${Math.round(e.curveCm)} cm · ${Math.round(e.spinRpm)} rpm`:null}scoreboard(){return{left:{name:this.user.name,short:`TREINO`,goals:this.goals,marks:[]},info:`${this.goals}/${this.shots} gols · ${this.level===`none`?`sem goleiro`:Hf[this.level].label}`}}summary(){return{title:`Sessão de treino`,win:!0,confetti:!1,lines:[[`Cobranças`,String(this.shots)],[`Gols`,`${this.goals} (${this.shots?Math.round(100*this.goals/this.shots):0}%)`],[`Maior velocidade`,`${this.best.speed.toFixed(1)} km/h`],[`Maior curva (gol)`,`${Math.round(this.best.curve)} cm`]]}}},ap={free:`Livre`,precision:`Precisão`,power:`Potência`,curl:`Efeito`},op=class{teams;first;level;id=`shootout`;title=`Disputa de pênaltis`;kicks=[];order;idx=[0,0];seed;finished=!1;winner=null;retake=!1;constructor(e,t,n,r){this.teams=e,this.first=t,this.level=n;let i=e=>[...e.players].sort((e,t)=>t.attrs.precision+t.attrs.composure-(e.attrs.precision+e.attrs.composure));this.order=[i(e[0]),i(e[1])],this.seed=r}taken(e){return this.kicks.filter(t=>t.team===e).length}goals(e){return this.kicks.filter(t=>t.team===e&&t.goal).length}nextTeam(){return this.kicks.length%2==0?this.first:1-this.first}decisive(e){let t=t=>{let n=this.kicks.slice();this.kicks.push({team:e,goal:t});let r=this.computeWinner();return this.kicks=n,r!==null};return t(!0)||t(!1)}next(){if(this.finished)return null;let e=this.nextTeam(),t=1-e,n=this.order[e],r=n[this.idx[e]%n.length],i=Math.floor(this.kicks.length/2)+1,a=i>5,o=this.decisive(e)?.9:a?.7:.2+i*.08,s=e===0;return{role:s?`kick`:`keep`,kickerTeam:this.teams[e],kicker:r,keeperTeam:this.teams[t],keeperLevel:s?this.level:this.teams[0].keeper.level,attrs:r.attrs,pressure:o,label:a?`Morte súbita · rodada ${i}`:`Rodada ${i} de 5`,cpuSeed:this.seed*977+this.kicks.length*31+7,userTeamIsKicking:s}}onResult(e,t){if(e.outcome===`retake`)return this.retake=!0,`Goleiro adiantado: cobrança repetida (regra 14)`;this.retake=!1;let n=t.kickerTeam===this.teams[0]?0:1;this.kicks.push({team:n,goal:rp(e)}),this.idx[n]++;let r=this.computeWinner();return r!==null&&(this.finished=!0,this.winner=r),null}computeWinner(){let e=this.goals(0),t=this.goals(1),n=this.taken(0),r=this.taken(1);if(n<=5&&r<=5){let i=5-n;return e>t+(5-r)?0:t>e+i?1:n===5&&r===5&&e!==t?e>t?0:1:null}return n===r&&e!==t?e>t?0:1:null}scoreboard(){let e=e=>{let t=this.kicks.filter(t=>t.team===e).map(e=>e.goal?`goal`:`miss`),n=t.slice(-Math.max(5,t.length));for(;n.length<5;)n.push(`pending`);return n};return{left:{name:this.teams[0].name,short:this.teams[0].short,goals:this.goals(0),marks:e(0)},right:{name:this.teams[1].name,short:this.teams[1].short,goals:this.goals(1),marks:e(1)},info:this.kicks.length>=10?`Morte súbita`:`Disputa de pênaltis`}}summary(){let e=this.goals(0),t=this.goals(1),n=this.winner===0,r=e=>{let t=this.taken(e);return t?`${this.goals(e)}/${t} (${Math.round(100*this.goals(e)/t)}%)`:`-`};return{title:n?`${this.teams[0].name} vence!`:`${this.teams[1].name} vence`,win:n,confetti:n,lines:[[`Placar`,`${this.teams[0].short} ${e} × ${t} ${this.teams[1].short}`],[`Cobranças`,String(this.kicks.length)],[`Aproveitamento ${this.teams[0].short}`,r(0)],[`Aproveitamento ${this.teams[1].short}`,r(1)],[`Morte súbita`,this.kicks.length>10?`Sim`:`Não`]]}}},sp={easy:[{x:-2.6,y:.6,r:.6},{x:2.6,y:1.7,r:.6},{x:0,y:1.6,r:.6},{x:2.5,y:.6,r:.6},{x:-2.5,y:1.7,r:.6},{x:-1.2,y:.5,r:.6},{x:1.3,y:1.9,r:.6},{x:0,y:.5,r:.6}],medium:[{x:-2.9,y:.5,r:.45},{x:2.9,y:1.9,r:.45},{x:-2.8,y:1.9,r:.45},{x:2.8,y:.45,r:.45},{x:0,y:2,r:.45},{x:-1.7,y:1.2,r:.45},{x:1.7,y:.9,r:.45},{x:0,y:.45,r:.45}],hard:[{x:-3.25,y:2.1,r:.32},{x:3.25,y:.35,r:.32},{x:3.2,y:2.05,r:.32},{x:-3.2,y:.35,r:.32},{x:-1.5,y:2.05,r:.32},{x:1.6,y:2.05,r:.32},{x:-2.4,y:1.2,r:.32},{x:2.4,y:1.2,r:.32}]},cp=class{level;kicksTotal;user;team;opp;keeper;id=`precision`;title=`Desafio de precisão`;shots=0;points=0;hits=0;history=[];lastHit=-1;constructor(e,t,n,r,i,a){this.level=e,this.kicksTotal=t,this.user=n,this.team=r,this.opp=i,this.keeper=a}get layout(){return sp[this.level]}next(){if(this.shots>=this.kicksTotal)return null;let e=this.layout[this.shots%this.layout.length];return{role:`kick`,kickerTeam:this.team,kicker:this.user,keeperTeam:this.opp,keeperLevel:this.keeper,attrs:this.user.attrs,pressure:this.shots===this.kicksTotal-1?.4:.1,label:`Alvo ${this.shots+1} de ${this.kicksTotal}`,targets:[e],cpuSeed:this.shots,userTeamIsKicking:!0}}onResult(e){if(e.outcome===`retake`)return`Goleiro adiantado — repita`;let t=this.layout[this.shots%this.layout.length];this.shots++;let n=Math.hypot(e.crossing.x-t.x,e.crossing.y-t.y),r=0,i;return rp(e)&&n<t.r?(r=Math.round(100-70*(n/t.r))+(n<t.r/3?25:0),this.hits++,this.lastHit=0,i=`+${r} pts · ${Math.round(n*100)} cm do centro${n<t.r/3?` · NA MOSCA!`:``}`):rp(e)?(r=10,this.lastHit=-1,i=`+10 pts · gol fora do alvo (${Math.round(n*100)} cm)`):(this.lastHit=-1,i=`Sem pontos`),this.points+=r,this.history.push(rp(e)?`goal`:`miss`),i}scoreboard(){let e=[...this.history];for(;e.length<this.kicksTotal;)e.push(`pending`);return{left:{name:`Precisão`,short:`PTS`,goals:this.points,marks:e},info:`Nível ${this.level===`easy`?`fácil`:this.level===`medium`?`médio`:`difícil`} · ${this.hits} alvos`,points:this.points}}summary(){let e=this.kicksTotal*125,t=this.points>e*.55?3:this.points>e*.35?2:+(this.points>e*.15),n=$f(),r=`${this.level}-${this.kicksTotal}`,i=n.records.precisionBest[r]??0;return this.points>i&&(n.records.precisionBest[r]=this.points,ep()),{title:`${this.points} pontos`,win:t>=2,confetti:t===3,lines:[[`Alvos acertados`,`${this.hits}/${this.kicksTotal}`],[`Classificação`,`★`.repeat(t)+`☆`.repeat(3-t)],[`Recorde`,`${Math.max(i,this.points)} pts`]]}}},lp=[{name:`Peneira`,desc:`Marque 3 de 5 contra um goleiro iniciante`,kind:`convert`,kicks:5,need:3,keeper:`beginner`},{name:`Base sub-17`,desc:`Precisão fácil: some 350 pontos em 8 alvos`,kind:`precision`,kicks:8,need:350,keeper:`none`,level:`easy`},{name:`Sub-20`,desc:`Marque 4 de 5 contra um goleiro intermediário`,kind:`convert`,kicks:5,need:4,keeper:`intermediate`},{name:`Teste de potência`,desc:`Marque 3 gols acima de 95 km/h`,kind:`power`,kicks:6,need:3,keeper:`beginner`,minSpeed:95},{name:`Estreia profissional`,desc:`Marque 4 de 5 sob pressão de estreia`,kind:`convert`,kicks:5,need:4,keeper:`intermediate`,pressure:.45},{name:`Mestre do efeito`,desc:`Marque 2 gols com curva acima de 45 cm`,kind:`curl`,kicks:6,need:2,keeper:`intermediate`,minCurve:45},{name:`Clássico estadual`,desc:`Marque 4 de 5 contra um goleiro avançado`,kind:`convert`,kicks:5,need:4,keeper:`advanced`,pressure:.5},{name:`Precisão de elite`,desc:`Precisão difícil: some 420 pontos`,kind:`precision`,kicks:8,need:420,keeper:`beginner`,level:`hard`},{name:`Semifinal continental`,desc:`Marque 5 de 6 contra avançado, estádio lotado`,kind:`convert`,kicks:6,need:5,keeper:`advanced`,pressure:.7},{name:`Final mundial`,desc:`Marque 4 de 5 contra um profissional. Decisivo.`,kind:`convert`,kicks:5,need:4,keeper:`pro`,pressure:.95}],up=class{state;team;opp;id=`career`;title=`Carreira de cobrador`;stage;shots=0;score=0;marks=[];xpGained=0;passed=!1;precision=null;constructor(e,t,n){this.state=e,this.team=t,this.opp=n,this.stage=lp[Math.min(e.stage,lp.length-1)],this.stage.kind===`precision`&&(this.precision=new cp(this.stage.level??`medium`,this.stage.kicks,this.player,t,n,this.stage.keeper))}get player(){return Jf(this.state.name,this.state.attrs,$f().settings.foot)}next(){if(this.shots>=this.stage.kicks)return null;if(this.precision){let e=this.precision.next();return e&&(e.label=`${this.stage.name} · ${e.label}`),e}let e=this.player;return{role:`kick`,kickerTeam:this.team,kicker:e,keeperTeam:this.opp,keeperLevel:this.stage.keeper,attrs:e.attrs,pressure:(this.stage.pressure??.2)*(this.shots===this.stage.kicks-1?1.2:1),label:`${this.stage.name} · ${this.shots+1}/${this.stage.kicks}`,cpuSeed:this.shots,userTeamIsKicking:!0}}onResult(e,t){if(e.outcome===`retake`)return`Goleiro adiantado — repita`;this.shots++;let n=null;if(this.precision)n=this.precision.onResult(e),this.score=this.precision.points;else{let t=rp(e);this.stage.kind===`power`&&(t&&=e.speedKmh>=(this.stage.minSpeed??0)),this.stage.kind===`curl`&&(t&&=e.curveCm>=(this.stage.minCurve??0)),t&&this.score++,this.stage.kind===`power`&&rp(e)&&(n=`${e.speedKmh.toFixed(1)} km/h ${t?`✓`:`(mín. ${this.stage.minSpeed})`}`),this.stage.kind===`curl`&&rp(e)&&(n=`Curva ${Math.round(e.curveCm)} cm ${t?`✓`:`(mín. ${this.stage.minCurve})`}`),this.marks.push(t?`goal`:`miss`)}return this.xpGained+=rp(e)?12+Math.round(e.quality/10):3,this.shots>=this.stage.kicks&&this.finish(),n}finish(){this.passed=this.score>=this.stage.need;let e=this.state;for(e.xp+=this.xpGained+(this.passed?60:0);e.xp>=100;)e.xp-=100,e.points+=1;this.passed&&(e.points+=3,e.best[e.stage]=Math.max(e.best[e.stage]??0,this.score),e.stage<lp.length-1?e.stage++:e.best[99]=1),ep()}scoreboard(){if(this.precision){let e=this.precision.scoreboard();return e.info=`${this.stage.name} · meta ${this.stage.need} pts`,e}let e=[...this.marks];for(;e.length<this.stage.kicks;)e.push(`pending`);return{left:{name:this.state.name,short:`CARREIRA`,goals:this.score,marks:e},info:`${this.stage.name} · meta ${this.stage.need}/${this.stage.kicks}`}}summary(){return{title:this.passed?`Etapa concluída!`:`Etapa não concluída`,win:this.passed,confetti:this.passed&&this.state.stage>=lp.length-1,lines:[[`Etapa`,this.stage.name],[`Resultado`,`${this.score} / meta ${this.stage.need}`],[`XP ganho`,`+${this.xpGained+(this.passed?60:0)}`],[`Pontos de atributo`,String(this.state.points)]]}}},$=(e,t=document)=>t.querySelector(e);function dp(e){return e.replace(/[&<>"]/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`})[e])}var fp={goal:`goal`,saved:`saved`,post:`post`,wide:`wide`,over:`over`,retake:`retake`},pp=class{root;hud;menu;panelEl=null;result;replayBar;touch;pause=null;bannerEl=null;toastTimer=0;handlers;techClick=null;setupClick=null;constructor(e){this.root=document.createElement(`div`),this.root.className=`ui`,e.appendChild(this.root),this.root.innerHTML=`
      <div id="loading"><div><div class="crest"><span class="crown"></span>PENALTY<br><b style="color:var(--gold)">KINGS</b><small>SIMULADOR DE PÊNALTIS</small></div><div class="bar"><i></i></div></div></div>
      <div id="hud" class="hidden"></div>
      <div id="menu" class="hidden"></div>
      <div id="result" class="hidden"></div>
      <div id="replay-bar" class="hidden"></div>
      <div id="touch" class="hidden"></div>`,this.hud=$(`#hud`,this.root),this.menu=$(`#menu`,this.root),this.result=$(`#result`,this.root),this.replayBar=$(`#replay-bar`,this.root),this.touch=$(`#touch`,this.root),this.buildHud()}loading(e){let t=$(`#loading .bar i`,this.root);t&&(t.style.width=`${Math.round(e*100)}%`)}hideLoading(){let e=$(`#loading`,this.root);e&&(e.style.opacity=`0`,setTimeout(()=>e.remove(),500))}showMenu(){this.closePanel(),this.hud.classList.add(`hidden`),this.result.classList.add(`hidden`),this.replayBar.classList.add(`hidden`),this.touch.classList.add(`hidden`),this.menu.classList.remove(`hidden`);let e=$f(),t=e.shots.length,n=e.shots.filter(e=>e.outcome===`goal`).length;this.menu.innerHTML=`
      <div class="col">
        <div class="logo"><span class="crown"></span>Penalty<br><b>Kings</b><small>Física real · 11 metros · nenhuma animação decide o gol</small></div>
        <ul class="menu-list">
          <li><button data-m="quick">Jogar <span>Disputa rápida · ${Hf[e.settings.difficulty].label}</span></button></li>
          <li><button data-m="training">Treinamento <span>Livre, precisão, potência, efeito</span></button></li>
          <li><button data-m="shootout">Disputa de pênaltis <span>5 cobranças + morte súbita</span></button></li>
          <li><button data-m="precision">Desafio de precisão <span>Alvos no gol</span></button></li>
          <li><button data-m="career">Carreira <span>Etapa ${Math.min(e.career.stage+1,lp.length)} de ${lp.length}</span></button></li>
          <li><button data-m="stats">Estatísticas <span>${t} cobranças · ${t?Math.round(100*n/t):0}% de gols</span></button></li>
          <li><button data-m="settings">Configurações <span>Gráficos ${e.settings.quality.toUpperCase()} · ${e.settings.timeOfDay===`night`?`noite`:e.settings.timeOfDay===`day`?`dia`:`pôr do sol`}</span></button></li>
        </ul>
        <div class="menu-foot">Mouse ou <kbd>WASD</kbd> mira · segure <kbd>Espaço</kbd>/clique para a potência · solte para correr · aperte de novo no pé de apoio (anel dourado) · <kbd>Shift</kbd> paradinha · <kbd>1-7</kbd> técnica · <kbd>C</kbd> câmera · controle de videogame e toque também funcionam.</div>
      </div><div></div>`,this.menu.querySelectorAll(`[data-m]`).forEach(e=>e.addEventListener(`click`,()=>{this.handlers.audioUnlock();let t=e.dataset.m;t===`quick`?this.handlers.quick():t===`training`?this.trainingPanel():t===`shootout`?this.shootoutPanel():t===`precision`?this.precisionPanel():t===`career`?this.careerPanel():t===`stats`?this.statsPanel():t===`settings`&&this.settingsPanel()})),this.menu.querySelector(`[data-m]`)?.focus()}hideMenu(){this.menu.classList.add(`hidden`),this.closePanel()}openPanel(e){this.closePanel();let t=document.createElement(`div`);return t.className=`panel`,t.innerHTML=`<div class="card">${e}</div>`,this.root.appendChild(t),this.panelEl=t,t.addEventListener(`click`,e=>{e.target===t&&this.closePanel()}),t.querySelectorAll(`[data-close]`).forEach(e=>e.addEventListener(`click`,()=>this.closePanel())),t}closePanel(){this.panelEl?.remove(),this.panelEl=null}seg(e,t,n,r){let i=n,a=e.querySelector(`[data-seg="${t}"]`).querySelectorAll(`button`),o=()=>a.forEach(e=>e.setAttribute(`aria-pressed`,String(e.dataset.v===i)));return a.forEach(e=>e.addEventListener(`click`,()=>{i=e.dataset.v,o(),r?.(i)})),o(),()=>i}levelSeg(e){return(e?`<button data-v="none">Sem goleiro</button>`:``)+Uf.map(e=>`<button data-v="${e}">${Hf[e].label}</button>`).join(``)}trainingPanel(){let e=$f().settings,t=this.openPanel(`
      <h2>Treinamento</h2>
      <p>Cobranças ilimitadas. Cada chute é uma colisão real entre a chuteira e a bola: mude técnica, ponto de contato e ritmo e observe o efeito.</p>
      <div class="field"><label>Goleiro</label><div class="seg" data-seg="lvl">${this.levelSeg(!0)}</div></div>
      <div class="field"><label>Exercício</label><div class="seg" data-seg="drill">${[`free`,`precision`,`power`,`curl`].map(e=>`<button data-v="${e}">${ap[e]}</button>`).join(``)}</div></div>
      <div class="actions"><button class="btn ghost" data-close>Voltar</button><button class="btn primary" data-go>Começar treino</button></div>`),n=this.seg(t,`lvl`,e.difficulty),r=this.seg(t,`drill`,`free`);$(`[data-go]`,t).addEventListener(`click`,()=>this.handlers.training(n(),r()))}shootoutPanel(){let e=$f().settings,t=this.openPanel(`
      <h2>Disputa de pênaltis</h2>
      <p>Regras oficiais: cinco cobranças alternadas para cada lado, encerramento antecipado quando não há mais como empatar, e morte súbita se continuar empatado. Você cobra pelo seu time e defende o gol nas cobranças do adversário.</p>
      <div class="grid2">
        <div class="field"><label>Seu time</label><div class="seg" data-seg="team">${Gf.map((e,t)=>`<button data-v="${t}">${dp(e.name)}</button>`).join(``)}</div></div>
        <div class="field"><label>Quem começa</label><div class="seg" data-seg="first"><button data-v="0">Batendo</button><button data-v="1">Defendendo</button></div></div>
      </div>
      <div class="field"><label>Goleiro adversário</label><div class="seg" data-seg="lvl">${this.levelSeg(!1)}</div></div>
      <div class="actions"><button class="btn ghost" data-close>Voltar</button><button class="btn primary" data-go>Ir para a marca</button></div>`),n=this.seg(t,`team`,`0`),r=this.seg(t,`first`,`0`),i=this.seg(t,`lvl`,e.difficulty);$(`[data-go]`,t).addEventListener(`click`,()=>this.handlers.shootout(Number(n()),i(),Number(r())))}precisionPanel(){let e=$f().records.precisionBest,t=this.openPanel(`
      <h2>Desafio de precisão</h2>
      <p>Oito alvos em regiões diferentes do gol. Pontos pela distância ao centro do alvo; bônus na mosca. Só vale se for gol.</p>
      <div class="field"><label>Dificuldade</label><div class="seg" data-seg="lvl"><button data-v="easy">Fácil</button><button data-v="medium">Médio</button><button data-v="hard">Difícil</button></div></div>
      <div class="field"><label>Goleiro</label><div class="seg" data-seg="gk">${this.levelSeg(!0)}</div></div>
      <p class="num">Recordes: fácil ${e[`easy-8`]??0} · médio ${e[`medium-8`]??0} · difícil ${e[`hard-8`]??0} pts</p>
      <div class="actions"><button class="btn ghost" data-close>Voltar</button><button class="btn primary" data-go>Começar</button></div>`),n=this.seg(t,`lvl`,`medium`),r=this.seg(t,`gk`,`none`);$(`[data-go]`,t).addEventListener(`click`,()=>this.handlers.precision(n(),r()))}careerPanel(){let e=$f().career,t=lp.map((t,n)=>`<div class="stage ${n<e.stage||n===lp.length-1&&e.best[99]?`done`:n===e.stage?`current`:`locked`}"><div class="n">${n+1}</div><div><b>${dp(t.name)}</b><small>${dp(t.desc)}</small></div><div class="chip ${t.keeper===`none`?``:`lvl-`+t.keeper}">${t.keeper===`none`?`sem goleiro`:Hf[t.keeper].label}</div></div>`).join(``),n=(t,n)=>`<div class="attr"><span>${n}</span><div class="meter"><i style="width:${e.attrs[t]}%"></i></div><b class="num">${e.attrs[t]}</b><button data-attr="${t}" ${e.points>0&&e.attrs[t]<99?``:`disabled`} aria-label="Melhorar ${n}">+</button></div>`,r=this.openPanel(`
      <h2>Carreira de cobrador</h2>
      <div class="field"><label for="career-name">Nome do jogador</label><input id="career-name" type="text" maxlength="14" value="${dp(e.name)}"></div>
      <div class="grid2">
        <div class="field"><h3>Atributos · ${e.points} ponto(s) para distribuir</h3>
          ${n(`precision`,`Precisão`)}${n(`power`,`Potência`)}${n(`curl`,`Efeito`)}${n(`composure`,`Frieza`)}
          <p style="font-size:12.5px">Precisão reduz o erro de execução, potência aumenta a velocidade do pé, efeito aumenta o giro, frieza controla os nervos nas cobranças decisivas. XP: ${e.xp}/100.</p>
        </div>
        <div class="field"><h3>Etapas</h3><div class="stage-list">${t}</div></div>
      </div>
      <div class="actions"><button class="btn ghost" data-close>Voltar</button><button class="btn primary" data-go>${e.best[99]?`Rejogar a final`:`Jogar etapa `+(e.stage+1)}</button></div>`);r.querySelectorAll(`[data-attr]`).forEach(e=>e.addEventListener(`click`,()=>{this.handlers.careerSpend(e.dataset.attr),this.careerPanel()}));let i=$(`#career-name`,r);i.addEventListener(`change`,()=>this.handlers.careerRename(i.value.trim()||`Você`)),$(`[data-go]`,r).addEventListener(`click`,()=>{this.handlers.careerRename(i.value.trim()||`Você`),this.handlers.career()})}statsPanel(){let e=$f().shots,t=e.length,n=e.filter(e=>e.outcome===`goal`).length,r=t?e.reduce((e,t)=>e+t.speed,0)/t:0,i=e.reduce((e,t)=>Math.max(e,t.speed),0),a=new Map;for(let t of e){let e=a.get(t.technique)??{n:0,g:0,sp:0};e.n++,t.outcome===`goal`&&e.g++,e.sp+=t.speed,a.set(t.technique,e)}let o=new Map;for(let t of e){let e=o.get(t.keeper)??{n:0,g:0};e.n++,t.outcome===`goal`&&e.g++,o.set(t.keeper,e)}let s=t=>e.filter(e=>e.outcome===t).length,c=this.openPanel(`
      <h2>Estatísticas</h2>
      <div class="kpis">
        <div class="kpi"><b>${t}</b><span>cobranças</span></div>
        <div class="kpi"><b>${t?Math.round(100*n/t):0}%</b><span>conversão</span></div>
        <div class="kpi"><b>${r.toFixed(0)}</b><span>km/h médios</span></div>
        <div class="kpi"><b>${i.toFixed(0)}</b><span>km/h máx.</span></div>
      </div>
      <div class="grid2">
        <div class="field"><h3>Onde suas bolas cruzaram a linha</h3><canvas class="chart" id="st-map" width="640" height="300"></canvas></div>
        <div class="field"><h3>Erro médio de mira (cm, média móvel de 10)</h3><canvas class="chart" id="st-prec" width="640" height="300"></canvas></div>
      </div>
      <div class="grid2">
        <div class="field"><h3>Por técnica</h3><table class="tbl"><thead><tr><th>Técnica</th><th>Chutes</th><th>Gols</th><th>km/h</th></tr></thead><tbody>
          ${[...a.entries()].map(([e,t])=>`<tr><td>${dp(e)}</td><td>${t.n}</td><td>${Math.round(100*t.g/t.n)}%</td><td>${(t.sp/t.n).toFixed(0)}</td></tr>`).join(``)||`<tr><td colspan="4">Nenhuma cobrança ainda</td></tr>`}
        </tbody></table></div>
        <div class="field"><h3>Resultados</h3><table class="tbl"><tbody>
          <tr><td>Gols</td><td>${n}</td></tr><tr><td>Defesas</td><td>${s(`saved`)}</td></tr><tr><td>Trave/travessão</td><td>${s(`post`)}</td></tr><tr><td>Para fora / por cima</td><td>${s(`wide`)+s(`over`)}</td></tr>
          ${[...o.entries()].map(([e,t])=>`<tr><td>vs ${e===`none`?`gol vazio`:Hf[e].label}</td><td>${Math.round(100*t.g/t.n)}% (${t.n})</td></tr>`).join(``)}
        </tbody></table></div>
      </div>
      <div class="actions"><button class="btn ghost" data-reset>Apagar estatísticas</button><button class="btn primary" data-close>Fechar</button></div>`);_p($(`#st-map`,c),e.slice(-400)),vp($(`#st-prec`,c),e);let l=!1,u=$(`[data-reset]`,c);u.addEventListener(`click`,()=>{l?(this.handlers.resetStats(),this.statsPanel()):(l=!0,u.textContent=`Clique de novo para confirmar`)})}settingsPanel(){let e={...$f().settings},t=this.openPanel(`
      <h2>Configurações</h2>
      <div class="grid2">
        <div class="field"><label>Gráficos</label><div class="seg" data-seg="quality"><button data-v="low">LOW</button><button data-v="high">HIGH</button><button data-v="ultra">ULTRA</button></div><p style="font-size:12px">A física é a mesma em todas as opções.</p></div>
        <div class="field"><label>Horário</label><div class="seg" data-seg="tod"><button data-v="day">Dia</button><button data-v="sunset">Pôr do sol</button><button data-v="night">Noite</button></div></div>
        <div class="field"><label>Vento</label><div class="seg" data-seg="wind"><button data-v="none">Sem vento</button><button data-v="light">Leve</button><button data-v="strong">Forte</button></div></div>
        <div class="field"><label>Pé preferido (treino e carreira)</label><div class="seg" data-seg="foot"><button data-v="right">Direito</button><button data-v="left">Esquerdo</button></div></div>
        <div class="field"><label>Câmera do cobrador</label><div class="seg" data-seg="kcam">${Tl.map(e=>`<button data-v="${e}">${wl[e]}</button>`).join(``)}</div></div>
        <div class="field"><label>Câmera do goleiro</label><div class="seg" data-seg="gcam">${El.map(e=>`<button data-v="${e}">${wl[e]}</button>`).join(``)}</div></div>
        <div class="field"><label>Dificuldade padrão</label><div class="seg" data-seg="diff">${this.levelSeg(!1)}</div></div>
        <div class="field"><label>Opções</label><div class="seg">
          <button data-t="followBall">Seguir a bola</button><button data-t="autoReplay">Replay automático</button><button data-t="guide">Guia de trajetória (treino)</button><button data-t="narrator">Narrador</button></div></div>
        <div class="field"><label for="v-master">Volume geral</label><input id="v-master" type="range" min="0" max="1" step="0.05" value="${e.master}"></div>
        <div class="field"><label for="v-crowd">Torcida</label><input id="v-crowd" type="range" min="0" max="1" step="0.05" value="${e.crowd}"></div>
        <div class="field"><label for="v-sfx">Efeitos</label><input id="v-sfx" type="range" min="0" max="1" step="0.05" value="${e.sfx}"></div>
      </div>
      <div class="actions"><button class="btn primary" data-close>Pronto</button></div>`),n={quality:e.quality,timeOfDay:e.timeOfDay},r=()=>this.handlers.settingsChanged({...e},e.quality!==n.quality||e.timeOfDay!==n.timeOfDay);this.seg(t,`quality`,e.quality,t=>{e.quality=t,r()}),this.seg(t,`tod`,e.timeOfDay,t=>{e.timeOfDay=t,r()}),this.seg(t,`wind`,e.wind,t=>{e.wind=t,r()}),this.seg(t,`foot`,e.foot,t=>{e.foot=t,r()}),this.seg(t,`kcam`,e.kickerCamera,t=>{e.kickerCamera=t,r()}),this.seg(t,`gcam`,e.keeperCamera,t=>{e.keeperCamera=t,r()}),this.seg(t,`diff`,e.difficulty,t=>{e.difficulty=t,r()}),t.querySelectorAll(`[data-t]`).forEach(t=>{let n=t.dataset.t;t.setAttribute(`aria-pressed`,String(e[n])),t.addEventListener(`click`,()=>{e[n]=!e[n],t.setAttribute(`aria-pressed`,String(e[n])),r()})});for(let n of[`master`,`crowd`,`sfx`]){let i=$(`#v-${n}`,t);i.addEventListener(`input`,()=>{e[n]=Number(i.value),r()})}}buildHud(){this.hud.innerHTML=`
      <div class="scorebug"><div class="sb-main" id="sb"></div><div class="sb-info" id="sb-info"></div><div id="sb-marks"></div></div>
      <div class="help" id="help"></div>
      <div class="card-p" id="keeper-card"></div>
      <div class="card-p" id="kicker-card"></div>
      <div class="label-top" id="label-top"></div>
      <div class="kick-ctl" id="kick-ctl">
        <div class="techs" id="techs"></div>
        <div class="setup-line" id="setup-line"></div>
        <div class="power" id="power"><div class="red"></div><i></i></div>
      </div>
      <div class="indicators" id="indicators">
        <div class="ind"><span>Efeito</span><div class="spinball" id="spinball"><i></i></div></div>
        <div class="ind"><span>Altura</span><div class="hbar" id="hbar"><div class="bar-top"></div><i></i></div><b id="h-val">0,0</b></div>
        <div class="ind"><span>Direção</span><b class="dir" id="dir-val">0°</b><span id="dist-val"></span></div>
      </div>
      <div class="timing hidden" id="timing"><div class="target"></div><div class="closing"></div></div>
      <div class="timing-label hidden" id="timing-label"></div>`;let e=$(`.bar-top`,$(`#hbar`,this.hud));e.style.bottom=`${Q.height/3.2*100}%`;let t=$(`#techs`,this.hud);t.innerHTML=id.map((e,t)=>`<button data-t="${e}" title="${dp(rd[e].description)}"><kbd>${t+1}</kbd>${rd[e].label}</button>`).join(``),t.querySelectorAll(`button`).forEach(e=>e.addEventListener(`click`,t=>{t.stopPropagation(),this.techClick?.(e.dataset.t),e.blur()}));let n=$(`#power`,this.hud);for(let e of[.25,.5,.75]){let t=document.createElement(`div`);t.className=`tick`,t.style.left=`${e/1.15*100}%`,n.appendChild(t)}}showHud(e,t){this.hud.classList.remove(`hidden`),$(`#kick-ctl`,this.hud).classList.toggle(`hidden`,e!==`kick`),$(`#indicators`,this.hud).classList.toggle(`hidden`,e!==`kick`),this.touch.classList.toggle(`hidden`,!t),this.buildTouch(e)}hideHud(){this.hud.classList.add(`hidden`),this.touch.classList.add(`hidden`)}setKickControlsVisible(e){$(`#kick-ctl`,this.hud).style.opacity=e?`1`:`0.0`,$(`#indicators`,this.hud).style.opacity=e?`1`:`0.25`}touchHandlers=null;buildTouch(e){this.touch.innerHTML=`
      <button id="t-action">${e===`kick`?`Chutar`:`Saltar`}</button>
      ${e===`kick`?`<button id="t-stutter">Paradinha</button><button id="t-faster">+</button><button id="t-slower">−</button>`:``}
      <button id="t-cam">Cam</button><button id="t-pause" aria-label="Pausar">II</button>`;let t=()=>this.touchHandlers,n=(e,t)=>{let n=this.touch.querySelector(`#`+e);n&&(n.addEventListener(`pointerdown`,e=>{e.preventDefault(),t(!0)}),n.addEventListener(`pointerup`,e=>{e.preventDefault(),t(!1)}),n.addEventListener(`pointercancel`,()=>t(!1)),n.addEventListener(`pointerleave`,()=>t(!1)))};n(`t-action`,e=>t().action(e)),n(`t-faster`,e=>t().faster(e)),n(`t-slower`,e=>t().slower(e)),this.touch.querySelector(`#t-stutter`)?.addEventListener(`pointerdown`,()=>t().stutter()),this.touch.querySelector(`#t-cam`)?.addEventListener(`click`,()=>t().camera()),this.touch.querySelector(`#t-pause`)?.addEventListener(`click`,()=>t().pause())}setScoreboard(e){let t=e=>`<div class="sb-team"><span class="sh">${dp(e.short)}</span><span class="g">${e.goals}</span></div>`;$(`#sb`,this.hud).innerHTML=t(e.left)+(e.right?`<div class="sb-sep"></div>${t(e.right)}`:``),$(`#sb-info`,this.hud).textContent=e.info;let n=e=>e.marks.length?`<div class="marks-row"><span style="width:34px">${dp(e.short.slice(0,3))}</span><div class="marks">${e.marks.map(e=>`<i class="${e}"></i>`).join(``)}</div></div>`:``;$(`#sb-marks`,this.hud).innerHTML=n(e.left)+(e.right?n(e.right):``)}setKickerCard(e,t,n,r,i,a){$(`#kicker-card`,this.hud).innerHTML=`<div class="no">${t}</div><div><div class="nm">${dp(e)}</div><div class="sub">${dp(i)} · pé ${n===`right`?`direito`:`esquerdo`}${a?``:` · CPU`}</div>
      <div class="attrs"><span>PRE <b>${r.precision}</b></span><span>POT <b>${r.power}</b></span><span>EFE <b>${r.curl}</b></span><span>FRI <b>${r.composure}</b></span></div></div>`}setKeeperCard(e,t){let n=$(`#keeper-card`,this.hud);if(t===`none`){n.innerHTML=`<div><div class="nm">Gol vazio</div><div class="sub">treino sem goleiro</div></div>`;return}let r=t===`user`?null:Hf[t];n.innerHTML=`<div class="no">GK</div><div><div class="nm">${dp(e)}</div><div class="sub">${t===`user`?`Você defende`:`<span class="chip lvl-${t}">${r.label}</span> &nbsp;rating ${r.rating}`}</div>
      ${r?`<div class="attrs"><span>REAÇÃO <b>${Math.round(r.reaction*1e3)} ms</b></span><span>IMPULSO <b>${r.maxLateral.toFixed(1)} m/s</b></span></div>`:``}</div>`}setTechnique(e){$(`#techs`,this.hud).querySelectorAll(`button`).forEach(t=>t.setAttribute(`aria-pressed`,String(t.dataset.t===e)))}setSetup(e){let t=$(`#setup-line`,this.hud),n=Math.round(e.angle*180/Math.PI);t.innerHTML=`<span>Corrida <b>${e.distance.toFixed(1)} m</b>${e.editable?` <button data-s="d-">−</button><button data-s="d+">+</button>`:``}</span>
      <span>Ângulo <b>${n}°</b>${e.editable?` <button data-s="a-">−</button><button data-s="a+">+</button>`:``}</span>
      <span>Ritmo <b>${e.tempo.toFixed(1)} m/s</b>${e.editable?` <button data-s="t-">−</button><button data-s="t+">+</button>`:``}</span>
      <span>Pé <b>${e.foot===`right`?`D`:`E`}</b>${e.editable?` <button data-s="f">⇄</button>`:``}</span>`,t.querySelectorAll(`button`).forEach(e=>e.addEventListener(`click`,t=>{t.stopPropagation(),this.setupClick?.(e.dataset.s)}))}setPower(e){$(`#power i`,this.hud).style.width=`${Math.min(1,e/1.15)*100}%`}setIndicators(e,t,n,r){let i=$(`#hbar i`,this.hud);i.style.bottom=`${Math.max(0,Math.min(1,e/3.2))*100}%`,$(`#h-val`,this.hud).textContent=e.toFixed(2).replace(`.`,`,`)+` m`,$(`#dir-val`,this.hud).textContent=`${t>0?`→`:t<0?`←`:``} ${Math.abs(t).toFixed(1)}°`,$(`#dist-val`,this.hud).textContent=n>0?`${n.toFixed(2)} m`:``;let a=$(`#spinball i`,this.hud);a.style.left=`${50+r.x*40}%`,a.style.top=`${50-r.y*40}%`}setTiming(e,t,n,r){let i=$(`#timing`,this.hud);i.classList.toggle(`hidden`,!e),e&&($(`.closing`,i).style.transform=`scale(${.37+t*.63})`);let a=$(`#timing-label`,this.hud);a.classList.toggle(`hidden`,!n),n&&(a.textContent=n,a.style.color=r??`#fff`)}setHelp(e){$(`#help`,this.hud).innerHTML=e}setLabel(e,t){let n=$(`#label-top`,this.hud);n.innerHTML=t?`<small>${dp(e)}</small>${dp(t)}`:``,n.style.opacity=t?`1`:`0`}banner(e,t){this.bannerEl?.remove();let n=document.createElement(`div`);n.className=`banner ${t}`,n.textContent=e,this.root.appendChild(n),this.bannerEl=n,setTimeout(()=>{this.bannerEl===n&&(n.remove(),this.bannerEl=null)},1900)}toast(e,t=2200){let n=this.root.querySelector(`.toast`);n||(n=document.createElement(`div`),n.className=`toast`,this.root.appendChild(n)),n.textContent=e,clearTimeout(this.toastTimer),this.toastTimer=window.setTimeout(()=>n?.remove(),t)}showResult(e,t,n,r=`Próxima cobrança`){let i=this.result;i.classList.remove(`hidden`);let a=`${e.dirH>=0?`Direita`:`Esquerda`} ${Math.abs(e.dirH).toFixed(1)}° · ${e.dirV.toFixed(1)}°↑`,o=e.timing===null?`sem timing`:Math.abs(e.timing)<.12?`perfeito`:e.timing<0?`cedo ${Math.round(-e.timing*100)}%`:`tarde ${Math.round(e.timing*100)}%`;i.innerHTML=`
      <div class="out ${fp[e.outcome]}">${dp(e.outcomeLabel)}</div>
      ${t?`<div class="mode-msg">${dp(t)}</div>`:``}
      <div class="stat-grid">
        <div><b>${e.speedKmh.toFixed(1)}</b><span>km/h</span></div>
        <div><b>${e.flightTime.toFixed(2)} s</b><span>voo até o gol</span></div>
        <div><b>${e.distance.toFixed(1)} m</b><span>percorridos</span></div>
        <div><b>${e.maxHeight.toFixed(2)} m</b><span>altura máx.</span></div>
        <div><b>${Math.round(e.precisionCm)} cm</b><span>da mira</span></div>
        <div><b>${Math.round(e.spinRpm)}</b><span>rpm</span></div>
        <div><b>${Math.round(e.curveCm)} cm</b><span>curva</span></div>
        <div><b>${Math.round(e.quality)}</b><span>qualidade</span></div>
        <div><b style="font-size:15px">${dp(e.technique)}</b><span>${o}</span></div>
      </div>
      <div style="font-size:12.5px;color:var(--mute)">${a}${e.keeperRead?` · goleiro leu: `+dp(e.keeperRead):``}</div>
      <div class="maps"><canvas id="goalmap" width="400" height="160"></canvas><canvas id="ballmap" width="84" height="84" title="Ponto de contato na bola"></canvas></div>
      ${e.notes.length?`<div class="notes">${e.notes.map(e=>`<span>${dp(e)}</span>`).join(``)}</div>`:``}
      <div class="actions"><button class="btn ghost" data-menu>Menu</button><button class="btn" data-replay>Replay <kbd>R</kbd></button><button class="btn primary" data-next>${dp(r)}</button></div>`,hp($(`#goalmap`,i),e),gp($(`#ballmap`,i),e.contactOffset),$(`[data-replay]`,i).addEventListener(`click`,n.replay),$(`[data-next]`,i).addEventListener(`click`,n.next),$(`[data-menu]`,i).addEventListener(`click`,n.menu)}hideResult(){this.result.classList.add(`hidden`)}showSummary(e,t){let n=this.openPanel(`
      <h3>Fim de jogo</h3><h2 style="color:${e.win?`var(--gold)`:`var(--text)`}">${dp(e.title)}</h2>
      <table class="tbl"><tbody>${e.lines.map(([e,t])=>`<tr><td>${dp(e)}</td><td><b>${dp(t)}</b></td></tr>`).join(``)}</tbody></table>
      <div class="actions"><button class="btn ghost" data-menu>Menu principal</button><button class="btn primary" data-again>Jogar de novo</button></div>`);$(`[data-again]`,n).addEventListener(`click`,()=>{this.closePanel(),t.again()}),$(`[data-menu]`,n).addEventListener(`click`,()=>{this.closePanel(),t.menu()})}showReplayBar(e,t){let n=this.replayBar;n.classList.remove(`hidden`),n.innerHTML=`<span class="lbl">REPLAY</span>
      <button class="btn" data-a="play" aria-label="Pausar ou continuar">⏯</button>
      <div class="seg" data-seg="speed"><button data-v="0.1">0,1×</button><button data-v="0.25">0,25×</button><button data-v="0.5">0,5×</button><button data-v="1">1×</button></div>
      <input type="range" id="rp-seek" min="0" max="${t.toFixed(2)}" step="0.005" value="0" aria-label="Linha do tempo">
      <button class="btn" data-a="angle">Ângulo</button><button class="btn" data-a="contact">Contato</button><button class="btn" data-a="trail">Trajetória</button><button class="btn primary" data-a="close">Fechar</button>`;let r=this.root.querySelector(`.replay-tag`);r||(r=document.createElement(`div`),r.className=`replay-tag`,r.textContent=`REPLAY`,this.root.appendChild(r)),this.seg(n,`speed`,`0.25`,t=>e.speed(Number(t))),n.querySelector(`[data-a="play"]`).addEventListener(`click`,e.toggle),n.querySelector(`[data-a="angle"]`).addEventListener(`click`,e.angle),n.querySelector(`[data-a="contact"]`).addEventListener(`click`,e.contact),n.querySelector(`[data-a="trail"]`).addEventListener(`click`,e.trail),n.querySelector(`[data-a="close"]`).addEventListener(`click`,e.close);let i=$(`#rp-seek`,n);i.addEventListener(`input`,()=>e.seek(Number(i.value)))}updateReplayTime(e){let t=this.replayBar.querySelector(`#rp-seek`);t&&document.activeElement!==t&&(t.value=String(e))}hideReplayBar(){this.replayBar.classList.add(`hidden`),this.root.querySelector(`.replay-tag`)?.remove()}showPause(e){this.hidePause();let t=document.createElement(`div`);t.className=`panel`,t.innerHTML=`<div class="card" style="width:min(380px,100%)"><h2>Pausa</h2>
      <button class="btn primary" data-r>Continuar</button><button class="btn" data-s>Configurações</button><button class="btn" data-x>Recomeçar modo</button><button class="btn ghost" data-m>Menu principal</button></div>`,this.root.appendChild(t),this.pause=t,$(`[data-r]`,t).addEventListener(`click`,e.resume),$(`[data-s]`,t).addEventListener(`click`,e.settings),$(`[data-x]`,t).addEventListener(`click`,e.restart),$(`[data-m]`,t).addEventListener(`click`,e.menu)}hidePause(){this.pause?.remove(),this.pause=null}get paused(){return!!this.pause}get panelOpen(){return!!this.panelEl}};function mp(e,t,n,r=.9){let i=(Q.halfWidth+r)*2,a=Q.height+r*.8,o=Math.min(t/i,n/a),s=t/2,c=n-6,l=(e,t)=>[s+e*o,c-t*o];e.fillStyle=`rgba(255,255,255,0.04)`,e.fillRect(0,0,t,n),e.strokeStyle=`rgba(255,255,255,0.08)`,e.lineWidth=1;let[u,d]=l(-Q.halfWidth,0),[f,p]=l(Q.halfWidth,Q.height);for(let t=u;t<f;t+=9)e.beginPath(),e.moveTo(t,d),e.lineTo(t,p),e.stroke();for(let t=p;t<d;t+=9)e.beginPath(),e.moveTo(u,t),e.lineTo(f,t),e.stroke();return e.strokeStyle=`#f4f6f8`,e.lineWidth=Math.max(2,.12*o),e.beginPath(),e.moveTo(u,d),e.lineTo(u,p),e.lineTo(f,p),e.lineTo(f,d),e.stroke(),e.strokeStyle=`rgba(255,255,255,0.3)`,e.lineWidth=1,e.beginPath(),e.moveTo(0,d+.5),e.lineTo(t,d+.5),e.stroke(),{toPx:l,s:o}}function hp(e,t){let n=e.getContext(`2d`),{toPx:r,s:i}=mp(n,e.width,e.height),[a,o]=r(t.aim.x,t.aim.y);n.strokeStyle=`#f2b636`,n.lineWidth=2,n.beginPath(),n.arc(a,o,7,0,Math.PI*2),n.moveTo(a-11,o),n.lineTo(a+11,o),n.moveTo(a,o-11),n.lineTo(a,o+11),n.stroke();let[s,c]=r(t.crossing.x,Math.max(0,t.crossing.y));if(n.fillStyle=t.outcome===`goal`?`#3ddc8f`:`#ff5d5d`,n.beginPath(),n.arc(s,c,Math.max(4,.11*i),0,Math.PI*2),n.fill(),t.contactMark){let[e,i]=r(t.contactMark.x,t.contactMark.y);n.strokeStyle=t.contactMark.kind===`keeper`?`#6cb8ff`:`#ffffff`,n.lineWidth=2.5,n.beginPath(),n.moveTo(e-6,i-6),n.lineTo(e+6,i+6),n.moveTo(e+6,i-6),n.lineTo(e-6,i+6),n.stroke()}n.fillStyle=`#93a1b5`,n.font=`600 11px Archivo, sans-serif`,n.fillText(t.contactMark?.kind===`keeper`?`✕ defesa   ● direção da bola   ⊕ mira`:`● cruzamento   ⊕ mira`,8,14)}function gp(e,t){let n=e.getContext(`2d`),r=e.width,i=r/2-6;n.clearRect(0,0,r,r);let a=n.createRadialGradient(r*.4,r*.36,2,r/2,r/2,i);a.addColorStop(0,`#ffffff`),a.addColorStop(1,`#9aa3ad`),n.fillStyle=a,n.beginPath(),n.arc(r/2,r/2,i,0,Math.PI*2),n.fill(),n.strokeStyle=`rgba(0,0,0,0.25)`,n.beginPath(),n.moveTo(r/2,6),n.lineTo(r/2,r-6),n.moveTo(6,r/2),n.lineTo(r-6,r/2),n.stroke();let o=r/2+t.x/.11*i,s=r/2-t.y/.11*i;n.fillStyle=`#c98d12`,n.beginPath(),n.arc(o,s,5.5,0,Math.PI*2),n.fill(),n.fillStyle=`#0b1018`,n.font=`700 9px Archivo, sans-serif`,n.textAlign=`center`,n.fillText(`CONTATO`,r/2,r-2)}function _p(e,t){let n=e.getContext(`2d`),{toPx:r}=mp(n,e.width,e.height,1.2);for(let e of t){let[t,i]=r(e.x,Math.max(0,Math.min(3.4,e.y)));n.fillStyle=e.outcome===`goal`?`rgba(61,220,143,0.75)`:e.outcome===`saved`?`rgba(108,184,255,0.75)`:`rgba(255,93,93,0.75)`,n.beginPath(),n.arc(t,i,4,0,Math.PI*2),n.fill()}n.fillStyle=`#93a1b5`,n.font=`600 13px Archivo, sans-serif`,n.fillText(`● gol   ● defesa   ● fora/trave`,10,18),t.length||n.fillText(`Sem cobranças registradas`,e.width/2-80,e.height/2)}function vp(e,t){let n=e.getContext(`2d`),r=e.width,i=e.height;n.clearRect(0,0,r,i);let a=[];for(let e=9;e<t.length;e++){let n=0;for(let r=e-9;r<=e;r++)n+=Math.min(300,t[r].precision);a.push(n/10)}let o=Math.max(60,...a)*1.1;n.strokeStyle=`rgba(255,255,255,0.08)`,n.fillStyle=`#93a1b5`,n.font=`600 12px Archivo, sans-serif`;for(let e=0;e<=4;e++){let t=o*e/4,a=i-34-(i-68)*e/4;n.beginPath(),n.moveTo(34,a),n.lineTo(r-10,a),n.stroke(),n.fillText(String(Math.round(t)),4,a+4)}if(a.length<2){n.fillText(`Faça pelo menos 11 cobranças`,r/2-90,i/2);return}let s=e=>34+(r-34-10)*e/(a.length-1),c=e=>i-34-(i-68)*e/o;n.beginPath(),n.moveTo(s(0),c(a[0])),a.forEach((e,t)=>n.lineTo(s(t),c(e))),n.lineTo(s(a.length-1),i-34),n.lineTo(s(0),i-34),n.closePath(),n.fillStyle=`rgba(242,182,54,0.12)`,n.fill(),n.beginPath(),a.forEach((e,t)=>t?n.lineTo(s(t),c(e)):n.moveTo(s(t),c(e))),n.strokeStyle=`#f2b636`,n.lineWidth=2,n.stroke(),n.fillStyle=`#f2b636`,n.beginPath(),n.arc(s(a.length-1),c(a[a.length-1]),4,0,Math.PI*2),n.fill()}function yp(e,t,n){let r=Wd(t),i=[`placed`,`power`,`low`,`curl`,`center`,`chip`,`trivela`],a=[.32,.24,.16,.12,.08,.04,.04],o=e.favorite;if(r()>.62){let e=r();for(let t=0;t<i.length;t++)if(e-=a[t],e<=0){o=i[t];break}}let s=r()<.5?-1:1,c=s*(2+r()*1.25),l=.3+r()*1.7,u=.76+r()*.2;switch(o){case`placed`:l=.25+r()*.9,u=.7+r()*.22;break;case`low`:l=.18+r()*.25;break;case`power`:l=.9+r()*1.25,u=.85+r()*.2;break;case`curl`:c=s*(2.4+r()*.9),l=.8+r()*1.2;break;case`trivela`:l=.6+r()*1.2;break;case`center`:c=(r()-.5)*.9,l=.9+r()*1.1,u=.85+r()*.15;break;case`chip`:c=(r()-.5)*1.4,l=1.2+r()*.8,u=.45+r()*.25}let d=n*(1.1-e.attrs.composure/100),f=(r()-.5)*(.06+.16*d)*(1.25-e.attrs.precision/100);return{intent:{technique:o,foot:e.foot,power:u,target:{x:c,y:l},spinPitch:0,spinYaw:0,approachSpeed:e.run.tempo},run:{...e.run},timingOffset:f,stutter:o===`center`||o===`chip`?r()<.5:r()<.08,speedInput:(r()-.5)*.4}}var bp=new Map;function xp(e,t){let n=bp.get(e)??{left:0,right:0,center:0,last:[]},r=t<-.9?`L`:t>.9?`R`:`C`;r===`L`?n.left++:r===`R`?n.right++:n.center++,n.last.push(r),n.last.length>6&&n.last.shift(),bp.set(e,n)}var Sp=new W,Cp=Kl();function wp(e,t,n,r=1.5){let i=e.p.clone(),a=e.v.clone(),o=t===`full`?e.w.clone():new W,s=e.q.clone(),c=1/120,l=0;if(a.z>=-.3)return{point:i,time:1/0,speed:a.length(),valid:!1};for(;l<r;){let e=i.z;if(t===`linear`?Sp.set(0,0,0):t===`ballistic`?Sp.set(0,-zl,0):tu(a,o,s,Cp,Sp),a.addScaledVector(Sp,c),i.addScaledVector(a,c),i.y<.11&&a.y<0&&t!==`linear`&&(i.y=.11,a.y=-a.y*.6),l+=c,i.z<=n){let t=(e-n)/(e-i.z);return i.addScaledVector(a,-.008333333333333333*(1-t)),{point:i,time:l-c*(1-t),speed:a.length(),valid:!0}}}return{point:i,time:r,speed:a.length(),valid:!1}}var Tp=class{body;profile;state=`watch`;lockedContactTime=-1;hopped=!1;reacted=!1;replanTimer=0;clock=0;committedX=null;lastPrediction=null;readNote=``;constructor(e,t){this.body=e,this.profile=t}reset(){this.state=`watch`,this.lockedContactTime=-1,this.hopped=!1,this.reacted=!1,this.replanTimer=0,this.clock=0,this.committedX=null,this.lastPrediction=null,this.readNote=``}update(e,t){this.clock+=e;let n=this.profile,r=this.body,i=t.cues;if(!t.kicked){let e=i.phase===`run`?.09*Math.sin(this.clock*3.1):0;this.state===`watch`&&r.setShuffle(e);let a=i.inferredTimeToContact;n.rhythmTimer&&this.lockedContactTime<0&&i.phase===`run`&&a<.75&&(this.lockedContactTime=this.clock+a);let o=n.rhythmTimer&&this.lockedContactTime>0?this.lockedContactTime-this.clock:a;if(!this.hopped&&o<.24&&o>0&&(i.phase===`run`||i.phase===`swing`)&&(!n.rhythmTimer&&i.stuttering||(this.hopped=!0,r.splitStep())),this.state===`watch`){let e=this.readTaker(i,t.takerId),r=o+n.commitLead,a=n.cueRead===0||i.plantYaw!==null||n.rhythmTimer;e&&a&&r<=0&&e.conf>=n.commitThreshold&&Math.abs(e.x)>1&&this.commit(e.x,e.y,Math.max(.3,i.approachSpeed>0?.42:.45))}return}if(t.sinceKick<n.reaction)return;let a=r.com.z+.2;if(this.replanTimer-=e,this.replanTimer<=0){this.replanTimer=1/30;let e=wp(t.ball,n.model,a);if(this.lastPrediction=e,!e.valid){r.handTarget.L=r.handTarget.R=null;return}this.reacted||(this.reacted=!0,(this.state===`watch`||this.state===`committed`&&n.adjustPush&&r.phase===`push`)&&this.respond(e),this.state=`tracking`),this.trackHands(e)}}readTaker(e,t){let n=this.profile,r=e.foot===`right`?1:-1,i=Math.atan2(Math.sin(e.runYaw),-Math.cos(e.runYaw)),a=-r*2.4,o=a,s=.3,c=`lado natural`;if(e.plantYaw!==null&&n.cueRead>0){let t=i+(Math.atan2(Math.sin(e.plantYaw),-Math.cos(e.plantYaw))-i)/.75,r=Math.tan(Math.max(-.5,Math.min(.5,t)))*(11-Q.postZ);o=(1-n.cueRead)*a+n.cueRead*r,s=.25+.6*n.cueRead*Math.min(1,Math.abs(r)/2.2),c=`pé de apoio`}let l=bp.get(t);if(l&&n.memory>0){let e=l.left+l.right+l.center+2,t=(l.right-l.left)/e;o+=n.memory*t*3,s+=n.memory*Math.abs(t)*.8,Math.abs(t)>.2&&(c+=` + histórico`)}return this.readNote=c,n.cueRead===0&&n.memory===0?{x:a,y:.9,conf:1}:{x:Math.max(-3.3,Math.min(3.3,o)),y:.9,conf:s}}commit(e,t,n){this.state=`committed`,this.committedX=e,this.body.dive({target:new W(e,t,this.body.com.z+.25),arrival:n,mode:`dive`})}respond(e){let t=this.body,n=e.point,r=n.x-t.com.x,i=Math.abs(r),a=`dive`;i<.45&&n.y>.35&&n.y<1.95?a=`stand`:i<.85&&n.y<=.35&&e.time<.32?a=`foot`:i<1.25&&n.y<.6?a=`collapse`:i<1.1&&n.y>=1.95&&(a=`jump`),t.dive({target:n.clone(),arrival:e.time,mode:a})}trackHands(e){let t=this.body,n=e.point,r=e.speed>this.profile.catchSpeed,i=Math.sign(n.x-t.com.x)||1,a=r||Math.abs(n.x)>Q.halfWidth-.8,o=a?.18:0,s=a&&n.y>1.8?.12:0,c=n.clone();c.x+=i*o,c.y+=s,c.z+=.05;let l=.11,u=c.clone(),d=c.clone();u.x-=l,d.x+=l,t.handTarget.L=d,t.handTarget.R=u}},Ep=new W(0,1,0),Dp=new W(0,0,1),Op=new W(1,0,0),kp=.12,Ap=class{rig;profile;phase=`ready`;t=0;com=new W(0,.95,kp);vel=new W;roll=0;pitch=.18;readyHeight=.92;feet={L:new W(.27,0,.06999999999999999),R:new W(-.27,0,.06999999999999999)};feetGround={L:!0,R:!0};shuffleTarget=0;pushDur=.18;launch=new W;pushStartVel=new W;diveSign=0;rollTarget=0;mode=`dive`;handTarget={L:null,R:null};handOff={L:new W(.12,-.42,.28),R:new W(-.12,-.42,.28)};footBlock=null;footBlockSide=`L`;pendingDive=null;holding=!1;reaction=null;reactT=0;idleT=0;airborneAt=-1;capsules=[];capDefs=[];clock=0;constructor(e,t){this.rig=e,this.profile=t,this.buildCapsules(),this.resetToLine(0)}resetToLine(e){this.phase=`ready`,this.t=0,this.com.set(e,this.readyHeight,kp),this.vel.set(0,0,0),this.roll=0,this.pitch=.18,this.feet.L.set(e+.27,0,.07999999999999999),this.feet.R.set(e-.27,0,.07999999999999999),this.feetGround.L=this.feetGround.R=!0,this.shuffleTarget=e,this.handTarget.L=this.handTarget.R=null,this.handOff.L.set(.14,-.42,.26),this.handOff.R.set(-.14,-.42,.26),this.footBlock=null,this.pendingDive=null,this.holding=!1,this.reaction=null,this.airborneAt=-1,this.diveSign=0,this.pose();for(let e of this.capDefs)e.cap.settle()}get grounded(){return this.phase===`ready`||this.phase===`push`||this.phase===`ground`||this.phase===`recover`||this.phase===`hold`}feetOnLine(){let e=-Q.lineWidth-.05,t=t=>this.feetGround[t]&&this.feet[t].z>e&&this.feet[t].z<.4;return t(`L`)||t(`R`)}setShuffle(e){this.shuffleTarget=X(e,-2.5,2.5)}splitStep(){this.phase===`ready`&&(this.phase=`hop`,this.t=0,this.vel.y=1.15)}dive(e){if(this.phase===`hop`){this.pendingDive=e;return}if(this.phase!==`ready`&&!(this.phase===`push`&&this.profile.adjustPush))return;this.mode=e.mode;let t=this.profile,n=this.com,r=e.target,i=r.x-n.x,a=this.rig.prop.hipsY*0+1.12*(this.rig.dims.height/1.86);if(e.mode===`stand`||e.mode===`foot`){this.footBlock=e.mode===`foot`?r.clone():null,this.footBlockSide=i>0?`L`:`R`,this.phase=`ready`,this.shuffleTarget=X(n.x+i*.4,-3,3);return}this.diveSign=e.mode===`jump`?Math.sign(i)*.2:Math.sign(i)||1;let o=Math.min(1,Math.abs(i)/3);this.pushDur=e.mode===`collapse`?t.pushTime*.6:t.pushTime*(.75+.3*o),this.phase===`push`&&(this.pushDur=Math.max(this.t+.04,this.pushDur));let s=new W(i,r.y-n.y,0),c=s.length(),l=e.mode===`collapse`?a*.85:a*.97,u=new W().copy(n);c>l&&u.addScaledVector(s.normalize(),c-l);let d=Math.max(.06,e.arrival-this.pushDur*.55),f=d+this.pushDur*.5,p=(u.x-n.x)/f,m=(u.y-n.y+.5*zl*d*d)/d;e.mode===`collapse`&&(m=Math.min(m,.6)),e.mode===`jump`&&(p*=.6),p=X(p,-t.maxLateral,t.maxLateral),m=X(m,-.6,t.maxVertical);let h=Math.hypot(t.maxLateral,t.maxVertical*.8),g=Math.hypot(p,m);g>h&&(p*=h/g,m*=h/g);let _=X((r.z-n.z)/Math.max(.2,f),-.3,1.1);this.launch.set(p,m,_);let v=Math.atan2(Math.abs(i),Math.max(-.4,r.y-n.y+.25));this.rollTarget=Math.sign(i)*X(v,0,e.mode===`jump`?.5:1.62),this.phase!==`push`&&(this.phase=`push`,this.t=0,this.pushStartVel.copy(this.vel))}react(e){this.reaction=e,this.reactT=0}update(e,t){this.clock+=e,this.t+=e,this.idleT+=e;let n=this.profile,r=this.com;switch(this.phase){case`ready`:{let t=X((this.shuffleTarget-r.x)*6,-n.shuffleSpeed,n.shuffleSpeed);this.vel.x+=(t-this.vel.x)*bl(e,.08),this.vel.y=0,this.vel.z=0,r.x+=this.vel.x*e;let i=.012*Math.sin(this.idleT*4.2);r.y+=(this.readyHeight+i-(this.footBlock?.25:0)-r.y)*bl(e,.1),r.z+=(kp+(this.footBlock?.1:0)-r.z)*bl(e,.2),this.roll+=(0-this.roll)*bl(e,.15),this.updateFeetShuffle(e),this.reaction&&(this.reactT+=e);break}case`hop`:this.vel.y-=zl*e,r.y+=this.vel.y*e,this.feetGround.L=this.feetGround.R=!1;for(let e of[`L`,`R`])this.feet[e].y=Math.max(0,r.y-this.readyHeight);if(r.y<=this.readyHeight-.03&&this.vel.y<0&&(r.y=this.readyHeight-.03,this.vel.y=0,this.feet.L.y=this.feet.R.y=0,this.feetGround.L=this.feetGround.R=!0,this.phase=`ready`,this.t=0,this.pendingDive)){let e=this.pendingDive;this.pendingDive=null,e.arrival-=0,this.dive(e)}break;case`push`:{let t=X(this.t/this.pushDur,0,1),i=vl(t);this.vel.lerpVectors(this.pushStartVel,this.launch,i),t<.35?this.vel.y=_l(this.pushStartVel.y,-.6,t/.35)*(this.mode===`collapse`?1.5:1):this.vel.y=_l(-.6,this.launch.y,(t-.35)/.65),r.addScaledVector(this.vel,e),this.roll+=X(this.rollTarget*.35*i-this.roll,-n.rollRate*e,n.rollRate*e);let a=this.diveSign>0?`L`:`R`,o=a===`L`?`R`:`L`;t<.6&&(this.feet[a].x+=this.diveSign*1.2*e,this.feet[a].y=Math.sin(Math.PI*t/.6)*.06,this.feetGround[a]=t>.5),this.feetGround[o]=!0,t>=1&&(this.phase=`air`,this.t=0,this.vel.copy(this.launch),this.feetGround.L=this.feetGround.R=!1);break}case`air`:{this.vel.y-=zl*e,r.addScaledVector(this.vel,e),this.roll+=X(this.rollTarget-this.roll,-n.rollRate*e,n.rollRate*e);let t=.17+.6*Math.cos(X(Math.abs(this.roll),0,Math.PI/2));r.y<=t&&this.vel.y<0&&(r.y=t,this.phase=`ground`,this.t=0,this.vel.y=0);break}case`ground`:{let t=Math.hypot(this.vel.x,this.vel.z),n=Math.min(t,7*e);t>1e-4&&(this.vel.x*=(t-n)/t,this.vel.z*=(t-n)/t),r.addScaledVector(this.vel,e);let i=Math.sign(this.roll||this.diveSign||1)*1.45;this.roll+=X(i-this.roll,-3*e,3*e),r.y+=(.2-r.y)*bl(e,.08),this.t>(this.holding?.9:.8)&&(this.phase=`recover`,this.t=0);break}case`recover`:{let t=X(this.t/1,0,1);this.roll=_l(this.roll,0,vl(t)*.15),r.y=_l(r.y,this.readyHeight+.05,bl(e,.25)),this.vel.set(0,0,0),t>=1&&(this.phase=this.holding?`hold`:`ready`,this.t=0,this.shuffleTarget=r.x,this.feet.L.set(r.x+.22,0,r.z-.05),this.feet.R.set(r.x-.22,0,r.z-.05),this.feetGround.L=this.feetGround.R=!0);break}case`hold`:case`react`:this.reactT+=e,r.y+=(this.readyHeight+.06-r.y)*bl(e,.3),this.roll+=(0-this.roll)*bl(e,.2)}this.airborneAt<0&&!this.feetGround.L&&!this.feetGround.R&&(this.airborneAt=this.clock),(this.feetGround.L||this.feetGround.R)&&(this.airborneAt=-1),this.updateHands(e,t),this.pose(),this.updateCapsules()}updateFeetShuffle(e){let t=this.com,n={L:t.x+.27,R:t.x-.27};for(let t of[`L`,`R`]){let r=this.feet[t],i=n[t]-r.x,a=this.feet[t===`L`?`R`:`L`];if(Math.abs(i)>.08&&a.y<=.001){let n=X(i,-3.2*e,3.2*e);r.x+=n,r.y=Math.min(.06,r.y+.6*e),this.feetGround[t]=!1}else r.y=Math.max(0,r.y-.8*e),this.feetGround[t]=r.y<=.001;r.z+=(.07999999999999999-r.z)*bl(e,.1)}}shoulder(e,t){return this.rig.worldPos(e===`L`?`upperArmL`:`upperArmR`,t)}_sh=new W;_d=new W;updateHands(e,t){let n=this.profile,r=this.rig.prop.upperArm+this.rig.prop.foreArm+.1,i=new W(0,1,0).applyAxisAngle(Dp,-this.roll),a=new W(1,0,0).applyAxisAngle(Dp,-this.roll);for(let t of[`L`,`R`]){let o=t===`L`?1:-1,s=this.shoulder(t,this._sh),c,l=this.handTarget[t];if(this.holding)c=new W(o*-.08,-.25,.3).applyAxisAngle(Dp,-this.roll);else if(l)c=this._d.subVectors(l,s).clone();else if(this.phase===`air`||this.phase===`push`)c=i.clone().multiplyScalar(.62).addScaledVector(a,o*.08).addScaledVector(Dp,.15);else if(this.phase===`ground`)c=i.clone().multiplyScalar(.45).addScaledVector(Dp,.2);else if(this.reaction===`save`&&this.reactT>.3){let e=Math.sin(X((this.reactT-.3)*6,0,Math.PI));c=new W(o*.15,-.35+(t===`L`?.75*e:0),.2)}else c=this.reaction===`goal`?new W(o*.18,-.55,.05):new W(o*.17,-.4,.27);c.length()>r&&c.setLength(r);let u=this.handOff[t],d=c.sub(u),f=n.armSpeed*e;d.length()>f&&d.setLength(f),u.add(d)}}pose(){let e=this.rig,t=e.prop;e.resetPose();let n=this.com;e.root.position.set(0,0,0),e.root.quaternion.identity();let r=e.bones.hips;r.position.copy(n);let i=new kt().setFromAxisAngle(Dp,-this.roll),a=this.phase===`air`||this.phase===`ground`?.05:this.pitch,o=new kt().setFromAxisAngle(Op,a);r.quaternion.copy(i).multiply(o),e.bones.spine.quaternion.setFromAxisAngle(Op,this.phase===`air`?-.05:.12),e.bones.chest.quaternion.setFromAxisAngle(Op,this.phase===`air`?-.05:.1),e.root.updateMatrixWorld(!0);let s=new W(0,-1,0).applyQuaternion(i),c=new W(1,0,0).applyQuaternion(i);for(let r of[`L`,`R`]){let i=r===`L`?1:-1,a,o=Dp.clone(),l=Ep.clone();if(this.footBlock&&r===this.footBlockSide&&this.phase===`ready`)a=this.footBlock.clone(),a.y=Math.max(.09,a.y),o=new W(i,0,.4).normalize();else if(this.phase===`air`||this.phase===`ground`||this.phase===`push`&&!this.feetGround[r]){let e=Math.sign(this.roll)===i;a=n.clone().addScaledVector(s,t.thigh+t.shin-(e?.12:.04)).addScaledVector(c,i*(e?.16:.1)).addScaledVector(Dp,e?.12:-.05),a.y<.07&&(a.y=.07),o=Dp.clone().addScaledVector(s,.5).normalize(),l=s.clone().negate().addScaledVector(Dp,.3).normalize()}else a=this.feet[r].clone(),a.y+=t.ankleH,o=new W(i*.18,0,1).normalize();let u=Dp.clone().addScaledVector(c,i*.35);e.twoBoneIK(r===`L`?`thighL`:`thighR`,r===`L`?`shinL`:`shinR`,r===`L`?`footL`:`footR`,a,u,t.thigh,t.shin),e.setWorldBasis(r===`L`?`footL`:`footR`,l,o)}for(let n of[`L`,`R`]){let r=n===`L`?1:-1,a=this.shoulder(n,this._sh).clone().add(this.handOff[n]),o=new W(r*.6,-.4,-.6).applyQuaternion(i);e.twoBoneIK(n===`L`?`upperArmL`:`upperArmR`,n===`L`?`foreArmL`:`foreArmR`,n===`L`?`handL`:`handR`,a,o,t.upperArm,t.foreArm);let s=e.worldPos(n===`L`?`foreArmL`:`foreArmR`,new W),c=e.worldPos(n===`L`?`handL`:`handR`,new W).clone().sub(s).normalize();e.setWorldBasis(n===`L`?`handL`:`handR`,c.clone().negate(),Dp.clone().addScaledVector(c,-c.z))}e.setWorldBasis(`head`,new W(0,1,0).applyQuaternion(i).lerp(Ep,.5).normalize(),Dp),e.update()}buildCapsules(){let e=this.profile,t=(e,t,n,r,i,a=zu,o=0)=>{let s=new vu(e,`keeper`,a,i,r);this.capDefs.push({cap:s,a:t,b:n,ext:o}),this.capsules.push(s)};t(.068,`handL`,null,`handL`,e.handMass,Ru,.17),t(.068,`handR`,null,`handR`,e.handMass,Ru,.17),t(.046,`foreArmL`,`handL`,`foreArmL`,2.4),t(.046,`foreArmR`,`handR`,`foreArmR`,2.4),t(.056,`upperArmL`,`foreArmL`,`upperArmL`,4),t(.056,`upperArmR`,`foreArmR`,`upperArmR`,4),t(.155,`hips`,`neck`,`torso`,32),t(.105,`head`,null,`head`,5,zu,.08),t(.078,`thighL`,`shinL`,`thighL`,9),t(.078,`thighR`,`shinR`,`thighR`,9),t(.058,`shinL`,`footL`,`shinL`,4.5),t(.058,`shinR`,`footR`,`shinR`,4.5),t(.052,`footL`,`toeL`,`footL`,1.6,Bu,.05),t(.052,`footR`,`toeR`,`footR`,1.6,Bu,.05)}_a=new W;_b=new W;updateCapsules(){for(let e of this.capDefs){if(this.rig.worldPos(e.a,this._a),e.b)this.rig.worldPos(e.b,this._b),e.ext&&this._b.addScaledVector(this._b.clone().sub(this._a).normalize(),e.ext);else{let t=this.rig.bones[e.a].getWorldQuaternion(new kt),n=new W(0,e.a===`head`?1:-1,0).applyQuaternion(t);e.a===`head`&&this._a.addScaledVector(n,.06),this._b.copy(this._a).addScaledVector(n,e.ext??.1)}e.cap.moveTo(this._a,this._b)}}handsMid(e){let t=this.capsules[0],n=this.capsules[1];return e.copy(t.a).add(t.b).add(n.a).add(n.b).multiplyScalar(.25)}handsGap(){let e=this.capsules[0],t=this.capsules[1],n=e.a.clone().add(e.b).multiplyScalar(.5),r=t.a.clone().add(t.b).multiplyScalar(.5);return n.distanceTo(r)}},jp=new W(0,1,0),Mp=class e{rig;phase=`idle`;t=0;setup;start=new W;plantIdeal=new W;runDir=new W(0,0,-1);pathLen=0;s=0;v=0;vTarget=3.5;speedInput=0;stutterTimer=0;stutterUsed=!1;feet={L:{pos:new W,yaw:0,grounded:!0},R:{pos:new W,yaw:0,grounded:!0}};swingFoot=`R`;swingFrom=new W;swingTo=new W;swingFromYaw=0;swingToYaw=0;stepStartS=0;stepEndS=1;stepLen=1;isPlantStep=!1;plantError=0;plantYaw=0;hipOpen=0;plantTime=-1;contactTime=-1;contactDone=!1;approachSpeedAtPlant=0;aimYaw=0;aimPitch=.1;plannedStrike=null;executedStrike=null;kickGround=new W;apex=new W;apexVel=new W;contactAnkle=new W;followEnd=new W;followVel=new W;pelvis=new W;pelvisAtPlant=new W;bodyYaw=0;lean=0;reaction=null;reactT=0;breath=0;lookTarget=new W(0,1.2,0);leanBack=0;footSign=1;constructor(e){this.rig=e}get kickSide(){return this.setup.foot===`right`?`R`:`L`}get supportSide(){return this.setup.foot===`right`?`L`:`R`}stepLenFor(e){let t=this.rig.dims.height/1.83;return X(.4+.24*e,.42,1.6)*t}static leftOf(e,t=new W){return t.set(e.z,0,-e.x).normalize()}place(t,n){this.setup=t,this.footSign=t.foot===`right`?1:-1,this.aimYaw=n,this.updatePlantIdeal();let r=t.angle;this.start.set(t.ball.x-this.footSign*Math.sin(r)*t.distance,0,t.ball.z+Math.cos(r)*t.distance),this.recomputePath(),this.s=0,this.v=0,this.vTarget=t.tempo,this.phase=`idle`,this.t=0,this.stutterUsed=!1,this.stutterTimer=0,this.plantTime=-1,this.contactTime=-1,this.contactDone=!1,this.plantError=0,this.executedStrike=null,this.reaction=null,this.leanBack=0;let i=e.leftOf(this.runDir),a=Cl(this.runDir);this.feet.L.pos.copy(this.start).addScaledVector(i,.12),this.feet.R.pos.copy(this.start).addScaledVector(i,-.12),this.feet.L.yaw=this.feet.R.yaw=a,this.feet.L.grounded=this.feet.R.grounded=!0,this.bodyYaw=a,this.pelvis.copy(this.start),this.pose(0)}updatePlantIdeal(){let t=rd[this.setup.technique],n=ad(this.aimYaw,0);n.y=0,n.normalize();let r=e.leftOf(n),i=t.surface===`inside`?.27:t.surface===`outside`?.3:t.surface===`toeUnder`?.22:.21,a=t.surface===`laces`?.13:t.surface===`toeUnder`?.08:.05;this.plantIdeal.copy(this.setup.ball).setY(0).addScaledVector(r,this.footSign*i).addScaledVector(n,-a)}recomputePath(){let e=new W().subVectors(this.plantIdeal,this.start);e.y=0,this.pathLen=e.length(),this.runDir.copy(e.normalize())}go(){if(this.phase!==`idle`)return;this.phase=`run`,this.t=0;let e=this.stepLenFor(this.vTarget*.6),t=Math.max(2,Math.round(this.pathLen/e)),n=t%2==1?this.supportSide:this.kickSide;this.beginStep(n,0,Math.min(.55,this.pathLen/t))}stutter(){return this.phase!==`run`||this.stutterUsed||this.pathLen-this.s<1.9?!1:(this.stutterUsed=!0,this.stutterTimer=.55,!0)}beginStep(t,n,r){this.swingFoot=t;let i=this.feet[t];this.swingFrom.copy(i.pos),this.swingFromYaw=i.yaw,i.grounded=!1,this.stepLen=r;let a=this.pathLen-n;this.isPlantStep=t===this.supportSide&&Math.abs(a-r)<1e-6;let o=e.leftOf(this.runDir),s=t===`L`?1:-1;this.isPlantStep?(this.swingTo.copy(this.plantIdeal).addScaledVector(this.runDir,-this.plantError),this.swingToYaw=this.plantYaw):(this.swingTo.copy(this.start).addScaledVector(this.runDir,n+r).addScaledVector(o,s*.085),this.swingToYaw=Cl(this.runDir)+s*.12),this.stepStartS=this.s,this.stepEndS=Math.max(this.s+.05,n+r-.18*r)}planNext(e,t){let n=e===`L`?`R`:`L`,r=this.pathLen-t,i=this.stepLenFor(Math.max(.6,this.v)),a=.55*i,o=1.32*i+.08;if(n===this.supportSide&&r<=o){let e=r;this.plantError=0,r<a&&(this.plantError=-(a-r)*.6),this.decidePlantYaw(),this.beginStepPlant(n,t,e);return}let s=1,c=1/0;for(let t=1;t<40;t++){if((t%2==1?n:e)!==this.supportSide)continue;let a=r/t,o=Math.abs(a-i);if(o<c&&(c=o,s=t),a<.35)break}let l=r/s;s===1?(l=Math.min(r,o),this.plantError=r-l,this.decidePlantYaw(),this.beginStepPlant(n,t,l)):this.beginStep(n,t,X(l,.35,o))}beginStepPlant(e,t,n){this.swingFoot=e;let r=this.feet[e];this.swingFrom.copy(r.pos),this.swingFromYaw=r.yaw,r.grounded=!1,this.stepLen=n,this.isPlantStep=!0,this.updatePlantIdeal(),this.swingTo.copy(this.plantIdeal).addScaledVector(this.runDir,-this.plantError),this.swingToYaw=this.plantYaw,this.stepStartS=this.s,this.stepEndS=Math.max(this.s+.05,t+n-.22*n),this.kickGround.copy(this.feet[this.kickSide].pos)}decidePlantYaw(){let e=rd[this.setup.technique],t=Cl(this.runDir),n=Cl(ad(this.aimYaw,0).setY(0).normalize())-t;for(;n>Math.PI;)n-=2*Math.PI;for(;n<-Math.PI;)n+=2*Math.PI;let r=.35+.55*e.tell;this.plantYaw=t+n*r,this.hipOpen=n*(.3+.5*e.tell)}setPlannedStrike(e,t,n){this.plannedStrike=e,this.aimYaw=t,this.aimPitch=n,(this.phase===`idle`||this.phase===`run`)&&(this.updatePlantIdeal(),this.phase===`idle`&&this.recomputePath())}get timeToContact(){return this.phase===`swing`?Math.max(0,this.contactTime-this.t):this.phase===`run`?Math.max(0,this.pathLen-this.s)/Math.max(.3,this.v)+this.swingDuration:1/0}get swingDuration(){let e=rd[this.setup.technique];return e.surface===`toeUnder`?.13:e.surface===`laces`?.095:.105}cues(){return{phase:this.phase,runYaw:Cl(this.runDir),plantYaw:this.plantTime>=0?this.plantYaw:null,approachSpeed:this.v,inferredTimeToContact:this.timeToContact,stuttering:this.stutterTimer>0,hipYaw:this.hipOpen,foot:this.setup.foot}}update(e){this.t+=e,this.breath+=e;let t=null;if(this.phase===`run`){let t=this.setup.tempo*(1+.35*this.speedInput);this.stutterTimer>0&&(this.stutterTimer-=e,t=.35);let n=t>this.v?4.2:7.5;this.v+=X(t-this.v,-n*e,n*e),this.s+=this.v*e;let r=X((this.s-this.stepStartS)/Math.max(.001,this.stepEndS-this.stepStartS),0,1),i=this.feet[this.swingFoot],a=yl(r);if(i.pos.copy(this.swingFrom).lerp(this.swingTo,a),i.pos.y=Math.sin(Math.PI*r)*(.08+.05*this.v)*(this.isPlantStep?.7:1),i.yaw=_l(this.swingFromYaw,this.swingToYaw,a),r>=1){i.pos.copy(this.swingTo),i.pos.y=0,i.grounded=!0;let e=this.isPlantStep?this.pathLen:this.s+.18*this.stepLen;this.isPlantStep?this.enterSwing():this.planNext(this.swingFoot,e)}this.updateRunBody(e,r)}else if(this.phase===`swing`){let n=this.contactTime;!this.contactDone&&this.t>=n&&(this.contactDone=!0,t=`contact`),this.t>n+.55&&(this.phase=`follow`,this.t=0),this.updateSwingBody(e)}else this.phase===`follow`?this.updateFollow(e):this.phase===`react`&&(this.reactT+=e);return this.pose(e),t}enterSwing(){this.phase=`swing`,this.approachSpeedAtPlant=this.v,this.plantTime=this.t,this.contactTime=this.t+this.swingDuration,this.pelvisAtPlant.copy(this.pelvis),this.computeSwingKeys(this.plannedStrike)}computeSwingKeys(t){let n=rd[this.setup.technique],r=this.setup.ball,i=t?t.normal.clone():ad(this.aimYaw,this.aimPitch),a=t?t.footVelocity.clone():i.clone().multiplyScalar(18),o=r.clone().addScaledVector(i,-Z.radius),{fwd:s,up:c}=this.footBasisAtContact(i),l=this.contactAnkle.copy(o);switch(n.surface){case`laces`:l.addScaledVector(c,-.04).addScaledVector(s,-.1);break;case`inside`:l.addScaledVector(i,-.045).addScaledVector(s,-.06).addScaledVector(jp,.035);break;case`outside`:l.addScaledVector(i,-.045).addScaledVector(s,-.11).addScaledVector(jp,.03);break;case`toeUnder`:l.addScaledVector(s,-.2).addScaledVector(jp,.02)}l.y=Math.max(.065,l.y);let u=a.length(),d=n.surface===`toeUnder`?.32:.28+.022*u,f=n.surface===`toeUnder`?.22:.18+.018*u,p=a.clone().setY(0).normalize(),m=e.leftOf(p);this.apex.copy(l).addScaledVector(p,-d).addScaledVector(jp,f).addScaledVector(m,-this.footSign*.08),this.apexVel.copy(l).sub(this.apex).divideScalar(this.swingDuration).multiplyScalar(.35),this.followVel.copy(a);let h=n.surface===`toeUnder`?.35:.45+.02*u;this.followEnd.copy(l).addScaledVector(a.clone().normalize(),h).addScaledVector(jp,n.surface===`laces`?.35+.012*u:.2),this.followEnd.y=Math.max(.15,this.followEnd.y)}footBasisAtContact(t){let n=rd[this.setup.technique],r=t.clone().setY(0).normalize(),i=e.leftOf(r),a=this.footSign,o,s;switch(n.surface){case`laces`:{let e=.95;o=r.clone().multiplyScalar(Math.cos(e)).addScaledVector(jp,-Math.sin(e)),s=r.clone().multiplyScalar(Math.sin(e)).addScaledVector(jp,Math.cos(e));break}case`inside`:o=r.clone().multiplyScalar(.26).addScaledVector(i,-a*.96).addScaledVector(jp,.08).normalize(),s=jp.clone();break;case`outside`:o=r.clone().multiplyScalar(.7).addScaledVector(i,a*.45).addScaledVector(jp,-.55).normalize(),s=i.clone().multiplyScalar(-a*.6).addScaledVector(jp,.8).normalize();break;default:o=r.clone().multiplyScalar(.94).addScaledVector(jp,-.34).normalize(),s=jp.clone()}return{fwd:o,up:s}}applyExecutedStrike(e,t){this.executedStrike=e,this.leanBack=t,this.followVel.copy(e.footVelocity);let n=rd[this.setup.technique],r=e.footVelocity.length();this.followEnd.copy(this.contactAnkle).addScaledVector(e.footVelocity.clone().normalize(),n.surface===`toeUnder`?.35:.45+.02*r).addScaledVector(jp,n.surface===`laces`?.35+.012*r:.2),this.followEnd.y=Math.max(.15,this.followEnd.y)}kickAnkleAt(t,n,r){let i=this.plantTime,a=this.contactTime,o=new W;if(t<a){let e=a-i,o=X((t-i)/e,0,1);xl(this.apex,this.apexVel,this.contactAnkle,this.followVel,e,o,n),r&&Sl(this.apex,this.apexVel,this.contactAnkle,this.followVel,e,o,r)}else{let i=.3,s=X((t-a)/i,0,1);if(xl(this.contactAnkle,this.followVel,this.followEnd,o,i,s,n),r&&Sl(this.contactAnkle,this.followVel,this.followEnd,o,i,s,r),t>a+i){let r=X((t-a-i)/.25,0,1),o=this.plantIdeal.clone().addScaledVector(this.runDir,.55);o.addScaledVector(e.leftOf(this.runDir),-this.footSign*.15),n.copy(this.followEnd).lerp(o,vl(r)),n.y=_l(this.followEnd.y,.075,vl(r))}}return n}updateRunBody(t,n){let r=e.leftOf(this.runDir),i=((this.swingFoot===`L`?`R`:`L`)==`L`?1:-1)*.025*Math.sin(Math.PI*n);this.pelvis.copy(this.start).addScaledVector(this.runDir,this.s).addScaledVector(r,i),this.bodyYaw+=(Cl(this.runDir)-this.bodyYaw)*bl(t,.12),this.lean+=(.07+.035*this.v-this.lean)*bl(t,.15),this.isPlantStep&&(this.lean+=(-.05-this.lean)*vl(n)*bl(t,.05))}updateSwingBody(t){let n=this.t,r=this.plantTime,i=this.contactTime,a=X((n-r)/(i-r),0,1),o=this.feet[this.supportSide].pos,s=ad(this.aimYaw,0).setY(0).normalize(),c=e.leftOf(s),l=o.clone().addScaledVector(c,-this.footSign*.09).addScaledVector(s,-.04);if(n<i)this.pelvis.copy(this.pelvisAtPlant).lerp(l,vl(a));else{let e=X((n-i)/.5,0,1);this.pelvis.copy(l).addScaledVector(s,.45*vl(e))}let u=Cl(s);this.bodyYaw+=(u+this.hipOpen*.2-this.bodyYaw)*bl(t,.08),this.lean+=(-.12-this.leanBack*1.6-this.lean)*bl(t,.06);let d=this.feet[this.kickSide];d.grounded=!1,this.kickAnkleAt(n,d.pos)}updateFollow(t){let n=X(this.t/.9,0,1),r=ad(this.aimYaw,0).setY(0).normalize(),i=this.plantIdeal.clone().addScaledVector(this.runDir,.55),a=this.feet[this.kickSide],o=this.feet[this.supportSide];if(a.grounded=!0,a.pos.y=0,n<1){let a=i.clone().addScaledVector(r,.6*vl(n));this.pelvis.lerp(a,bl(t,.15));let s=X((n-.2)/.5,0,1),c=i.clone().addScaledVector(e.leftOf(r),this.footSign*.28).addScaledVector(r,.35);s>0&&s<1?(o.grounded=!1,o.pos.lerpVectors(o.pos,c,vl(s)*.3),o.pos.y=Math.sin(Math.PI*s)*.12):s>=1&&(o.pos.copy(c),o.pos.y=0,o.grounded=!0)}else this.reaction&&(this.phase=`react`,this.reactT=0);this.lean+=(.02-this.lean)*bl(t,.25)}react(e){this.reaction=e,this.phase===`react`&&(this.reactT=0)}_q=new kt;_v1=new W;_v2=new W;pose(t){let n=this.rig,r=n.prop;n.resetPose();let i=n.bones.hips,a=n.root;a.position.set(0,0,0),a.quaternion.identity();let o=r.hipsY,s=this.phase,c=0;if(s===`run`){let e=X((this.s-this.stepStartS)/Math.max(.001,this.stepEndS-this.stepStartS),0,1);c=.03+.012*this.v+.025*Math.cos(2*Math.PI*e)*Math.min(1,this.v/2),this.isPlantStep&&(c+=.06*vl(e))}else if(s===`swing`){let e=this.contactTime;c=this.t<e?.1:.1-.06*X((this.t-e)/.4,0,1)}else s===`idle`?c=.01+.004*Math.sin(this.breath*1.7):s===`react`&&(c=this.reaction===`miss`||this.reaction===`save`?.04:0);o-=c,i.position.set(this.pelvis.x,o,this.pelvis.z);let l=this.bodyYaw,u=this.lean,d=0,f=0;if(s===`react`){let e=vl(this.reactT/.4);this.reaction===`goal`?d=e:f=this.reaction===`miss`||this.reaction===`post`?e:e*.6,u=_l(u,this.reaction===`goal`?-.12:.12,e)}let p=0;if(s===`swing`){let e=X((this.t-this.plantTime)/(this.contactTime-this.plantTime),0,1);p=this.footSign*_l(-.35,.3,vl(e))+this.hipOpen*.4}this._q.setFromAxisAngle(jp,l+p);let m=new kt().setFromAxisAngle(new W(1,0,0),u*.5);i.quaternion.copy(this._q).multiply(m),n.bones.spine.quaternion.setFromAxisAngle(new W(1,0,0),u*.3);let h=new kt().setFromAxisAngle(jp,-p*.7);n.bones.chest.quaternion.copy(h).multiply(new kt().setFromAxisAngle(new W(1,0,0),u*.3)),s===`idle`&&n.bones.chest.rotateX(.015*Math.sin(this.breath*1.7)),a.updateMatrixWorld(!0);let g=new W(Math.sin(l),0,Math.cos(l));for(let t of[`L`,`R`]){let i=this.feet[t],a=this._v1.copy(i.pos);a.y+=r.ankleH;let o,c=jp.clone(),l=t===this.kickSide&&s===`swing`;if(l){let e=(this.executedStrike??this.plannedStrike)?.normal??g.clone().negate(),t=this.footBasisAtContact(e);a.copy(i.pos);let n=X((this.t-this.plantTime)/(this.contactTime-this.plantTime+.15),0,1);o=new W().lerpVectors(g,t.fwd,vl(n*1.6)).normalize(),c=new W().lerpVectors(jp,t.up,vl(n*1.6)).normalize()}else if(o=new W(Math.sin(i.yaw),0,Math.cos(i.yaw)),!i.grounded&&s===`run`){let t=-.5*Math.min(1,i.pos.y/.1);o.applyAxisAngle(e.leftOf(o),-t).normalize(),c.applyAxisAngle(e.leftOf(o),-t).normalize()}let u=t===`L`?`thighL`:`thighR`,d=t===`L`?`shinL`:`shinR`,f=t===`L`?`footL`:`footR`,p=g.clone().addScaledVector(jp,.1);l&&p.copy(o).setY(0).normalize().lerp(g,.5).addScaledVector(jp,.2),n.twoBoneIK(u,d,f,a,p,r.thigh,r.shin),n.setWorldBasis(f,c,o)}let _=e.leftOf(g);for(let e of[`L`,`R`]){let t=e===`L`?1:-1,i=e===`L`?`upperArmL`:`upperArmR`,a=e===`L`?`foreArmL`:`foreArmR`,o=e===`L`?`handL`:`handR`,c=n.worldPos(i,new W),l;if(d>0)l=c.clone().addScaledVector(jp,.5*d+(1-d)*-.5).addScaledVector(_,t*.25).addScaledVector(g,.1),l.y+=.05*Math.sin(this.reactT*9+t);else if(f>0){let e=n.worldPos(`head`,new W).clone().addScaledVector(jp,.1).addScaledVector(_,t*.08);l=c.clone().addScaledVector(jp,-.52).lerp(e,f)}else if(s===`run`||s===`follow`){let n=s===`run`?X((this.s-this.stepStartS)/Math.max(.001,this.stepEndS-this.stepStartS),0,1):.5,r=this.swingFoot===e?1:-1,i=Math.min(1,this.v/3)*.32,a=-r*i*Math.cos(Math.PI*n);l=c.clone().addScaledVector(jp,-.43).addScaledVector(g,.1+a).addScaledVector(_,t*.12)}else if(s===`swing`){let n=e===this.supportSide,r=X((this.t-this.plantTime)/.25,0,1);l=n?c.clone().addScaledVector(_,t*.5).addScaledVector(jp,-.12+.1*r).addScaledVector(g,.15):c.clone().addScaledVector(jp,-.4).addScaledVector(g,-.25+.4*r).addScaledVector(_,t*.2)}else l=c.clone().addScaledVector(jp,-.55).addScaledVector(g,.04).addScaledVector(_,t*.08);let u=g.clone().multiplyScalar(-1).addScaledVector(_,t*.4).addScaledVector(jp,-.2);n.twoBoneIK(i,a,o,l,u,r.upperArm,r.foreArm)}let v=this.phase===`swing`&&this.t<this.contactTime+.05?this.setup.ball:this.lookTarget,y=n.bones.head.getWorldPosition(this._v2),b=new W().subVectors(v,y).normalize().clone();b.y=X(b.y,-.8,.5),n.setWorldBasis(`head`,jp.clone().addScaledVector(b,-.15).normalize(),b)}},Np=class{cfg;world=new nd;kicker;keeper;ai;phase=`setup`;time=0;kickTime=-1;intent;setup;solution=null;execution=null;aimAtPlant=null;timingPress=null;events=[];stats=null;launchState={v:new W,w:new W,p:new W};projected={x:0,y:0,reached:!1};straightCrossX=0;maxH=0;dist=0;prevBall=new W;flightEnd=-1;goal=!1;crossedOutside=null;keeperTouched=!1;frameHit=null;contactMark=null;caught=!1;endTimer=-1;encroach=!1;doneReason=``;ballSpot=new W(0,Z.radius,11);manualDive=null;constructor(e){this.cfg=e,this.kicker=new Mp(e.kickerRig),this.keeper=new Ap(e.keeperRig,e.keeperProfile),this.ai=e.keeperAI?new Tp(this.keeper,e.keeperProfile):null,this.world.stepDt=Ul}prepare(e,t){this.setup=e,this.intent={...t,target:{...t.target}},this.world.reset(this.ballSpot),this.world.ball.q.setFromAxisAngle(new W(.3,1,.2).normalize(),.7),this.keeper.resetToLine(0),this.ai?.reset(),this.phase=`setup`,this.time=0,this.kickTime=-1,this.execution=null,this.timingPress=null,this.aimAtPlant=null,this.events=[],this.stats=null,this.maxH=Z.radius,this.dist=0,this.flightEnd=-1,this.goal=!1,this.crossedOutside=null,this.keeperTouched=!1,this.frameHit=null,this.contactMark=null,this.caught=!1,this.endTimer=-1,this.encroach=!1,this.doneReason=``,this.solve(),this.kicker.place(e,this.solution.yaw),this.kicker.setPlannedStrike(this.solution.strike,this.solution.yaw,this.solution.pitch),this.kicker.lookTarget.set(0,1.4,0)}solve(){this.intent.approachSpeed=this.phase===`runup`?this.kicker.v:this.setup.tempo,this.solution=dd(this.intent,this.ballSpot)}updateIntent(e){Object.assign(this.intent,e),e.target&&(this.intent.target={...e.target}),(this.phase===`setup`||this.phase===`runup`)&&(this.solve(),this.phase===`setup`&&this.kicker.place(this.setup,this.solution.yaw),this.kicker.setPlannedStrike(this.solution.strike,this.solution.yaw,this.solution.pitch))}startRunUp(){this.phase===`setup`&&(this.phase=`runup`,this.kicker.go())}pressTiming(){this.phase===`runup`&&this.timingPress===null&&(this.timingPress=this.kicker.t)}timingError(){if(this.timingPress===null||this.kicker.plantTime<0)return this.timingPress===null?null:-1;let e=.11*(1-.35*this.cfg.pressure*(1-this.cfg.attributes.composure/100));return Math.max(-1,Math.min(1,(this.timingPress-this.kicker.plantTime)/e))}step(){let e=Ul;this.time+=e,this.events.length=0;let t=this.kicker;if(this.phase===`runup`){let n=t.plantTime,r=t.update(e);n<0&&t.plantTime>=0&&(this.aimAtPlant={...this.intent.target},this.events.push({type:`plant`,speed:t.approachSpeedAtPlant,point:t.feet[t.supportSide].pos.clone()})),r===`contact`&&this.executeStrike()}else t.update(e);let n={cues:t.cues(),ball:this.world.ball,sinceKick:this.kickTime>=0?this.time-this.kickTime:-1,kicked:this.kickTime>=0,takerId:this.cfg.takerId};if(this.ai&&!this.caught&&!this.cfg.noKeeper&&this.ai.update(e,n),this.manualDive&&this.manualDive(this),this.keeper.update(e,this.kickTime>=0?this.world.ball.p:null),this.world.dynamic=this.kickTime>=0&&!this.caught&&!this.cfg.noKeeper?this.keeper.capsules:[],this.caught){let e=this.keeper.handsMid(new W);e.z+=.06,this.world.holder={target:e,velocity:new W}}this.prevBall.copy(this.world.ball.p),this.world.step(e),this.kickTime>=0&&this.trackFlight();for(let e of this.world.events)this.onPhysicsEvent(e);this.phase===`flight`&&this.checkEnd(e)}executeStrike(){let e=this.kicker,t=this.intent;t.approachSpeed=e.approachSpeedAtPlant;let n=dd(t,this.ballSpot);this.solution=n;let r=t.target,i=this.aimAtPlant?Math.hypot(r.x-this.aimAtPlant.x,r.y-this.aimAtPlant.y)*Math.sign(r.x-this.aimAtPlant.x||1):0,a=Math.atan2(e.runDir.x,-e.runDir.z),o=fd(t,n,{timing:this.timingError(),plantError:e.plantError,approachSpeed:e.approachSpeedAtPlant,bodyAngle:a,lateAimChange:i,pressure:this.cfg.pressure,precision:this.cfg.attributes.precision,composure:this.cfg.attributes.composure,curlSkill:this.cfg.attributes.curl,powerSkill:this.cfg.attributes.power});this.execution=o;let s=pd(t,o);e.applyExecutedStrike(s,Math.max(0,o.pitch-n.pitch)),this.encroach=!this.cfg.noKeeper&&this.keeper.feet.L.z>.42&&this.keeper.feet.R.z>.42,od(this.world.ball,s),this.world.wake(),this.kickTime=this.time,this.phase=`flight`,this.launchState.v.copy(this.world.ball.v),this.launchState.w.copy(this.world.ball.w),this.launchState.p.copy(this.world.ball.p),this.projected=ud(this.ballSpot,this.world.ball.v,this.world.ball.w,3);let c=ud(this.ballSpot,this.world.ball.v,new W,3);this.straightCrossX=c.x,this.events.push({type:`kick`,speed:this.world.ball.v.length(),point:this.world.ball.p.clone()})}trackFlight(){let e=this.world.ball.p;this.maxH=Math.max(this.maxH,e.y),this.flightEnd<0&&(this.dist+=e.distanceTo(this.prevBall),e.z<=Q.postZ&&(this.flightEnd=this.time-this.kickTime)),!this.goal&&!this.crossedOutside&&this.prevBall.z>=Hl&&e.z<Hl&&(Math.abs(e.x)<Q.halfWidth&&e.y<Q.height||(this.crossedOutside=e.y>=Q.height?`over`:`wide`))}onPhysicsEvent(e){switch(e.type){case`goalLine`:e.inside&&!this.goal&&!this.crossedOutside&&(this.goal=!0,this.events.push({type:`goal`,speed:e.speed,point:e.point}),this.endTimer=2.2);break;case`post`:case`bar`:!this.frameHit&&!this.keeperTouched&&(this.frameHit=e.type,this.contactMark={x:e.point.x,y:e.point.y,kind:e.type}),this.flightEnd<0&&(this.flightEnd=this.time-this.kickTime),this.events.push({type:e.type,speed:e.speed,point:e.point,part:e.part});break;case`keeper`:this.keeperTouched||(this.keeperTouched=!0,this.contactMark={x:e.point.x,y:e.point.y,kind:`keeper`},this.flightEnd<0&&(this.flightEnd=this.time-this.kickTime)),this.events.push({type:`keeper`,speed:e.speed,point:e.point,part:e.part}),this.tryCatch(e);break;case`net`:this.events.push({type:`net`,speed:e.speed,point:e.point,part:e.part});break;case`ground`:this.events.push({type:`ground`,speed:e.speed,point:e.point});break;case`board`:this.events.push({type:`board`,speed:e.speed,point:e.point})}}tryCatch(e){if(this.caught||this.goal)return;let t=e.part??``;if(!(t.startsWith(`hand`)||t.startsWith(`foreArm`)||t===`torso`))return;let n=this.cfg.keeperProfile,r=this.keeper,i=r.phase===`air`||r.phase===`push`,a=n.catchSpeed*(i?.72:1),o=r.handsMid(new W).distanceTo(this.world.ball.p)<.3,s=r.handsGap()<.4;e.speed<a&&o&&s&&(this.caught=!0,r.holding=!0,this.world.ball.v.multiplyScalar(.1),this.events.push({type:`catch`,speed:e.speed,point:e.point}),this.endTimer=1.6)}checkEnd(e){let t=this.world,n=this.time-this.kickTime;if(this.endTimer>0){this.endTimer-=e,this.endTimer<=0&&this.finish(`timer`);return}let r=t.ball,i=(this.keeperTouched||this.frameHit)&&r.v.z>.5&&r.p.z>1;t.resting&&n>.3?this.finish(`rest`):this.crossedOutside&&(r.p.z<-2.5||t.resting||n>2.2)?this.finish(`out`):i&&n>1.2?this.finish(`rebound`):Math.abs(r.p.x)>12||r.p.z>25||r.p.z<-6?this.finish(`far`):n>4.5&&this.finish(`timeout`)}finish(e){this.phase!==`done`&&(this.phase=`done`,this.doneReason=e,this.stats=this.buildStats(),this.stats.outcome!==`retake`&&xp(this.cfg.takerId,this.projected.x),this.events.push({type:`end`,speed:0,point:this.world.ball.p.clone()}))}outcome(){return this.goal?`goal`:this.encroach?`retake`:this.keeperTouched?`saved`:this.frameHit?`post`:this.crossedOutside===`over`||this.projected.reached&&this.projected.y>=Q.height?`over`:`wide`}buildStats(){let e=this.outcome(),t={goal:this.keeperTouched?`GOL! (o goleiro tocou)`:this.frameHit?`GOL! (trave e dentro)`:`GOL!`,saved:this.caught?`DEFESA — encaixe`:`DEFESA`,post:this.frameHit===`bar`?`NO TRAVESSÃO`:`NA TRAVE`,wide:`PARA FORA`,over:`POR CIMA`,retake:`REPETIR — goleiro adiantado`},n=this.launchState.v,r=n.length(),i=Math.atan2(n.x,-n.z)*180/Math.PI,a=Math.atan2(n.y,Math.hypot(n.x,n.z))*180/Math.PI,o=this.intent.target,s=this.projected,c=s.reached?Math.hypot(s.x-o.x,s.y-o.y)*100:Math.hypot(s.x-o.x,o.y)*100;return{outcome:e,outcomeLabel:t[e],speedKmh:r*3.6,flightTime:this.flightEnd>0?this.flightEnd:this.time-this.kickTime,distance:this.dist,maxHeight:this.maxH,dirH:i,dirV:a,technique:rd[this.intent.technique].label,precisionCm:c,aim:{...o},crossing:{...s},contactMark:this.contactMark,contactOffset:this.execution?.contactOffset??{x:0,y:0},spinRpm:this.launchState.w.length()*60/(2*Math.PI),curveCm:Math.abs(s.x-this.straightCrossX)*100,quality:this.execution?.quality??0,notes:this.execution?.notes??[],keeperTouched:this.keeperTouched,caught:this.caught,keeperRead:this.ai?.readNote??``,encroachment:this.encroach,timing:this.timingError()}}previewPath(){let e=this.solution;if(!e)return[];let t=[],n=this.world.ball.clone();return n.p.copy(this.ballSpot),n.v.set(0,0,0),n.w.set(0,0,0),od(n,e.strike),ud(this.ballSpot,n.v,n.w,2,t),t}keeperPrediction(){return wp(this.world.ball,this.cfg.keeperProfile.model,this.keeper.com.z+.2)}},Pp={none:0,light:2.5,strong:6},Fp=new class{view;rs;input;audio=new gl;ui;cam;settings;state=`menu`;mode=null;modeFactory=null;spec=null;sim=null;rigCache=new Map;kickerRig=null;keeperRig=null;recorder=new Lf;technique=`placed`;foot=`right`;runDist=4.5;runAngle=.55;tempo=3.6;aim=new U(-2.4,.9);spin=new U;power=0;solveTimer=0;dirty=!0;cpuPlan=null;stateT=0;acc=0;last=0;prevBall=new W;ballInterp=new W;time=0;timingMsg=null;crowdJump={home:0,away:0};excitement=.35;tension=0;pulse=0;replay={t:0,speed:.25,playing:!0,angle:0,auto:!1,autoStep:0,trail:!0,liveNet:null};replayAngles=[`side`,`keeper`,`cinematic`,`tv`,`behind`,`firstPerson`];keeperTarget=null;cameraMode=`behind`;resultShown=!1;touch=!1;notable=!1;kickSurface=`inside`;frameNo=0;raycaster=new eo;goalPlane=new Pr(new W(0,0,1),-Q.postZ);menuSim=null;keeperDiveSent=!1;constructor(e,t){this.view=t,this.settings=$f().settings,this.ui=new pp(e),this.input=new Rl(t),this.touch=window.matchMedia?.(`(pointer: coarse)`).matches??!1,this.foot=this.settings.foot,this.audio.narrator=this.settings.narrator,this.audio.setVolumes({master:this.settings.master,crowd:this.settings.crowd,sfx:this.settings.sfx}),this.bindUi()}async boot(){let e=e=>new Promise(t=>{this.ui.loading(e),requestAnimationFrame(()=>t())});await e(.05);try{await Promise.race([Promise.all([document.fonts.load(`800 40px "Big Shoulders Display"`),document.fonts.load(`400 16px "Archivo"`)]),new Promise(e=>setTimeout(e,2500))])}catch{}await e(.2),this.buildRenderer(),await e(.75),this.enterMenu(),await e(1),this.ui.hideLoading(),this.last=performance.now(),requestAnimationFrame(this.frame)}buildRenderer(){let e=this.spec?[this.spec.kickerTeam,this.spec.keeperTeam]:[Gf[0],Gf[1]],t=this.spec?.userTeamIsKicking??!0?e[0]:e[1],n=t===Gf[0]?Gf[1]:Gf[0];this.rs=new Ef(this.view,this.settings.quality,this.settings.timeOfDay,{home:t.crowd,away:n.crowd}),this.cam=new Dl(this.rs.camera),this.kickerRig&&this.rs.characters.add(this.kickerRig.root),this.keeperRig&&this.rs.characters.add(this.keeperRig.root)}bindUi(){let e=this.ui;e.handlers={audioUnlock:()=>void this.audio.start(),quick:()=>{let e=this.settings.difficulty;this.start(()=>new op([Gf[0],Gf[1]],0,e,Date.now()/1e3|0))},training:(e,t)=>this.start(()=>this.trainingMode(e,t)),shootout:(e,t,n)=>{let r=e===0?[Gf[0],Gf[1]]:[Gf[1],Gf[0]];this.start(()=>new op(r,n,t,Date.now()/1e3|0))},precision:(e,t)=>this.start(()=>new cp(e,8,this.userPlayer(),Gf[0],Gf[1],t)),career:()=>this.start(()=>new up($f().career,Gf[0],Gf[1])),settingsChanged:(e,t)=>this.applySettings(e,t),resetStats:()=>np(),careerSpend:e=>{let t=$f().career;t.points>0&&t.attrs[e]<99&&(t.points--,t.attrs[e]++,ep())},careerRename:e=>{$f().career.name=e.slice(0,14),ep()}},e.techClick=e=>this.setTechnique(e),e.setupClick=e=>this.setupEdit(e),e.touchHandlers={action:e=>this.input.virtual.action=e,stutter:()=>{this.input.virtual.stutter=!0,setTimeout(()=>this.input.virtual.stutter=!1,60)},faster:e=>this.input.virtual.faster=e,slower:e=>this.input.virtual.slower=e,camera:()=>this.cycleCamera(),pause:()=>this.togglePause()}}userPlayer(){let e=$f().career;return Jf(e.name,e.attrs,this.settings.foot)}trainingMode(e,t){return new ip(e,t,this.userPlayer(),Gf[0],Gf[1])}applySettings(e,t){let n=this.settings;Object.assign($f().settings,e),this.settings=$f().settings,ep(),this.audio.narrator=e.narrator,this.audio.setVolumes({master:e.master,crowd:e.crowd,sfx:e.sfx}),this.foot=e.foot,t&&(n.quality!==e.quality||!this.rs?(this.rs.dispose(),this.buildRenderer(),this.spec?.targets&&this.rs.hoops.set(this.spec.targets,Q.postZ),this.state===`menu`&&this.cam.setMode(`tv`)):this.rs.setupAtmosphere(e.timeOfDay)),this.sim&&this.sim.world.env.wind.set(Pp[e.wind],0,-.3*Pp[e.wind]),this.cameraMode=this.spec?.role===`keep`?e.keeperCamera:e.kickerCamera,this.state!==`menu`&&this.cam.setMode(this.cameraMode,!1)}start(e){this.audio.start(),bp.clear(),this.modeFactory=e,this.mode=e(),this.ui.hideMenu(),this.ui.closePanel(),this.menuSim=null,this.nextKick()}enterMenu(){this.state=`menu`,this.mode=null,this.spec=null,this.ui.hideResult(),this.ui.hideReplayBar(),this.ui.hidePause(),this.ui.showMenu(),this.rs.hoops.set([],0),this.rs.aim.group.visible=!1,this.rs.trail.clear();let e=Gf[0].players[0];this.useRigs(Kf(Gf[0],e),{height:e.height,build:e.build},qf(Gf[1],`pro`),Hf.pro.height),this.menuSim=new Np({kickerRig:this.kickerRig,keeperRig:this.keeperRig,keeperProfile:Hf.pro,keeperAI:!0,takerId:`menu`,attributes:e.attrs,pressure:0}),this.menuSim.prepare({ball:new W(0,Z.radius,11),foot:`right`,distance:3.2,angle:.5,tempo:3.5,technique:`placed`},{technique:`placed`,foot:`right`,power:.8,target:{x:-2.5,y:1},spinPitch:0,spinYaw:0,approachSpeed:3.5}),this.sim=null,this.rs.goal.net.reset(),this.audio.setChant(!0),this.excitement=.45,this.tension=0}rigFor(e,t,n){let r=this.rigCache.get(e);if(r)return r.rig;let i=new Ll(n);return Nf(i,t),this.rigCache.set(e,{rig:i}),i}useRigs(e,t,n,r){let i=`k-${e.name}-${e.number}-${e.kit.primary}`,a=`g-${n.name}-${n.kit.primary}-${n.gloves}`,o=this.rigFor(i,e,t),s=this.rigFor(a,n,{height:r,build:1.08});this.kickerRig&&this.kickerRig!==o&&this.rs.characters.remove(this.kickerRig.root),this.keeperRig&&this.keeperRig!==s&&this.rs.characters.remove(this.keeperRig.root),this.kickerRig=o,this.keeperRig=s,this.rs.characters.add(o.root,s.root)}nextKick(){let e=this.mode,t=e.retake&&this.spec,n=t?this.spec:e.next();if(e.retake&&=!1,!n){this.finishMode();return}this.spec=n;let r=n.keeperLevel===`none`?`beginner`:n.keeperLevel,i=Hf[r],a=n.role===`keep`?n.keeperTeam.keeper.name:n.keeperLevel===`none`?`—`:i.name;this.useRigs(Kf(n.kickerTeam,n.kicker),{height:n.kicker.height,build:n.kicker.build},qf(n.keeperTeam,r,a),n.role===`keep`?1.88:i.height),this.keeperRig.root.visible=n.keeperLevel!==`none`;let o=new Np({kickerRig:this.kickerRig,keeperRig:this.keeperRig,keeperProfile:n.role===`keep`?Hf.advanced:i,keeperAI:n.role===`kick`&&n.keeperLevel!==`none`,takerId:n.kicker.id,attributes:n.attrs,pressure:n.pressure,noKeeper:n.keeperLevel===`none`});o.world.env.wind.set(Pp[this.settings.wind],0,-.3*Pp[this.settings.wind]),this.sim=o;let s,c;if(n.role===`kick`)n.kicker.id===`user`?this.foot=this.settings.foot:(this.foot=n.kicker.foot,this.runDist=n.kicker.run.distance,this.runAngle=n.kicker.run.angle,this.tempo=n.kicker.run.tempo,t||(this.technique=n.kicker.favorite)),t||(this.aim.set(this.foot===`right`?-2.3:2.3,.8),this.spin.set(0,0)),n.targets?.length&&this.aim.set(n.targets[0].x,n.targets[0].y),s=this.currentSetup(),c=this.currentIntent(),this.cpuPlan=null,this.cameraMode=this.settings.kickerCamera,this.state=`aim`;else{let e=this.cpuPlan=yp(n.kicker,n.cpuSeed,n.pressure);s={ball:new W(0,Z.radius,11),foot:n.kicker.foot,distance:e.run.distance,angle:e.run.angle,tempo:e.run.tempo,technique:e.intent.technique},c=e.intent,this.cameraMode=this.settings.keeperCamera,this.state=`keeperWait`,this.keeperTarget=null}o.prepare(s,c),this.power=0,this.stateT=0,this.acc=0,this.resultShown=!1,this.keeperDiveSent=!1,this.notable=!1,this.timingMsg=null,this.recorder.clear(),this.rs.goal.net.reset(),this.rs.trail.clear(),this.rs.hoops.set(n.targets??[],Q.postZ),this.rs.guide.mesh.count=0,this.prevBall.copy(o.world.ball.p),this.cam.setMode(this.cameraMode),this.ui.hideResult(),this.ui.hideReplayBar(),this.ui.showHud(n.role,this.touch),this.ui.setScoreboard(this.mode.scoreboard()),this.ui.setKickerCard(n.kicker.name,n.kicker.number,n.kicker.foot,n.attrs,n.kickerTeam.name,n.role===`kick`),this.ui.setKeeperCard(a,n.role===`keep`?`user`:n.keeperLevel),this.ui.setTechnique(this.technique),this.ui.setLabel(n.label,n.role===`kick`?`${n.kicker.name} na marca`:`Defenda: ${n.kicker.name}`),this.ui.setKickControlsVisible(!0),this.audio.setChant(n.pressure<.5),this.excitement=.4+.35*n.pressure,this.dirty=!0,this.updateStadiumScreens(n.role===`kick`?n.kicker.name.toUpperCase():`DEFENDA!`,n.label),setTimeout(()=>this.audio.whistle(),700)}currentSetup(){return{ball:new W(0,Z.radius,11),foot:this.foot,distance:this.runDist,angle:this.runAngle,tempo:this.tempo,technique:this.technique}}currentIntent(){let e=this.foot===`right`?1:-1;return{technique:this.technique,foot:this.foot,power:Math.max(.05,this.power||.8),target:{x:this.aimWithSway().x,y:this.aimWithSway().y},spinPitch:-this.spin.y*.18,spinYaw:e*this.spin.x*.16,approachSpeed:this.tempo}}aimWithSway(){let e=this.spec;if(!e)return this.aim;let t=e.pressure*(1.1-e.attrs.composure/100),n=this.time,r=.42*t;return new U(this.aim.x+r*(Math.sin(n*1.7)*.7+Math.sin(n*3.9+1.3)*.3),this.aim.y+r*.6*Math.sin(n*2.3+.6))}setTechnique(e){this.state===`aim`&&this.sim&&(this.technique=e,this.ui.setTechnique(e),this.reprepare())}setupEdit(e){this.state===`aim`&&(e===`d-`&&(this.runDist=X(this.runDist-.5,1.5,7.5)),e===`d+`&&(this.runDist=X(this.runDist+.5,1.5,7.5)),e===`a-`&&(this.runAngle=X(this.runAngle-.1,-.35,1.05)),e===`a+`&&(this.runAngle=X(this.runAngle+.1,-.35,1.05)),e===`t-`&&(this.tempo=X(this.tempo-.2,2.2,5.4)),e===`t+`&&(this.tempo=X(this.tempo+.2,2.2,5.4)),e===`f`&&(this.foot=this.foot===`right`?`left`:`right`),this.reprepare())}reprepare(){this.sim&&(this.sim.prepare(this.currentSetup(),this.currentIntent()),this.dirty=!1,this.settings.guide&&this.mode?.id===`training`&&this.rs.guide.set(this.sim.previewPath()))}finishMode(){let e=this.mode.summary();this.state=`result`,this.ui.hideHud(),this.ui.hideResult(),e.confetti&&(this.rs.confetti.fire(new W(0,0,8)),this.audio.reaction(`goal`,1),this.crowdJump.home=1),this.updateStadiumScreens(e.win?`CAMPEÃO!`:`FIM`,e.title),this.ui.showSummary(e,{again:()=>this.start(this.modeFactory),menu:()=>this.enterMenu()})}frame=e=>{requestAnimationFrame(this.frame);let t=Math.min(.1,Math.max(0,(e-this.last)/1e3));this.last=e,this.time+=t,this.frameNo++;let n=this.input;n.poll(),n.pausePressed()&&this.state!==`menu`&&this.togglePause(),n.cameraPressed()&&this.state!==`menu`&&this.state!==`replay`&&this.cycleCamera(),n.followPressed()&&(this.settings.followBall=!this.settings.followBall,ep(),this.ui.toast(this.settings.followBall?`Câmera segue a bola`:`Câmera fixa`));let r=this.ui.paused||this.ui.panelOpen&&this.state!==`menu`;r||this.updateState(t),this.updateCrowdAndAudio(t),this.rs.render(r?0:t,this.tension,this.pulse),n.endFrame()};togglePause(){this.ui.paused?this.ui.hidePause():this.state!==`menu`&&this.ui.showPause({resume:()=>this.ui.hidePause(),restart:()=>{this.ui.hidePause(),this.modeFactory&&this.start(this.modeFactory)},settings:()=>{this.ui.hidePause(),this.ui.settingsPanel()},menu:()=>{this.ui.hidePause(),this.enterMenu()}})}cycleCamera(){let e=this.spec?.role===`keep`?El:Tl,t=e.indexOf(this.cameraMode);this.cameraMode=e[(t+1)%e.length],this.cam.setMode(this.cameraMode,!1),this.ui.toast(wl[this.cameraMode],1200)}updateState(e){if(this.stateT+=e,this.state===`menu`){this.updateMenu(e);return}if(this.state===`replay`){this.updateReplay(e);return}let t=this.sim;if(!t)return;let n=this.spec;switch(this.state){case`aim`:this.handleAim(e);break;case`charge`:this.handleAimMotion(e,.5),this.input.actionDown()&&(this.power=Math.min(1.15,this.power+e/1.05)),this.ui.setPower(this.power),(this.input.actionReleased()||!this.input.actionDown()&&this.power>0)&&(t.updateIntent({power:this.power,target:this.vecTarget()}),t.startRunUp(),this.state=`run`,this.stateT=0,this.ui.setLabel(``,``));break;case`keeperWait`:this.handleKeeperInput(e),this.stateT>1.8&&(t.startRunUp(),this.state=`run`,this.stateT=0,this.ui.setLabel(``,``));break;case`run`:n.role===`kick`?this.handleRunUser(e):(this.handleCpuRun(),this.handleKeeperInput(e)),t.phase===`flight`&&(this.state=`flight`,this.stateT=0);break;case`flight`:n.role===`keep`&&this.handleKeeperInput(e),t.phase===`done`&&!this.resultShown&&this.onShotDone();break;case`result`:this.input.replayPressed()?this.startReplay(!1):this.input.continuePressed()&&this.stateT>.4&&this.advance()}this.stepSim(e),this.syncVisuals(e),this.updateCamera(e),this.updateHud(e)}vecTarget(){let e=this.aimWithSway();return{x:e.x,y:e.y}}handleAimMotion(e,t){let n=this.input,r=n.aimAxis(),i=!1;if(Math.abs(r.x)+Math.abs(r.y)>0&&(this.aim.x+=r.x*2.3*t*e,this.aim.y+=r.y*1.5*t*e,i=!0),(n.drag.x||n.drag.y)&&(this.aim.x+=n.drag.x*.012,this.aim.y-=n.drag.y*.012,i=!0),n.pointer.moved&&n.pointer.active&&n.lastDevice===`keyboard`){let e=this.pointerOnGoal();e&&(this.aim.set(e.x,e.y),i=!0)}let a=n.spinAxis();(a.x||a.y||n.wheel)&&(this.spin.x=X(this.spin.x+a.x*e*1.6,-1,1),this.spin.y=X(this.spin.y+a.y*e*1.6-n.wheel*.12,-1,1),i=!0),this.aim.x=X(this.aim.x,-4.8,4.8),this.aim.y=X(this.aim.y,.12,3.4),i&&(this.dirty=!0)}pointerOnGoal(){this.raycaster.setFromCamera(new U(this.input.pointer.x,this.input.pointer.y),this.rs.camera);let e=new W;return this.raycaster.ray.intersectPlane(this.goalPlane,e)?new U(e.x,e.y):null}handleAim(e){let t=this.input,n=this.sim;this.handleAimMotion(e,1);let r=t.techniquePressed();r!==null&&this.setTechnique(id[r]);let i=t.techniqueCycle();if(i){let e=id.indexOf(this.technique);this.setTechnique(id[(e+i+id.length)%id.length])}t.footPressed()&&this.setupEdit(`f`);let a=t.runAdjust();if(a.dist&&this.setupEdit(a.dist>0?`d+`:`d-`),a.angle&&this.setupEdit(a.angle>0?`a+`:`a-`),t.pressed(`Minus`)&&this.setupEdit(`t-`),t.pressed(`Equal`)&&this.setupEdit(`t+`),this.solveTimer-=e,this.solveTimer<=0||this.dirty&&this.solveTimer<=0){this.solveTimer=.12;let e=this.spec;(this.dirty||e.pressure>.2)&&(n.updateIntent({...this.currentIntent(),power:.85}),this.settings.guide&&this.mode?.id===`training`&&this.rs.guide.set(n.previewPath()),this.dirty=!1)}t.actionPressed()&&this.stateT>.35&&!this.ui.panelOpen&&(this.state=`charge`,this.power=0,this.stateT=0)}handleRunUser(e){let t=this.sim,n=this.input,r=t.kicker;r.speedInput=n.speedAxis(),n.stutterPressed()&&r.stutter()&&this.ui.toast(`Paradinha`,900);let i=this.aim.clone(),a=n.aimAxis();if(this.aim.x=X(this.aim.x+a.x*1.8*e+n.drag.x*.01,-4.8,4.8),n.pointer.moved&&n.lastDevice===`keyboard`){let e=this.pointerOnGoal();e&&this.aim.set(X(e.x,-4.8,4.8),X(e.y,.12,3.4))}if((!i.equals(this.aim)||this.spec.pressure>.2)&&(this.solveTimer-=e,this.solveTimer<=0&&(this.solveTimer=.1,t.updateIntent({target:this.vecTarget()}))),n.actionPressed()&&(t.pressTiming(),this.timingFeedbackPending=!0),this.timingFeedbackPending&&r.plantTime>=0&&t.timingPress!==null){this.timingFeedbackPending=!1;let e=t.timingError()??0,n=Math.abs(e);this.timingMsg=n<.12?{text:`Perfeito`,color:`#3ddc8f`,t:1}:n<.45?{text:e<0?`Cedo`:`Tarde`,color:`#f2b636`,t:1}:{text:e<0?`Muito cedo`:`Muito tarde`,color:`#ff5d5d`,t:1}}}timingFeedbackPending=!1;handleCpuRun(){let e=this.sim,t=this.cpuPlan,n=e.kicker;n.speedInput=t.speedInput,t.stutter&&!n.stutterUsed&&n.pathLen-n.s<2.6&&n.stutter();let r=n.timeToContact-n.swingDuration;e.timingPress===null&&(t.timingOffset<0&&n.plantTime<0&&r<=-t.timingOffset||t.timingOffset>=0&&n.plantTime>=0&&n.t>=n.plantTime+t.timingOffset)&&e.pressTiming()}handleKeeperInput(e){let t=this.sim,n=t.keeper,r=this.input,i=r.aimAxis();if(!this.keeperDiveSent){if(r.pointer.active&&r.lastDevice===`keyboard`){let e=this.pointerOnGoal();e&&(this.keeperTarget=new U(X(e.x,-4,4),X(e.y,.1,2.6)))}if(r.drag.x||r.drag.y){let e=this.keeperTarget??new U(n.com.x,1);e.x=X(e.x+r.drag.x*.012,-4,4),e.y=X(e.y-r.drag.y*.012,.1,2.6),this.keeperTarget=e}if((!t.kickTime||t.kickTime<0)&&n.setShuffle(n.shuffleTarget+i.x*1.6*e*!r.actionDown()),r.actionPressed()){let e,r=`dive`;Math.abs(i.x)>.25||Math.abs(i.y)>.25?e=new W(n.com.x+i.x*3.3,X(1+i.y*1.2,.15,2.5),n.com.z+.3):this.keeperTarget?e=new W(this.keeperTarget.x,this.keeperTarget.y,n.com.z+.3):(e=new W(n.com.x,1.1,n.com.z+.3),r=`stand`);let a=Math.abs(e.x-n.com.x);r!==`stand`&&(a<.5&&e.y>1.9?r=`jump`:a<.5?r=`stand`:a<1.3&&e.y<.6&&(r=`collapse`));let o=t.world.ball,s=t.kickTime>=0&&o.v.z<-1?Math.max(.12,(o.p.z-n.com.z)/-o.v.z):.42;n.dive({target:e,arrival:s,mode:r}),this.keeperDiveSent=!0}}if(t.kickTime>=0){let e=t.world.ball,r=n.com.clone().add(new W(0,.45,.15)),i=e.p.clone().addScaledVector(e.v,.04);i.distanceTo(r)<1.25&&e.v.z<0?(n.handTarget.L=i.clone().add(new W(.1,0,.05)),n.handTarget.R=i.clone().add(new W(-.1,0,.05))):n.handTarget.L=n.handTarget.R=null}}stepSim(e){let t=this.sim;this.acc+=e;let n=0;for(;this.acc>=.004166666666666667&&n<30;){this.prevBall.copy(t.world.ball.p),t.step();let e=this.rs.goal.net;e.step(Ul,this.prevBall,t.world.ball.p),(this.state===`run`||this.state===`flight`||this.state===`result`)&&this.recorder.duration<12&&this.recorder.record(t.world.ball,this.kickerRig,this.keeperRig,e.pos,e.awake>0);for(let e of t.events)this.onSimEvent(e);this.acc-=Ul,n++}n>=30&&(this.acc=0)}onSimEvent(e){let t=this.sim,n=this.spec;switch(e.type){case`kick`:{this.recorder.mark(`kick`),this.kickSurface=rd[t.intent.technique].surface,this.audio.kick(e.speed,e.point,this.kickSurface);let n=t.world.ball.v.clone().setY(0).normalize();this.rs.spray.burst(e.point.clone().setY(.02),n,26,1.2),this.cam.shake(.25),this.excitement=.7,this.tension=0,this.ui.setTiming(!1,0),this.ui.setKickControlsVisible(!1),this.rs.aim.group.visible=!1,this.rs.guide.mesh.count=0;break}case`post`:case`bar`:this.audio.post(e.speed,e.point),this.cam.shake(.6),this.notable=!0,this.audio.reaction(`gasp`,.8);break;case`net`:this.audio.net(e.speed,e.point);break;case`keeper`:e.part?.startsWith(`hand`)||e.part?.startsWith(`foreArm`)?this.audio.glove(e.speed,e.point):this.audio.bounce(e.speed*1.5,e.point),e.speed>16&&(this.notable=!0);break;case`catch`:this.audio.glove(e.speed+5,e.point);break;case`goal`:{let e=n.userTeamIsKicking;this.ui.banner(n.role===`keep`?`Gol`:`GOL!`,e?`goal`:`miss`),this.audio.reaction(e||this.mode?.id!==`shootout`?`goal`:`miss`,1),this.audio.say(e?`Gooool!`:`Gol do adversário.`,e),e?this.crowdJump.home=1:this.crowdJump.away=1,this.excitement=1,this.rs.flashScreen(.08),this.notable=!0,this.updateStadiumScreens(`GOL!`,`${n.kicker.name} · ${t.world.ball.v.length(),``}`);break}case`ground`:e.speed>1.5&&this.audio.bounce(e.speed,e.point);break;case`board`:this.audio.board(e.speed,e.point)}}onShotDone(){let e=this.sim,t=this.spec,n=e.stats;this.resultShown=!0;let r=this.mode.onResult(n,t);if(t.role===`kick`&&n.outcome!==`retake`){tp({t:Date.now(),mode:this.mode.id,outcome:n.outcome,technique:n.technique,speed:n.speedKmh,precision:n.precisionCm,x:n.crossing.x,y:n.crossing.y,keeper:t.keeperLevel,quality:n.quality});let e=$f().records;n.speedKmh>e.maxSpeed&&(e.maxSpeed=n.speedKmh),ep()}let i=n.outcome===`goal`;if(e.kicker.react(i?`goal`:n.outcome===`saved`?`save`:n.outcome===`post`?`post`:`miss`),e.keeper.react(i?`goal`:`save`),!i){let e=t.role===`keep`&&n.outcome===`saved`;n.outcome===`saved`?(this.ui.banner(n.caught?`Encaixou!`:`Defesa!`,`save`),this.audio.reaction(t.role===`keep`||this.mode?.id!==`shootout`?`save`:`miss`,1),this.audio.say(n.caught?`Que segurança do goleiro!`:`Que defesa!`,!0),e?this.crowdJump.home=1:this.mode?.id===`shootout`&&(this.crowdJump.away=1),this.notable=this.notable||n.speedKmh>70):n.outcome===`post`?(this.ui.banner(n.outcomeLabel.includes(`TRAVESSÃO`)?`Travessão!`:`Na trave!`,`miss`),this.audio.say(`Na trave!`,!0),this.audio.reaction(`post`,1)):n.outcome===`retake`?(this.ui.banner(`Repetir`,`miss`),this.audio.whistle(!0)):(this.ui.banner(n.outcome===`over`?`Por cima!`:`Pra fora!`,`miss`),this.audio.reaction(`miss`,.9),this.audio.say(n.outcome===`over`?`Por cima do gol!`:`Pra fora!`,!1)),this.updateStadiumScreens(n.outcomeLabel,t.kicker.name)}this.ui.setScoreboard(this.mode.scoreboard()),this.state=`result`,this.stateT=0;let a=this.isModeFinished()?`Ver resumo`:`Próxima cobrança`;this.lastResult={msg:r,nextLabel:a},this.settings.autoReplay&&this.notable&&n.outcome!==`retake`&&setTimeout(()=>{this.state===`result`&&this.sim===e&&this.startReplay(!0)},1600),setTimeout(()=>{this.state===`result`&&this.sim===e&&this.showResultCard()},1100)}lastResult={msg:null,nextLabel:``};showResultCard(){this.sim?.stats&&this.ui.showResult(this.sim.stats,this.lastResult.msg,{replay:()=>this.startReplay(!1),next:()=>this.advance(),menu:()=>this.enterMenu()},this.lastResult.nextLabel)}isModeFinished(){let e=this.mode;return e?e instanceof op?e.finished:e instanceof cp?e.shots>=e.kicksTotal:e instanceof up&&e.shots>=e.stage.kicks:!0}advance(){this.state===`result`&&(this.ui.hideResult(),this.nextKick())}startReplay(e){if(this.recorder.duration<.3)return;this.state=`replay`,this.ui.hideResult();let t=this.replay;t.auto=e,t.autoStep=0,t.speed=e?.35:.25,t.playing=!0,t.angle=0,t.trail=!0,t.t=Math.max(0,this.recorder.contactT-1.1),t.liveNet=this.rs.goal.net.capture(),this.cam.setMode(this.replayAngles[0]),this.ui.showReplayBar({toggle:()=>t.playing=!t.playing,speed:e=>t.speed=e,angle:()=>{t.angle=(t.angle+1)%this.replayAngles.length,this.cam.setMode(this.replayAngles[t.angle])},seek:e=>{t.t=e,t.playing=!1},contact:()=>{t.t=this.recorder.contactT,t.playing=!1,t.speed=.1},trail:()=>t.trail=!t.trail,close:()=>this.endReplay()},this.recorder.duration)}endReplay(){this.ui.hideReplayBar(),this.state=`result`,this.stateT=0,this.rs.dofEnabled=!1,this.rs.trail.clear(),this.replay.liveNet&&this.rs.goal.net.restore(this.replay.liveNet),this.cam.setMode(this.cameraMode),this.sim?.kicker.pose(0),this.showResultCard()}updateReplay(e){let t=this.replay,n=this.recorder;if(this.input.pressed(`Escape`)||this.input.replayPressed()){this.endReplay();return}this.input.pressed(`Space`)&&(t.playing=!t.playing),t.playing&&(t.t+=e*t.speed);let r=n.duration-.02;if(t.t>=r){if(t.t=r,t.auto){if(t.autoStep++,t.autoStep>=2){this.endReplay();return}t.t=Math.max(0,n.contactT-.5),t.angle=1,t.speed=.5,this.cam.setMode(this.replayAngles[t.angle])}else t.playing=!1}let i={p:new W,q:new kt,v:new W};n.apply(t.t,this.kickerRig,this.keeperRig,i);let a=n.netAt(t.t);a?this.rs.goal.net.restore(a):this.rs.goal.net.reset(),this.rs.updateBall(i.p,i.q,t.playing?i.v.clone().multiplyScalar(t.speed):new W),t.trail&&t.t>n.contactT?this.rs.trail.setPoints(n.path(n.contactT,t.t)):this.rs.trail.clear(),this.updateFootShadows();let o=t.t>=n.contactT,s=this.cameraContext(i.p,i.v,o,t.t-n.contactT,!0);this.cam.update(e,s),this.rs.dofEnabled=!0,this.rs.dofFocus=this.rs.camera.position.distanceTo(o?i.p:s.kickerPos),this.ui.updateReplayTime(t.t)}syncVisuals(e){let t=this.sim,n=t.world.ball,r=this.acc/Ul;this.ballInterp.copy(this.prevBall).lerp(n.p,Math.min(1,r)),this.rs.updateBall(this.ballInterp,n.q,n.v),(this.state===`flight`||this.state===`result`)&&t.kickTime>=0&&this.state===`flight`&&this.rs.trail.push(n.p),this.updateFootShadows();let i=this.state===`aim`||this.state===`charge`||this.state===`run`&&t.phase===`runup`;if(this.spec.role===`kick`){this.rs.aim.group.visible=i;let e=this.aimWithSway();this.rs.aim.set(e.x,e.y,Q.postZ+.03,this.time,1)}else{let e=this.keeperTarget;this.rs.aim.group.visible=!!e&&!this.keeperDiveSent&&this.state!==`result`,e&&this.rs.aim.set(e.x,e.y,Q.postZ+.03,this.time,.7)}}updateFootShadows(){let e=this.rs.footShadows,t=[this.kickerRig,this.keeperRig],n=0;for(let r of t)for(let t of[`footL`,`footR`]){let i=r.worldPos(t,new W);r.root.visible?e[n].update(i.x,i.z+.06,Math.max(0,i.y-.08),.35):e[n].mesh.visible=!1,n++}}cameraContext(e,t,n,r,i=!1){let a=this.kickerRig,o=this.sim,s=a.worldPos(`hips`,new W),c=a.worldPos(`head`,new W),l=o?o.kicker.runDir.clone():new W(0,0,-1),u=this.spec?.role===`kick`?this.aimWithSway():new U(0,1);return{ball:e,ballVel:t,kickerPos:s.setY(0),kickerHead:c,kickerFwd:l,keeperPos:this.keeperRig.worldPos(`hips`,new W),aim:new W(u.x,u.y,0),kicked:n,followBall:i?!0:this.settings.followBall,sinceKick:r}}updateCamera(e){let t=this.sim,n=t.world.ball,r=t.kickTime>=0,i=this.cameraContext(this.ballInterp.clone(),n.v.clone(),r,r?t.time-t.kickTime:-1);this.cam.update(e,i),this.rs.dofEnabled=this.cam.dofWanted,this.rs.dofFocus=this.cam.dofFocus}updateHud(e){let t=this.sim;if(this.spec.role===`kick`){let n=this.aimWithSway(),r=new W(n.x,n.y,Q.postZ).sub(t.ballSpot),i=Math.atan2(r.x,-r.z)*180/Math.PI,a=rd[this.technique],o=this.foot===`right`?1:-1,s=o*(a.contactYaw+o*this.spin.x*.16),c=a.contactPitch-this.spin.y*.18;this.ui.setIndicators(n.y,i,Math.hypot(n.x,0),{x:X(s/.45,-1,1),y:X(-c/.65,-1,1)}),this.state===`aim`?(this.ui.setPower(0),this.ui.setSetup({distance:this.runDist,angle:this.runAngle,tempo:this.tempo,foot:this.foot,editable:!0}),this.ui.setHelp(this.touch?`Arraste para mirar · segure <b>CHUTAR</b> para a potência`:`<kbd>Mouse</kbd>/<kbd>WASD</kbd> mira · <kbd>I J K L</kbd>/roda efeito · <kbd>1-7</kbd> técnica · <kbd>T</kbd> pé · <kbd>[ ]</kbd> distância · <kbd>, .</kbd> ângulo · <kbd>- =</kbd> ritmo · segure <kbd>Espaço</kbd>`)):this.state===`charge`?this.ui.setHelp(`Solte para iniciar a corrida · zona vermelha = potência excessiva`):this.state===`run`&&(this.ui.setHelp(this.touch?`Toque CHUTAR quando o anel fechar`:`<kbd>W/S</kbd> acelera/freia · <kbd>Shift</kbd> paradinha · <kbd>Espaço</kbd> no anel dourado`),this.ui.setSetup({distance:this.runDist,angle:this.runAngle,tempo:t.kicker.v,foot:this.foot,editable:!1}));let l=t.kicker;if(this.state===`run`&&t.phase===`runup`){let e=l.plantTime>=0?-(l.t-l.plantTime):Math.max(0,l.timeToContact-l.swingDuration),t=e<.75&&e>-.11;this.ui.setTiming(t,X(e/.75,0,1),this.timingMsg?.text,this.timingMsg?.color)}else this.ui.setTiming(!1,0,this.timingMsg&&this.timingMsg.t>0?this.timingMsg.text:void 0,this.timingMsg?.color);this.timingMsg&&(this.timingMsg.t-=e,this.timingMsg.t<=0&&(this.timingMsg=null))}else this.ui.setTiming(!1,0),(this.state===`keeperWait`||this.state===`run`)&&this.ui.setHelp(this.touch?`Arraste para escolher o canto · toque SALTAR no momento certo (sem direção = fica no centro)`:`<kbd>A/D</kbd> desloca na linha · mouse escolhe o canto · <kbd>Espaço</kbd>/clique salta (direção com <kbd>WASD</kbd> na hora)`)}updateMenu(e){let t=this.menuSim;if(!t)return;for(this.acc+=e;this.acc>=Ul;)t.step(),this.acc-=Ul;this.rs.updateBall(t.world.ball.p,t.world.ball.q,new W),this.updateFootShadows();let n=this.time*.06,r=new W(Math.sin(n)*19,4.2+1.5*Math.sin(n*1.3),7+Math.cos(n)*12);this.cam.place(r,new W(0,1.1,5.5),38,e,0),this.rs.dofEnabled=!1}updateCrowdAndAudio(e){let t=this.spec,n=this.state===`aim`||this.state===`charge`||this.state===`keeperWait`||this.state===`run`,r=n&&t?t.pressure*(this.state===`run`?1:.75):0;this.tension+=(r-this.tension)*bl(e,.6),this.pulse=this.tension>.35?Math.max(0,Math.sin(this.time*Math.PI*2*((68+50*this.tension)/60)))**8:0,n||(this.excitement+=(.4-this.excitement)*bl(e,3.5)),this.crowdJump.home*=Math.exp(-e/2.6),this.crowdJump.away*=Math.exp(-e/2.6);let i=this.rs.stadium.crowd.material.uniforms;i.uExcite.value=this.excitement*(1-.6*this.tension),i.uHomeJump.value=this.crowdJump.home,i.uAwayJump.value=this.crowdJump.away,i.uFlash.value=+(this.tension>.5||this.crowdJump.home>.3),this.audio.setExcitement(Math.min(1,this.excitement+.5*Math.max(this.crowdJump.home,this.crowdJump.away))),this.audio.setTension(this.tension);let a=this.rs.camera;this.audio.updateListener(a.position,a.getWorldDirection(new W)),this.audio.update(e)}updateStadiumScreens(e,t){let n=this.mode?.scoreboard(),r=n?.right?`${n.left.short} ${n.left.goals} × ${n.right.goals} ${n.right.short}`:n?`${n.left.goals}`:void 0;this.rs.stadium.drawScreens({title:e,sub:t,score:r})}}(document.getElementById(`app`),document.getElementById(`view`));Fp.boot().catch(e=>{console.error(e);let t=document.createElement(`div`);t.style.cssText=`position:fixed;inset:auto 16px 16px 16px;padding:12px;background:#300;color:#fff;font:14px system-ui;border-radius:8px;z-index:99`,t.textContent=`Não foi possível iniciar o WebGL neste navegador: `+(e?.message??e),document.body.appendChild(t)}),window.__game=Fp;