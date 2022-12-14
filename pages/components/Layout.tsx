import React from 'react';
import Sidebar from "./Sidebar/Sidebar";

const Layout = ({children}: {
    children: React.ReactNode;
}) => {
    return (
        <div className="flex flex-row h-full w-full p-0">
            <Sidebar />
            <main className="p-5 bg-secondary-color w-full h-full">
                {children}
            </main>
        </div>
    );
};

export default Layout;