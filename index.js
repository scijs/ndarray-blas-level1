'use strict';

exports.swap = function(x, y) {
  var dx = x.data, dy = y.data, tmp
  var ox = x.stride[0]
  var oy = y.stride[0]
  var px = x.offset
  var py = y.offset
  for(var i=x.shape[0]-1; i>=0; i--, px+=ox, py+=oy ) {
    tmp = dx[px]
    dx[px] = dy[py]
    dy[py] = tmp
  }
}


exports.scal = function(alpha, x) {
  var dx = x.data
  var ox = x.stride[0]
  var px = x.offset
  for(var i=x.shape[0]-1; i>=0; i--, px+=ox) {
    dx[px] *= alpha
  }
}

exports.copy = function(x, y) {
  var dx = x.data, dy = y.data
  var ox = x.stride[0]
  var oy = y.stride[0]
  var px = x.offset
  var py = y.offset
  for(var i=x.shape[0]-1; i>=0; i--, px+=ox, py+=oy ) {
    dy[py] = dx[px]
  }
}

exports.axpy = function(alpha, x, y) {
  var dx = x.data, dy = y.data
  var ox = x.stride[0]
  var oy = y.stride[0]
  var px = x.offset
  var py = y.offset
  for(var i=x.shape[0]-1; i>=0; i--, px+=ox, py+=oy ) {
    dy[py] += alpha*dx[px]
  }
}

exports.dot = function(x,y) {
  var i, tmp
  var dx = x.data
  var ox = x.stride[0]
  var px = x.offset

  var sum = 0
  if( x===y) {
    for(i=x.shape[0]-1; i>=0; i--, px+=ox ) {
      tmp = dx[px]
      sum += tmp*tmp
    }
  } else {
    var dy = y.data
    var oy = y.stride[0]
    var py = y.offset
    for(i=x.shape[0]-1; i>=0; i--, px+=ox, py+=oy ) {
      sum += dy[py] * dx[px]
    }
  }
  return sum
}


exports.cpsc = function(alpha, x, y) {
  var dx = x.data, dy = y.data
  var ox = x.stride[0]
  var oy = y.stride[0]
  var px = x.offset
  var py = y.offset
  for(var i=x.shape[0]-1; i>=0; i--, px+=ox, py+=oy ) {
    dy[py] = alpha*dx[px]
  }
}

exports.nrm2 = function(x) {
  var i, tmp
  var dx = x.data
  var ox = x.stride[0]
  var px = x.offset
  var sum = 0
  for(i=x.shape[0]-1; i>=0; i--, px+=ox ) {
    tmp = dx[px]
    sum += tmp*tmp
  }
  return Math.sqrt(sum)
}

exports.asum = function(x) {
  var i, tmp
  var dx = x.data
  var ox = x.stride[0]
  var px = x.offset
  var sum = 0
  for(i=x.shape[0]-1; i>=0; i--, px+=ox ) {
    sum += Math.abs(dx[px])
  }
  return sum
}

exports.iamax = function(x) {
  var i, tmp, imax, xmax = -Infinity
  var dx = x.data
  var ox = x.stride[0]
  var px = x.offset
  var sum = 0, l = x.shape[0]
  for(i=0; i<l; i++, px+=ox ) {
    tmp = Math.abs(dx[px])
    if( tmp > xmax ) {
      xmax = tmp
      imax = i
    }
  }
  return imax
}
