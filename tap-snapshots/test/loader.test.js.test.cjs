/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`test/loader.test.js > TAP > loader() - Import map defined through option "maps" argument take precedence over import map defined through option "urls" argument > Should rewrite import statement to https://cdn.eik.dev/lit-element/v2 1`] = `
import{html as t}from"https://cdn.eik.dev/lit-element/v2";function e(t,e){return Math.floor(t+Math.random()*(e+1-t))}class n{constructor(t){this.root=t}render(){const n=(o=[e(0,20),e(20,40),e(40,60),e(60,80),e(80,100)],t\`<p>Hello \${o[0]}!</p>\`);var o,r;this.root=(r=n,this.root.replaceWith(r),r)}update(){setInterval(()=>{this.render()},1e3)}}(async()=>{const t=await new Promise(t=>{document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("app");t(e.firstElementChild)})}),e=new n(t);e.render(),e.update()})();
`

exports[`test/loader.test.js > TAP > loader() - Import map defined through option "maps" take precedence over import map defined in eik.json > Should rewrite import statement to https://cdn.eik.dev/lit-element/v2 1`] = `
import{html as t}from"https://cdn.eik.dev/lit-element/v2";function e(t,e){return Math.floor(t+Math.random()*(e+1-t))}class n{constructor(t){this.root=t}render(){const n=(o=[e(0,20),e(20,40),e(40,60),e(60,80),e(80,100)],t\`<p>Hello \${o[0]}!</p>\`);var o,r;this.root=(r=n,this.root.replaceWith(r),r)}update(){setInterval(()=>{this.render()},1e3)}}(async()=>{const t=await new Promise(t=>{document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("app");t(e.firstElementChild)})}),e=new n(t);e.render(),e.update()})();
`

exports[`test/loader.test.js > TAP > loader() - Import map defined through option "urls" argument take precedence over import map defined in eik.json > Should rewrite import statement to https://cdn.eik.dev/lit-element/v2 1`] = `
import{html as t}from"https://cdn.eik.dev/lit-element/v2";function e(t,e){return Math.floor(t+Math.random()*(e+1-t))}class n{constructor(t){this.root=t}render(){const n=(o=[e(0,20),e(20,40),e(40,60),e(60,80),e(80,100)],t\`<p>Hello \${o[0]}!</p>\`);var o,r;this.root=(r=n,this.root.replaceWith(r),r)}update(){setInterval(()=>{this.render()},1e3)}}(async()=>{const t=await new Promise(t=>{document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("app");t(e.firstElementChild)})}),e=new n(t);e.render(),e.update()})();
`

exports[`test/loader.test.js > TAP > loader() - import map fetched from a URL > import maps from urls 1`] = `
import{html as t}from"https://cdn.eik.dev/lit-element/v2";function e(t,e){return Math.floor(t+Math.random()*(e+1-t))}class n{constructor(t){this.root=t}render(){const n=(o=[e(0,20),e(20,40),e(40,60),e(60,80),e(80,100)],t\`<p>Hello \${o[0]}!</p>\`);var o,r;this.root=(r=n,this.root.replaceWith(r),r)}update(){setInterval(()=>{this.render()},1e3)}}(async()=>{const t=await new Promise(t=>{document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("app");t(e.firstElementChild)})}),e=new n(t);e.render(),e.update()})();
`

exports[`test/loader.test.js > TAP > loader() - import map fetched from a URL via eik.json > eik.json import-map string 1`] = `
import{html as t}from"https://cdn.eik.dev/lit-element/v2";function e(t,e){return Math.floor(t+Math.random()*(e+1-t))}class n{constructor(t){this.root=t}render(){const n=(o=[e(0,20),e(20,40),e(40,60),e(60,80),e(80,100)],t\`<p>Hello \${o[0]}!</p>\`);var o,r;this.root=(r=n,this.root.replaceWith(r),r)}update(){setInterval(()=>{this.render()},1e3)}}(async()=>{const t=await new Promise(t=>{document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("app");t(e.firstElementChild)})}),e=new n(t);e.render(),e.update()})();
`
