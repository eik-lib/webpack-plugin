// import _ from 'lodash';

import { h, render } from "https://unpkg.com/preact?module";
import foo from "./module.js";

function component() {
  const element = document.createElement("div");

  // Lodash, currently included via a script, is required for this line to work
  // Lodash, now imported by this script
  element.innerHTML = ["Hello", "webpack", foo()].join(" ");

  // Create your app
  const app = h("h1", null, "Hello World!");

  render(app, document.body);

  return element;
}

document.body.appendChild(component());
