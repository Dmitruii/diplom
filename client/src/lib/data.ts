import { IFilter, IGroup, IOption, ISelectOption } from "./types"

export const errorTypes = {
    required: 'required',
    repeat: 'repeat',
}

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

export const GroupOptions: ISelectOption[] = [
    { label: '21OKS1', value: '21OKS1' },
    { label: '21OKS2', value: '21OKS2' },
    { label: '21OKS3', value: '21OKS3' },
    { label: '21OKS4', value: '21OKS4' },
    { label: '21OKS5', value: '21OKS5' },
]

export const PlayersOptions: ISelectOption[] = [
    { label: 'Ismail Ball', value: 'Ismail Ball' },
    { label: 'Philippa Hood', value: 'Philippa Hood' },
    { label: 'Antonio Roy', value: 'Antonio Roy' },
    { label: 'Henry Richard', value: 'Henry Richard' },
    { label: 'Chaya Velazquez', value: 'Chaya Velazquez' },
    { label: 'Cassie Frank', value: 'Cassie Frank' },
    { label: 'Keane Slater', value: 'Keane Slater' },
    { label: 'Lexi Waller', value: 'Lexi Waller' },
    { label: 'Gabriella Bradley', value: 'Gabriella Bradley' },
    { label: 'Nelson Newton', value: 'Nelson Newton' },
]

export const Groups: IGroup[] = [
    {
        label: "21OKS1",
        players: [
            { name: 'Ismail Ball', id: '1' },
            { name: 'Philippa Hood', id: '2' },
            { name: 'Antonio Roy', id: '3' },
            { name: 'Henry Richard', id: '4' },
            { name: 'Chaya Velazquez', id: '5' },
        ]
    },
    {
        label: "21OKS2",
        players: [
            { name: 'Ismail Ball', id: '11' },
            { name: 'Philippa Hood', id: '21' },
            { name: 'Antonio Roy', id: '31' },
            { name: 'Henry Richard', id: '41' },
            { name: 'Chaya Velazquez', id: '51' },
        ]
    },
    {
        label: "21OKS3",
        players: [
            { name: 'Ismail Ball', id: '12' },
            { name: 'Philippa Hood', id: '22' },
            { name: 'Antonio Roy', id: '32' },
            { name: 'Henry Richard', id: '42' },
            { name: 'Chaya Velazquez', id: '52' },
        ]
    },
    {
        label: "21OKS4",
        players: [
            { name: 'Ismail Ball', id: '13' },
            { name: 'Philippa Hood', id: '23' },
            { name: 'Antonio Roy', id: '33' },
            { name: 'Henry Richard', id: '43' },
            { name: 'Chaya Velazquez', id: '53' },
        ]
    },
    {
        label: "21OKS5",
        players: [
            { name: 'Ismail Ball', id: '14' },
            { name: 'Philippa Hood', id: '24' },
            { name: 'Antonio Roy', id: '34' },
            { name: 'Henry Richard', id: '44' },
            { name: 'Chaya Velazquez', id: '54' },
        ]
    },
]

export const gamesOptions: IOption[] = [
    { label: 'DOTA1', value: 'DOTA1' },
    { label: 'DOTA2', value: 'DOTA2' },
    { label: 'DOTA3', value: 'DOTA3' },
    { label: 'DOTA4', value: 'DOTA4' },
    { label: 'DOTA5', value: 'DOTA5' },
    { label: 'DOTA6', value: 'DOTA6' },
    { label: 'Your Game', value: 'YourGame' },
]