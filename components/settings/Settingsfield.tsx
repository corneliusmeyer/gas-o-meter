import React from 'react';

type Props = {
    label: string,
    children: any;
}

const Settingsfield = (props: Props) => {
    const {label, children} = props;
    return (
        <div>
            <fieldset className="border border-solid border-gray-500 p-3 my-4">
                <legend className="text-black px-4 text-lg">{label}</legend>
                <div className="bg-primary-color h-auto w-auto p-2">
                    {children}
                </div>
            </fieldset>
        </div>
    );
};

export default Settingsfield;