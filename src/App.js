import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Layout, Typography, Space } from "antd";

import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import Cryptocurrencies from "./components/Cryptocurrencies";

import "./App.css";
import CryptoNews from "./components/CryptoNews";
import CryptoDetails from "./components/CryptoDetails";

const App = () => {

  return (
    <>
      <div className="app">
        <div className="navbar">
          <Navigation />
        </div>
        <div className="main">
          <Layout>
            <div className="routes">
              <Routes>
                <Route exact path="/" element={<HomePage />} />
                <Route exact path="/cryptocurrencies" element={<Cryptocurrencies simplified={false} />} />
                <Route exact path="/cryptonews" element={<CryptoNews simplified={false} />} />
                <Route exact path="/crypto/:coinId" element={<CryptoDetails/>} />
              </Routes>
            </div>
          </Layout>
          <div className="footer">
            <Typography.Title
              level={5}
              style={{ color: "white", textAlign: "center" }}
            >
              Copyright ©️ 2023
              <Link to="/">  Crypto Craze Inc.</Link>
              <br />
              All Rights Reserved
            </Typography.Title>
            <Space>
              <Link to="/">Home | </Link>
              <Link to="/cryptocurrencies">Cryptocurrencies |</Link>
              <Link to="/cryptonews">News</Link>
            </Space>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
