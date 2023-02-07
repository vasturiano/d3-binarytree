import assert from "assert";
import {binarytree} from "../src/index.js";

it("binarytree.data() returns an array of data in the binarytree", () => {
  const q = binarytree();
  assert.deepStrictEqual(q.data(), []);
  q.add([0]).add([1, 2]);
  assert.deepStrictEqual(q.data(), [[0], [1, 2]]);
});

it("binarytree.data() correctly handles coincident nodes", () => {
  const q = binarytree();
  q.add([0]).add([0]);
  assert.deepStrictEqual(q.data(), [[0], [0]]);
});
