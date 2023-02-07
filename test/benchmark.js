import {binarytree} from "../src/index.js";

const n = 1000000,
    points1 = new Array(n),
    points2 = new Array(n);

for (let j = 0; j < n; ++j) {
  points1[j] = [Math.random() * 99];
}

for (let j = 0; j < n; ++j) {
  points2[j] = [points1[j][0] + Math.random()];
}

function time(message, run) {
  const [starts, startns] = process.hrtime();
  run();
  const [ends, endns] = process.hrtime();
  console.log(message, Math.round((ends - starts) * 1e3 + (endns - startns) / 1e6));
}

let root;

time("create", () => {
  root = binarytree().extent([[0], [100]]).addAll(points1);
});

time("iterate", () => {
  root.visit(() => {});
});

time("update", () => {
  for (let j = 0; j < n; ++j) {
    root.remove(points1[j]);
    root.add(points2[j]);
  }
});
