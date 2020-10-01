import React from 'react'
import { Popconfirm } from 'antd';
import {CloseOutlined, ArrowDownOutlined, ArrowUpOutlined} from '@ant-design/icons'

const TableComponent = ({data, confirmWin, confirmLoss, deleteParticipant, text}) => {
    return (
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

                { data == "" ? <tr><td style={{textAlign: 'center'}} colSpan="6"><h2>No Data Available</h2></td></tr> :
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
    )
}

export default TableComponent
