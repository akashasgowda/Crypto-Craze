import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Statistic, Typography } from "antd";
import millify from "millify";

import { useGetCryptosQuery } from "../services/cryptoApi";

import Cryptocurrencies from "./Cryptocurrencies";
import CryptoNews from "./CryptoNews";
import './HomePage.css';

const { Title } = Typography;

const HomePage = () => {

  const { data, isFetching } = useGetCryptosQuery(10);

  if(isFetching)
  return 'Loading...';

  const globalStats = data.data.stats;
  /*
  total: 29521
  total24hVolume: "34023215834"
  totalCoins: 29521
  totalExchanges: 161
  totalMarketCap: "1052935777973"
  totalMarkets: 35512
*/

  return (
    <main className="home-page-view">

      <section className="global-stats">
      <Title level={2} className="heading">
        Global Crypto Stats
      </Title>
      <Row gutter={[32, 32]}>
        <Col span={12}>
          <Statistic title="Total Cryptocurrencies" value={globalStats.totalCoins} />
        </Col>
        <Col span={12}>
          <Statistic title="Total Exchanges" value={millify(globalStats.totalExchanges)} />
        </Col>
        <Col span={12}>
          <Statistic title="Total Markets" value={millify(globalStats.totalMarkets)} />
        </Col>
        <Col span={12}>
          <Statistic title="Total Market Cap:" value={millify(globalStats.totalMarketCap)} />
        </Col>
        <Col span={12}>
          <Statistic title="Total 24h Volume" value={millify(globalStats.total24hVolume)} />
        </Col>
      </Row>

      </section>


      <section className="top-10-cryptos">
        
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top 10 Cryptos In the world
        </Title>
        <Title level={5} className="show-more">
          <Link to="/cryptocurrencies">Show more</Link>
        </Title>
      </div>

      <Cryptocurrencies simplified={true} />

      </section>

      <section className="top-news">
      <div className="home-heading-container">
        <Title level={2} className="home-title">Latest Crypto News</Title>
        <Title level={5} className="show-more"><Link to="/cryptonews">Show more</Link></Title>
      </div>
      <CryptoNews simplified={true} />
      </section>

    </main>
  );
};

export default HomePage;
