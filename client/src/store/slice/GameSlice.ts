import { IGame, IGamePLayer, IGameTeam, IGroup } from "@/lib/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IGameState {
    activeStep: number,
    isModalOpen: boolean
    isSolo: boolean
    game: IGame
    groups: IGroup[],
}

const initialState: IGameState = {
    activeStep: 1,
    isModalOpen: false,
    isSolo: false,
    game: {
        game: '',
        gameTitle: '',
        teams: [],
        soloPLayers: []
    },
    groups: []
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
        openCancelModal: (state) => {
            state.isModalOpen = true;
        },
        closeCancelModal: (state) => {
            state.isModalOpen = false;
        },
        setGame: (state, payload: PayloadAction<any>) => {
            state.game = { ...state.game, ...payload.payload };
        },
        addTeam: (state, payload: PayloadAction<IGameTeam>) => {
            state.game.teams.push(payload.payload)
        },
        removeTeam: (state, payload: PayloadAction<any>) => {
            state.game.teams = state.game.teams.filter(({ name }) => name !== payload.payload);
        },
        isSolo: (state) => {
            state.isSolo = true;
        },
        addPlayer: (state, payload: PayloadAction<{ team?: string, player: IGamePLayer }>) => {
            if (payload.payload.team) {
                state.game.teams.forEach(team => team.name === payload.payload.team ? team.players.push(payload.payload.player) : team)
            } else {
                state.game.soloPLayers.push(payload.payload.player)
            }
        },
        removePlayer: (state, payload: PayloadAction<{ team?: string, player: IGamePLayer }>) => {
            if (payload.payload.team) {
                state.game.teams = state.game.teams.map(team =>
                    team.name === payload.payload.team ?
                        { ...team, players: team.players.filter(player => player.name !== payload.payload.player.name) }
                        : team
                )
            } else {
                state.game.soloPLayers = state.game.soloPLayers.filter(player => player.name !== payload.payload.player.name);
            }
        },
        setGroups: (state, payload: PayloadAction<IGroup[]>) => {
            state.groups = payload.payload
        },
        resetState: () => initialState
    },
});

export const {
    nextStep,
    previousStep,
    openCancelModal,
    closeCancelModal,
    resetState,
    setGame,
    addTeam,
    removeTeam,
    isSolo,
    addPlayer,
    removePlayer,
    setGroups
} = gameSlice.actions;
export const gameReducer = gameSlice.reducer;