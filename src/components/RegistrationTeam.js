import React from 'react';
import {
  Form,
  Input,
  Button,
  Upload,
  message,
  Checkbox,
  Row,
  Col,
  Divider,
  Select,
  Avatar,
  Typography,
  Tag
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import pb from '../pb';
import { useMediaQuery } from 'react-responsive';

const { Title } = Typography;

const RegistrationTeam = () => {
  const [form] = Form.useForm();
  const isMobile = useMediaQuery({ maxWidth: 768 });

  // Отслеживаем значение дисциплины через форму
  const disciplineValue = Form.useWatch('discipline', form);

  // Следим за никнеймами для динамических заголовков
  const captainNick = Form.useWatch(['captain', 'nickName'], form);
  const player2Nick = Form.useWatch(['player2', 'nickName'], form);
  const player3Nick = Form.useWatch(['player3', 'nickName'], form);
  const player4Nick = Form.useWatch(['player4', 'nickName'], form);
  const player5Nick = Form.useWatch(['player5', 'nickName'], form);
  const substitute1Nick = Form.useWatch(['substitute1', 'nickName'], form);
  const substitute2Nick = Form.useWatch(['substitute2', 'nickName'], form);

  const onFinish = async (values) => {
    console.log('Form values:', values);

    // Проверка аутентификации
    if (!pb.authStore.token) {
      message.error("Пользователь не аутентифицирован. Пожалуйста, войдите через Telegram.");
      return;
    }
    console.log('Authenticated user:', pb.authStore.model);

    const formData = new FormData();

    // Идентификатор пользователя
    formData.append('userId', pb.authStore.model.id);

    // Данные команды
    formData.append('teamName', values.teamName);
    formData.append('organizationName', values.organizationName);
    formData.append('discipline', values.discipline);
    if (values.teamLogo && values.teamLogo.length > 0) {
      formData.append('teamLogo', values.teamLogo[0].originFileObj);
    }

    // Данные капитана
    formData.append('captain_fullName', values.captain.fullName);
    formData.append('captain_nickName', values.captain.nickName);
    formData.append('captain_phone', values.captain.phone);
    formData.append('captain_telegram', values.captain.telegram);
    formData.append('captain_steamProfile', values.captain.steamProfile);
    if (values.captain.certificateFiles && values.captain.certificateFiles.length > 0) {
      values.captain.certificateFiles.forEach((file) => {
        formData.append('captain_certificateFiles', file.originFileObj);
      });
    }

    // Данные игроков (№2–№5)
    const players = ['player2', 'player3', 'player4', 'player5'];
    players.forEach((player) => {
      if (values[player]) {
        formData.append(`${player}_fullName`, values[player].fullName);
        formData.append(`${player}_nickName`, values[player].nickName);
        formData.append(`${player}_steamProfile`, values[player].steamProfile);
        if (values[player].certificateFiles && values[player].certificateFiles.length > 0) {
          values[player].certificateFiles.forEach((file) => {
            formData.append(`${player}_certificateFiles`, file.originFileObj);
          });
        }
      }
    });

    // Данные запасных игроков (опционально)
    const substitutes = ['substitute1', 'substitute2'];
    substitutes.forEach((substitute) => {
      if (values[substitute]) {
        if (values[substitute].fullName) {
          formData.append(`${substitute}_fullName`, values[substitute].fullName);
        }
        if (values[substitute].nickName) {
          formData.append(`${substitute}_nickName`, values[substitute].nickName);
        }
        if (values[substitute].steamProfile) {
          formData.append(`${substitute}_steamProfile`, values[substitute].steamProfile);
        }
        if (values[substitute].certificateFiles && values[substitute].certificateFiles.length > 0) {
          values[substitute].certificateFiles.forEach((file) => {
            formData.append(`${substitute}_certificateFiles`, file.originFileObj);
          });
        }
      }
    });

    // Флаг согласия
    formData.append('consent', values.consent ? 'true' : 'false');

    try {
      const record = await pb.collection('team_applications').create(formData);
      message.success('Заявка успешно отправлена!');
      form.resetFields();
      console.log('Created record:', record);
    } catch (error) {
      console.error('Ошибка создания записи:', error.data || error);
      message.error('Ошибка при отправке заявки');
    }
  };

  // Нормализация файлов для Upload
  const normFile = (e) => {
    if (Array.isArray(e)) return e;
    return e && e.fileList;
  };

  return (
      <>
    <div>
      <h1>Регистрация команды</h1>
      <Form form={form} onFinish={onFinish} layout="vertical">
        {/* Обертка для поля дисциплины с отображением картинки */}
        <Form.Item label="Дисциплина">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              flexDirection: isMobile ? 'column' : 'row',
              textAlign: isMobile ? 'center' : 'left'
            }}
          >
            {disciplineValue && (
              <div>
                {disciplineValue === 'Counter Strike 2' && (
                  <Tag color="#FEA202">
                    <img
                      src="/images/cs2-logo.png"
                      style={{ height: '48px' }}
                      alt="CS2 Logo"
                    />
                  </Tag>
                )}
                {disciplineValue === 'DOTA 2' && (
                  <Tag color="#FEA202">
                    <img
                      src="/images/dota2-logo.png"
                      style={{ height: '48px' }}
                      alt="Dota 2 Logo"
                    />
                  </Tag>
                )}
              </div>
            )}
            {/* Отдельный Form.Item без стилей для поля */}
            <Form.Item
              name="discipline"
              rules={[{ required: true, message: 'Выберите дисциплину' }]}
              noStyle
            >
              <Select placeholder="Выберите дисциплину">
                <Select.Option value="DOTA 2">DOTA 2</Select.Option>
                <Select.Option value="Counter Strike 2">
                  Counter Strike 2
                </Select.Option>
              </Select>
            </Form.Item>
          </div>
        </Form.Item>

        <Form.Item
          label="Название команды"
          name="teamName"
          rules={[{ required: true, message: 'Введите название команды' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Название образовательной организации"
          name="organizationName"
          rules={[{ required: true, message: 'Введите название организации' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Логотип команды"
          name="teamLogo"
          rules={[{ required: true, message: 'Загрузите логотип команды' }]}
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload name="logo" beforeUpload={() => false} maxCount={1}>
            <Button icon={<UploadOutlined />}>Загрузить логотип</Button>
          </Upload>
        </Form.Item>
        <Divider style={{ borderColor: "#FEA202", margin: "16px 0" }} />

        {/* Данные капитана */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            flexDirection: isMobile ? 'column' : 'row',
            textAlign: isMobile ? 'center' : 'left'
          }}
        >
          {disciplineValue === 'Counter Strike 2' && (
            <Avatar size={48} shape="square" src="/images/icon033.png" />
          )}
          {disciplineValue === 'DOTA 2' && (
            <Avatar size={48} shape="square" src="/images/icon028.png" />
          )}
          <Title level={4} style={{ textAlign: "left" }}>
            {captainNick ? `Капитан команды: ${captainNick}` : "Капитан команды"}
          </Title>
        </div>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              label="Фамилия Имя"
              name={['captain', 'fullName']}
              rules={[{ required: true, message: 'Введите ФИО капитана' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Никнейм"
              name={['captain', 'nickName']}
              rules={[{ required: true, message: 'Введите никнейм капитана' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Телефон для связи"
              name={['captain', 'phone']}
              rules={[{ required: true, message: 'Введите номер телефона' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Telegram для связи"
              name={['captain', 'telegram']}
              rules={[{ required: true, message: 'Введите Telegram' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Ссылка на профиль в Steam"
              name={['captain', 'steamProfile']}
              rules={[{ required: true, message: 'Введите ссылку на профиль в Steam' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Справка из учебного заведения"
              name={['captain', 'certificateFiles']}
              rules={[{ required: true, message: 'Загрузите справку' }]}
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload name="certificate" beforeUpload={() => false} multiple maxCount={20}>
                <Button icon={<UploadOutlined />}>Загрузить справку</Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
        <Divider style={{ borderColor: "#FEA202", margin: "16px 0" }} />

        {/* Данные игроков №2–№5 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            flexDirection: isMobile ? 'column' : 'row',
            textAlign: isMobile ? 'center' : 'left'
          }}
        >
          {disciplineValue === 'Counter Strike 2' && (
            <Avatar size={48} shape="square" src="/images/icon034.png" />
          )}
          {disciplineValue === 'DOTA 2' && (
            <Avatar size={48} shape="square" src="/images/icon036.png" />
          )}
          <Title level={4} style={{ textAlign: "left" }}>
            {player2Nick ? `Игрок: ${player2Nick}` : "Игрок №2"}
          </Title>
        </div>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              label="Фамилия Имя"
              name={['player2', 'fullName']}
              rules={[{ required: true, message: 'Введите ФИО игрока №2' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Никнейм"
              name={['player2', 'nickName']}
              rules={[{ required: true, message: 'Введите никнейм игрока №2' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Ссылка на профиль в Steam"
              name={['player2', 'steamProfile']}
              rules={[{ required: true, message: 'Введите ссылку на профиль в Steam для игрока №2' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Справка из учебного заведения"
              name={['player2', 'certificateFiles']}
              rules={[{ required: true, message: 'Загрузите справку для игрока №2' }]}
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload name="certificate" beforeUpload={() => false} multiple maxCount={20}>
                <Button icon={<UploadOutlined />}>Загрузить справку</Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
        <Divider style={{ borderColor: "#FEA202", margin: "16px 0" }} />

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            flexDirection: isMobile ? 'column' : 'row',
            textAlign: isMobile ? 'center' : 'left'
          }}
        >
          {disciplineValue === 'Counter Strike 2' && (
            <Avatar size={48} shape="square" src="/images/icon034.png" />
          )}
          {disciplineValue === 'DOTA 2' && (
            <Avatar size={48} shape="square" src="/images/icon036.png" />
          )}
          <Title level={4} style={{ textAlign: "left" }}>
            {player3Nick ? `Игрок: ${player3Nick}` : "Игрок №3"}
          </Title>
        </div>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              label="Фамилия Имя"
              name={['player3', 'fullName']}
              rules={[{ required: true, message: 'Введите ФИО игрока №3' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Никнейм"
              name={['player3', 'nickName']}
              rules={[{ required: true, message: 'Введите никнейм игрока №3' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Ссылка на профиль в Steam"
              name={['player3', 'steamProfile']}
              rules={[{ required: true, message: 'Введите ссылку на профиль в Steam для игрока №3' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Справка из учебного заведения"
              name={['player3', 'certificateFiles']}
              rules={[{ required: true, message: 'Загрузите справку для игрока №3' }]}
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload name="certificate" beforeUpload={() => false} multiple maxCount={20}>
                <Button icon={<UploadOutlined />}>Загрузить справку</Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
        <Divider style={{ borderColor: "#FEA202", margin: "16px 0" }} />

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            flexDirection: isMobile ? 'column' : 'row',
            textAlign: isMobile ? 'center' : 'left'
          }}
        >
          {disciplineValue === 'Counter Strike 2' && (
            <Avatar size={48} shape="square" src="/images/icon034.png" />
          )}
          {disciplineValue === 'DOTA 2' && (
            <Avatar size={48} shape="square" src="/images/icon036.png" />
          )}
          <Title level={4} style={{ textAlign: "left" }}>
            {player4Nick ? `Игрок: ${player4Nick}` : "Игрок №4"}
          </Title>
        </div>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              label="Фамилия Имя"
              name={['player4', 'fullName']}
              rules={[{ required: true, message: 'Введите ФИО игрока №4' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Никнейм"
              name={['player4', 'nickName']}
              rules={[{ required: true, message: 'Введите никнейм игрока №4' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Ссылка на профиль в Steam"
              name={['player4', 'steamProfile']}
              rules={[{ required: true, message: 'Введите ссылку на профиль в Steam для игрока №4' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Справка из учебного заведения"
              name={['player4', 'certificateFiles']}
              rules={[{ required: true, message: 'Загрузите справку для игрока №4' }]}
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload name="certificate" beforeUpload={() => false} multiple maxCount={20}>
                <Button icon={<UploadOutlined />}>Загрузить справку</Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
        <Divider style={{ borderColor: "#FEA202", margin: "16px 0" }} />

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            flexDirection: isMobile ? 'column' : 'row',
            textAlign: isMobile ? 'center' : 'left'
          }}
        >
          {disciplineValue === 'Counter Strike 2' && (
            <Avatar size={48} shape="square" src="/images/icon034.png" />
          )}
          {disciplineValue === 'DOTA 2' && (
            <Avatar size={48} shape="square" src="/images/icon036.png" />
          )}
          <Title level={4} style={{ textAlign: "left" }}>
            {player5Nick ? `Игрок: ${player5Nick}` : "Игрок №5"}
          </Title>
        </div>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              label="Фамилия Имя"
              name={['player5', 'fullName']}
              rules={[{ required: true, message: 'Введите ФИО игрока №5' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Никнейм"
              name={['player5', 'nickName']}
              rules={[{ required: true, message: 'Введите никнейм игрока №5' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Ссылка на профиль в Steam"
              name={['player5', 'steamProfile']}
              rules={[{ required: true, message: 'Введите ссылку на профиль в Steam для игрока №5' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Справка из учебного заведения"
              name={['player5', 'certificateFiles']}
              rules={[{ required: true, message: 'Загрузите справку для игрока №5' }]}
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload name="certificate" beforeUpload={() => false} multiple maxCount={20}>
                <Button icon={<UploadOutlined />}>Загрузить справку</Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
        <Divider style={{ borderColor: "#FEA202", margin: "16px 0" }} />

        {/* Данные запасных игроков */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            flexDirection: isMobile ? 'column' : 'row',
            textAlign: isMobile ? 'center' : 'left'
          }}
        >
          {disciplineValue === 'Counter Strike 2' && (
            <Avatar size={48} shape="square" src="/images/icon035.png" />
          )}
          {disciplineValue === 'DOTA 2' && (
            <Avatar size={48} shape="square" src="/images/icon037.png" />
          )}
          <Title level={4} style={{ textAlign: "left" }}>
            {substitute1Nick ? `Запасной игрок: ${substitute1Nick}` : "Запасной игрок 1"}
          </Title>
        </div>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item label="Фамилия Имя" name={['substitute1', 'fullName']}>
              <Input />
            </Form.Item>
            <Form.Item
              label="Никнейм"
              name={['substitute1', 'nickName']}
              rules={[{ required: false, message: 'Введите никнейм запасного игрока' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Ссылка на профиль в Steam" name={['substitute1', 'steamProfile']}>
              <Input />
            </Form.Item>
            <Form.Item
              label="Справка из учебного заведения"
              name={['substitute1', 'certificateFiles']}
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload name="certificate" beforeUpload={() => false} multiple maxCount={20}>
                <Button icon={<UploadOutlined />}>Загрузить справку</Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
        <Divider style={{ borderColor: "#FEA202", margin: "16px 0" }} />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            flexDirection: isMobile ? 'column' : 'row',
            textAlign: isMobile ? 'center' : 'left'
          }}
        >
          {disciplineValue === 'Counter Strike 2' && (
            <Avatar size={48} shape="square" src="/images/icon035.png" />
          )}
          {disciplineValue === 'DOTA 2' && (
            <Avatar size={48} shape="square" src="/images/icon037.png" />
          )}
          <Title level={4} style={{ textAlign: "left" }}>
            {substitute2Nick ? `Запасной игрок: ${substitute2Nick}` : "Запасной игрок 2"}
          </Title>
        </div>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item label="Фамилия Имя" name={['substitute2', 'fullName']}>
              <Input />
            </Form.Item>
            <Form.Item
              label="Никнейм"
              name={['substitute2', 'nickName']}
              rules={[{ required: false, message: 'Введите никнейм запасного игрока' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Ссылка на профиль в Steam" name={['substitute2', 'steamProfile']}>
              <Input />
            </Form.Item>
            <Form.Item
              label="Справка из учебного заведения"
              name={['substitute2', 'certificateFiles']}
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload name="certificate" beforeUpload={() => false} multiple maxCount={20}>
                <Button icon={<UploadOutlined />}>Загрузить справку</Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
        <Divider style={{ borderColor: "#FEA202", margin: "16px 0" }} />

        {/* Согласие с политикой */}
        <Form.Item
          name="consent"
          valuePropName="checked"
          rules={[{ required: true, message: 'Необходимо согласиться с политикой обработки персональных данных' }]}
        >
          <Checkbox>
            С политикой обработки персональных данных и правилами турнира ознакомлен
          </Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Подать заявку
          </Button>
        </Form.Item>
      </Form>
    </div>
        </>
  );
};

export default RegistrationTeam;



// import React, {useState} from 'react';
// import {
//   Form,
//   Input,
//   Button,
//   Upload,
//   message,
//   Checkbox,
//   Row,
//   Col,
//   Divider,
//   Select,
//   Avatar,
//   Typography,
//   Image, Tag
// } from 'antd';
// import { UploadOutlined } from '@ant-design/icons';
// import pb from '../pb';
// import { useMediaQuery } from 'react-responsive';
// const { Title } = Typography;
//
// const RegistrationTeam = () => {
//   const [form] = Form.useForm();
//   // отслеживание соотнощения сторон
//   const isMobile = useMediaQuery({ maxWidth: 768 });
//   const [selectedDiscipline, setSelectedDiscipline] = useState(null);
//   // Наблюдение за никнеймами для динамических заголовков
//   const captainNick = Form.useWatch(['captain', 'nickName'], form);
//   const player2Nick = Form.useWatch(['player2', 'nickName'], form);
//   const player3Nick = Form.useWatch(['player3', 'nickName'], form);
//   const player4Nick = Form.useWatch(['player4', 'nickName'], form);
//   const player5Nick = Form.useWatch(['player5', 'nickName'], form);
//   const substitute1Nick = Form.useWatch(['substitute1', 'nickName'], form);
//   const substitute2Nick = Form.useWatch(['substitute2', 'nickName'], form);
//
//   const onFinish = async (values) => {
//     console.log('Form values:', values);
//
//     // Проверка аутентификации
//     if (!pb.authStore.token) {
//       message.error("Пользователь не аутентифицирован. Пожалуйста, войдите через Telegram.");
//       return;
//     }
//     console.log('Authenticated user:', pb.authStore.model);
//
//     const formData = new FormData();
//
//     // Идентификатор пользователя
//     formData.append('userId', pb.authStore.model.id);
//
//     // Данные команды
//     formData.append('teamName', values.teamName);
//     formData.append('organizationName', values.organizationName);
//     formData.append('discipline', values.discipline);
//     if (values.teamLogo && values.teamLogo.length > 0) {
//       formData.append('teamLogo', values.teamLogo[0].originFileObj);
//     }
//
//     // Данные капитана
//     formData.append('captain_fullName', values.captain.fullName);
//     formData.append('captain_nickName', values.captain.nickName);
//     formData.append('captain_phone', values.captain.phone);
//     formData.append('captain_telegram', values.captain.telegram);
//     formData.append('captain_steamProfile', values.captain.steamProfile);
//     if (values.captain.certificateFiles && values.captain.certificateFiles.length > 0) {
//       values.captain.certificateFiles.forEach((file) => {
//         formData.append('captain_certificateFiles', file.originFileObj);
//       });
//     }
//
//     // Данные игроков (№2–№5)
//     const players = ['player2', 'player3', 'player4', 'player5'];
//     players.forEach((player) => {
//       if (values[player]) {
//         formData.append(`${player}_fullName`, values[player].fullName);
//         formData.append(`${player}_nickName`, values[player].nickName);
//         formData.append(`${player}_steamProfile`, values[player].steamProfile);
//         if (values[player].certificateFiles && values[player].certificateFiles.length > 0) {
//           values[player].certificateFiles.forEach((file) => {
//             formData.append(`${player}_certificateFiles`, file.originFileObj);
//           });
//         }
//       }
//     });
//
//     // Данные запасных игроков (опционально)
//     const substitutes = ['substitute1', 'substitute2'];
//     substitutes.forEach((substitute) => {
//       if (values[substitute]) {
//         if (values[substitute].fullName) {
//           formData.append(`${substitute}_fullName`, values[substitute].fullName);
//         }
//         if (values[substitute].nickName) {
//           formData.append(`${substitute}_nickName`, values[substitute].nickName);
//         }
//         if (values[substitute].steamProfile) {
//           formData.append(`${substitute}_steamProfile`, values[substitute].steamProfile);
//         }
//         if (values[substitute].certificateFiles && values[substitute].certificateFiles.length > 0) {
//           values[substitute].certificateFiles.forEach((file) => {
//             formData.append(`${substitute}_certificateFiles`, file.originFileObj);
//           });
//         }
//       }
//     });
//
//     // Флаг согласия
//     formData.append('consent', values.consent ? 'true' : 'false');
//
//     try {
//       const record = await pb.collection('team_applications').create(formData);
//       message.success('Заявка успешно отправлена!');
//       form.resetFields();
//       console.log('Created record:', record);
//     } catch (error) {
//       console.error('Ошибка создания записи:', error.data || error);
//       message.error('Ошибка при отправке заявки');
//     }
//   };
//
//   // Нормализация файлов для Upload
//   const normFile = (e) => {
//     if (Array.isArray(e)) return e;
//     return e && e.fileList;
//   };
//
//   return (
//     <div>
//       <h1>Регистрация команды</h1>
//       <Form form={form} onFinish={onFinish} layout="vertical">
//         <Form.Item
//             label="Дисциплина"
//             name="discipline"
//             rules={[{required: true, message: 'Выберите дисциплину'}]}
//         >
//           <div style={{
//             display: 'flex',
//             alignItems: 'center',
//             gap: 10,
//             flexDirection: isMobile ? 'column' : 'row',
//             textAlign: isMobile ? 'center' : 'left'
//           }}>
//             {selectedDiscipline && (
//                 <div>
//                   {selectedDiscipline === 'Counter Strike 2' && (
//                       <Tag color="#162938"><img src="/images/cs2-logo.png" style={{height: '48px'}}
//                                                 alt="CS2 Logo"/></Tag>
//                   )}
//                   {selectedDiscipline === 'DOTA 2' && (
//                       <Tag color="#162938"><img src="/images/dota2-logo.png" style={{height: '48px'}}
//                                                 alt="Dota 2 Logo"/></Tag>
//                   )}
//                 </div>
//             )}
//             <Select
//                 placeholder="Выберите дисциплину"
//                 onChange={value => setSelectedDiscipline(value)}
//             >
//               <Select.Option value="DOTA 2">DOTA 2</Select.Option>
//               <Select.Option value="Counter Strike 2">Counter Strike 2</Select.Option>
//             </Select>
//           </div>
//         </Form.Item>
//         {/* Данные команды */}
//         <Form.Item
//             label="Название команды"
//             name="teamName"
//             rules={[{required: true, message: 'Введите название команды'}]}
//         >
//           <Input/>
//         </Form.Item>
//         <Form.Item
//             label="Название образовательной организации"
//             name="organizationName"
//             rules={[{required: true, message: 'Введите название организации'}]}
//         >
//           <Input/>
//         </Form.Item>
//
//         <Form.Item
//             label="Логотип команды"
//             name="teamLogo"
//             rules={[{required: true, message: 'Загрузите логотип команды'}]}
//             valuePropName="fileList"
//             getValueFromEvent={normFile}
//         >
//           <Upload name="logo" beforeUpload={() => false} maxCount={1}>
//             <Button icon={<UploadOutlined/>}>Загрузить логотип</Button>
//           </Upload>
//         </Form.Item>
//         <Divider style={{borderColor: "#FEA202", margin: "16px 0"}}/>
//
//         {/* Данные капитана */}
//         <div style={{
//           display: 'flex',
//           alignItems: 'center',
//           gap: 10,
//           flexDirection: isMobile ? 'column' : 'row',
//           textAlign: isMobile ? 'center' : 'left'
//         }}>
//           {selectedDiscipline === 'Counter Strike 2' && (
//               <Avatar size={48} shape='square' src="/images/icon033.png"/>
//           )}
//           {selectedDiscipline === 'DOTA 2' && (
//               <Avatar size={48} shape='square' src="/images/icon028.png"/>
//           )}
//           <Title level={4}
//                  style={{textAlign: "left"}}>{captainNick ? `Капитан команды: ${captainNick}` : "Капитан команды"}</Title>
//         </div>
//         {/*<h2>{captainNick ? `Капитан команды: ${captainNick}` : "Капитан команды"}</h2>*/}
//         <Row gutter={[16, 16]}>
//           <Col span={12}>
//             <Form.Item
//                 label="Фамилия Имя"
//                 name={['captain', 'fullName']}
//                 rules={[{required: true, message: 'Введите ФИО капитана'}]}
//             >
//               <Input/>
//             </Form.Item>
//             <Form.Item
//                 label="Никнейм"
//                 name={['captain', 'nickName']}
//                 rules={[{required: true, message: 'Введите никнейм капитана'}]}
//             >
//               <Input/>
//             </Form.Item>
//             <Form.Item
//                 label="Телефон для связи"
//                 name={['captain', 'phone']}
//                 rules={[{required: true, message: 'Введите номер телефона'}]}
//             >
//               <Input/>
//             </Form.Item>
//           </Col>
//           <Col span={12}>
//             <Form.Item
//                 label="Telegram для связи"
//                 name={['captain', 'telegram']}
//                 rules={[{required: true, message: 'Введите Telegram'}]}
//             >
//               <Input/>
//             </Form.Item>
//             <Form.Item
//                 label="Ссылка на профиль в Steam"
//                 name={['captain', 'steamProfile']}
//                 rules={[{required: true, message: 'Введите ссылку на профиль в Steam'}]}
//             >
//               <Input/>
//             </Form.Item>
//             <Form.Item
//                 label="Справка из учебного заведения"
//                 name={['captain', 'certificateFiles']}
//                 rules={[{required: true, message: 'Загрузите справку'}]}
//                 valuePropName="fileList"
//                 getValueFromEvent={normFile}
//             >
//               <Upload name="certificate" beforeUpload={() => false} multiple maxCount={20}>
//                 <Button icon={<UploadOutlined/>}>Загрузить справку</Button>
//               </Upload>
//             </Form.Item>
//           </Col>
//         </Row>
//         <Divider style={{borderColor: "#FEA202", margin: "16px 0"}}/>
//
//         {/* Данные игроков №2–№5 */}
//         <div style={{
//           display: 'flex',
//           alignItems: 'center',
//           gap: 10,
//           flexDirection: isMobile ? 'column' : 'row',
//           textAlign: isMobile ? 'center' : 'left'
//         }}>
//           {selectedDiscipline === 'Counter Strike 2' && (
//               <Avatar size={48} shape='square' src="/images/icon034.png"/>
//           )}
//           {selectedDiscipline === 'DOTA 2' && (
//               <Avatar size={48} shape='square' src="/images/icon028.png"/>
//           )}
//           <Title level={4}
//                  style={{textAlign: "left"}}>{player2Nick ? `Игрок: ${player2Nick}` : "Игрок №2"}</Title>
//         </div>
//         {/*<h2>{player2Nick ? `Игрок: ${player2Nick}` : "Игрок №2"}</h2>*/}
//         <Row gutter={[16, 16]}>
//           <Col span={12}>
//             <Form.Item
//                 label="Фамилия Имя"
//                 name={['player2', 'fullName']}
//                 rules={[{required: true, message: 'Введите ФИО игрока №2'}]}
//             >
//               <Input/>
//             </Form.Item>
//             <Form.Item
//                 label="Никнейм"
//                 name={['player2', 'nickName']}
//                 rules={[{required: true, message: 'Введите никнейм игрока №2'}]}
//             >
//               <Input/>
//             </Form.Item>
//
//           </Col>
//           <Col span={12}>
//             <Form.Item
//                 label="Ссылка на профиль в Steam"
//                 name={['player2', 'steamProfile']}
//                 rules={[{required: true, message: 'Введите ссылку на профиль в Steam для игрока №2'}]}
//             >
//               <Input/>
//             </Form.Item>
//             <Form.Item
//                 label="Справка из учебного заведения"
//                 name={['player2', 'certificateFiles']}
//                 rules={[{required: true, message: 'Загрузите справку для игрока №2'}]}
//                 valuePropName="fileList"
//                 getValueFromEvent={normFile}
//             >
//               <Upload name="certificate" beforeUpload={() => false} multiple maxCount={20}>
//                 <Button icon={<UploadOutlined/>}>Загрузить справку</Button>
//               </Upload>
//             </Form.Item>
//           </Col>
//         </Row>
//         <Divider style={{borderColor: "#FEA202", margin: "16px 0"}}/>
//         <div style={{
//           display: 'flex',
//           alignItems: 'center',
//           gap: 10,
//           flexDirection: isMobile ? 'column' : 'row',
//           textAlign: isMobile ? 'center' : 'left'
//         }}>
//           {selectedDiscipline === 'Counter Strike 2' && (
//               <Avatar size={48} shape='square' src="/images/icon034.png"/>
//           )}
//           {selectedDiscipline === 'DOTA 2' && (
//               <Avatar size={48} shape='square' src="/images/icon028.png"/>
//           )}
//           <Title level={4}
//                  style={{textAlign: "left"}}>{player3Nick ? `Игрок: ${player3Nick}` : "Игрок №3"}</Title>
//         </div>
//         {/*<h2>{player3Nick ? `Игрок: ${player3Nick}` : "Игрок №3"}</h2>*/}
//         <Row gutter={[16, 16]}>
//           <Col span={12}>
//             <Form.Item
//                 label="Фамилия Имя"
//                 name={['player3', 'fullName']}
//                 rules={[{required: true, message: 'Введите ФИО игрока №3'}]}
//             >
//               <Input/>
//             </Form.Item>
//             <Form.Item
//                 label="Никнейм"
//                 name={['player3', 'nickName']}
//                 rules={[{required: true, message: 'Введите никнейм игрока №3'}]}
//             >
//               <Input/>
//             </Form.Item>
//
//           </Col>
//           <Col span={12}>
//
//             <Form.Item
//                 label="Ссылка на профиль в Steam"
//                 name={['player3', 'steamProfile']}
//                 rules={[{required: true, message: 'Введите ссылку на профиль в Steam для игрока №3'}]}
//             >
//               <Input/>
//             </Form.Item>
//             <Form.Item
//                 label="Справка из учебного заведения"
//                 name={['player3', 'certificateFiles']}
//                 rules={[{required: true, message: 'Загрузите справку для игрока №3'}]}
//                 valuePropName="fileList"
//                 getValueFromEvent={normFile}
//             >
//               <Upload name="certificate" beforeUpload={() => false} multiple maxCount={20}>
//                 <Button icon={<UploadOutlined/>}>Загрузить справку</Button>
//               </Upload>
//             </Form.Item>
//           </Col>
//         </Row>
//         <Divider style={{borderColor: "#FEA202", margin: "16px 0"}}/>
//         <div style={{
//           display: 'flex',
//           alignItems: 'center',
//           gap: 10,
//           flexDirection: isMobile ? 'column' : 'row',
//           textAlign: isMobile ? 'center' : 'left'
//         }}>
//           {selectedDiscipline === 'Counter Strike 2' && (
//               <Avatar size={48} shape='square' src="/images/icon034.png"/>
//           )}
//           {selectedDiscipline === 'DOTA 2' && (
//               <Avatar size={48} shape='square' src="/images/icon028.png"/>
//           )}
//           <Title level={4}
//                  style={{textAlign: "left"}}>{player4Nick ? `Игрок: ${player4Nick}` : "Игрок №4"}</Title>
//         </div>
//         {/*<h2>{player4Nick ? `Игрок: ${player4Nick}` : "Игрок №4"}</h2>*/}
//         <Row gutter={[16, 16]}>
//           <Col span={12}>
//             <Form.Item
//                 label="Фамилия Имя"
//                 name={['player4', 'fullName']}
//                 rules={[{required: true, message: 'Введите ФИО игрока №4'}]}
//             >
//               <Input/>
//             </Form.Item>
//             <Form.Item
//                 label="Никнейм"
//                 name={['player4', 'nickName']}
//                 rules={[{required: true, message: 'Введите никнейм игрока №4'}]}
//             >
//               <Input/>
//             </Form.Item>
//
//           </Col>
//           <Col span={12}>
//             <Form.Item
//                 label="Ссылка на профиль в Steam"
//                 name={['player4', 'steamProfile']}
//                 rules={[{required: true, message: 'Введите ссылку на профиль в Steam для игрока №4'}]}
//             >
//               <Input/>
//             </Form.Item>
//             <Form.Item
//                 label="Справка из учебного заведения"
//                 name={['player4', 'certificateFiles']}
//                 rules={[{required: true, message: 'Загрузите справку для игрока №4'}]}
//                 valuePropName="fileList"
//                 getValueFromEvent={normFile}
//             >
//               <Upload name="certificate" beforeUpload={() => false} multiple maxCount={20}>
//                 <Button icon={<UploadOutlined/>}>Загрузить справку</Button>
//               </Upload>
//             </Form.Item>
//           </Col>
//         </Row>
//         <Divider style={{borderColor: "#FEA202", margin: "16px 0"}}/>
//         <div style={{
//           display: 'flex',
//           alignItems: 'center',
//           gap: 10,
//           flexDirection: isMobile ? 'column' : 'row',
//           textAlign: isMobile ? 'center' : 'left'
//         }}>
//           {selectedDiscipline === 'Counter Strike 2' && (
//               <Avatar size={48} shape='square' src="/images/icon034.png"/>
//           )}
//           {selectedDiscipline === 'DOTA 2' && (
//               <Avatar size={48} shape='square' src="/images/icon028.png"/>
//           )}
//           <Title level={4}
//                  style={{textAlign: "left"}}>{player5Nick ? `Игрок: ${player5Nick}` : "Игрок №5"}</Title>
//         </div>
//         {/*<h2>{player5Nick ? `Игрок: ${player5Nick}` : "Игрок №5"}</h2>*/}
//         <Row gutter={[16, 16]}>
//           <Col span={12}>
//             <Form.Item
//                 label="Фамилия Имя"
//                 name={['player5', 'fullName']}
//                 rules={[{required: true, message: 'Введите ФИО игрока №5'}]}
//             >
//               <Input/>
//             </Form.Item>
//             <Form.Item
//                 label="Никнейм"
//                 name={['player5', 'nickName']}
//                 rules={[{required: true, message: 'Введите никнейм игрока №5'}]}
//             >
//               <Input/>
//             </Form.Item>
//
//           </Col>
//           <Col span={12}>
//             <Form.Item
//                 label="Ссылка на профиль в Steam"
//                 name={['player5', 'steamProfile']}
//                 rules={[{required: true, message: 'Введите ссылку на профиль в Steam для игрока №5'}]}
//             >
//               <Input/>
//             </Form.Item>
//             <Form.Item
//                 label="Справка из учебного заведения"
//                 name={['player5', 'certificateFiles']}
//                 rules={[{required: true, message: 'Загрузите справку для игрока №5'}]}
//                 valuePropName="fileList"
//                 getValueFromEvent={normFile}
//             >
//               <Upload name="certificate" beforeUpload={() => false} multiple maxCount={20}>
//                 <Button icon={<UploadOutlined/>}>Загрузить справку</Button>
//               </Upload>
//             </Form.Item>
//           </Col>
//         </Row>
//         <Divider style={{borderColor: "#FEA202", margin: "16px 0"}}/>
//
//         {/* Данные запасных игроков */}
//         <div style={{
//           display: 'flex',
//           alignItems: 'center',
//           gap: 10,
//           flexDirection: isMobile ? 'column' : 'row',
//           textAlign: isMobile ? 'center' : 'left'
//         }}>
//           {selectedDiscipline === 'Counter Strike 2' && (
//               <Avatar size={48} shape='square' src="/images/icon035.png"/>
//           )}
//           {selectedDiscipline === 'DOTA 2' && (
//               <Avatar size={48} shape='square' src="/images/icon028.png"/>
//           )}
//           <Title level={4}
//                  style={{textAlign: "left"}}>{substitute1Nick ? `Запасной игрок: ${substitute1Nick}` : "Запасной игрок 1"}</Title>
//         </div>
//         {/*<h2>{substitute1Nick ? `Запасной игрок: ${substitute1Nick}` : "Запасной игрок 1"}</h2>*/}
//         <Row gutter={[16, 16]}>
//           <Col span={12}>
//             <Form.Item label="Фамилия Имя" name={['substitute1', 'fullName']}>
//               <Input/>
//             </Form.Item>
//             <Form.Item
//                 label="Никнейм"
//                 name={['substitute1', 'nickName']}
//                 rules={[{required: false, message: 'Введите никнейм запасного игрока'}]}
//             >
//               <Input/>
//             </Form.Item>
//
//           </Col>
//           <Col span={12}>
//             <Form.Item label="Ссылка на профиль в Steam" name={['substitute1', 'steamProfile']}>
//               <Input/>
//             </Form.Item>
//             <Form.Item
//                 label="Справка из учебного заведения"
//                 name={['substitute1', 'certificateFiles']}
//                 valuePropName="fileList"
//                 getValueFromEvent={normFile}
//             >
//               <Upload name="certificate" beforeUpload={() => false} multiple maxCount={20}>
//                 <Button icon={<UploadOutlined/>}>Загрузить справку</Button>
//               </Upload>
//             </Form.Item>
//           </Col>
//         </Row>
//         <Divider style={{borderColor: "#FEA202", margin: "16px 0"}}/>
//         <div style={{
//           display: 'flex',
//           alignItems: 'center',
//           gap: 10,
//           flexDirection: isMobile ? 'column' : 'row',
//           textAlign: isMobile ? 'center' : 'left'
//         }}>
//           {selectedDiscipline === 'Counter Strike 2' && (
//               <Avatar size={48} shape='square' src="/images/icon035.png"/>
//           )}
//           {selectedDiscipline === 'DOTA 2' && (
//               <Avatar size={48} shape='square' src="/images/icon028.png"/>
//           )}
//           <Title level={4}
//                  style={{textAlign: "left"}}>{substitute2Nick ? `Запасной игрок: ${substitute2Nick}` : "Запасной игрок 2"}</Title>
//         </div>
//         {/*<h2>{substitute2Nick ? `Запасной игрок: ${substitute2Nick}` : "Запасной игрок 2"}</h2>*/}
//         <Row gutter={[16, 16]}>
//           <Col span={12}>
//             <Form.Item label="Фамилия Имя" name={['substitute2', 'fullName']}>
//               <Input/>
//             </Form.Item>
//             <Form.Item
//                 label="Никнейм"
//                 name={['substitute2', 'nickName']}
//                 rules={[{required: false, message: 'Введите никнейм запасного игрока'}]}
//             >
//               <Input/>
//             </Form.Item>
//
//           </Col>
//           <Col span={12}>
//             <Form.Item label="Ссылка на профиль в Steam" name={['substitute2', 'steamProfile']}>
//               <Input/>
//             </Form.Item>
//             <Form.Item
//                 label="Справка из учебного заведения"
//                 name={['substitute2', 'certificateFiles']}
//                 valuePropName="fileList"
//                 getValueFromEvent={normFile}
//             >
//               <Upload name="certificate" beforeUpload={() => false} multiple maxCount={20}>
//                 <Button icon={<UploadOutlined/>}>Загрузить справку</Button>
//               </Upload>
//             </Form.Item>
//           </Col>
//         </Row>
//         <Divider style={{borderColor: "#FEA202", margin: "16px 0"}}/>
//
//         {/* Согласие с политикой */}
//         <Form.Item
//             name="consent"
//             valuePropName="checked"
//             rules={[{required: true, message: 'Необходимо согласиться с политикой обработки персональных данных'}]}
//         >
//           <Checkbox>
//             С политикой обработки персональных данных и правилами турнира ознакомлен
//           </Checkbox>
//         </Form.Item>
//
//         <Form.Item>
//           <Button type="primary" htmlType="submit">
//             Подать заявку
//           </Button>
//         </Form.Item>
//       </Form>
//     </div>
//   );
// };
//
// export default RegistrationTeam;


// import React from 'react';
// import {Form, Input, Button, Upload, message, Checkbox, Row, Col, Divider} from 'antd';
// import { UploadOutlined } from '@ant-design/icons';
// import pb from '../pb';
//
// const RegistrationTeam = () => {
//   const [form] = Form.useForm();
//
//   const onFinish = async (values) => {
//     console.log('Form values:', values);
//
//     // Проверка аутентификации
//     if (!pb.authStore.token) {
//       message.error("Пользователь не аутентифицирован. Пожалуйста, войдите через Telegram.");
//       return;
//     }
//     console.log('Authenticated user:', pb.authStore.model);
//
//     const formData = new FormData();
//
//     // Добавляем собственное поле для идентификатора пользователя
//     formData.append('userId', pb.authStore.model.id);
//
//     // Данные команды
//     formData.append('teamName', values.teamName);
//     formData.append('organizationName', values.organizationName);
//     if (values.teamLogo && values.teamLogo.length > 0) {
//       formData.append('teamLogo', values.teamLogo[0].originFileObj);
//     }
//
//     // Данные капитана
//     formData.append('captain_fullName', values.captain.fullName);
//     formData.append('captain_phone', values.captain.phone);
//     formData.append('captain_telegram', values.captain.telegram);
//     formData.append('captain_steamProfile', values.captain.steamProfile);
//     if (values.captain.certificateFiles && values.captain.certificateFiles.length > 0) {
//       values.captain.certificateFiles.forEach((file) => {
//         formData.append('captain_certificateFiles', file.originFileObj);
//       });
//     }
//
//     // Данные игроков (№2–№5)
//     const players = ['player2', 'player3', 'player4', 'player5'];
//     players.forEach((player) => {
//       if (values[player]) {
//         formData.append(`${player}_fullName`, values[player].fullName);
//         formData.append(`${player}_steamProfile`, values[player].steamProfile);
//         if (values[player].certificateFiles && values[player].certificateFiles.length > 0) {
//           values[player].certificateFiles.forEach((file) => {
//             formData.append(`${player}_certificateFiles`, file.originFileObj);
//           });
//         }
//       }
//     });
//
//     // Данные запасных игроков (опционально)
//     const substitutes = ['substitute1', 'substitute2'];
//     substitutes.forEach((substitute) => {
//       if (values[substitute]) {
//         if (values[substitute].fullName) {
//           formData.append(`${substitute}_fullName`, values[substitute].fullName);
//         }
//         if (values[substitute].steamProfile) {
//           formData.append(`${substitute}_steamProfile`, values[substitute].steamProfile);
//         }
//         if (values[substitute].certificateFiles && values[substitute].certificateFiles.length > 0) {
//           values[substitute].certificateFiles.forEach((file) => {
//             formData.append(`${substitute}_certificateFiles`, file.originFileObj);
//           });
//         }
//       }
//     });
//
//     // Флаг согласия
//     formData.append('consent', values.consent ? 'true' : 'false');
//
//     try {
//       const record = await pb.collection('team_applications').create(formData);
//       message.success('Заявка успешно отправлена!');
//       form.resetFields();
//       console.log('Created record:', record);
//     } catch (error) {
//       console.error('Ошибка создания записи:', error.data || error);
//       message.error('Ошибка при отправке заявки');
//     }
//   };
//
//   // Нормализация файлов для Upload
//   const normFile = (e) => {
//     if (Array.isArray(e)) return e;
//     return e && e.fileList;
//   };
//
//   return (
//     <div>
//       <h1>Регистрация команды</h1>
//       <Form form={form} onFinish={onFinish} layout="vertical">
//         {/* Данные команды */}
//         <Form.Item
//           label="Название команды"
//           name="teamName"
//           rules={[{ required: true, message: 'Введите название команды' }]}
//         >
//           <Input />
//         </Form.Item>
//         <Form.Item
//           label="Название образовательной организации"
//           name="organizationName"
//           rules={[{ required: true, message: 'Введите название организации' }]}
//         >
//           <Input />
//         </Form.Item>
//         <Form.Item
//           label="Логотип команды"
//           name="teamLogo"
//           rules={[{ required: true, message: 'Загрузите логотип команды' }]}
//           valuePropName="fileList"
//           getValueFromEvent={normFile}
//         >
//           <Upload name="logo" beforeUpload={() => false} maxCount={1}>
//             <Button icon={<UploadOutlined />}>Загрузить логотип</Button>
//           </Upload>
//         </Form.Item>
//         <Divider style={{borderColor: "#FEA202", margin: "16px 0"}}/>
//         {/* Данные капитана */}
//         <h2>Капитан команды</h2>
//         <Row gutter={[16, 16]}>
//           <Col span={12}>
//              <Form.Item
//           label="Фамилия Имя"
//           name={['captain', 'fullName']}
//           rules={[{ required: true, message: 'Введите ФИО капитана' }]}
//         >
//           <Input />
//         </Form.Item>
//             <Form.Item
//           label="Телефон для связи"
//           name={['captain', 'phone']}
//           rules={[{ required: true, message: 'Введите номер телефона' }]}
//         >
//           <Input />
//         </Form.Item>
//           </Col>
//           <Col span={12}>
//             <Form.Item
//           label="Telegram для связи"
//           name={['captain', 'telegram']}
//           rules={[{ required: true, message: 'Введите Telegram' }]}
//         >
//           <Input />
//         </Form.Item>
//         <Form.Item
//           label="Ссылка на профиль в Steam"
//           name={['captain', 'steamProfile']}
//           rules={[{ required: true, message: 'Введите ссылку на профиль в Steam' }]}
//         >
//           <Input />
//         </Form.Item>
//         <Form.Item
//           label="Справка из учебного заведения"
//           name={['captain', 'certificateFiles']}
//           rules={[{ required: true, message: 'Загрузите справку' }]}
//           valuePropName="fileList"
//           getValueFromEvent={normFile}
//         >
//           <Upload name="certificate" beforeUpload={() => false} multiple maxCount={20}>
//             <Button icon={<UploadOutlined />}>Загрузить справку</Button>
//           </Upload>
//         </Form.Item>
//           </Col>
//         </Row>
//         <Divider style={{borderColor: "#FEA202", margin: "16px 0"}}/>
//         {/* Данные игроков №2–№5 */}
//         <h2>Игрок №2</h2>
//         <Row gutter={[16, 16]}>
//           <Col span={12}>
//             <Form.Item
//           label="Фамилия Имя"
//           name={['player2', 'fullName']}
//           rules={[{ required: true, message: 'Введите ФИО игрока №2' }]}
//         >
//           <Input />
//         </Form.Item>
//         <Form.Item
//           label="Ссылка на профиль в Steam"
//           name={['player2', 'steamProfile']}
//           rules={[{ required: true, message: 'Введите ссылку на профиль в Steam для игрока №2' }]}
//         >
//           <Input />
//         </Form.Item>
//           </Col>
//           <Col span={12}>
//             <Form.Item
//           label="Справка из учебного заведения"
//           name={['player2', 'certificateFiles']}
//           rules={[{ required: true, message: 'Загрузите справку для игрока №2' }]}
//           valuePropName="fileList"
//           getValueFromEvent={normFile}
//         >
//           <Upload name="certificate" beforeUpload={() => false} multiple maxCount={20}>
//             <Button icon={<UploadOutlined />}>Загрузить справку</Button>
//           </Upload>
//         </Form.Item>
//           </Col>
//         </Row>
//         <Divider style={{borderColor: "#FEA202", margin: "16px 0"}}/>
//         <h2>Игрок №3</h2>
//         <Row gutter={[16, 16]}>
//           <Col span={12}>
//             <Form.Item
//           label="Фамилия Имя"
//           name={['player3', 'fullName']}
//           rules={[{ required: true, message: 'Введите ФИО игрока №3' }]}
//         >
//           <Input />
//         </Form.Item>
//         <Form.Item
//           label="Ссылка на профиль в Steam"
//           name={['player3', 'steamProfile']}
//           rules={[{ required: true, message: 'Введите ссылку на профиль в Steam для игрока №3' }]}
//         >
//           <Input />
//         </Form.Item>
//           </Col>
//           <Col span={12}>
//             <Form.Item
//           label="Справка из учебного заведения"
//           name={['player3', 'certificateFiles']}
//           rules={[{ required: true, message: 'Загрузите справку для игрока №3' }]}
//           valuePropName="fileList"
//           getValueFromEvent={normFile}
//         >
//           <Upload name="certificate" beforeUpload={() => false} multiple maxCount={20}>
//             <Button icon={<UploadOutlined />}>Загрузить справку</Button>
//           </Upload>
//         </Form.Item>
//           </Col>
//         </Row>
//         <Divider style={{borderColor: "#FEA202", margin: "16px 0"}}/>
//         <h2>Игрок №4</h2>
//         <Row gutter={[16, 16]}>
//           <Col span={12}>
//             <Form.Item
//           label="Фамилия Имя"
//           name={['player4', 'fullName']}
//           rules={[{ required: true, message: 'Введите ФИО игрока №4' }]}
//         >
//           <Input />
//         </Form.Item>
//         <Form.Item
//           label="Ссылка на профиль в Steam"
//           name={['player4', 'steamProfile']}
//           rules={[{ required: true, message: 'Введите ссылку на профиль в Steam для игрока №4' }]}
//         >
//           <Input />
//         </Form.Item>
//           </Col>
//           <Col span={12}>
//             <Form.Item
//           label="Справка из учебного заведения"
//           name={['player4', 'certificateFiles']}
//           rules={[{ required: true, message: 'Загрузите справку для игрока №4' }]}
//           valuePropName="fileList"
//           getValueFromEvent={normFile}
//         >
//           <Upload name="certificate" beforeUpload={() => false} multiple maxCount={20}>
//             <Button icon={<UploadOutlined />}>Загрузить справку</Button>
//           </Upload>
//         </Form.Item>
//           </Col>
//         </Row>
//         <Divider style={{borderColor: "#FEA202", margin: "16px 0"}}/>
//         <h2>Игрок №5</h2>
//         <Row gutter={[16, 16]}>
//           <Col span={12}>
//             <Form.Item
//           label="Фамилия Имя"
//           name={['player5', 'fullName']}
//           rules={[{ required: true, message: 'Введите ФИО игрока №5' }]}
//         >
//           <Input />
//         </Form.Item>
//         <Form.Item
//           label="Ссылка на профиль в Steam"
//           name={['player5', 'steamProfile']}
//           rules={[{ required: true, message: 'Введите ссылку на профиль в Steam для игрока №5' }]}
//         >
//           <Input />
//         </Form.Item>
//           </Col>
//           <Col span={12}>
//             <Form.Item
//           label="Справка из учебного заведения"
//           name={['player5', 'certificateFiles']}
//           rules={[{ required: true, message: 'Загрузите справку для игрока №5' }]}
//           valuePropName="fileList"
//           getValueFromEvent={normFile}
//         >
//           <Upload name="certificate" beforeUpload={() => false} multiple maxCount={20}>
//             <Button icon={<UploadOutlined />}>Загрузить справку</Button>
//           </Upload>
//         </Form.Item>
//           </Col>
//         </Row>
//         <Divider style={{borderColor: "#FEA202", margin: "16px 0"}}/>
//         {/* Данные запасных игроков (опционально) */}
//         <h2>Запасной игрок 1</h2>
//         <Row gutter={[16, 16]}>
//           <Col span={12}>
//             <Form.Item label="Фамилия Имя" name={['substitute1', 'fullName']}>
//           <Input />
//         </Form.Item>
//         <Form.Item label="Ссылка на профиль в Steam" name={['substitute1', 'steamProfile']}>
//           <Input />
//         </Form.Item>
//           </Col>
//           <Col span={12}>
//             <Form.Item
//           label="Справка из учебного заведения"
//           name={['substitute1', 'certificateFiles']}
//           valuePropName="fileList"
//           getValueFromEvent={normFile}
//         >
//           <Upload name="certificate" beforeUpload={() => false} multiple maxCount={20}>
//             <Button icon={<UploadOutlined />}>Загрузить справку</Button>
//           </Upload>
//         </Form.Item>
//           </Col>
//         </Row>
//         <Divider style={{borderColor: "#FEA202", margin: "16px 0"}}/>
//         <h2>Запасной игрок 2</h2>
//         <Row gutter={[16, 16]}>
//           <Col span={12}>
//             <Form.Item label="Фамилия Имя" name={['substitute2', 'fullName']}>
//           <Input />
//         </Form.Item>
//         <Form.Item label="Ссылка на профиль в Steam" name={['substitute2', 'steamProfile']}>
//           <Input />
//         </Form.Item>
//           </Col>
//           <Col span={12}>
//             <Form.Item
//           label="Справка из учебного заведения"
//           name={['substitute2', 'certificateFiles']}
//           valuePropName="fileList"
//           getValueFromEvent={normFile}
//         >
//           <Upload name="certificate" beforeUpload={() => false} multiple maxCount={20}>
//             <Button icon={<UploadOutlined />}>Загрузить справку</Button>
//           </Upload>
//         </Form.Item>
//           </Col>
//         </Row>
//         <Divider style={{borderColor: "#FEA202", margin: "16px 0"}}/>
//         {/* Согласие с политикой */}
//         <Form.Item
//           name="consent"
//           valuePropName="checked"
//           rules={[{ required: true, message: 'Необходимо согласиться с политикой обработки персональных данных' }]}
//         >
//           <Checkbox>
//             С политикой обработки персональных данных и правилами турнира ознакомлен
//           </Checkbox>
//         </Form.Item>
//
//         <Form.Item>
//           <Button type="primary" htmlType="submit">
//             Подать заявку
//           </Button>
//         </Form.Item>
//       </Form>
//     </div>
//   );
// };
//
// export default RegistrationTeam;
