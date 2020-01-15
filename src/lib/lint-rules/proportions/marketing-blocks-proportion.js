import { getNodesWithProperty, getPropertyValue, getBlockName } from '../../ast-handler/ast-handler';

export function validateMarketingProportions (ast) {
  const errorCode = 'GRID.TOO_MUCH_MARKETING_BLOCKS';
  const errorMessage = 'Маркетинговые блоки должны занимать не больше половины от всех колонок блока grid';
  const foundErrors = [];

  const marketingBlockNames = ['commercial', 'offer'];
  const gridBlocks = getNodesWithProperty(ast, 'block', 'grid');

  if (!gridBlocks) {
    return [];
  }

  for (const gridBlock of gridBlocks) {
    const mods = getPropertyValue(gridBlock, 'mods');
    const gridColumns = +getPropertyValue(mods, 'm-columns');
    const gridFractions = getNodesWithProperty(gridBlock, 'elem', 'fraction');

    if (!gridColumns || !gridFractions) {
      continue;
    }

    let marketingColumns = 0;
    const maxMarketingColumns = gridColumns / 2;

    for (const gridFraction of gridFractions) {
      const elemMods = getPropertyValue(gridFraction, 'elemMods');
      const elemFractionColumns = +getPropertyValue(elemMods, 'm-col');

      const content = getPropertyValue(gridFraction, 'content');
      const blockName = getBlockName(content);

      if (marketingBlockNames.includes(blockName)) {
        marketingColumns += elemFractionColumns;
      }
    }

    if (marketingColumns > maxMarketingColumns) {
      foundErrors.push({
        code: errorCode,
        error: errorMessage,
        location: {
          start: {
            column: gridBlock.loc.start.column,
            line: gridBlock.loc.start.line
          },
          end: {
            column: gridBlock.loc.end.column,
            line: gridBlock.loc.end.line
          }
        }
      });
    }
  }

  return foundErrors;
}
