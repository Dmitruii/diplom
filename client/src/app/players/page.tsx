import dynamic from "next/dynamic";

const Players = dynamic(
  () => import("@/components/players/PlayersContentPage"),
  {
    ssr: false,
  }
);

export default Players;
