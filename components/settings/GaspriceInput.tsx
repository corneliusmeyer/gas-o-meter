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
                   pattern="[0-9]*"
                   name="gaspreis"
                   className="text-black"
                   placeholder="0.71"
                   defaultValue={(currentValue!=-1 ? currentValue : "")}
                   onChange={(e) => priceHandler(Number(e.target.value))}
            />
        </div>
    );
};

export default GaspriceInput;