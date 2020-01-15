function astWalk (ast, cb) {
  walk(ast, null, cb);
}

function astWalkWithParent (ast, cb) {
  walk(ast, null, function (node, parent) {
    node.parent = parent;
    return cb(node);
  });
}

function walk (node, parent, cb) {
  const cont = cb !== undefined ? cb(node, parent) : undefined;
  if (cont === false) return;

  for (const k in node) {
    if (has(node, k)) {
      if (k === 'parent') continue;
      if (isNode(node[k])) {
        walk(node[k], node, cb);
      } else if (Array.isArray(node[k])) {
        walkArray(node[k], node, cb);
      }
    }
  }
}

function walkArray (nodes, parent, cb) {
  for (let i = 0; i < nodes.length; i++) {
    if (isNode(nodes[i])) {
      walk(nodes[i], parent, cb);
    }
  }
}

function isNode (node) {
  return typeof node === 'object' && node && typeof node.type === 'string';
}

function has (obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

export { astWalk, astWalkWithParent };
