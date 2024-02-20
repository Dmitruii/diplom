import { StartNewGame } from "@/components/common/Sidebar"
import DashboardLayout from "@/components/layouts/DashboardLayout"

const Dashboard = () => {
    return <>
      <DashboardLayout>

      <div className="flex h-full items-center justify-center">
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-xl font-semibold">No games</h1>
            <StartNewGame />  
        </div>
      </div>
      
      </DashboardLayout>
    </>
}

export default Dashboard