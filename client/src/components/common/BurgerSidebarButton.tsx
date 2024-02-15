import { Dispatch, SetStateAction } from "react";
import { HiMenu } from "react-icons/hi";

interface IBurgerSidebarButton {
    setIsOpen: Dispatch<SetStateAction<boolean>>
}

const BurgerSidebarButton = ({setIsOpen}: IBurgerSidebarButton) => {
    return <div 
        className=' hover:bg-gray-200 rounded duration-200 cursor-pointer'
        onClick={() => setIsOpen(prev => !prev)}
    >
        <HiMenu size={'30'}/>
    </div> 
} 

export default BurgerSidebarButton