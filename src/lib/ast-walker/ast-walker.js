/**
 * Описание
 */

function astWalk (ast, cb) {
    walk(ast, null, cb)
}

function astWalkWithParent (ast, cb) {
    walk(ast, null, function (node, parent) {
      node.parent = parent
      return cb(node)
    })
}

function walk (node, parent, cb) {
  let cont = cb !== undefined ? cb(node, parent) : undefined
  if (cont === false) return

  for (let k in node) {
    if (has(node, k)) {
      if (k === 'parent') continue
      if (isNode(node[k])) {
        walk(node[k], node, cb)
      } else if (Array.isArray(node[k])) {
        walkArray(node[k], node, cb)
      }
    }
  }
}

function walkArray (nodes, parent, cb) {
  for (let i = 0; i < nodes.length; i++) {
    if (isNode(nodes[i])) {
        walk(nodes[i], parent, cb)
    }
  }
}

function isNode (node) {
  return typeof node === 'object' && node && typeof node.type === 'string'
}

function has (obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop)
}

function getNodeByPropertyValue(ast, propertyKey, propertyValue) {
    let nodes = [];

    astWalkWithParent(ast, node => {
        if (node.type === "Property" && node.key.value === propertyKey && node.value.value === propertyValue) {
            nodes.push(node.parent);
        }
    });

    if (nodes.length > 0) {
        return nodes;
    }
}

function getPropertyValue(ast, property) {
    let value;

    if (ast) {
        astWalk(ast, node => {
            if (node.type === "Property" && node.key.type === "Identifier" && node.key.value === property) {
                if (node.value.type === "Literal") {
                    value = node.value.value;
                } else {
                    value = node.value;
                }
            }
        });
    }

    return value;
}

function getBlockName(ast) {
    let blockName;

    if (ast) {
        astWalk(ast, node => {
            if (node.type === "Property" && node.key.value === "block") {
                blockName = node.value.value;
            }
        });
    }

    return blockName;
}

export { astWalk, astWalkWithParent, getNodeByPropertyValue, getPropertyValue, getBlockName };