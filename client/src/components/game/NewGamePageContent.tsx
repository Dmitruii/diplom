"use client";
import AddPlayers from "@/components/game/steps/AddPlayers";
import CreateTeam from "@/components/game/steps/CreateTeam";
import FirstTour from "@/components/game/steps/FirstTour";
import GameReview from "@/components/game/steps/GameReview";
import GameSetup from "@/components/game/steps/GameSetup";
import LocationStep from "@/components/game/steps/Location";
import NewGameLayout from "@/components/layouts/NewGameLayout";
import GameCancelModal from "@/components/modal/GameCancelModal";
import { useAppSelector } from "@/store/hooks";

const NewGamePageContent = () => {
  const activeStep = useAppSelector((state) => state.game.activeStep);

  function getSectionComponent() {
    switch (activeStep) {
      case 0:
        return <GameSetup />;
      case 1:
        return <CreateTeam />;
      case 2:
        return <AddPlayers />;
      case 3:
        return <LocationStep />;
      case 4:
        return <FirstTour />;
      case 5:
        return <GameReview />;
      default:
        return null;
    }
  }

  return (
    <NewGameLayout>
      <>
        <div className="h-full w-full overflow-scroll">
          {getSectionComponent()}
        </div>
        <GameCancelModal />
      </>
    </NewGameLayout>
  );
};

export default NewGamePageContent;
