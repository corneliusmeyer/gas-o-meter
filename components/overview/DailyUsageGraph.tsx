import React from 'react';
import {Line} from 'react-chartjs-2';
import {Measurement} from "../../models/Measurement";

type Props = {
    data: Measurement[];
}

const DailyUsageGraph = ({data}:Props) => {

    const graphConfig = {
        datasets: [
            {
                label: 'Gasnutzung',
                data: data,
                fill: true,
                tension: 0.1,
            }
        ]
    }

    return (
        <Line data={graphConfig} />
    );
};

export default DailyUsageGraph;