const sameSizeInputs = [
  {
    description: 'Тест 1: двум блокам text заданы одинаковые размеры',
    json: `{
            "block": "warning",
            "content": [
                { "block": "text", "mods": { "size": "l" } },
                { "block": "text", "mods": { "size": "l" } }
            ]
        }`,
    answer: '[]'
  },

  {
    description: 'Тест 2: двум блокам text заданы разные размеры',
    json: `{
            "block": "warning",
            "content": [
                { "block": "text", "mods": { "size": "l" } },
                { "block": "text", "mods": { "size": "m" } }
            ]
        }`,
    answer: [
      'WARNING.TEXT_SIZES_SHOULD_BE_EQUAL'
    ]
  },

  {
    description: 'Тест 3:  нескольким блокам text заданы разные размеры',
    json: `{
            "block": "warning",
            "content": [
                { "block": "text", "mods": { "size": "s" } },
                { "block": "text", "mods": { "size": "m" } },
                { "block": "text", "mods": { "size": "l" } },
                { "block": "text", "mods": { "size": "xl" } }
            ]
        }`,
    answer: [
      'WARNING.TEXT_SIZES_SHOULD_BE_EQUAL'
    ]
  },

  {
    description: 'Тест 4: наличие блока text с отсутствующим модификатором size',
    json: `{
            "block": "warning",
            "content": [
                { "block": "text", "mods": {  } },
                { "block": "text", "mods": { "size": "xl" } }
            ]
        }`,
    answer: [
      'WARNING.TEXT_SIZES_SHOULD_BE_EQUAL'
    ]
  },

  {
    description: 'Тест 5: проверка на вложенных блоках',
    json: `{
            "block": "warning",
            "content": [
                { "block": "text", "mods": { "size": "l" } },
                { "block": "text", "mods": { "size": "xl" } },
                {
                    "block": "warning__content",
                    "content": [
                        { "block": "text", "mods": { "size": "s" } },
                        { "block": "text", "mods": { "size": "m" } }
                    ]
                }
            ]
        }`,
    answer: [
      'WARNING.TEXT_SIZES_SHOULD_BE_EQUAL'
    ]
  }
];

const buttonSizeInputs = [
  {
    description: 'Тест 1: размер кнопки больше эталона на 1',
    json: `{
            "block": "warning",
            "content": [
                { "block": "text", "mods": { "size": "l" } },
                { "block": "button", "mods": { "size": "xl" } }
            ]
        }`,
    answer: '[]'
  },

  {
    description: 'Тест 2: эталон отсутствует',
    json: `{
            "block": "warning",
            "content": [
                { "block": "button", "mods": { "size": "xl" } }
            ]
        }`,
    answer: '[]'
  },

  {
    description: 'Тест 3: размер кнопки равен эталону',
    json: `{
            "block": "warning",
            "content": [
                { "block": "text", "mods": { "size": "l" } },
                { "block": "button", "mods": { "size": "l" } }
            ]
        }`,
    answer: [
      'WARNING.INVALID_BUTTON_SIZE'
    ]
  },

  {
    description: 'Тест 4: две кнопки с неправильным размером',
    json: `{
            "block": "warning",
            "content": [
                { "block": "text", "mods": { "size": "l" } },
                { "block": "button", "mods": { "size": "m" } },
                { "block": "button", "mods": { "size": "s" } }
            ]
        }`,
    answer: [
      'WARNING.INVALID_BUTTON_SIZE',
      'WARNING.INVALID_BUTTON_SIZE'
    ]
  },

  {
    description: 'Тест 5: кнопка с неуказанным размером',
    json: `{
            "block": "warning",
            "content": [
                { "block": "text", "mods": { "size": "l" } },
                { "block": "button", "mods": { } }
            ]
        }`,
    answer: [
      'WARNING.INVALID_BUTTON_SIZE'
    ]
  },

  {
    description: 'Тест 6: проверка на вложенных блоках',
    json: `{
            "block": "warning",
            "content": [
                { "block": "text", "mods": { "size": "l" } },
                { "block": "button", "mods": { "size": "s" } },
                {
                    "block": "warning__content",
                    "content": [
                        { "block": "text", "mods": { "size": "l" } },
                        { "block": "button", "mods": { "size": "m" } }
                    ]
                }
            ]
        }`,
    answer: [
      'WARNING.INVALID_BUTTON_SIZE',
      'WARNING.INVALID_BUTTON_SIZE'
    ]
  }

];

const buttonPozitionInputs = [
  {
    description: 'Тест 1: кнопка находится после блока placeholder',
    json: `{
            "block": "warning",
            "content": [
                { "block": "placeholder", "mods": { "size": "m" } },
                { "block": "button", "mods": { "size": "m" } }
            ]
        }`,
    answer: '[]'
  },

  {
    description: 'Тест 2: кнопка находится после блока placeholder на той же строке',
    json: `{
            "block": "warning",
            "content": [
                { "block": "placeholder", "mods": { "size": "m" } }, { "block": "button", "mods": { "size": "m" } }
            ]
        }`,
    answer: '[]'
  },

  {
    description: 'Тест 3: кнопка находится перед блоком placeholder',
    json: `{
            "block": "warning",
            "content": [
                { "block": "button", "mods": { "size": "m" } },
                { "block": "placeholder", "mods": { "size": "m" } }
            ]
        }`,
    answer: [
      'WARNING.INVALID_BUTTON_POSITION'
    ]
  },

  {
    description: 'Тест 4: кнопка находится перед блоком placeholder на той же строке',
    json: `{
            "block": "warning",
            "content": [
                { "block": "button", "mods": { "size": "m" } }, { "block": "placeholder", "mods": { "size": "m" } }
            ]
        }`,
    answer: [
      'WARNING.INVALID_BUTTON_POSITION'
    ]
  },

  {
    description: 'Тест 5: нескольно кнопок находятся перед блоком placeholder',
    json: `{
            "block": "warning",
            "content": [
                { "block": "button", "mods": { "size": "m" } },
                { "block": "button", "mods": { "size": "m" } },
                { "block": "placeholder", "mods": { "size": "m" } },
                { "block": "button", "mods": { "size": "m" } },
                { "block": "placeholder", "mods": { "size": "m" } },
                { "block": "button", "mods": { "size": "m" } }
            ]
        }`,
    answer: [
      'WARNING.INVALID_BUTTON_POSITION',
      'WARNING.INVALID_BUTTON_POSITION',
      'WARNING.INVALID_BUTTON_POSITION'
    ]
  },

  {
    description: 'Тест 6: проверка на вложенных блоках',
    json: `{
            "block": "warning",
            "content": [
                { "block": "button", "mods": { "size": "m" } },
                { "block": "placeholder", "mods": { "size": "m" } },
                {
                    "block": "warning__content",
                    "content": [
                        { "block": "text", "mods": { "size": "s" } },
                        { "block": "button", "mods": { "size": "m" } },
                        { "block": "placeholder", "mods": { "size": "m" } }
                    ]
                }
            ]
        }`,
    answer: [
      'WARNING.INVALID_BUTTON_POSITION',
      'WARNING.INVALID_BUTTON_POSITION'
    ]
  }
];

const placeholderSizeInputs = [
  {
    description: 'Тест 1: правильные размеры блока placeholder',
    json: `{
            "block": "warning",
            "content": [
                { "block": "placeholder", "mods": { "size": "s" } },
                { "block": "placeholder", "mods": { "size": "m" } },
                { "block": "placeholder", "mods": { "size": "l" } }
            ]
        }`,
    answer: '[]'
  },

  {
    description: 'Тест 2: неправильный размеры блока placeholder',
    json: `{
            "block": "warning",
            "content": [
                { "block": "placeholder", "mods": { "size": "xs" } }
            ]
        }`,
    answer: [
      'WARNING.INVALID_PLACEHOLDER_SIZE'
    ]
  },

  {
    description: 'Тест 3: неправильный размер блока placeholder',
    json: `{
            "block": "warning",
            "content": [
                { "block": "placeholder", "mods": { "size": "xl" } }
            ]
        }`,
    answer: [
      'WARNING.INVALID_PLACEHOLDER_SIZE'
    ]
  },
  {
    description: 'Тест 4: неправильный размер блока placeholder',
    json: `{
            "block": "warning",
            "content": [
                { "block": "placeholder", "mods": { "size": "very_big" } }
            ]
        }`,
    answer: [
      'WARNING.INVALID_PLACEHOLDER_SIZE'
    ]
  },

  {
    description: 'Тест 4: размер не указан',
    json: `{
            "block": "warning",
            "content": [
                { "block": "placeholder", "mods": {  } }
            ]
        }`,
    answer: [
      'WARNING.INVALID_PLACEHOLDER_SIZE'
    ]
  }
];

const AllWarningRulesInput = [
  {
    description: 'Тест 1',
    json: `{
            "block": "warning",
            "content": [
                { 
                    "block": "text", 
                    "mods": { "size": "m" } 
                },
                {
                    "elem": "content",
                    "content": [
                        {
                            "block": "placeholder",
                            "mods": { "size": "l" }
                        },
                        {
                            "block": "text",
                            "mods": { "size": "m" }
                        },
                        {
                            "block": "button",
                            "mods": { "size": "l" }
                        },
                        {
                            "block": "text",
                            "mods": { "size": "m" }
                        }
                    ]
                }
            ]
        }`,
    answer: '[]'
  },

  {
    description: 'Тест 2',
    json: `{
            "block": "warning",
            "content": [
                { 
                    "block": "text", 
                    "mods": { "size": "l" } 
                },
                {
                    "elem": "content",
                    "content": [
                        {
                            "block": "text",
                            "mods": { "size": "xl" }
                        },
                        {
                            "block": "text",
                            "mods": { "size": "m" }
                        },
                        {
                            "block": "button",
                            "mods": { "size": "s" }
                        },
                        {
                            "block": "placeholder",
                            "mods": { "size": "m" }
                        }
                    ]
                }
            ]
        }`,
    answer: [
      'WARNING.TEXT_SIZES_SHOULD_BE_EQUAL',
      'WARNING.INVALID_BUTTON_SIZE',
      'WARNING.INVALID_BUTTON_POSITION'
    ]
  },

  {
    description: 'Тест 3',
    json: `{
            "block": "warning",
            "content": [
                { 
                    "block": "text", 
                    "mods": { "size": "l" } 
                },
                {
                    "block": "placeholder",
                    "mods": { "size": "xl" }
                },
                {
                    "elem": "content",
                    "content": [
                        {
                            "block": "text",
                            "mods": { "size": "xl" }
                        },
                        {
                            "block": "button",
                            "mods": { "size": "m" }
                        },
                        {
                            "block": "button",
                            "mods": { "size": "s" }
                        },
                        {
                            "block": "placeholder",
                            "mods": { "size": "m" }
                        }
                    ]
                }
            ]
        }`,
    answer: [
      'WARNING.TEXT_SIZES_SHOULD_BE_EQUAL',
      'WARNING.INVALID_BUTTON_SIZE',
      'WARNING.INVALID_BUTTON_SIZE',
      'WARNING.INVALID_BUTTON_POSITION',
      'WARNING.INVALID_BUTTON_POSITION',
      'WARNING.INVALID_PLACEHOLDER_SIZE'
    ]
  }
];
