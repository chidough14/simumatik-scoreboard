import React from 'react'
import { Modal, Input } from 'antd';

const ModalComponent = ({visible, handleOk, handleCancel, name, setName}) => {
    return (
        <div>
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

export default ModalComponent
