import { ITournamentMatch } from "@/lib/types";
import createMatch from "./createMatch";

const tournaments = (matches: ITournamentMatch[]) => {
  const tournamentMatches: any[] = [];

  matches.forEach(({ id, next_match_id, round_num, collection }) => {
    tournamentMatches.push(
      createMatch({
        id,
        nextMatchId: next_match_id,
        contestant1_user_id: collection[0],
        contestant2_user_id: collection[1],
        round_num,
      })
    );
  });

  return tournamentMatches;
};

export default tournaments;
