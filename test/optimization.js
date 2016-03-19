'use strict';

var ndarray = require('ndarray');
var blas1 = require('../index.js');
var tape = require('tape');
var optimized = require('optimized');

var a, b;

function test (name, callback) {
  var A = [1, 2, 3, 4];
  var B = [2, 1, 4, 3];
  a = ndarray(new Float64Array(A));
  b = ndarray(new Float64Array(B));

  tape(name, callback);
}

function unoptimizable (a, b) {
  try {
    var c = a + b;
    return c;
  } catch (e) { }
}

test('swap', function (t) {
  t.assert(optimized(blas1.swap, [a, b]), 'optimized');
  t.end();
});

test('scal', function (t) {
  t.assert(optimized(blas1.scal, [2.0, b]), 'optimized');
  t.end();
});

test('copy', function (t) {
  t.assert(optimized(blas1.copy, [a, b]), 'optimized');
  t.end();
});

test('axpy', function (t) {
  t.assert(optimized(blas1.axpy, [1.0, a, b]), 'optimized');
  t.end();
});

test('dot', function (t) {
  t.assert(optimized(blas1.dot, [a, b]), 'optimized');
  t.end();
});

test('dot', function (t) {
  t.assert(optimized(blas1.dot, [a, a]), 'optimized');
  t.end();
});

test('cpsc', function (t) {
  t.assert(optimized(blas1.cpsc, [2.0, b, a]), 'optimized');
  t.end();
});

test('nrm2', function (t) {
  t.assert(optimized(blas1.nrm2, [a]), 'optimized');
  t.end();
});

test('asum', function (t) {
  t.assert(optimized(blas1.asum, [a]), 'optimized');
  t.end();
});

test('iamax', function (t) {
  t.assert(optimized(blas1.iamax, [a]), 'optimized');
  t.end();
});

test('unoptimizable sanity-check', function (t) {
  t.assert(!optimized(unoptimizable, [a, b]), 'unoptimized');
  t.end();
});

