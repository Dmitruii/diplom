import { configureStore } from "@reduxjs/toolkit";
import { gameReducer } from "./slice/GameSlice";
import { EditProfileReducer } from "./slice/EditProfileSlice";
import { GlobalModalsReducer } from "./slice/GlobalModalsSlice";
import { TournamentSliceReducer } from "./slice/TournamentSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      game: gameReducer,
      edit: EditProfileReducer,
      globalModals: GlobalModalsReducer,
      tournament: TournamentSliceReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
