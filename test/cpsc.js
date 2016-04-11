'use strict';

var ndarray = require('ndarray');
var cpsc = require('../cpsc');
var assert = require('chai').assert;
var ndt = require('ndarray-tests');

describe('cpsc', function () {
  it('copies and scales', function () {
    var A = [1, 2, 3, 4];
    var B = [2, 1, 4, 3];
    var a = ndarray(new Float64Array(A));
    var a0 = ndarray(new Float64Array(A));
    var b = ndarray(new Float64Array(B));

    cpsc(2, a, b);
    assert(ndt.equal(a, a0, 1e-8));
    assert(ndt.equal(b, ndarray([2, 4, 6, 8]), 1e-8));
  });
});

