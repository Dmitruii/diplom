export type IFilterTypes = 'select' | 'multiselect' | 'textinput'

export interface IFilter {
    type: IFilterTypes
    label: string,
    placeholder?: string,
    options?: IOption[]
}

export interface IOption {
    label: string
    value: any
}

export interface IGame {
    game: string
    gameTitle: string
    yourGame?: string
    teams: string[]
}