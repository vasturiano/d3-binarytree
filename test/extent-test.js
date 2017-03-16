var tape = require("tape"),
    d3_binarytree = require("../");

tape("binarytree.extent(extent) extends the extent", function(test) {
  test.deepEqual(d3_binarytree.binarytree().extent([[0, 1], [2, 6]]).extent(), [[0, 1], [8, 9]]);
  test.end();
});

tape("binarytree.extent() can be inferred by binarytree.cover", function(test) {
  var q = d3_binarytree.binarytree();
  test.deepEqual(q.cover(0, 0).extent(), [[0, 0], [1, 1]]);
  test.deepEqual(q.cover(2, 4).extent(), [[0, 0], [4, 4]]);
  test.end();
});

tape("binarytree.extent() can be inferred by binarytree.add", function(test) {
  var q = d3_binarytree.binarytree();
  q.add([0, 0]);
  test.deepEqual(q.extent(), [[0, 0], [1, 1]]);
  q.add([2, 4]);
  test.deepEqual(q.extent(), [[0, 0], [4, 4]]);
  test.end();
});

tape("binarytree.extent(extent) squarifies and centers the specified extent", function(test) {
  test.deepEqual(d3_binarytree.binarytree().extent([[0, 1], [2, 6]]).extent(), [[0, 1], [8, 9]]);
  test.end();
});

tape("binarytree.extent(extent) ignores invalid extents", function(test) {
  test.equal(d3_binarytree.binarytree().extent([[1, NaN], [NaN, 0]]).extent(), undefined);
  test.equal(d3_binarytree.binarytree().extent([[NaN, 1], [0, NaN]]).extent(), undefined);
  test.equal(d3_binarytree.binarytree().extent([[NaN, NaN], [NaN, NaN]]).extent(), undefined);
  test.end();
});

tape("binarytree.extent(extent) flips inverted extents", function(test) {
  test.deepEqual(d3_binarytree.binarytree().extent([[1, 1], [0, 0]]).extent(), [[0, 0], [2, 2]]);
  test.end();
});

tape("binarytree.extent(extent) tolerates partially-valid extents", function(test) {
  test.deepEqual(d3_binarytree.binarytree().extent([[NaN, 0], [1, 1]]).extent(), [[1, 1], [2, 2]]);
  test.deepEqual(d3_binarytree.binarytree().extent([[0, NaN], [1, 1]]).extent(), [[1, 1], [2, 2]]);
  test.deepEqual(d3_binarytree.binarytree().extent([[0, 0], [NaN, 1]]).extent(), [[0, 0], [1, 1]]);
  test.deepEqual(d3_binarytree.binarytree().extent([[0, 0], [1, NaN]]).extent(), [[0, 0], [1, 1]]);
  test.end();
});

tape("binarytree.extent(extent) allows trivial extents", function(test) {
  test.deepEqual(d3_binarytree.binarytree().extent([[0, 0], [0, 0]]).extent(), [[0, 0], [1, 1]]);
  test.deepEqual(d3_binarytree.binarytree().extent([[1, 1], [1, 1]]).extent(), [[1, 1], [2, 2]]);
  test.end();
});
