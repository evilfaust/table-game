import React from 'react';
import {Col, Divider, Row, Typography} from "antd";

const {Title, Paragraph} = Typography;

const RegistrationInfo = () => {
  return (
      <>
      {/*<Divider style={{ borderColor: "#FEA202", margin: "8px 0" }} />*/}
        <Row gutter={[16, 16]}>
            <Col span={6}>
                <img style={{width: "100%", borderRadius: "10px"}} src="https://emcotech.site/img/etl4/0p2a5011.jpg"
                     alt="EMCO.TECH.SPORTS"/>
                <img className="bottomleft" style={{height: "24px"}} src="/images/esl-logo.png" alt="EMCO.TECH.SPORTS"/>
            </Col>
            <Col span={18}>
                <Title level={4}>Заявочная компания продлится до 1 марта включительно.</Title>
                <Paragraph>
                    Следите за новостями в нашей
                    официальной группе ВК:{' '}
                    <a href="https://vk.com/emco.tech.sport" target="_blank" rel="noopener noreferrer">
                        https://vk.com/emco.tech.sport
                    </a>
                </Paragraph>
                <Paragraph>
                    К участию в соревнованиях допускаются только школьники, студенты СПО и студенты ВУЗов, проживающие в
                    Сахалинской области в возрасте от 14 лет.
                </Paragraph>
                <Paragraph>
                    Если ваша заявка не будет принята, вам сообщат об этом.
                </Paragraph>
                <Paragraph>
                    Капитаны команд будут приглашены в Телеграм канал для дальнейшей связи и получения информации.
                </Paragraph>
                <Paragraph>
                    <strong>Максимальное количество замен - 2</strong>
                </Paragraph>
            </Col>
        </Row>
          <Divider style={{ borderColor: "#FEA202", margin: "8px 0" }} />
          </>
  );
};

export default RegistrationInfo;
