const locationInputs = [
  {
    description: 'Тест 1: неправильный блок warning',
    json: `{
            "block": "warning",
            "content": [
                { "block": "text", "mods": { "size": "l" } },
                { "block": "text", "mods": { "size": "m" } }
            ]
        }`,
    answer: {
      start: {
        column: 1,
        line: 1
      },
      end: {
        column: 10,
        line: 7
      }
    }
  },

  {
    description: 'Тест 2: неправильный блок warning, вложенный в другой блок warning',
    json: `{
            "block": "warning",
            "content": [
                { "block": "text", "mods": { "size": "l" } },
                {
                    "block": "warning",
                    "content": [
                        { "block": "text", "mods": { "size": "l" } },
                        { "block": "text", "mods": { "size": "m" } }
                    ]
                }
            ]
        }`,
    answer: {
      start: {
        column: 17,
        line: 5
      },
      end: {
        column: 18,
        line: 11
      }
    }
  },

  {
    description: 'Тест 3: неправильный блок button',
    json: `{
            "block": "warning",
            "content": [
                { "block": "text", "mods": { "size": "l" } },
                { "block": "button", "mods": { "size": "l" } }
            ]
        }`,
    answer: {
      start: {
        column: 17,
        line: 5
      },
      end: {
        column: 63,
        line: 5
      }
    }
  },

  {
    description: 'Тест 4: неправильный блок button',
    json: `{
            "block": "warning",
            "content": [
                { "block": "button", "mods": { "size": "m" } },
                { "block": "placeholder", "mods": { "size": "m" } }
            ]
        }`,
    answer: {
      start: {
        column: 17,
        line: 4
      },
      end: {
        column: 63,
        line: 4
      }
    }
  },

  {
    description: 'Тест 5: неправильный блок placeholder',
    json: `{
            "block": "warning",
            "content": [
                { "block": "placeholder", "mods": { "size": "xs" } }
            ]
        }`,
    answer: {
      start: {
        column: 17,
        line: 4
      },
      end: {
        column: 69,
        line: 4
      }
    }
  },

  {
    description: 'Тест 6: второй заголовок h1',
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
    answer: {
      start: {
        column: 13,
        line: 6
      },
      end: {
        column: 14,
        line: 9
      }
    }
  },

  {
    description: 'Тест 7: h2 перед h1',
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
    answer: {
      start: {
        column: 13,
        line: 2
      },
      end: {
        column: 14,
        line: 5
      }
    }
  },

  {
    description: 'Тест 8: h3 перед h2',
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
    answer: {
      start: {
        column: 13,
        line: 2
      },
      end: {
        column: 14,
        line: 5
      }
    }
  },

  {
    description: 'Тест 9: слишком большой рекламный блок',
    json: `{
            "block": "grid",
            "mods": {
                "m-columns": "10"
            },
            "content": [
                {
                    "block": "grid",
                    "elem": "fraction",
                    "elemMods": {
                        "m-col": "4"
                    },
                    "content": [
                        {
                            "block": "payment"
                        }
                    ]
                },
                {
                    "block": "grid",
                    "elem": "fraction",
                    "elemMods": {
                        "m-col": "6"
                    },
                    "content": [
                        {
                            "block": "commercial"
                        }
                    ]
                }
            ]
        }`,
    answer: {
      start: {
        column: 1,
        line: 1
      },
      end: {
        column: 10,
        line: 32
      }
    }
  }
];
