import { IOption } from "@/lib/types";

interface IMultiSelectDropdown {
  formFieldName: string
  options: IOption[]
}

const MultiSelectDropdown = ({ formFieldName, options }: IMultiSelectDropdown) => {
  return (
    <label className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg relative">
      <input type="checkbox" className="hidden peer" />

      <div className="flex justify-between cursor-pointer after:content-['▼'] after:text-xs after:ml-1 after:inline-flex after:items-center peer-checked:after:-rotate-180 after:transition-transform">
          Show the dropdown
      </div>

      <div className="mt-3.5 w-full z-[2] absolute bg-white border transition-opacity opacity-0 pointer-events-none peer-checked:opacity-100 peer-checked:pointer-events-auto">
        <ul>
          {options.map(({value, label}) => {
            return (
              <li key={value}>
                <label className="flex whitespace-nowrap cursor-pointer px-2 py-1 transition-colors hover:bg-blue-100 [&:has(input:checked)]:bg-blue-200">
                  <input
                    type="checkbox"
                    name={formFieldName}
                    value={value}
                    className="cursor-pointer"
                  />
                  <span className="ml-1">{label}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </div>
  </label>
  );
}

export default MultiSelectDropdown