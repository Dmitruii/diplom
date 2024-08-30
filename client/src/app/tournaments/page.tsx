import dynamic from "next/dynamic";

const Tournaments = dynamic(
  () => import("@/components/tournaments/TournamentsPageContent"),
  {
    ssr: false,
  }
);

export default Tournaments;
