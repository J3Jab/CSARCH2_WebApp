import{S as ye,i as ke,s as Se,e as f,t as B,a as g,b as u,c as L,d as o,f as ae,n as ie,g as F,h as y,l as P,j as ue,k as V,m as ce,p as J,u as xe,o as fe,q as pe,r as de,v as Pe,w as Me}from"./vendor.3aaedc88.js";const Te=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const l of r)if(l.type==="childList")for(const a of l.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function n(r){const l={};return r.integrity&&(l.integrity=r.integrity),r.referrerpolicy&&(l.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?l.credentials="include":r.crossorigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function s(r){if(r.ep)return;r.ep=!0;const l=n(r);fetch(r.href,l)}};Te();var X=(t=>(t.Truncate="Truncate",t.RoundToNearest="Round To Nearest",t.RoundUp="Round Up",t.RoundDown="Round Down",t))(X||{});function be(t,e){if(t==0)return{decimal:t,exponent:e};if(t<1e6&&t>-1e6)for(;t<1e6&&t>-1e6;)t*=10,e-=1;else for(;t>9999999||t<-9999999;)t/=10,e+=1;return{decimal:t,exponent:e}}function Ne(t,e){switch(t.toString()){case"Truncate":return console.log("trunc",Math.trunc(e)),Math.trunc(e);case"RoundDown":return console.log("down",Math.floor(e)),Math.floor(e);case"RoundUp":return console.log("up",Math.ceil(e)),Math.ceil(e);case"RoundToNearest":return console.log("nearest",Math.round(e/2)*2),Math.round(e/2)*2}return e}function je(t){for(t=Math.abs(t);t>9;)t/=10;return Math.trunc(t).toString(2).padStart(4,"0")}function he(t){return(t+101).toString(2).padStart(8,"0")}function ge(t,e){const n=parseInt(t,2);return n>=0&&n<=7?e.substring(0,2)+t.substring(1,4):"11"+e.substring(0,2)+t.charAt(3)}function Re(t){switch(t){case"000":return"bcdfgh0jkm";case"001":return"bcdfgh100m";case"010":return"bcdjkh101m";case"011":return"bcd10h111m";case"100":return"jkdfgh110m";case"101":return"fgd01h111m";case"110":return"jkd00h111m";case"111":return"00d11h111m"}return""}function Ce(t,e){switch(e){case"a":return t[0][0];case"b":return t[0][1];case"c":return t[0][2];case"d":return t[0][3];case"e":return t[1][0];case"f":return t[1][1];case"g":return t[1][2];case"h":return t[1][3];case"i":return t[2][0];case"j":return t[2][1];case"k":return t[2][2];case"m":return t[2][3];case"1":return"1";case"0":return"0"}}function me(t){let e=[],n;for(let a=0;a<3;a++)n=parseInt(t.charAt(a)).toString(2).padStart(4,"0"),e.push(n);const s=e[0][0]+e[1][0]+e[2][0],r=Re(s);let l="";for(let a=0;a<r.length;a++)l+=Ce(e,r.charAt(a));return l}function Ie(t){const e=Math.abs(t).toString().padStart(7,"0"),n=e.substring(1,4),s=e.substring(4,7);return{first3Digits:me(n),last3Digits:me(s)}}function De(t){let e="",n=0,s="";for(let r=1;r<=8;r++)n=r*4,s=t.substring(n-4,n),e=e+parseInt(s,2).toString(16);return"0x"+e.toUpperCase()}function Oe(t,e,n){let s=Number(t);({decimal:s,exponent:e}=be(s,e)),s=Ne(n,s),{decimal:s,exponent:e}=be(s,e);const r=s>=0?0:1;let l,a,c="0000000000",h;if(h=c,s===0){const _=he(e);l=ge("0000",_),a=_.substring(2)}else if(e>90||e<-101)l="11110",a="000000";else if(isNaN(s))l="11111",a="000000";else{const _=je(s),p=he(e);l=ge(_,p),a=p.substring(2),{first3Digits:c,last3Digits:h}=Ie(s)}const d=r+l+a+c+h;return{bin:d.match(/.{1,4}/g).join(" "),hex:De(d)}}function Ae(t){let e,n,s,r,l,a;return{c(){e=f("div"),n=f("p"),s=B(t[0]),r=g(),l=f("p"),a=B(t[1]),u(n,"class","uppercase text-center text-2xl font-extrabold mb-2"),u(l,"class","text-center text-xl font-bold"),u(e,"class","my-10")},m(c,h){L(c,e,h),o(e,n),o(n,s),o(e,r),o(e,l),o(l,a)},p(c,[h]){h&1&&ae(s,c[0]),h&2&&ae(a,c[1])},i:ie,o:ie,d(c){c&&F(e)}}}function Ee(t,e,n){let{title:s}=e,{value:r}=e;return t.$$set=l=>{"title"in l&&n(0,s=l.title),"value"in l&&n(1,r=l.value)},[s,r]}class _e extends ye{constructor(e){super();ke(this,e,Ee,Ae,Se,{title:0,value:1})}}function ve(t,e,n){const s=t.slice();return s[15]=e[n],s}function we(t,e){let n,s,r,l=e[15]+"",a,c,h,d,_;return{key:t,first:null,c(){n=f("input"),s=g(),r=f("label"),a=B(l),c=g(),u(n,"type","radio"),u(n,"id",e[15]),n.__value=e[15],n.value=n.__value,u(n,"class","hidden"),e[14][0].push(n),u(r,"for",h=e[15]),u(r,"class","btn bg-gray-300 text-gray-600 active:bg-blue-700 active:text-white"),y(r,"selected",e[2].toString()==e[15]),this.first=n},m(p,v){L(p,n,v),n.checked=n.__value===e[2],L(p,s,v),L(p,r,v),o(r,a),o(r,c),d||(_=P(n,"change",e[13]),d=!0)},p(p,v){e=p,v&4&&(n.checked=n.__value===e[2]),v&36&&y(r,"selected",e[2].toString()==e[15])},d(p){p&&F(n),e[14][0].splice(e[14][0].indexOf(n),1),p&&F(s),p&&F(r),d=!1,_()}}}function Le(t){let e,n,s,r,l,a,c,h,d,_,p,v,w,M,H,m,U,x,Q,q,W,I,k=[],Y=new Map,Z,R,T,$,z,ee,D,O,te,A,ne,C,N,re,j,E,G,le,K=t[5];const se=i=>i[15];for(let i=0;i<K.length;i+=1){let b=ve(t,K,i),S=se(b);Y.set(S,k[i]=we(S,b))}return N=new _e({props:{title:"Hex",value:t[4].hex}}),j=new _e({props:{title:"Bin",value:t[4].bin}}),{c(){e=f("main"),n=f("p"),n.textContent="Decimal-32 Floating Point to Binary and Hexadecimal Converter",s=g(),r=f("form"),l=f("div"),a=f("div"),c=f("label"),c.textContent="Decimal",h=g(),d=f("input"),_=g(),p=f("p"),p.textContent="Please fill out this field.",v=g(),w=f("div"),M=f("label"),M.textContent="Exponent",H=g(),m=f("input"),U=g(),x=f("p"),x.textContent="Please fill out this field.",Q=g(),q=f("p"),q.textContent="Round Off Method",W=g(),I=f("div");for(let i=0;i<k.length;i+=1)k[i].c();Z=g(),R=f("div"),T=f("button"),$=B("Copy Result to Clipboard"),ee=g(),D=f("div"),O=f("input"),te=g(),A=f("input"),ne=g(),C=f("div"),ue(N.$$.fragment),re=g(),ue(j.$$.fragment),u(n,"class","text-4xl text-center font-bold my-16"),u(c,"class","label"),u(c,"for","decimal"),u(d,"class","appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white"),u(d,"id","decimal"),y(d,"error",t[3].decimal),u(p,"class","error"),y(p,"invisible",!t[3].decimal),u(a,"class","w-full md:w-1/2 px-2 mb-6 md:mb-0"),u(M,"class","label"),u(M,"for","exponent"),u(m,"class","appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"),u(m,"id","exponent"),y(m,"error",t[3].exponent),u(x,"class","error"),y(x,"invisible",!t[3].exponent),u(w,"class","w-full md:w-1/2 px-2"),u(l,"class","flex flex-wrap mb-4"),u(q,"class","label px-2"),u(I,"class","flex flex-wrap mb-8 w-full justify-between md:px-2"),u(T,"class","btn active:bg-gray-700 hover:bg-gray-600 bg-gray-500 text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-500"),T.disabled=z=!t[4].hex,u(O,"class","btn reset mr-2"),u(O,"type","reset"),u(A,"class","btn submit"),u(A,"type","submit"),A.value="Convert",u(R,"class","flex flex-wrap justify-between mb-2 px-2"),u(r,"class","mx-auto w-full max-w-xl p-6 rounded-lg shadow-lg"),u(C,"class","my-10")},m(i,b){L(i,e,b),o(e,n),o(e,s),o(e,r),o(r,l),o(l,a),o(a,c),o(a,h),o(a,d),V(d,t[0]),o(a,_),o(a,p),o(l,v),o(l,w),o(w,M),o(w,H),o(w,m),V(m,t[1]),o(w,U),o(w,x),o(r,Q),o(r,q),o(r,W),o(r,I);for(let S=0;S<k.length;S+=1)k[S].m(I,null);o(r,Z),o(r,R),o(R,T),o(T,$),o(R,ee),o(R,D),o(D,O),o(D,te),o(D,A),o(e,ne),o(e,C),ce(N,C,null),o(C,re),ce(j,C,null),E=!0,G||(le=[P(d,"input",t[9]),P(d,"change",t[10]),P(m,"input",t[11]),P(m,"change",t[12]),P(T,"click",J(t[8])),P(O,"click",J(t[7])),P(r,"submit",J(t[6]))],G=!0)},p(i,[b]){b&1&&d.value!==i[0]&&V(d,i[0]),b&8&&y(d,"error",i[3].decimal),b&8&&y(p,"invisible",!i[3].decimal),b&2&&m.value!==i[1]&&V(m,i[1]),b&8&&y(m,"error",i[3].exponent),b&8&&y(x,"invisible",!i[3].exponent),b&36&&(K=i[5],k=xe(k,b,se,1,i,K,Y,I,Me,we,null,ve)),(!E||b&16&&z!==(z=!i[4].hex))&&(T.disabled=z);const S={};b&16&&(S.value=i[4].hex),N.$set(S);const oe={};b&16&&(oe.value=i[4].bin),j.$set(oe)},i(i){E||(fe(N.$$.fragment,i),fe(j.$$.fragment,i),E=!0)},o(i){pe(N.$$.fragment,i),pe(j.$$.fragment,i),E=!1},d(i){i&&F(e);for(let b=0;b<k.length;b+=1)k[b].d();de(N),de(j),G=!1,Pe(le)}}}function Fe(t,e,n){const s=[];for(const x in X)s.push(x);let r="0",l="0",a=X.Truncate,c={decimal:!1,exponent:!1},h={bin:"",hex:""};function d(){r||n(3,c.decimal=!0,c),l||n(3,c.exponent=!0,c),!c.decimal&&!c.exponent&&n(4,h=Oe(r,parseInt(l),a))}function _(){n(0,r="0"),n(1,l="0"),n(2,a=X.Truncate),n(4,h={bin:"",hex:""})}function p(){navigator.clipboard.writeText(`BIN
${h.bin}
HEX
${h.hex}
`)}const v=[[]];function w(){r=this.value,n(0,r)}const M=()=>n(3,c.decimal=!1,c);function H(){l=this.value,n(1,l)}const m=()=>n(3,c.exponent=!1,c);function U(){a=this.__value,n(2,a)}return[r,l,a,c,h,s,d,_,p,w,M,H,m,U,v]}class He extends ye{constructor(e){super();ke(this,e,Fe,Le,Se,{})}}new He({target:document.getElementById("app")});