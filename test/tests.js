describe("Тесты блока Warning", function() {

    describe("Тесты правила, проверяющего размеры текстовых блоков", function() {
        makeTests(sameSizeInputs);
    });

    describe("Тесты правила, проверяющего размер кнопки", function() {
        makeTests(buttonSizeInputs);
    });

    describe("Тесты правила, проверяющего положение кнопки относительно блока placeholder", function() {
        makeTests(buttonPozitionInputs);
    });

    describe("Тесты правила, проверяющего размер блока placeholder", function() {
        makeTests(placeholderSizeInputs);
    });

});

describe("Тесты заголовков на странице", function() {

    describe("Тесты правила, проверяющего единственность заголовка первого уровня", function() {
        makeTests(singleH1Inputs);
    });

    describe("Тесты правила, проверяющего положение заголовков h2 относительно h1", function() {
        makeTests(H2PositionInputs);
    });

    describe("Тесты правила, проверяющего положение заголовков h3 относительно h2", function() {
        makeTests(H3PositionInputs);
    });

});

describe("Тесты пропорций рекламных блоков", function() {

    makeTests(proportionInputs);

});

describe("Тесты корректности пути к ошибке", function() {

    describe("", function() {

    });

});


function makeTests(inputs) {
    for (let input of inputs) {
        let lintResult = lint(input.json);
        let errorCodes = [];

        for (let error of lintResult) {
            errorCodes.push(error.code);
        }

        if (errorCodes.length === 0) {
            errorCodes = "[]";
        }

        it(`${input.description} \n json: ${input.json} \n Коды ошибок линтера: ${errorCodes.toString()} \n Правильный ответ: ${input.answer.toString()}\n`, function() {
            chai.assert.equal(errorCodes.toString(), input.answer.toString());
        });
    }
}



window.onload = () => {
    let parentElems = document.querySelectorAll(".suite");
    let counter = 0;

    parentElems.forEach(parentElem => {

        let header = parentElem.querySelector("h1").querySelector("a");
        let results = parentElem.querySelector("ul");

        header.setAttribute("data-toggle", "collapse");
        header.setAttribute("href", `#collapse_${counter}`);

        results.setAttribute("id", `collapse_${counter}`)
        results.setAttribute("class", "collapse")

        counter++;
    })
}