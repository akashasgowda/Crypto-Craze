import React, { useEffect, useState } from 'react'
import HTMLReactParser from 'html-react-parser'
import { useParams } from 'react-router-dom'
import millify from 'millify'
import { Col, Row, Typography, Select } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';

import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../services/cryptoApi';
import LineChart from './LineChart';
import './CryptoDetails.css';

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {

  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState('24h');
  const { data: coinHistory } = useGetCryptoHistoryQuery({ coinId: coinId, timePeriod: timePeriod})
  const { data,  isFetching } = useGetCryptoDetailsQuery(coinId);

  if(isFetching)    
    return 'Loading...';

  const cryptoDetails = data && data.data && data.data.coin;

  console.log(coinHistory);



  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  const stats = [
    { title: 'Price to USD', value: `$ ${cryptoDetails.price && millify(cryptoDetails.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: cryptoDetails.rank, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$ ${cryptoDetails["24hVolume"] && millify(cryptoDetails["24hVolume"])}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${millify(cryptoDetails.allTimeHigh.price)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: cryptoDetails.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value: cryptoDetails.supply.supplyAt ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${millify(cryptoDetails.supply.total)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${millify(cryptoDetails.supply.circulating)}`, icon: <ExclamationCircleOutlined /> },
  ];
  
  return (
    <Col className='coin-detail-container'>
        <Col className='coin-heading-container'>
            <Title level={2} className='coin-name'>{cryptoDetails.name} ({cryptoDetails.symbol})</Title>
            <p>
                {cryptoDetails.name} live price in US dollars.
                View value statistics, market cap and supply.
            </p>
        </Col>

        {/* Selecting the time period */}
        <Select defaultValue='24h' className='select-timeperiod'
            placeholder="Select Timeperiod"
            onChange={(value)=> setTimePeriod(value)}
        >
            {time.map((date) => (
                <Option key={date}>{date}</Option>
            ))}
        </Select>

        {/* Line Chart */}
        <LineChart 
            coinHistory={coinHistory}
            currentPrice = {(cryptoDetails && cryptoDetails.price)}
            coinName = { cryptoDetails && cryptoDetails.name}
        />

        {/* Stats Container of the Coin */}

        <Col className='stats-container'>
            {/* Coin Stats */}
            <Col className='coin-value-statistics'>
                <Col className= 'coin-value-statistics-heading'>
                    <Title level={3} className='coin-details-heading'>{cryptoDetails.name} Value Statistics</Title>
                    <p>An overview showing the statistics of {cryptoDetails.name}, such as the base and quote currency, the rank, and trading volume.</p>
                </Col>

                {stats.map( ({icon,title, value}) => (
                     <Col className='coin-stats'>
                        <Col className='coin-stats-name'>
                            <Text>{icon}</Text>
                            <Text>{title}</Text>
                        </Col>
                        <Text className='stats'>{value}</Text>
                     </Col>
                ))}
            </Col>

            {/* Other Stats */}
            <Col className='other-stats-info'>
                <Col className='coin-value-statistics-heading'>
                    <Title level={3} className='coin-details-heading'>Other Stats Info</Title>
                    <p>An overview showing the statistics of all the cryptocurrencies</p>
                </Col>

                {genericStats.map( ({icon, title, value})  => (
                    <Col className='coin-stats'>
                        <Col className='coin-stats-name'>
                            <Text>{icon}</Text>
                            <Text>{title}</Text>
                        </Col>
                        <Text className='stats'>{value}</Text>
                    </Col>
                ))}
            </Col>
        </Col>
        
        {/* Questions and Links */}
        <Col className='coin-desc-link'>
            <Row className='coin-desc'>
                <Title level={3} className='coin-details-heading'>What is {cryptoDetails.name} ?</Title>
                <p>{HTMLReactParser(cryptoDetails.description)}</p>
            </Row>

            <Col className='coin-links'>
                <Title level={3} className='coin-details-heading'>
                    {cryptoDetails.name} Links
                </Title>
                {cryptoDetails && cryptoDetails.links.map( (link)=> (
                    <Row className='coin-link' key={link.name}>
                        <Title level={5} className='link-name'>
                            {link.type}
                        </Title>
                        <a href={link.url} target='_blank' rel='noreferrer'>{link.name}</a>
                    </Row>
                ))}
            </Col>
        </Col>
    </Col>
  )
}

export default CryptoDetails