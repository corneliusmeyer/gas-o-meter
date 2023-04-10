import React from 'react';

type Props = {
    currentBaseprice: number,
    yearlyUsage: number,
    basepriceCallback: Function,
    usageCallback: Function,
}

const CostAnalysisInput = ({currentBaseprice, yearlyUsage, basepriceCallback, usageCallback}:Props) => {
    return (
        <div className="flex flex-col">
            <label>Letzter Jahresverbrauch (kWh)</label>
            <input type="number"
                   className="border border-gray-400 rounded mt-1 pl-3 max-w-min"
                   placeholder="12621"
                   defaultValue={(yearlyUsage!=-1 ? yearlyUsage : "")}
                   onChange={(e) => usageCallback(Number(e.target.value))}
            />
            <label>Grundpreis in €/Jahr (Brutto)</label>
            <input type="number"
                   className="border border-gray-400 rounded mt-1 pl-3 max-w-min"
                   placeholder="117.98"
                   defaultValue={(currentBaseprice!=-1 ? currentBaseprice: "")}
                   onChange={(e) => basepriceCallback(Number(e.target.value))}
            />
        </div>
    );
};

export default CostAnalysisInput;