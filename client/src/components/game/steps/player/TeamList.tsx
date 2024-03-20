import { useAppDispatch, useAppSelector } from "@/store/hooks"
import Player from "./Player"
import { removePlayer } from "@/store/slice/GameSlice"

const PlayerList = () => {
    const soloPlayers = useAppSelector((state) => state.game.game.soloPLayers)
    const teams = useAppSelector((state) => state.game.game.teams)
    const dispatch = useAppDispatch()

    return <div className="w-1/3 max-h-96 overflow-scroll flex flex-col gap-3">
         
        {teams.map(team => <div key={team.name} className="border-2 p-3 rounded-lg"> 
            <h1 className="mb-3">{team.name}</h1>  

            <div className="flex flex-col gap-2">
                {team.players.map(({name}) => <Player 
                    onRemove={() => dispatch(removePlayer({team: team.name, player: { name }}))}
                    label={name} 
                    key={name} 
                />)}
            </div> 
        </div>)}

        {soloPlayers.map((player: any) => (
            <Player 
                key={player.name} 
                label={player.name}
                onRemove={() => dispatch(removePlayer({player: { name: player.name }}))}
            />
        ))}
    </div>
}

export default PlayerList