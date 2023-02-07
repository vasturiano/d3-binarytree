import assert from "assert";
import {binarytree} from "../src/index.js";

it("binarytree.addAll(data) creates new points and adds them to the binarytree", () => {
  const q = binarytree();
  assert.deepStrictEqual(q.add([0.0]).root(), {data: [0]});
  assert.deepStrictEqual(q.add([0.9]).root(), [{data: [0]}, {data: [0.9]}]);
  assert.deepStrictEqual(q.add([0.4]).root(), [[{data: [0]}, {data: [0.4]}], {data: [0.9]}]);
});

it("binarytree.addAll(data) ignores points with NaN coordinates", () => {
  const q = binarytree();
  assert.deepStrictEqual(q.addAll([[NaN]]).root(), undefined);
  assert.strictEqual(q.extent(), undefined);
  assert.deepStrictEqual(q.addAll([[0], [0.9]]).root(), [{data: [0]}, {data: [0.9]}]);
  assert.deepStrictEqual(q.addAll([[NaN]]).root(), [{data: [0]}, {data: [0.9]}]);
  assert.deepStrictEqual(q.extent(), [[0], [1]]);
});

it("binarytree.addAll(data) correctly handles the empty array", () => {
  const q = binarytree();
  assert.deepStrictEqual(q.addAll([]).root(), undefined);
  assert.strictEqual(q.extent(), undefined);
  assert.deepStrictEqual(q.addAll([[0], [1]]).root(), [{data: [0]}, {data: [1]}]);
  assert.deepStrictEqual(q.addAll([]).root(), [{data: [0]}, {data: [1]}]);
  assert.deepStrictEqual(q.extent(), [[0], [2]]);
});

it("binarytree.addAll(data) computes the extent of the data before adding", () => {
  const q = binarytree().addAll([[0.4], [0], [0.9]]);
  assert.deepStrictEqual(q.root(), [[{data: [0]}, {data: [0.4]}], {data: [0.9]}]);
});

it("binarytree.addAll(iterable) adds points from an iterable", () => {
  const q = binarytree().addAll(new Set([[0.4], [0], [0.9]]));
  assert.deepStrictEqual(q.root(), [[{data: [0]}, {data: [0.4]}], {data: [0.9]}]);
});

it("binarytree(iterable) adds points from an iterable", () => {
  const q = binarytree(new Set([[0.4], [0], [0.9]]));
  assert.deepStrictEqual(q.root(), [[{data: [0]}, {data: [0.4]}], {data: [0.9]}]);
});
