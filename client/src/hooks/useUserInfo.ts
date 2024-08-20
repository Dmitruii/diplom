import client from "@/directus/api";
import { IUser } from "@/lib/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setUser } from "@/store/slice/UserSlice";
import { readMe } from "@directus/sdk";
import { useEffect } from "react";

const useUserInfo = () => {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
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
  }, [user]);
};

export default useUserInfo;
