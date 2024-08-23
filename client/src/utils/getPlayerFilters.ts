import { Inputs } from "@/components/filter/players/Filter";

const getPlayerFilters = (data: Inputs) => {
  const options: any = {
    filter: {
      _and: [],
    },
    fields: ["*", "group_id.*"],
    sort: [],
  };

  // set sort
  if (data.sort) {
    options.sort = [];
    options.sort.push(data.sort);
  } else {
    options.sort = [];
  }

  // set filters
  Object.keys(data).map((key: string) => {
    if (data[key].trim()) {
      if (key === "first_name") {
        options.filter._and.push({
          first_name: {
            _contains: data[key],
          },
        });
      }
      if (key === "email") {
        options.filter._and.push({
          email: {
            _contains: data[key],
          },
        });
      }
      if (key === "last_name") {
        options.filter._and.push({
          last_name: {
            _contains: data[key],
          },
        });
      }
      if (key === "group") {
        options.filter._and.push({
          group_id: {
            _eq: data[key],
          },
        });
      }
    }
  });

  console.log(options);
  return options;
};

export default getPlayerFilters;
