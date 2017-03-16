var tape = require("tape"),
    d3_binarytree = require("../");

tape("binarytree.size() returns the number of points in the binarytree", function(test) {
  var q = d3_binarytree.binarytree();
  test.equal(q.size(), 0);
  q.add([0, 0]).add([1, 2]);
  test.equal(q.size(), 2);
  test.end();
});

tape("binarytree.size() correctly counts coincident nodes", function(test) {
  var q = d3_binarytree.binarytree();
  q.add([0, 0]).add([0, 0]);
  test.equal(q.size(), 2);
  test.end();
});
