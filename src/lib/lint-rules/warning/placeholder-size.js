import { getNodesWithProperty, getPropertyValue, excludeNestedWarning } from '../../ast-handler/ast-handler';

export function validateWarningPlaceholderSize (ast) {
  const errorCode = 'WARNING.INVALID_PLACEHOLDER_SIZE';
  const errorMessage = 'Допустимые размеры для блока placeholder в блоке warning (значение модификатора size): s, m, l';
  const foundErrors = [];

  const warningBlocks = getNodesWithProperty(ast, 'block', 'warning');

  if (!warningBlocks) {
    return [];
  }

  for (const warningBlock of warningBlocks) {
    let placeholderBlocks = getNodesWithProperty(warningBlock, 'block', 'placeholder');
    placeholderBlocks = excludeNestedWarning(placeholderBlocks, warningBlock);

    if (!placeholderBlocks || placeholderBlocks.length === 0) {
      continue;
    }

    for (const placeholderBlock of placeholderBlocks) {
      const mods = getPropertyValue(placeholderBlock, 'mods');
      const placeholderSize = getPropertyValue(mods, 'size');

      if (!['s', 'm', 'l'].includes(placeholderSize)) {
        foundErrors.push({
          code: errorCode,
          error: errorMessage,
          location: {
            start: {
              column: placeholderBlock.loc.start.column,
              line: placeholderBlock.loc.start.line
            },
            end: {
              column: placeholderBlock.loc.end.column,
              line: placeholderBlock.loc.end.line
            }
          }
        });
      }
    }
  }

  return foundErrors;
}
