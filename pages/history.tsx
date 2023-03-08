import React, {useState} from 'react';
import Page from "../components/Page";
import DateRangePicker from "../components/ui/DateRangePicker";
import {DateRange} from "../models/DateRange";
import {today} from "../utils/DateRanges";

const History = () => {
    const [selectedRange, setSelectedRange] = useState<DateRange>(today());

    return (
        <Page title="Historie">
            <DateRangePicker currentValue={selectedRange} callback={setSelectedRange}/>
        </Page>
    );
};

export default History;