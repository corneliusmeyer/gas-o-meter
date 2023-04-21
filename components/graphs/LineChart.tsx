import React from 'react';
import {Measurement} from "../../models/Measurement";
import {Line} from "react-chartjs-2";
import {getTimeOfDate} from "../../utils/DateRanges";
import { Chart, registerables } from 'chart.js/auto';
import {DateRange} from "../../models/DateRange";

type Props = {
    data: Measurement[];
    dateRange: DateRange,
}

const LineChart = ({data, dateRange}:Props) => {
    if(!data) return (<div>Es gibt keine Daten.</div>);
    Chart.register(...registerables);

    const graphData = data.map((measurement) =>
    {
        return {
            x: getTimeOfDate(new Date(measurement.time)),
            y: measurement.value,
        }
    });

    const graphConfig = {
        datasets: [
            {
                label: 'Gasnutzung',
                data: graphData,
                fill: true,
                tension: 0.1,
            },
        ],
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    min: dateRange.startDate.getTime(),
                    max: dateRange.endDate.getTime(),
                }
            }
        },
    }
    return (
        <Line data={graphConfig}/>
    );
};


export default LineChart;