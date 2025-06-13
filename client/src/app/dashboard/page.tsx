import dynamic from "next/dynamic";

export const metadata = {
  title: "Dashboard",
};

const Dashboard = dynamic(
  () => import("@/components/dashboard/DashboardPageContent"),
  {
    ssr: false,
  }
);

export default Dashboard;
