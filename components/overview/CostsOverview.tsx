import React from 'react';

type Props = {
    today: number,
    yesterday: number,
    weekly: number,
    monthly: number,
}

const CostsOverview = ({today, yesterday, weekly, monthly} : Props) => {
    return (
        <div className="flex flex-col ml-14">
            <span className="text-lg">Heutige Gesamtkosten: <em>{today}</em> €</span>
            <span className="text-lg mt-3">Gestrige Gesamtkosten: <em>{yesterday}</em> €</span>
            <span className="text-lg mt-3">Wöchentliche Gesamtkosten: <em>{weekly}</em> €</span>
            <span className="text-lg mt-3">Monatliche Gesamtkosten: <em>{monthly}</em> €</span>
        </div>
    );
};

export default CostsOverview;