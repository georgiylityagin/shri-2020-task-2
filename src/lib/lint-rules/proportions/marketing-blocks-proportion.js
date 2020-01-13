import { getNodeByPropertyValue, getPropertyValue, getBlockName } from "../../ast-walker/ast-walker";

export function validateMarketingProportions(ast) {
    const errorCode = "GRID.TOO_MUCH_MARKETING_BLOCKS";
    const errorMessage = "Маркетинговые блоки должны занимать не больше половины от всех колонок блока grid";
    const foundErrors = [];

    let marketingBlockNames = ["commercial", "offer"];
    let gridBlocks = getNodeByPropertyValue(ast, "block", "grid");

    if (!gridBlocks) {
        return [];
    }

    for (let gridBlock of gridBlocks) {
        let mods = getPropertyValue(gridBlock, "mods");
        let gridColumns = +getPropertyValue(mods, "m-columns");
        let gridFractions = getNodeByPropertyValue(gridBlock, "elem", "fraction");

        if (!gridColumns || !gridFractions) {
            continue;
        }

        let marketingColumns = 0;
        let maxMarketingColumns = gridColumns / 2;

        for (let gridFraction of gridFractions) {
            let elemMods = getPropertyValue(gridFraction, "elemMods");
            let elemFractionColumns = +getPropertyValue(elemMods, "m-col");
            
            let content = getPropertyValue(gridFraction, "content");
            let blockName = getBlockName(content);
            
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