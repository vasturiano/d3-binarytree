import assert from "assert";
import {binarytree} from "../src/index.js";

it("binarytree.copy() returns a copy of this binarytree", () => {
  const q0 = binarytree().addAll([[0], [1]]);
  assert.deepStrictEqual(q0.copy(), q0);
});

it("binarytree.copy() isolates changes to the extent", () => {
  const q0 = binarytree().extent([[0], [1]]),
      q1 = q0.copy();
  q0.add([2]);
  assert.deepStrictEqual(q1.extent(), [[0], [2]]);
  q1.add([-1]);
  assert.deepStrictEqual(q0.extent(), [[0], [4]]);
});

it("binarytree.copy() isolates changes to the root when a leaf", () => {
  let q0 = binarytree().extent([[0], [1]]),
      q1 = q0.copy(),
      p0 = [2];
  q0.add(p0);
  assert.strictEqual(q1.root(), undefined);
  q1 = q0.copy();
  assert.deepStrictEqual(q0.root(), {data: [2]});
  assert.deepStrictEqual(q1.root(), {data: [2]});
  assert.strictEqual(q0.remove(p0), q0);
  assert.strictEqual(q0.root(), undefined);
  assert.deepStrictEqual(q1.root(), {data: [2]});
});

it("binarytree.copy() isolates changes to the root when not a leaf", () => {
  const p0 = [1],
      p1 = [2],
      p2 = [3],
      q0 = binarytree().extent([[0], [4]]).addAll([p0, p1]);
  let q1 = q0.copy();
  q0.add(p2);
  assert.deepStrictEqual(q0.extent(), [[0], [8]]);
  assert.deepStrictEqual(q0.root(), [[{data: [1]}, [{data: [2]}, {data: [3]}]],, ]);
  assert.deepStrictEqual(q1.extent(), [[0], [8]]);
  assert.deepStrictEqual(q1.root(), [[{data: [1]}, {data: [2]}],, ]);
  q1 = q0.copy();
  q0.remove(p2);
  assert.deepStrictEqual(q1.extent(), [[0], [8]]);
  assert.deepStrictEqual(q1.root(), [[{data: [1]}, [{data: [2]}, {data: [3]}]],, ]);
});
