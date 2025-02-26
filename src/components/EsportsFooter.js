import React from "react";
import {Avatar, Col, Layout, Row} from "antd";
import "./esportsfooter.css";
import {Link} from "react-router-dom";

const EsportsFooter = () => {
  return (
    <footer className="footer">
      {/* SVG Filter для анимации пузырьков */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <filter id="blob">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="blob"
            />
          </filter>
        </defs>
      </svg>
      {/* Bubbles Section */}
      <div className="bubbles">
        {/* Пузырьки с анимацией */}
        <div className="bubble" style={{"--size": "5.182432659732767rem", "--distance": "9.517536521968792rem", "--position": "84.30164439355454%", "--time": "3.5138964495139184s", "--delay": "-2.8776193841140953s"}}></div>
        <div className="bubble" style={{"--size": "3.7785352473243403rem", "--distance": "6.76766023161354rem", "--position": "26.53571654795858%", "--time": "3.3538987236443334s", "--delay": "-2.1171860497830197s"}}></div>
        <div className="bubble" style={{"--size": "2.5476143374049407rem", "--distance": "6.645821580014744rem", "--position": "80.30176496810004%", "--time": "3.901894357641715s", "--delay": "-3.531668888382576s"}}></div>
        <div className="bubble" style={{"--size": "3.020841341768196rem", "--distance": "7.4080366478722235rem", "--position": "37.444995907966266%", "--time": "3.832447009478338s", "--delay": "-3.135901236146672s"}}></div>
        <div className="bubble" style={{"--size": "2.321825235036971rem", "--distance": "6.410821258493148rem", "--position": "-3.691949134949639%", "--time": "3.2194844534157103s", "--delay": "-2.3555509322968624s"}}></div>
        <div className="bubble" style={{"--size": "3.6404465910157766rem", "--distance": "7.590845645753978rem", "--position": "-1.391007629052452%", "--time": "2.216733088759049s", "--delay": "-2.365561542164719s"}}></div>
        <div className="bubble" style={{"--size": "5.517713942255441rem", "--distance": "9.763374446336638rem", "--position": "65.65257764134694%", "--time": "2.726713666410368s", "--delay": "-3.2523740168136244s"}}></div>
        <div className="bubble" style={{"--size": "5.964587690210867rem", "--distance": "9.47197128042846rem", "--position": "27.177669441871572%", "--time": "3.219201096190257s", "--delay": "-2.193561269126349s"}}></div>
        <div className="bubble" style={{"--size": "4.133347534114931rem", "--distance": "9.285467747679235rem", "--position": "72.03992013261718%", "--time": "2.331365893965588s", "--delay": "-2.0622595835906576s"}}></div>
        <div className="bubble" style={{"--size": "5.383764723531457rem", "--distance": "8.294613982879063rem", "--position": "45.898184280093375%", "--time": "2.1205062677693074s", "--delay": "-3.250873052530303s"}}></div>
        <div className="bubble" style={{"--size": "4.731520655807342rem", "--distance": "8.116155880756022rem", "--position": "61.92109662116762%", "--time": "2.7892183007946127s", "--delay": "-2.9257832842237654s"}}></div>
        <div className="bubble" style={{"--size": "2.122251071675807rem", "--distance": "6.8755632813255545rem", "--position": "56.50565457838428%", "--time": "3.0500326615798787s", "--delay": "-2.6731427604573414s"}}></div>
        <div className="bubble" style={{"--size": "3.2597806471068766rem", "--distance": "6.366419348828367rem", "--position": "69.18576575526981%", "--time": "3.2095767636528865s", "--delay": "-2.925111830350559s"}}></div>
        <div className="bubble" style={{"--size": "5.127551146904916rem", "--distance": "8.554132992790354rem", "--position": "69.42254606012193%", "--time": "3.857209656374827s", "--delay": "-3.535825137163005s"}}></div>
        <div className="bubble" style={{"--size": "4.438062051585831rem", "--distance": "7.836734378841252rem", "--position": "73.9926911030432%", "--time": "3.7929964436768793s", "--delay": "-2.9976277778802927s"}}></div>
        <div className="bubble" style={{"--size": "2.053264426724528rem", "--distance": "7.39786584242004rem", "--position": "96.90279707075258%", "--time": "3.0616102700149286s", "--delay": "-3.314260664383394s"}}></div>
        <div className="bubble" style={{"--size": "5.248961866291321rem", "--distance": "9.415088052451747rem", "--position": "16.43002340079087%", "--time": "2.0662886828177327s", "--delay": "-3.5362648936277967s"}}></div>
        <div className="bubble" style={{"--size": "2.3526434195929884rem", "--distance": "8.624098997131675rem", "--position": "47.68005462223324%", "--time": "2.072380025097068s", "--delay": "-2.85169699682683s"}}></div>
        <div className="bubble" style={{"--size": "3.310379131891004rem", "--distance": "9.599689410478977rem", "--position": "22.611932242085043%", "--time": "3.4487898641464394s", "--delay": "-3.7720332405401296s"}}></div>
        <div className="bubble" style={{"--size": "3.139692342495316rem", "--distance": "8.29275618608214rem", "--position": "80.35440473818635%", "--time": "2.7582517164639753s", "--delay": "-2.5834004702280744s"}}></div>
        <div className="bubble" style={{"--size": "4.399279449479964rem", "--distance": "7.395222444859772rem", "--position": "78.46191898371444%", "--time": "2.105722329573065s", "--delay": "-3.2516227806922324s"}}></div>
      </div>

      <div className="content">
      <Layout style={{background: "#162938"}}>
        <Layout.Content >
          <Row gutter={[16, 16]} block center className="">
            <Col xs={24} md={24} lg={6}>
              <div className="logo-container" style={{marginBottom: "0.5rem"}}>
                <Link className="logo" to="/">
                  <img src="/images/emco-logo-w.png" style={{height: 42}} alt="EMCO"/>
                </Link>
                {/*<a href="https://emcotech.site" target="_blank" rel="noopener noreferrer" className="menu-item">*/}
                {/*  <img src="/images/emco-tech-logo.png" style={{height: 24}} alt="EMCO.TECH"/>*/}
                {/*</a>*/}
              </div>
              <div className="logo-container">
                <Link className="logo" to="/">
                  <img src="/images/esl-logo.png" style={{height: 24}} alt="EMCO.TECH.SPORTS"/>
                </Link>
                <a href="https://emcotech.site" target="_blank" rel="noopener noreferrer" className="menu-item">
                  <img src="/images/emco-tech-logo.png" style={{height: 24}} alt="EMCO.TECH"/>
                </a>
              </div>
            </Col>
            <Col xs={24} md={24} lg={6}>
              <div style={{justifyContent: "center"}}>
                <Avatar shape="square" size={64} src="/images/icon001.png" style={{marginRight: "5px"}}/>
                <Avatar shape="square" size={64} src="/images/icon002.png" style={{marginRight: "5px"}}/>
                <Avatar shape="square" size={64} src="/images/icon003.png" style={{marginRight: "5px"}}/>
                <Avatar shape="square" size={64} src="/images/icon004.png" style={{marginRight: "5px"}}/>
              </div>
            </Col>
            <Col xs={24} md={24} lg={12}>
              <div style={{justifyContent: "center"}}>
                <Avatar shape="square" size={64} src="/images/icon001.png" style={{marginRight: "5px"}}/>
                <Avatar shape="square" size={64} src="/images/icon002.png" style={{marginRight: "5px"}}/>
                <Avatar shape="square" size={64} src="/images/icon003.png" style={{marginRight: "5px"}}/>
                <Avatar shape="square" size={64} src="/images/icon004.png" style={{marginRight: "5px"}}/>
                <Avatar shape="square" size={64} src="/images/icon005.png" style={{marginRight: "5px"}}/>
                <Avatar shape="square" size={64} src="/images/icon006.png" style={{marginRight: "5px"}}/>
                <Avatar shape="square" size={64} src="/images/icon007.png" style={{marginRight: "5px"}}/>
                <Avatar shape="square" size={64} src="/images/icon008.png" style={{marginRight: "5px"}}/>
                <Avatar shape="square" size={64} src="/images/icon009.png" style={{marginRight: "5px"}}/>
                <Avatar shape="square" size={64} src="/images/icon010.png" style={{marginRight: "5px"}}/>
                <Avatar shape="square" size={64} src="/images/icon011.png" style={{marginRight: "5px"}}/>
                <Avatar shape="square" size={64} src="/images/icon012.png" style={{marginRight: "5px"}}/>
                <Avatar shape="square" size={64} src="/images/icon013.png" style={{marginRight: "5px"}}/>
                <Avatar shape="square" size={64} src="/images/icon014.png" style={{marginRight: "5px"}}/>
                <Avatar shape="square" size={64} src="/images/icon015.png" style={{marginRight: "5px"}}/>
                <Avatar shape="square" size={64} src="/images/icon016.png" style={{marginRight: "5px"}}/>
                <Avatar shape="square" size={64} src="/images/icon017.png" style={{marginRight: "5px"}}/>
                <Avatar shape="square" size={64} src="/images/icon018.png" style={{marginRight: "5px"}}/>
                <Avatar shape="square" size={64} src="/images/icon019.png" style={{marginRight: "5px"}}/>
                <Avatar shape="square" size={64} src="/images/icon020.png" style={{marginRight: "5px"}}/>
                <Avatar shape="square" size={64} src="/images/icon021.png" style={{marginRight: "5px"}}/>
                <Avatar shape="square" size={64} src="/images/icon022.png" style={{marginRight: "5px"}}/>
                <Avatar shape="square" size={64} src="/images/icon023.png" style={{marginRight: "5px"}}/>
                <Avatar shape="square" size={64} src="/images/icon024.png" style={{marginRight: "5px"}}/>
                <Avatar shape="square" size={64} src="/images/icon025.png" style={{marginRight: "5px"}}/>
                <Avatar shape="square" size={64} src="/images/icon026.png" style={{marginRight: "5px"}}/>
                <Avatar shape="square" size={64} src="/images/icon027.png" style={{marginRight: "5px"}}/>
                <Avatar shape="square" size={64} src="/images/icon028.png" style={{marginRight: "5px"}}/>
                <Avatar shape="square" size={64} src="/images/icon029.png" style={{marginRight: "5px"}}/>
            </div>
            </Col>
          </Row>
        </Layout.Content>
      </Layout>
      </div>
    </footer>
  );
};

export default EsportsFooter;