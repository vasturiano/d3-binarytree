var tape = require("tape"),
    d3_binarytree = require("../");

tape("binarytree.cover(x) sets a trivial extent if the extent was undefined", function(test) {
  test.deepEqual(d3_binarytree.binarytree().cover(2).extent(), [[2], [3]]);
  test.end();
});

tape("binarytree.cover(x) sets a non-trivial squarified and centered extent if the extent was trivial", function(test) {
  test.deepEqual(d3_binarytree.binarytree().cover(0).cover(2).extent(), [[0], [4]]);
  test.end();
});

tape("binarytree.cover(x) ignores invalid points", function(test) {
  test.deepEqual(d3_binarytree.binarytree().cover(0).cover(NaN).extent(), [[0], [1]]);
  test.end();
});

tape("binarytree.cover(x) repeatedly doubles the existing extent if the extent was non-trivial", function(test) {
  test.deepEqual(d3_binarytree.binarytree().cover(0).cover(2).cover(-1).extent(), [[-4], [4]]);
  test.deepEqual(d3_binarytree.binarytree().cover(0).cover(2).cover(1).extent(), [[0], [4]]);
  test.deepEqual(d3_binarytree.binarytree().cover(0).cover(2).cover(3).extent(), [[0], [4]]);
  test.deepEqual(d3_binarytree.binarytree().cover(0).cover(2).cover(-3).extent(), [[-4], [4]]);
  test.deepEqual(d3_binarytree.binarytree().cover(0).cover(2).cover(5).extent(), [[0], [8]]);
  test.end();
});

tape("binarytree.cover(x) repeatedly wraps the root node if it has children", function(test) {
  var q = d3_binarytree.binarytree().add([0]).add([2]);
  test.deepEqual(q.root(), [{data: [0]}, {data: [2]}]);
  test.deepEqual(q.copy().cover(3).root(), [{data: [0]}, {data: [2]}]);
  test.deepEqual(q.copy().cover(-1).root(), [,[{data: [0]}, {data: [2]}]]);
  test.deepEqual(q.copy().cover(5).root(), [[{data: [0]}, {data: [2]}], ]);
  test.end();
});

tape("binarytree.cover(x) does not wrap the root node if it is a leaf", function(test) {
  var q = d3_binarytree.binarytree().cover(0).add([2]);
  test.deepEqual(q.root(), {data: [2]});
  test.deepEqual(q.copy().cover(3).root(), {data: [2]});
  test.deepEqual(q.copy().cover(-1).root(), {data: [2]});
  test.deepEqual(q.copy().cover(5).root(), {data: [2]});
  test.end();
});

tape("binarytree.cover(x) does not wrap the root node if it is undefined", function(test) {
  var q = d3_binarytree.binarytree().cover(0).cover(2);
  test.equal(q.root(), undefined);
  test.equal(q.copy().cover(3).root(), undefined);
  test.equal(q.copy().cover(-1).root(), undefined);
  test.equal(q.copy().cover(5).root(), undefined);
  test.end();
});

tape("binarytree.cover() does not crash on huge values", function(test) {
  d3_binarytree.binarytree([[1e23]]);
  test.end();
});
