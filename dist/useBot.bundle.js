/*! For license information please see useBot.bundle.js.LICENSE.txt */
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("React")):"function"==typeof define&&define.amd?define(["React"],e):"object"==typeof exports?exports.useBot=e(require("React")):t.useBot=e(t.React)}(self,(function(t){return function(){"use strict";var e={1771:function(t,e,r){function n(t){return n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},n(t)}function o(t,e){return{type:e||"text",content:t}}r.d(e,{$4:function(){return i},$Q:function(){return a},Y$:function(){return c},b2:function(){return o}});var a=function(t){return null!=t&&t._seconds?new Date(1e3*t._seconds):null};function i(t,e){var r,n;if(t=t||{},console.log(t),t.response)console.log(t.response.body),console.log(t.response.status),console.log(t.response.headers),null!==(r=t.response.data)&&void 0!==r&&r.message?e&&e("Error: "+t.response.data.message):null!==(n=t.response.data)&&void 0!==n&&n.error?e&&e("Error: "+t.response.data.error):e&&e("An error occurred.");else if(t.data){var o,a;console.log(t.data),console.log(t.status),console.log(t.headers),null!==(o=t.data)&&void 0!==o&&o.message?e&&e("Error: "+t.data.message):null!==(a=t.data)&&void 0!==a&&a.error?e&&e("Error: "+t.data.error):e&&e("An error occurred.")}else t.request?(console.log(t.request),e&&e("An error occurred.")):(console.log("Error",t.message),t.message?e&&e("Error: "+t.message):e&&e("An error occurred."));return console.log(t.config),!1}function c(t,e){if(!t)return"";var r=Object.keys(t).map((function(r){var o=t[r];return t.constructor===Array?r="".concat(e,"[").concat(r,"]"):t.constructor===Object&&(r=e?"".concat(e,"[").concat(r,"]"):r),"object"===n(o)?c(o,r):"".concat(r,"=").concat(encodeURIComponent(o))}));return[].concat.apply([],r).join("&")}},1024:function(e){e.exports=t}},r={};function n(t){var o=r[t];if(void 0!==o)return o.exports;var a=r[t]={exports:{}};return e[t](a,a.exports,n),a.exports}n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,{a:e}),e},n.d=function(t,e){for(var r in e)n.o(e,r)&&!n.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)};var o={};return function(){n.d(o,{default:function(){return g}});var t=n(1024),e=n(1771);function r(t){return r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},r(t)}function a(t){return function(t){if(Array.isArray(t))return p(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||h(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function i(){i=function(){return t};var t={},e=Object.prototype,n=e.hasOwnProperty,o=Object.defineProperty||function(t,e,r){t[e]=r.value},a="function"==typeof Symbol?Symbol:{},c=a.iterator||"@@iterator",u=a.asyncIterator||"@@asyncIterator",s=a.toStringTag||"@@toStringTag";function l(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{l({},"")}catch(t){l=function(t,e,r){return t[e]=r}}function f(t,e,r,n){var a=e&&e.prototype instanceof p?e:p,i=Object.create(a.prototype),c=new I(n||[]);return o(i,"_invoke",{value:E(t,r,c)}),i}function d(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}t.wrap=f;var h={};function p(){}function v(){}function y(){}var m={};l(m,c,(function(){return this}));var g=Object.getPrototypeOf,b=g&&g(g(T([])));b&&b!==e&&n.call(b,c)&&(m=b);var w=y.prototype=p.prototype=Object.create(m);function S(t){["next","throw","return"].forEach((function(e){l(t,e,(function(t){return this._invoke(e,t)}))}))}function x(t,e){function a(o,i,c,u){var s=d(t[o],t,i);if("throw"!==s.type){var l=s.arg,f=l.value;return f&&"object"==r(f)&&n.call(f,"__await")?e.resolve(f.__await).then((function(t){a("next",t,c,u)}),(function(t){a("throw",t,c,u)})):e.resolve(f).then((function(t){l.value=t,c(l)}),(function(t){return a("throw",t,c,u)}))}u(s.arg)}var i;o(this,"_invoke",{value:function(t,r){function n(){return new e((function(e,n){a(t,r,e,n)}))}return i=i?i.then(n,n):n()}})}function E(t,e,r){var n="suspendedStart";return function(o,a){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw a;return{value:void 0,done:!0}}for(r.method=o,r.arg=a;;){var i=r.delegate;if(i){var c=O(i,r);if(c){if(c===h)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var u=d(t,e,r);if("normal"===u.type){if(n=r.done?"completed":"suspendedYield",u.arg===h)continue;return{value:u.arg,done:r.done}}"throw"===u.type&&(n="completed",r.method="throw",r.arg=u.arg)}}}function O(t,e){var r=e.method,n=t.iterator[r];if(void 0===n)return e.delegate=null,"throw"===r&&t.iterator.return&&(e.method="return",e.arg=void 0,O(t,e),"throw"===e.method)||"return"!==r&&(e.method="throw",e.arg=new TypeError("The iterator does not provide a '"+r+"' method")),h;var o=d(n,t.iterator,e.arg);if("throw"===o.type)return e.method="throw",e.arg=o.arg,e.delegate=null,h;var a=o.arg;return a?a.done?(e[t.resultName]=a.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,h):a:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,h)}function j(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function A(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function I(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(j,this),this.reset(!0)}function T(t){if(t){var e=t[c];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var r=-1,o=function e(){for(;++r<t.length;)if(n.call(t,r))return e.value=t[r],e.done=!1,e;return e.value=void 0,e.done=!0,e};return o.next=o}}return{next:L}}function L(){return{value:void 0,done:!0}}return v.prototype=y,o(w,"constructor",{value:y,configurable:!0}),o(y,"constructor",{value:v,configurable:!0}),v.displayName=l(y,s,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===v||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,y):(t.__proto__=y,l(t,s,"GeneratorFunction")),t.prototype=Object.create(w),t},t.awrap=function(t){return{__await:t}},S(x.prototype),l(x.prototype,u,(function(){return this})),t.AsyncIterator=x,t.async=function(e,r,n,o,a){void 0===a&&(a=Promise);var i=new x(f(e,r,n,o),a);return t.isGeneratorFunction(r)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},S(w),l(w,s,"Generator"),l(w,c,(function(){return this})),l(w,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},t.values=T,I.prototype={constructor:I,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(A),!t)for(var e in this)"t"===e.charAt(0)&&n.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function r(r,n){return i.type="throw",i.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var o=this.tryEntries.length-1;o>=0;--o){var a=this.tryEntries[o],i=a.completion;if("root"===a.tryLoc)return r("end");if(a.tryLoc<=this.prev){var c=n.call(a,"catchLoc"),u=n.call(a,"finallyLoc");if(c&&u){if(this.prev<a.catchLoc)return r(a.catchLoc,!0);if(this.prev<a.finallyLoc)return r(a.finallyLoc)}else if(c){if(this.prev<a.catchLoc)return r(a.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return r(a.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var a=o;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=e&&e<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=t,i.arg=e,a?(this.method="next",this.next=a.finallyLoc,h):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),h},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),A(r),h}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;A(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:T(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),h}},t}function c(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function u(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?c(Object(r),!0).forEach((function(e){s(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):c(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function s(t,e,n){return(e=function(t){var e=function(t,e){if("object"!==r(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var o=n.call(t,"string");if("object"!==r(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"===r(e)?e:String(e)}(e))in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function l(t,e,r,n,o,a,i){try{var c=t[a](i),u=c.value}catch(t){return void r(t)}c.done?e(u):Promise.resolve(u).then(n,o)}function f(t){return function(){var e=this,r=arguments;return new Promise((function(n,o){var a=t.apply(e,r);function i(t){l(a,n,o,i,c,"next",t)}function c(t){l(a,n,o,i,c,"throw",t)}i(void 0)}))}}function d(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var r=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=r){var n,o,a,i,c=[],u=!0,s=!1;try{if(a=(r=r.call(t)).next,0===e){if(Object(r)!==r)return;u=!1}else for(;!(u=(n=a.call(r)).done)&&(c.push(n.value),c.length!==e);u=!0);}catch(t){s=!0,o=t}finally{try{if(!u&&null!=r.return&&(i=r.return(),Object(i)!==i))return}finally{if(s)throw o}}return c}}(t,e)||h(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function h(t,e){if(t){if("string"==typeof t)return p(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?p(t,e):void 0}}function p(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}var v="https://chat-gpt-374521.oa.r.appspot.com/v1",y="https://api2.aitoolkit.dev/v1",m={SYSTEM:"system",USER:"user",ASSISTANT:"assistant"};function g(){var r,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{chatId:null,id:null,startMessage:null,enableLocalStorage:!1,fetchHistory:!1,headers:{},customCommands:null},o=d((0,t.useState)(null),2),c=o[0],s=o[1],l=d((0,t.useState)(!1),2),h=l[0],p=l[1],g=d((0,t.useState)(n.startMessage?[Y(new Date,m.SYSTEM,[(0,e.b2)(n.startMessage)],!1,!0)]:[]),2),b=g[0],w=g[1],S=d((0,t.useState)(!1),2),x=S[0],E=S[1],O=d((0,t.useState)(!0),2),j=O[0],A=O[1],I=(0,t.useRef)(),T=d((0,t.useState)(0),2),L=T[0],P=T[1];function N(t){var r=[],o=null==n?void 0:n.id,a=t||null;if(o){var c,l;if(n.startMessage&&(r=[Y(new Date,m.SYSTEM,[(0,e.b2)(n.startMessage)],!1,!0)]),n.enableLocalStorage&&null!==(c=window)&&void 0!==c&&null!==(l=c.localStorage)&&void 0!==l&&l.getItem){var d=window.localStorage.getItem("bot-".concat(n.id));if(d)try{var y=JSON.parse(d);(null==y?void 0:y.timestamp)>Date.now()-864e5?(null==y?void 0:y.chatId)!==a&&a||(null!=y&&y.chatId&&(a=y.chatId),null!=y&&y.messages&&(r=null==y?void 0:y.messages.map((function(t){return Y(new Date(t.createdAt),t.author,t.message,t.author===m.ASSISTANT,t.author===m.SYSTEM,t.context)})))):window.localStorage.removeItem("bot-".concat(n.id))}catch(t){console.error(t),window.localStorage.removeItem("bot-".concat(n.id))}}(null==h?void 0:h.id)!==n.id?(p(!1),A(!0),fetch("".concat(v,"/bots/").concat(o),{headers:n.headers}).then(function(){var t=f(i().mark((function t(e){return i().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.t0=u,t.t1=u({},e),t.t2={},t.next=5,e.json();case 5:return t.t3=t.sent,t.t4={data:t.t3},t.abrupt("return",(0,t.t0)(t.t1,t.t2,t.t4));case 8:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()).then((function(t){var e=t.data;if(o===n.id)return p(e),D(o,a,r)})).catch((function(t){p(null),(0,e.$4)(t,window.alert)})).finally((function(){A(!1)}))):(A(!0),D(o,a,r).catch((function(t){(0,e.$4)(t,window.alert)})).finally((function(){A(!1)})))}else p(!1),A(!1);s(a||null),E(!1),w(r)}function D(t,e,r){return k.apply(this,arguments)}function k(){return k=f(i().mark((function t(r,o,c){return i().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n.chatId!==o||!o){t.next=2;break}return t.abrupt("return",fetch("".concat(v,"/bots/").concat(r,"/chat/").concat(o),{headers:n.headers}).then(function(){var t=f(i().mark((function t(e){return i().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.t0=u,t.t1=u({},e),t.t2={},t.next=5,e.json();case 5:return t.t3=t.sent,t.t4={data:t.t3},t.abrupt("return",(0,t.t0)(t.t1,t.t2,t.t4));case 8:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()).then((function(t){var i=t.data;r===n.id&&n.chatId===o&&null!=i&&i.results&&w([].concat(a(c),a(i.results.map((function(t){return Y((0,e.$Q)(t.createdAt),t.role,t.parts||[(0,e.b2)(t.content)],t.role===m.ASSISTANT,t.role===m.SYSTEM,t.context)})))))})));case 2:case"end":return t.stop()}}),t)}))),k.apply(this,arguments)}function _(){if(I.current){var t=L;!t&&I.current.scrollHeight>0&&(t=I.current.scrollHeight,P(t)),I.current.style.height="auto",I.current.scrollHeight>4*t?(I.current.style.height=4*t+"px",I.current.style.overflowY="auto"):(I.current.style.height=I.current.scrollHeight+"px",I.current.style.overflowY="hidden")}}function M(t){if(t&&t.preventDefault(),I.current){var e=I.current.value;if(x||!e)return;I.current.focus(),function(t){G.apply(this,arguments)}(e),I.current.value="",_()}}function Y(t,e,r,n){return{createdAt:t,author:e,message:r,media:null,isAI:n,isSystemMessage:arguments.length>4&&void 0!==arguments[4]&&arguments[4],context:(arguments.length>5?arguments[5]:void 0)||null}}function C(t,r){var n,o=(null==t||null===(n=t.response)||void 0===n?void 0:n.data)||(null==t?void 0:t.data);null!=o&&o.error||null!=o&&o.message?w([].concat(a(r),[Y(new Date,m.SYSTEM,[(0,e.b2)((null==o?void 0:o.message)||(null==o?void 0:o.error))],!1,!0)])):w([].concat(a(r),[Y(new Date,m.SYSTEM,[(0,e.b2)("Something went wrong. Please try again.")],!1,!0)]))}function G(){return G=f(i().mark((function t(r){var o,l,d,p,g,S,O,j,A,I;return i().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!x){t.next=2;break}return t.abrupt("return");case 2:o=Y(new Date,m.USER,[(0,e.b2)(r)]),l=Y(new Date,m.ASSISTANT,null,!0),d=[].concat(a(b),[o]),w(d),E(!0),setTimeout((function(){w([].concat(a(d),[l]))}),300),null!=h&&h.stream?(g={message:r,customCommands:n.customCommands||null},null!==(p=n.headers)&&void 0!==p&&p.Authorization&&2===(S=n.headers.Authorization.split(" ")).length&&(g.token=S[1]),O=(0,e.Y$)(g),j=new EventSource(y+(c?"/bots/".concat(n.id,"/stream/").concat(c):"/bots/".concat(n.id,"/stream"))+"?".concat(O),{withCredentials:!0}),A=[],I=null,j.addEventListener("context",(function(t){I=JSON.parse(t.data),w([].concat(a(d),[Y(new Date,m.ASSISTANT,A,!0,!1,I)]))}),!1),j.addEventListener("command",(function(t){var r=JSON.parse(t.data);r&&(A.push((0,e.b2)(r,"command")),w([].concat(a(d),[Y(new Date,m.ASSISTANT,A,!0,!1,I)])))}),!1),j.onmessage=function(t){!c&&t.lastEventId&&s(t.lastEventId);var r=t.data;"string"==typeof r&&(A.push((0,e.b2)(JSON.parse(r))),w([].concat(a(d),[Y(new Date,m.ASSISTANT,A,!0,!1,I)])))},j.onerror=function(t){w([].concat(a(d),[Y(new Date,m.ASSISTANT,A,!0,!1,I)])),j.close(),E(!1)}):fetch(v+(c?"/bots/".concat(n.id,"/chat/").concat(c):"/bots/".concat(n.id,"/chat")),{method:"POST",headers:u({"Content-Type":"application/json"},n.headers),body:JSON.stringify({message:r,customCommands:n.customCommands||null})}).then(function(){var t=f(i().mark((function t(e){return i().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.t0=u,t.t1=u({},e),t.t2={},t.next=5,e.json();case 5:return t.t3=t.sent,t.t4={data:t.t3},t.abrupt("return",(0,t.t0)(t.t1,t.t2,t.t4));case 8:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()).then((function(t){t.data&&(t.data.chatId&&s(t.data.chatId),t.data.message)?w([].concat(a(d),[Y(new Date,m.ASSISTANT,t.data.message.parts,!0,!1,t.data.message.context,t.data.message.media)])):C(t,d)})).catch((function(t){C(t,d)})).finally((function(){E(!1)}));case 7:case"end":return t.stop()}}),t)}))),G.apply(this,arguments)}return(0,t.useEffect)((function(){return N(null==n?void 0:n.chatId)}),[null==n?void 0:n.id,null==n?void 0:n.chatId]),(0,t.useEffect)((function(){var t,e;null!=n&&n.enableLocalStorage&&null!==(t=window)&&void 0!==t&&null!==(e=t.localStorage)&&void 0!==e&&e.setItem&&(null==h?void 0:h.id)===n.id&&null!=b&&b.length&&window.localStorage.setItem("bot-".concat(n.id),JSON.stringify({id:n.id,chatId:c,messages:b,timestamp:Date.now()}))}),[c,b,null==n?void 0:n.enableLocalStorage]),(0,t.useEffect)((function(){h&&setTimeout((function(){return I.current&&I.current.focus()}),250)}),[h]),(0,t.useEffect)((function(){!x&&I.current&&I.current.focus()}),[x]),(0,t.useEffect)(_,[null===(r=I.current)||void 0===r?void 0:r.value,I.current]),{data:h,isTyping:x,messages:b,resetConversation:function(){var t,e;null!=n&&n.enableLocalStorage&&null!==(t=window)&&void 0!==t&&null!==(e=t.localStorage)&&void 0!==e&&e.setItem&&(null==h?void 0:h.id)===n.id&&window.localStorage.removeItem("bot-".concat(n.id)),N()},isLoading:j,onSubmit:M,onKeyDown:function(t){"Enter"!==t.key||t.shiftKey||(t.repeat||M(),t.preventDefault())},onChange:function(t){_()},input:I}}}(),o.default}()}));