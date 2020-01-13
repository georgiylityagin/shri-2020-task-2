import { getNodeByPropertyValue, getPropertyValue } from "../../ast-walker/ast-walker";

export function validateWarningButtonSize(ast) {
    const errorCode = "WARNING.INVALID_BUTTON_SIZE";
    const errorMessage = "Размер кнопки блока warning должен быть на 1 шаг больше эталонного";
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

    let warningBlocks = getNodeByPropertyValue(ast, "block", "warning");

    if (!warningBlocks) {
        return [];
    }

    for (let warningBlock of warningBlocks) {
        let textBlocks = getNodeByPropertyValue(warningBlock, "block", "text");
        // Eсли текстовые блоки отсутствуют, пропускаем этот блок warning
        if (!textBlocks) {
            continue;
        }

        let referenceTextBlock = textBlocks[0];
        let mods = getPropertyValue(referenceTextBlock, "mods");
        let referenceSize = getPropertyValue(mods, "size");
       
        let buttonBlocks = getNodeByPropertyValue(warningBlock, "block", "button");
        
        if (!buttonBlocks) {
            continue;
        }

        for (let buttonBlock of buttonBlocks) {
            let mods = getPropertyValue(buttonBlock, "mods");
            let buttonSize = getPropertyValue(mods, "size");

            if (!buttonSize) {
                continue;
            }

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