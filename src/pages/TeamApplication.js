// src/pages/TeamApplication.js
import React from 'react';
import {Layout} from "antd";
import RegistrationTeam from "../components/RegistrationTeam";
import {useMediaQuery} from "react-responsive";

const TeamApplication = () => {
    const isMobile = useMediaQuery({ maxWidth: 768 });
  return (
      <>

      x
    <div>
      <h1>Регистрация команды</h1>
      <p>Форма для регистрации команды будет здесь.</p>
    </div>
      <Layout>
          <Layout.Content style={{ padding: "10px", width: isMobile ? "97%" : "80%", margin: "0 auto" }}>
              <RegistrationTeam />
          </Layout.Content>
      </Layout>
      </>
  );
};

export default TeamApplication;
