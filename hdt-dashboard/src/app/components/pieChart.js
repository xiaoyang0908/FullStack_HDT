import React, { useState, useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Box, Button } from "@mui/material";
import Chart from 'chart.js/auto';

// Example of data structure
// const exerciseData = {  
//    'total': [120, 150], // User has completed 120 minutes out of a 150-minute goal.
//    'week': [30, 50],   // For the week, 30 minutes completed out of 50 minutes.
// };


const COLORS = {
    backgroundColor: [
        'rgba(0, 128, 0, 0.7)', // Completed color - green
        'rgba(255, 0, 0, 0.7)'  // Missing color - red
    ],
    borderColor: [
        'rgba(0, 128, 0, 1)',
        'rgba(255, 0, 0, 1)'
    ]
};

const BUTTON_LABELS = {
    'total': 'Total',
    'week': 'Weekly',
    //'month': 'Månedlig'
};

export default function PieChart({ exerciseData }) {
    const [filterType, setFilterType] = useState('total');
    const handleButtonClick = (type) => setFilterType(type);

    const data = useMemo(() => {
        const completedMinutes = exerciseData[filterType][0];  // Assuming index 0 is completed minutes
        const totalTargetMinutes = exerciseData[filterType][1]; // Assuming index 1 is the total target minutes
        const missingMinutes = totalTargetMinutes - completedMinutes; // Calculate missing minutes

        return {
            labels: ['Completed', 'Missing'],
            datasets: [{
                data: [completedMinutes, missingMinutes], // Updated data array
                backgroundColor: COLORS.backgroundColor,
                borderColor: COLORS.borderColor,
                borderWidth: 1,
            }]
        };
    }, [exerciseData, filterType]);

    const options = {
        cutout: '70%',
        responsive: true,
        aspectRatio: 1.5,
        plugins: {
            legend: { 
                position: 'bottom',
                labels: {
                    padding: 10
                }
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        const labelData = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.dataIndex];
                        return `${labelData}%`;
                    }
                }
            }
        }
    };

    const buttonStyle = { 
        variant: "outlined", 
        sx: { 
            textTransform: 'none',
            margin: '2px',
        } 
    };

    Chart.register({
        id: 'centerText',
        afterDraw: (chart) => {
            const ctx = chart.ctx;
            const total = chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
            const completed = chart.data.datasets[0].data[0];
            const percentage = ((completed / total) * 100).toFixed(0) + '%';
            const fontSize = Math.min(chart.width, chart.height) / 7; 
    
            ctx.save();
            ctx.font = `${fontSize}px sans-serif`;
            ctx.textBaseline = 'middle';
            ctx.textAlign = 'center';
            ctx.fillText(percentage, chart.width / 2, (chart.chartArea.top + chart.chartArea.bottom) / 2);
            ctx.restore();
        }
    });

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', width: '100%', height: '100%' }}>
            <Box sx={{ mb: 2, flex: '0 0 auto', paddingTop: 2 }}>
                {Object.keys(BUTTON_LABELS).map(key => (
                    <Button key={key} {...buttonStyle} onClick={() => handleButtonClick(key)}>
                        {BUTTON_LABELS[key]}
                    </Button>
                ))}
            </Box>
            <Box sx={{flex: '1 1 auto', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', position: 'relative' }}>
                <Doughnut data={data} options={options} />
            </Box>
        </Box>
    );
}
