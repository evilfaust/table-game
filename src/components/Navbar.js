import React, { useState } from "react";
import { Drawer, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom"; // Import useLocation
import "./Navbar.css";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const location = useLocation(); // Get current location

  // Helper function to check if a path is active
  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const showDrawer = () => setVisible(true);
  const closeDrawer = () => setVisible(false);

  const buttonStyle = {
    borderColor: "#FEA202",
    color: "#FEA202",
    marginBottom: "10px", // Добавляем отступ между пунктами меню
  };

  // Style for active buttons in the drawer
  const activeButtonStyle = {
    ...buttonStyle,
    color: "#000000", // Делаем текст активной кнопки черным
    boxShadow: "0 0 0 2px rgba(254, 162, 2, 0.2)",
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo-container">
        <Link className="logo" to="/">
          <img src="/images/esl-logo.png" style={{ height: 24 }} alt="EMCO.TECH.SPORTS" />
        </Link>
        <a href="https://emcotech.site" className="menu-item">
          <img src="/images/emco-tech-logo.png" style={{ height: 24 }} alt="EMCO.TECH" />
        </a>
      </div>

      {/* Desktop menu */}
      <div className="desktop-menu">
        <Link to="/">
          <Button
            type="text"
            ghost
            className={`rubik-mono-one-regular nav-bar-btn ${isActive("/") ? "active" : ""}`}
          >
            Home
          </Button>
        </Link>
        <Link to="/about">
          <Button
            type="text"
            ghost
            className={`rubik-mono-one-regular nav-bar-btn ${isActive("/about") ? "active" : ""}`}
          >
            About
          </Button>
        </Link>
        <Link to="/esl">
          <Button
            type="text"
            ghost
            className={`rubik-mono-one-regular nav-bar-btn ${isActive("/esl") ? "active" : ""}`}
          >
            ESL
          </Button>
        </Link>
        <Link to="/etl">
          <Button
            type="text"
            ghost
            className={`rubik-mono-one-regular nav-bar-btn ${isActive("/etl") ? "active" : ""}`}
          >
            ETL
          </Button>
        </Link>
        <Link to="/news">
          <Button
            type="text"
            ghost
            className={`rubik-mono-one-regular nav-bar-btn ${isActive("/news") ? "active" : ""}`}
          >
            News
          </Button>
        </Link>
        <a href="https://emcotech.site" >
          <Button
            type="text"
            ghost
            className="rubik-mono-one-regular nav-bar-btn"
          >
            EMCO TECH <span style={{ fontSize: "0.8em", marginLeft: "3px" }}>↗</span>
          </Button>
        </a>
      </div>

      {/* Mobile menu button */}
      <div className="mobile-menu-button">
        <Button type="text" className="menu-button" onClick={showDrawer}>
          <MenuOutlined style={{ fontSize: 24, color: "#fff" }} />
        </Button>
      </div>

      {/* Drawer for mobile menu */}
      <Drawer title="Меню" placement="right" closable onClose={closeDrawer} open={visible}>
        <Link to="/" onClick={closeDrawer}>
          <Button
            style={isActive("/") ? activeButtonStyle : buttonStyle}
            type="default"
            ghost
            block
          >
            Home
          </Button>
        </Link>
        <Link to="/about" onClick={closeDrawer}>
          <Button
            style={isActive("/about") ? activeButtonStyle : buttonStyle}
            type="default"
            ghost
            block
          >
            About
          </Button>
        </Link>
        <Link to="/esl" onClick={closeDrawer}>
          <Button
            style={isActive("/esl") ? activeButtonStyle : buttonStyle}
            type="default"
            ghost
            block
          >
            ETL
          </Button>
        </Link>
        <Link to="/etl" onClick={closeDrawer}>
          <Button
            style={isActive("/etl") ? activeButtonStyle : buttonStyle}
            type="default"
            ghost
            block
          >
            ETL
          </Button>
        </Link>
        <Link to="/news" onClick={closeDrawer}>
          <Button
            style={isActive("/news") ? activeButtonStyle : buttonStyle}
            type="default"
            ghost
            block
          >
            News
          </Button>
        </Link>
        <a href="https://emcotech.site" onClick={closeDrawer}>
          <Button
            style={buttonStyle}
            type="default"
            ghost
            block
          >
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
// import { Link, useLocation } from "react-router-dom"; // Import useLocation
// import "./Navbar.css";
//
// const Navbar = () => {
//   const [visible, setVisible] = useState(false);
//   const location = useLocation(); // Get current location
//
//   // Helper function to check if a path is active
//   const isActive = (path) => {
//     if (path === "/") {
//       return location.pathname === path;
//     }
//     return location.pathname.startsWith(path);
//   };
//
//   const showDrawer = () => setVisible(true);
//   const closeDrawer = () => setVisible(false);
//
//   const buttonStyle = {
//     borderColor: "#FEA202",
//     color: "#FEA202",
//   };
//
//   // Style for active buttons in the drawer
//   const activeButtonStyle = {
//     ...buttonStyle,
//     color: "#FFFFFF",
//     boxShadow: "0 0 0 2px rgba(254, 162, 2, 0.2)",
//   };
//
//   return (
//     <nav className="navbar">
//       {/* Logo */}
//       <div className="logo-container">
//         <Link className="logo" to="/">
//           <img src="/images/esl-logo.png" style={{ height: 24 }} alt="EMCO.TECH.SPORTS" />
//         </Link>
//         <a href="https://emcotech.site" className="menu-item">
//           <img src="/images/emco-tech-logo.png" style={{ height: 24 }} alt="EMCO.TECH" />
//         </a>
//       </div>
//
//       {/* Desktop menu */}
//       <div className="desktop-menu">
//         <Link to="/">
//           <Button
//             type="text"
//             ghost
//             className={`rubik-mono-one-regular nav-bar-btn ${isActive("/") ? "active" : ""}`}
//           >
//             Home
//           </Button>
//         </Link>
//         <Link to="/about">
//           <Button
//             type="text"
//             ghost
//             className={`rubik-mono-one-regular nav-bar-btn ${isActive("/about") ? "active" : ""}`}
//           >
//             About
//           </Button>
//         </Link>
//         <Link to="/esl">
//           <Button
//             type="text"
//             ghost
//             className={`rubik-mono-one-regular nav-bar-btn ${isActive("/esl") ? "active" : ""}`}
//           >
//             ESL
//           </Button>
//         </Link>
//         <Link to="/etl">
//           <Button
//             type="text"
//             ghost
//             className={`rubik-mono-one-regular nav-bar-btn ${isActive("/etl") ? "active" : ""}`}
//           >
//             ETL
//           </Button>
//         </Link>
//         <Link to="/news">
//           <Button
//             type="text"
//             ghost
//             className={`rubik-mono-one-regular nav-bar-btn ${isActive("/news") ? "active" : ""}`}
//           >
//             News
//           </Button>
//         </Link>
//         <a href="https://emcotech.site" >
//           <Button
//             type="text"
//             ghost
//             className="rubik-mono-one-regular nav-bar-btn"
//           >
//             EMCO TECH <span style={{ fontSize: "0.8em", marginLeft: "3px" }}>↗</span>
//           </Button>
//         </a>
//       </div>
//
//       {/* Mobile menu button */}
//       <div className="mobile-menu-button">
//         <Button type="text" className="menu-button" onClick={showDrawer}>
//           <MenuOutlined style={{ fontSize: 24, color: "#fff" }} />
//         </Button>
//       </div>
//
//       {/* Drawer for mobile menu */}
//       <Drawer title="Меню" placement="right" closable onClose={closeDrawer} open={visible}>
//         <Link to="/" onClick={closeDrawer}>
//           <Button
//             style={isActive("/") ? activeButtonStyle : buttonStyle}
//             className={isActive("/") ? "active" : ""}
//             type="default"
//             ghost
//             block
//           >
//             Home
//           </Button>
//         </Link>
//         <Link to="/about" onClick={closeDrawer}>
//           <Button
//             style={isActive("/about") ? activeButtonStyle : buttonStyle}
//             className={isActive("/about") ? "active" : ""}
//             type="default"
//             ghost
//             block
//           >
//             About
//           </Button>
//         </Link>
//         <Link to="/esl" onClick={closeDrawer}>
//           <Button
//             style={isActive("/esl") ? activeButtonStyle : buttonStyle}
//             className={isActive("/esl") ? "active" : ""}
//             type="default"
//             ghost
//             block
//           >
//             ETL
//           </Button>
//         </Link>
//         <Link to="/etl" onClick={closeDrawer}>
//           <Button
//             style={isActive("/etl") ? activeButtonStyle : buttonStyle}
//             className={isActive("/etl") ? "active" : ""}
//             type="default"
//             ghost
//             block
//           >
//             ETL
//           </Button>
//         </Link>
//         <Link to="/news" onClick={closeDrawer}>
//           <Button
//             style={isActive("/news") ? activeButtonStyle : buttonStyle}
//             className={isActive("/news") ? "active" : ""}
//             type="default"
//             ghost
//             block
//           >
//             News
//           </Button>
//         </Link>
//         <a href="https://emcotech.site" onClick={closeDrawer}>
//           <Button
//             style={buttonStyle}
//             type="default"
//             ghost
//             block
//           >
//             EMCO TECH <span style={{ fontSize: "0.8em", marginLeft: "3px" }}>↗</span>
//           </Button>
//         </a>
//       </Drawer>
//     </nav>
//   );
// };
//
// export default Navbar;
