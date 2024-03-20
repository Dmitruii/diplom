import { RxCross2 } from "react-icons/rx";

interface ITeam {
    label: string
    onRemove: any
}

const Player = ({label, onRemove}: ITeam) => {
    return <div className="flex justify-between items-center w-full border-2 border rounded-lg py-2 px-4">
        <h1 className="font-semibold">{label}</h1>
        
        <div 
            onClick={() => onRemove()}
            className="hover:bg-gray-300 rounded duration-100 cursor-pointer"
        >
            <RxCross2
                size={30}
            />
        </div>
    </div>
}

export default Player