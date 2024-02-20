"use client"

import NavbarComp from "@/components/common/Navbar"
import { SidebarComp } from "@/components/common/Sidebar"
import { useState } from "react"

export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    const [isOpen, setIsOpen] = useState(false)
    return <>
        <NavbarComp
          setIsOpen={setIsOpen}
        />
        <div className="flex h-full py-5">
            <div><SidebarComp
              setIsOpen={setIsOpen}
              isOpen={isOpen}
            /></div>
            <div className="mx-auto container">
                {children}
            </div>
        </div>
    </>
  }