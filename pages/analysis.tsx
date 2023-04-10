import React, {useEffect, useState} from 'react';
import Page from "../components/Page";
import DateRangePicker from "../components/ui/DateRangePicker";
import {thisMonth, today} from "../utils/DateRanges";
import {GetServerSidePropsContext} from "next";
import {DateRange} from "../models/DateRange";
import {Bar, Pie} from 'react-chartjs-2';
import {Chart, ArcElement} from 'chart.js/auto';

type Props = {
    start?: string,
    end?: string,
}

const Analysis = ({start, end}:Props) => {
    Chart.register(ArcElement);
    const [selectedRange, setSelectedRange] = useState<DateRange>(thisMonth());
    const [pieChartData, setPieChartData] = useState({
        labels: ['Duschen Anna', 'Duschen Peter', 'Heizung', 'Waschen', 'Undefiniert'],
        datasets: [
            {
                label: 'Verbrauch in %',
                data: [31, 22, 30, 5, 13],
                backgroundColor: ['#cc01eb', '#36A2EB', '#ff5656', '#56ff9f', '#21454f'],
                hoverBackgroundColor: ['#cc01eb', '#36A2EB', '#ff5656', '#56ff9f', '#21454f']
            }
        ]
    });
    const [barChartData, setBarChartData] = useState({
        labels: ['Duschen Anna', 'Duschen Peter', 'Heizung', 'Waschen', 'Undefiniert'],
        datasets: [
            {
                label: 'Kosten in €',
                data: [13.57, 9.63, 13.13, 2.19, 5.69],
                backgroundColor: ['#cc01eb', '#36A2EB', '#ff5656', '#56ff9f', '#21454f'],
                hoverBackgroundColor: ['#cc01eb', '#36A2EB', '#ff5656', '#56ff9f', '#21454f']
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
            <DateRangePicker currentValue={selectedRange} callback={setSelectedRange} />
            <div className="flex flex-col mt-5 p-5">
                <span className="mb-3 text-lg">In dem angegebenen Zeitraum wurden 20.3 Kubikmeter Gas verbraucht, was 43.78€ entspricht.</span>
                <span className="mb-3 text-lg">Dieser Wert liegt 22% über Ihrem Durchschnitt mit vergleichbaren Temperaturen.</span>
                <span className="mb-3 text-lg">Der Höchstverbrauch war 10.04.2023 um 14:37:11 Uhr.</span>
            </div>


            <div className="max-w-2xl h-1/3 mt-3 p-5">
                <span className="text-lg">Kosten der Verbrauchsgruppe für den Zeitraum:</span>
                <Bar data={barChartData} options={{
                    responsive: true,
                    maintainAspectRatio: false
                }} />
            </div>

            <div className="max-w-2xl h-1/3 pt-5 p-5 mt-8">
                <span className="text-lg">Anteilsmäßige Auswertung der Vebrauchsgruppen für den Zeitraum:</span>
                <Pie data={pieChartData} options={{
                    responsive: true,
                    maintainAspectRatio: false
                }} />
            </div>
        </Page>
    );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const {start, end} = context.query;
    if(start && end) {
        console.log('called with param')
        return {props: {start, end}}
    }
    console.log('called without param')
    return {props: {}};
}

export default Analysis;