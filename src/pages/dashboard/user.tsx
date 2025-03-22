import { getEntryNo, syncObjectToUrl, usePagination } from '@/common';
import CreateUser from '@/components/dashboad/user/create-user';
import UpdateUser from '@/components/dashboad/user/update-user';
import WrapComponent from '@/components/dashboad/wrap-component';
import SearchFilter from '@/components/filters/search-filter';
import { useChangePasswordMutation, useGetListUserQuery } from '@/libs/redux/api/userApi';
import { Button, Card, Input, Switch, Table } from 'antd';
import { ColumnsType, TableProps } from 'antd/es/table';
import dayjs from 'dayjs';
import { GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

const Page = () => {
    const router = useRouter()
    const { data, isFetching, isError } = useGetListUserQuery(router.query)

    const { page, per_page } = usePagination(router)
    const columns: ColumnsType<User> = [
        {
            title: 'No.',
            dataIndex: 'id',
            key: 'id',
            render: (text, record, index) => getEntryNo(index, router)
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Active',
            dataIndex: 'active',
            key: 'active',
            render: (text) => (
                <Switch defaultChecked />
            )
        },
        {
            title: 'Phone number',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Create at',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (text) => dayjs(text).format("DD/MM/YYYY")
        },
        {
            title: 'Update at',
            dataIndex: 'updated_at',
            key: 'updated_at',
            render: (text) => dayjs(text).format("DD/MM/YYYY")
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => (
                <UpdateUser user={record} />
            )
        },
    ];
    const tableProps: TableProps<User> = {
        columns,
        dataSource: data?.data,
        pagination: {
            total: data?.total,
            current: page,
            pageSize: per_page
        },
        loading: isFetching,
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
            </div>
        } action={
            <CreateUser />
        } />
        <Card classNames={{ body: "!p-0" }}>
            <Table {...tableProps} />
        </Card>
    </>
}

export default Page
