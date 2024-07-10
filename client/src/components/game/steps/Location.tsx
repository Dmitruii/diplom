import BottomBarButtons from "../BottomBarButtons"

const LocationStep = () => {
    return <div className="h-full flex flex-col justify-between items-center w-full">
        <div className="w-full h-full flex items-center justify-center">
            <h1 className="text-2xl font-semibold ">Location</h1>
        </div>

        <BottomBarButtons isValid={true} />
    </div>
}

export default LocationStep