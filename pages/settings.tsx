import React, {useState} from 'react';
import Page from "../components/Page";
import {GetServerSideProps, GetServerSidePropsContext, NextPage} from "next";
import {readSettings} from "../utils/storagehelper";
import {LocationSettings, MQTT_Connection, NotifySettings, Settings} from "../models/Settings";
import {useRouter} from "next/router";
import {showErrorToast, showSuccessToast, showWarningToast} from "../utils/helper";
import {saveSettings} from "../utils/apis";
import ConnectionSetting from "../components/settings/ConnectionSetting";
import LocationSetting from "../components/settings/LocationSetting";
import NotificationsSetting from "../components/settings/NotificationsSetting";
import CostAnalysisSetting from "../components/settings/CostAnalysisSetting";
import CostInputSetting from "../components/settings/CostInputSetting";
import ManualGasCountSetting from "../components/settings/ManualGasCountSetting";
import {isValidConnection, isValidGaspric, isValidLocation, isValidMeasurement} from "../utils/validator";

type SettingsPageProps = {
    settings: Settings,
}

const Settings:NextPage<SettingsPageProps> = (props) => {
    const router = useRouter();
    if(!props.settings) {
        router.push("/404");
        return null;
    }

    const [settings, setSettings] = useState<Settings>(props.settings);
    const [didChanges, setDidChanges] = useState(false);
    const [gasvalue, setGasvalue] = useState(settings.lastMeasurement);

    const componentHandler = (fn: (s:Settings) => Settings) => {
        setSettings(fn);
        setDidChanges(true);
    }

    const yearlyUsageHandler = (yearlyUsage: number) => componentHandler(prevState => ({...prevState, yearlyUsage}));
    const baseChargeHandler = (basiccharge: number) => componentHandler(prevState => ({...prevState, basiccharge}));
    const connectionHandler = (connection: MQTT_Connection) => componentHandler(prevState => ({...prevState, connection}));
    const gaspriceHandler = (gasprice: number) => componentHandler(prevState => ({...prevState, gasprice}));
    const locationHandler = (location: LocationSettings) => componentHandler(prevState => ({...prevState, location}));
    const notifyHandler = (notifySettings: NotifySettings) => componentHandler(prevState => ({...prevState, notifySettings}));

    const saveHandler = async () => {
        if(gasvalue !== settings.lastMeasurement) {
            if(!isValidMeasurement(gasvalue, settings.lastMeasurement)) {
                showErrorToast("Der neue Zählerstand muss größer " + settings.lastMeasurement+ " sein.");
                return;
            }
            const result = await fetch('api/addMeasurement?value='+gasvalue);
            if(result.ok) {
                settings.lastMeasurement = gasvalue;
            }
            else {
                showErrorToast('Der eingegebene Gasstand ist nicht valide oder es besteht keine Verbindung');
                return;
            }
            if(!didChanges) return;
        }
        if(!didChanges) {
            showWarningToast('Es wurden keine Änderungen zum Speichern vorgenommen.');
            return;
        }
        if(!isValidConnection(settings.connection)) {
            showErrorToast("Die eingegebene Verbindung ist nicht valide. Bitte überprüfen Sie die Verbindungseingaben.");
            return;
        }
        if(!isValidLocation(settings.location)) {
            showErrorToast("Der eingegebene Ort ist fehlerhaft.");
            return;
        }
        if(!isValidGaspric(settings.gasprice)) {
            showErrorToast("Der eingegebene Gaspreis ist nicht valide");
            return;
        }
        if ((settings.yearlyUsage !== -1 || settings.basiccharge !== -1) && (settings.yearlyUsage < 1 || settings.basiccharge < 1)) {
            showErrorToast("Die Werte der Gasabschlagsanalyse sind nicht valide.");
            return;
        }
        const status = await saveSettings(settings);
        if(status.ok) {
            showSuccessToast('Die Änderungen wurden efolgreich gespeichert.');
            setDidChanges(false);
        }
        else showErrorToast('Die Einstellungen konnten nicht gespeichert werden.');
    }

    return (
        <Page title="Einstellungen">
            {
               didChanges ? <span className="text-red-400">Es gibt ungespeicherte Änderungen.</span> : null
            }
            <ManualGasCountSetting currentValue={gasvalue+0.01}
                                   callback={(value:number) => {setGasvalue(value); setDidChanges(true)}} />
            <CostInputSetting currentValue={settings.gasprice} callback={gaspriceHandler} />
            <CostAnalysisSetting currentBaseCharge={settings.basiccharge} currentYearlyUsage={settings.yearlyUsage}
                              baseCallback={baseChargeHandler}  usageCallback={yearlyUsageHandler} />
            <NotificationsSetting callback={notifyHandler} notifySettings={settings.notifySettings} />
            <LocationSetting callback={locationHandler} locationSettings={settings.location} />
            <ConnectionSetting callback={connectionHandler} passConnection={settings.connection} />
            <div className="flex flex-row justify-evenly">
                <button className="bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded-full"
                    onClick={() => router.reload()}
                >
                    Aktuelle Änderungen Zurücksetzen
                </button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                    onClick={() => saveHandler()}
                >
                    Speichern
                </button>
            </div>
        </Page>
    );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const settings = await readSettings();
    return { props: { settings } };
};

export default Settings;