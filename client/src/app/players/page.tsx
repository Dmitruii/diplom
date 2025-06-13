import dynamic from "next/dynamic";

export const metadata = {
  title: "Players",
};

const Players = dynamic(
  () => import("@/components/players/PlayersContentPage"),
  {
    ssr: false,
  }
);

export default Players;
