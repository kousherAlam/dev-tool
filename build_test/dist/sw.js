!function(e){var n={};function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=0)}([function(e,n){var t={assets:{main:["./images/guy-500.jpg","./images/guy-1000.jpg","./images/guy-1500.jpg","./images/guy-2000.jpg","./images/guy-2500.jpg","./images/guy-3000.jpg","./images/profile-400.jpg","./images/logo.svg","./js/main.bundle.js","./css/style.css"],additional:[],optional:[]},externals:[],hashesMap:{c43486c5ff21eb70b68d37e3929e3e27ff4584fd:"./images/guy-500.jpg","9b2857205bc34b455a8cc064be5e8f1d3e5e6e16":"./images/guy-1000.jpg","411fda65f09b1457ef8583fffac391e3de901ec0":"./images/guy-1500.jpg",ec02f3ed4ff76f2337b8be90b57737d8435a556e:"./images/guy-2000.jpg","58acd0da290fcedde0fc065f0343f36573843e03":"./images/guy-2500.jpg",ccfde44424d5366f8d04bb4145c3926919018333:"./images/guy-3000.jpg",e6b6897c101c723e989ed3395e89bf63222bec3a:"./images/profile-400.jpg","5ddc6f0aaabc0fcce0e2c8a811cf5c1ce496170a":"./images/logo.svg","8c246b0cc47e2bffa6e73bd85687d628b144dbd3":"./js/main.bundle.js",f320a2cdd7f3821fa05d884fa2cd4de5a963f0ea:"./css/style.css"},strategy:"changed",responseStrategy:"cache-first",version:"2018-3-15 18:14:36",name:"webpack-offline",pluginVersion:"4.9.0",relativePaths:!0};!function(e){var n={};function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=1)}([function(e,n){},function(e,n,r){"use strict";var o,i,a;if(o=ExtendableEvent.prototype.waitUntil,i=FetchEvent.prototype.respondWith,a=new WeakMap,ExtendableEvent.prototype.waitUntil=function(e){var n=this,t=a.get(n);if(!t)return t=[Promise.resolve(e)],a.set(n,t),o.call(n,Promise.resolve().then(function e(){var r=t.length;return Promise.all(t.map(function(e){return e.catch(function(){})})).then(function(){return t.length!=r?e():(a.delete(n),Promise.all(t))})}));t.push(Promise.resolve(e))},FetchEvent.prototype.respondWith=function(e){return this.waitUntil(e),i.call(this,e)},void 0===c)var c=!1;function s(e,n){return caches.match(e,{cacheName:n}).then(function(t){return f()?t:l(t).then(function(t){return caches.open(n).then(function(n){return n.put(e,t)}).then(function(){return t})})}).catch(function(){})}function u(e){return"navigate"===e.mode||e.headers.get("Upgrade-Insecure-Requests")||-1!==(e.headers.get("Accept")||"").indexOf("text/html")}function f(e){return!e||!e.redirected||!e.ok||"opaqueredirect"===e.type}function l(e){return f(e)?Promise.resolve(e):("body"in e?Promise.resolve(e.body):e.blob()).then(function(n){return new Response(n,{headers:e.headers,status:e.status})})}function h(e,n){console.groupCollapsed("[SW]:",e),n.forEach(function(e){console.log("Asset:",e)}),console.groupEnd()}!function(e,n){var t=n.loaders,r=n.cacheMaps,o=n.navigationPreload,i=e.strategy,a=e.responseStrategy,f=e.assets,d=e.loaders||{},p=e.hashesMap,g=e.externals,v=e.name,m=e.version,b=v+":"+m,y=v+"$preload",w="__offline_webpack__data";Object.keys(f).forEach(function(e){f[e]=f[e].map(function(e){var n=new URL(e,location);return n.hash="",-1===g.indexOf(e)&&(n.search=""),n.toString()})}),Object.keys(d).forEach(function(e){d[e]=d[e].map(function(e){var n=new URL(e,location);return n.hash="",-1===g.indexOf(e)&&(n.search=""),n.toString()})}),p=Object.keys(p).reduce(function(e,n){var t=new URL(p[n],location);return t.search="",t.hash="",e[n]=t.toString(),e},{}),g=g.map(function(e){var n=new URL(e,location);return n.hash="",n.toString()});var x=[].concat(f.main,f.additional,f.optional),O=e.navigateFallbackURL,j=e.navigateFallbackForRedirects;function P(n){var t=f[n];return caches.open(b).then(function(n){return S(n,t,{bust:e.version,request:e.prefetchRequest})}).then(function(){h("Cached assets: "+n,t)}).catch(function(e){throw console.error(e),e})}function R(n){return caches.keys().then(function(e){for(var n=e.length,t=void 0;n--&&0!==(t=e[n]).indexOf(v););if(t){var r=void 0;return caches.open(t).then(function(e){return r=e,e.match(new URL(w,location).toString())}).then(function(e){if(e)return Promise.all([r,r.keys(),e.json()])})}}).then(function(t){if(!t)return P(n);var r=t[0],o=t[1],i=t[2],a=i.hashmap,c=i.version;if(!i.hashmap||c===e.version)return P(n);var s=Object.keys(a).map(function(e){return a[e]}),u=o.map(function(e){var n=new URL(e.url);return n.search="",n.hash="",n.toString()}),l=f[n],d=[],g=l.filter(function(e){return-1===u.indexOf(e)||-1===s.indexOf(e)});Object.keys(p).forEach(function(e){var n=p[e];if(-1!==l.indexOf(n)&&-1===g.indexOf(n)&&-1===d.indexOf(n)){var t=a[e];t&&-1!==u.indexOf(t)?d.push([t,n]):g.push(n)}}),h("Changed assets: "+n,g),h("Moved assets: "+n,d);var v=Promise.all(d.map(function(e){return r.match(e[0]).then(function(n){return[e[1],n]})}));return caches.open(b).then(function(n){var t=v.then(function(e){return Promise.all(e.map(function(e){return n.put(e[0],e[1])}))});return Promise.all([t,S(n,g,{bust:e.version,request:e.prefetchRequest})])})})}function U(){return caches.keys().then(function(e){var n=e.map(function(e){if(0===e.indexOf(v)&&0!==e.indexOf(b))return console.log("[SW]:","Delete cache:",e),caches.delete(e)});return Promise.all(n)})}function k(){return caches.open(b).then(function(n){var t=new Response(JSON.stringify({version:e.version,hashmap:p}));return n.put(new URL(w,location).toString(),t)})}self.addEventListener("install",function(e){console.log("[SW]:","Install event");var n=void 0;n="changed"===i?R("main"):P("main"),e.waitUntil(n)}),self.addEventListener("activate",function(e){console.log("[SW]:","Activate event");var n=function(){if(!f.additional.length)return Promise.resolve();c&&console.log("[SW]:","Caching additional");return("changed"===i?R("additional"):P("additional")).catch(function(e){console.error("[SW]:","Cache section `additional` failed to load")})}();n=(n=(n=n.then(k)).then(U)).then(function(){if(self.clients&&self.clients.claim)return self.clients.claim()}),o&&self.registration.navigationPreload&&(n=Promise.all([n,self.registration.navigationPreload.enable()])),e.waitUntil(n)}),self.addEventListener("fetch",function(e){var n=new URL(e.request.url);n.hash="";var t=n.toString();-1===g.indexOf(t)&&(n.search="",t=n.toString());var i="GET"===e.request.method,f=-1!==x.indexOf(t),l=t;if(!f){var h=function(e){var n=e.url,t=new URL(n),o=void 0;o=u(e)?"navigate":t.origin===location.origin?"same-origin":"cross-origin";for(var i=0;i<r.length;i++){var a=r[i];if(a&&(!a.requestTypes||-1!==a.requestTypes.indexOf(o))){var c=void 0;if((c="function"==typeof a.match?a.match(t,e):n.replace(a.match,a.to))&&c!==n)return c}}}(e.request);h&&(l=h,f=!0)}if(f||!i)if(f&&i){var d=void 0;d="network-first"===a?function(e,n,t){return W(e).then(function(e){if(e.ok)return c&&console.log("[SW]:","URL ["+n+"] from network"),e;throw new Error("Response is not ok")}).catch(function(){return c&&console.log("[SW]:","URL ["+n+"] from cache if possible"),s(t,b)})}(e,t,l):function(e,n,t){return function(e){if(o&&"function"==typeof o.map&&e.preloadResponse&&"navigate"===e.request.mode){var n=o.map(new URL(e.request.url),e.request);n&&function(e,n){var t=new URL(e,location),r=n.preloadResponse;q.set(r,{url:t,response:r});var o=function(){return q.has(r)},i=r.then(function(e){if(e&&o()){var n=e.clone();return caches.open(y).then(function(e){if(o())return e.put(t,n).then(function(){if(!o())return caches.open(y).then(function(e){return e.delete(t)})})})}});n.waitUntil(i)}(n,e)}}(e),s(t,b).then(function(r){return r?(c&&console.log("[SW]:","URL ["+t+"]("+n+") from cache"),r):fetch(e.request).then(function(r){return r.ok?(c&&console.log("[SW]:","URL ["+n+"] from network"),t===n&&(o=r.clone(),i=caches.open(b).then(function(e){return e.put(n,o)}).then(function(){console.log("[SW]:","Cache asset: "+n)}),e.waitUntil(i)),r):(c&&console.log("[SW]:","URL ["+n+"] wrong response: ["+r.status+"] "+r.type),r);var o,i})})}(e,t,l),O&&u(e.request)&&(d=L(d)),e.respondWith(d)}else n.origin!==location.origin&&-1!==navigator.userAgent.indexOf("Firefox/44.")&&e.respondWith(fetch(e.request));else{if(O&&u(e.request))return void e.respondWith(L(W(e)));if(!0===o)return void e.respondWith(W(e));if(o){var p=function(e){var n=new URL(e.request.url);if(self.registration.navigationPreload&&o&&o.test&&o.test(n,e.request)){var t=function(e){if(q){var n=void 0,t=void 0;return q.forEach(function(r,o){r.url.href===e.href&&(n=r.response,t=o)}),n?(q.delete(t),n):void 0}}(n),r=e.request;return t?(e.waitUntil(caches.open(y).then(function(e){return e.delete(r)})),t):s(r,y).then(function(n){return n&&e.waitUntil(caches.open(y).then(function(e){return e.delete(r)})),n||fetch(e.request)})}}(e);if(p)return void e.respondWith(p)}}}),self.addEventListener("message",function(e){var n=e.data;if(n)switch(n.action){case"skipWaiting":self.skipWaiting&&self.skipWaiting()}});var q=new Map;function L(e){return e.catch(function(){}).then(function(e){var n=e&&e.ok,t=e&&"opaqueredirect"===e.type;return n||t&&!j?e:(c&&console.log("[SW]:","Loading navigation fallback ["+O+"] from cache"),s(O,b))})}function S(e,n,r){var o=!1!==r.allowLoaders,i=r&&r.bust,a=r.request||{credentials:"omit",mode:"cors"};return Promise.all(n.map(function(e){var n,t,r;return i&&(t=i,r=-1!==(n=e).indexOf("?"),e=n+(r?"&":"?")+"__uncache="+encodeURIComponent(t)),fetch(e,a).then(l)})).then(function(i){if(i.some(function(e){return!e.ok}))return Promise.reject(new Error("Wrong response status"));var a=[],c=i.map(function(r,i){return o&&a.push(function(e,n){var r=Object.keys(d).map(function(r){var o=d[r];if(-1!==o.indexOf(e)&&t[r])return t[r](n.clone())}).filter(function(e){return!!e});return Promise.all(r).then(function(e){return[].concat.apply([],e)})}(n[i],r)),e.put(n[i],r)});return a.length?function(){var t,o=(t=r,Object.keys(t).reduce(function(e,n){return e[n]=t[n],e},{}));o.allowLoaders=!1;var i=c;c=Promise.all(a).then(function(t){var r=[].concat.apply([],t);return n.length&&(i=i.concat(S(e,r,o))),Promise.all(i)})}():c=Promise.all(c),c})}function W(e){return e.preloadResponse&&!0===o?e.preloadResponse.then(function(n){return n||fetch(e.request)}):fetch(e.request)}}(t,{loaders:{},cacheMaps:[],navigationPreload:!1}),e.exports=r(0)}])}]);