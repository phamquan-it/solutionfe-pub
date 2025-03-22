import { getEntryNo, syncObjectToUrl, usePagination } from '@/common';
import WrapComponent from '@/components/dashboad/wrap-component';
import CreateFAQ from '@/components/faq/create-faq';
import DeleteFAQ from '@/components/faq/delete-faq';
import UpdateFAQ from '@/components/faq/update-faq';
import DateFilter from '@/components/filters/date-filter';
import SearchFilter from '@/components/filters/search-filter';
import { useGetFAQsQuery } from '@/libs/redux/api/faqApi';
import { Button, Card, Divider, Table, TableProps } from 'antd';
import dayjs from 'dayjs';
import { GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

const Page = () => {
    const router = useRouter();
    const { page, per_page } = usePagination(router);
    const { data, isFetching } = useGetFAQsQuery(router.query);

    const tableProps: TableProps<FAQ> = {
        rowKey: "id",
        columns: [
            {
                title: 'No.',
                dataIndex: 'id',
                key: 'id',
                render: (text, record, index) => getEntryNo(index, router),
            },
            {
                title: 'Question (EN)',
                dataIndex: 'question',
                key: 'question',
            },
            {
                title: 'Question (VI)',
                dataIndex: 'question_vi',
                key: 'question_vi',
                render: (text) => text || 'N/A',
            },
            {
                title: 'Created at',
                dataIndex: 'created_at',
                key: 'created_at',
                render: (text) => dayjs(text).format("DD/MM/YYYY"),
            },
            {
                title: 'Action',
                dataIndex: 'action',
                key: 'action',
                render: (text, record) => (
                    <div className="flex gap-2">
                        <UpdateFAQ faq={{ ...record }} />
                        <DeleteFAQ faq_id={record.id || -1} />
                    </div>
                ),
            },
        ],
        dataSource: data?.data,
        loading: isFetching,
        pagination: {
            total: data?.total,
            current: page,
            pageSize: per_page,
        },
        expandedRowRender: (record) => (<>
            <p>
                EN: {record.answer}
            </p>
            <Divider type="horizontal" />
            <p>
                VI: {record.answer_vi}
            </p>
        </>),
        onChange: (pagination) => {
            syncObjectToUrl(router, {
                page: pagination.current ?? 1,
                per_page: pagination.pageSize || 10,
            });
        },
    };

    return (
        <>
            <WrapComponent
                filter={
                    <div className="flex gap-2">
                        <SearchFilter />
                        <DateFilter />
                    </div>
                }
                action={<CreateFAQ />}
            />
            <Card classNames={{ body: "!p-0" }}>
                <Table {...tableProps} />
            </Card>
        </>
    );
};

export default Page;

