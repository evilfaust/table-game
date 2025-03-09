// src/components/AllApplicationsSummary.js
import React, { useEffect, useState } from 'react';
import { Table, Spin, message, Avatar, Tag } from 'antd';
import { CheckCircleOutlined, SyncOutlined, CloseCircleOutlined } from '@ant-design/icons';
import pb from '../pb';

const AllApplicationsSummary = () => {
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      // Загружаем все заявки
      const records = await pb.collection('team_applications').getFullList({
        sort: '-created',
        $autoCancel: false,
      });
      setApplications(records);
    } catch (error) {
      console.error('Ошибка загрузки заявок:', error);
      message.error('Ошибка загрузки заявок');
    } finally {
      setLoading(false);
    }
  };

  // Функция для получения URL логотипа команды
  const getTeamLogoUrl = (record) => {
    const fileName = record.teamLogo;
    if (!fileName || !fileName.includes('.')) return null;
    return pb.files.getURL(record, fileName, { thumb: '100x100' });
  };

  // Функция для отображения статуса с использованием Tag
  const renderStatusTag = (status) => {
    if (status === 'approved') {
      return (
        <Tag icon={<CheckCircleOutlined />} color="success">
          approved
        </Tag>
      );
    }
    if (status === 'rejected') {
      return (
        <Tag icon={<CloseCircleOutlined />} color="error">
          rejected
        </Tag>
      );
    }
    return (
      <Tag icon={<SyncOutlined spin />} color="processing">
        processing
      </Tag>
    );
  };

  const columns = [
    {
      title: 'Логотип',
      dataIndex: 'teamLogo',
      key: 'teamLogo',
      render: (_, record) => {
        const logoUrl = getTeamLogoUrl(record);
        return logoUrl ? (
          <Avatar size={50} src={logoUrl} />
        ) : (
          <Avatar size={50}>
            {record.teamName ? record.teamName.charAt(0) : 'T'}
          </Avatar>
        );
      },
    },
    {
      title: 'Название команды',
      dataIndex: 'teamName',
      key: 'teamName',
    },
    {
      title: 'Капитан',
      dataIndex: 'captain_fullName',
      key: 'captain_fullName',
    },
    {
      title: 'Дата подачи',
      dataIndex: 'created',
      key: 'created',
      render: (created) => new Date(created).toLocaleString(),
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      render: (status) => renderStatusTag(status),
    },
  ];

  if (loading) return <Spin />;
  if (applications.length === 0)
    return <div>Заявки не найдены.</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Сводная таблица заявок</h1>
      <Table dataSource={applications} columns={columns} rowKey="id" />
    </div>
  );
};

export default AllApplicationsSummary;
