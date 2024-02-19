import Link from "next/link"
import React, { ReactElement } from "react"

interface ISidebarLink {
    icon: React.ReactNode
    title: string
    href: string
}

const SidebarLink = ({icon, title, href}: ISidebarLink) => {
    return <li>
        <Link href={href} className="uppercase font-semibold flex items-center justify-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" >
            {icon}
            <span data-testid="flowbite-sidebar-item-content" id="flowbite-sidebar-item-:R6bbrqkq:" className="px-3 flex-1 whitespace-nowrap">{title}</span>
        </Link>
    </li>
}

export default SidebarLink