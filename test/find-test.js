import assert from "assert";
import {binarytree} from "../src/index.js";

it("binarytree.find(x) returns the closest point to the given [x]", () => {
  const dx = 17,
      q = binarytree();
  for (let i = 0, n = dx; i < n; ++i) { q.add([i]); }
  assert.deepStrictEqual(q.find( 0.1), [ 0]);
  assert.deepStrictEqual(q.find( 7.1), [ 7]);
  assert.deepStrictEqual(q.find(15.9), [16]);
});

it("binarytree.find(x, radius) returns the closest point within the search radius to the given [x]", () => {
  const q = binarytree([[0], [100]]);
  assert.deepStrictEqual(q.find(20, Infinity), [0]);
  assert.deepStrictEqual(q.find(20, 20 + 1e-6), [0]);
  assert.strictEqual(q.find(20, 20 - 1e-6), undefined);
});

it("binarytree.find(x, null) treats the given radius as Infinity", () => {
  const q = binarytree([[0], [100]]);
  assert.deepStrictEqual(q.find(20, null), [0]);
  assert.deepStrictEqual(q.find(20, undefined), [0]);
});
