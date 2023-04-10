import React from 'react';
import Sidebar from "./ui/Sidebar";

const Layout = ({children}: {
    children: React.ReactNode;
}) => {
    return (
        <div className="flex flex-row w-full p-0" >
            <Sidebar />
            <main className="pt-4 pr-4 pl-4 pb-2 bg-secondary-color w-4/5 lg:w-5/6 h-full">
                {children}
            </main>
        </div>
    );
};

export default Layout;