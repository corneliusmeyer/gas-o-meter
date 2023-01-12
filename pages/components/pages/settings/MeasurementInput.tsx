import React from 'react';
import Settingsfield from "./Settingsfield";

type Props = {
    changeHandler: Function;
    currentValue?: number;
}

const MeasurementInput = (props: Props) => {
    const {changeHandler, currentValue} = props;
    return (
        <Settingsfield label="Gasmessung manuell hinzufügen">
            <div className="my-2 mx-3">
                <label>Derzeitiger Zählerstand</label>
                <input type="text"
                       className="text-black mx-3"
                       placeholder="4341.41"
                       defaultValue={currentValue}
                       onChange={(e) => changeHandler(Number(e.target.value))}
                />
                <span>kwh</span>
            </div>
        </Settingsfield>
    );
};

export default MeasurementInput;