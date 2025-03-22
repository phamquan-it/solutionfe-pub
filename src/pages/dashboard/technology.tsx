import { getEntryNo, syncObjectToUrl, usePagination } from '@/common';
import { ref } from 'firebase/storage';
import { storage } from '@/config/firebase_config';
import WrapComponent from '@/components/dashboad/wrap-component';
import SearchFilter from '@/components/filters/search-filter';
import SelectITCategory from '@/components/filters/select-ittechnology';
import SelectLanguage from '@/components/filters/select-language';
import CreateTechnology from '@/components/technology/create-technology';
import DeleteTechnology from '@/components/technology/delete-technology';
import UpdateTechnology from '@/components/technology/update-technology';
import { useGetTechnologyQuery } from '@/libs/redux/api/technologyApi';
import { Button, Card, Input, Table, TableProps, Image } from 'antd';
import dayjs from 'dayjs';
import { GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import ShowIcon from '@/components/firebases/show-icon';
import SvgRenderer from '@/components/svg-render';

const Page = () => {
    const router = useRouter()
    const { data, isFetching } = useGetTechnologyQuery(router.query)
    const { page, per_page } = usePagination(router)

    const tableProps: TableProps<Technology> = {
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
                title: 'Icon',
                dataIndex: 'icon',
                key: 'icon',
                render:(text)=> <SvgRenderer svgContent={text}/>
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
                        <UpdateTechnology technology={record} />
                        <DeleteTechnology technology_id={record.id || -1} />
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
                <SelectLanguage />
                <SelectITCategory />
            </div>
        } action={
            <CreateTechnology />
        } />
        <Card classNames={{ body: "!p-0" }}>
            <Table {...tableProps} />
        </Card>

    </>
}

export default Page
