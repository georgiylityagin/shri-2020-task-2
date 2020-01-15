const proportionInputs = [
  {
    description: 'Тест 1: рекламный блок offer занимает 2 колонки из 10',
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
                        "m-col": "8"
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
                        "m-col": "2"
                    },
                    "content": [
                        {
                            "block": "offer"
                        }
                    ]
                }
            ]
        }`,
    answer: '[]'
  },

  {
    description: 'Тест 2: рекламный блок commercial занимает 6 колонок из 12',
    json: `{
            "block": "grid",
            "mods": {
                "m-columns": "12"
            },
            "content": [
                {
                    "block": "grid",
                    "elem": "fraction",
                    "elemMods": {
                        "m-col": "6"
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
    answer: '[]'
  },

  {
    description: 'Тест 3: рекламный блок commercial занимает 6 колонок из 10',
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
    answer: [
      'GRID.TOO_MUCH_MARKETING_BLOCKS'
    ]
  },

  {
    description: 'Тест 4: рекламные блоки commercial и offer в сумме занимают 8 колонок из 12',
    json: `{
            "block": "grid",
            "mods": {
                "m-columns": "12"
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
                        "m-col": "2"
                    },
                    "content": [
                        {
                            "block": "commercial"
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
                            "block": "offer"
                        }
                    ]
                }
            ]
        }`,
    answer: [
      'GRID.TOO_MUCH_MARKETING_BLOCKS'
    ]
  }
]
;
