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
  id?: number;
}

export interface IGame {
  game: string;
  gameTitle: string;
  yourGame?: string;
  teams: IGameTeam[];
  soloPLayers: IGamePLayer[];
}

export interface IGameTeam {
  name: string;
  players: IGamePLayer[];
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

// Tour
export interface ITour {
  round: IRound;
  matches: IMatch[];
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
  contestant1_score: boolean;
  contestant1_user_id: {
    id: number;
    first_name: string;
  };
  contestant2_user_id: {
    id: number;
    first_name: string;
  };
  contestant2_score: boolean;
  id: number;
  next_match_id: number;
  round_num: number;
  tournament_id: number;
  winner_user_id: number;
}
