import React, {useState} from 'react';
import LocationInput from "./core/LocationInput";
import Settingsfield from "./Settingsfield";
import {Disclosure, Transition} from "@headlessui/react";
import {LocationSettings} from "../../models/Settings";

type Props = {
    callback: Function,
    locationSettings: LocationSettings,
}

const LocationSetting = ({callback, locationSettings}:Props) => {
    const [showInfo, setShowInfo] = useState(false);
    return (
        <Settingsfield label="Einbeziehen der derzeitigen Temperatur">
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
                                Aktiviere diese Option, wenn zu der Gasanalyse Temperaturinformationen hinzugerechnet werden sollen.
                                Hierfür wird Ihr aktueller Standort benötigt, um die Temperatur für Ihren Standort zu ermitteln.
                                Nach Aktivierung erscheint ein Fenster, in welchem Sie die Berechtigung erteilen müssen.
                            </p>
                        </Disclosure.Panel>
                    )}
                </Transition>
            </Disclosure>
            <LocationInput locationHandler={callback} passLocationSettings={locationSettings} />
        </Settingsfield>
    );
};

export default LocationSetting;