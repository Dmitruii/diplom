import { MatchComponentProps } from "@g-loot/react-tournament-brackets/dist/src/types";
import { useAppSelector } from "@/store/hooks";
import GameMatchItem from "./GameMatchItem";

const GameMatch = ({ match }: MatchComponentProps) => {
  const matches = useAppSelector((state) => state.tournament.matches);
  const prev = findImmediatePreviousMatches(matches, match.id);

  return (
    <div className="border-2 flex flex-col gap-1 px-4 py-2">
      <div className="flex h-10 items-center">
        <GameMatchItem
          index={0}
          match={match}
          participants={prev?.[0]?.participants}
        />
      </div>

      <div className="flex h-10 items-center">
        <GameMatchItem
          index={1}
          match={match}
          participants={prev?.[1]?.participants}
        />
      </div>
    </div>
  );
};

export default GameMatch;

function findImmediatePreviousMatches(
  matches: any[],
  matchId: number | string
) {
  // Initialize an empty array to store the immediate previous matches
  const immediatePreviousMatches: any[] = [];

  // Iterate through all matches to find those whose nextMatchId is equal to the given matchId
  matches.forEach((match) => {
    if (match.nextMatchId === matchId) {
      immediatePreviousMatches.push(match);
    }
  });

  return immediatePreviousMatches;
}
