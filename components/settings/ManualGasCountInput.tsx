import React from 'react';

type Props = {
    currentValue: number;
    callback: Function,
}

const ManualGasCountInput = ({currentValue, callback}:Props) => {
    return (
        <div className="flex flex-col">
            <label>Aktueller Gasstand in Kubikmeter</label>
            <input type="number"
                   className="border border-gray-400 rounded mt-1 pl-3 max-w-min"
                   placeholder="61.159"
                   defaultValue={(currentValue!=-1 ? currentValue : "")}
                   onChange={(e) => callback(Number(e.target.value))}
            />
        </div>
    );
};

export default ManualGasCountInput;