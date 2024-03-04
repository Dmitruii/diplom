import { IGame } from "@/lib/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IGameState {
    activeStep: number,
    isModalOpen: boolean
    game: IGame
}

const initialState: IGameState = {
    activeStep: 1,
    isModalOpen: false,
    game: {
        game: '',
        gameTitle: '',
        teams: []
    }
};

export const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        nextStep: (state) => {
            state.activeStep = state.activeStep + 1;
        },
        previousStep: (state) => {
            state.activeStep = state.activeStep !== 0 ? state.activeStep - 1 : 0;
        },
        openModal: (state) => {
            state.isModalOpen = true;
        },
        closeModal: (state) => {
            state.isModalOpen = false;
        },
        setGame: (state, payload: PayloadAction<any>) => {
            gameSlice.caseReducers.nextStep(state)
            state.game = { ...state.game, ...payload.payload };
        },
        addTeam: (state, payload: PayloadAction<any>) => {
            state.game = { ...state.game, teams: [...state.game.teams, payload.payload.gameName] };
        },
        removeTeam: (state, payload: PayloadAction<any>) => {
            state.game = { ...state.game, teams: [...state.game.teams.filter(team => team !== payload.payload)] };
        },
        resetState: () => initialState
    },
});

export const { nextStep, previousStep, openModal, closeModal, resetState, setGame, addTeam, removeTeam } = gameSlice.actions;
export const gameReducer = gameSlice.reducer;