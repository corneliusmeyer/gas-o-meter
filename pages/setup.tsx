import React, {useState} from 'react';
import {NextPage} from "next";
import ConnectionScreen from "../components/setup/ConnectionScreen";
import GaspriceScreen from "../components/setup/GaspriceScreen";
import LocationScreen from "../components/setup/LocationScreen";
import NotificationScreen from "../components/setup/NotificationScreen";
import WelcomeScreen from "../components/setup/WelcomeScreen";
import FinishScreen from "../components/setup/FinishScreen";
import Progressbar from "../components/setup/Progressbar";

const SetupScreens = [
    {
        element: WelcomeScreen(),
    },
    {
        element: ConnectionScreen(),
    },
    {
        element: GaspriceScreen(),
    },
    {
        element: LocationScreen(),
    },
    {
        element: NotificationScreen(),
    },
    {
        element: FinishScreen(),
    }
];

const Setup:NextPage = () => {
    const screenNum = SetupScreens.length;
    const [currentScreen, setCurrentScreen] = useState(1);

    const getLeftButton = () => {
        if(currentScreen == 1) return null;
        return <button
            className="float-left bg-gray-400 py-1 px-3 hover:bg-gray-500 w-auto w-fit text-center"
            onClick={() => {if(currentScreen > 1) setCurrentScreen(currentScreen - 1);}}
        >
            Zurück
        </button>
    }

    const getRightButton = () => {
        if(currentScreen != screenNum)
            return <button
                className="float-right bg-gray-400 py-1 px-3 hover:bg-gray-500 w-auto w-fit text-center ml-auto"
                onClick={() => {if(screenNum > currentScreen) setCurrentScreen(currentScreen + 1);}}
            >
                Weiter
            </button>
        else return  <button
            className="float-right bg-gray-400 py-1 px-3 hover:bg-gray-500 w-auto w-fit text-center"
        >
            Speichern
        </button>
    }

    return (
        <div className="flex flex-col w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
            {
                (currentScreen > 1) ? <Progressbar progress={Math.round((currentScreen / screenNum) * 100)}/> : null
            }
            <div className="p-16 h-full">
            {
                SetupScreens[currentScreen-1].element
            }
            </div>
            <div className="flex flex-row justify-between m-7">
            {
                getLeftButton()
            }
            {
                getRightButton()
            }
            </div>
        </div>
    );
};

export default Setup;