import React, { useEffect, useState } from 'react'
import {  Button, message } from 'antd';
import './Scoreboard.css'
import ModalComponent from './ModalComponent'
import TableComponent from './TableComponent';

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
       if(name) {
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
            <div style={{ marginBottom: 16 }}>
                <h1 className="scoreboard_header">Simumatik Score Board</h1>
                <Button type="primary" onClick={showModal} className="scoreboard_button">
                    Add Player
                </Button>
            </div>

            <div>
                <TableComponent 
                    data={data} 
                    confirmWin={confirmWin} 
                    confirmLoss={confirmLoss}
                    deleteParticipant={deleteParticipant}
                    text={text}
                />
            </div>

            <ModalComponent 
                visible={visible} 
                handleCancel={handleCancel}
                handleOk={handleOk}
                name={name}
                setName={setName}
            />
        </div>
    )
}

export default Scoreboard
