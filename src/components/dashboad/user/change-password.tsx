import { useChangePasswordMutation } from '@/libs/redux/api/userApi';
import { Button, Form, FormProps, Input, message } from 'antd';
import React from 'react';
interface ChangePasswordProps {
    user_id: string
}

const ChangePassword: React.FC<ChangePasswordProps> = ({user_id}) => {

    const [messageApi, contextHolder] = message.useMessage();
    const [changePassword, { isLoading, isError, isSuccess }] = useChangePasswordMutation()
    const onFinish: FormProps<ChangePassword>['onFinish'] = async (values) => {
        const result = await  changePassword({...values, user_id })
          if(result.error){
              messageApi.error("update password err")
          }else messageApi.success("update password success!")

    };

    const onFinishFailed: FormProps['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return <>
        {contextHolder}
        <Form
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="New password"
                name="new_password"
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Confirm password"
                name="confirm_password"
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
            >
                <Button  htmlType="submit" type={"primary"} loading={isLoading}>Change password</Button>
            </Form.Item>

        </Form>
    </>
}

export default ChangePassword
