var tape = require("tape"),
    d3_binarytree = require("../");

tape("binarytree.data() returns an array of data in the binarytree", function(test) {
  var q = d3_binarytree.binarytree();
  test.deepEqual(q.data(), []);
  q.add([0, 0]).add([1, 2]);
  test.deepEqual(q.data(), [[0, 0], [1, 2]]);
  test.end();
});

tape("binarytree.data() correctly handles coincident nodes", function(test) {
  var q = d3_binarytree.binarytree();
  q.add([0, 0]).add([0, 0]);
  test.deepEqual(q.data(), [[0, 0], [0, 0]]);
  test.end();
});
