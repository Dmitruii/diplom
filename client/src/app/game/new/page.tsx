import dynamic from "next/dynamic";

export const metadata = {
  title: "Create tournament",
};

const NewGame = dynamic(() => import("@/components/game/NewGamePageContent"), {
  ssr: false,
});

export default NewGame;
