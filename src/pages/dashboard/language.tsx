import { syncObjectToUrl, usePagination } from '@/common';
import CreateCategory from '@/components/category/create-category';
import DeleteCategory from '@/components/category/delete-category';
import UpdateCategory from '@/components/category/update-category';
import WrapComponent from '@/components/dashboad/wrap-component';
import SearchFilter from '@/components/filters/search-filter';
import CreateLanguage from '@/components/language/create-language';
import DeleteLanguage from '@/components/language/delete-language';
import UpdateLanguage from '@/components/language/update-language';
import SvgRenderer from '@/components/svg-render';
import { useGetLanguageQuery } from '@/libs/redux/api/languageApi';
import { Button, Card, Input, Table, TableProps } from 'antd';
import dayjs from 'dayjs';
import { GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

const Page = () => {
    const router = useRouter()
    const { page, per_page } = usePagination(router)
    const { data, isFetching, isError } = useGetLanguageQuery(router.query)
    const tableProps: TableProps<Language> = {
        rowKey: "id",
        columns: [
            {
                title: 'No.',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Icon',
                dataIndex: 'icon',
                key: 'icon',
                render: (text: string) =><SvgRenderer svgContent={text}/>
               
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
                        <UpdateLanguage language={record} />
                        <DeleteLanguage language_id={record.id || -1} />
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
            <CreateLanguage />
        } />
        <Card classNames={{ body: "!p-0" }}>
            <Table {...tableProps} />
        </Card>

    </>
}

export default Page
