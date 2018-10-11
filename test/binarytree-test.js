var tape = require("tape"),
    d3_binarytree = require("../");

tape("d3.binarytree() creates an empty binarytree", function(test) {
  var q = d3_binarytree.binarytree();
  test.ok(q instanceof d3_binarytree.binarytree);
  test.equal(q.visit(function() { throw new Error; }), q);
  test.equal(q.size(), 0);
  test.equal(q.extent(), undefined);
  test.equal(q.root(), undefined);
  test.deepEqual(q.data(), []);
  test.end();
});

tape("d3.binarytree(nodes) is equivalent to d3.binarytree().addAll(nodes)", function(test) {
  var q = d3_binarytree.binarytree([[0], [1]]);
  test.ok(q instanceof d3_binarytree.binarytree);
  test.deepEqual(q.root(), [{data: [0]}, {data: [1]}]);
  test.end();
});

tape("d3.binarytree(nodes, x) is equivalent to d3.binarytree().x(x).addAll(nodes)", function(test) {
  var q = d3_binarytree.binarytree([{x: 0}, {x: 1}], function(d) { return d.x; });
  test.ok(q instanceof d3_binarytree.binarytree);
  test.deepEqual(q.root(), [{data: {x: 0}}, {data: {x: 1}}]);
  test.end();
});
