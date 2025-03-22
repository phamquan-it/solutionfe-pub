import { useGetBanksQuery } from '@/libs/redux/api/bankApi';
import { useGetSettingQuery, useUpdateSettingMutation } from '@/libs/redux/api/settingApi';
import { Button, Card, Form, FormProps, Input, Select, Image, TimePicker, Spin, message } from 'antd';
import dayjs from 'dayjs';
import { GetStaticPropsContext } from 'next';
import React, { useEffect } from 'react';

const Page = () => {
    const bankQuery = useGetBanksQuery()
    const { data, isFetching } = useGetSettingQuery();
    const [updateSetting, updateSettingState] = useUpdateSettingMutation();
    const onFinish: FormProps<Setting>['onFinish'] = async (values) => {
        const {
            time_deny_order,
            time_exchange_rate,
            time_update_service,
            time_update_order
        } = values
        const formattedValues = {
            time_deny_order: time_deny_order ? dayjs(time_deny_order).format("HH:mm:ss") : '00:00:00',
            time_exchange_rate: time_exchange_rate ? dayjs(time_exchange_rate).format("HH:mm:ss") : '00:00:00',
            time_update_service: time_update_service ? dayjs(time_update_service).format("HH:mm:ss") : '00:00:00',
            time_update_order: time_update_order ? dayjs(time_update_order).format("HH:mm:ss") : '00:00:00',
        };

        console.log('Success:', {...values,...formattedValues});
        const setting:Setting = {
            ...values,
            ...formattedValues,
        }
        const result = await updateSetting(setting)
        if(result.error) messageApi.error("update setting err!")
            else messageApi.success("Update setting success!")
    };
   const [messageApi, contextHolder] = message.useMessage();
    const onFinishFailed: FormProps<Setting>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const [form] = Form.useForm();
    useEffect(() => {
        form.setFieldsValue({
            ...data,
            time_update_service: dayjs(data?.time_update_service, 'HH:mm:ss'),
            time_deny_order: dayjs(data?.time_deny_order, 'HH:mm:ss'),
            time_update_order: dayjs(data?.time_update_order, 'HH:mm:ss'),
            time_exchange_rate: dayjs(data?.time_exchange_rate, 'HH:mm:ss'),
        })
    }, [data, form])

    return <>
        {contextHolder}
        <Card title="Setting" style={{ maxWidth: 800, margin: "auto" }}>
            {isFetching ?
                <div className="flex justify-center">
                    <Spin />
                </div>
                : <Form<Setting>
                    form={form}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 800 }}
                    initialValues={{ timeupdateservice: "10:10" }}
                    onFinish={onFinish}
                    labelAlign="left"
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item<Setting>
                        label="Time update service"
                        name="time_update_service"
                        rules={[{ required: true }]}
                    >
                        <TimePicker className="w-full" />
                    </Form.Item>
                    <Form.Item<Setting>

                        label="Time update order"
                        name="time_update_order"
                        rules={[{ required: true }]}
                    >
                        <TimePicker className="w-full" />
                    </Form.Item>
                    <Form.Item<Setting>

                        label="Time deny order "
                        name="time_deny_order"
                        rules={[{ required: true }]}
                    >
                        <TimePicker className="w-full" />
                    </Form.Item>
                    <Form.Item<Setting>

                        label="Time exchange rate"
                        name="time_exchange_rate"
                        rules={[{ required: true }]}
                    >
                        <TimePicker className="w-full" />
                    </Form.Item>

                    <Form.Item<Setting>

                        label="Phone"
                        name="phone"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<Setting>
                        label="Facebook"
                        name="facebook"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<Setting>

                        label="Zalo"
                        name="zalo"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<Setting>
                        label="Bank"
                        name="bank_id"
                        initialValue={39}
                    >
                        <Select
                            showSearch options={bankQuery?.data?.map((bank: any) => ({
                                value: bank.id,
                                label: bank.name
                            }))} />
                    </Form.Item>
                    <Form.Item<Setting>

                        label="Account no"
                        name="account_no"
                        rules={[{ required: true, }]}
                    >
                        <Input />
                    </Form.Item>
                    <div className="flex items-end">
                        <Button type="primary" htmlType="submit">Save</Button>
                    </div>
                </Form>
            }

        </Card>
    </>
}

export default Page

