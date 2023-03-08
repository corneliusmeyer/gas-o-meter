import React from 'react';
import Sidebar from "./ui/Sidebar";

const Layout = ({children}: {
    children: React.ReactNode;
}) => {
    return (
        <div className="flex flex-row w-full p-0" >
            <Sidebar />
            <main className="p-5 bg-secondary-color w-4/5 lg:w-5/6 h-full">
                {children}
            </main>
        </div>
    );
};

export default Layout;