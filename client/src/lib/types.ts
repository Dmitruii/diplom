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