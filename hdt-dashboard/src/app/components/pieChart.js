import React, { useState, useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Box, Button } from "@mui/material";
import Chart from 'chart.js/auto';

const DATA_SETS = {
    'total': [60, 20, 35],
    'week': [10, 10, 15],
    'month': [45, 15, 25]
};

const COLORS = {
    backgroundColor: [
        'rgba(75, 192, 192, 0.5)', // Finished color
        'rgba(255, 206, 86, 0.5)', // Unfinished color
        'rgba(255, 99, 132, 0.5)'  // Skipped color
    ],
    borderColor: [
        'rgba(75, 192, 192, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(255, 99, 132, 1)'
    ]
};

// Button configurations mapped by filter types
const BUTTON_LABELS = {
    'total': 'Total',
    'week': 'Ugentlig',
    'month': 'Månedlig'
};

export default function PieChart() {
    const [filterType, setFilterType] = useState('total');

    const handleButtonClick = (type) => {
        setFilterType(type);
    };

    const getFilteredData = () => ({
        labels: ['Udført', 'Påbegyndt', 'Udeladt'], // Finished, Unfinished, Skipped
        datasets: [{
            data: DATA_SETS[filterType],
            backgroundColor: COLORS.backgroundColor,
            borderColor: COLORS.borderColor,
            borderWidth: 1,
        }]
    });

    const data = useMemo(getFilteredData, [filterType]);

    const options = {
        cutout: '60%',
        plugins: {
            legend: { position: 'bottom' },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        const labelData = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.dataIndex];
                        const total = data.datasets[0].data.reduce((a, b) => a + b, 0);
                        const percentage = ((labelData / total) * 100).toFixed(1);
                        return `${labelData} (${percentage}%)`;
                    }
                }
            }
        }
    };

    const buttonStyle = { variant: "outlined", sx: { textTransform: 'none' } };

    Chart.register({
        id: 'centerText',
        afterDraw: (chart) => {
            const ctx = chart.ctx;
            const total = chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
            const completed = chart.data.datasets[0].data[0];
            const percentage = ((completed / total) * 100).toFixed(0) + '%';
            ctx.save();
            ctx.font = '2em sans-serif';
            ctx.textBaseline = 'middle';
            ctx.textAlign = 'center';
            ctx.fillText(percentage, chart.width / 2, (chart.chartArea.top + chart.chartArea.bottom) / 2);
            ctx.restore();
        }
    });

    return (
        <Box>
            <Box display="flex" justifyContent="center" alignItems="center" gap="8%" marginBottom="6%" marginTop="4%">
                {Object.keys(BUTTON_LABELS).map(key => (
                    <Button key={key} {...buttonStyle} onClick={() => handleButtonClick(key)}>
                        {BUTTON_LABELS[key]}
                    </Button>
                ))}
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center">
                <Doughnut data={data} options={options} key={filterType} />
            </Box>
        </Box>
    );
}
