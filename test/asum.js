'use strict';

var ndarray = require('ndarray');
var asum = require('../asum');
var assert = require('chai').assert;
var almostEqual = require('almost-equal');

describe('asum', function () {
  it('computes the L1 norm', function () {
    var a = ndarray(new Float64Array([1, 2, 3, 4]));

    assert(almostEqual(asum(a), 1 + 2 + 3 + 4));
  });
});

