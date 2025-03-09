

import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Spin, Alert, Modal, Layout } from 'antd';
import EsportAbout from "../components/base/EsportAbout";
import PartnersSection from '../components/base/PartnersSection';


const About = () => {

    return (
        <>
          <EsportAbout />
          <Layout>
            <Layout.Content style={{ padding: "10px", width: "80%", margin: "0 auto" }}>
              <PartnersSection /> 
            </Layout.Content>
          </Layout>

        </>
    )
}


export default About

