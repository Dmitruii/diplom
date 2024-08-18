export type IFilterTypes = "select" | "multiselect" | "textinput";

export interface IFilter {
  type: IFilterTypes;
  label: string;
  placeholder?: string;
  options?: IOption[];
}

export interface IOption {
  label: string;
  value: any;
}

export interface IGamePLayer {
  name: string;
  id?: string;
}

export interface IGame {
  game: IOption | null;
  gameTitle: string;
  yourGame?: string;
  teams: IGameTeam[];
  soloPLayers: IOption[];
  optionsSoloPlayers: IOption[];
  activePlayersOptions: IOption[];
  playersOptions: IOption[];
  teamOptions: IOption[];
  location: IOption | null;
}

export interface IGameTeam {
  id: string;
  name: string;
  players: IOption[];
}

export interface ISelectOption {
  value?: any;
  label: any;
}

export interface IGroup {
  label: string;
  players: IGamePLayer[];
}

export interface IFirstRound {
  title: string;
  seeds: any[];
}

export interface IRound {
  matchId: Pick<IMatch, "matchId">;
  title: string;
}

export interface IMatch {
  players: [IGamePLayer, IGamePLayer] | [];
  matchId: number;
}

export interface ITournamentMatch {
  // contestant1_score: boolean;
  // collection: {
  //   collection: string;
  //   id: number;
  //   item: string;
  //   matches_id: number;
  // }[];
  // contestant2_score: boolean;
  // id: number;
  // next_match_id: number;
  // round_num: number;
  // tournament_id: number;
  // winner_user_id: number;
  id: number;
  next_match_id: number;
  round_num: number;
  tournament_id: number;
  winner_id: {
    collection: string;
    id: number;
    item: string;
    matches_id: number;
  };
  collection: {
    collection: string;
    id: number;
    item: any;
    matches_id: any;
  }[];
}

export interface IBrackets {
  id: string | number;
  nextMatchId: number | null;
  participants: IParticipant[];
  tournamentRoundText: string;
}

export interface IParticipant {
  id: string | number;
  resultText: "Lose" | "Win";
  isWinner: boolean;
  name: string;
}

export type IToastModalTypes = "success" | "warning" | "error" | null;

export interface IToast {
  label: string;
  type: IToastModalTypes;
}

export interface ITournament {
  admin_id: {
    first_name: string;
  };
  date_created: string;
  games_id: {
    name: string;
  };
  id: number;
  location: {
    title: string;
  };
  name: string;
  winner_id: any;
}

export interface IUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  location: string;
  title: string;
  description: string;
  tags: any;
  avatar: string;
  language: string;
  appearance: string;
  tfa_secret: string;
  status: string;
  role: string;
  token: string | null;
  last_access: string;
  last_page: string;
}
