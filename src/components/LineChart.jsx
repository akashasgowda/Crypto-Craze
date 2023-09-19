import React from 'react'
import { Row, Col, Typography } from 'antd';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart } from 'react-chartjs-2'

import './LineChart.css';

const {Title} = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {

    const coinHistoryData = coinHistory && coinHistory.data;
    const coinCurrentPrice = Number(currentPrice).toFixed(3);

    const coinPrice = [];
    const coinTimeStamp = [];

    const coinHistData = coinHistoryData && coinHistoryData.history;
    const  n = coinHistData && coinHistData.length;

    for(let i=0; i<n; i+=1)
    {
        coinPrice.push(coinHistData[i].price);
        coinTimeStamp.push(new Date(coinHistData[i].timestamp).toLocaleString());
    }

    const data = {
        labels: coinTimeStamp,
        datasets: [
            {
                label: 'Price in USD',
                data: coinPrice,
                fill: false,
                backgroundColor: '#0071bd',
                borderColor: '#0071bd',
            }
        ],
    };

    const options = {
        scales: {
          x: {
            type: 'category', // Use 'category' scale for labels
            title: {
              display: true,
              text: 'Time' // Add an appropriate x-axis title
            }
          },
          y: {
            type: 'linear', // Use 'linear' scale for numeric data
            title: {
              display: true,
              text: 'Price in USD' // Add an appropriate y-axis title
            }
          }
        },
      };
      
      
      
  return (
    <>
        <Row className="chart-header">
            <Title level={2} className='chart-title'>{coinName} Price Chart</Title>
            <Col className='price-container'>
                <Title level={5} className='price-change'>Change: {coinHistoryData && coinHistoryData.change}%</Title>
                <Title level={5} className='current-price'>Current {coinName} Price: {coinCurrentPrice}</Title>
            </Col>
        </Row>

        <Line data={data} options={options} />
    </>
  )
}

export default LineChart