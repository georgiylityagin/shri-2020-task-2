import { getNodeByPropertyValue, getPropertyValue } from "../../ast-walker/ast-walker";

export function validateNumOfH1(ast) {
    const errorCode = "TEXT.SEVERAL_H1";
    const errorMessage = "Заголовок первого уровня должен быть единственным на странице";
    const foundErrors = [];

    let textBlocks = getNodeByPropertyValue(ast, "block", "text");
 
    if (!textBlocks) {
        return [];
    }

    let numOfH1 = 0;

    for (let textBlock of textBlocks) {
        let mods = getPropertyValue(textBlock, "mods");
        let headerType = getPropertyValue(mods, "type");

        if (headerType === "h1") {
            if (numOfH1 > 0) {
                foundErrors.push({
                    code: errorCode,
                    error: errorMessage,
                    location: {
                        start: {
                            column: textBlock.loc.start.column,
                            line: textBlock.loc.start.line
                        },
                        end: {
                            column: textBlock.loc.end.column,
                            line: textBlock.loc.end.line
                        }
                    }
                });
            }

            numOfH1++;
        }
    }
    
    return foundErrors;
}