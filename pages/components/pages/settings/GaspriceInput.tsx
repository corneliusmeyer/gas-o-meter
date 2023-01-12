import React from 'react';
import Settingsfield from "./Settingsfield";


type Props = {
    changeHandler: Function,
    currentValue?: number,
}

const GaspriceInput = (props: Props) => {
    const {changeHandler, currentValue} = props;
    return (
        <Settingsfield label="Gaspreis anpassen">
            <p>Gib hier den aktuellen Gaspreis ein, für die Kostenerrechnung</p>
            <div className="my-2 mx-3">
                <label>Derzeitiger Gaspreis</label>
                <input
                    type="number"
                    name="gaspreis"
                    className="text-black mx-3"
                    placeholder="0.71"
                    defaultValue={(currentValue ? currentValue : "")}
                    onChange={(e) => changeHandler(Number(e.target.value))}
                />
                <span>cent / kWh</span>
            </div>
        </Settingsfield>
    );
};

export default GaspriceInput;