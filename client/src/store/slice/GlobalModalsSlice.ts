import { IToast, IToastModalTypes } from "@/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IGlobalModals {
  isLoading: boolean;
  toast: IToast;
}

const initialState: IGlobalModals = {
  isLoading: false,
  toast: { label: "", type: null },
};

export const GlobalModalsSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setIsLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
    setToast: (state, { payload }: PayloadAction<IToast>) => {
      state.toast = payload;
    },
  },
});

export const { setIsLoading, setToast } = GlobalModalsSlice.actions;
export const GlobalModalsReducer = GlobalModalsSlice.reducer;
