import { perPageOptions } from "@/lib/data";
import { IOption, ITournament, IUser } from "@/lib/types";
import { combineSlices, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ITournamentsSlice {
  tournaments: null | ITournament[];
  usersOptions: IOption[];
  locationOptions: IOption[];
  gamesOptions: IOption[];
  startDate: Date | undefined;
  endDate: Date | undefined;
  totalTournaments: number;
  limit: number;
  page: number;
}

const initialState: ITournamentsSlice = {
  tournaments: null,
  usersOptions: [],
  locationOptions: [],
  gamesOptions: [],
  startDate: undefined,
  endDate: undefined,
  totalTournaments: 0,
  limit: perPageOptions[0].value,
  page: 1,
};

export const TournamentsSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setTournaments: (state, { payload }: PayloadAction<ITournament[]>) => {
      state.tournaments = payload;
    },
    setUsersOptions: (state, { payload }: PayloadAction<IOption[]>) => {
      state.usersOptions = payload;
    },
    setLocationOptions: (state, { payload }: PayloadAction<IOption[]>) => {
      state.locationOptions = payload;
    },
    setGamesOptions: (state, { payload }: PayloadAction<IOption[]>) => {
      state.gamesOptions = payload;
    },
    setDate: (
      state,
      {
        payload,
      }: PayloadAction<{
        start: Date | undefined;
        end: Date | undefined;
      }>
    ) => {
      state.startDate = payload.start;
      state.endDate = payload.end;
    },
    setTotalTournaments: (state, { payload }: PayloadAction<number>) => {
      state.totalTournaments = payload;
    },
    setLimit: (state, { payload }: PayloadAction<number>) => {
      state.limit = payload;
    },
    setPage: (state, { payload }: PayloadAction<number>) => {
      console.log(payload);
      state.page = payload;
    },
  },
});

export const {
  setTournaments,
  setUsersOptions,
  setLocationOptions,
  setGamesOptions,
  setDate,
  setTotalTournaments,
  setLimit,
  setPage,
} = TournamentsSlice.actions;
export const TournamentsReducer = TournamentsSlice.reducer;
