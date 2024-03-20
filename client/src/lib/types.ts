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

export interface IGamePLayer {
    name: string
    id?: string
}

export interface IGame {
    game: string
    gameTitle: string
    yourGame?: string
    teams: IGameTeam[]
    soloPLayers: IGamePLayer[]
}

export interface IGameTeam {
    name: string
    players: IGamePLayer[]
}

export interface ISelectOption {
    value?: any
    label: any
}

export interface IGroup {
    label: string
    players: IGamePLayer[]
}