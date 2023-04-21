import React from 'react';
import Link from "next/link";

type Props = {
    title: String,
    link: any,
    icon?: any,
    selected: boolean,
}

const NavItem = (props: Props) => {
    const {title, link, icon, selected} = props;
    let style = "px-0 py-2 mx-0.5 my-1 text-xs md:text-l xl:text-base p-12 rounded-md text-white text-center";
    if(selected) style += " bg-blue-600";
    return (
        <Link className={style} href={link} prefetch>
            {title}
        </Link>
    );
};

export default NavItem;