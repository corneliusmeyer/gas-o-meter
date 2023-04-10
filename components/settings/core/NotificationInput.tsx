import React, {useState} from 'react';
import {Switch} from '@headlessui/react';
import {NotifySettings} from "../../../models/Settings";
import {askNotificationPermission} from "../../../utils/apis";

type Props = {
    notifySettingsHandler: Function,
    passNotifySettings: NotifySettings,
}

const NotificationInput = ({notifySettingsHandler, passNotifySettings}: Props) => {
    if (typeof window !== "undefined" && !("Notification" in window)) {
        return <p>Leider unterstützt Ihr Browser diese Funktion nicht.</p>
    }

    const [notifySettings, setNotifySettings] = useState<NotifySettings>(passNotifySettings);

    const activeHandler = (active: boolean) => {
        if(active) {
            askNotificationPermission().then(permission => {
                if (permission === 'granted') {
                    setNotifySettings(prevState => ({...prevState, active: true}));
                    notifySettingsHandler({ ...notifySettings, active: true });
                    return;
                }
            });
        }
        setNotifySettings(prevState => ({...prevState, active:false}));
        notifySettingsHandler({ ...notifySettings, active: false });
    }

    return (
        <div className="flex flex-col">
            <div className="flex flex-row items-center">
                <Switch.Group>
                    <Switch
                        checked={notifySettings.active}
                        onChange={(e) => activeHandler(e)}
                        className={`${
                            notifySettings.active ? 'bg-blue-500' : 'bg-gray-200'
                        } relative inline-flex items-center h-6 rounded-full w-11 mr-4`}
                    >
                        <span
                            className={`${
                                notifySettings.active ? 'translate-x-6' : 'translate-x-1'
                            } inline-block w-4 h-4 transform bg-white rounded-full`}
                        />
                    </Switch>
                    <Switch.Label className="mr-4 text-lg">Benachrichtigungen aktivieren</Switch.Label>
                </Switch.Group>
            </div>
            {
                notifySettings.active ?
                    <div className="p-2 px-16">
                        <div className="flex flex-row">
                            <input type="checkbox" checked={notifySettings.highUsage}
                                   onChange={(e) => {
                                       notifySettings.highUsage = e.target.checked;
                                       notifySettingsHandler(notifySettings);
                                   }} />
                            <label className="px-3">Benachrichtigungen bei überdurschnittlichen Verbauch</label>
                        </div>
                        <div className="flex flex-row">
                            <input type="checkbox" checked={notifySettings.detection}
                                   onChange={(e) => {
                                       notifySettings.detection = e.target.checked;
                                       notifySettingsHandler(notifySettings);
                                   }} />
                            <label className="px-3">Benachrichtigungen bei Erkennung einer Verbrauchsgruppe</label>
                        </div>
                        <div className="flex flex-row">
                            <input type="checkbox" checked={notifySettings.costsanalysis}
                                   onChange={(e) => {
                                       notifySettings.costsanalysis = e.target.checked;
                                       notifySettingsHandler(notifySettings);
                                   }} />
                            <label className="px-3">Benachrichtigungen bei Überschreitung der Abschlagsanalyse</label>
                        </div>
                        <div className="flex flex-row">
                            <input type="checkbox" checked={notifySettings.reviews}
                                   onChange={(e) => {
                                       notifySettings.reviews = e.target.checked;
                                       notifySettingsHandler(notifySettings);
                                   }} />
                            <label className="px-3">Benachrichtigungen für Berichte (wöchentlich, monatlich, jährlich)</label>
                        </div>
                        <div className="flex flex-row">
                            <input type="checkbox" checked={notifySettings.errors}
                                   onChange={(e) => {
                                       notifySettings.errors = e.target.checked;
                                       notifySettingsHandler(notifySettings);
                                   }} />
                            <label className="px-3">Benachrichtigungen bei Systemfehlern</label>
                        </div>
                    </div>
                    : null
            }
        </div>
    );
};

export default NotificationInput;