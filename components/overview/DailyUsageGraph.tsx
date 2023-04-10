import React from 'react';
import {Line} from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import {Measurement} from "../../models/Measurement";
import {getTimeOfDate} from "../../utils/DateRanges";

type Props = {
    data: Measurement[];
}

const DailyUsageGraph = ({data}:Props) => {
    if(!data) return null;

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
        },
    }


    return (
        <div className="h-full">
            <Line data={graphConfig} />
        </div>
    );
};

export default DailyUsageGraph;