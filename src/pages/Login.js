// src/pages/Login.js
import React from 'react';
import {Layout} from "antd";
import RegistrationTeam from "../components/RegistrationTeam";
import {useMediaQuery} from "react-responsive";
import RegistrationInfo from "../components/RegistrationInfo";

const Login = () => {
    const isMobile = useMediaQuery({ maxWidth: 768 });
  return (
      <>
      <Layout>
          <Layout.Content style={{ padding: "10px", width: isMobile ? "97%" : "80%", margin: "0 auto" }}>
              <RegistrationInfo />
              <RegistrationTeam />
          </Layout.Content>
      </Layout>
      </>
  );
};

export default Login;
