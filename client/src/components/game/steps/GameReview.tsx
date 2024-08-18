import { useAppDispatch, useAppSelector } from "@/store/hooks";
import BottomBarButtons from "../BottomBarButtons";
import {
  createItem,
  createItems,
  updateItem,
  updateItems,
} from "@directus/sdk";
import client from "@/directus/api";
import { entities } from "@/lib/data";
import { getUpdatedMatches } from "@/utils/getUpdatedMatches";
import { setIsLoading, setToast } from "@/store/slice/GlobalModalsSlice";
import { useRouter } from "next/navigation";

const GameReview = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const game = useAppSelector((state) => state.game.game);
  const game2 = useAppSelector((state) => state.game);
  const isSolo = useAppSelector((state) => state.game.isSolo);
  const brackets = useAppSelector((state) => state.game.brackets);
  const teams = useAppSelector((state) => state.game.game.teams);
  const location = useAppSelector((state) => state.game.game.location);

  const participants = game2.brackets
    .map((bracket) => bracket.participants)
    .flat();

  const createTournament = async () => {
    dispatch(setIsLoading(true));
    try {
      const tournament = await client.request(
        createItem(entities.tournaments, {
          admin_id: "8afdd44b-8669-40d9-8061-1c2cca4a3fc4",
          games_id: game.game?.value,
          name: game.gameTitle,
          location: location?.value,
        })
      );
      if (isSolo) {
        const matches = brackets.map((bracket) => {
          return {
            round_num: bracket.tournamentRound,
            tournament_id: tournament.id,
            collection: {
              create: bracket.participants.map((participant: any) => ({
                matches_id: "+",
                collection: "directus_users",
                item: { id: participant.id },
              })),
            },
          };
        });
        const match = await client.request(
          createItems(entities.matches, matches)
        );
        const updatedMatch = getUpdatedMatches(match);
        for (let i = 0; i < updatedMatch.length; i++) {
          const element = updatedMatch[i];
          client.request(
            updateItem(entities.matches, element.id, {
              next_match_id: element.next_match_id,
            })
          );
        }
      } else {
        const teamsPayload = teams.map((team) => {
          return {
            title: team.name,
            player: {
              create: team.players.map((player) => ({
                teams_id: "+",
                directus_users_id: {
                  id: player.value,
                },
              })),
            },
          };
        });
        const teamsRes = await client.request(
          createItems(entities.teams, teamsPayload)
        );
        const updateParticipantIds = (matches: any, teamsRes: any) => {
          // Create a map from teamsRes for quick lookup
          const idMap = new Map(
            teamsRes.map((team: any) => [team.title, team.id])
          );
          // Update participant IDs in matches
          return matches.map((match: any) => {
            return {
              ...match,
              participants: match.participants.map((participant: any) => {
                return {
                  ...participant,
                  id: idMap.get(participant.name) || participant.id, // Fallback to the original ID if not found
                };
              }),
            };
          });
        };
        const matches = updateParticipantIds(brackets, teamsRes).map(
          (bracket: any) => {
            return {
              round_num: bracket.tournamentRound,
              tournament_id: tournament.id,
              collection: {
                create: bracket.participants.map((participant: any) => ({
                  matches_id: "+",
                  collection: "teams",
                  item: { id: participant.id },
                })),
              },
            };
          }
        );
        const match = await client.request(
          createItems(entities.matches, matches)
        );
        const updatedMatch = getUpdatedMatches(match);
        for (let i = 0; i < updatedMatch.length; i++) {
          const element = updatedMatch[i];
          client.request(
            updateItem(entities.matches, element.id, {
              next_match_id: element.next_match_id,
            })
          );
        }
      }
      dispatch(
        setToast({
          label: "Tournament was created successfully",
          type: "success",
        })
      );
      router.push("/dashboard");
    } catch (e) {
      dispatch(
        setToast({
          label: "An error occurred while creating the tournament.",
          type: "error",
        })
      );
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return (
    <div className="h-full flex flex-col justify-between items-center w-full">
      <div className="gap-2 w-full h-full flex flex-col items-center justify-center">
        <h1 className="text-xl font-semibold ">
          Tournament title: {game.gameTitle}
        </h1>
        <h1 className="text-xl font-semibold ">Game: {game.game?.label}</h1>
        <h1 className="text-xl font-semibold ">Location: {location?.label}</h1>
        <div>
          <h1 className="mb-2 text-xl font-semibold">Particapants</h1>
          <ul>
            {participants.map((participant) => (
              <li key={participant.id}>{participant.name}</li>
            ))}
          </ul>
        </div>
      </div>

      <BottomBarButtons
        final
        onClickNextStep={createTournament}
        isValid={true}
        nextStepBtnLabel="Create"
      />
    </div>
  );
};

export default GameReview;
