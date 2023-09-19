import React, { useState } from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";

import { useGetCryptosQuery } from "../services/cryptoApi";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";

import './CryptoNews.css';

const demoImage = "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoNews = ({ simplified }) => {

  const [newsCategory, setNewsCategory] = useState('CryptoCurrency');

  const { data } = useGetCryptosQuery(100);

  const count = simplified ? 6 : 15;
  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({
    newsCategory,
    count: count,
  });

  if(isFetching) return 'Loading...';

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className='select-news'
            placeholder='Select a Crypto'
            optionFilterProp='children'
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) => String(option.children).toLowerCase().indexOf(input.toLowerCase()) >= 0 }
          >
            <Option value="Cryptocurrency">Cryptocurrency</Option>
            {data && data.data && data.data.coins && data.data.coins.map((coin) => (
              <Option value={coin.uuid} key={coin.uuid}> 
                {coin.name}
              </Option>
              ))}
          </Select>
      </Col>
      )}

      {cryptoNews &&
        cryptoNews.value.map((news, i) => (
          <Col xs={24} sm={12} lg={8} key={i}>
            <Card hoverable className="news-card">
              <a href={news.url} target="_blank" rel="noreferrer">
                <div className="news-image-container">
                  <Title className="news-title" level={4}>{news.name}</Title>
                  <img
                    src={news && news.image && news.image.thumbnail && news.image.thumbnail.contentUrl
                        ? news.image.thumbnail.contentUrl
                        : demoImage
                    }
                    alt="news_image"
                  />
                </div>
                <p>
                  {news.description > 100
                    ? `${news.description.substring(0, 100)}...`
                    : news.description}
                </p>

                <div className="provider-container">
                  <div>
                  <Avatar 
                     src={
                        news && news.provider && news.provider[0] && news.provider[0].image &&
                        news.provider[0].image.thumbnail && news.provider[0].image.thumbnail.contentUrl
                        ? news.provider[0].image.thumbnail.contentUrl
                        : demoImage
                     }
                      alt="news"
                  />
                  <Text className="provider-name">{news.provider[0].name}</Text>
                  </div>
                  <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
                </div>
              </a>
            </Card>
          </Col>
        ))}
    </Row>
  );
};

export default CryptoNews;
