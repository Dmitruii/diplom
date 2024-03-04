import { useAppDispatch } from "@/store/hooks";
import { nextStep, openModal, previousStep } from "@/store/slice/GameSlice";
import { Button } from "flowbite-react"
import { SubmitHandler } from "react-hook-form";
import { Inputs } from "./steps/GameSetup";

interface IBottomBarButtons {
    onSubmit?: any
    isValid: boolean
    isTeam?: boolean
}

const BottomBarButtons = ({isValid, isTeam, onSubmit}: IBottomBarButtons) => {
    const dispatch = useAppDispatch();

    return <div className="w-full flex justify-between">
        <div className="flex gap-2">
            <Button 
                color="failure"
                onClick={() => dispatch(openModal())}
            >
                Canel
            </Button>
            <Button 
                color="light"
                onClick={() => dispatch(previousStep())}
            >Back</Button>
        </div>

        <div className="flex gap-2">
            {isTeam && <Button 
                onClick={() => {
                    onSubmit()
                }}
                type="submit"
                color="light"
            >No Teams (Solo players)</Button>}
            
            <Button 
                onClick={() => {
                    onSubmit()
                }}
                disabled={!isValid}
                type="submit"
                color="blue"
            >Next Step</Button>
        </div>
    </div>
}

export default BottomBarButtons