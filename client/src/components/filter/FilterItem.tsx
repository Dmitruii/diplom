import { Label, Select, TextInput } from "flowbite-react"
import { useId } from "react"
import MultiSelectDropdown from "../form/MultipleSelect"
import { IFilterTypes, IOption } from "@/lib/types"

interface IFilter {
    label: string   
    placeholder?: string
    options?: IOption[]
    type: IFilterTypes
}

const FilterItem = ({label, placeholder, type, options}: IFilter) => {
    const id = useId()

    return <div className="flex items-center gap-3">
        <Label className="whitespace-nowrap uppercase" htmlFor={id} value={label} />
        {type === 'textinput' && <TextInput id={id} placeholder={placeholder} />}
        {type === 'multiselect' && <MultiSelectDropdown options={options as IOption[]} formFieldName={placeholder as string} />}
        {type === 'select' && <Select className="w-full" id={id} required>
            {options?.map(({label, value}) => <option key={value} value={value}>{label}</option>)}
        </Select>}
    </div>
}

export default FilterItem