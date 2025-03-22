import { syncObjectToUrl, usePagination } from '@/common';
import WrapComponent from '@/components/dashboad/wrap-component';
import DateFilter from '@/components/filters/date-filter';
import SearchFilter from '@/components/filters/search-filter';
import { useGetRefundQuery } from '@/libs/redux/api/refundApi';
import { Button, Card, Input, Table, TableProps } from 'antd';
import dayjs from 'dayjs';
import { GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

const Page = () => {

    const router = useRouter()
    const { data, isLoading, isError } = useGetRefundQuery(router.query)
    const { page, per_page } = usePagination(router)
    const tableProps: TableProps<Refund> = {
        rowKey: "id",
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
            },
            {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
            },
            {
                title: 'Amount',
                dataIndex: 'refund_amount',
                key: 'refund_amount',
            },
            {
                title: 'Create at',
                dataIndex: 'created_at',
                key: 'created_at',
                render: (text) => dayjs(text).format("DD/MM/YYYY")
            },
        ],
        dataSource: data?.data,
        loading: isLoading,
        pagination: {
            total: data?.total,
            current: page,
            pageSize: per_page
        },
        onChange: (pagination) => {
            syncObjectToUrl(router, {
                page: pagination.current ?? 1,
                per_page: pagination.pageSize || 10
            })
        }

    }

    return <>
        <WrapComponent filter={
            <div className="flex gap-2">
                <SearchFilter />
                <DateFilter />
            </div>
        } action={
            <Button type="primary">Create</Button>
        } />
        <Card classNames={{ body: "!p-0" }}>
            <Table {...tableProps} />
        </Card>

    </>
}

export default Page
