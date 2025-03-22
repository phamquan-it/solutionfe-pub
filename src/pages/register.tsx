import { useRegisterMutation } from '@/libs/redux/api/authApi';
import withGuest from '@/utils/withGuest';
import { Button, Card, Form, FormProps, Input, Image, Divider, message } from 'antd';
import { GetStaticPropsContext } from 'next';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
const Page: React.FC = () => {

    const [registerUser, { data, isLoading, isError }] = useRegisterMutation()

    const router = useRouter()
    const onFinish: FormProps<RegisterUser>['onFinish'] = async (values) => {
        const result = await registerUser({
            name: values.name,
            email: values.email,
            password: values.password,
            password_confirmation: values.password
        })
        if (result.error) messageApi.error("Register error!")
        else {
            messageApi.success("Register success!")
            setTimeout(() => {
                router.push("/login")
            }, 500)
        }
    };

    const [messageApi, contextHolder] = message.useMessage();
    const onFinishFailed: FormProps<RegisterUser>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const t = useTranslations("Auth")
    return <>
        {contextHolder}
        <div className="h-full flex items-center justify-center">
            <Card className="shadow-sm w-full h-auto md:w-auto md:h-auto">
                <div className="flex justify-center">
                    <Image width={200} src="/logo-text.png" alt={""} preview={false} />
                </div>
                <Divider orientation='center' />
                <div className="grid">
                    <Form<RegisterUser>
                        layout="vertical"
                        name="login"
                        className="w-full md:w-normalForm md:m-auto"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item<RegisterUser>
                            label={t('fullname')}
                            name="name"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item<RegisterUser>
                            label={t('email')}
                            name="email"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item<RegisterUser>
                            label={t('password')}
                            name="password"
                            rules={[{ required: true }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" loading={isLoading} htmlType="submit" block>
                                {t('register')}
                            </Button>
                        </Form.Item>
                        <p>{t('already')}&nbsp;
                            <Link href={"/login"}>{t('login')}</Link>
                        </p>
                    </Form>
                </div>
            </Card>
        </div>
    </>

}
export default withGuest(Page);
