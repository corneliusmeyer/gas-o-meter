import React, {useEffect, useState} from 'react';
import Page from "../components/Page";
import DateRangePicker from "../components/ui/DateRangePicker";
import {thisMonth, today} from "../utils/DateRanges";
import {GetServerSidePropsContext} from "next";
import {DateRange} from "../models/DateRange";
import { Pie } from 'react-chartjs-2';
import {Chart, ArcElement} from 'chart.js/auto';

type Props = {
    start?: string,
    end?: string,
}

const Analysis = ({start, end}:Props) => {
    Chart.register(ArcElement);

    const [selectedRange, setSelectedRange] = useState<DateRange>(thisMonth());
    const [chartData, setChartData] = useState({
        labels: ['Duschen Anna', 'Duschen Peter', 'Heizung', 'Waschen', 'Kochen'],
        datasets: [
            {
                label: 'Dataset',
                data: [31, 22, 30, 5, 13],
                backgroundColor: ['#cc01eb', '#36A2EB', '#ff5656', '#21454f', '#56ff9f'],
                hoverBackgroundColor: ['#cc01eb', '#36A2EB', '#ff5656', '#21454f', '#56ff9f']
            }
        ]
    });

    useEffect(() => {
        if(start && end) {
            setSelectedRange({startDate: new Date(start), endDate: new Date(end)});
        }
    }, [start, end])

    return (
        <Page title="Analyse">
            {/*<div className="flex flex-col" >*/}
            {/*    <span>Du hast in diesem Jahr bisher 294.48 Euro verbraucht. Hochgerechnet zum Jahresende müssten</span>*/}
            {/*</div>*/}
            <DateRangePicker currentValue={selectedRange} callback={() => {}} />
            <div className="flex flex-col">
                <span>In dem angegebenen Zeitraum wurden 20.3 Kubikmeter Gas verbraucht, was 43.78€ entspricht.</span>
                <span>Dieser Wert liegt 22% über Ihrem Durchschnitt mit vergleichbaren Temperaturen.</span>
                <span>Der Höchstverbrauch war um 14:37 Uhr.</span>
            </div>

            <div className="flex flex-col h-1/4">
                <Pie data={chartData} options={{
                    responsive: true,
                    maintainAspectRatio: false
                }} />
                <span></span>
            </div>
        </Page>
    );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const {start, end} = context.query;
    if(start && end) {
        return {props: {start, end}}
    }
    return {props: {}};
}

export default Analysis;