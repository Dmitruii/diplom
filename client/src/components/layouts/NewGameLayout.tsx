import BottomBarButtons from "../game/BottomBarButtons"
import Stepper from "../game/stepper/Stepper"

interface INewGameLayout {
    children: React.ReactNode
}

const NewGameLayout = ({
    children,
}: INewGameLayout) => {
    return <div className="flex flex-col justify-between items-center h-full mx-auto container py-5">
        <Stepper />
        {children}
        <BottomBarButtons/>
    </div>
}

export default NewGameLayout