import { syncObjectToUrl, usePagination } from '@/common';
import CreateCategory from '@/components/category/create-category';
import DeleteCategory from '@/components/category/delete-category';
import UpdateCategory from '@/components/category/update-category';
import CreateContact from '@/components/contact/create-contact';
import DeleteContact from '@/components/contact/delete-contact';
import UpdateContact from '@/components/contact/update-contact';
import WrapComponent from '@/components/dashboad/wrap-component';
import SearchFilter from '@/components/filters/search-filter';
import { useGetContactQuery } from '@/libs/redux/api/contactApi';
import { Button, Card, Input, Table, TableProps } from 'antd';
import dayjs from 'dayjs';
import { GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

const Page = () => {

    const router = useRouter();
    const { data, isFetching } = useGetContactQuery(router.query)
    const { page, per_page } = usePagination(router)
    const tableProps: TableProps<Contact> = {
        rowKey: "id",
        columns: [
            {
                title: 'No.',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: 'Full name',
                dataIndex: 'fullname',
                key: 'fullname',
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
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
                    <div className="flex gap-2">
                        <UpdateContact contact={record} />
                        <DeleteContact category_id={record.id} />
                    </div>)
            },
        ],
        dataSource: data?.data,
        loading: isFetching,
        expandable: {
            expandedRowRender: (record) => (<p>{record?.description}</p>),
        },
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
            </div>
        } action={
            <CreateContact />
        } />
        <Card classNames={{ body: "!p-0" }}>
            <Table {...tableProps} />
        </Card>

    </>
}

export default Page
