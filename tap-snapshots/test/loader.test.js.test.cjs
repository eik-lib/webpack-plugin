/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`test/loader.test.js > TAP > loader() - Import map defined through option "maps" argument take precedence over import map defined through option "urls" argument > Should rewrite import statement to https://cdn.eik.dev/lit-element/v2 1`] = `
import*as t from"https://cdn.eik.dev/lit-element/v2";var e={d:(t,r)=>{for(var o in r)e.o(r,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:r[o]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)};const r=(o={html:()=>t.html},n={},e.d(n,o),n);var o,n;function a(t,e){return Math.floor(t+Math.random()*(e+1-t))}class d{constructor(t){this.root=t}render(){const t=(e=[a(0,20),a(20,40),a(40,60),a(60,80),a(80,100)],r.html\`<p>Hello \${e[0]}!</p>\`);var e,o;this.root=(o=t,this.root.replaceWith(o),o)}update(){setInterval((()=>{this.render()}),1e3)}}(async()=>{const t=await new Promise((t=>{document.addEventListener("DOMContentLoaded",(()=>{const e=document.getElementById("app");t(e.firstElementChild)}))})),e=new d(t);e.render(),e.update()})();
`

exports[`test/loader.test.js > TAP > loader() - Import map defined through option "maps" take precedence over import map defined in eik.json > Should rewrite import statement to https://cdn.eik.dev/lit-element/v2 1`] = `
import*as t from"https://cdn.eik.dev/lit-element/v2";var e={d:(t,r)=>{for(var o in r)e.o(r,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:r[o]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)};const r=(o={html:()=>t.html},n={},e.d(n,o),n);var o,n;function a(t,e){return Math.floor(t+Math.random()*(e+1-t))}class d{constructor(t){this.root=t}render(){const t=(e=[a(0,20),a(20,40),a(40,60),a(60,80),a(80,100)],r.html\`<p>Hello \${e[0]}!</p>\`);var e,o;this.root=(o=t,this.root.replaceWith(o),o)}update(){setInterval((()=>{this.render()}),1e3)}}(async()=>{const t=await new Promise((t=>{document.addEventListener("DOMContentLoaded",(()=>{const e=document.getElementById("app");t(e.firstElementChild)}))})),e=new d(t);e.render(),e.update()})();
`

exports[`test/loader.test.js > TAP > loader() - Import map defined through option "urls" argument take precedence over import map defined in eik.json > Should rewrite import statement to https://cdn.eik.dev/lit-element/v2 1`] = `
import*as t from"https://cdn.eik.dev/lit-element/v2";var e={d:(t,r)=>{for(var o in r)e.o(r,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:r[o]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)};const r=(o={html:()=>t.html},n={},e.d(n,o),n);var o,n;function a(t,e){return Math.floor(t+Math.random()*(e+1-t))}class d{constructor(t){this.root=t}render(){const t=(e=[a(0,20),a(20,40),a(40,60),a(60,80),a(80,100)],r.html\`<p>Hello \${e[0]}!</p>\`);var e,o;this.root=(o=t,this.root.replaceWith(o),o)}update(){setInterval((()=>{this.render()}),1e3)}}(async()=>{const t=await new Promise((t=>{document.addEventListener("DOMContentLoaded",(()=>{const e=document.getElementById("app");t(e.firstElementChild)}))})),e=new d(t);e.render(),e.update()})();
`

exports[`test/loader.test.js > TAP > loader() - import map fetched from a URL > import maps from urls 1`] = `
import*as t from"https://cdn.eik.dev/lit-element/v2";var e={d:(t,r)=>{for(var o in r)e.o(r,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:r[o]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)};const r=(o={html:()=>t.html},n={},e.d(n,o),n);var o,n;function a(t,e){return Math.floor(t+Math.random()*(e+1-t))}class d{constructor(t){this.root=t}render(){const t=(e=[a(0,20),a(20,40),a(40,60),a(60,80),a(80,100)],r.html\`<p>Hello \${e[0]}!</p>\`);var e,o;this.root=(o=t,this.root.replaceWith(o),o)}update(){setInterval((()=>{this.render()}),1e3)}}(async()=>{const t=await new Promise((t=>{document.addEventListener("DOMContentLoaded",(()=>{const e=document.getElementById("app");t(e.firstElementChild)}))})),e=new d(t);e.render(),e.update()})();
`

exports[`test/loader.test.js > TAP > loader() - import map fetched from a URL via eik.json > eik.json import-map string 1`] = `
import*as t from"https://cdn.eik.dev/lit-element/v2";var e={d:(t,r)=>{for(var o in r)e.o(r,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:r[o]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)};const r=(o={html:()=>t.html},n={},e.d(n,o),n);var o,n;function a(t,e){return Math.floor(t+Math.random()*(e+1-t))}class d{constructor(t){this.root=t}render(){const t=(e=[a(0,20),a(20,40),a(40,60),a(60,80),a(80,100)],r.html\`<p>Hello \${e[0]}!</p>\`);var e,o;this.root=(o=t,this.root.replaceWith(o),o)}update(){setInterval((()=>{this.render()}),1e3)}}(async()=>{const t=await new Promise((t=>{document.addEventListener("DOMContentLoaded",(()=>{const e=document.getElementById("app");t(e.firstElementChild)}))})),e=new d(t);e.render(),e.update()})();
`
