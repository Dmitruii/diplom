import { Label, TextInput } from "flowbite-react"
import { useId } from "react"

interface IFormInputProps {
    label: string
    type?: string
    placeholder: string
    required: boolean
}

export default function FormInput ({ label, type = 'text', placeholder, required }: IFormInputProps) {
    const id = useId()
    return <div>
        <div className="mb-2 block">
            <Label htmlFor={id} value={label} />
        </div>
        <TextInput id={id} type={type} placeholder={placeholder} required={required} />
    </div>
}