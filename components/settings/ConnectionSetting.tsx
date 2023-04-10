import React, {useState} from 'react';
import ConnectionInput from "./core/ConnectionInput";
import Settingsfield from "./Settingsfield";
import {MQTT_Connection} from "../../models/Settings";
import { Disclosure, Transition } from '@headlessui/react'

type Props = {
    callback: Function,
    passConnection: MQTT_Connection,
}

const ConnectionSetting = ({callback, passConnection}:Props) => {
    const [showInfo, setShowInfo] = useState(false);
    return (
        <Settingsfield label="Automatischer Abruf des Zählerstandes">
            <Disclosure>
                <Disclosure.Button
                    className="pb-4 underline"
                    onClick={() => setShowInfo(!showInfo)}
                >
                    Hilfe zu dieser Einstellung
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
                                Falls Sie einen modernen Gaszähler besitzen, ist die Wahrscheinlichkeit hoch, dass dieser über eine
                                Schnittstelle verfügt, um seine Daten bereitzustellen. Gas-o-meter kann auf diese Schnittstelle zugreifen
                                und automatisch den Zählerstand abfrufen. Lesen Sie das Benutzerhandbuch Ihres Gaszählers
                                und prüfen Sie, ob er die sogenannte MQTT-Broker-Funktion unterstützt. Falls die Funktion unterstützt
                                wird sollten sich anbei auch die benötigten Zugangsdaten befinen, die Sie unten eingeben können.
                            </p>
                        </Disclosure.Panel>
                    )}
                </Transition>
            </Disclosure>
            <ConnectionInput connectionHandler={callback} passConnection={passConnection} />
        </Settingsfield>
    );
};


export default ConnectionSetting;