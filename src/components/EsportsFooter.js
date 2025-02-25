import React from "react";
import { Layout } from "antd";
import "./esportsfooter.css";

const { Footer } = Layout;

const EsportsFooter = () => {
  return (
    <footer>
      {/* Background SVG */}
      <div className="background">
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink" // Используем camelCase для xmlns:xlink
          x="0px"
          y="0px"
          width="100%"
          height="100%"
          viewBox="0 0 3200 900" // Увеличиваем viewBox по ширине
        >
          <defs>
            <path
              id="wave"
              fill="rgba(105, 27, 252, 0.6)"
              d="M-727.704,502.589c0,0,473.976-41.997,1010.95,0
                s743.962,38.998,1151.942,0s587.97-39.278,1010.948,5.859s986.95,48.368,1433.926-4.995v560.106H-727.704V502.589z"
            />
          </defs>
          <g>
            <use href="#wave" opacity=".4">
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="translate"
                dur="12s" // Увеличиваем длительность анимации
                calcMode="spline"
                values="0 230; -668 180; 0 230" // Увеличиваем значения перемещения
                keyTimes="0; .5; 1"
                keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
                repeatCount="indefinite"
              />
            </use>
            <use href="#wave" opacity=".6">
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="translate"
                dur="10s" // Увеличиваем длительность анимации
                calcMode="spline"
                values="0 230; 486 220; 0 230" // Увеличиваем значения перемещения
                keyTimes="0; .6; 1"
                keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
                repeatCount="indefinite"
              />
            </use>
            <use href="#wave" opacity=".9">
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="translate"
                dur="8s" // Увеличиваем длительность анимации
                calcMode="spline"
                values="0 230; -280 200; 0 230" // Увеличиваем значения перемещения
                keyTimes="0; .4; 1"
                keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
                repeatCount="indefinite"
              />
            </use>
          </g>
        </svg>
      </div>

      {/* Footer Content */}
      <section>
        <ul className="socials">
          <li>
            <a className="fa-brands fa-x-twitter" href="#twitter">
              Twitter
            </a>
          </li>
          <li>
            <a className="fa-brands fa-facebook" href="#facebook">
              Facebook
            </a>
          </li>
          <li>
            <a className="fa-brands fa-linkedin" href="#linkedin">
              LinkedIn
            </a>
          </li>
        </ul>
        <ul className="links">
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#portfolio">Portfolio</a>
          </li>
          <li>
            <a href="#skillset">Skillset</a>
          </li>
          <li>
            <a href="#hire">Hire</a>
          </li>
        </ul>
        <p className="legal">© 2024 All rights reserved</p>
      </section>
    </footer>
  );
};

export default EsportsFooter;