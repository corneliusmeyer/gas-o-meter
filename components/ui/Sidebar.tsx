import {usePathname} from "next/navigation";
import {getFirstPartofURL} from "../../utils/helper";
import NavItem from "./NavItem";


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
        title: 'Verbrauchsgruppen',
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
    const url = getFirstPartofURL(usePathname());
    return (
        <aside className="bg-primary-color-dark flex-1 flex-shrink-0 flex flex-col p-3">
            <span className="text-xs sm:text-lg lg:text-2xl xl:text-3xl text-white text-center mb-3">Gas-o-meter</span>
            <hr className="border-gray-500 mb-2" />
            {
                MenuItems.map(({title, link}) => (
                    <NavItem key={title} title={title} link={link}
                             selected={url===link} />
                ))
            }
        </aside>
    );
};

export default Sidebar;