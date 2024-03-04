import FormInput from "@/components/form/FormInput"
import BottomBarButtons from "../BottomBarButtons"
import { SubmitHandler, useForm } from "react-hook-form"
import { setGame } from "@/store/slice/GameSlice"
import { useAppDispatch } from "@/store/hooks"

export type Inputs = {
    gameTitle: string
    game: string
    yourGame: string
}

const GameSetup = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isValid },
    } = useForm<Inputs>()
    const dispatch = useAppDispatch()

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        dispatch(setGame(data))
    }

    const gameSelectValue = watch('game')

    return <form onSubmit={handleSubmit(onSubmit)} className="h-full flex flex-col justify-between w-full items-center">
        <div className="w-full h-full flex justify-center items-center">
            <div className="flex flex-col gap-10 w-1/3">
                <FormInput 
                    rest={{...register("gameTitle", { required: true })}}
                    label="Game Title" 
                    placeholder="SuperPuperGame" 
                    errors={errors.gameTitle}
                />

                <FormInput 
                    rest={{...register("game", { required: true })}}
                    label="Game" 
                    placeholder="CS:GO" 
                    type="Select"
                    value={gameSelectValue}
                />
                
                {gameSelectValue === 'YourGame' && <FormInput 
                    rest={{...register("yourGame", { required: true })}}
                    label="Your game"
                    placeholder="SuperPuperGame"
                    errors={errors.yourGame}
                />}
            </div>
        </div>

        <BottomBarButtons 
            isValid={isValid}
        />
    </form>
}

export default GameSetup