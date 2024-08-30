import dynamic from "next/dynamic";

const Dashboard = dynamic(
  () => import("@/components/dashboard/DashboardPageContent"),
  {
    ssr: false,
  }
);

export default Dashboard;
