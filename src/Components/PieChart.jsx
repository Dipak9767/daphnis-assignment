import React, { useEffect, useState } from 'react'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import {  Flex, Text } from '@chakra-ui/react';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ pieData, setIsPieChart, isPieChart }) => {

    const [pieChartData, setPieChartData] = useState({})

    const data = {
        labels: Object.keys(pieChartData),
        datasets: [
            {
                label: 'Total ',
                data: Object.values(pieChartData),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    useEffect(() => {
        setPieChartData(pieData)

    }, [pieData])

    const options = {
        responsive: true, 
        maintainAspectRatio: false, 
        width: 400, // Set width in pixels
        height: 400 // Set height in pixels
    };

    return (
        <Flex flexDirection={'row-reverse'}
            w={'80vw'}
            h={{base:'65vh' , md:"80vh"}}
            position={'absolute'}
            display={isPieChart ? 'flex' : 'none'}
            top={'12vh'}
            bg={'RGB(242 243 247)'}
            justifyContent={'center'}
            border={'2px solid RGB(122 107 176)'}
            borderRadius={'10px'}
            p={6}>
                
            <Text fontSize={'30px'}
                fontWeight={'bold'}
                mt={'-20px'}
                cursor={'pointer'}
                onClick={() => {
                    setIsPieChart(false)
                }}
            >
                X
            </Text>
            <Pie data={data} options={options} />
        </Flex>
    );

}

export default PieChart

