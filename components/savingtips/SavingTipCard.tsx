import React from 'react';
import {SavingTip} from "../../models/SavingTip";

type Props = {
    savingTip: SavingTip,
    expanded: boolean,
    callback?: Function,
}

const SavingTipCard = ({savingTip, expanded, callback} : Props) => {
    return (
        <div className="block h-auto p-6 bg-white border border-gray-200 rounded-lg shadow-md m-3 pr-10">
            <div className="flex flex-row justify-between">
                <h3 className="mb-2 text-lg font-bold tracking-tight text-gray-900">{savingTip.title}</h3>
                <a href={savingTip.source}>Quelle</a>
            </div>
            <p>{savingTip.content}</p>
        </div>
    );
};

export default SavingTipCard;