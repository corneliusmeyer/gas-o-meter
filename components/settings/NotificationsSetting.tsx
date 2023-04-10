import React, {useState} from 'react';
import Settingsfield from "./Settingsfield";
import {Disclosure, Transition} from "@headlessui/react";
import NotificationInput from "./core/NotificationInput";
import {NotifySettings} from "../../models/Settings";
import {callback} from "chart.js/helpers";

type Props = {
    callback: Function,
    notifySettings: NotifySettings,
}

const NotificationsSetting = ({callback, notifySettings}:Props) => {
    const [showInfo, setShowInfo] = useState(false);
    return (
        <Settingsfield label="Benachrichtigungen">
            <Disclosure>
                <Disclosure.Button
                    className="pb-4 underline"
                    onClick={() => setShowInfo(!showInfo)}>Hilfe zu dieser Einstellung
                </Disclosure.Button>
                {/*code von headlessui*/}
                <Transition
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                >
                    {showInfo && (
                        <Disclosure.Panel>
                            <p className="max-w-5xl pb-3">
                                Gas-o-meter kann Ihnen Benachrichtigungen schicken. Beispielsweise wenn ein starker Verbrauch erkannt
                                wird oder Mitteilungen zu Prognosen. Wenn Sie diese Funktion nutzen wollen, müssen Sie nach Aktivierung
                                die Benachrichtigungsanfrage Ihres Browsers akzeptieren.
                            </p>
                        </Disclosure.Panel>
                    )}
                </Transition>
            </Disclosure>
            <NotificationInput notifySettingsHandler={callback} passNotifySettings={notifySettings} />
        </Settingsfield>
    );
};

export default NotificationsSetting;