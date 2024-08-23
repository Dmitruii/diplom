"use client";

import GameMatch from "@/components/game/steps/bracket/GameMatch";
import client from "@/directus/api";
import { entities } from "@/lib/data";
import { ITournament } from "@/lib/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setAdmin,
  setMatches,
  setPlayersType,
} from "@/store/slice/TournamentSlice";
import tournaments from "@/utils/tournaments";
import { readItem, readItems } from "@directus/sdk";
import { SingleEliminationBracket } from "@g-loot/react-tournament-brackets";
import { Button } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Game = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const matches = useAppSelector((state) => state.tournament.matches);
  const newMatches = JSON.parse(JSON.stringify(matches));

  const isValidFinal = () => {
    const finalMatch = matches.find((match) => match.nextMatchId === null);

    if (finalMatch) {
      if (Object.keys(finalMatch.participants[0]).length !== 0) {
        if (Object.keys(finalMatch.participants[1]).length !== 0) {
          return false;
        }
      }
    }
    return true;
  };
  const isValid = isValidFinal();

  const fetch = async () => {
    const tournament = await client.request(
      readItem(entities.tournaments, params.id)
    );
    dispatch(setAdmin(tournament.admin_id));
    const data = await client.request(
      readItems(entities.matches, {
        filter: {
          _and: [
            {
              tournament_id: {
                _eq: params.id,
              },
            },
          ],
        },
        fields: ["*", "collection.*.*", "winner_id.*"],
      })
    );
    dispatch(setMatches(tournaments(data as any)));
    dispatch(setPlayersType(data));
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center px-10 py-5">
      <div className="w-full flex justify-between">
        <Button
          className="justify-self-start"
          color="blue"
          onClick={() => router.back()}
        >
          Back
        </Button>

        <Button
          disabled={isValid}
          className="justify-self-start"
          color="blue"
          onClick={() => router.push(`${window.location.pathname}/final`)}
        >
          Final
        </Button>
      </div>
      {newMatches.length > 0 && (
        <SingleEliminationBracket
          matches={newMatches}
          matchComponent={GameMatch}
        />
      )}
    </div>
  );
};

export default Game;
