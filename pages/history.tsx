import React, {useEffect, useState} from 'react';
import {Measurement} from "../models/Measurement";
import {DateRange} from "../models/DateRange";
import {today} from "../utils/DateRanges";
import Page from "../components/Page";
import DateRangePicker from "../components/ui/DateRangePicker";
import LineChart from "../components/graphs/LineChart";
import {readGasUsageInRange} from "../utils/influxMethods";
import {NextPage} from "next";

type HistoryPageProps = {
    measurements: Measurement[];
}

const History:NextPage<HistoryPageProps> = ({measurements}) => {
    const [data, setData] = useState(measurements);
    const [selectedRange, setSelectedRange] = useState<DateRange>(today());
    const [renderCount, setRenderCount] = useState(0);

    const fetchData = async () => {
        const response = await fetch(`/api/measurements?start=${selectedRange.startDate}&end=${selectedRange.endDate}`);
        setData(await response.json());
    }

    useEffect(() => {
        if(renderCount > 2) {
            fetchData();
        }
        else setRenderCount(prevState => prevState+1);
    }, [selectedRange]);

    return (
        <Page title="Historie">
            <div className="flex flex-col h-full">
                <DateRangePicker currentValue={selectedRange} callback={setSelectedRange}/>
                <div className="flex-1">
                {
                    data && data.length > 0 ? <LineChart data={data} />
                        : <div>Es konnten keine Daten für den Zeitraum gefunden werden</div>
                }
                </div>
                {
                    data && data.length > 0 ? <div className="flex flex-row border border-solid border-gray-500 p-3 justify-around">
                        <button className="hover:font-bold">Zeitraum analysieren</button>
                        <button className="hover:font-bold">Verbrauchsgruppe hinzufügen</button>
                        <button className="hover:font-bold">Daten für Zeitraum löschen</button>
                    </div> : null
                }
            </div>
        </Page>
    );
};

export const getServerSideProps = async () => {
    const measurements = await readGasUsageInRange(today());
    return {props: {measurements}};
}

export default History;