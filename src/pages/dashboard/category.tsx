import { getEntryNo, syncObjectToUrl, usePagination } from '@/common';
import dynamic from 'next/dynamic';
const UpdateCategory = dynamic(() => import('@/components/category/update-category'), {
  ssr: false, // Set to true if you want server-side rendering
});
import CreateCategory from '@/components/category/create-category';
import DeleteCategory from '@/components/category/delete-category';
import WrapComponent from '@/components/dashboad/wrap-component';
import SearchFilter from '@/components/filters/search-filter';
import { useDeleteCategoryMutation, useGetCategoriesQuery, useUpdateCategoryMutation } from '@/libs/redux/api/categoryApi';
import { Button, Card, Input, Table, TableProps } from 'antd';
import dayjs from 'dayjs';
import { GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

const Page = () => {
    const router = useRouter()
    const {page, per_page} = usePagination(router)
    const { data, isFetching } = useGetCategoriesQuery(router.query)
    const tableProps: TableProps = {
        rowKey: "id",
        columns: [
            {
                title: 'No.',
                dataIndex: 'id',
                key: 'id',
                render: (text, record,index)=>getEntryNo(index,router)
            },
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
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
                        <UpdateCategory category={record} />
                        <DeleteCategory category_id={record.id} />
                    </div>)
            },
        ],
        dataSource: data,
        loading: isFetching,
        pagination: {
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
            <CreateCategory />
        } />
        <Card classNames={{ body: "!p-0" }}>
            <Table {...tableProps} />
        </Card>

    </>
}

export default Page

