import assert from "assert";
import {binarytree} from "../src/index.js";

it("binarytree.extent(extent) extends the extent", () => {
  assert.deepStrictEqual(binarytree().extent([[0], [6]]).extent(), [[0], [8]]);
});

it("binarytree.extent() can be inferred by binarytree.cover", () => {
  const q = binarytree();
  assert.deepStrictEqual(q.cover(0).extent(), [[0], [1]]);
  assert.deepStrictEqual(q.cover(4).extent(), [[0], [8]]);
});

it("binarytree.extent() can be inferred by binarytree.add", () => {
  const q = binarytree();
  q.add([0]);
  assert.deepStrictEqual(q.extent(), [[0], [1]]);
  q.add([4]);
  assert.deepStrictEqual(q.extent(), [[0], [8]]);
});

it("binarytree.extent(extent) squarifies and centers the specified extent", () => {
  assert.deepStrictEqual(binarytree().extent([[0], [6]]).extent(), [[0], [8]]);
});

it("binarytree.extent(extent) ignores invalid extents", () => {
  assert.strictEqual(binarytree().extent([[NaN], [NaN]]).extent(), undefined);
});

it("binarytree.extent(extent) flips inverted extents", () => {
  assert.deepStrictEqual(binarytree().extent([[1], [0]]).extent(), [[0], [2]]);
});

it("binarytree.extent(extent) tolerates partially-valid extents", () => {
  assert.deepStrictEqual(binarytree().extent([[NaN], [1]]).extent(), [[1], [2]]);
  assert.deepStrictEqual(binarytree().extent([[0], [NaN]]).extent(), [[0], [1]]);
});

it("binarytree.extent(extent) allows trivial extents", () => {
  assert.deepStrictEqual(binarytree().extent([[0], [0]]).extent(), [[0], [1]]);
  assert.deepStrictEqual(binarytree().extent([[1], [1]]).extent(), [[1], [2]]);
});
