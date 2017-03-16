var tape = require("tape"),
    d3_binarytree = require("../");

tape("binarytree.x(x) sets the x-accessor used by binarytree.add", function(test) {
  var q = d3_binarytree.binarytree().x(x).add({x: 1, 1: 2});
  test.deepEqual(q.extent(), [[1, 2], [2, 3]]);
  test.deepEqual(q.root(), {data: {x: 1, 1: 2}});
  test.end();
});

tape("binarytree.x(x) sets the x-accessor used by binarytree.addAll", function(test) {
  var q = d3_binarytree.binarytree().x(x).addAll([{x: 1, 1: 2}]);
  test.deepEqual(q.extent(), [[1, 2], [2, 3]]);
  test.deepEqual(q.root(), {data: {x: 1, 1: 2}});
  test.end();
});

tape("binarytree.x(x) sets the x-accessor used by binarytree.remove", function(test) {
  var p0 = {x: 0, 1: 1},
      p1 = {x: 1, 1: 2},
      q = d3_binarytree.binarytree().x(x);
  test.deepEqual(q.add(p0).root(), {data: {x: 0, 1: 1}});
  test.deepEqual(q.add(p1).root(), [{data: {x: 0, 1: 1}},,, {data: {x: 1, 1: 2}}]);
  test.deepEqual(q.remove(p1).root(), {data: {x: 0, 1: 1}});
  test.equal(q.remove(p0).root(), undefined);
  test.end();
});

function x(d) {
  return d.x;
}
