import dynamic from "next/dynamic";

const NewGame = dynamic(() => import("@/components/game/NewGamePageContent"), {
  ssr: false,
});

export default NewGame;
