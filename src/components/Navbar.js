import React, { useState } from "react";
import { Drawer, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Добавляем импорт CSS файла

const Navbar = () => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => setVisible(true);
  const closeDrawer = () => setVisible(false);

  const buttonStyle = {
    borderColor: "#FEA202",
    color: "#FEA202",
  };

  return (
    <nav className="navbar">
      {/* Логотип */}
      <div className="logo-container">
        <Link className="logo" to="/">
          <img src="/images/esl-logo.png" style={{ height: 24 }} alt="EMCO.TECH.SPORTS" />
        </Link>
        <a href="https://emcotech.site" target="_blank" rel="noopener noreferrer" className="menu-item">
          <img src="/images/emco-tech-logo.png" style={{ height: 24 }} alt="EMCO.TECH" />
        </a>
      </div>

      {/* Меню для десктопа */}
      <div className="desktop-menu ">
        <Link to="/">
          <Button  type="text" ghost className="rubik-mono-one-regular nav-bar-btn">
            Home
          </Button>
        </Link>
        <Link to="/about">
          <Button style={buttonStyle} type="default" ghost>
            About
          </Button>
        </Link>
        <Link to="/etl4">
          <Button style={buttonStyle} type="default" ghost>
            ETL4
          </Button>
        </Link>
        <Link to="/news">
          <Button style={buttonStyle} type="default" ghost>
            News
          </Button>
        </Link>
        <a href="https://emcotech.site" target="_blank" rel="noopener noreferrer">
          <Button style={buttonStyle} type="default" ghost>
            EMCO TECH <span style={{ fontSize: "0.8em", marginLeft: "3px" }}>↗</span>
          </Button>
        </a>
      </div>

      {/* Кнопка для мобильного меню */}
      <div className="mobile-menu-button">
        <Button type="text" className="menu-button" onClick={showDrawer}>
          <MenuOutlined style={{ fontSize: 24, color: "#fff" }} />
        </Button>
      </div>

      {/* Drawer для мобильного меню */}
      <Drawer title="Меню" placement="right" closable onClose={closeDrawer} open={visible}>
        <Link to="/" onClick={closeDrawer}>
          <Button style={buttonStyle} type="default" ghost block>
            Home
          </Button>
        </Link>
        <Link to="/about" onClick={closeDrawer}>
          <Button style={buttonStyle} type="default" ghost block>
            About
          </Button>
        </Link>
        <Link to="/etl4" onClick={closeDrawer}>
          <Button style={buttonStyle} type="default" ghost block>
            ETL4
          </Button>
        </Link>
        <Link to="/news" onClick={closeDrawer}>
          <Button style={buttonStyle} type="default" ghost block>
            News
          </Button>
        </Link>
        <a href="https://emcotech.com" target="_blank" rel="noopener noreferrer" onClick={closeDrawer}>
          <Button style={buttonStyle} type="default" ghost block>
            EMCO TECH <span style={{ fontSize: "0.8em", marginLeft: "3px" }}>↗</span>
          </Button>
        </a>
      </Drawer>
    </nav>
  );
};

export default Navbar;
