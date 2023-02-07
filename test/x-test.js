import assert from "assert";
import {binarytree} from "../src/index.js";

it("binarytree.x(x) sets the x-accessor used by binarytree.add", () => {
  const q = binarytree().x(x).add({x: 1});
  assert.deepStrictEqual(q.extent(), [[1], [2]]);
  assert.deepStrictEqual(q.root(), {data: {x: 1}});
});

it("binarytree.x(x) sets the x-accessor used by binarytree.addAll", () => {
  const q = binarytree().x(x).addAll([{x: 1}]);
  assert.deepStrictEqual(q.extent(), [[1], [2]]);
  assert.deepStrictEqual(q.root(), {data: {x: 1}});
});

it("binarytree.x(x) sets the x-accessor used by binarytree.remove", () => {
  const p0 = {x: 0},
      p1 = {x: 1},
      q = binarytree().x(x);
  assert.deepStrictEqual(q.add(p0).root(), {data: {x: 0}});
  assert.deepStrictEqual(q.add(p1).root(), [{data: {x: 0}}, {data: {x: 1}}]);
  assert.deepStrictEqual(q.remove(p1).root(), {data: {x: 0}});
  assert.strictEqual(q.remove(p0).root(), undefined);
});

function x(d) {
  return d.x;
}
