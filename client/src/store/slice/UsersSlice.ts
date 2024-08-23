import { perPageOptions } from "@/lib/data";
import { IOption, IUser } from "@/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUsersSlice {
  users: IUser[] | null;
  limit: number;
  page: number;
  groupsOptions: IOption[];
  total: number;
}

const initialState: IUsersSlice = {
  users: [],
  limit: perPageOptions[0].value,
  page: 1,
  groupsOptions: [],
  total: 0,
};

export const UsersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers: (state, { payload }: PayloadAction<IUser[]>) => {
      state.users = payload;
    },
    setLimit: (state, { payload }: PayloadAction<number>) => {
      state.limit = payload;
    },
    setPage: (state, { payload }: PayloadAction<number>) => {
      state.page = payload;
    },
    setGroupsOptions: (state, { payload }: PayloadAction<IOption[]>) => {
      state.groupsOptions = payload;
    },
    setTotal: (state, { payload }: PayloadAction<number>) => {
      state.total = payload;
    },
  },
});

export const { setUsers, setLimit, setPage, setGroupsOptions, setTotal } =
  UsersSlice.actions;
export const UsersReducer = UsersSlice.reducer;
