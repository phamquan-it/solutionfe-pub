import React, { useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '@/libs/redux/store';
import { useGetUserInfoQuery, useUpdateProfileMutation } from '@/libs/redux/api/userApi';
import { useTranslations } from 'next-intl';

interface ProfileFormValues {
    name: string;
    email: string;
    phone: string;
    address: string;
}

const UpdateProfileForm: React.FC = () => {
    const { data: user, error, isLoading } = useGetUserInfoQuery({});
    const [updateProfile, updateProfileState] = useUpdateProfileMutation();

    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        if (user) {
            // Initialize form fields with the user's data
            form.setFieldsValue({
                name: user.name,
                email: user.email,
                phone: user.phone,
            });
        }
    }, [user]);

    const onFinish = async (values: ProfileFormValues) => {
        try {
            const result = await updateProfile(values);
            if (result.error) {
                messageApi.error('Error updating profile');
            } else {
                messageApi.success('Profile updated successfully!');
            }
        } catch (err) {
            console.error('Error updating profile:', err);
            messageApi.error('An unexpected error occurred');
        }
    };

    const t = useTranslations("FormLanguage")
    return (
        <>
            {contextHolder}
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                style={{ maxWidth: 600 }}
            >
                <Form.Item
                    label={t('fullname')}
                    name="name"
                    rules={[{ required: true, message: 'Please enter your name!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please enter your email!' }]}
                >
                    <Input disabled />
                </Form.Item>

                <Form.Item
                    label={t('phone')}
                    name="phone"
                    rules={[{ required: true, message: 'Please enter your phone number!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={updateProfileState.isLoading}>
                        {t("update_profile")}
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default UpdateProfileForm;

