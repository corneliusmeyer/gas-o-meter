import React from 'react';

type Props = {
    active: boolean;
    currentScreen: number;
    setCurrentScreen: Function;
    show: boolean;
}

const NextButton = (props: Props) => {
    const {active, currentScreen, setCurrentScreen, show} = props;

    let style = "float-right  py-1 px-3  w-auto w-fit text-center ml-auto ";
    if(active) style += "bg-blue-400 hover:bg-blue-500"
    else style += "opacity-80 bg-gray-600 cursor-not-allowed";

    if(!show) return null;
    return (
        <button
            className={style}
            onClick={() => active ? setCurrentScreen(currentScreen + 1) : null}
        >
            Weiter
        </button>
    );
};

export default NextButton;