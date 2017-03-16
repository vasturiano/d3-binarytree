var tape = require("tape"),
    d3_array = require("d3-array"),
    d3_binarytree = require("../");

tape("binarytree.find(x) returns the closest point to the given [x]", function(test) {
  var dx = 17,
      q = d3_binarytree.binarytree();
  d3_array.range(dx).forEach(function(i) { q.add([i]); });
  test.deepEqual(q.find( 0.1), [ 0]);
  test.deepEqual(q.find( 7.1), [ 7]);
  test.deepEqual(q.find(15.9), [16]);
  test.end();
});

tape("binarytree.find(x, radius) returns the closest point within the search radius to the given [x]", function(test) {
  var q = d3_binarytree.binarytree([[0], [100]]);
  test.deepEqual(q.find(20, Infinity), [0]);
  test.deepEqual(q.find(20, 20 + 1e-6), [0]);
  test.equal(q.find(20, 20 - 1e-6), undefined);
  test.end();
});

tape("binarytree.find(x, null) treats the given radius as Infinity", function(test) {
  var q = d3_binarytree.binarytree([[0], [100]]);
  test.deepEqual(q.find(20, null), [0]);
  test.deepEqual(q.find(20, undefined), [0]);
  test.end();
});
