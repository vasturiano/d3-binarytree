import assert from "assert";
import {binarytree} from "../src/index.js";

it("binarytree.visit(callback) visits each node in a binarytree", () => {
  const results = [], q = binarytree()
      .addAll([[0], [1]]);
  assert.strictEqual(q.visit(function(node, x0, x1) { results.push([x0, x1]); }), q);
  assert.deepStrictEqual(results, [
    [0, 2],
    [0, 1],
    [1, 2]
  ]);
});

it("binarytree.visit(callback) applies pre-order traversal", () => {
  const results = [], q = binarytree()
      .extent([[0], [960]])
      .addAll([[100], [200], [300]]);
  assert.strictEqual(q.visit(function(node, x0, x1) { results.push([x0, x1]); }), q);
  assert.deepStrictEqual(results, [
    [  0, 1024],
    [  0,  512],
    [  0,  256],
    [  0,  128],
    [128,  256],
    [256,  512]
  ]);
});

it("binarytree.visit(callback) does not recurse if the callback returns truthy", () => {
  const results = [], q = binarytree()
      .extent([[0], [960]])
      .addAll([[100], [700], [800]]);
  assert.strictEqual(q.visit(function(node, x0, x1) { results.push([x0, x1]); return x0 > 0; }), q);
  assert.deepStrictEqual(results, [
    [  0, 1024],
    [  0,  512],
    [512, 1024]
  ]);
});

it("binarytree.visit(callback) on an empty binarytree with no bounds does nothing", () => {
  const results = [], q = binarytree();
  assert.strictEqual(q.visit(function(node, x0, x1) { results.push([x0, x1]); }), q);
  assert.strictEqual(results.length, 0);
});

it("binarytree.visit(callback) on an empty binarytree with bounds does nothing", () => {
  const results = [], q = binarytree()
      .extent([[0], [960]]);
  assert.strictEqual(q.visit(function(node, x0, x1) { results.push([x0, x1]); }), q);
  assert.deepStrictEqual(results.length, 0);
});
