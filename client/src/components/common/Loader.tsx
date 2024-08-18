"use client";

import client from "@/directus/api";
import { IUser } from "@/lib/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setUser } from "@/store/slice/UserSlice";
import { readMe } from "@directus/sdk";
import { Spinner } from "flowbite-react";
import { useEffect } from "react";

const Loader = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const fetchUserData = async () => {
    const user = await client.request<IUser>(
      readMe({
        fields: ["*"],
      })
    );
    dispatch(setUser(user));
  };

  useEffect(() => {
    !user && fetchUserData();
  }, []);

  const isLoading = useAppSelector((state) => state.globalModals.isLoading);

  return (
    isLoading && (
      <div className="z-50 absolute bg-black bg-opacity-20 top-0 bottom-0 right-0 left-0 flex items-center justify-center">
        <Spinner size="xl" />
      </div>
    )
  );
};

export default Loader;
