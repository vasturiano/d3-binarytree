var tape = require("tape"),
    d3_binarytree = require("../");

tape("binarytree.add(datum) creates a new point and adds it to the binarytree", function(test) {
  var q = d3_binarytree.binarytree();
  test.deepEqual(q.add([0, 0]).root(), {data: [0, 0]});
  test.deepEqual(q.add([1, 1]).root(), [{data: [0, 0]},,, {data: [1, 1]}]);
  test.deepEqual(q.add([1, 0]).root(), [{data: [0, 0]}, {data: [1, 0]},, {data: [1, 1]}]);
  test.deepEqual(q.add([0, 1]).root(), [{data: [0, 0]}, {data: [1, 0]}, {data: [0, 1]}, {data: [1, 1]}]);
  test.deepEqual(q.add([0.4, 0.4]).root(), [[{data: [0, 0]},,, {data: [0.4, 0.4]}], {data: [1, 0]}, {data: [0, 1]}, {data: [1, 1]}]);
  test.end();
});

tape("binarytree.add(datum) handles points being on the perimeter of the binarytree bounds", function(test) {
  var results = [], q = d3_binarytree.binarytree().extent([[0, 0], [1, 1]]);
  test.deepEqual(q.add([0, 0]).root(), {data: [0, 0]});
  test.deepEqual(q.add([1, 1]).root(), [{data: [0, 0]},,, {data: [1, 1]}]);
  test.deepEqual(q.add([1, 0]).root(), [{data: [0, 0]}, {data: [1, 0]},, {data: [1, 1]}]);
  test.deepEqual(q.add([0, 1]).root(), [{data: [0, 0]}, {data: [1, 0]}, {data: [0, 1]}, {data: [1, 1]}]);
  test.end();
});

tape("binarytree.add(datum) handles points being to the top of the binarytree bounds", function(test) {
  var results = [], q = d3_binarytree.binarytree().extent([[0, 0], [2, 2]]);
  test.deepEqual(q.add([1, -1]).extent(), [[0, -2], [4, 2]]);
  test.end();
});

tape("binarytree.add(datum) handles points being to the right of the binarytree bounds", function(test) {
  var results = [], q = d3_binarytree.binarytree().extent([[0, 0], [2, 2]]);
  test.deepEqual(q.add([3, 1]).extent(), [[0, 0], [4, 4]]);
  test.end();
});

tape("binarytree.add(datum) handles points being to the bottom of the binarytree bounds", function(test) {
  var results = [], q = d3_binarytree.binarytree().extent([[0, 0], [2, 2]]);
  test.deepEqual(q.add([1, 3]).extent(), [[0, 0], [4, 4]]);
  test.end();
});

tape("binarytree.add(datum) handles points being to the left of the binarytree bounds", function(test) {
  var results = [], q = d3_binarytree.binarytree().extent([[0, 0], [2, 2]]);
  test.deepEqual(q.add([-1, 1]).extent(), [[-2, 0], [2, 4]]);
  test.end();
});

tape("binarytree.add(datum) handles coincident points by creating a linked list", function(test) {
  var q = d3_binarytree.binarytree().extent([[0, 0], [1, 1]]);
  test.deepEqual(q.add([0, 0]).root(), {data: [0, 0]});
  test.deepEqual(q.add([1, 0]).root(), [{data: [0, 0]}, {data: [1, 0]},, ]);
  test.deepEqual(q.add([0, 1]).root(), [{data: [0, 0]}, {data: [1, 0]}, {data: [0, 1]}, ]);
  test.deepEqual(q.add([0, 1]).root(), [{data: [0, 0]}, {data: [1, 0]}, {data: [0, 1], next: {data: [0, 1]}}, ]);
  test.end();
});

tape("binarytree.add(datum) implicitly defines trivial bounds for the first point", function(test) {
  var q = d3_binarytree.binarytree().add([1, 2]);
  test.deepEqual(q.extent(), [[1, 2], [2, 3]]);
  test.deepEqual(q.root(), {data: [1, 2]});
  test.end();
});
