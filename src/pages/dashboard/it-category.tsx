import { getEntryNo, syncObjectToUrl, usePagination } from '@/common';
import WrapComponent from '@/components/dashboad/wrap-component';
import SearchFilter from '@/components/filters/search-filter';
import CreateITCategory from '@/components/it_category/create-itcategory';
import DeleteITCategory from '@/components/it_category/delete-itcategory';
import UpdateITCategory from '@/components/it_category/update-itcategory';
import { useGetCategoriesQuery } from '@/libs/redux/api/categoryApi';
import { useGetITCategoryQuery } from '@/libs/redux/api/it_categoryApi';
import { Button, Card, Input, Table, TableProps } from 'antd';
import dayjs from 'dayjs';
import { GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

const Page = () => {
    const router = useRouter()
    const { page, per_page } = usePagination(router)
    const { data, isFetching } = useGetITCategoryQuery(router.query)
    const tableProps: TableProps = {
        rowKey: "id",
        columns: [
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
                        <UpdateITCategory it_category={record} />
                        <DeleteITCategory it_category_id={record.id} />
                    </div>)
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
            </div>
        } action={
            <CreateITCategory />
        } />
        <Card classNames={{ body: "!p-0" }}>
            <Table {...tableProps} />
        </Card>

    </>
}

export default Page

