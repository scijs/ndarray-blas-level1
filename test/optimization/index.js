'use strict';

var assert = require('chai').assert;
var ndarray = require('ndarray');
var blas1 = require('../../');
var optimized = require('optimized');

var a, b;

function unoptimizable (a, b) {
  try {
    var c = a + b;
    return c;
  } catch (e) { }
}

describe('optimization', function () {
  var A = [1, 2, 3, 4];
  var B = [2, 1, 4, 3];
  a = ndarray(new Float64Array(A));
  b = ndarray(new Float64Array(B));

  it('swap', function () {
    assert(optimized(blas1.swap, [a, b]), 'optimized');
  });

  it('scal', function () {
    assert(optimized(blas1.scal, [2.0, b]), 'optimized');
  });

  it('copy', function () {
    assert(optimized(blas1.copy, [a, b]), 'optimized');
  });

  it('axpy', function () {
    assert(optimized(blas1.axpy, [1.0, a, b]), 'optimized');
  });

  it('dot', function () {
    assert(optimized(blas1.dot, [a, b]), 'optimized');
  });

  it('dot', function () {
    assert(optimized(blas1.dot, [a, a]), 'optimized');
  });

  it('cpsc', function () {
    assert(optimized(blas1.cpsc, [2.0, b, a]), 'optimized');
  });

  it('nrm2', function () {
    assert(optimized(blas1.nrm2, [a]), 'optimized');
  });

  it('asum', function () {
    assert(optimized(blas1.asum, [a]), 'optimized');
  });

  it('iamax', function () {
    assert(optimized(blas1.iamax, [a]), 'optimized');
  });

  it('rotg', function () {
    assert(optimized(blas1.rotg, [1, 2, [0, 0, 0]]), 'optimized');
  });

  it('unoptimizable sanity-check', function () {
    assert(!optimized(unoptimizable, [a, b]), 'unoptimized');
  });
});
