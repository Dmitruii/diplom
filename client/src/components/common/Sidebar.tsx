"use client";
import { Button, Sidebar } from "flowbite-react";
import { Dispatch, SetStateAction } from "react";
import { GiConsoleController } from "react-icons/gi";
import BurgerSidebarButton from "./BurgerSidebarButton";
import {
  HiLocationMarker,
  HiOutlineUserGroup,
  HiOutlineMail,
} from "react-icons/hi";

import SidebarLink from "./SidebarLink";
import Link from "next/link";

interface ISidebarComp {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const SidebarComp = ({ isOpen, setIsOpen }: ISidebarComp) => {
  return (
    <>
      <Sidebar
        className={`z-[4] top-0 bottom-0 left-0 right-0 absolute duration-200 ${
          !isOpen && "-translate-x-[100%]"
        }`}
        aria-label="Sidebar"
      >
        <div className="mb-5 px-2 flex justify-between items-center">
          <BurgerSidebarButton setIsOpen={setIsOpen} />
          <Sidebar.Logo className="mb-0" href="#" img="/logo.svg" imgAlt="Logo">
            E-Sportech
          </Sidebar.Logo>
        </div>
        <div className="" data-testid="flowbite-sidebar-items">
          <ul
            data-testid="flowbite-sidebar-item-group"
            className="mt-4 space-y-2 border-t border-gray-200 pt-4 first:mt-0 first:border-t-0 first:pt-0 dark:border-gray-700"
          >
            <StartNewGame />
            <SidebarLink
              icon={<GiConsoleController size={24} />}
              href="/players"
              title="players"
            />
            <SidebarLink
              icon={<HiOutlineUserGroup size={24} />}
              href="/games"
              title="games"
            />
            <SidebarLink
              icon={<HiLocationMarker size={24} />}
              href="#"
              title="location"
            />
            <SidebarLink
              icon={<HiOutlineMail size={24} />}
              href="#"
              title="notifications"
            />
          </ul>
        </div>
      </Sidebar>

      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className={`z-[3] top-0 bottom-0 left-0 right-0 absolute bg-gray-600 duration-200 ${
          !isOpen ? "opacity-0 overflow-hidden invisible" : "opacity-50"
        }`}
      ></div>
    </>
  );
};

export const StartNewGame = () => {
  return (
    <Button color="blue" className="my-5">
      <Link href="/game/new">Start new game</Link>
    </Button>
  );
};
