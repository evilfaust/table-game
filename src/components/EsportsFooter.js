// import "./esportsfooter.css";
import React from "react";
import { Layout } from "antd";
import {
  YoutubeOutlined,
  InstagramOutlined,
  DribbbleOutlined,
} from "@ant-design/icons";
import "./esportsfooter.css";
// import "./Footer.css";

const { Footer } = Layout;

const EsportsFooter = () => {
  return (
    <Footer className="spectacledcoder-footer">
      <div className="waves">
        <div className="wave" id="wave1"></div>
        <div className="wave" id="wave2"></div>
        <div className="wave" id="wave3"></div>
        <div className="wave" id="wave4"></div>
      </div>

      <div className="spectacledcoder-footer-content">
        <div className="spectacledcoder-footer-section">
          <h1 className="spectacledcoder-footer-heading">EMCO.TECH.SPORTS</h1>
        </div>
        <div className="spectacledcoder-footer-section">
          <ul className="d-footer-ul">
            <li className="d-footer-li-h"><b>Links</b></li>
            <li className="d-footer-li">Home</li>
            <li className="d-footer-li">About</li>
            <li className="d-footer-li">Blog</li>
            <li className="d-footer-li">Design</li>
            <li className="d-footer-li">Documentation</li>
          </ul>
        </div>
        <div className="spectacledcoder-footer-section">
          <ul className="d-footer-ul">
            <li className="d-footer-li-h"><b>Blog</b></li>
            <li className="d-footer-li">UI / UX</li>
            <li className="d-footer-li">CodePens</li>
            <li className="d-footer-li">Codedamn</li>
            <li className="d-footer-li">Figma</li>
            <li className="d-footer-li">Oracle EBS</li>
          </ul>
        </div>
        <div className="spectacledcoder-footer-section">
          <ul className="d-footer-ul">
            <li className="d-footer-li-h"><b>Privacy policy</b></li>
            <li className="d-footer-li-h"><b>Contact Us</b></li>
          </ul>
        </div>
        <div className="spectacledcoder-footer-section">
          <div className="logo-head">
            <b>Follow us on</b>
          </div>
          <div className="logo">
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
              <InstagramOutlined className="social-icon" />
            </a>
            <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
              <YoutubeOutlined className="social-icon" />
            </a>
            <a href="https://dribbble.com/" target="_blank" rel="noopener noreferrer">
              <DribbbleOutlined className="social-icon" />
            </a>
          </div>
        </div>
      </div>

      <div className="spectacledcoder-footer-bottom">
        <div className="spectacledcoder-footer-bottom-sec">
          <p>Icons by <a href="https://icons8.com/" target="_blank">Icons8</a></p>
        </div>
        <div className="spectacledcoder-footer-bottom-sec">
          <p>Designed & Created by EMCO.TECH.SPORTS</p>
        </div>
        <div className="spectacledcoder-footer-bottom-sec">
          <p>&copy; 2024 EMCO.TECH.SPORTS</p>
        </div>
      </div>
    </Footer>
  );
};

export default EsportsFooter;
