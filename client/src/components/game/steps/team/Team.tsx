import { useAppDispatch } from "@/store/hooks";
import { removeTeam } from "@/store/slice/GameSlice";
import { RxCross2 } from "react-icons/rx";

interface ITeam {
    label: string
}

const Team = ({label}: ITeam) => {
    const dispatch = useAppDispatch()

    return <div className="flex justify-between items-center w-full border-2 border rounded-lg py-2 px-4">
        <h1 className="font-semibold">{label}</h1>
        
        <div 
            onClick={() => dispatch(removeTeam(label))}
            className="hover:bg-gray-300 rounded duration-100 cursor-pointer"
        >
            <RxCross2
                size={30}
            />
        </div>
    </div>
}

export default Team