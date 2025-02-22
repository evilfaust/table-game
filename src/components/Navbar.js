import React, { useState } from "react";
import { Drawer, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => setVisible(true);
  const closeDrawer = () => setVisible(false);

  const buttonStyle = {
    borderColor: "#FEA202",
    color: "#FEA202",
  };

  return (
    <nav className="navbar" style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      position: "relative"
    }}>
      {/* Логотип */}
      <div className="logo-container" style={{ display: "flex", alignItems: "center", gap: "24px" }}>
        <Link className="logo" to="/">
          <img src="/assets/esl-react/build/images/esl-logo.png" style={{ height: 24 }} alt="EMCO.TECH.SPORTS" />
        </Link>
        <a href="https://emcotech.site" target="_blank" rel="noopener noreferrer" className="menu-item">
          <img src="/assets/esl-react/build/images/emco-tech-logo.png" style={{ height: 24 }} alt="EMCO.TECH" />
        </a>
      </div>

      {/* Меню для десктопа */}
      <div className="desktop-menu" style={{
        display: "flex",
        gap: "20px",
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)"
      }}>
        <Link to="/">
          <Button style={buttonStyle} type="default" ghost>
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



// import React, { useState } from "react";
// import { Drawer, Button } from "antd";
// import { MenuOutlined } from "@ant-design/icons";
// import { Link } from "react-router-dom";
//
// const Navbar = () => {
//   const [visible, setVisible] = useState(false);
//
//   const showDrawer = () => setVisible(true);
//   const closeDrawer = () => setVisible(false);
//
//   return (
//     <nav className="navbar" style={{
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//       position: "relative"
//     }}>
//       {/* Логотип */}
//       <div className="logo-container" style={{ display: "flex", alignItems: "center", gap: "24px" }}>
//         <Link className="logo" to="/">
//           <img src="/assets/esl-react/build/images/esl-logo.png" style={{height: 24}} alt="EMCO.TECH.SPORTS"/>
//         </Link>
//         <a href="https://emcotech.site" target="_blank" rel="noopener noreferrer" className="menu-item">
//           <img src="/assets/esl-react/build/images/emco-tech-logo.png" style={{height: 24}} alt="EMCO.TECH"/>
//         </a>
//       </div>
//
//       {/* Меню для десктопа */}
//       <div className="desktop-menu" style={{
//         display: "flex",
//         gap: "20px",
//         position: "absolute",
//         left: "50%",
//         transform: "translateX(-50%)"
//       }}>
//         <Link to="/" className="menu-item">Home</Link>
//         <Link to="/about" className="menu-item">About</Link>
//         <Link to="/etl4" className="menu-item">ETL4</Link>
//         <Link to="/news" className="menu-item">News</Link>
//         <a href="https://emcotech.site" target="_blank" rel="noopener noreferrer" className="menu-item">
//           EMCO TECH <span style={{ fontSize: "0.8em", marginLeft: "3px" }}>↗</span>
//         </a>
//       </div>
//
//       {/* Кнопка для мобильного меню */}
//       <div className="mobile-menu-button">
//         <Button type="text" className="menu-button" onClick={showDrawer}>
//           <MenuOutlined style={{ fontSize: 24, color: "#fff" }} />
//         </Button>
//       </div>
//
//       {/* Drawer для мобильного меню */}
//       <Drawer title="Меню" placement="right" closable onClose={closeDrawer} open={visible}>
//         <Link to="/" className="drawer-item" onClick={closeDrawer}>Home</Link>
//         <Link to="/about" className="drawer-item" onClick={closeDrawer}>About</Link>
//         <Link to="/etl4" className="drawer-item" onClick={closeDrawer}>ETL4</Link>
//         <Link to="/news" className="drawer-item" onClick={closeDrawer}>News</Link>
//         <a href="https://emcotech.com" target="_blank" rel="noopener noreferrer" className="drawer-item">
//           EMCO TECH <span style={{ fontSize: "0.8em", marginLeft: "3px" }}>↗</span>
//         </a>
//       </Drawer>
//     </nav>
//   );
// };
//
// export default Navbar;


// import React, { useState } from "react";
// import { Drawer, Button } from "antd";
// import { MenuOutlined } from "@ant-design/icons";
// import { Link } from "react-router-dom";
//
// const Navbar = () => {
//   const [visible, setVisible] = useState(false);
//   const basename = process.env.PUBLIC_URL || "/assets/esl-react/build";
//
//   const showDrawer = () => setVisible(true);
//   const closeDrawer = () => setVisible(false);
//
//   return (
//     <nav className="navbar" style={{
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//       position: "relative"
//     }}>
//       {/* Логотип (слева) */}
//       <div className="logo-container">
//         <Link className="logo" to={`${basename}/`}>
//           <img src={`${basename}/images/esl-logo.png`} style={{ height: 24 }} alt="EMCO.TECH.SPORTS" />
//         </Link>
//       </div>
//
//       {/* Меню для десктопа (по центру) */}
//       <div className="desktop-menu" style={{
//         display: "flex",
//         gap: "20px",
//         position: "absolute",
//         left: "50%",
//         transform: "translateX(-50%)"
//       }}>
//         <Button type="link" as={Link} to={`${basename}/`}>
//           Home
//         </Button>
//         <Button type="link" as={Link} to={`${basename}/about`}>
//           About
//         </Button>
//         <Button type="link" as={Link} to={`${basename}/etl4`}>
//           ETL4
//         </Button>
//         <Button type="link" as={Link} to={`${basename}/news`}>
//           News
//         </Button>
//         <Button type="link" href="https://emcotech.com" target="_blank" rel="noopener noreferrer">
//           EMCO TECH <span style={{ fontSize: "0.8em", marginLeft: "3px" }}>↗</span>
//         </Button>
//       </div>
//
//       {/* Кнопка для мобильного меню (справа) */}
//       <div className="mobile-menu-button">
//         <Button type="text" className="menu-button" onClick={showDrawer}>
//           <MenuOutlined style={{ fontSize: 24, color: "#fff" }} />
//         </Button>
//       </div>
//
//       {/* Drawer для мобильного меню */}
//       <Drawer title="Меню" placement="right" closable onClose={closeDrawer} open={visible}>
//         <Button type="link" as={Link} to={`${basename}/`} onClick={closeDrawer}>
//           Home
//         </Button>
//         <Button type="link" as={Link} to={`${basename}/about`} onClick={closeDrawer}>
//           About
//         </Button>
//         <Button type="link" as={Link} to={`${basename}/etl4`} onClick={closeDrawer}>
//           ETL4
//         </Button>
//         <Button type="link" as={Link} to={`${basename}/news`} onClick={closeDrawer}>
//           News
//         </Button>
//         <Button type="link" href="https://emcotech.site" target="_blank" rel="noopener noreferrer">
//           EMCO TECH <span style={{ fontSize: "0.8em", marginLeft: "3px" }}>↗</span>
//         </Button>
//       </Drawer>
//     </nav>
//   );
// };
//
// export default Navbar;




// import React, { useState } from "react";
// import { Drawer, Button } from "antd";
// import { MenuOutlined } from "@ant-design/icons";
//
// const Navbar = () => {
//   const [visible, setVisible] = useState(false);
//
//   const showDrawer = () => setVisible(true);
//   const closeDrawer = () => setVisible(false);
//
//   // Стиль для кнопок меню
//   const menuButtonStyle = {
//     fontSize: "16px",
//     fontWeight: "500",
//     color: "white",
//     background: "transparent",
//     border: "none",
//     padding: "8px 12px",
//     cursor: "pointer"
//   };
//
//   // Стиль для мобильных кнопок меню
//   const mobileMenuButtonStyle = {
//     display: "block",
//     width: "100%",
//     textAlign: "left",
//     fontSize: "18px",
//     padding: "12px 0",
//     border: "none",
//     background: "transparent",
//     cursor: "pointer"
//   };
//
//   return (
//     <nav className="navbar" style={{
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//       position: "relative"
//     }}>
//       {/* Логотип (слева) */}
//       <div className="logo-container">
//         <a className="logo" href="https://emcotech.site">
//           <img src="/assets/esl-react/build/images/esl-logo.png" style={{ height: 24 }} alt="EMCO.TECH.SPORTS" />
//         </a>
//       </div>
//
//       {/* Меню для десктопа (по центру) */}
//       <div className="desktop-menu" style={{
//         display: "flex",
//         gap: "20px",
//         position: "absolute",
//         left: "50%",
//         transform: "translateX(-50%)"
//       }}>
//         <Button
//           type="link"
//           href="https://emcotech.site"
//           className="menu-item"
//           style={menuButtonStyle}
//         >
//           Детский технопарк
//         </Button>
//         <Button
//           type="link"
//           href="https://emcotech.site/news"
//           className="menu-item"
//           style={menuButtonStyle}
//         >
//           Новости
//         </Button>
//         <Button
//           type="link"
//           href="https://emcotech.site/league"
//           className="menu-item"
//           style={menuButtonStyle}
//         >
//           О лиге
//         </Button>
//       </div>
//
//       {/* Кнопка для мобильного меню (справа) */}
//       <div className="mobile-menu-button">
//         <Button type="text" className="menu-button" onClick={showDrawer}>
//           <MenuOutlined style={{ fontSize: 24, color: "#fff" }} />
//         </Button>
//       </div>
//
//       {/* Drawer для мобильного меню */}
//       <Drawer
//         title="Меню"
//         placement="right"
//         closable
//         onClose={closeDrawer}
//         open={visible}
//       >
//         <Button
//           type="link"
//           href="https://emcotech.site"
//           className="drawer-item"
//           style={mobileMenuButtonStyle}
//         >
//           Детский технопарк
//         </Button>
//         <Button
//           type="link"
//           href="https://emcotech.site/news"
//           className="drawer-item"
//           style={mobileMenuButtonStyle}
//         >
//           Новости
//         </Button>
//         <Button
//           type="link"
//           href="https://emcotech.site/league"
//           className="drawer-item"
//           style={mobileMenuButtonStyle}
//         >
//           О лиге
//         </Button>
//       </Drawer>
//     </nav>
//   );
// };
//
// export default Navbar;