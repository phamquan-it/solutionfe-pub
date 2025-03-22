import { useDeleteCategoryMutation } from '@/libs/redux/api/categoryApi';
import { useDeleteITCategoryMutation } from '@/libs/redux/api/it_categoryApi';
import { DeleteFilled } from '@ant-design/icons';
import { Button, Modal, message } from 'antd';
import React, { useState } from 'react';
interface DeleteITCategoryProps {
    it_category_id: number
}

const DeleteITCategory: React.FC<DeleteITCategoryProps> = ({ it_category_id }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [deleteCategory, { isLoading, isError }] = useDeleteITCategoryMutation()
    const [messageApi, contextHolder] = message.useMessage();
    const handleOk = () => {
        deleteCategory(it_category_id).then((data) => {
            messageApi.success("Category is deleted")
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

export default DeleteITCategory
