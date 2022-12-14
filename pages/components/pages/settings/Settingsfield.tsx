import React from 'react';

type Props = {
    label: string,
    children: any;
}

const Settingsfield = (props: Props) => {
    const {label, children} = props;
    return (
        <div>
            <fieldset className="border border-solid border-gray-500 p-3 mb-6">
                <legend className="text-white px-5">{label}</legend>
                <div className="flex flex-col bg-primary-color text-white h-auto w-auto p-5">
                    {children}
                </div>
            </fieldset>
        </div>
    );
};

export default Settingsfield;