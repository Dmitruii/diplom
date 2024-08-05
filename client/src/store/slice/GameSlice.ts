import {
  IGame,
  IGamePLayer,
  IGameTeam,
  IGroup,
  IMatch,
  IRound,
  IBrackets,
  IParticipant,
  IOption,
} from "@/lib/types";
import {
  PayloadAction,
  combineSlices,
  createSlice,
  current,
} from "@reduxjs/toolkit";

export interface IGameState {
  activeStep: number;
  isModalOpen: boolean;
  isSolo: boolean;
  game: IGame;
  groups: IGroup[];
  brackets: any[];
}

const initialState: IGameState = {
  activeStep: 0,
  isModalOpen: false,
  isSolo: false,
  game: {
    game: null,
    gameTitle: "",
    teams: [
      // {
      //   name: "asdasdasd",
      //   players: [
      //     { value: "211a3609-28bd-4cb2-9bb7-2273d377d222", label: "user3" },
      //   ],
      //   id: "1722757594990",
      // },
      // {
      //   name: "123123",
      //   players: [
      //     { value: "87a39adf-dd29-40d7-b290-36134d8aa6f3", label: "user6" },
      //   ],
      //   id: "1722757596699",
      // },
      // {
      //   name: "ASD123",
      //   players: [
      //     { value: "8afdd44b-8669-40d9-8061-1c2cca4a3fc4", label: "user1" },
      //   ],
      //   id: "1722758142603",
      // },
      // {
      //   name: "123asd",
      //   players: [
      //     { value: "c42058b0-089b-4a66-ba02-40558ee9d944", label: "user5" },
      //   ],
      //   id: "1722758144698",
      // },
    ],
    soloPLayers: [
      // { value: "87a39adf-dd29-40d7-b290-36134d8aa6f31", label: "user1" },
      // { value: "8afdd44b-8669-40d9-8061-1c2cca4a3fc42", label: "user2" },
      // { value: "87a39adf-dd29-40d7-b290-36134d8aa6f313", label: "user3" },
      // { value: "8afdd44b-8669-40d9-8061-1c2cca4a3fc424", label: "user4" },
      // { value: "87a39adf-dd29-40d7-b290-36134d8aa6f35", label: "user5" },
      // { value: "8afdd44b-8669-40d9-8061-1c2cca4a3fc46", label: "user6" },
      // { value: "87a39adf-dd29-40d7-b290-36134d8aa6f317", label: "user7" },
      // { value: "8afdd44b-8669-40d9-8061-1c2cca4a3fc428", label: "user8" },
    ],
    optionsSoloPlayers: [],
    teamOptions: [],
    activePlayersOptions: [],
    playersOptions: [],
    location: null,
  },
  groups: [],
  brackets: [
    // {
    //   id: 1,
    //   nextMatchId: 3,
    //   tournamentRoundText: "Round 1",
    //   tournamentRound: 1,
    //   participants: [
    //     {
    //       id: "1722757594990",
    //       resultText: "Lose",
    //       isWinner: false,
    //       name: "asdasdasd",
    //     },
    //     {
    //       id: "1722757596699",
    //       resultText: "Lose",
    //       isWinner: false,
    //       name: "123123",
    //     },
    //   ],
    // },
    // {
    //   id: 2,
    //   nextMatchId: 3,
    //   tournamentRoundText: "Round 1",
    //   tournamentRound: 1,
    //   participants: [
    //     {
    //       id: "1722758142603",
    //       resultText: "Lose",
    //       isWinner: false,
    //       name: "ASD123",
    //     },
    //     {
    //       id: "1722758144698",
    //       resultText: "Lose",
    //       isWinner: false,
    //       name: "123asd",
    //     },
    //   ],
    // },
    // {
    //   id: 3,
    //   nextMatchId: null,
    //   tournamentRoundText: "Round 2",
    //   tournamentRound: 2,
    //   participants: [],
    // },
    // ------------------------------
    // {
    //   id: 1,
    //   nextMatchId: 5,
    //   tournamentRoundText: "Round 1",
    //   tournamentRound: 1,
    //   participants: [
    //     {
    //       id: "8afdd44b-8669-40d9-8061-1c2cca4a3fc42",
    //       resultText: "Lose",
    //       isWinner: false,
    //       name: "user2",
    //     },
    //     {
    //       id: "87a39adf-dd29-40d7-b290-36134d8aa6f313",
    //       resultText: "Lose",
    //       isWinner: false,
    //       name: "user3",
    //     },
    //   ],
    // },
    // {
    //   id: 2,
    //   nextMatchId: 5,
    //   tournamentRoundText: "Round 1",
    //   tournamentRound: 1,
    //   participants: [
    //     {
    //       id: "8afdd44b-8669-40d9-8061-1c2cca4a3fc424",
    //       resultText: "Lose",
    //       isWinner: false,
    //       name: "user4",
    //     },
    //     {
    //       id: "87a39adf-dd29-40d7-b290-36134d8aa6f35",
    //       resultText: "Lose",
    //       isWinner: false,
    //       name: "user5",
    //     },
    //   ],
    // },
    // {
    //   id: 3,
    //   nextMatchId: 6,
    //   tournamentRoundText: "Round 1",
    //   tournamentRound: 1,
    //   participants: [
    //     {
    //       id: "87a39adf-dd29-40d7-b290-36134d8aa6f31",
    //       resultText: "Lose",
    //       isWinner: false,
    //       name: "user1",
    //     },
    //     {
    //       id: "8afdd44b-8669-40d9-8061-1c2cca4a3fc46",
    //       resultText: "Lose",
    //       isWinner: false,
    //       name: "user6",
    //     },
    //   ],
    // },
    // {
    //   id: 4,
    //   nextMatchId: 6,
    //   tournamentRoundText: "Round 1",
    //   tournamentRound: 1,
    //   participants: [
    //     {
    //       id: "87a39adf-dd29-40d7-b290-36134d8aa6f317",
    //       resultText: "Lose",
    //       isWinner: false,
    //       name: "user7",
    //     },
    //     {
    //       id: "8afdd44b-8669-40d9-8061-1c2cca4a3fc428",
    //       resultText: "Lose",
    //       isWinner: false,
    //       name: "user8",
    //     },
    //   ],
    // },
    // {
    //   id: 5,
    //   nextMatchId: 7,
    //   tournamentRoundText: "Round 2",
    //   tournamentRound: 2,
    //   participants: [],
    // },
    // {
    //   id: 6,
    //   nextMatchId: 7,
    //   tournamentRoundText: "Round 2",
    //   tournamentRound: 2,
    //   participants: [],
    // },
    // {
    //   id: 7,
    //   nextMatchId: null,
    //   tournamentRoundText: "Round 3",
    //   tournamentRound: 3,
    //   participants: [],
    // },
  ],
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
      state.game.teams.push({ ...payload.payload, id: Date.now().toString() });
    },
    removeTeam: (state, payload: PayloadAction<any>) => {
      state.game.teams = state.game.teams.filter(
        ({ name }) => name !== payload.payload
      );
    },
    isSolo: (state) => {
      state.isSolo = true;
    },
    addPlayer: (
      state,
      { payload }: PayloadAction<{ team?: string; player: IOption }>
    ) => {
      if (payload.team) {
        state.game.teams.forEach((team) => {
          return team.id === payload.team
            ? team.players.push(payload.player)
            : team;
        });
      } else {
        state.game.soloPLayers.push(payload.player as any);
      }
    },
    removePlayer: (
      state,
      { payload }: PayloadAction<{ team?: string; player: string }>
    ) => {
      if (payload.team) {
        state.game.teams = state.game.teams.map((team) =>
          team.name === payload.team
            ? {
                ...team,
                players: team.players.filter((player: any) => {
                  return player.value !== payload.player;
                }),
              }
            : team
        );
      } else {
        state.game.soloPLayers = state.game.soloPLayers.filter(
          (player: any) => {
            return player.value !== payload.player;
          }
        );
      }
    },
    setGroups: (state, payload: PayloadAction<IGroup[]>) => {
      state.groups = payload.payload;
    },
    setBrackets: (state, payload: PayloadAction<IBrackets[]>) => {
      state.brackets = payload.payload;
    },
    addParticipantToBrackets: (
      state,
      {
        payload,
      }: PayloadAction<{
        participantId: IParticipant["id"];
        matchId: string | number;
      }>
    ) => {
      const participant: any = state.game.optionsSoloPlayers.find(
        (player: any) => player.value === payload.participantId
      );

      const newParticipant = {
        id: participant.value,
        resultText: "Lose",
        isWinner: false,
        name: participant.label,
      };

      const newBrakets = JSON.parse(JSON.stringify(state.brackets));

      for (let i = 0; i < newBrakets.length; i++) {
        const braket = newBrakets[i];

        if (braket.id === payload.matchId) {
          braket.participants.push(newParticipant);
        }
      }

      state.brackets = newBrakets;
    },
    removeParticipantFromBrackets: (
      state,
      {
        payload,
      }: PayloadAction<{
        participantId: IParticipant["id"];
        matchId: string | number;
      }>
    ) => {
      const newBrakets = state.brackets.map((bracket: any) => {
        if (bracket.id === payload.matchId) {
          const participants = bracket.participants.filter(
            (participant: any) => participant.id !== payload.participantId
          );
          bracket.participants = participants;
          return bracket;
        }
        return bracket;
      });
      state.brackets = newBrakets;
    },
    setOptionsSoloPlayers: (state) => {
      if (state.game.optionsSoloPlayers.length === 0) {
        if (state.isSolo) {
          state.game.optionsSoloPlayers = state.game.soloPLayers;
        } else {
          state.game.optionsSoloPlayers = state.game.teams.map((team) => ({
            value: team.id,
            label: team.name,
          }));
          state.game.teamOptions = state.game.optionsSoloPlayers;
        }
        state.game.optionsSoloPlayers.unshift({
          value: "",
          label: "Choose",
        });
      }
    },
    removeOptionsSoloPlayers: (
      state,
      {
        payload,
      }: PayloadAction<{
        participantId: IParticipant["id"];
      }>
    ) => {
      state.game.optionsSoloPlayers = state.game.optionsSoloPlayers.filter(
        (player) => player.value !== payload.participantId
      );
    },
    addOptionsSoloPlayers: (
      state,
      {
        payload,
      }: PayloadAction<{
        participantId: IParticipant["id"];
      }>
    ) => {
      let player: any = null;
      if (state.isSolo) {
        player = state.game.soloPLayers.find(
          (player) => player.value === payload.participantId
        );
      } else {
        player = state.game.teamOptions.find(
          (player) => player.value === payload.participantId
        );
      }
      state.game.optionsSoloPlayers.push(player);
    },
    setActivePlayersOptions: (
      state,
      {
        payload,
      }: PayloadAction<{
        options: IOption[];
      }>
    ) => {
      state.game.activePlayersOptions = payload.options;
    },
    setPlayersOptions: (
      state,
      {
        payload,
      }: PayloadAction<{
        options: IOption[];
      }>
    ) => {
      state.game.playersOptions = payload.options;
    },
    setLocation: (state, { payload }: PayloadAction<IOption>) => {
      state.game.location = payload;
    },
  },
});

export const {
  nextStep,
  previousStep,
  openCancelModal,
  closeCancelModal,
  setGame,
  addTeam,
  removeTeam,
  isSolo,
  addPlayer,
  removePlayer,
  setGroups,
  setBrackets,
  addParticipantToBrackets,
  removeParticipantFromBrackets,
  setOptionsSoloPlayers,
  removeOptionsSoloPlayers,
  addOptionsSoloPlayers,
  setActivePlayersOptions,
  setPlayersOptions,
  setLocation,
} = gameSlice.actions;
export const gameReducer = gameSlice.reducer;
