"use client";

import { StartNewGame } from "@/components/common/Sidebar";
import Tournament from "@/components/common/Tournament";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import client from "@/directus/api";
import useUserInfo from "@/hooks/useUserInfo";
import { entities } from "@/lib/data";
import { ITournament } from "@/lib/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setIsLoading } from "@/store/slice/GlobalModalsSlice";
import { readItems } from "@directus/sdk";
import { useEffect, useState } from "react";

const Dashboard = () => {
  useUserInfo();
  const dispatch = useAppDispatch();
  const [tournaments, setTournaments] = useState<ITournament[] | null>(null);
  const user = useAppSelector((state) => state.user.user);

  const fetch = async () => {
    if (user) {
      const data = await client.request<ITournament[]>(
        readItems(entities.tournaments, {
          filter: {
            _and: [
              {
                admin_id: {
                  id: {
                    _eq: user.id,
                  },
                },
              },
            ],
          },
          sort: ["-date_created"],
          fields: [
            "*",
            "admin_id.first_name",
            "location.title",
            "games_id.name",
            "winner_id.*.*",
          ],
        })
      );
      setTournaments(data);
    }
  };

  useEffect(() => {
    dispatch(setIsLoading(false));
    fetch();
  }, [user]);

  return (
    <>
      <DashboardLayout>
        <div className="flex min-h-full items-center justify-center">
          <div className="w-2/3 flex flex-col items-center justify-center">
            {!tournaments?.length && (
              <>
                <h1 className="text-xl font-semibold">No games</h1>
                <StartNewGame />
              </>
            )}
            <div className="w-full">
              {!!tournaments?.length && (
                <>
                  <div className="flex mb-5">
                    <div className="flex-1 flex justify-center">Title</div>
                    <div className="flex-1 flex justify-center">Location</div>
                    <div className="flex-1 flex justify-center">Admin</div>
                    <div className="flex-1 flex justify-center">Game</div>
                    <div className="flex-1 flex justify-center">Date</div>
                    <div className="flex-1 flex justify-center">Winner</div>
                  </div>
                  <div className="flex flex-col gap-2">
                    {tournaments.map(
                      ({
                        id,
                        name,
                        location,
                        admin_id,
                        date_created,
                        games_id,
                        winner_id,
                      }) => {
                        return (
                          <Tournament
                            id={id}
                            key={id}
                            name={name}
                            location={location.title}
                            admin={admin_id.first_name}
                            date={date_created}
                            game={games_id.name}
                            winner={
                              winner_id?.[0]?.item.first_name ||
                              winner_id?.[0]?.item.title
                            }
                          />
                        );
                      }
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default Dashboard;
