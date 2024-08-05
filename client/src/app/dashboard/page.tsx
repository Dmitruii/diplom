"use client";

import { StartNewGame } from "@/components/common/Sidebar";
import Tournament from "@/components/common/Tournament";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import client from "@/directus/api";
import { entities } from "@/lib/data";
import { readItems } from "@directus/sdk";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const adminId = "8afdd44b-8669-40d9-8061-1c2cca4a3fc4";
  const adminId2 = "ee75b112-e665-4a3b-b207-0714daeb488a";
  const [tournaments, setTournaments] = useState<any>();

  const fetch = async () => {
    const data = await client.request(
      readItems(entities.tournaments, {
        filter: {
          _and: [
            {
              admin_id: {
                id: {
                  _eq: adminId,
                },
              },
            },
          ],
        },
      })
    );
    setTournaments(data);
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <>
      <DashboardLayout>
        <div className="flex h-full items-center justify-center">
          <div className="w-2/3 flex flex-col items-center justify-center">
            <h1 className="text-xl font-semibold">No games</h1>
            <StartNewGame />
            <div className="w-full">
              <Tournament />
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default Dashboard;
