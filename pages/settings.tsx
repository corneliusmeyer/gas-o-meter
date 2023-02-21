import React, {useState} from 'react';
import Page from "../components/Page";
import Settingsfield from "../components/settings/Settingsfield";
import ConnectionInput from "../components/settings/ConnectionInput";
import {GetServerSideProps, NextPage} from "next";
import {readSettings} from "../utils/storagehelper";
import {MQTT_Connection, Settings} from "../models/Settings";
import {useRouter} from "next/router";
import GaspriceInput from "../components/settings/GaspriceInput";

type SettingsPageProps = {
    settings: Settings,
}

const Settings:NextPage<SettingsPageProps> = (props) => {
    if(!props.settings) {
        const router = useRouter();
        router.push("/404");
        return null;
    }

    const [settings, setSettings] = useState<Settings>(props.settings);
    const connectionHandler = (connection: MQTT_Connection) => setSettings(prevState => ({...prevState, connection}));
    const gaspriceHandler = (gasprice: number) => setSettings(prevState => ({...prevState, gasprice}));

    return (
        <Page title="Einstellungen">
            <Settingsfield label="MQTT-Verbindung">
                <ConnectionInput connectionHandler={connectionHandler} passConnection={settings.connection} />
            </Settingsfield>
            <Settingsfield label="Gaspreis">
                <GaspriceInput currentValue={settings.gasprice} priceHandler={gaspriceHandler} />
            </Settingsfield>
        </Page>
    );
};

export const getServerSideProps = () => {
    const settings = readSettings();
    return { props: { settings } };
};

export default Settings;