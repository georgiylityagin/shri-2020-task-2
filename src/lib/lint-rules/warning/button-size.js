import { getNodesWithProperty, getPropertyValue, excludeNestedWarning } from '../../ast-handler/ast-handler';

export function validateWarningButtonSize (ast) {
  const errorCode = 'WARNING.INVALID_BUTTON_SIZE';
  const errorMessage = 'Размер кнопки блока warning должен быть на 1 шаг больше эталонного';
  const foundErrors = [];

  const textSizesScale = {
    xxxs: 0,
    xxs: 1,
    xs: 2,
    s: 3,
    m: 4,
    l: 5,
    xl: 6,
    xxl: 7,
    xxxl: 8,
    xxxxl: 9,
    xxxxxl: 10
  };

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

    const referenceTextBlock = textBlocks[0];
    const mods = getPropertyValue(referenceTextBlock, 'mods');
    const referenceSize = getPropertyValue(mods, 'size');

    let buttonBlocks = getNodesWithProperty(warningBlock, 'block', 'button');
    buttonBlocks = excludeNestedWarning(buttonBlocks, warningBlock);

    if (!buttonBlocks || buttonBlocks.length === 0) {
      continue;
    }

    for (const buttonBlock of buttonBlocks) {
      const mods = getPropertyValue(buttonBlock, 'mods');
      const buttonSize = getPropertyValue(mods, 'size');

      if (textSizesScale[buttonSize] - textSizesScale[referenceSize] !== 1) {
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
};
