"use client";

import BottomBarButtons from "../BottomBarButtons";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect, useId, useLayoutEffect, useState } from "react";
import { createFirstTour } from "@/store/slice/GameSlice";
import CustomSeed from "./bracket/Seed";
import {
  SingleEliminationBracket,
  Match,
} from "@g-loot/react-tournament-brackets";
import client from "@/directus/api";
import { readItems } from "@directus/sdk";
import tournaments from "@/utils/tournaments";
import { WhiteTheme } from "@/lib/data";

const FirstTour = () => {
  const dispatch = useAppDispatch();
  const round = useAppSelector((state) => state.game.tour.round);
  const items: any = "matches";
  const [simpleSmallBracket, setSimpleSmallBracket] = useState<any>([]);

  const fetchMatches = async () => {
    const matches: any = await client.request(
      readItems(items, {
        fields: [
          "*",
          { contestant2_user_id: ["id", "first_name"] },
          { contestant1_user_id: ["id", "first_name"] },
        ],
      })
    );
    setSimpleSmallBracket(tournaments(matches));
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  // useLayoutEffect(() => {
  //   dispatch(createFirstTour({
  //     round: {
  //       matchId: Pick<IMatch, 'matchId'>
  //       title: string
  //     },
  //     match: {}
  //   }))·
  // }, [])

  // Run the tournament and log the results
  // [...(round[0]?.matchs)].map(match => ({...match, players}))

  console.log(simpleSmallBracket);

  return (
    <div className="min-h-full gap-5 flex flex-col justify-between items-center w-full">
      <div className="w-full overflow-scroll flex items-center justify-center">
        {simpleSmallBracket.length && (
          <SingleEliminationBracket
            matches={simpleSmallBracket}
            matchComponent={Match}
            theme={WhiteTheme}
            options={{
              style: {
                roundHeader: {
                  backgroundColor: WhiteTheme.roundHeader.backgroundColor,
                  fontColor: WhiteTheme.roundHeader.fontColor,
                },
                connectorColor: WhiteTheme.connectorColor,
                connectorColorHighlight: WhiteTheme.connectorColorHighlight,
              },
            }}
          />
        )}
      </div>

      <BottomBarButtons isValid={true} />
    </div>
  );
};

export default FirstTour;
