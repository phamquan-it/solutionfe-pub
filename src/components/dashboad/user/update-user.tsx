import { FormOutlined } from '@ant-design/icons';
import { Button, Form, FormProps, Input, Modal, Switch, Tabs, TabsProps } from 'antd';
import React, { useState } from 'react';
import UpdateUserService from './update-user-service';
import { useChangePasswordMutation } from '@/libs/redux/api/userApi';
import ChangePassword from './change-password';
interface UpdateProjectProps {
    user: User
}
const UpdateUser: React.FC<UpdateProjectProps> = ({user}) => {

    const onFinish: FormProps['onFinish'] = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed: FormProps['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onChange = (key: string) => {
        console.log(key);
    };

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'User info',
            children: (
                <Form
                    layout="vertical"
                    autoComplete="off"
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Phone"
                        name="phone"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            ),
        },
        {
            key: '2',
            label: 'Change password',
            children: (
                <ChangePassword user_id={user.id+''}/>
            )
        },
        {
            key: '3',
            label: 'Services',
            children: <UpdateUserService />,
        },
    ];

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
            iconPosition="end" icon={
                <FormOutlined />
            }></Button>
        <Modal title="Update" footer={[]}
            open={isModalOpen}
            okButtonProps={{
                loading: true
            }} onOk={handleOk} onCancel={handleCancel}>

            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </Modal>
    </>

}

export default UpdateUser
