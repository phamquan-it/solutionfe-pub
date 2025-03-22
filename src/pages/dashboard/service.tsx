import CreateService from '@/components/dashboad/service/create-service';
import DeleteService from '@/components/dashboad/service/delete-service';
import UpdateService from '@/components/dashboad/service/update-service';
import WrapComponent from '@/components/dashboad/wrap-component';
import SelectTechnology from '@/components/filters/select-technology';
import { useGetServicesQuery } from '@/libs/redux/api/serviceApi';
import { Button, Card, Input, Layout, Select, Table, Image } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { GetStaticPropsContext } from 'next';
import { useTranslations } from 'next-intl';
import React from 'react';
import { useQueryParams } from './cashflow';
import SearchFilter from '@/components/filters/search-filter';
import SelectLanguage from '@/components/filters/select-language';
import SelectCategory from '@/components/filters/select-category';
import DateFilter from '@/components/filters/date-filter';
import RenderTechnologies from '@/components/project/render-technologies';
import { getEntryNo } from '@/common';
import { useRouter } from 'next/router';

const Page = () => {
    const searchParams = useQueryParams()
    const d = useTranslations('DashboardLanguage')
    const { data, isLoading, isError } = useGetServicesQuery(searchParams)
    const router = useRouter()
    const columns: ColumnsType<Service> = [
        {
            title: 'No.',
            dataIndex: 'id',
            key: 'id',
            render: (value, record, index)=>getEntryNo(index,router)

        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Technologies',
            dataIndex: 'technologies',
            key: 'technologies',
            render: (text, record)=>(<RenderTechnologies project={record}/>)
        },
        {
            title: 'Rate',
            dataIndex: 'rate',
            key: 'rate',
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
            render: (text, record) => (<div className="flex gap-2">
                <UpdateService service={record} />
                <DeleteService service_id={record.id ?? -1} />
            </div>)
        },
    ];
    return <>
        <WrapComponent filter={
            <div className="flex gap-2">
                <SearchFilter />
                <SelectTechnology />
                <SelectLanguage />
                <DateFilter />
            </div>
        } action={
            <CreateService />
        } />
        <Card classNames={{ body: "!p-0" }}>
            <Table dataSource={data?.data}
                rowKey="id"
                loading={isLoading}
                expandable={{
                    expandedRowRender: (record) => <p style={{ margin: 0 }}>
                        <Image width={200} src={record.image} />
                    </p>,
                    rowExpandable: (record) => record.name !== 'Not Expandable',
                }}
                columns={columns}
                pagination={{
                    total: data?.total
                }}
            />
        </Card>
    </>
}

export default Page

