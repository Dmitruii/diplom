import { IToast, IToastModalTypes, IUser } from "@/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUserSlice {
  user: IUser | null;
}

const initialState: IUserSlice = {
  user: null,
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<IUser>) => {
      state.user = payload;
    },
  },
});

export const { setUser } = UserSlice.actions;
export const UserReducer = UserSlice.reducer;
