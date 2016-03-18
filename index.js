'use strict';

Math.sign = Math.sign || function(x) {
  x = +x // convert to a number
  if (x === 0 || isNaN(x)) {
    return x
  }
  return (x > 0 ? 1 : -1)
}

module.exports.rotg = function(a, b, csr) {
  // Based on Algorithm 4 from "Discontinuous Plane
  // Rotations and the Symmetric Eigenvalue Problem" 
  // by Anderson, 2000.
  var c = 0, s = 0, r = 0, z = 0, t = 0, u = 0
  if(b === 0) {
    c = Math.sign(a)
    s = 0
    r = Math.abs(a)
  } else if(a === 0) {
    c = 0
    s = Math.sign(b)
    r = Math.abs(b)
  } else if (Math.abs(a) > Math.abs(b)) {
    t = b / a
    u = Math.sign(a) * Math.sqrt(1 + t*t)
    c = 1.0 / u
    s = t * c
    r = a * u
  } else {
    t = a / b
    u = Math.sign(a) * Math.sqrt(1 + t*t)
    s = 1.0 / u
    c = t * s
    r = b * u
  }
  // try to save some unnecessary object creation
  if(csr !== undefined && csr.length > 2) {
    csr[0] = c
    csr[1] = s
    csr[2] = r
  } else {
    return [c,s,r];
  }
}

module.exports.swap = function(x, y) {

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

module.exports.scal = function(alpha, x) {
  var dx = x.data
  var ox = x.stride[0]
  var px = x.offset
  for(var i=x.shape[0]-1; i>=0; i--, px+=ox) {
    dx[px] *= alpha
  }
}

module.exports.copy = function(x, y) {
  var dx = x.data, dy = y.data
  var ox = x.stride[0]
  var oy = y.stride[0]
  var px = x.offset
  var py = y.offset
  for(var i=x.shape[0]-1; i>=0; i--, px+=ox, py+=oy ) {
    dy[py] = dx[px]
  }
}

module.exports.axpy = function(alpha, x, y) {
  var dx = x.data, dy = y.data
  var ox = x.stride[0]
  var oy = y.stride[0]
  var px = x.offset
  var py = y.offset
  for(var i=x.shape[0]-1; i>=0; i--, px+=ox, py+=oy ) {
    dy[py] += alpha*dx[px]
  }
}

module.exports.dot = function(x,y) {
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


module.exports.cpsc = function(alpha, x, y) {
  var dx = x.data, dy = y.data
  var ox = x.stride[0]
  var oy = y.stride[0]
  var px = x.offset
  var py = y.offset
  for(var i=x.shape[0]-1; i>=0; i--, px+=ox, py+=oy ) {
    dy[py] = alpha*dx[px]
  }
}

module.exports.nrm2 = function(x) {
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

module.exports.asum = function(x) {
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

module.exports.iamax = function(x) {
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
