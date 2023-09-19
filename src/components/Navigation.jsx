import React, { useEffect, useState } from "react";
import { Avatar, Button, Menu, Typography } from "antd";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  BulbOutlined,
  FundOutlined ,
  DeploymentUnitOutlined,
  MenuOutlined
} from "@ant-design/icons";

import icon from "../images/cc_logo.png";
import './Navigation.css';

const Navigation = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(null);

  useEffect(() => {
      const handleResize = () => setScreenSize(window.innerWidth);

      window.addEventListener('resize',handleResize);

      handleResize();

      return ()=> window.removeEventListener('resize',handleResize);
  }, []);
  
  useEffect(() => {

    if(screenSize <= 768)
    {
      setActiveMenu(false);
    }
    else{
      setActiveMenu(true);
    }

  },[ screenSize ]);

  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src={icon} size="default" style={{width:'120px',height:'120px' }} />
        <Typography.Title level={2} className="logo_title">
          <Link to="/">Crypto Craze</Link>
        </Typography.Title>
        <Button className="menu-control-container" onClick={() => setActiveMenu(!activeMenu)}> <MenuOutlined/> </Button>
      </div>

      { activeMenu && (

        <Menu theme="dark" className="menu-bar">
          <Menu.Item icon={<HomeOutlined />} key='home'>
            <Link to="/">Home</Link>
          </Menu.Item>

          <Menu.Item icon={<FundOutlined />} key='cryptocurrencies'> 
            <Link to="/cryptocurrencies">CryptoCurrencies</Link>
          </Menu.Item>

          <Menu.Item icon={<BulbOutlined/>} key='cryptonews'>
            <Link to="/cryptonews">CryptoNews</Link>
          </Menu.Item>

        </Menu>
      )}
    </div>
  );
};

export default Navigation;
