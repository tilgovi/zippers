function children(object) {
  return (typeof object == 'object' && object) ? (
    Array.isArray(object) ? object.slice() : Object.keys(object).map(
      function (key) {
        return object[key]
      })
  ) : undefined
}

function toZipper(object) {
  return {
    lefts : [],
    focus : object,
    rights : []
  }
}

function fromZipper(zipper) {
  var parents = zipper && up(zipper);
  return parents ? fromZipper(parents) : zipper;
}


function up(zipper) {
  return zipper.parent
}

function down(zipper) {
  var cs = children(zipper.focus);
  return (cs && cs.length) ? {
    parent : zipper,
    lefts : [],
    focus : cs[0],
    rights : cs.slice(1)
  } : undefined
}

function left(zipper) {
  return (zipper && zipper.lefts) ?
    Object.defineProperties(zipper, {
      lefts : {
        get : Array.prototype.slice.bind(zipper.lefts, 0, -1),
        configurable : true,
        enumerable : true
      },
      focus : {
        value : zipper.lefts.slice(-1)[0],
        configurable : true,
        enumerable : true
      },
      rights : {
        get : Array.prototype.concat.bind([zipper.focus], zipper.rights),
        configurable : true,
        enumerable : true
      }
    })
  : undefined
}

function right(zipper) {
  return (zipper && zipper.rights) ?
    Object.defineProperties(zipper, {
      lefts : {
        get : Array.prototype.concat.bind(zipper.lefts, [zipper.focus]),
        configurable : true,
        enumerable : true
      },
      focus : {
        value : zipper.rights[0],
        configurable : true,
        enumerable : true
      },
      rights : {
        get : Array.prototype.slice.bind(zipper.rights, 1),
        configurable : true,
        enumerable : true
      }
    })
  : undefined
}

/*
function direction(first, next) {
  return function (zipper) {
    return (first(zipper) || next(zipper))
  }
}

function fold(zipper, fun, acc, next) {
  if (!zipper) return acc
  next = next || direction(down, direction(
    function (descendent) {
      return right(descendent)
    },
    function (leaf) {
      return next(right(up(leaf)))
    })
  )
  return fold(fold(next(zipper), fun, acc, next)
}*/

exports.toZipper = toZipper
exports.fromZipper = fromZipper
exports.children = children
exports.up = up
exports.down = down
exports.left = left
exports.right = right
//exports.direction = direction
//exports.fold = fold