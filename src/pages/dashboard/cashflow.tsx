import WrapComponent from '@/components/dashboad/wrap-component';
import { useGetCashflowQuery } from '@/libs/redux/api/cashflowApi';
import { Button, Card, Input, Table, TableProps } from 'antd';
import { GetStaticPropsContext } from 'next';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import { debounce } from 'lodash'
import router, { useRouter } from 'next/router';
import dayjs from 'dayjs';
import SearchFilter from '@/components/filters/search-filter';
import DateFilter from '@/components/filters/date-filter';
import { syncObjectToUrl, usePagination } from '@/common';

export const useQueryParams = () => {
    const searchParams = useSearchParams();
    return Object.fromEntries(
        Array.from(searchParams.entries()).filter(([_, value]) => value !== "" && value !== undefined)
    );
};

const Page = () => {
    const { page, per_page } = usePagination(router)

    const { data, isFetching, isError } = useGetCashflowQuery({ ...useQueryParams() })

    const pageIndex = 1, pageSize = 10;
    const tableProps: TableProps<Cashflow> = {
        rowKey: "id",
        columns: [
            {
                title: 'No.',
                dataIndex: 'id',
                key: 'id',
                render: (text, record, index) => pageIndex * pageSize + (index + 1) - pageSize
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
            },
            {
                title: 'Fluctuation',
                dataIndex: 'fluctuation',
                key: 'fluctuation',
            },
            {
                title: 'Balance',
                dataIndex: 'balance',
                key: 'balance',
            },
            {
                title: 'Action',
                dataIndex: 'action',
                key: 'action',
            },
            {
                title: 'Create at',
                dataIndex: 'created_at',
                key: 'created_at',
                render: (text) => dayjs(text).format("DD/MM/YYYY")
            },
        ],
        dataSource: data?.data,
        loading: isFetching,
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
        } />
        <Card classNames={{ body: "!p-0" }}>
            <Table {...tableProps} />
        </Card>

    </>
}

export default Page
