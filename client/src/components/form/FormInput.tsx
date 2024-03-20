import { errorTypes } from "@/lib/data"
import { ISelectOption } from "@/lib/types"
import { Label, Select, TextInput } from "flowbite-react"
import { useId } from "react"

type FormType = 'TextInput' | "Select"

interface IFormInputProps {
    label: string
    type?: FormType
    fieldType?: string
    placeholder: string
    required?: boolean
    rest?: any;
    errors?: any
    value?: string
    options?: ISelectOption[]
}

export default function FormInput ({ label, type = 'TextInput', fieldType, placeholder, required, rest, errors, value, options }: IFormInputProps) {
    const id = useId()
    const error = value === '' || errors

    return <div className="w-full">
        <div className="mb-2 block">
            <Label className={error && "text-red-600"} htmlFor={id} value={label} />
        </div>

        {type === 'TextInput' && <TextInput 
            id={id} 
            type={fieldType} 
            placeholder={placeholder} 
            required={required} 
            color={error && "failure"}
            {...rest}
        />}

        {type ==='Select' && <Select 
            {...rest}
            id={id} 
            required={required}
            color={error && "failure"}
        >
            {options?.map(({label, value}) => {
                return <option 
                    key={value}
                    value={typeof value === 'object' ? JSON.stringify(value) : value}
                >
                {label}
            </option>
            })}
        </Select>}

        {error && <span className="text-red-600 font-semibold">
            {(errors?.type === errorTypes.required || value === '') && 'Required'}    
            {(errors?.type === errorTypes.repeat) && `${label} value is taken`}    
        </span>}
    </div>
}