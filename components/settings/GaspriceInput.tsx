import React from 'react';

type Props = {
    priceHandler: Function;
    currentValue: number;
}

const GaspriceInput = ({priceHandler, currentValue} : Props) => {
    return (
        <div className="flex flex-col">
            <label>Gaspreis (ct / kwh)</label>
            <input type="number"
                   name="gaspreis"
                   className="border border-gray-400 rounded"
                   placeholder="0.71"
                   defaultValue={(currentValue!=-1 ? currentValue : "")}
                   onChange={(e) => priceHandler(Number(e.target.value))}
            />
        </div>
    );
};

export default GaspriceInput;