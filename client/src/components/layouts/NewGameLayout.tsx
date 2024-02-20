import BottomBarButtons from "../game/BottomBarButtons"
import Stepper from "../game/stepper/Stepper"

const NewGameLayout = ({
    children
}: {
    children: React.ReactNode
  }) => {
    return <div className="flex flex-col justify-between items-center h-full mx-auto container py-5">
        <Stepper />
        {children}
        <BottomBarButtons />
    </div>
}

export default NewGameLayout