import React from 'react';
import {SavingTip} from "../../models/SavingTip";
import SavingTipCard from "../savingtips/SavingTipCard";

type Props = {
    tip: SavingTip,
}

const DailySavingTip = ({tip}:Props) => {
    return (
        <div className="">
            <h2 className="text-xl">Spartipp des Tages</h2>
            <SavingTipCard savingTip={tip} expanded={true} />
        </div>
    );
};

export default DailySavingTip;