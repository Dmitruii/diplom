"use client"

import { HiBadgeCheck } from "react-icons/hi";

interface IStep {
    isComplete?: boolean
    isLast?: boolean
    index: number
    title: string
}

const Step = ({isComplete, isLast, index, title}: IStep) => {
    return <li className={`${isComplete && 'text-blue-600 dark:text-blue-500'} flex items-center ${!isLast && "md:w-full sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700"}`}>
        <span className={`${isComplete && 'gap-2'} flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500`}>
            {isComplete ? <HiBadgeCheck size={20} /> : <span className="me-2">{index+1}</span>}
            <span>{title}</span>
        </span>
    </li>
}

export default Step