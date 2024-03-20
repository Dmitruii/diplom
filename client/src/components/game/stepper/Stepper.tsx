import { useAppSelector } from "@/store/hooks";
import Step from "./Step"

const Stepper = () => {
    const activeStep = useAppSelector((state) => state.game.activeStep);
    const steps = ['Game Setup', 'Create Team', 'Add Players', 'Location', 'First Tour', 'Game Review']

    return <ol className="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
        {steps.map((vol, i) => <Step 
            key={vol} 
            title={vol} 
            index={i} 
            isLast={steps.length == i+1} 
            isComplete={activeStep > i}
            isProgress={activeStep === i}
        />)}
    </ol>
}

export default Stepper