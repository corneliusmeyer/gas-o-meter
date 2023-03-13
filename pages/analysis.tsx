import React from 'react';
import Page from "../components/Page";
import DateRangePicker from "../components/ui/DateRangePicker";
import {thisMonth} from "../utils/DateRanges";

const Analysis = () => {
    return (
        <Page title="Analyse">
            <div>
                <span>Du hast in diesem Jahr bisher 294.48 Euro verbraucht. Hochgerechnet zum Jahresende müssten</span>
            </div>
            <DateRangePicker currentValue={thisMonth()} callback={() => {}} />
        </Page>
    );
};

export default Analysis;