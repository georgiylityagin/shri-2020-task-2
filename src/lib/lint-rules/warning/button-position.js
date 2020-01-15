import { getNodesWithProperty } from '../../ast-handler/ast-handler';

export function validateWarningButtonPosition (ast) {
  const errorCode = 'WARNING.INVALID_BUTTON_POSITION';
  const errorMessage = 'Блок button в блоке warning не может находиться перед блоком placeholder на том же или более глубоком уровне вложенности';
  const foundErrors = [];

  const warningBlocks = getNodesWithProperty(ast, 'block', 'warning');

  if (!warningBlocks) {
    return [];
  }

  for (const warningBlock of warningBlocks) {
    const placeholderBlocks = getNodesWithProperty(warningBlock, 'block', 'placeholder');
    const buttonBlocks = getNodesWithProperty(warningBlock, 'block', 'button');

    if (!placeholderBlocks || !buttonBlocks) {
      continue;
    }

    const lowerPlaceholder = placeholderBlocks[placeholderBlocks.length - 1];

    for (const buttonBlock of buttonBlocks) {
      const buttonTopBound = buttonBlock.loc.start.line;
      const buttonLeftBound = buttonBlock.loc.start.column;

      const placeholderBottomBound = lowerPlaceholder.loc.end.line;
      const placeholderRightBound = lowerPlaceholder.loc.end.column;

      if (placeholderBottomBound > buttonTopBound ||
            (placeholderBottomBound === buttonTopBound && placeholderRightBound > buttonLeftBound)) {
        foundErrors.push({
          code: errorCode,
          error: errorMessage,
          location: {
            start: {
              column: buttonBlock.loc.start.column,
              line: buttonBlock.loc.start.line
            },
            end: {
              column: buttonBlock.loc.end.column,
              line: buttonBlock.loc.end.line
            }
          }
        });
      }
    }
  }

  return foundErrors;
}
