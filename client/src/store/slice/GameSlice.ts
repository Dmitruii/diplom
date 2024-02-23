import { createSlice } from "@reduxjs/toolkit";
import { redirect } from "next/navigation";

export interface IGameState {
    activeStep: number,
    isModalOpen: boolean
}

const initialState: IGameState = {
    activeStep: 0,
    isModalOpen: false,
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
        resetState: () => initialState
    },
});

export const { nextStep, previousStep, openModal, closeModal, resetState } = gameSlice.actions;
export const gameReducer = gameSlice.reducer;