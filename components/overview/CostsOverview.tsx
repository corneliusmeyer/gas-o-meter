import React from 'react';

type Props = {
    today: number,
    yesterday: number,
    weekly: number,
    monthly: number,
}

const CostsOverview = ({today, yesterday, weekly, monthly} : Props) => {
    return (
        <div className="flex flex-col ml-14 h-full justify-evenly">
            <span className="text-lg">Heutige Kosten: <em>{today}</em> €</span>
            <span className="text-lg mt-3">Gestrige Kosten: <em>{yesterday}</em> €</span>
            <span className="text-lg mt-3">Wochenkosten: <em>{weekly}</em> €</span>
            <span className="text-lg mt-3">Monatskosten: <em>{monthly}</em> €</span>
            <span className="text-lg mt-3">Abschlagsanalyse: Sie müssen voraussichtlich <em>53.45</em>€ nachzahlen</span>
        </div>
    );
};

export default CostsOverview;