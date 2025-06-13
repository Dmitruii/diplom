import dynamic from "next/dynamic";

export const metadata = {
  title: "Tournaments",
};

const Tournaments = dynamic(
  () => import("@/components/tournaments/TournamentsPageContent"),
  {
    ssr: false,
  }
);

export default Tournaments;
