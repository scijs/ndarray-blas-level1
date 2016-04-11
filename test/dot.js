'use strict';

var ndarray = require('ndarray');
var dot = require('../dot');
var assert = require('chai').assert;
var almostEqual = require('almost-equal');

describe('dot', function () {
  it('computes the inner product', function () {
    var a = ndarray(new Float64Array([1, 2, 3, 4]));
    var b = ndarray(new Float64Array([2, 1, 4, 3]));

    assert(almostEqual(dot(a, b), 1 * 2 + 2 * 1 + 3 * 4 + 4 * 3));
  });

  it('computes the inner product when a === b', function () {
    var a = ndarray(new Float64Array([1, 2, 3, 4]));
    assert(almostEqual(dot(a, a), 1 * 1 + 2 * 2 + 3 * 3 + 4 * 4));
  });
});

