"use client"
import NavItem from "./NavItem";
import {usePathname} from "next/navigation";


const MenuItems = [
    {
        title: 'Überblick',
        link: '/',
    },
    {
        title: 'Historie',
        link: '/history',
    },
    {
        title: 'Analyse',
        link: '/analysis',
    },
    {
        title: 'Einstellungen',
        link: '/settings',
    },
    {
        title: 'Spartipps',
        link: '/savingtips'
    },
];

const Sidebar = () => {
    return (
        <aside className="bg-primary-color h-max flex-shrink-0 flex flex-col p-3">
            <span className="text-3xl text-white text-center mb-3">Gas-o-meter</span>
            <hr className="border-gray-500" />
            {
                MenuItems.map(({title, link}) => (
                    <NavItem key={title} title={title} link={link}
                             selected={usePathname()===link} />
                ))
            }
        </aside>
    );
};

export default Sidebar;