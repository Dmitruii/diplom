import Stepper from "../game/stepper/Stepper"

interface INewGameLayout {
    children: React.ReactNode
}

const NewGameLayout = ({
    children,
}: INewGameLayout) => {
    return <div className="py-5 h-full flex flex-col justify-between items-center mx-auto container">
        <Stepper />
        {children}
    </div>
}

export default NewGameLayout