import { getEntryNo, syncObjectToUrl, usePagination } from '@/common';
import PaymentProject from '@/components/dashboad/payment-project';
import CreateProject from '@/components/dashboad/project/create-project';
import UpdateProject from '@/components/dashboad/project/update-project';
import WrapComponent from '@/components/dashboad/wrap-component';
import DateFilter from '@/components/filters/date-filter';
import SearchFilter from '@/components/filters/search-filter';
import SelectLanguage from '@/components/filters/select-language';
import SelectTechnology from '@/components/filters/select-technology';
import ProjectPrice from '@/components/project/project-price';
import ProjectStatus from '@/components/project/project-status';
import RenderTechnologies from '@/components/project/render-technologies';
import ProjectStatistic from '@/components/project/statistic';
import { useGetProjectsQuery } from '@/libs/redux/api/projectApi';
import { RootState } from '@/libs/redux/store';
import { isUser } from '@/utils/authUtils';
import { Button, Card, Input, List, Table, TableProps } from 'antd';
import dayjs from 'dayjs';
import { GetStaticPropsContext } from 'next';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';

const Page = () => {
    const router = useRouter()

    const user = useSelector((state: RootState) => state.user);
    const { data, isFetching, isError } = useGetProjectsQuery(router.query);
    const { page, per_page } = usePagination(router)
    const t = useTranslations("table")
    const tableProps: TableProps<Project> = {
        rowKey: "id",
        columns: [
            {
                title: t('no'),
                dataIndex: 'id',
                key: 'id',
                render: (text, record, index) => getEntryNo(index, router)
            },
            {
                title: t('name'),
                dataIndex: 'name',
                key: 'name',
            },
            ...(user.role !== "user" ? [  // Conditionally include Status column
                {
                    title: 'Email',
                    dataIndex: 'user',
                    key: 'user',
                    render: (user: User) => user.email
                },
            ] : []),

            {
                title: t('technologies'),
                dataIndex: 'technologies',
                key: 'technologies',
                render: (value, record) => {
                    return <RenderTechnologies project={record} />
                },
                responsive: ["md"]
            },
            {
                title: t('price'),
                dataIndex: 'price',
                key: 'price',
                render: (text, record) => <ProjectPrice project={record} />,
                responsive: ["md"]
            },
            {
                title: t('duration'),
                dataIndex: 'duration',
                key: 'duration',
                responsive: ["md"]
            },
            ...(user.role !== "user" ? [  // Conditionally include Status column
                {
                    title: t('status'),
                    dataIndex: 'status',
                    key: 'status',
                    render: (text: any, record: Project) => <ProjectStatus project={record} />
                }
            ] : []),

            {
                title: t('createdAt'),
                dataIndex: 'created_at',
                key: 'created_at',
                render: (text) => dayjs(text).format("DD/MM/YYYY"),
                responsive: ["md"]
            },
            {
                title: t('action'),
                dataIndex: 'action',
                key: 'action',
                render: (text, record) => (
                    <div className="flex gap-3">
                        {isUser(user.role) ?
                            <></>
                            :
                            <UpdateProject project={record} />
                        }
                        <PaymentProject project={record} />
                    </div>
                )
            },
        ],
        dataSource: data?.data,
        loading: isFetching,
        pagination: {
            total: data?.total,
            current: page,
            pageSize: per_page
        },
        expandedRowRender: (record) => (<>
            {record.description}
        </>),
        onChange: (pagination) => {
            syncObjectToUrl(router, {
                page: pagination.current ?? 1,
                per_page: pagination.pageSize || 10
            })
        }

    }

    return <>
        <div className="hidden sm:block">
            <ProjectStatistic />
        </div>
        <WrapComponent filter={
            <div className="grid sm:flex gap-2">
                <SearchFilter />
                <SelectTechnology />
                <DateFilter />
            </div>
        } action={
            <>
                {!isUser ?
                    <CreateProject />
                    : <></>
                }
            </>} />
        <Card classNames={{ body: "!p-0" }}>
            <Table {...tableProps} />
        </Card>
         </>
}

export default Page

