import { ITournamentMatch } from "@/lib/types";
import createMatch from "./createMatch";

const tournaments = (matches: ITournamentMatch[]) => {
  const tournamentMatches: any[] = [];

  matches.forEach(
    ({
      id,
      next_match_id,
      contestant1_user_id,
      contestant2_user_id,
      round_num,
    }) => {
      tournamentMatches.push(
        createMatch({
          id,
          nextMatchId: next_match_id,
          contestant1_user_id,
          contestant2_user_id,
          round_num,
        })
      );
    }
  );

  return tournamentMatches;
};

export default tournaments;
