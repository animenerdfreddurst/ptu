// only required for dev
// in prod, foundry loads index.js, which is compiled by vite/rollup
// in dev, foundry loads main.mjs, this file, which loads main.js

window.global = window;
import * as PTU from "./main.js";