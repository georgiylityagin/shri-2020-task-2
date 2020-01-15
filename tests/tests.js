describe('Тесты блока Warning', function () {
  describe('Тесты для правила, проверяющего размеры текстовых блоков', function () {
    makeTests(sameSizeInputs);
  });

  describe('Тесты для правила, проверяющего размер кнопки', function () {
    makeTests(buttonSizeInputs);
  });

  describe('Тесты для правила, проверяющего положение кнопки относительно блока placeholder', function () {
    makeTests(buttonPozitionInputs);
  });

  describe('Тесты для правила, проверяющего размер блока placeholder', function () {
    makeTests(placeholderSizeInputs);
  });

  describe('Тесты для всех правил блока Warning', function () {
    makeTests(AllWarningRulesInput);
  });
});

describe('Тесты заголовков на странице', function () {
  describe('Тесты для правила, проверяющего единственность заголовка первого уровня', function () {
    makeTests(singleH1Inputs);
  });

  describe('Тесты для правила, проверяющего положение заголовков h2 относительно h1', function () {
    makeTests(H2PositionInputs);
  });

  describe('Тесты для правила, проверяющего положение заголовков h3 относительно h2', function () {
    makeTests(H3PositionInputs);
  });
});

describe('Тесты пропорций функциональных и рекламных блоков', function () {
  describe('Тесты для правила, проверяющего пропорции рекламных блоков', function () {
    makeTests(proportionInputs);
  });
});

describe('Тесты корректного определения местонахождения ошибки', function () {
  describe('Тесты для всех правил', function () {
    makeLocationTests(locationInputs);
  });
});

function makeTests (inputs) {
  for (const input of inputs) {
    const lintResult = lint(input.json);
    let errorCodes = [];

    for (const error of lintResult) {
      errorCodes.push(error.code);
    }

    if (errorCodes.length === 0) {
      errorCodes = '[]';
    }

    it(`${input.description} \n json: ${input.json} \n Коды ошибок линтера: ${errorCodes.toString()} \n Правильный ответ: ${input.answer.toString()}\n`, function () {
      chai.assert.equal(errorCodes.toString(), input.answer.toString());
    });
  }
}

function makeLocationTests (inputs) {
  for (const input of inputs) {
    const lintResult = lint(input.json);
    let errorLocation;

    if (lintResult.length > 0) {
      errorLocation = JSON.stringify(lintResult[0].location);
    }

    it(`${input.description} \n json: ${input.json} \n Коды ошибок линтера: ${errorLocation} \n Правильный ответ: ${JSON.stringify(input.answer)}\n`, function () {
      chai.assert.equal(errorLocation, JSON.stringify(input.answer));
    });
  }
}
