import React, { useState } from 'react'
import { Table, Tag, Space, Button, Modal, Input } from 'antd';
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

 /*  const data = [
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
    }
  ]; */

const Scoreboard = () => {

   const [visible, setVisible] = useState(false)
   const [name, setName] = useState("")
   const [data, setData] = useState([])


    const showModal = () => {
        setVisible(true)
    }


    const handleOk = (e) => {
        setVisible(false)
        const key = Math.random().toString(36).substring(7)
        setData(data => data.concat({
            key: key,
            participants: name,
            wins: 0,
            losses: 0,
            increment: <a><ArrowUpOutlined /></a>,
            decrement: <a><ArrowDownOutlined /></a> 
        }))

        setName("")
    }

    const handleCancel = () => {
        setVisible(false)
    }
    return (
        <div>
            <div className="scoreboard_header">
                <h1>Simumatik Score Board</h1>
            </div>
            <div style={{ marginBottom: 16 }} className="scoreboard_button">
                <Button type="primary" onClick={showModal}>
                    Add Player
                </Button>
            </div>
            <Table columns={columns} dataSource={data} />

            <Modal
                title="Basic Modal"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                >
                <Input placeholder="Enter Name" onChange={(e) => setName(e.target.value) } value={name} />
            </Modal>
        </div>
    )
}

export default Scoreboard
