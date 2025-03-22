import { useDeleteTechnologyMutation } from '@/libs/redux/api/technologyApi';
import { DeleteFilled } from '@ant-design/icons';
import { Button, Modal, message } from 'antd';
import React, { useState } from 'react';
interface DeleteTechnologyProps {
    technology_id: number
}

const DeleteTechnology: React.FC<DeleteTechnologyProps> = ({ technology_id }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [deleteTechnology, { isLoading, isError }] = useDeleteTechnologyMutation()
    const [messageApi, contextHolder] = message.useMessage();
    const handleOk = () => {
        deleteTechnology(technology_id).then((data) => {
            messageApi.success("Technology is deleted")
            setIsModalOpen(false)
        }).catch(()=>{
            messageApi.error("error")
        });
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

export default DeleteTechnology
