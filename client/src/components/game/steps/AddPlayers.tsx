import { Button } from "flowbite-react"
import BottomBarButtons from "../BottomBarButtons"
import { addPlayer, setGroups } from "@/store/slice/GameSlice"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { SubmitHandler, useForm } from "react-hook-form"
import FormInput from "@/components/form/FormInput"
import PlayerList from "./player/TeamList"
import { Groups } from "@/lib/data"
import { useEffect } from "react"
import usePlayersOptions from "@/hooks/usePlayersOptions"

export type Inputs = {
    group: string
    player: string
    team: string
}

const AddPlayers = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>()
    const dispatch = useAppDispatch()
    const soloPlayers = useAppSelector(state => state.game.game.soloPLayers)
    const groups = useAppSelector(state => state.game.groups)
    const teams = useAppSelector(state => state.game.game.teams)
    const isSolo = useAppSelector(state => state.game.isSolo)

    const chosenGroup = watch('group')
    const chosenPlayer = watch('player')
    const chosenTeam = watch('team')

    const playersOptions = usePlayersOptions(chosenGroup)


    const onSubmit: SubmitHandler<Inputs> = (data) => {
        dispatch(addPlayer({team: data.team, player: JSON.parse(data.player)}))
    }

    useEffect(() => {
        dispatch(setGroups(Groups))
    }, [])

    return <div className="my-10 h-full flex flex-col justify-between items-center w-full">
        <div className="gap-10 w-full h-full flex items-center justify-center">
            <form 
                onSubmit={handleSubmit(onSubmit)} 
                className="w-1/3 gap-5 flex flex-col items-center justify-center"
            >
                <h1 className="text-2xl font-semibold ">Add Players</h1>
                <div className="w-full flex flex-col gap-5">
                    <FormInput 
                        rest={{...register("group", { required: true })}}
                        errors={errors.group}
                        type='Select'
                        placeholder="NAVI" 
                        label="Group"
                        options={groups.map(({label}) => ({ label }))}
                    />
                    
                    <FormInput 
                        rest={{
                            ...register("player", { required: true }),
                            disabled: !chosenGroup
                        }}
                        errors={errors.player}
                        type='Select'
                        placeholder="Lysa the Star-navigator"
                        label={`Players from the ${chosenGroup && `${chosenGroup} class`}`}
                        options={playersOptions}
                    />

                    {!isSolo && <FormInput 
                        rest={{
                            ...register("team", { required: true }),
                            disabled: !chosenPlayer
                        }}
                        errors={errors.player}
                        type='Select'
                        placeholder="NAVI"
                        label={`Team`}
                        options={teams.map(team => ({ label: team.name }))}
                    />}

                    <Button 
                        type="submit" 
                        className="text-nowrap" 
                        color="blue"
                        disabled={!isSolo ? !chosenTeam : !chosenPlayer}
                    >Add Player</Button>
                </div>
            </form>

            <PlayerList />
        </div>

        <BottomBarButtons 
            isValid={!isSolo ? teams.every(team => team.players.length > 0) : !!(soloPlayers.length >= 2)}        
        />
    </div>
}

export default AddPlayers