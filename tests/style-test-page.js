window.onload = () => {
  const mainTestBlocks = document.querySelector('#mocha-report').childNodes;
  let counter = 0;

  mainTestBlocks.forEach(mainTestBlock => {
    const testBlocks = mainTestBlock.querySelectorAll('.suite');

    testBlocks.forEach(testBlock => {
      const testHeader = testBlock.querySelector('h1').querySelector('a');
      const testResults = testBlock.querySelector('ul');

      testHeader.setAttribute('data-toggle', 'collapse');
      testHeader.setAttribute('href', `#collapse_${counter}`);

      testResults.setAttribute('id', `collapse_${counter}`);
      testResults.setAttribute('class', 'collapse');

      counter++;

      const numOfFailed = testBlock.querySelectorAll('.fail').length;
      const numOfPassed = testBlock.querySelectorAll('.pass').length;
      const numOfTests = numOfFailed + numOfPassed;

      testHeader.innerHTML += ` (${numOfPassed} / ${numOfTests})`;

      if (numOfFailed > 0) {
        testHeader.style.color = 'var(--danger)';
      } else {
        testHeader.style.color = 'var(--success)';
      }
    });

    const numOfFailed = mainTestBlock.querySelectorAll('.fail').length;
    const numOfPassed = mainTestBlock.querySelectorAll('.pass').length;
    const numOfTests = numOfFailed + numOfPassed;

    const mainTestHeader = mainTestBlock.querySelector('h1').querySelector('a');
    mainTestHeader.setAttribute('href', '#');
    mainTestHeader.innerHTML += ` (${numOfPassed} / ${numOfTests})`;

    if (numOfFailed > 0) {
      mainTestHeader.style.color = 'var(--danger)';
    } else {
      mainTestHeader.style.color = 'var(--success)';
    }
  });

  /*  Чтобы избежать неприятного "дергающегося" эффекта при применении стилей,
        контейнеру с результатами тестов был добавлен класс collapse из bootstrap, который
        убирается после применения всех стилей
    */
  const mocha = document.getElementById('mocha');
  mocha.classList = '';
};
