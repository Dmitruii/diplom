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
  tournamentsFilterSortOptions,
} from "@/lib/data";
import { useForm } from "react-hook-form";
import client from "@/directus/api";
import { readItem, readItems, readUsers } from "@directus/sdk";
import {
  setDate,
  setGamesOptions,
  setLimit,
  setLocationOptions,
  setPage,
  setTotalTournaments,
  setTournaments,
  setUsersOptions,
} from "@/store/slice/TournamentsSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { ILocation, ITournament, IUser } from "@/lib/types";
import toOptions from "@/utils/toOptions";
import getFilters from "@/utils/getFilters";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export type Inputs = {
  title: string;
  winner: string;
  admin: string;
  sort: string;
  location: string;
  game: string;
  per_page: number;
};

const Filter = () => {
  const { register, handleSubmit, getValues, reset } = useForm<Inputs>();
  const page = useAppSelector((state) => state.tournaments.page);
  const dispatch = useAppDispatch();
  const usersOptions = useAppSelector(
    (state) => state.tournaments.usersOptions
  );
  const locationOptions = useAppSelector(
    (state) => state.tournaments.locationOptions
  );
  const gamesOptions = useAppSelector(
    (state) => state.tournaments.gamesOptions
  );
  const startDate = useAppSelector((state) => state.tournaments.startDate);
  const endDate = useAppSelector((state) => state.tournaments.endDate);
  const totalTournaments = useAppSelector(
    (state) => state.tournaments.totalTournaments
  );
  const [isHide, setIsHide] = useState(false);

  const handle = async (data: Inputs) => {
    dispatch(setLimit(data.per_page));
    const tournaments = await client.request<ITournament[]>(
      readItems(entities.tournaments, {
        ...getFilters(data, startDate, endDate),
        limit: data.per_page,
        page,
      })
    );
    dispatch(setTournaments(tournaments));

    const count = await client.request<{ countDistinct: { id: number } }[]>(
      readItems(entities.tournaments, {
        ...getFilters(data, startDate, endDate),
        aggregate: {
          countDistinct: ["id"],
        },
      })
    );
    dispatch(setTotalTournaments(count[0].countDistinct.id));
  };

  const fetchInit = async () => {
    // fetch users
    const users = await client.request<IUser[]>(readUsers());
    console.log(users);
    dispatch(setUsersOptions(toOptions(users, "first_name")));

    // fetch locations
    const locations = await client.request<ILocation[]>(
      readItems(entities.locations)
    );
    dispatch(setLocationOptions(toOptions(locations, "title")));

    // fetch locations
    const games = await client.request(readItems(entities.games));
    dispatch(setGamesOptions(toOptions(games, "name")));
  };

  const resetToDefault = async () => {
    reset();
    dispatch(setLimit(perPageOptions[0].value));
    dispatch(setPage(1));
    const tournaments = await client.request<ITournament[]>(
      readItems(entities.tournaments, {
        limit: perPageOptions[0].value,
        page: 1,
      })
    );
    dispatch(setTournaments(tournaments));

    const count = await client.request<{ countDistinct: { id: number } }[]>(
      readItems(entities.tournaments, {
        aggregate: {
          countDistinct: ["id"],
        },
      } as any)
    );
    dispatch(setTotalTournaments(count[0].countDistinct.id));
  };

  const onChange = (dates: any) => {
    const [start, end] = dates;
    dispatch(
      setDate({
        start,
        end,
      })
    );
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
            options={tournamentsFilterSortOptions}
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
            label={"Title"}
            placeholder={"title"}
            type={"textinput"}
            rest={{ ...register("title") }}
          />
          <FilterItem
            label={"Winner"}
            placeholder={"Winner"}
            type={"select"}
            options={usersOptions}
            rest={{ ...register("winner") }}
          />
          <FilterItem
            label={"Admin"}
            placeholder={"Admin"}
            type={"select"}
            options={usersOptions}
            rest={{ ...register("admin") }}
          />
          <FilterItem
            label={"Location"}
            placeholder={"location"}
            type={"select"}
            options={locationOptions}
            rest={{ ...register("location") }}
          />
          <FilterItem
            label={"Game"}
            placeholder={"CS:G0"}
            type={"select"}
            options={gamesOptions}
            rest={{ ...register("game") }}
          />
          <FilterItem
            label={"Date"}
            placeholder={"date"}
            type={"date"}
            rest={{
              onChange: onChange,
              selectsRange: true,
              startDate: startDate,
              endDate: endDate,
            }}
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
