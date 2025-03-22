import WrapComponent from '@/components/dashboad/wrap-component';
import SearchFilter from '@/components/filters/search-filter';
import SelectPaymentStatus from '@/components/filters/select-payment-status';
import { useCountPaymentsQuery, useGetPaymentQuery } from '@/libs/redux/api/paymentApi';
import { CheckCircleFilled, CheckCircleOutlined, ClockCircleFilled, CloseCircleFilled, LikeOutlined, PayCircleFilled } from '@ant-design/icons';
import { Button, Card, Input, Statistic, Table, TableProps } from 'antd';
import Title from 'antd/es/typography/Title';
import dayjs from 'dayjs';
import { GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

const Page = () => {
    const router = useRouter()
    const { data, isFetching, isError } = useGetPaymentQuery(router.query)
    const statistic = useCountPaymentsQuery()
    const tableProps: TableProps<Payment> = {
        rowKey:"id",
        columns: [
            {
                title: 'No.',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
                render: (email,record)=>{
                    return record?.user?.email
                }
            },
            {
                title: 'Creator',
                dataIndex: 'user',
                key: 'user',
                render:(user:User)=>user?.name
            },
            {
                title: 'Rate',
                dataIndex: 'rate',
                key: 'rate',
            },
            {
                title: 'Method',
                dataIndex: 'method',
                key: 'method',
            },
            {
                title: 'Amount(USD)',
                dataIndex: 'amount',
                key: 'amount',
            },
            {
                title: 'Amount(VND)',
                dataIndex: 'amount',
                key: 'amount',
            },
            {
                title: 'Create at',
                dataIndex: 'created_at',
                key: 'created_at',
                render: (text) => dayjs(text).format("DD/MM/YYYY")
            },
            {
                title: 'Action',
                dataIndex: 'action',
                key: 'action',
            },
        ],
        dataSource: data?.data,
        loading:isFetching
    }

    return <>
        <div className="grid md:grid-cols-4 gap-2 mb-3">
            <Card>
                <Statistic title="Feedback" value={1128} prefix={<PayCircleFilled />} />
            </Card>
            <Card>
                <Statistic title="Completed" className="text-green-600" value={statistic?.data?.COMPLETED} prefix={<CheckCircleFilled className="!text-green-600" />} />
            </Card>
            <Card>
                <Statistic title="Pendding" value={statistic?.data?.PENDING} prefix={<ClockCircleFilled className="!text-yellow-500" />} />
            </Card>
            <Card>
                <Statistic title="Cancelled" value={statistic?.data?.CANCELED} prefix={<CloseCircleFilled className="!text-red-500" />} />
            </Card>
        </div>
        <WrapComponent filter={
            <div className="flex gap-2">
                <SearchFilter />
                <SelectPaymentStatus/>
            </div>
        } />
        <Card classNames={{ body: "!p-0" }}>
            <Table {...tableProps} />
        </Card>

    </>
}

export default Page
