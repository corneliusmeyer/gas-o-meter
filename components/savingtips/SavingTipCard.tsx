import React from 'react';
import {SavingTip} from "../../models/SavingTip";

type Props = {
    savingTip: SavingTip,
    expanded: boolean,
    color?: string,
    callback?: Function,
}

const SavingTipCard = ({savingTip, expanded, callback, color} : Props) => {
    const bgColor = color ? color : "bg-white";
    if(!expanded)
        return <button className={"border border-gray-200 rounded-lg shadow-md w-72 m-1 p-2 max-h-32 " + bgColor}
                       onClick={() => callback ? callback() : null}>
                 <h3 className="mb-2 text-center font-bold text-gray-900">{savingTip.title}</h3>
                 <p className="truncate">{savingTip.content}</p>
                </button>
    else
        return (
        <button className={"border border-gray-200 rounded-lg shadow-md w-72 m-1 min-w-fit " + bgColor}
                onClick={() => callback ? callback() : null}>
            <h3 className="mb-2 text-center font-bold text-gray-900">{savingTip.title}</h3>
            <p>{savingTip.content}</p>
            <a href={savingTip.source} className="inline-flex items-center text-blue-600 hover:underline">
                    Quelle
                    <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 20 20"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
                        <path
                            d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
                    </svg>
            </a>
        </button>
    );
};

export default SavingTipCard;