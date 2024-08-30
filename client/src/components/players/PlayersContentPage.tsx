"use client";

import Filter from "@/components/filter/players/Filter";
import TableComp from "@/components/filter/players/Table";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import client from "@/directus/api";
import { entities } from "@/lib/data";
import { IUser } from "@/lib/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setGroupsOptions, setUsers } from "@/store/slice/UsersSlice";
import { readUsers } from "@directus/sdk";
import { useEffect } from "react";

const PlayersContentPage = () => {
  const limit = useAppSelector((state) => state.users.limit);
  const page = useAppSelector((state) => state.users.page);
  const dispatch = useAppDispatch();

  const fetchUsers = async () => {
    // fetch users
    const users = await client.request<IUser[]>(
      readUsers({ fields: ["*", "group_id.*"], limit, page })
    );
    dispatch(setUsers(users));
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

export default PlayersContentPage;
