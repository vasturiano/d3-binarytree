import assert from "assert";
import {binarytree} from "../src/index.js";

it("binarytree.remove(datum) removes a point and returns the binarytree", () => {
  const p0 = [1],
      q = binarytree().add(p0);
  assert.deepStrictEqual(q.root(), {data: p0});
  assert.strictEqual(q.remove(p0), q);
  assert.deepStrictEqual(q.root(), undefined);
});

it("binarytree.remove(datum) removes the only point in the binarytree", () => {
  const p0 = [1],
      q = binarytree().add(p0);
  assert.strictEqual(q.remove(p0), q);
  assert.deepStrictEqual(q.extent(), [[1], [2]]);
  assert.deepStrictEqual(q.root(), undefined);
  assert.deepStrictEqual(p0, [1]);
});

it("binarytree.remove(datum) removes a first coincident point at the root in the binarytree", () => {
  const p0 = [1],
      p1 = [1],
      q = binarytree().addAll([p0, p1]);
  assert.strictEqual(q.remove(p0), q);
  assert.deepStrictEqual(q.extent(), [[1], [2]]);
  assert.strictEqual(q.root().data, p1);
  assert.deepStrictEqual(p0, [1]);
  assert.deepStrictEqual(p1, [1]);
});

it("binarytree.remove(datum) removes another coincident point at the root in the binarytree", () => {
  const p0 = [1],
      p1 = [1],
      q = binarytree().addAll([p0, p1]);
  assert.strictEqual(q.remove(p1), q);
  assert.deepStrictEqual(q.extent(), [[1], [2]]);
  assert.strictEqual(q.root().data, p0);
  assert.deepStrictEqual(p0, [1]);
  assert.deepStrictEqual(p1, [1]);
});

it("binarytree.remove(datum) removes a non-root point in the binarytree", () => {
  const p0 = [0],
      p1 = [1],
      q = binarytree().addAll([p0, p1]);
  assert.strictEqual(q.remove(p0), q);
  assert.deepStrictEqual(q.extent(), [[0], [2]]);
  assert.strictEqual(q.root().data, p1);
  assert.deepStrictEqual(p0, [0]);
  assert.deepStrictEqual(p1, [1]);
});

it("binarytree.remove(datum) removes another non-root point in the binarytree", () => {
  const p0 = [0],
      p1 = [1],
      q = binarytree().addAll([p0, p1]);
  assert.strictEqual(q.remove(p1), q);
  assert.deepStrictEqual(q.extent(), [[0], [2]]);
  assert.strictEqual(q.root().data, p0);
  assert.deepStrictEqual(p0, [0]);
  assert.deepStrictEqual(p1, [1]);
});

it("binarytree.remove(datum) ignores a point not in the binarytree", () => {
  const p0 = [0],
      p1 = [1],
      q0 = binarytree().add(p0),
      q1 = binarytree().add(p1);
  assert.strictEqual(q0.remove(p1), q0);
  assert.deepStrictEqual(q0.extent(), [[0], [1]]);
  assert.strictEqual(q0.root().data, p0);
  assert.strictEqual(q1.root().data, p1);
});

it("binarytree.remove(datum) ignores a coincident point not in the binarytree", () => {
  const p0 = [0],
      p1 = [0],
      q0 = binarytree().add(p0),
      q1 = binarytree().add(p1);
  assert.strictEqual(q0.remove(p1), q0);
  assert.deepStrictEqual(q0.extent(), [[0], [1]]);
  assert.strictEqual(q0.root().data, p0);
  assert.strictEqual(q1.root().data, p1);
});

it("binarytree.remove(datum) removes another point in the binarytree", () => {
  const q = binarytree()
      .extent([[0], [959]])
      .addAll([[630], [715], [523], [646], [434], [570], [520], [459], [346], [529]]);
  assert.strictEqual(q.remove(q.find(582)), q);
  assert.deepStrictEqual(q.extent(), [[0], [1024]]);
  assert.deepEqual(q.root(), [
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
                  ,,
                ]
              ],
              {data: [529]}
            ]
            ,,
          ],
          {data: [630]}
        ],
        [
          {data: [646]},
          {data: [715]}
        ]
      ]
      ,,
    ]
  ]);
});
