import { getNodesWithProperty, getPropertyValue, excludeNestedWarning } from '../../ast-handler/ast-handler';

export function validateWarningTextSizes (ast) {
  const errorCode = 'WARNING.TEXT_SIZES_SHOULD_BE_EQUAL';
  const errorMessage = 'Тексты в блоке warning должны быть одного размера';
  const foundErrors = [];

  const warningBlocks = getNodesWithProperty(ast, 'block', 'warning');

  if (!warningBlocks) {
    return [];
  }

  for (const warningBlock of warningBlocks) {
    let textBlocks = getNodesWithProperty(warningBlock, 'block', 'text');
    textBlocks = excludeNestedWarning(textBlocks, warningBlock);

    if (!textBlocks || textBlocks.length === 0) {
      continue;
    }

    const textSizes = [];

    for (const textBlock of textBlocks) {
      const mods = getPropertyValue(textBlock, 'mods');
      const textSize = getPropertyValue(mods, 'size');

      if (textSize) {
        textSizes.push(textSize);
      }
    }

    if (textSizes.length !== textBlocks.length || textSizes.some(item => item !== textSizes[0])) {
      foundErrors.push({
        code: errorCode,
        error: errorMessage,
        location: {
          start: {
            column: warningBlock.loc.start.column,
            line: warningBlock.loc.start.line
          },
          end: {
            column: warningBlock.loc.end.column,
            line: warningBlock.loc.end.line
          }
        }
      });
    }
  }

  return foundErrors;
}
