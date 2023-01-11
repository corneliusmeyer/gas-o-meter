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
    const style =
        (selected) ?
            "px-1 py-2 mx-2 my-1 rounded-md text-white bg-blue-600 px-12"
            :
            "px-1 py-2 mx-2 my-1 rounded-md text-white px-12"
    return (
        <Link className={style} href={link}>
            {title}
        </Link>
    );
};

export default NavItem;