const singleH1Inputs = [
  {
    description: 'Тест 1: Единственный заголовок первого уровня',
    json: `[
            {
                "block": "text",
                "mods": { "type": "h1" }
            },
            {
                "block": "text",
                "mods": { "type": "h2" }
            },
            {
                "block": "text",
                "mods": { "type": "h3" }
            }
        ]`,
    answer: '[]'
  },

  {
    description: 'Тест 2: Два заголовока первого уровня',
    json: `[
            {
                "block": "text",
                "mods": { "type": "h1" }
            },
            {
                "block": "text",
                "mods": { "type": "h1" }
            }
        ]`,
    answer: [
      'TEXT.SEVERAL_H1'
    ]
  },

  {
    description: 'Тест 3: Три заголовока первого уровня',
    json: `[
            {
                "block": "text",
                "mods": { "type": "h1" }
            },
            {
                "block": "text",
                "mods": { "type": "h1" }
            },
            {
                "block": "text",
                "mods": { "type": "h1" }
            }
        ]`,
    answer: [
      'TEXT.SEVERAL_H1',
      'TEXT.SEVERAL_H1'
    ]
  },

  {
    description: 'Тест 4: Три заголовока первого уровня на разных уровнях вложенности',
    json: `{
                "block": "product",
                "content": [
                    { "block": "text", "mods": { "type": "h1" } },
                    {
                        "elem": "product__content",
                        "content": [
                            { "block": "text", "mods": { "type": "h1" } }
                        ],
                        "elem": "product__footer",
                        "content": [
                            { "block": "text", "mods": { "type": "h1" } }
                        ]
                    }
                ]
            }`,
    answer: [
      'TEXT.SEVERAL_H1',
      'TEXT.SEVERAL_H1'
    ]
  }
];

const H2PositionInputs = [
  {
    description: 'Тест 1: Заголовок второго уровня следует за заголовком первого уровня',
    json: `[
            {
                "block": "text",
                "mods": { "type": "h1" }
            },
            {
                "block": "text",
                "mods": { "type": "h2" }
            }
        ]`,
    answer: '[]'
  },

  {
    description: 'Тест 2: Заголовок второго уровня находится перед заголовком первого уровня',
    json: `[
            {
                "block": "text",
                "mods": { "type": "h2" }
            },
            {
                "block": "text",
                "mods": { "type": "h1" }
            }
        ]`,
    answer: [
      'TEXT.INVALID_H2_POSITION'
    ]
  },

  {
    description: 'Тест 3: Два заголовка второго уровня находятся перед заголовком первого уровня',
    json: `[
            {
                "block": "text",
                "mods": { "type": "h2" }
            },
            {
                "block": "text",
                "mods": { "type": "h2" }
            },
            {
                "block": "text",
                "mods": { "type": "h1" }
            }
        ]`,
    answer: [
      'TEXT.INVALID_H2_POSITION',
      'TEXT.INVALID_H2_POSITION'
    ]
  },

  {
    description: 'Тест 4: Заголовок второго уровня находится перед заголовком первого уровня на той же строке',
    json: `[
            { "block": "text", "mods": { "type": "h2" } }, { "block": "text", "mods": { "type": "h1" } }
        ]`,
    answer: [
      'TEXT.INVALID_H2_POSITION'
    ]
  },

  {
    description: 'Тест 5: Два заголовка второго уровня перед заголовком первого уровня на разных уровнях вложенности',
    json: `{
                "block": "product",
                "content": [
                    { "block": "text", "mods": { "type": "h2" } },
                    {
                        "elem": "product__content",
                        "content": [
                            { "block": "text", "mods": { "type": "h2" } }
                        ],
                        "elem": "product__footer",
                        "content": [
                            { "block": "text", "mods": { "type": "h1" } }
                        ]
                    }
                ]
            }`,
    answer: [
      'TEXT.INVALID_H2_POSITION',
      'TEXT.INVALID_H2_POSITION'
    ]
  }
];

const H3PositionInputs = [
  {
    description: 'Тест 1: Заголовок третьего уровня следует за заголовком второго уровня',
    json: `[
            {
                "block": "text",
                "mods": { "type": "h2" }
            },
            {
                "block": "text",
                "mods": { "type": "h3" }
            }
        ]`,
    answer: '[]'
  },

  {
    description: 'Тест 2: Заголовок третьего уровня находится перед заголовком второго уровня',
    json: `[
            {
                "block": "text",
                "mods": { "type": "h3" }
            },
            {
                "block": "text",
                "mods": { "type": "h2" }
            }
        ]`,
    answer: [
      'TEXT.INVALID_H3_POSITION'
    ]
  },

  {
    description: 'Тест 3: Два заголовка третьего уровня находятся перед заголовком второго уровня',
    json: `[
            {
                "block": "text",
                "mods": { "type": "h3" }
            },
            {
                "block": "text",
                "mods": { "type": "h3" }
            },
            {
                "block": "text",
                "mods": { "type": "h2" }
            }
        ]`,
    answer: [
      'TEXT.INVALID_H3_POSITION',
      'TEXT.INVALID_H3_POSITION'
    ]
  },

  {
    description: 'Тест 4: Заголовок третьего уровня находится перед заголовком второго уровня на той же строке',
    json: `[
            { "block": "text", "mods": { "type": "h3" } }, { "block": "text", "mods": { "type": "h2" } }
        ]`,
    answer: [
      'TEXT.INVALID_H3_POSITION'
    ]
  },

  {
    description: 'Тест 5: Два заголовка третьего уровня перед заголовком второго уровня на разных уровнях вложенности',
    json: `{
                "block": "product",
                "content": [
                    { "block": "text", "mods": { "type": "h3" } },
                    {
                        "elem": "product__content",
                        "content": [
                            { "block": "text", "mods": { "type": "h3" } }
                        ],
                        "elem": "product__footer",
                        "content": [
                            { "block": "text", "mods": { "type": "h2" } }
                        ]
                    }
                ]
            }`,
    answer: [
      'TEXT.INVALID_H3_POSITION',
      'TEXT.INVALID_H3_POSITION'
    ]
  }
];
