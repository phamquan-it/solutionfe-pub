import { useUpdateITCategoryMutation } from '@/libs/redux/api/it_categoryApi';
import { FormOutlined } from '@ant-design/icons';
import { Button, Form, FormProps, Input, Modal } from 'antd';
import React, { useState } from 'react';
interface UpdateITCategoryProps {
    it_category: ITCategory
}

const UpdateITCategory: React.FC<UpdateITCategoryProps> = ({ it_category }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [updateITCategory, { isLoading, isError }] = useUpdateITCategoryMutation()
    const [form] = Form.useForm()
    const handleOk = () => {
        form.submit()
    }
    const handleCancel = () => {
        setIsModalOpen(false);
    }

    const onFinish: FormProps<ITCategory>['onFinish'] = (values) => {
        console.log('Success:', values);
        updateITCategory({id: it_category.id, name: values.name})
    };

    const onFinishFailed: FormProps<ITCategory>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return <>
        <Button type="primary"
            onClick={() => {
                setIsModalOpen(true);
            }}
            iconPosition="end"
            icon={
                <FormOutlined />
            }
        ></Button>
        <Modal title="Update"
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
                <Form.Item<ITCategory>
                    label="Name"
                    name="name"
                    initialValue={it_category?.name}
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    </>

}

export default UpdateITCategory
