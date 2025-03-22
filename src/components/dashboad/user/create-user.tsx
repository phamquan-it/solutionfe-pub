import { Button, Modal } from 'antd';
import React, { useState } from 'react';
const CreateUser: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const handleOk = () => {

    }
    const handleCancel = () => {
        setIsModalOpen(false);
    }
    return <>
        <Button type="primary"
            onClick={() => {
                setIsModalOpen(true);
            }}
            iconPosition="end">Create</Button>
        <Modal title="Create"
            open={isModalOpen}
            okButtonProps={{
                loading: true
            }} onOk={handleOk} onCancel={handleCancel}>

        </Modal>
    </>

}

export default CreateUser
