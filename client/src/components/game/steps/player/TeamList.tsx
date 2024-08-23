import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Player from "./Player";
import { removePlayer, setActivePlayersOptions } from "@/store/slice/GameSlice";
import { IOption } from "@/lib/types";

const PlayerList = () => {
  const soloPlayers = useAppSelector((state) => state.game.game.soloPLayers);
  const teams = useAppSelector((state) => state.game.game.teams);
  const playersOptions = useAppSelector(
    (state) => state.game.game.playersOptions
  );
  const activePlayersOptions = useAppSelector(
    (state) => state.game.game.activePlayersOptions
  );
  const dispatch = useAppDispatch();

  const onRemove = (teamName: string, playerId: string) => {
    dispatch(removePlayer({ team: teamName, player: playerId }));
    dispatch(
      setActivePlayersOptions({
        options: [
          ...activePlayersOptions,
          ...playersOptions.filter((option: any) => option.value === playerId),
        ],
      })
    );
  };

  return (
    <div className="w-1/3 max-h-96 overflow-scroll flex flex-col gap-3">
      {teams.map((team) => (
        <div key={team.name} className="border-2 p-3 rounded-lg">
          <h1 className="mb-3">{team.name}</h1>

          <div className="flex flex-col gap-2">
            {team.players.map((player: any) => (
              <Player
                onRemove={() => onRemove(team.name, player.value)}
                label={player.label}
                key={player.label}
              />
            ))}
          </div>
        </div>
      ))}

      {soloPlayers.map((player: any) => (
        <Player
          key={player.label}
          label={player.label}
          onRemove={() => dispatch(removePlayer({ player: player.value }))}
        />
      ))}
    </div>
  );
};

export default PlayerList;
