import React, {useState} from 'react';
import Page from "../components/Page";
import Settingsfield from "../components/settings/Settingsfield";
import ConnectionInput from "../components/settings/ConnectionInput";
import {GetServerSideProps, NextPage} from "next";
import {readSettings} from "../utils/storagehelper";
import {LocationSettings, MQTT_Connection, Settings} from "../models/Settings";
import GaspriceInput from "../components/settings/GaspriceInput";
import LocationInput from "../components/settings/LocationInput";
import NotificationInput from "../components/settings/NotificationInput";
import CostAnalysisInput from "../components/settings/CostAnalysisInput";
import ManualGasCountInput from "../components/settings/ManualGasCountInput";
import {useRouter} from "next/router";
import {showErrorToast, showSuccessToast, showWarningToast} from "../utils/helper";
import {saveSettings} from "../utils/apis";

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
    let addedMeasurement = false;

    const componentHandler = (fn: (s:Settings) => Settings) => {
        setSettings(fn);
        setDidChanges(true);
    }

    const connectionHandler = (connection: MQTT_Connection) => componentHandler(prevState => ({...prevState, connection}));
    const gaspriceHandler = (gasprice: number) => componentHandler(prevState => ({...prevState, gasprice}));
    const locationHandler = (location: LocationSettings) => componentHandler(prevState => ({...prevState, location}));

    const saveHandler = async () => {
        if(!didChanges) {
            showWarningToast('Es wurden keine Änderungen zum Speichern vorgenommen.');
            return;
        }
        if(addedMeasurement) {
            const result = await fetch('http://localhost:3000/api/addMeasurement?value='+settings.lastMeasurement);
            if(!result.ok) {
                showErrorToast('Der eingegebene Gasstand ist nicht valide');
                return;
            }
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
            <Settingsfield label="Manuelle Zählerstandeingabe">
                <p className="max-w-5xl pb-3">
                    Hier kann der aktuelle Gaszählerstand manuell eingetragen werden.
                    Beachte, dass der eingegebene Zählerstand größer, als der vorherige Stand ist.
                </p>
                <ManualGasCountInput currentValue={settings.lastMeasurement+0.01} callback={() => {}}/>
            </Settingsfield>
            <Settingsfield label="Gaspreis">
                <p className="max-w-5xl pb-3">
                    Hier kann der aktuelle Gaspreis eingegeben werden. Der Gaspreis ist in der Einheit cent
                    pro Kwh (Brutto) einzugeben und wird für die Analysen benötigt. Der Gaspreis wird rückwirkend gespeichert
                    Neueingaben werden für die zukünftigen Gasmessungen in Kraft treten.
                </p>
                <GaspriceInput currentValue={settings.gasprice} priceHandler={gaspriceHandler} />
            </Settingsfield>
            <Settingsfield label="Gasabschlagsanalyse">
                <p className="max-w-5xl pb-3">
                    Hiermit kann Gas-o-meter analysieren, wie Ihre Gasnutzung die Abschlagszahlung beeinflusst, sprich,
                    ob am Ende des Jahres eine Nachzahlung oder eine Rückzahlung anfällt. Um dies zu errechnen wird der
                    letzte Jahresverbrauch in kWh benötigt und der Grundpreis in € / Jahr (Brutto). Außerdem fließt der unten
                    einzugebene Arbeitspreis mit in die Berechnung ein. Falls Ihr Jahresverbrauch in Kubikmeter vorliegt,
                    können Sie den kWh Wert mit folgender Formel errechnen:
                    <em> Kubikmeter x Vebrauch x Brennwert = Wert in kWh</em>
                </p>
                <CostAnalysisInput currentBaseprice={-1} currentUsage={-1} basepriceCallback={() => {}} usageCallback={() => {}} />
            </Settingsfield>
            <Settingsfield label="Benachrichtigungen">
                <p className="max-w-5xl pb-3">
                    Gas-o-meter kann Ihnen Benachrichtigungen schicken. Beispielsweise wenn ein starker Verbrauch erkannt
                    wird oder Mitteilungen zu Prognosen. Wenn Sie diese Funktion nutzen wollen, müssen Sie nach Aktivierung
                    die Benachrichtigungsanfrage Ihres Browsers akzeptieren.
                </p>
                <NotificationInput notifySettingsHandler={() => {}} passNotifySettings={settings.notifySettings} />
            </Settingsfield>
            <Settingsfield label="Temperaturservice">
                <p className="max-w-5xl pb-3">
                    Aktiviere diese Option, wenn zu der Gasanalyse Temperaturinformationen hinzugerechnet werden sollen.
                    Hierfür wird Ihr aktueller Standort benötigt, um die Temperatur für Ihren Standort zu ermitteln.
                    Nach Aktivierung erscheint ein Fenster, in welchem Sie die Berechtigung erteilen müssen.
                 </p>
                <LocationInput locationHandler={locationHandler} passLocationSettings={settings.location} />
            </Settingsfield>
            <Settingsfield label="MQTT-Verbindung">
                <p className="max-w-5xl pb-3">
                    Falls Sie ein modernen Gaszähler besitzen, ist die Wahrscheinlichkeit hoch, dass dieser über eine
                    Schnittstelle verfügt, um seine Daten bereitzustellen. Lesen Sie das Benutzerhandbuch Ihres Gaszählers
                    und prüfen Sie, ob er eine MQTT-Broker-Funktion unterstützt. Anbei sollten sich auch die benötigten Zugangsdaten
                    befinden, die Sie unten eingeben können.
                </p>
                <ConnectionInput connectionHandler={connectionHandler} passConnection={settings.connection} />
            </Settingsfield>
            <div className="flex flex-row justify-evenly">
                <button className="bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded-full"
                    onClick={() => router.reload()}
                >
                    Zurücksetzen
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

export const getServerSideProps = () => {
    const settings = readSettings();
    return { props: { settings } };
};

export default Settings;