'use strict';

var ndarray = require('ndarray');
var blas1 = require('../index.js');
var tape = require('tape');
var pool = require('ndarray-scratch');
var ops = require('ndarray-ops');

var a, b, a0, b0;

function equal (t, a, b, tol) {
  t.assert(a.dimension === b.dimension, 'expected dimension ' + a.dimension + ' to equal dimension ' + b.dimension + '.');
  t.deepEqual(a.shape, b.shape, 'expected shape ' + a.shape + ' to equal shape ' + b.shape + '.');
  var c = pool.zeros(a.shape, a.dtype);
  ops.sub(c, a, b);
  var err = ops.norm2(c);
  t.assert(err < tol, 'Expected error ' + err + ' to be less than tolerance ' + tol + '.');
}

function test (name, callback) {
  tape(name, function (t) {
    var A = [1, 2, 3, 4];
    var B = [2, 1, 4, 3];
    a = ndarray(new Float64Array(A));
    a0 = ndarray(new Float64Array(A));
    b = ndarray(new Float64Array(B));
    b0 = ndarray(new Float64Array(B));

    callback(t);
  });
}

test('swap', function (t) {
  blas1.swap(a, b);
  equal(t, b0, a, 1e-8);
  equal(t, a0, b, 1e-8);
  t.end();
});

test('scal', function (t) {
  blas1.scal(4.5, a);
  equal(t, a, ndarray([4.5, 9, 13.5, 18]), 1e-8);
  t.end();
});

test('copy', function (t) {
  blas1.copy(a, b);
  equal(t, a, a0, 1e-8);
  equal(t, b, a0, 1e-8);
  t.end();
});

test('cpsc', function (t) {
  blas1.cpsc(2, a, b);
  equal(t, a, a0, 1e-8);
  equal(t, b, ndarray([2, 4, 6, 8]), 1e-8);
  t.end();
});

test('axpy', function (t) {
  blas1.axpy(2, a, b);
  equal(t, b, ndarray([4, 5, 10, 11]), 1e-8);
  t.end();
});

test('dot', function (t) {
  t.equal(blas1.dot(a, b), 1 * 2 + 2 * 1 + 3 * 4 + 4 * 3);
  t.end();
});

test('dot (with identical input simplification)', function (t) {
  t.equal(blas1.dot(a, b), 1 * 2 + 2 * 1 + 3 * 4 + 4 * 3);
  t.end();
});

test('nrm2', function (t) {
  t.assert(Math.abs(blas1.nrm2(a) - Math.sqrt(1 * 1 + 2 * 2 + 3 * 3 + 4 * 4)) < 1e-8);
  t.assert(Math.abs(blas1.nrm2(ndarray(new Float64Array([3.00e-300, 4.00e-300]))) - 5e-300) < 1e-8);
  t.assert(Math.abs(blas1.nrm2(ndarray(new Float64Array([5.00e+300, 1.20e+301]))) - 1.3e+301) < 1e-8);
  t.end();
});

test('asum', function (t) {
  t.assert(Math.abs(blas1.asum(a) - (1 + 2 + 3 + 4)) < 1e-8);
  t.end();
});

test('iamax', function (t) {
  t.deepEqual(blas1.iamax(a), 3);
  t.deepEqual(blas1.iamax(b), 2);
  t.end();
});

test('rotg', function (t) {
  var csr = new Float64Array(3);
  var f = a.get(0);
  var g = a.get(1);

  blas1.rotg(f, g, csr);
  var c = csr[0];
  var s = csr[1];
  var r = csr[2];

  var err = Math.abs(r - Math.sqrt(f * f + g * g));
  var tol = 1e-8;
  t.assert(err < tol, 'Expected error ' + err + ' to be less than tolerance ' + tol + '.');
  err = Math.abs(c - (f / r));
  t.assert(err < tol, 'Expected error ' + err + ' to be less than tolerance ' + tol + '.');
  err = Math.abs(s - (g / r));
  t.assert(err < tol, 'Expected error ' + err + ' to be less than tolerance ' + tol + '.');

  t.end();
});

