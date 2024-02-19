'use client'
import { Button, TextInput } from "flowbite-react"
import FilterItem from "./FilterItem"
import { HiChevronDown } from "react-icons/hi";
import { HiChevronUp } from "react-icons/hi";
import { useState } from "react";
import { PlayerFilters } from "@/lib/data";

const Filter = () => {
    const [isHide, setIsHide] = useState(false)

    return <>
        <div className="flex justify-between">
            <h1 className="text-3xl font-semibold">Filter</h1>
            <div className="flex gap-3">
                <TextInput className="w-60" placeholder="Player" />
                <Button onClick={() => setIsHide(prev => !prev)} color="blue">
                    Filter
                    {isHide ? <HiChevronUp className="ml-1 h-5 w-5" /> : <HiChevronDown className="ml-1 h-5 w-5" />}
                </Button>
            </div>
        </div>

        <div className={`grid grid-cols-5 gap-5 ${isHide && 'overflow-hidden invisible absolute'}`}>
            {PlayerFilters.map(({label, placeholder, options, type}) => <FilterItem 
                key={label}
                label={label}
                placeholder={placeholder}
                options={options}
                type={type}
            />)}
        </div>
    </>
}

export default Filter