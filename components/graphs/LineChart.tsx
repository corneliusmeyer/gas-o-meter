import React from 'react';
import {Measurement} from "../../models/Measurement";
import {Line} from "react-chartjs-2";
import {getTimeOfDate} from "../../utils/DateRanges";
import { Chart, registerables } from 'chart.js/auto';
import {DateRange} from "../../models/DateRange";
import {rangeToUnit} from "../../utils/helper";

type Props = {
    data: Measurement[];
    dateRange: DateRange,
}

const LineChart = ({data, dateRange}:Props) => {
    if(!data) return (<div>Es gibt keine Daten.</div>);
    const unit = rangeToUnit(dateRange);
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
                xAxis: {
                    type: 'time',
                    stepSize: 1,
                    time: {
                        unit: unit,
                        displayFormats: {
                            hour: 'MMM DD HH:mm',
                            day: 'MMM DD',
                            week: 'll',
                            month: 'MMM YYYY',
                        }
                    },
                    min: dateRange.startDate.getTime(),
                    max: dateRange.endDate.getTime(),
                },
            }
        },
    }
    return (
        <Line data={graphConfig}/>
    );
};


export default LineChart;