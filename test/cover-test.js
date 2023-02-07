import assert from "assert";
import {binarytree} from "../src/index.js";

it("binarytree.cover(x) sets a trivial extent if the extent was undefined", () => {
  assert.deepStrictEqual(binarytree().cover(2).extent(), [[2], [3]]);
});

it("binarytree.cover(x) sets a non-trivial squarified and centered extent if the extent was trivial", () => {
  assert.deepStrictEqual(binarytree().cover(0).cover(2).extent(), [[0], [4]]);
});

it("binarytree.cover(x) ignores invalid points", () => {
  assert.deepStrictEqual(binarytree().cover(0).cover(NaN).extent(), [[0], [1]]);
});

it("binarytree.cover(x) repeatedly doubles the existing extent if the extent was non-trivial", () => {
  assert.deepStrictEqual(binarytree().cover(0).cover(2).cover(-1).extent(), [[-4], [4]]);
  assert.deepStrictEqual(binarytree().cover(0).cover(2).cover(1).extent(), [[0], [4]]);
  assert.deepStrictEqual(binarytree().cover(0).cover(2).cover(3).extent(), [[0], [4]]);
  assert.deepStrictEqual(binarytree().cover(0).cover(2).cover(-3).extent(), [[-4], [4]]);
  assert.deepStrictEqual(binarytree().cover(0).cover(2).cover(5).extent(), [[0], [8]]);
});

it("binarytree.cover(x) repeatedly wraps the root node if it has children", () => {
  const q = binarytree().add([0]).add([2]);
  assert.deepStrictEqual(q.root(), [{data: [0]}, {data: [2]}]);
  assert.deepStrictEqual(q.copy().cover(3).root(), [{data: [0]}, {data: [2]}]);
  assert.deepStrictEqual(q.copy().cover(-1).root(), [,[{data: [0]}, {data: [2]}]]);
  assert.deepStrictEqual(q.copy().cover(5).root(), [[{data: [0]}, {data: [2]}],, ]);
});

it("binarytree.cover(x) does not wrap the root node if it is a leaf", () => {
  const q = binarytree().cover(0).add([2]);
  assert.deepStrictEqual(q.root(), {data: [2]});
  assert.deepStrictEqual(q.copy().cover(3).root(), {data: [2]});
  assert.deepStrictEqual(q.copy().cover(-1).root(), {data: [2]});
  assert.deepStrictEqual(q.copy().cover(5).root(), {data: [2]});
});

it("binarytree.cover(x) does not wrap the root node if it is undefined", () => {
  const q = binarytree().cover(0).cover(2);
  assert.strictEqual(q.root(), undefined);
  assert.strictEqual(q.copy().cover(3).root(), undefined);
  assert.strictEqual(q.copy().cover(-1).root(), undefined);
  assert.strictEqual(q.copy().cover(5).root(), undefined);
});

it("binarytree.cover() does not crash on huge values", () => {
  binarytree([[1e23]]);
});
