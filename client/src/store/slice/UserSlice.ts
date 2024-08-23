import { IToast, IToastModalTypes, IUser } from "@/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUserSlice {
  user: IUser | null;
  file: File | null;
}

const initialState: IUserSlice = {
  user: null,
  file: null,
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<IUser | null>) => {
      state.user = payload;
    },
    setAvatar: (state, { payload }: PayloadAction<Pick<IUser, "avatar">>) => {
      state.user = { ...state.user, avatar: payload.avatar } as IUser;
    },
    setFile: (state, { payload }: PayloadAction<Pick<IUserSlice, "file">>) => {
      console.log(payload.file);
      state.file = payload.file;
    },
  },
});

export const { setUser, setAvatar, setFile } = UserSlice.actions;
export const UserReducer = UserSlice.reducer;
