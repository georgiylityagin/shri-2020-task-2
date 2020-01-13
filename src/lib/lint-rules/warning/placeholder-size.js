import { getNodeByPropertyValue, getPropertyValue } from "../../ast-walker/ast-walker";

export function validateWarningPlaceholderSize(ast) {
    const errorCode = "WARNING.INVALID_PLACEHOLDER_SIZE";
    const errorMessage = "Допустимые размеры для блока placeholder в блоке warning (значение модификатора size): s, m, l";
    const foundErrors = [];

    let warningBlocks = getNodeByPropertyValue(ast, "block", "warning");

    if (!warningBlocks) {
        return [];
    }

    for (let warningBlock of warningBlocks) {
        let placeholderBlocks = getNodeByPropertyValue(warningBlock, "block", "placeholder");

        if (!placeholderBlocks) {
            continue;
        }

        for (let placeholderBlock of placeholderBlocks) {
            let mods = getPropertyValue(placeholderBlock, "mods");
            let placeholderSize = getPropertyValue(mods, "size");

    
            if (!["s", "m", "l"].includes(placeholderSize)) {
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