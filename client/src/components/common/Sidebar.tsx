"use client"
import { Sidebar } from 'flowbite-react';
import { Dispatch, SetStateAction } from 'react';
import { HiChartPie, HiInbox, HiShoppingBag, HiUser } from 'react-icons/hi';
import { HiMenu } from "react-icons/hi";
import BurgerSidebarButton from './BurgerSidebarButton';

interface ISidebarComp {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

const SidebarComp = ({isOpen, setIsOpen}: ISidebarComp) => {
    return <>
    <Sidebar className={`z-[2] top-0 bottom-0 left-0 right-0 absolute duration-200 ${!isOpen && '-translate-x-[100%]'}`} aria-label="Sidebar">
      <div className='mb-5 px-2 flex justify-between items-center'>
        <BurgerSidebarButton setIsOpen={setIsOpen} />
        <Sidebar.Logo className='mb-0' href="#" img="/logo.svg" imgAlt="Logo">
          E-Sportech
        </Sidebar.Logo>
      </div>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="#" icon={HiChartPie}>
            Players
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiInbox}>
            Games
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiUser}>
            Location
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiShoppingBag}>
            Notifications
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>

    <div onClick={() => setIsOpen(prev => !prev)}
      className={`top-0 bottom-0 left-0 right-0 absolute bg-gray-600 duration-200 ${!isOpen ? 'opacity-0 overflow-hidden invisible' : 'opacity-50'}`}></div>
  </>
}

export default SidebarComp