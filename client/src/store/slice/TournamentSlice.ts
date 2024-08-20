import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";

export interface ITournamentSlice {
  matches: any[];
  playersType: string;
  isModalOpen: boolean;
  winner: any;
  admin_id: string | null;
}

const initialState: ITournamentSlice = {
  matches: [],
  playersType: "",
  isModalOpen: false,
  winner: null,
  admin_id: null,
};

export const TournamentSlice = createSlice({
  name: "tournament",
  initialState,
  reducers: {
    setMatches: (state, { payload }: PayloadAction<any[]>) => {
      state.matches = payload;
    },
    setPacticapant: (
      state,
      {
        payload,
      }: PayloadAction<{ matchId: number; particapant: any; index: number }>
    ) => {
      // if particapant empty object, clear all next matches
      if (JSON.stringify(payload.particapant) === JSON.stringify({})) {
        const round = state.matches.find(
          (match) => match.id === payload.matchId
        ).tournamentRoundText;

        let playerId: any;
        state.matches.map((match) => {
          if (match.id === payload.matchId) {
            playerId = match.participants[payload.index].id;
            match.participants[payload.index] = payload.particapant;
          }
        });

        state.matches.map((match) => {
          if (match.tournamentRoundText > round) {
            const asd = match.participants.map((part: any) => {
              if (part?.id === playerId) {
                return {};
              } else {
                return part;
              }
            });
          }
        });
      }

      state.matches.map((match) => {
        if (match.id === payload.matchId) {
          return (match.participants[payload.index] = payload.particapant);
        } else {
          return match;
        }
      });
    },
    setPlayersType: (state, { payload }: PayloadAction<any>) => {
      state.playersType = payload[0].collection[0].collection;
    },
    setIsModalOpen: (state) => {
      state.isModalOpen = true;
    },
    setWiner: (state, { payload }: PayloadAction<any>) => {
      state.winner = payload;
    },
    setAdmin: (state, { payload }: PayloadAction<string>) => {
      state.admin_id = payload;
    },
  },
});

export const {
  setMatches,
  setPacticapant,
  setPlayersType,
  setIsModalOpen,
  setWiner,
  setAdmin,
} = TournamentSlice.actions;
export const TournamentSliceReducer = TournamentSlice.reducer;
