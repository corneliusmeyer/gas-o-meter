import React from 'react';

type Props = {
    currentScreen: number;
    setCurrentScreen: Function;
    show: boolean;
}

const ReturnButton = ({currentScreen, setCurrentScreen, show} : Props) => {
    if(!show) return null;
    return (
        <button
            className="float-left bg-gray-400 py-1 px-3 hover:bg-gray-500 w-auto w-fit text-center"
            onClick={() => {if(currentScreen > 0) setCurrentScreen(currentScreen - 1);}}
        >
            Zurück
        </button>
    );
};

export default ReturnButton;