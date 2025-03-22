import { useCreateTransactionMutation } from '@/libs/redux/api/projectApi';
import { Button, Form, FormProps, Input, Modal, Select, Tabs, TabsProps, Image, Table, message } from 'antd';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
interface PaymentProjectProps {
    project: Project
}
export enum PaymentType {
    COMFIRM = 'confirm',
    PARTIAL = 'partial',
    FULL_PAYMENT = 'full'
}
const PaymentProject: React.FC<PaymentProjectProps> = ({ project }) => {
    const [createTransaction, transactionState] = useCreateTransactionMutation()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const transactions = project.transactions

    const totalAmountIn = transactions.reduce(
        (sum, tx) => tx.transaction_content !== null ? sum + parseFloat(tx.amount_in || "0") : sum,
        0
    );
    const [qrsrc, setQrsrc] = useState<string>('')
    const handleCancel = () => {
        setIsModalOpen(false)
    }

    const handleOk = () => {
        if (activeKey == "1") {
            form.submit()
        } else {
            handleCancel()
        }
    }
    const paid = totalAmountIn >= project.price
    const pm = useTranslations("paymentType")
    const onFinish: FormProps['onFinish'] = (values) => {
        createTransaction({
            gateway: "SePay",
            transaction_date: dayjs().format("YYYY-MM-DD HH:mm:ss"),
            account_number: "00005864268",
            amount_in: Number(values.amount),
            amount_out: 0,
            accumulated: 150,
            code: "TXN123",
            transaction_content: null,
            reference_number: "REF",
            body: "Details about the transaction",
            project_id: project.id ?? -1
        }).then((result) => {
            if (result.error) message.error("Create transaction err"); else {
                message.success("Create transaction success!")
                setQrsrc(`https://qr.sepay.vn/img?bank=TPBank&acc=00005864268&template=compact&amount=${values.amount}&des=SO${project.id}`)
                setActiveKey("2")
            }
        })
    };

    const onFinishFailed: FormProps['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const paymentOptions = Object.values(PaymentType).map((value) => ({
        value,
        label: <span>{pm(value)}</span>,
    }));
    const [disableAmountField, setDisableAmountField] = useState(true)
    const [form] = Form.useForm()



    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Add payment',
            children: <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item label="Method"
                    name="payment_type"
                    rules={[{ required: true }]}
                >
                    <Select options={paymentOptions} onChange={(value) => {
                        setDisableAmountField(true)
                        if (value == PaymentType.COMFIRM) {
                            form.setFieldValue('amount', 1)
                        }
                        if (value == PaymentType.FULL_PAYMENT) {
                            form.setFieldValue("amount", project.price - totalAmountIn)
                        }

                        if (value == PaymentType.PARTIAL) {
                            setDisableAmountField(false)
                        }

                    }} />
                </Form.Item>

                <Form.Item label="Amount"
                    name="amount"
                    rules={[{ required: true }]}
                >
                    <Input disabled={disableAmountField} />
                </Form.Item>
            </Form>
            ,
        },
        {
            key: '2',
            label: 'Transaction',
            children: (
                <>
                    {qrsrc == '' ?
                        <>
                            No transaction in here
                        </>
                        :
                        <div className="grid grid-cols-3">
                            <Image width={200} alt="qrsrsc" src={qrsrc} />
                            <Table showHeader={false} pagination={false} className="col-span-2" dataSource={[
                                {
                                    key: '1',
                                    name: 'STK',
                                    value: "00005864268",
                                },
                                {
                                    key: '2',
                                    name: 'Name',
                                    value: "PHAM MINH QUAN",
                                },
                                {
                                    key: '3',
                                    name: 'Bank name',
                                    value: "TP Bank",
                                },
                                {
                                    key: '4',
                                    name: 'Amount',
                                    value: form.getFieldValue('amount'),
                                },
                            ]
                            } columns={[
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
                    }

                </>
            ),
        }
    ];
    const [activeKey, setActiveKey] = useState<string>("1")
    return <>
        <Button type="primary" className={paid ? 'hidden' : ''} disabled={
            paid
        } onClick={() => {
            setIsModalOpen(true)
        }}>Pay</Button>
        <Modal destroyOnClose={true} title="Pay" open={isModalOpen} onOk={handleOk} width={750} onCancel={handleCancel}>
            <Tabs activeKey={activeKey} items={items} onChange={(k) => {
                setActiveKey(k)
            }} />
        </Modal>
    </>
}

export default PaymentProject
