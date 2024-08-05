import { MatchComponentProps } from "@g-loot/react-tournament-brackets/dist/src/types";
import MatchItem from "./MatchItem";

const Match = ({
  match,
  topParty,
  bottomParty,
  teamNameFallback,
  resultFallback,
}: MatchComponentProps) => {
  return (
    <div className="border-2 flex flex-col gap-1 px-4 py-2">
      <div className="flex h-10 items-center">
        <MatchItem
          match={match}
          party={topParty}
          teamNameFallback={teamNameFallback}
          resultFallback={resultFallback}
        />
      </div>

      <div className="flex h-10 items-center">
        <MatchItem
          match={match}
          party={bottomParty}
          teamNameFallback={teamNameFallback}
          resultFallback={resultFallback}
        />
      </div>
    </div>
  );
};

export default Match;
