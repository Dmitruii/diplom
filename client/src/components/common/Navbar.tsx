'use client';

import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import Logo from './Logo';
import { Dispatch, SetStateAction } from 'react';
import BurgerSidebarButton from './BurgerSidebarButton';
import Link from 'next/link';

interface INavbarComp {
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

const NavbarComp = ({setIsOpen}: INavbarComp) => {
  return (
    <Navbar className='bg-gray-50 border-b-2' >
      <div className='select-none flex items-center gap-3'>
        <BurgerSidebarButton setIsOpen={setIsOpen} />
        <Logo />
      </div>

      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">Stan Wile</span>
            <span className="block truncate text-sm font-medium">example@lol.com</span>
          </Dropdown.Header>
          <Dropdown.Item>
            <Link href='/profile/edit'>
              Edit Profile
            </Link>
          </Dropdown.Item>
          <Dropdown.Item>Statistics</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
    </Navbar>
  );
}

export default NavbarComp
