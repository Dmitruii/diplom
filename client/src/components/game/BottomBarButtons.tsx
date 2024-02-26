import { useAppDispatch } from "@/store/hooks";
import { nextStep, openModal, previousStep } from "@/store/slice/GameSlice";
import { Button } from "flowbite-react"

const BottomBarButtons = () => {
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
        <Button 
            color="blue"
            onClick={() => dispatch(nextStep())}
        >Next Step</Button>
    </div>
}

export default BottomBarButtons