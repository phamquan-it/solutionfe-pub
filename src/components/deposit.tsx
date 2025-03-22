import { useGetExchangeRateQuery } from '@/libs/redux/api/bankApi';
import { useCreatePaymentMutation } from '@/libs/redux/api/paymentApi';
import { Button, Form, FormProps, Input, Modal, Image, Table } from 'antd';
import React, { useEffect, useState } from 'react';

const Deposit: React.FC = () => {
    type DepositType = {
        amount_usd?: string;
        exchange_rate: number;
        amount_vnd?: string;
    };

    const [createPayment, createPaymentState] = useCreatePaymentMutation()

    const { data } = useGetExchangeRateQuery();
    const exchangeRate = data?.USD_to_VND || 0;

    const [form] = Form.useForm<DepositType>();

    useEffect(() => {
        form.setFieldsValue({ exchange_rate: exchangeRate });
    }, [exchangeRate, form]);

    const onValuesChange = (changedValues: Partial<DepositType>, allValues: DepositType) => {
        if ('amount_usd' in changedValues) {
            const usdAmount = parseFloat(changedValues.amount_usd || '0');
            const vndAmount = usdAmount * exchangeRate;
            form.setFieldsValue({ amount_vnd: vndAmount.toFixed(0) });
        } else if ('amount_vnd' in changedValues) {
            const vndAmount = parseFloat(changedValues.amount_vnd || '0');
            const usdAmount = exchangeRate ? vndAmount / exchangeRate : 0;
            form.setFieldsValue({ amount_usd: usdAmount.toFixed(2) });
        }
    };
    const [qrsrc, setQrsrc] = useState<string>()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const onFinish: FormProps<DepositType>['onFinish'] = async (values) => {
        const paymentResult = await createPayment(Number(values.amount_vnd))
        
        const payment_id = paymentResult.data?.id
        if (paymentResult.data) {
            setQrsrc(`https://qr.sepay.vn/img?bank=TPBank&acc=00005864268&template=compact&amount=${values.amount_vnd}&des=SO${payment_id}`)
            setIsModalOpen(true)
        }
    };
    const handleCancel = () => {
        setQrsrc(undefined)
        setIsModalOpen(false)
    }
    return (
        <>
            <Modal title="Deposit" width={630} footer={[]} open={isModalOpen} onCancel={handleCancel}>
                <div className="grid grid-cols-2">
                    <Image width={280} src={qrsrc} />
                    <Table showHeader={false} pagination={false} dataSource={[
                        {
                            key: '1',
                            name: "STK",
                            value: "00005864268"
                        },
                        {
                            key: '2',
                            name: "Chủ tài khoản",
                            value: "PHAM MINH QUAN"
                        },
                        {
                            key: '3',
                            name: "Tên ngân hàng",
                            value: "TP Bank"
                        },
                        {
                            key: '4',
                            name: "Nội dung CK",
                            value: "Solu_payment-1"
                        },
                        {
                            key: '5',
                            name: "Số tiền",
                            value: form.getFieldValue("amount_vnd")
                        }
                    ]} columns={[
                        {
                            title: 'Name',
                            dataIndex: 'name',
                            key: 'name',
                        },
                        {
                            title: 'Value',
                            dataIndex: 'value',
                            key: 'value',
                        },
                    ]} />
                </div>
            </Modal>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                onValuesChange={onValuesChange}
                autoComplete="off"
            >
                <Form.Item<DepositType>
                    label="Amount (USD)"
                    name="amount_usd"
                    rules={[{ required: true, message: 'Please enter amount in USD' }]}
                >
                    <Input type="number" step="0.01" />
                </Form.Item>
                <Form.Item<DepositType>
                    label="Amount (VND)"
                    name="amount_vnd"
                    rules={[{ required: true, message: 'Please enter amount in VND' }]}
                >
                    <Input type="number" />
                </Form.Item>
                <Form.Item<DepositType>
                    label="Exchange rate"
                    name="exchange_rate"
                    rules={[{ required: true, message: 'Exchange rate is required' }]}
                >
                    <Input type="number" disabled />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={createPaymentState.isLoading}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default Deposit;

