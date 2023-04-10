import React, {useState} from 'react';
import Settingsfield from "./Settingsfield";
import {Disclosure, Transition} from "@headlessui/react";
import CostAnalysisInput from "./core/CostAnalysisInput";

type Props = {
    currentBaseCharge: number,
    currentYearlyUsage: number,
    baseCallback: Function,
    usageCallback: Function,

}

const CostAnalysisSetting = ({currentBaseCharge, currentYearlyUsage, baseCallback, usageCallback}:Props) => {
    const [showInfo, setShowInfo] = useState(false);
    return (
        <Settingsfield label="Gasabschlagsanalyse">
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
                                Hiermit kann Gas-o-meter analysieren, wie Ihre Gasnutzung die Abschlagszahlung beeinflusst, sprich,
                                ob am Ende des Jahres eine Nachzahlung oder eine Rückzahlung anfällt. Um dies zu errechnen wird der
                                letzte Jahresverbrauch in kWh benötigt und der Grundpreis in € / Jahr (Brutto). Außerdem fließt der obige
                                Gaspreis mit in die Berechnung ein. Falls Ihr Jahresverbrauch in Kubikmeter vorliegt,
                                können Sie den kWh Wert mit folgender Formel errechnen:
                                <em> Kubikmeter x Vebrauch x Brennwert = Wert in kWh</em>
                            </p>
                        </Disclosure.Panel>
                    )}
                </Transition>
            </Disclosure>
            <CostAnalysisInput currentBaseprice={currentYearlyUsage} yearlyUsage={currentYearlyUsage}
                               basepriceCallback={baseCallback} usageCallback={usageCallback} />
        </Settingsfield>
    );
};

export default CostAnalysisSetting;