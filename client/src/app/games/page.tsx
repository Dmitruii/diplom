import Filter from "@/components/filter/Filter";
import TableComp from "@/components/filter/Table"
import DashboardLayout from "@/components/layouts/DashboardLayout"

const Games = () => {
    return <DashboardLayout>
        <div className="flex flex-col gap-y-10">
            <Filter />
            <TableComp />
        </div>
    </DashboardLayout>
}

export default Games