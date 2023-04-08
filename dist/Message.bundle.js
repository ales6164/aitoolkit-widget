!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("React")):"function"==typeof define&&define.amd?define(["React"],t):"object"==typeof exports?exports.Message=t(require("React")):e.Message=t(e.React)}(self,(e=>(()=>{"use strict";var t={1771:(e,t,n)=>{function a(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return t.filter(Boolean).join(" ")}function r(e){if(null==e||!e.getTime)return"";var t=(Date.now()-e.getTime())/1e3;if(t<5)return"Now";if(t<60)return"".concat((5*Math.floor(t/5)).toFixed(0),"s");var n=Math.floor(t/60);if(n<60)return"".concat(n.toFixed(0),"m");var a=new Date(e.getTime()),r=String(a.getHours()),o=String(a.getMinutes()).padStart(2,"0");return"".concat(r,":").concat(o)}n.d(t,{AK:()=>a,zv:()=>r})},1024:t=>{t.exports=e}},n={};function a(e){var r=n[e];if(void 0!==r)return r.exports;var o=n[e]={exports:{}};return t[e](o,o.exports,a),o.exports}a.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return a.d(t,{a:t}),t},a.d=(e,t)=>{for(var n in t)a.o(t,n)&&!a.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},a.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var r={};return(()=>{a.d(r,{default:()=>s});var e=a(1771),t=a(1024),n=a.n(t);function o(e,t){return e&&e.map?n().createElement(n().Fragment,null,e.map((function(e){var n,a,r,o,s;return"text"===e.type?e.content:t&&t.hasOwnProperty(null===(n=e.content)||void 0===n?void 0:n.command)?(0,t[null===(s=e.content)||void 0===s?void 0:s.command])(e.content):null!==(a=e.content)&&void 0!==a&&a.command?(null===(r=e.content)||void 0===r?void 0:r.command)+"[`"+(null===(o=e.content.params)||void 0===o?void 0:o.join(", "))+"`]":JSON.stringify(e.content)}))):""}function s(t){var a=t.item,r=t.itemIdx,s=t.arr,i=t.essentials;function l(){return s.length-1===r?n().createElement("span",null,n().createElement("span",{className:"animate-[pulse_1s_0ms_infinite]"},"."),n().createElement("span",{className:"animate-[pulse_1s_200ms_infinite]"},"."),n().createElement("span",{className:"animate-[pulse_1s_400ms_infinite]"},".")):n().createElement("span",{className:"text-gray-400"},"Something went wrong")}function c(t){return n().createElement("div",{className:"flex flex-col gap-y-2 max-width-[100%] overflow-hidden"},n().createElement("div",{className:(0,e.AK)(t,"flex gap-x-2 items-end overflow-hidden")},n().createElement("div",{className:"whitespace-pre-wrap max-width-[100%] overflow-hidden"},o(a.message,i)||l()),a.message&&n().createElement("span",{className:"text-xs opacity-75 flex-shrink-0"},(0,e.zv)(a.createdAt))))}return n().createElement("li",null,a.isAI?n().createElement("div",{className:"flex justify-start mr-8 gap-x-2"},c("bg-gray-100 dark:bg-gray-600 rounded-3xl py-2 px-4 text-sm text-gray-900 dark:text-gray-50")):a.isSystemMessage?n().createElement("div",{className:"flex justify-center mx-8"},n().createElement("p",{className:"whitespace-pre-wrap py-2 px-4 text-sm text-gray-700 dark:text-gray-400 text-center"},o(a.message)||l())):n().createElement("div",{className:"flex justify-end ml-8"},c("bg-primary-500 rounded-3xl py-2 px-4 text-sm text-gray-50")))}})(),r.default})()));