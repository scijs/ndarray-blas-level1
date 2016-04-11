'use strict';

var ndarray = require('ndarray');
var axpy = require('../axpy');
var assert = require('chai').assert;
var ndt = require('ndarray-tests');

describe('axpy', function () {
  it('computes ax + y', function () {
    var A = [1, 2, 3, 4];
    var B = [2, 1, 4, 3];
    var a = ndarray(new Float64Array(A));
    var b = ndarray(new Float64Array(B));

    axpy(2, a, b);
    assert(ndt.equal(b, ndarray([4, 5, 10, 11]), 1e-8));
  });
});

