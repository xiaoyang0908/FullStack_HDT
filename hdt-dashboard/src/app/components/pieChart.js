import React, { useState, useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Box, Button } from "@mui/material";
import Chart from 'chart.js/auto';
import { color } from 'three/examples/jsm/nodes/shadernode/ShaderNode';

// Example of data structure
// const exerciseData = {  
//    'total': [120, 150], // User has completed 120 minutes out of a 150-minute goal.
//    'week': [30, 50],   // For the week, 30 minutes completed out of 50 minutes.
// };


const COLORS = {
    backgroundColor: [
        '#4AB5CC', // Done color 
        '#737BE5', // in process
        '#FFC536',  // awaiting start
        '#E66D39' //overdue
    ],
    borderColor: [
        '#4AB5CC', // Done color 
        '#737BE5', // in process
        '#FFC536',  // awaiting start
        '#E66D39' //overdue
    ]
};

const BUTTON_LABELS = {
    'total': 'Total',
    'week': 'Weekly',
    //'month': 'Månedlig'
};

export default function PieChart({ exerciseData }) {
    const [filterType, setFilterType] = useState('total');
    const [isClicked, setClick] = useState({
        "total":false,
        "week": false
    });
    const handleButtonClick = (type) => {
        setFilterType(type);
        setClick(prevState => ({
            ...prevState,
            [type]: !prevState[type]
        }));
    }

    const data = useMemo(() => {
        const doneTasks = exerciseData[filterType][0];  // Assuming index 0 is completed minutes
        const inProcessTasks = exerciseData[filterType][1]; // Assuming index 1 is the total target minutes
        const awaitingStartTasks = exerciseData[filterType][2];
        const OverdueTasks = exerciseData[filterType][3];

        return {
            labels: ['Done', 'In process', 'Awaiting start', 'Overdue'],
            datasets: [{
                data: [doneTasks, inProcessTasks,awaitingStartTasks,OverdueTasks], // Updated data array
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

    const buttonStyle = (isClicked) => ({ 
        variant: "outlined", 
        sx: { 
            textTransform: 'none',
            margin: '2px',
            width:"120px",
            borderRadius:"40px",
            borderColor:"#2A3F74",
            // fontWeight:"bold",
            backgroundColor: isClicked ? '#2A3F74' : '#EFF1FA', // Change background color on click
            color: isClicked ? 'white' : '#2A3F74', // Change font color on click
            '&:active': {
                backgroundColor: '#2A3F74', // Change background color when active (pressed)
                color: 'white', // Change font color when active (pressed)
            }
        } 
    });

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
            <Box sx={{ mb: 2, display:"flex", margin:2, justifyContent:"space-between",}}>
                {Object.keys(BUTTON_LABELS).map(key => (
                    <Button key={key} {...buttonStyle(isClicked[key])} onClick={() => handleButtonClick(key)}>
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
