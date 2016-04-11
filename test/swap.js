'use strict';

var ndarray = require('ndarray');
var swap = require('../swap');
var assert = require('chai').assert;
var ndt = require('ndarray-tests');

describe('swap', function () {
  it('swaps', function () {
    var A = [1, 2, 3, 4];
    var B = [2, 1, 4, 3];
    var a = ndarray(new Float64Array(A));
    var a0 = ndarray(new Float64Array(A));
    var b = ndarray(new Float64Array(B));
    var b0 = ndarray(new Float64Array(B));

    swap(a, b);
    assert(ndt.equal(b0, a, 1e-8));
    assert(ndt.equal(a0, b, 1e-8));
  });
});

