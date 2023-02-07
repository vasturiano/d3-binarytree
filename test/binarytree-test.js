import assert from "assert";
import {binarytree} from "../src/index.js";

it("d3.binarytree() creates an empty binarytree", () => {
  const q = binarytree();
  assert(q instanceof binarytree);
  assert.strictEqual(q.visit(function() { throw new Error; }), q);
  assert.strictEqual(q.size(), 0);
  assert.strictEqual(q.extent(), undefined);
  assert.strictEqual(q.root(), undefined);
  assert.deepStrictEqual(q.data(), []);
});

it("d3.binarytree(nodes) is equivalent to d3.binarytree().addAll(nodes)", () => {
  const q = binarytree([[0], [1]]);
  assert(q instanceof binarytree);
  assert.deepStrictEqual(q.root(), [{data: [0]}, {data: [1]}]);
});

it("d3.binarytree(nodes, x) is equivalent to d3.binarytree().x(x).addAll(nodes)", () => {
  const q = binarytree([{x: 0}, {x: 1}], function(d) { return d.x; });
  assert(q instanceof binarytree);
  assert.deepStrictEqual(q.root(), [{data: {x: 0}}, {data: {x: 1}}]);
});
