import { BaseSyntheticEvent } from "react"
import BottomBarButtons from "../BottomBarButtons"
import FormInput from "@/components/form/FormInput"
import { Button } from "flowbite-react"
import { SubmitHandler, useForm } from "react-hook-form"
import { addTeam, nextStep } from "@/store/slice/GameSlice"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import TeamList from "./team/TeamList"

type Inputs = {
    gameName: string
}

const CreateTeam = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError
    } = useForm<Inputs>()
    const dispatch = useAppDispatch()
    const teams = useAppSelector((state) => state.game.game.teams)

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        let errorSet = false; 

        for (let i = 0; i < teams.length; i++) {
            if (teams[i] === data.gameName) {
                setError('gameName', { type: 'repeat' })
                errorSet = true;
                break
            }
        }

        if (!errorSet) {
            dispatch(addTeam(data));
        }
    }
    
    return <div className="my-10 h-full flex flex-col justify-between items-center w-full">
        <div className="gap-10 w-full h-full flex items-center justify-center">
            <form 
                onSubmit={handleSubmit(onSubmit)} 
                className="w-1/3 gap-5 flex flex-col items-center justify-center"
            >
                <h1 className="text-2xl font-semibold ">Create Teams</h1>
                <div className="w-full flex flex-col gap-5">
                    <FormInput 
                        rest={{...register("gameName", { required: true })}}
                        errors={errors.gameName}
                        placeholder="NAVI" 
                        label="Command name"
                    />
                    <Button 
                        type="submit" 
                        className="text-nowrap" 
                        color="blue"
                    >Add Team</Button>
                </div>
            </form>

            <TeamList />
        </div>

        <BottomBarButtons 
            isTeam
            onSubmit={() => dispatch(nextStep())}
            isValid={!!teams.length}        
        />
    </div>
}

export default CreateTeam