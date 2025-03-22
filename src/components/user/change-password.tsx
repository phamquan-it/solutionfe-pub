import { useChangePasswordMutation } from '@/libs/redux/api/authApi';
import { Button, Form, Input, message } from 'antd';
import React from 'react';
import { useTranslations } from 'next-intl';

const ChangePassword: React.FC = () => {
    const t = useTranslations('changepassword');
    const [changePassword, { isLoading }] = useChangePasswordMutation();

    const onFinish = async (values: { current_password: string; new_password: string; new_password_confirmation: string }) => {
        if (values.new_password !== values.new_password_confirmation) {
            message.error(t('password_mismatch'));
            return;
        }

        try {
            await changePassword(values).unwrap();
            message.success(t('password_changed_success'));
        } catch (err: any) {
            message.error(err.data?.message || t('password_change_failed'));
        }
    };

    return (
        <Form layout="vertical" style={{ maxWidth: 600 }} onFinish={onFinish}>
            <Form.Item label={t('current_password')} name="current_password" rules={[{ required: true }]}>
                <Input.Password />
            </Form.Item>
            <Form.Item label={t('new_password')} name="new_password" rules={[{ required: true }]}>
                <Input.Password />
            </Form.Item>
            <Form.Item label={t('confirm_new_password')} name="new_password_confirmation" rules={[{ required: true }]}>
                <Input.Password />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={isLoading}>
                    {t('update')}
                </Button>
            </Form.Item>
        </Form>
    );
};

export default ChangePassword;

