'use strict';

var assert = require('chai').assert,
    ndarray = require('ndarray'),
    pool = require('ndarray-scratch'),
    ops = require('ndarray-ops'),
    blas1 = require('../index.js');

assert.ndCloseTo = function(a,b,tol) {
  assert(a.dimension===b.dimension, 'expected dimension '+a.dimension+' to equal dimension '+b.dimension+'.');
  assert.deepEqual(a.shape, b.shape, 'expected shape '+a.shape+' to equal shape '+b.shape+'.');
  var c = pool.zeros(a.shape, a.dtype);
  ops.sub(c,a,b);
  var err = ops.norm2(c);
  assert( err < tol, 'Expected error '+err+' to be less than tolerance '+tol+'.');
};

describe("BLAS Level 1",function() {

  var a, b, a0, b0;

  beforeEach(function() {
    var A = [1,2,3,4];
    var B = [2,1,4,3];
    a = ndarray(new Float64Array(A));
    a0 = ndarray(new Float64Array(A));
    b = ndarray(new Float64Array(B));
    b0 = ndarray(new Float64Array(B));
  });

  it('swap',function() {
    blas1.swap(a,b);
    assert.ndCloseTo( b0, a, 1e-8 );
    assert.ndCloseTo( a0, b, 1e-8 );
  });

  it('scal',function() {
    blas1.scal(4.5, a);
    assert.ndCloseTo( a, ops.mulseq(a0,4.5), 1e-8 );
  });

  it('copy',function() {
    blas1.copy(a,b);
    assert.ndCloseTo(a,a0, 1e-8);
    assert.ndCloseTo(b,a0, 1e-8);
  });

  it('cpsc',function() {
    blas1.cpsc(2,a,b);
    assert.ndCloseTo(a,a0, 1e-8);
    assert.ndCloseTo(b, ndarray([2,4,6,8]), 1e-8);
  });

  it('axpy',function() {
    blas1.axpy(2, a, b);
    assert.ndCloseTo( b, ndarray([4, 5, 10, 11]), 1e-8 );
  });

  it('dot',function() {
    assert.closeTo( blas1.dot(a,b), 1*2 + 2*1 + 3*4 + 4*3, 1e-8 );
  });

  it('dot (with identical input simplification)',function() {
    assert.closeTo( blas1.dot(a,a), 1*1 + 2*2 + 3*3 + 4*4, 1e-8 );
  });

  it('nrm2',function() {
    assert.closeTo( blas1.nrm2(a), Math.sqrt(1*1+2*2+3*3+4*4), 1e-8);
  });

  it('asum',function() {
    assert.closeTo( blas1.asum(a), 1 + 2 + 3 + 4, 1e-8 );
  });

  it('iamax',function() {
    assert.deepEqual( blas1.iamax(a), [3] );
    assert.deepEqual( blas1.iamax(b), [2] );
  });




});

