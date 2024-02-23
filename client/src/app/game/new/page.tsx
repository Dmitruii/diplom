'use client'
import AddPlayers from "@/components/game/steps/AddPlayers"
import CreateTeam from "@/components/game/steps/CreateTeam"
import FirstTour from "@/components/game/steps/FirstTour"
import GameSetup from "@/components/game/steps/GameSetup"
import LocationStep from "@/components/game/steps/Location"
import NewGameLayout from "@/components/layouts/NewGameLayout"
import GameCancelModal from "@/components/modal/GameCancelModal"
import { useAppSelector } from "@/store/hooks"

const New = () => {
    const activeStep = useAppSelector((state) => state.game.activeStep);

    function getSectionComponent() {
        switch(activeStep) {
            case 0: return <GameSetup/>;
            case 1: return <CreateTeam/>;
            case 2: return <AddPlayers/>;
            case 3: return <LocationStep/>;
            case 4: return <FirstTour/>;
            default: return null;
        }
      }

    return <NewGameLayout>
        <>
            {getSectionComponent()}
            <GameCancelModal />
        </>
    </NewGameLayout>
}

export default New