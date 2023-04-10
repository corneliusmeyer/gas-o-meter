import React, {useState} from 'react';
import Settingsfield from "./Settingsfield";
import {Disclosure, Transition} from "@headlessui/react";
import ManualGasCountInput from "./core/ManualGasCountInput";

type Props = {
    currentValue: number,
    callback: Function,
}

const ManualGasCountSetting = ({currentValue, callback} : Props) => {
    const [showInfo, setShowInfo] = useState(false);
    return (
        <Settingsfield label="Manuelle Zählerstandeingabe">
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
                                Hier kann der aktuelle Gaszählerstand manuell eingetragen werden.
                                Beachten Sie, dass der eingegebene Zählerstand größer, als der vorherige Stand sein sollte.
                            </p>
                        </Disclosure.Panel>
                    )}
                </Transition>
            </Disclosure>
            <ManualGasCountInput currentValue={currentValue} callback={callback} />
        </Settingsfield>
    );
};

export default ManualGasCountSetting;