import React, { useEffect, useState } from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { Card, Row, Col, Input } from 'antd';

import { useGetCryptosQuery } from '../services/cryptoApi';
import './Cryptocurrencies.css';

const Cryptocurrencies = ({ simplified }) => {

    const count = simplified ? 10 : 100;
    const { data: cryptoList, isFetching } = useGetCryptosQuery(count);
    const [ cryptos, setCryptos ] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(()=>{
        setCryptos(cryptoList && cryptoList.data ? cryptoList.data.coins: []);

        const filteredData = cryptoList && cryptoList.data.coins ? cryptoList.data.coins.filter((coin)=> coin.name.toLowerCase().includes(searchTerm)):'';
        setCryptos(filteredData)

    }, [cryptoList, searchTerm])

    if(isFetching)  
        return 'Loading...'; 

    const cryptoClass = simplified? 'crypto-card-container': 'cryt-crd-container'; 
    
  return (
    <>
        {!simplified && (
            <div className='search-crypto'>
                <Input 
                    placeholder='Search Cryptocurrency'
                    onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
                />
            </div>
        )}
        <Row gutters={[52,52]} className={cryptoClass}>
            {/* Checks whether we have loaded with the cryptos from api
             and if that cryptos is array we can call map*/}

            {Array.isArray(cryptos) && cryptos.map((currency) => (
                <Col xs={24} sm={12} lg={6} className='crypto-card' key={currency.uuid}>
                    <Link to={`/crypto/${currency.uuid}`} key={currency.uuid}>
                        <Card 
                            title={`${currency.rank}. ${currency.name}`}
                            extra={<img className='crypto-image' src={currency.iconUrl} /> }
                            hoverable
                        >
                            <p>Price: ${Number(currency.price).toFixed(4)}</p>
                            <p>Market Cap: {millify(currency.marketCap)}</p>
                            <p>Daily Change: {millify(currency.change)}%</p>
                        </Card>
                    </Link>
                </Col>
            ))}
        </Row>
    </>
  );
};

export default Cryptocurrencies

