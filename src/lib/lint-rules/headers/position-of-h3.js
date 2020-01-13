import { getNodeByPropertyValue, getPropertyValue } from "../../ast-walker/ast-walker";

export function validatePositionOfH3(ast) {
    const errorCode = "TEXT.INVALID_H3_POSITION";
    const errorMessage = "Заголовок третьего уровня не может находиться перед заголовком второго уровня";
    const foundErrors = [];

    let textBlocks = getNodeByPropertyValue(ast, "block", "text");

    if (!textBlocks) {
        return [];
    }

    let h2Blocks = [];
    let h3Blocks = [];

    for (let textBlock of textBlocks) {
        let mods = getPropertyValue(textBlock, "mods");
        let headerType = getPropertyValue(mods, "type");

        switch(headerType) {
            case "h2":
                h2Blocks.push(textBlock);
                break;
            case "h3":
                h3Blocks.push(textBlock);
                break
        }
    }

    if (h2Blocks.length === 0 || h3Blocks.length === 0) {
        return [];
    }

    let lowerH2 = h2Blocks[h2Blocks.length - 1];

    h3Blocks.forEach(h3 => {
        let h3TopBound = h3.loc.start.line;
        let h3LeftBound = h3.loc.start.column;

        let h2BottomBound = lowerH2.loc.end.line;
        let h2RightBound = lowerH2.loc.end.column;

        if (h2BottomBound > h3TopBound ||
            (h2BottomBound === h3TopBound && h2RightBound > h3LeftBound)) {
            foundErrors.push({
                code: errorCode,
                error: errorMessage,
                location: {
                    start: {
                        column: h3.loc.start.column,
                        line: h3.loc.start.line
                    },
                    end: {
                        column: h3.loc.end.column,
                        line: h3.loc.end.line
                    }
                }
            });
        }
    });

    return foundErrors;
}