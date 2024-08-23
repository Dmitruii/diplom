import { Inputs } from "@/components/filter/tournaments/Filter";

const getFilters = (data: Inputs, startDate: any, endDate: any) => {
  const options: any = {
    filter: {
      _and: [],
    },
    fields: ["*", "winner_id.*.*", "games_id.*", "admin_id.*", "location.*"],
    sort: [],
  };

  // set sort
  if (data.sort) {
    options.sort = [];
    options.sort.push(data.sort);
  } else {
    options.sort = [];
    options.sort.push("date_created");
  }

  // set date
  if (startDate || endDate) {
    if (startDate && !endDate) {
      options.filter._and.push({
        date_created: {
          _gt: startDate
            .toISOString()
            .slice(0, 19)
            .replace("T21:00:00", "T12:00:00"),
        },
      });
    } else if (startDate && endDate) {
      const dateRange = [
        startDate.toISOString().slice(0, 19).replace("T21:00:00", "T12:00:00"),
        endDate.toISOString().slice(0, 19).replace("T21:00:00", "T12:00:00"),
      ];
      options.filter._and.push({
        date_created: {
          _between: dateRange,
        },
      });
    }
  }

  // set filters
  Object.keys(data).map((key: string) => {
    if ((data as any)[key].trim()) {
      if (key === "title") {
        options.filter._and.push({
          name: {
            _contains: data[key],
          },
        });
      }
      if (key === "admin") {
        options.filter._and.push({
          admin_id: {
            _eq: data[key],
          },
        });
      }
      if (key === "winner") {
        options.filter._and.push({
          winner_id: {
            _eq: data[key],
          },
        });
      }
      if (key === "location") {
        options.filter._and.push({
          location: {
            _eq: data[key],
          },
        });
      }
      if (key === "game") {
        options.filter._and.push({
          games_id: {
            _eq: data[key],
          },
        });
      }
    }
  });
  return options;
};

export default getFilters;
