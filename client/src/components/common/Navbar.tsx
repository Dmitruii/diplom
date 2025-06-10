"use client";
import axios from "axios";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import Logo from "./Logo";
import { Dispatch, SetStateAction, useEffect } from "react";
import BurgerSidebarButton from "./BurgerSidebarButton";
import Link from "next/link";
import client from "@/directus/api";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setIsLoading } from "@/store/slice/GlobalModalsSlice";
import { useRouter } from "next/navigation";
import { readMe, readUser } from "@directus/sdk";
import { entities } from "@/lib/data";
import { IUser } from "@/lib/types";
import { setUser } from "@/store/slice/UserSlice";

interface INavbarComp {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const NavbarComp = ({ setIsOpen }: INavbarComp) => {
  const user = useAppSelector((state) => state.user.user) as any;
  const router = useRouter();
  const dispatch = useAppDispatch();
  const logout = async () => {
    dispatch(setIsLoading(true));
    await client.logout();
    dispatch(setUser(null));
    router.push("/signin");
  };

  return (
    <Navbar className="bg-gray-50 border-b-2">
      <div className="select-none flex items-center gap-3">
        <BurgerSidebarButton setIsOpen={setIsOpen} />
        <Logo />
      </div>

      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img={
                user?.avatar
                  ? `${process.env.NEXT_PUBLIC_API_URL}/assets/${user?.avatar}`
                  : "/profile.svg"
              }
              rounded
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">{`${user?.first_name} ${user?.last_name}`}</span>
            <span className="block truncate text-sm font-medium">
              {user?.email}
            </span>
          </Dropdown.Header>
          <Dropdown.Item>
            <Link href="/profile/edit">Edit Profile</Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link
              href={`${process.env.NEXT_PUBLIC_API_URL}/excel/${user?.id}`}
              target="_blank"
            >
              Excel
            </Link>
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={logout}>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
    </Navbar>
  );
};

export default NavbarComp;
