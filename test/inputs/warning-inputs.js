let sameSizeInputs = [
    {
        description: `Тест 1: двум блокам text заданы одинаковые размеры`,
        json: `{
            "block": "warning",
            "content": [
                { "block": "text", "mods": { "size": "l" } },
                { "block": "text", "mods": { "size": "l" } }
            ]
        }`,
        answer: "[]"
    },

    {
        description: `Тест 2: двум блокам text заданы разные размеры`,
        json: `{
            "block": "warning",
            "content": [
                { "block": "text", "mods": { "size": "l" } },
                { "block": "text", "mods": { "size": "m" } }
            ]
        }`,
        answer: [
            "WARNING.TEXT_SIZES_SHOULD_BE_EQUAL"
        ]
    },

    {
        description: `Тест 3:  нескольким блокам text заданы разные размеры`,
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
            "WARNING.TEXT_SIZES_SHOULD_BE_EQUAL"
        ]
    },

    {
        description: `Тест 4: наличие блока text с отсутствующим модификатором size`,
        json: `{
            "block": "warning",
            "content": [
                { "block": "text", "mods": {  } },
                { "block": "text", "mods": { "size": "xl" } }
            ]
        }`,
        answer: [
            "WARNING.TEXT_SIZES_SHOULD_BE_EQUAL"
        ]
    },
];

let buttonSizeInputs = [
    {
        description: `Тест 1: размер кнопки больше эталона на 1`,
        json: `{
            "block": "warning",
            "content": [
                { "block": "text", "mods": { "size": "l" } },
                { "block": "button", "mods": { "size": "xl" } }
            ]
        }`,
        answer: "[]"
    },

    {
        description: `Тест 2: эталон отсутствует`,
        json: `{
            "block": "warning",
            "content": [
                { "block": "button", "mods": { "size": "xl" } }
            ]
        }`,
        answer: "[]"
    },

    {
        description: `Тест 3: размер кнопки равен эталону`,
        json: `{
            "block": "warning",
            "content": [
                { "block": "text", "mods": { "size": "l" } },
                { "block": "button", "mods": { "size": "l" } }
            ]
        }`,
        answer: [
            "WARNING.INVALID_BUTTON_SIZE"
        ]
    },

    {
        description: `Тест 4: две кнопки с неправильным размером`,
        json: `{
            "block": "warning",
            "content": [
                { "block": "text", "mods": { "size": "l" } },
                { "block": "button", "mods": { "size": "m" } },
                { "block": "button", "mods": { "size": "s" } }
            ]
        }`,
        answer: [
            "WARNING.INVALID_BUTTON_SIZE",
            "WARNING.INVALID_BUTTON_SIZE"
        ]
    },

    {
        description: `Тест 5: кнопка с неуказанным размером`,
        json: `{
            "block": "warning",
            "content": [
                { "block": "text", "mods": { "size": "l" } },
                { "block": "button", "mods": { } }
            ]
        }`,
        answer: [
            "WARNING.INVALID_BUTTON_SIZE"
        ]
    },

];

let buttonPozitionInputs = [
    {
        description: `Тест 1: кнопка находится после блока placeholder`,
        json: `{
            "block": "warning",
            "content": [
                { "block": "placeholder", "mods": { "size": "m" } },
                { "block": "button", "mods": { "size": "m" } }
            ]
        }`,
        answer: "[]"
    },

    {
        description: `Тест 2: кнопка находится после блока placeholder на той же строке`,
        json: `{
            "block": "warning",
            "content": [
                { "block": "placeholder", "mods": { "size": "m" } }, { "block": "button", "mods": { "size": "m" } }
            ]
        }`,
        answer: "[]"
    },

    {
        description: `Тест 3: кнопка находится перед блоком placeholder`,
        json: `{
            "block": "warning",
            "content": [
                { "block": "button", "mods": { "size": "m" } },
                { "block": "placeholder", "mods": { "size": "m" } }
            ]
        }`,
        answer: [
            "WARNING.INVALID_BUTTON_POSITION"
        ]
    },

    {
        description: `Тест 4: кнопка находится перед блоком placeholder на той же строке`,
        json: `{
            "block": "warning",
            "content": [
                { "block": "button", "mods": { "size": "m" } }, { "block": "placeholder", "mods": { "size": "m" } }
            ]
        }`,
        answer: [
            "WARNING.INVALID_BUTTON_POSITION"
        ]
    },

    {
        description: `Тест 5: нескольно кнопок находятся перед блоком placeholder`,
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
            "WARNING.INVALID_BUTTON_POSITION",
            "WARNING.INVALID_BUTTON_POSITION",
            "WARNING.INVALID_BUTTON_POSITION"
        ]
    },
];

let placeholderSizeInputs = [
    {
        description: `Тест 1: правильные размеры блока placeholder`,
        json: `{
            "block": "warning",
            "content": [
                { "block": "placeholder", "mods": { "size": "s" } },
                { "block": "placeholder", "mods": { "size": "m" } },
                { "block": "placeholder", "mods": { "size": "l" } }
            ]
        }`,
        answer: "[]"
    },

    {
        description: `Тест 2: неправильные размеры блока placeholder`,
        json: `{
            "block": "warning",
            "content": [
                { "block": "placeholder", "mods": { "size": "xs" } },
                { "block": "placeholder", "mods": { "size": "xl" } },
                { "block": "placeholder", "mods": { "size": "very_big" } }
            ]
        }`,
        answer: [
            "WARNING.INVALID_PLACEHOLDER_SIZE",
            "WARNING.INVALID_PLACEHOLDER_SIZE",
            "WARNING.INVALID_PLACEHOLDER_SIZE"
        ]
    },

    {
        description: `Тест 3: размер не указан`,
        json: `{
            "block": "warning",
            "content": [
                { "block": "placeholder", "mods": {  } }
            ]
        }`,
        answer: [
            "WARNING.INVALID_PLACEHOLDER_SIZE"
        ]
    },
];