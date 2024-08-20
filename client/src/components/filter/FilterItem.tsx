import { Label, Select, TextInput } from "flowbite-react";
import { useId } from "react";
import MultiSelectDropdown from "../form/MultipleSelect";
import { IFilterTypes, IOption } from "@/lib/types";
import FormInput from "../form/FormInput";
import DatePicker from "react-datepicker";

interface IFilter {
  label: string;
  placeholder: string;
  options?: IOption[];
  type: IFilterTypes;
  rest?: any;
}

const FilterItem = ({ label, placeholder, type, options, rest }: IFilter) => {
  const id = useId();

  return (
    <div className="flex items-center gap-3">
      <Label
        className="whitespace-nowrap uppercase"
        htmlFor={id}
        value={label}
      />
      {type === "textinput" && (
        <TextInput
          {...rest}
          id={id}
          placeholder={placeholder}
          className="w-full"
        />
      )}
      {type === "multiselect" && (
        <MultiSelectDropdown
          {...rest}
          options={options as IOption[]}
          formFieldName={placeholder as string}
        />
      )}
      {type === "date" && (
        <DatePicker
          {...rest}
          placeholderText={placeholder}
          wrapperClassName={"w-full"}
          className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 bg-gray-50 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
        />
      )}
      {type === "select" && (
        <Select {...rest} className="w-full" id={id}>
          {options?.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>
      )}
    </div>
  );
};

export default FilterItem;
