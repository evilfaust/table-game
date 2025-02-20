import React, { useState } from "react";
import { Drawer, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";

const Navbar = () => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => setVisible(true);
  const closeDrawer = () => setVisible(false);

  // Стиль для кнопок меню
  const menuButtonStyle = {
    fontSize: "16px",
    fontWeight: "500",
    color: "white",
    background: "transparent",
    border: "none",
    padding: "8px 12px",
    cursor: "pointer"
  };

  // Стиль для мобильных кнопок меню
  const mobileMenuButtonStyle = {
    display: "block",
    width: "100%",
    textAlign: "left",
    fontSize: "18px",
    padding: "12px 0",
    border: "none",
    background: "transparent",
    cursor: "pointer"
  };

  return (
    <nav className="navbar" style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      position: "relative"
    }}>
      {/* Логотип (слева) */}
      <div className="logo-container">
        <a className="logo" href="https://emcotech.site">
          <img src="/images/esl-logo.png" style={{ height: 24 }} alt="EMCO.TECH.SPORTS" />
        </a>
      </div>

      {/* Меню для десктопа (по центру) */}
      <div className="desktop-menu" style={{
        display: "flex",
        gap: "20px",
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)"
      }}>
        <Button
          type="link"
          href="https://emcotech.site"
          className="menu-item"
          style={menuButtonStyle}
        >
          Детский технопарк
        </Button>
        <Button
          type="link"
          href="https://emcotech.site/news"
          className="menu-item"
          style={menuButtonStyle}
        >
          Новости
        </Button>
        <Button
          type="link"
          href="https://emcotech.site/league"
          className="menu-item"
          style={menuButtonStyle}
        >
          О лиге
        </Button>
      </div>

      {/* Кнопка для мобильного меню (справа) */}
      <div className="mobile-menu-button">
        <Button type="text" className="menu-button" onClick={showDrawer}>
          <MenuOutlined style={{ fontSize: 24, color: "#fff" }} />
        </Button>
      </div>

      {/* Drawer для мобильного меню */}
      <Drawer
        title="Меню"
        placement="right"
        closable
        onClose={closeDrawer}
        open={visible}
      >
        <Button
          type="link"
          href="https://emcotech.site"
          className="drawer-item"
          style={mobileMenuButtonStyle}
        >
          Детский технопарк
        </Button>
        <Button
          type="link"
          href="https://emcotech.site/news"
          className="drawer-item"
          style={mobileMenuButtonStyle}
        >
          Новости
        </Button>
        <Button
          type="link"
          href="https://emcotech.site/league"
          className="drawer-item"
          style={mobileMenuButtonStyle}
        >
          О лиге
        </Button>
      </Drawer>
    </nav>
  );
};

export default Navbar;