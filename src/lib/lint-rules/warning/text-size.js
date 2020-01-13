import { getNodeByPropertyValue, getPropertyValue } from "../../ast-walker/ast-walker";

export function validateWarningTextSizes(ast) {
    const errorCode = "WARNING.TEXT_SIZES_SHOULD_BE_EQUAL";
    const errorMessage = "Тексты в блоке warning должны быть одного размера";
    const foundErrors = [];

    let warningBlocks = getNodeByPropertyValue(ast, "block", "warning");

    if (!warningBlocks) {
        return [];
    }

    for (let warningBlock of warningBlocks) {
        let textBlocks = getNodeByPropertyValue(warningBlock, "block", "text");

        if (!textBlocks) {
            continue;
        }
        
        let textSizes = [];

        for (let textBlock of textBlocks) {
            let mods = getPropertyValue(textBlock, "mods");
            let textSize = getPropertyValue(mods, "size");
    
            if (textSize) {
                textSizes.push(textSize);
            } else {
                // Перепроверить. Может получиться слишком много ошибок. Возможно надо поставить break
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

                break;
            }
        }

        let referenceSize = textSizes[0];
        if (textSizes.some(item => item !== referenceSize)) {
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
};