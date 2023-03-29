import React, {useState} from 'react';
import {NextPage} from "next";
import ConnectionScreen from "../components/setup/screens/ConnectionScreen";
import GaspriceScreen from "../components/setup/screens/GaspriceScreen";
import LocationScreen from "../components/setup/screens/LocationScreen";
import NotificationsScreen from "../components/setup/screens/NotificationsScreen";
import WelcomeScreen from "../components/setup/screens/WelcomeScreen";
import FinishScreen from "../components/setup/screens/FinishScreen";
import Progressbar from "../components/setup/Progressbar";
import ReturnButton from "../components/setup/navigation/ReturnButton";
import NextButton from "../components/setup/navigation/NextButton";
import SaveButton from "../components/setup/navigation/SaveButton";
import {LocationSettings, MQTT_Connection, NotifySettings, Settings} from "../models/Settings";

const Setup:NextPage = () => {

    const mqttConnection:MQTT_Connection = {
        active: false,
        ipAdress: "",
        port: -1,
        topic: "",
    }

    const location:LocationSettings = {
        location: {
            long: -1,
            lat: -1,
        },
        active: false,
    }

    const notifySettings: NotifySettings = {
        active: false,
    }

    const [settings, setSettings] = useState<Settings>({
        isFirstVisit: false,
        gasprice: -1,
        lastMeasurement: 0,
        connection: mqttConnection,
        location: location,
        notifySettings: notifySettings
    });

    const gaspriceHandler = (gasprice: number) => setSettings(prevState => ({...prevState, gasprice}));
    const connectionHandler = (connection: MQTT_Connection) => setSettings(prevState => ({...prevState, connection}));
    const locationSettingsHandler = (location: LocationSettings) => setSettings(prevState => ({...prevState, location}));
    const notifySettingsHandler = (notifySettings: NotifySettings) => setSettings(prevState => ({...prevState, notifySettings}));

    const isConnectionValid = ():boolean =>
        !settings.connection.active || (settings.connection.active && settings.connection.ipAdress.length > 5 &&
        settings.connection.port > 0 && settings.connection.topic.length > 1);

    const SetupScreens = [
        {
            element: WelcomeScreen,
            verification: null,
        },
        {
            element: ConnectionScreen({connectionHandler, passConnection: settings.connection}),
            verification: isConnectionValid,
        },
        {
            element: GaspriceScreen({gaspriceHandler, currentPrice: settings.gasprice}),
            verification: () => settings.gasprice > 0,
        },
        {
            element: LocationScreen({locationSettingsHandler, passLocationSettings: settings.location}),
            verification: () => !settings.location.active ? true : settings.location.location.lat > -1000 && settings.location.location.long > -1000,
        },
        {
            element: NotificationsScreen({notifySettingsHandler, passNotifySettings: settings.notifySettings}),
            verification: () => !settings.notifySettings.active ? true : true,
        },
        {
            element: FinishScreen,
            verification: null,
        }
    ];

    const screenNum = SetupScreens.length;
    const [currentScreen, setCurrentScreen] = useState(0);

    const checkVerification = () :boolean => {
        const currentSetupScreen = SetupScreens[currentScreen];
        if (currentSetupScreen && currentSetupScreen.verification) {
            return currentSetupScreen.verification();
        }
        return true;
    }

    return (
        <div className="flex flex-col w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
            {
                (currentScreen > 0) ? <Progressbar progress={Math.round((currentScreen / (screenNum-1)) * 100)}/> : null
            }
            <div className="p-5 md:p-10 lg:p-16 h-full">
            {
                SetupScreens[currentScreen].element()
            }
            </div>
            <div className="flex flex-row justify-between m-7">
                <ReturnButton currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} show={currentScreen != 0} />
                <NextButton active={checkVerification()}
                            currentScreen={currentScreen}
                            setCurrentScreen={setCurrentScreen}
                            show={currentScreen != screenNum-1}
                />
                <SaveButton settings={settings} show={currentScreen == screenNum-1} />
            </div>
        </div>
    );
};

export default Setup;