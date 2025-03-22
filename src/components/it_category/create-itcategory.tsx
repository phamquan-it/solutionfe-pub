import { useCreateCategoryMutation } from '@/libs/redux/api/categoryApi';
import { useCreateITCategoryMutation } from '@/libs/redux/api/it_categoryApi';
import { Button, Form, FormProps, Input, Modal } from 'antd';
import React, { useState } from 'react';

const CreateITCategory: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [createITCategory, { isLoading, isError }] = useCreateITCategoryMutation()

    const [form] = Form.useForm<ITCategory>()
    const handleOk = () => {
        form.submit()
    }
    const handleCancel = () => {
        setIsModalOpen(false);
    }

    const onFinish: FormProps<ITCategory>['onFinish'] = (values) => {
        createITCategory(values)
    };

    const onFinishFailed: FormProps<ITCategory>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return <>
        <Button type="primary"
            onClick={() => {
                setIsModalOpen(true);
            }}
            iconPosition="end">Create</Button>
        <Modal title="Create"
            open={isModalOpen}
            okButtonProps={{
                loading: isLoading
            }} onOk={handleOk} onCancel={handleCancel}>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    </>

}

export default CreateITCategory
