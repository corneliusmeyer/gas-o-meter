import React, {useState} from 'react';
import Settingsfield from "./Settingsfield";
import {Disclosure, Transition} from "@headlessui/react";
import GaspriceInput from "./core/GaspriceInput";

type Props = {
    currentValue: number,
    callback: Function,

}

const CostInputSetting = ({currentValue, callback}:Props) => {
    const [showInfo, setShowInfo] = useState(false);
    return (
        <Settingsfield label="Gaspreis">
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
                                Hier kann der aktuelle Gaspreis geändert werden. Der Gaspreis ist in der Einheit cent
                                pro Kwh (Brutto) einzugeben und wird für die Analysen benötigt. Der Gaspreis wird rückwirkend gespeichert
                                Neueingaben werden für die zukünftigen Gasmessungen in Kraft treten.
                            </p>
                        </Disclosure.Panel>
                    )}
                </Transition>
            </Disclosure>
            <GaspriceInput currentValue={currentValue} priceHandler={callback} />
        </Settingsfield>
    );
};

export default CostInputSetting;