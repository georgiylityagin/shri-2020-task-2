import { astWalk, astWalkWithParent } from './ast-walker/simple-ast-walker';

function getNodesWithProperty (ast, propertyKey, propertyValue) {
  const nodes = [];

  astWalkWithParent(ast, node => {
    if (node.type === 'Property' && node.key.value === propertyKey && node.value.value === propertyValue) {
      nodes.push(node.parent);
    }
  });

  if (nodes.length > 0) {
    return nodes;
  }
}

function getPropertyValue (ast, property) {
  const value = [];

  if (ast) {
    astWalk(ast, node => {
      if (node.type === 'Property' && node.key.type === 'Identifier' && node.key.value === property) {
        if (node.value.type === 'Literal') {
          value.push(node.value.value);
        } else {
          value.push(node.value);
        }
      }
    });
  }

  if (value.length === 0) {
    return;
  }

  return value[0];
}

function getBlockName (ast) {
  let blockName;

  if (ast) {
    astWalk(ast, node => {
      if (node.type === 'Property' && node.key.value === 'block') {
        blockName = node.value.value;
      }
    });
  }

  return blockName;
}

function excludeNestedWarning (blocksArray, warningBlock) {
  if (blocksArray) {
    for (let i = 0; i < blocksArray.length; i++) {
      if (isInNestedWarningBlock(blocksArray[i], warningBlock)) {
        blocksArray.splice(i, 1);
        i--;
      }
    }
  }

  return blocksArray;
}

function isInNestedWarningBlock (checkingBlock, warningBlock) {
  const warningBlockContent = getPropertyValue(warningBlock, 'content');
  const nestedWarningBlocks = getNodesWithProperty(warningBlockContent, 'block', 'warning');

  const blockTopBorder = checkingBlock.loc.start.line;
  const blockBottomBorder = checkingBlock.loc.end.line;
  const blockLeftBorder = checkingBlock.loc.start.column;
  const blockRightBorder = checkingBlock.loc.end.column;

  let result = false;

  if (nestedWarningBlocks) {
    nestedWarningBlocks.forEach(nestedBlock => {
      const nestedTopBorder = nestedBlock.loc.start.line;
      const nestedBottomBorder = nestedBlock.loc.end.line;
      const nestedLeftBorder = nestedBlock.loc.start.column;
      const nestedRightBorder = nestedBlock.loc.end.column;

      const isInNestedBlock = (blockTopBorder > nestedTopBorder && blockBottomBorder < nestedBottomBorder) ||
                        ((blockTopBorder === nestedTopBorder && blockBottomBorder === nestedBottomBorder) &&
                        (blockLeftBorder > nestedLeftBorder && blockRightBorder < nestedRightBorder));

      if (isInNestedBlock) {
        result = true;
      }
    });
  }

  return result;
}

export { getNodesWithProperty, getPropertyValue, getBlockName, excludeNestedWarning };
