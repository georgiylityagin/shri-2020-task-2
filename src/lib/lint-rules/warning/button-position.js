import { getNodeByPropertyValue } from "../../ast-walker/ast-walker";

export function validateWarningButtonPosition(ast) {
    const errorCode = "WARNING.INVALID_BUTTON_POSITION";
    const errorMessage = "Блок button в блоке warning не может находиться перед блоком placeholder на том же или более глубоком уровне вложенности.";
    const foundErrors = [];

    let warningBlocks = getNodeByPropertyValue(ast, "block", "warning");

    if (!warningBlocks) {
        return [];
    }

    for (let warningBlock of warningBlocks) {
        let placeholderBlocks = getNodeByPropertyValue(warningBlock, "block", "placeholder");
        let buttonBlocks = getNodeByPropertyValue(warningBlock, "block", "button");

        if (!placeholderBlocks || !buttonBlocks) {
            continue;
        }

        let lowerPlaceholder = placeholderBlocks[placeholderBlocks.length - 1];

        for (let buttonBlock of buttonBlocks) {
            let buttonTopBound = buttonBlock.loc.start.line;
            let buttonLeftBound = buttonBlock.loc.start.column;
    
            let placeholderBottomBound = lowerPlaceholder.loc.end.line;
            let placeholderRightBound = lowerPlaceholder.loc.end.column;
    
            // Проверка
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