import { IUser } from "@/lib/types";
import { useAppSelector } from "@/store/hooks";

// if a player is in the team, we remove that player from the player's select
const usePlayersOptions = (chosenGroup: string) => {
  const groups = useAppSelector((state) => state.game.groups);
  const soloPlayers = useAppSelector((state) => state.game.game.soloPLayers);
  const teams = useAppSelector((state) => state.game.game.teams);
  const isSolo = useAppSelector((state) => state.game.isSolo);

  const groupPLayers = groups.filter(({ label }) => label === chosenGroup)[0]
    ?.players;
  const soloPlayersOptions = isSolo
    ? groupPLayers?.filter(
        (player) =>
          !soloPlayers.filter((soloPlayer: any) => soloPlayer.id === player.id)
            .length
      )
    : groupPLayers?.filter(
        (player) =>
          !teams.filter(
            ({ players }) =>
              (players.filter(({ id }: any) => id === player.id) as any)[0]?.id
          ).length
      );

  return soloPlayersOptions?.map((player) => ({
    label: player.name,
    value: player,
  }));
};

export default usePlayersOptions;
