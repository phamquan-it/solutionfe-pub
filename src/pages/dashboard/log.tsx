import WrapComponent from '@/components/dashboad/wrap-component';
import { useGetLogQuery } from '@/libs/redux/api/logApi';
import { Button, Card, Input, Table } from 'antd';
import { ColumnsType, TableProps } from 'antd/es/table';
import dayjs from 'dayjs';
import { GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { useQueryParams } from './cashflow';
import SearchFilter from '@/components/filters/search-filter';
import { getEntryNo } from '@/common';

const Page = () => {
    const { data, isFetching, isError } = useGetLogQuery(useQueryParams())
    const router = useRouter()
    const columns: ColumnsType<Log> = [
        {
            title: 'No.',
            dataIndex: 'id',
            key: 'id',
            render: (text, record, index) => getEntryNo(index, router)
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
        },
        {
            title: 'Method',
            dataIndex: 'method',
            key: 'method',
        },
        {
            title: 'Create at',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (text) => dayjs(text).format("DD/MM/YYYY")
        },
    ];
    const tableProps: TableProps<Log> = {
        columns,
        dataSource: data?.data,
        pagination: { total: data?.total },
        loading: isFetching,
        onChange: (paginate) => {
            router.push({ query: { page: paginate.current } })
        }
    }
    return <>
        <WrapComponent filter={
            <div className="flex gap-2">
                <SearchFilter/>
            </div>
        } />
        <Card classNames={{ body: "!p-0" }}>
            <Table {...tableProps} />
        </Card>
    </>
}
export default Page
