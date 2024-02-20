import Step from "./Step"

const Stepper = () => {
    const steps = ['example', 'example', 'example', 'example', 'example']

    return <ol className="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
    {steps.map((vol, i) => <Step key={vol} title={vol} index={i} isLast={steps.length == i+1} />)}
</ol>
}

export default Stepper