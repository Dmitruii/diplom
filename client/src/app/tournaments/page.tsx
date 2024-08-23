"use client";

import Filter from "@/components/filter/tournaments/Filter";
import TableComp from "@/components/filter/tournaments/Table";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import client from "@/directus/api";
import { entities } from "@/lib/data";
import { ILocation, ITournament } from "@/lib/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setLocationOptions,
  setTotalTournaments,
  setTournaments,
} from "@/store/slice/TournamentsSlice";
import toOptions from "@/utils/toOptions";
import { readItems } from "@directus/sdk";
import { useEffect } from "react";

const Tournaments = () => {
  const limit = useAppSelector((state) => state.tournaments.limit);
  const page = useAppSelector((state) => state.tournaments.page);
  const dispatch = useAppDispatch();

  const fetchGames = async () => {
    const tournaments = await client.request<ITournament[]>(
      readItems(entities.tournaments, {
        fields: [
          "*",
          "winner_id.*.*",
          "games_id.*",
          "admin_id.*",
          "location.*",
        ],
        sort: ["-date_created"],
        limit,
        page,
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

  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-y-10">
        <Filter />
        <TableComp />
      </div>
    </DashboardLayout>
  );
};

export default Tournaments;
