import React from 'react';

type Props = {
    active: boolean;
    currentScreen: number;
    setCurrentScreen: Function;
    show: boolean;
}

const NextButton = (props: Props) => {
    const {active, currentScreen, setCurrentScreen, show} = props;

    let style = "float-right bg-gray-400 py-1 px-3 hover:bg-gray-500 w-auto w-fit text-center ml-auto";
    if(!active) style += "opacity-10 bg-gray-600 cursor-not-allowed";

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