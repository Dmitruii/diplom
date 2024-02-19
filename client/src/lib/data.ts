import { IFilter } from "./types"

export const PlayerFilters: IFilter[] = [
    {
        label: 'per page',
        type: 'select',
        options: [
            { label: '10', value: 10 },
            { label: '20', value: 20 },
            { label: '50', value: 50 },
            { label: '100', value: 100 },
        ],
    },
    {
        label: 'nickname',
        type: 'select',
        options: [
            { label: 'desc', value: 'desc' },
            { label: 'asc', value: 'asc' },
        ],
    },
    {
        label: 'game count',
        type: 'select',
        options: [
            { label: 'more than 10', value: 10 },
            { label: 'more than 20', value: 20 },
            { label: 'more than 50', value: 50 },
            { label: 'more than 100', value: 100 },
        ],
    },
    {
        label: 'win',
        type: 'select',
        options: [
            { label: 'more than 100', value: 100 },
            { label: 'more than 200', value: 200 },
            { label: 'more than 500', value: 500 },
            { label: 'more than 1000', value: 1000 },
        ],
    },
    {
        label: 'group',
        type: 'multiselect',
        options: [
            { label: '21ОКС1', value: '21ОКС1' },
            { label: '21ОКС2', value: '21ОКС2' },
            { label: '21ОКС3', value: '21ОКС3' },
            { label: '21ОКС4', value: '21ОКС4' },
        ],
    }
]

export const PlayerExampleData = {
    head: [
        '№',
        'title',
        'winer',
        'date',
        'players',
        'game',
    ],
    body: [
        [
            '1',
            'NAVI vs FAZE',
            'NAVI',
            '21 Dec 2026',
            'players',
            'CSGO'
        ],
        [
            '2',
            'NAVI vs FAZE',
            'FAZE',
            '21 Dec 2026',
            'players',
            'CSGO'
        ],
        [
            '3',
            'NAVI vs FAZE',
            'FAZE',
            '21 Dec 2026',
            'players',
            'CSGO'
        ],
        [
            '4',
            'NAVI vs FAZE',
            'FAZE',
            '21 Dec 2026',
            'players',
            'CSGO'
        ],
        [
            '5',
            'NAVI vs FAZE',
            'FAZE',
            '21 Dec 2026',
            'players',
            'CSGO'
        ],
    ]
}