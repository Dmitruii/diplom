import { Button } from "flowbite-react"
import Link from "next/link"

const BottomBarButtons = () => {
    return <div className="w-full flex justify-between">
        <div className="flex gap-2">
            <Button color="failure">
                <Link href='/dashboard'>Canel</Link>
            </Button>
            <Button color="light">Back</Button>
        </div>
        <Button color="blue">Next Step</Button>
    </div>
}

export default BottomBarButtons