import React from 'react'
import { Table, Tag, Space, Button } from 'antd';
import {CloseOutlined, ArrowDownOutlined, ArrowUpOutlined} from '@ant-design/icons'
import './Scoreboard.css'


const columns = [
    {
      title: 'Participants',
      dataIndex: 'participants',
      key: 'participants',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Wins',
      dataIndex: 'wins',
      key: 'wins',
    },
    {
      title: 'Losses',
      dataIndex: 'losses',
      key: 'losses',
    },
    {
        title: <ArrowUpOutlined />,
        dataIndex: 'increment',
        key: 'increment',
    },
    {
        title: <ArrowDownOutlined />,
        dataIndex: 'decrement',
        key: 'decrement',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a>
              <CloseOutlined />
          </a>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      participants: 'John Brown',
      wins: 5,
      losses: 5,
      increment: <a><ArrowUpOutlined /></a>,
      decrement: <a><ArrowDownOutlined /></a>
    },
    {
      key: '2',
      participants: 'Jim Green',
      wins: 4,
      losses: 6,
      increment: <a><ArrowUpOutlined /></a>,
      decrement: <a><ArrowDownOutlined /></a>
    },
    {
      key: '3',
      participants: 'Joe Black',
      wins: 3,
      losses: 5,
      increment: <a><ArrowUpOutlined /></a>,
      decrement: <a><ArrowDownOutlined /></a>
    },
  ];

const Scoreboard = () => {
    return (
        <div>
            <div className="scoreboard_header">
                <h1>Simumatik Score Board</h1>
            </div>
            <div style={{ marginBottom: 16 }} className="scoreboard_button">
                <Button type="primary">
                    Add Player
                </Button>
            </div>
            <Table columns={columns} dataSource={data} />
        </div>
    )
}

export default Scoreboard
