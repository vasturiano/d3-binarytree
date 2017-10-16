var tape = require("tape"),
    d3_binarytree = require("../");

tape("binarytree.remove(datum) removes a point and returns the binarytree", function(test) {
  var p0 = [1],
      q = d3_binarytree.binarytree().add(p0);
  test.deepEqual(q.root(), {data: p0});
  test.equal(q.remove(p0), q);
  test.deepEqual(q.root(), undefined);
  test.end();
});

tape("binarytree.remove(datum) removes the only point in the binarytree", function(test) {
  var p0 = [1],
      q = d3_binarytree.binarytree().add(p0);
  test.equal(q.remove(p0), q);
  test.deepEqual(q.extent(), [[1], [2]]);
  test.deepEqual(q.root(), undefined);
  test.deepEqual(p0, [1]);
  test.end();
});

tape("binarytree.remove(datum) removes a first coincident point at the root in the binarytree", function(test) {
  var p0 = [1],
      p1 = [1],
      q = d3_binarytree.binarytree().addAll([p0, p1]);
  test.equal(q.remove(p0), q);
  test.deepEqual(q.extent(), [[1], [2]]);
  test.equal(q.root().data, p1);
  test.deepEqual(p0, [1]);
  test.deepEqual(p1, [1]);
  test.end();
});

tape("binarytree.remove(datum) removes another coincident point at the root in the binarytree", function(test) {
  var p0 = [1],
      p1 = [1],
      q = d3_binarytree.binarytree().addAll([p0, p1]);
  test.equal(q.remove(p1), q);
  test.deepEqual(q.extent(), [[1], [2]]);
  test.equal(q.root().data, p0);
  test.deepEqual(p0, [1]);
  test.deepEqual(p1, [1]);
  test.end();
});

tape("binarytree.remove(datum) removes a non-root point in the binarytree", function(test) {
  var p0 = [0],
      p1 = [1],
      q = d3_binarytree.binarytree().addAll([p0, p1]);
  test.equal(q.remove(p0), q);
  test.deepEqual(q.extent(), [[0], [1]]);
  test.equal(q.root().data, p1);
  test.deepEqual(p0, [0]);
  test.deepEqual(p1, [1]);
  test.end();
});

tape("binarytree.remove(datum) removes another non-root point in the binarytree", function(test) {
  var p0 = [0],
      p1 = [1],
      q = d3_binarytree.binarytree().addAll([p0, p1]);
  test.equal(q.remove(p1), q);
  test.deepEqual(q.extent(), [[0], [1]]);
  test.equal(q.root().data, p0);
  test.deepEqual(p0, [0]);
  test.deepEqual(p1, [1]);
  test.end();
});

tape("binarytree.remove(datum) ignores a point not in the binarytree", function(test) {
  var p0 = [0],
      p1 = [1],
      q0 = d3_binarytree.binarytree().add(p0),
      q1 = d3_binarytree.binarytree().add(p1);
  test.equal(q0.remove(p1), q0);
  test.deepEqual(q0.extent(), [[0], [1]]);
  test.equal(q0.root().data, p0);
  test.end();
});

tape("binarytree.remove(datum) ignores a coincident point not in the binarytree", function(test) {
  var p0 = [0],
      p1 = [0],
      q0 = d3_binarytree.binarytree().add(p0),
      q1 = d3_binarytree.binarytree().add(p1);
  test.equal(q0.remove(p1), q0);
  test.deepEqual(q0.extent(), [[0], [1]]);
  test.equal(q0.root().data, p0);
  test.end();
});

tape("binarytree.remove(datum) removes another point in the binarytree", function(test) {
  var q = d3_binarytree.binarytree()
      .extent([[0], [959]])
      .addAll([[630], [715], [523], [646], [434], [570], [520], [459], [346], [529]]);
  test.equal(q.remove(q.find(582)), q);
  test.deepEqual(q.extent(), [[0], [1024]]);
  test.deepEqual(q.root(), [
    [
      ,
      [
        {data: [346]},
        [
          {data: [434]},
          {data: [459]}
        ]
      ]
    ],
    [
      [
        [
          [
            [
              [
                ,
                [
                  [
                    {data: [520]},
                    {data: [523]}
                  ]
                  ,
                ]
              ],
              {data: [529]}
            ]
            ,
          ],
          {data: [630]}
        ],
        [
          {data: [646]},
          {data: [715]}
        ]
      ]
      ,
    ]
  ]);
  test.end();
});
