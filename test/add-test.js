import assert from "assert";
import {binarytree} from "../src/index.js";

it("binarytree.add(datum) creates a new point and adds it to the binarytree", () => {
  const q = binarytree();
  assert.deepStrictEqual(q.add([0]).root(), {data: [0]});
  assert.deepStrictEqual(q.add([0.9]).root(), [{data: [0]}, {data: [0.9]}]);
  assert.deepStrictEqual(q.add([0.4]).root(), [[{data: [0]}, {data: [0.4]}], {data: [0.9]}]);
});

it("binarytree.add(datum) handles points being on the perimeter of the binarytree bounds", () => {
  const q = binarytree().extent([[0], [1]]);
  assert.deepStrictEqual(q.add([0]).root(), {data: [0]});
  assert.deepStrictEqual(q.add([1]).root(), [{data: [0]}, {data: [1]}]);
});

it("binarytree.add(datum) handles points being to the left of the binarytree bounds", () => {
  const q = binarytree().extent([[0], [2]]);
  assert.deepStrictEqual(q.add([-1]).extent(), [[-4], [4]]);
});

it("binarytree.add(datum) handles points being to the right of the binarytree bounds", () => {
  const q = binarytree().extent([[0], [2]]);
  assert.deepStrictEqual(q.add([3]).extent(), [[0], [4]]);
});

it("binarytree.add(datum) handles coincident points by creating a linked list", () => {
  const q = binarytree().extent([[0], [1]]);
  assert.deepStrictEqual(q.add([0]).root(), {data: [0]});
  assert.deepStrictEqual(q.add([1]).root(), [{data: [0]}, {data: [1]}]);
  assert.deepStrictEqual(q.add([1]).root(), [{data: [0]}, {data: [1], next: {data: [1]}}]);
});

it("binarytree.add(datum) implicitly defines trivial bounds for the first point", () => {
  const q = binarytree().add([2]);
  assert.deepStrictEqual(q.extent(), [[2], [3]]);
  assert.deepStrictEqual(q.root(), {data: [2]});
});
