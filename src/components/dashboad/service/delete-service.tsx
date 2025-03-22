import { useDeleteServiceMutation } from '@/libs/redux/api/serviceApi';
import { DeleteFilled } from '@ant-design/icons';
import { Button, Modal, message } from 'antd';
import React, { useState } from 'react';
interface DeleteServiceProps {
    service_id: number
}

const DeleteService: React.FC<DeleteServiceProps> = ({ service_id }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [deleteService, { isLoading, isError }] = useDeleteServiceMutation()
    const [messageApi, contextHolder] = message.useMessage();
    const handleOk = () => {
        deleteService(service_id).then((data) => {
            if (data.error) messageApi.error("Err!"); else {
                messageApi.success("Service is deleted")
                setIsModalOpen(false)
            }
        })
    }
    const handleCancel = () => {
        setIsModalOpen(false);
    }
    return <>
        {contextHolder}
        <Button type="primary"
            onClick={() => {
                setIsModalOpen(true);
            }}
            iconPosition="end" danger
            icon={<DeleteFilled />}
        ></Button>
        <Modal title="Delete"
            open={isModalOpen}
            okButtonProps={{
                loading: isLoading,
                danger: true
            }} onOk={handleOk} onCancel={handleCancel}>

        </Modal>
    </>

}

export default DeleteService
