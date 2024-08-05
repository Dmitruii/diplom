import { IOption } from "@/lib/types";

const toOptions = (
  array: any[],
  label: string,
  value: string = "id"
): IOption[] => {
  const options = array.map((item) => ({
    value: item[value],
    label: item[label],
  }));
  options.unshift({ value: "", label: "Choose" });

  return options;
};

export default toOptions;
