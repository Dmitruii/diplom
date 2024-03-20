import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { isSolo, nextStep, openCancelModal, previousStep } from "@/store/slice/GameSlice";
import { Button } from "flowbite-react"

interface IBottomBarButtons {
    isValid: boolean
    isTeam?: boolean
    onClickNextStep?: any
}

const BottomBarButtons = ({isValid, isTeam, onClickNextStep}: IBottomBarButtons) => {
    const dispatch = useAppDispatch();
    const teams = useAppSelector((state) => state.game.game.teams)

    return <div className="w-full flex justify-between">
        <div className="flex gap-2">
            <Button 
                color="failure"
                onClick={() => dispatch(openCancelModal())}
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
                    dispatch(isSolo())
                    dispatch(nextStep())
                }}
                disabled={!!teams.length}
                type="submit"
                color="light"
            >No Teams (Solo players)</Button>}
            
            <Button 
                onClick={() => {
                    onClickNextStep && onClickNextStep()
                    dispatch(nextStep())
                }}
                disabled={!isValid}
                type="submit"
                color="blue"
            >Next Step</Button>
        </div>
    </div>
}

export default BottomBarButtons