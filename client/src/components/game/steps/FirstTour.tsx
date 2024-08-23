"use client";

import BottomBarButtons from "../BottomBarButtons";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { SingleEliminationBracket } from "@g-loot/react-tournament-brackets";
import {
  createTournamentBracketsSolo,
  createTournamentBracketsTeam,
} from "@/utils/createTournamentBrackets";
import {
  isSolo,
  setBrackets,
  setOptionsSoloPlayers,
} from "@/store/slice/GameSlice";
import { Match as IMatch } from "@g-loot/react-tournament-brackets/dist/src/types";
import Match from "./bracket/Match";

const FirstTour = () => {
  const dispatch = useAppDispatch();
  const soloPLayers = useAppSelector((state) => state.game.game.soloPLayers);
  const game = useAppSelector((state) => state.game.game);
  const isSolo = useAppSelector((state) => state.game.isSolo);
  const optionsSoloPlayers = useAppSelector(
    (state) => state.game.game.optionsSoloPlayers
  );
  const brackets = useAppSelector((state) => state.game.brackets);
  const newBrakets = JSON.parse(JSON.stringify(brackets));

  const fetchMatches = async () => {
    // const matches: any = await client.request(
    //   readItems(entities.matches, {
    //     fields: [
    //       "*",
    //       { contestant2_user_id: ["id", "first_name"] },
    //       { contestant1_user_id: ["id", "first_name"] },
    //     ],
    //   })
    // );
    // setSimpleSmallBracket(tournaments(matches));
  };

  const setBrakets = () => {
    let brackets: any = [];
    if (isSolo) {
      brackets = createTournamentBracketsSolo(soloPLayers);
    } else {
      brackets = createTournamentBracketsTeam(game);
    }
    dispatch(setBrackets(brackets));
  };

  useEffect(() => {
    dispatch(setOptionsSoloPlayers());
    setBrakets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-full gap-5 flex flex-col justify-between items-center w-full">
      <div className="w-full overflow-scroll flex items-center justify-center">
        {newBrakets.length > 0 && (
          <SingleEliminationBracket
            matches={newBrakets as IMatch[]}
            matchComponent={Match}
          />
        )}
      </div>

      <BottomBarButtons isValid={optionsSoloPlayers.length === 1} />
    </div>
  );
};

export default FirstTour;
