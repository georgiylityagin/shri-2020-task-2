import { validateWarningTextSizes } from './lib/lint-rules/warning/text-size';
import { validateWarningButtonSize } from './lib/lint-rules/warning/button-size';
import { validateWarningButtonPosition } from './lib/lint-rules/warning/button-position';
import { validateWarningPlaceholderSize } from './lib/lint-rules/warning/placeholder-size';
import { validateNumOfH1 } from './lib/lint-rules/headers/number-of-h1';
import { validatePositionOfH2 } from './lib/lint-rules/headers/position-of-h2';
import { validatePositionOfH3 } from './lib/lint-rules/headers/position-of-h3';
import { validateMarketingProportions } from './lib/lint-rules/proportions/marketing-blocks-proportion';

const jsonToAst = require('json-to-ast');

function lint (json) {
  const astTree = jsonToAst(json);
  const errors = [];

  const linterRuleList = [
    validateWarningTextSizes,
    validateWarningButtonSize,
    validateWarningButtonPosition,
    validateWarningPlaceholderSize,
    validateNumOfH1,
    validatePositionOfH2,
    validatePositionOfH3,
    validateMarketingProportions
  ];

  if (astTree) {
    linterRuleList.forEach(linterRule => {
      errors.push(...linterRule(astTree));
    });
  }

  return errors;
}

var root = (typeof window === 'object' && window.window === window && window) ||
            (typeof global === 'object' && global.global === global && global);

root.lint = lint;
