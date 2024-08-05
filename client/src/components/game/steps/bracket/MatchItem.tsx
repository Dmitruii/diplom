import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { MatchComponentProps } from "@g-loot/react-tournament-brackets/dist/src/types";
import MatchSelect from "./MatchSelect";
import {
  addOptionsSoloPlayers,
  removeParticipantFromBrackets,
} from "@/store/slice/GameSlice";

interface MatchItemProps
  extends Pick<
    MatchComponentProps,
    "match" | "teamNameFallback" | "resultFallback"
  > {
  party: MatchComponentProps["topParty" | "bottomParty"];
}

const MatchItem = ({
  match,
  party,
  teamNameFallback,
  resultFallback,
}: MatchItemProps) => {
  const soloPLayers = useAppSelector(
    (state) => state.game.game.optionsSoloPlayers
  );
  const isSolo = useAppSelector((state) => state.game.isSolo);
  const game = useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();

  return (
    match.tournamentRoundText === "Round 1" &&
    (party.name === "TBD" ? (
      <MatchSelect options={soloPLayers} matchId={match.id} />
    ) : (
      <div className="flex w-full justify-between items-center">
        <div className="flex items-center">
          <div>{party.name || teamNameFallback}</div>
          <div>{party.resultText ?? resultFallback(party)}</div>
        </div>
        <span
          className="cursor-pointer"
          onClick={() => {
            dispatch(
              removeParticipantFromBrackets({
                matchId: match.id,
                participantId: party.id,
              })
            );
            dispatch(addOptionsSoloPlayers({ participantId: party.id }));
          }}
        >
          X
        </span>
      </div>
    ))
  );
};

export default MatchItem;
