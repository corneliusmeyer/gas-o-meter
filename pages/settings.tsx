import React, {useState} from 'react';
import GaspriceInput from "./components/pages/settings/GaspriceInput";
import LocationInput from "./components/pages/settings/LocationInput";
import SaveButton from "./components/pages/settings/SaveButton";
import {readSettings} from "../services/StorageManager";
import {Location, Settings} from "../models/Settings";
import {GetServerSideProps, NextPage} from "next";

interface SettingsPageProps {
    settings: Settings;
}

const SettingsPage:NextPage<SettingsPageProps> = (props) => {
    const [settings, setSettings] = useState<Settings>(props.settings);

    function GaspriceHandler (price:number) {
        if(Number.isFinite(price) && price > 0) {
            setSettings({...settings, gasprice: price})
        }
    }

    function LocationHandler(loc: Location) {
        setSettings({...settings, location: loc});
    }

    function ManualMeasurementHandler(stateFunc: Function, value: number) {
        if(Number.isFinite(value) && value > 0) {
            stateFunc(value);
        }
    }

    async function SaveButtonHandler () {
        try {
            const response = await fetch('/api/settings', {
                method: 'POST',
                body: JSON.stringify(settings),
                headers: {'Content-Type': 'application/json'},
            });
        }
        catch (err) {
            console.log('Die Einstellungen konnten nicht gespeichert werden');
        }
    }

    return (
        <div className="flex flex-col p-3">
            <h1 className="text-2xl text-white mb-5">Einstellungen</h1>
            <GaspriceInput changeHandler={GaspriceHandler} currentValue={settings.gasprice}/>
            <LocationInput changeHandler={LocationHandler} location={settings.location}/>
            {/*<MeasurementInput changeHandler={ManualMeasurementHandler} currentValue={gasvalue} />*/}
            <div className="flex flex-row justify-center">
                <SaveButton callback={SaveButtonHandler} />
            </div>
        </div>
    );
};


export const getServerSideProps:GetServerSideProps<SettingsPageProps> = async (context) => {
    const settings = readSettings();
    return {props: {settings}}
}

export default SettingsPage;