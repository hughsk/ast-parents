module.exports = addParents

function addParents(ast, key) {
  walk(ast, key || 'parent')
  return ast
}

function walk(node, key, parent) {
  if (parent) Object.defineProperty(node, key, {
      value: parent
    , configurable: true
    , enumerable: false
    , writable: true
  })

  for (var key in node) {
    if (key === 'parent') continue
    if (!node.hasOwnProperty(key)) continue

    var child = node[key]
    if (Array.isArray(child)) {
      var l = child.length

      for (var i = 0; i < l; i++) {
        if (child[i] && child[i].type)
          walk(child[i], key, child)
      }
    } else
    if (child && child.type) {
      walk(child, key, node)
    }
  }
}
