import React from 'react';
import {SavingTip} from "../../models/SavingTip";

type Props = {
    savingTip: SavingTip,
    expanded: boolean,
    color?: string,
}

const SavingTipCard = ({savingTip, expanded, color} : Props) => {
    const bgColor = color ? color : " bg-white";
    const stretched = expanded ? " max-w-xl" : " w-72 h-44 overflow-hidden "
        return <div className={"border border-gray-200 rounded-lg shadow-md m-1 min-h-32 p-2" + stretched + bgColor}>
                 <h3 className="mb-2 text-center font-bold text-gray-900">{savingTip.title}</h3>
                 {expanded ? <p>{savingTip.content}</p> : <p>{savingTip.content}</p>}
                </div>;
};

export default SavingTipCard;