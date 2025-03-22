import { useCreateContactMutation } from '@/libs/redux/api/contactApi';
import { Button, Card, Form, FormProps, Input, message } from 'antd';
import Title from 'antd/es/typography/Title';
import { GetStaticPropsContext } from 'next';
import { useTranslations } from 'next-intl';
import React from 'react';

const Page = () => {
    const [createContact, { data, isLoading, isError }] = useCreateContactMutation()
    const [messageApi, contextHolder] = message.useMessage();

    const onFinish: FormProps<Contact>['onFinish'] = (values) => {
        createContact(values).then((data) => {
            if (!data.error)
                messageApi.success("Sended!")
            else messageApi.error("Err!")
        })
    };

    const onFinishFailed: FormProps<Contact>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const t = useTranslations("Index")
    const f = useTranslations("FormLanguage")
    return <>
        {contextHolder}
        <div className="p-2">
            <Card>
                <div>
                    <Title level={3}>{t('contact')}</Title>
                </div>
                <p className="mb-3">
                    {t('contactdesc')}
                </p>
                <div className="grid sm:grid-cols-3 gap-2">
                    <Form
                        layout="vertical"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item<Contact>
                            label={f('fullname')}
                            name="fullname"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item<Contact>
                            label={f('email')}
                            name="email"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item<Contact>
                            label={f('description')}
                            name="description"
                            rules={[{ required: true }]}
                        >
                            <Input.TextArea rows={4} />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" block loading={isLoading}>
                                {f('submit')}
                            </Button>
                        </Form.Item>
                    </Form>
                    <div className="sm:col-span-2">
                        <iframe className="rounded" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21202.929725239268!2d105.51518589618132!3d19.353002318851374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3137141ad553cdf7%3A0x2d5ad6fb2ebb61a!2zTmdoxKlhIELDrG5oLCBOZ2jEqWEgxJDDoG4sIE5naOG7hyBBbiwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1738402920199!5m2!1svi!2s" width="100%" height="100%" style={{ border: 0 }} loading="lazy" ></iframe>
                    </div>
                </div>
            </Card>
        </div>
    </>
}
export default Page
