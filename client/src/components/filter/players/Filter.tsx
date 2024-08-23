"use client";
import { Button, TextInput } from "flowbite-react";
import FilterItem from "../FilterItem";
import { HiChevronDown } from "react-icons/hi";
import { HiChevronUp } from "react-icons/hi";
import { useEffect, useState } from "react";
import {
  entities,
  perPageOptions,
  PlayerFilters,
  playersFilterSortOptions,
  tournamentsFilterSortOptions,
} from "@/lib/data";
import { useForm } from "react-hook-form";
import client from "@/directus/api";
import { readItems, readUsers } from "@directus/sdk";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { ILocation, ITournament, IUser } from "@/lib/types";
import toOptions from "@/utils/toOptions";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { group } from "console";
import {
  setGroupsOptions,
  setLimit,
  setPage,
  setTotal,
  setUsers,
} from "@/store/slice/UsersSlice";
import getPlayerFilters from "@/utils/getPlayerFilters";

export type Inputs = {
  first_name: string;
  last_name: string;
  sort: string;
  group: string;
  email: string;
  per_page: number;
};

const Filter = () => {
  const { register, handleSubmit, getValues, reset } = useForm<Inputs>();
  const page = useAppSelector((state) => state.tournaments.page);
  const dispatch = useAppDispatch();
  const groupsOptions = useAppSelector((state) => state.users.groupsOptions);
  const [isHide, setIsHide] = useState(false);

  const handle = async (data: Inputs) => {
    dispatch(setLimit(data.per_page));
    const users = await client.request<IUser[]>(
      readUsers({
        ...getPlayerFilters(data),
        limit: data.per_page,
        page,
      })
    );
    dispatch(setUsers(users));

    const count = await client.request(
      readUsers({
        ...getPlayerFilters(data),
        aggregate: {
          countDistinct: ["id"],
        },
      })
    );
    dispatch(setTotal(count[0].countDistinct.id));
  };

  const fetchInit = async () => {
    // fetch users
    const users = await client.request<IUser[]>(
      readUsers({ fields: ["*", "group_id.*"] })
    );
    dispatch(setUsers(users));

    // fetch groups
    const groups = await client.request<IUser[]>(readItems(entities.groups));
    dispatch(setGroupsOptions(toOptions(groups, "title")));
  };

  const resetToDefault = async () => {
    reset();
    dispatch(setLimit(perPageOptions[0].value));
    dispatch(setPage(1));
    const users = await client.request<IUser[]>(
      readUsers({
        fields: ["*", "group_id.*"],
        limit: perPageOptions[0].value,
        page: 1,
      })
    );
    dispatch(setUsers(users));

    const count = await client.request(
      readUsers({
        aggregate: {
          countDistinct: ["id"],
        },
      } as any)
    );
    dispatch(setTotal(count[0].countDistinct.id));
  };

  useEffect(() => {
    fetchInit();
  }, []);

  useEffect(() => {
    handle(getValues());
  }, [page]);

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold">Filter</h1>
        <div className="flex gap-3">
          <Button onClick={() => setIsHide((prev) => !prev)} color="blue">
            Filter
            {isHide ? (
              <HiChevronUp className="ml-1 h-5 w-5" />
            ) : (
              <HiChevronDown className="ml-1 h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit(handle)}>
        <div
          className={`grid grid-cols-5 gap-5 ${
            isHide && "overflow-hidden invisible absolute"
          }`}
        >
          <FilterItem
            label={"Sort"}
            placeholder={"ask"}
            type={"select"}
            options={playersFilterSortOptions}
            rest={{ ...register("sort") }}
          />
          <FilterItem
            label={"Per page"}
            placeholder={"per page"}
            type={"select"}
            options={perPageOptions}
            rest={{ ...register("per_page") }}
          />
          <FilterItem
            label={"First name"}
            placeholder={"First name"}
            type={"textinput"}
            rest={{ ...register("first_name") }}
          />
          <FilterItem
            label={"Email"}
            placeholder={"Email"}
            type={"textinput"}
            rest={{ ...register("email") }}
          />
          <FilterItem
            label={"Last name"}
            placeholder={"Last name"}
            type={"textinput"}
            rest={{ ...register("last_name") }}
          />
          <FilterItem
            label={"Group"}
            placeholder={"Group"}
            type={"select"}
            options={groupsOptions}
            rest={{ ...register("group") }}
          />
        </div>
        <div className="grid grid-cols-5 gap-5 mt-5">
          <Button
            onClick={resetToDefault}
            color="blue"
            className="col-start-4 col-end-5"
          >
            Reset
          </Button>
          <Button
            type="submit"
            color="success"
            // className="col-start-3 col-end-4"
          >
            Apply
          </Button>
        </div>
      </form>
    </>
  );
};

export default Filter;
