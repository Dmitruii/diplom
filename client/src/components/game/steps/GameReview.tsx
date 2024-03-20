import BottomBarButtons from "../BottomBarButtons"

const GameReview = () => {
    return <div className="my-10 h-full flex flex-col justify-between items-center w-full">
        <div className="w-full h-full flex items-center justify-center">
            <h1 className="text-2xl font-semibold ">Game Review</h1>
        </div>

        <BottomBarButtons isValid={true} />
    </div>
} 

export default GameReview