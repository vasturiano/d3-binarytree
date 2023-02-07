import assert from "assert";
import {binarytree} from "../src/index.js";

it("binarytree.size() returns the number of points in the binarytree", () => {
  const q = binarytree();
  assert.strictEqual(q.size(), 0);
  q.add([0]).add([1, 2]);
  assert.strictEqual(q.size(), 2);
});

it("binarytree.size() correctly counts coincident nodes", () => {
  const q = binarytree();
  q.add([0]).add([0]);
  assert.strictEqual(q.size(), 2);
});
