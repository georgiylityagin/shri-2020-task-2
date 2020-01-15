import { getNodesWithProperty, getPropertyValue } from '../../ast-handler/ast-handler';

export function validatePositionOfH2 (ast) {
  const errorCode = 'TEXT.INVALID_H2_POSITION';
  const errorMessage = 'Заголовок второго уровня не может находиться перед заголовком первого уровня';
  const foundErrors = [];

  const textBlocks = getNodesWithProperty(ast, 'block', 'text');

  if (!textBlocks) {
    return [];
  }

  const h1Blocks = [];
  const h2Blocks = [];

  for (const textBlock of textBlocks) {
    const mods = getPropertyValue(textBlock, 'mods');
    const headerType = getPropertyValue(mods, 'type');

    switch (headerType) {
      case 'h1':
        h1Blocks.push(textBlock);
        break;
      case 'h2':
        h2Blocks.push(textBlock);
        break;
    }
  }

  if (h2Blocks.length === 0 || h1Blocks.length === 0) {
    return [];
  }

  const lowerH1 = h1Blocks[h1Blocks.length - 1];

  h2Blocks.forEach(h2 => {
    const h2TopBound = h2.loc.start.line;
    const h2LeftBound = h2.loc.start.column;

    const h1BottomBound = lowerH1.loc.end.line;
    const h1RightBound = lowerH1.loc.end.column;

    if (h1BottomBound > h2TopBound ||
            (h1BottomBound === h2TopBound && h1RightBound > h2LeftBound)) {
      foundErrors.push({
        code: errorCode,
        error: errorMessage,
        location: {
          start: {
            column: h2.loc.start.column,
            line: h2.loc.start.line
          },
          end: {
            column: h2.loc.end.column,
            line: h2.loc.end.line
          }
        }
      });
    }
  });

  return foundErrors;
}
