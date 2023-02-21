import React from 'react';


type Props = {
    title: string,
    children: React.ReactNode;
}

const Page = (props: Props) => {
    const {title, children} = props;
    return (
        <div className="flex flex-col sm:p-3 h-full">
            <h1 className="text-xl md:text-2xl text-black dark:text-white mb-4">{title}</h1>
            {children}
        </div>
    );
};

export default Page;