import React, { useEffect, useState } from 'react'
import { Table, Tag, Space, Button, Modal, Input, Popconfirm, message } from 'antd';
import {CloseOutlined, ArrowDownOutlined, ArrowUpOutlined} from '@ant-design/icons'
import './Scoreboard.css'

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

    const decrementWin = (key) => {
        const id = data.findIndex(dt => dt.key === key)

        const nwdata = [...data];
        let incloss = { ...nwdata[id] };
        incloss.losses++;
        nwdata[id] = incloss;
        setData(nwdata);
    }

    const deleteParticipant = (key) => {

        setData(data.filter(dt => dt.key !== key))
    }
   

    const handleCancel = () => {
        setVisible(false)
    }

    const text = 'Are you sure to Adjust the score?';

    function confirmWin(key) {
        message.info('Clicked on Yes.');
        incrementWin(key)
    }

    function confirmLoss(key) {
        message.info('Clicked on Yes.');
        decrementWin(key)
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
                        [].concat(data).sort((a, b) => (a.wins-a.losses) < (b.wins-b.losses) ? 1 : -1).map(dt => (
                            <tr>
                                <td>{dt.participants}</td>
                                <td>{dt.wins}</td>
                                <td>{dt.losses}</td>
                                <td>
                                   <Popconfirm placement="top" title={text} onConfirm={() => confirmWin(dt.key)} okText="Yes" cancelText="No">
                                        <a><ArrowUpOutlined /></a>
                                    </Popconfirm>
                                </td>
                                <td>
                                    
                                    <Popconfirm placement="top" title={text} onConfirm={() => confirmLoss(dt.key)} okText="Yes" cancelText="No">
                                        <a> <ArrowDownOutlined/> </a> 
                                    </Popconfirm>
                                   
                                </td>
                                <td>
                                    <CloseOutlined onClick={() => deleteParticipant(dt.key)}/>
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
