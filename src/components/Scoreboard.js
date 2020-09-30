import React, { useEffect, useState } from 'react'
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

const initialData = localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : []

const Scoreboard = () => {

   const [visible, setVisible] = useState(false)
   const [name, setName] = useState("")
   const [data, setData] = useState(initialData)

   useEffect(() => {
       localStorage.setItem('data', JSON.stringify(data))
   }, [data])

    const showModal = () => {
        setVisible(true)
    }


    const handleOk = (e) => {
        setVisible(false)
        const key = Math.random().toString(36).substring(7)
        const newdata = {
            key: key,
            participants: name,
            wins: 0,
            losses: 0
        }
        
        setData(data => ([...data, newdata]))
        setName("")
    }

    const incrementWin = (key) => {
        const id = data.findIndex(dt => dt.key === key)

        const nwdata = [...data];
        let incwin = { ...nwdata[id] };
        incwin.wins++;
        nwdata[id] = incwin;
        setData(nwdata);
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

            <div>
                <table id="scoreboard_table">
                    <th>Participants</th>
                    <th>Wins</th>
                    <th>Losses</th>
                    <th>
                        <ArrowUpOutlined />
                    </th>
                    <th>
                        <ArrowDownOutlined />
                    </th>
                    <th>
                         <CloseOutlined />
                    </th>

                    {
                        data.map(dt => (
                        <tr>
                            <td>{dt.participants}</td>
                            <td>{dt.wins}</td>
                            <td>{dt.losses}</td>
                            <td>
                               <a><ArrowUpOutlined onClick={() => incrementWin(dt.key)} /></a>
                            </td>
                            <td>
                                <a><ArrowDownOutlined /></a> 
                            </td>
                            <td>
                                <CloseOutlined />
                            </td>
                        </tr>
                        ))
                    }
                </table>
            </div>

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
