import { getEntryNo, syncObjectToUrl, usePagination } from '@/common';
import dynamic from 'next/dynamic';

import CreatePost from '@/components/post/create-post';
import DeletePost from '@/components/post/delete-post';
import WrapComponent from '@/components/dashboad/wrap-component';
import SearchFilter from '@/components/filters/search-filter';
import { useGetPostsQuery } from '@/libs/redux/api/postApi';
import { Card, Table, TableProps } from 'antd';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import React from 'react';
import UpdatePost from '@/components/post/update-post';

const Page = () => {
    const router = useRouter();
    const { page, per_page } = usePagination(router);
    const { data, isFetching } = useGetPostsQuery(router.query);

    const tableProps: TableProps<Post> = {
        rowKey: "id",
        columns: [
            {
                title: 'No.',
                dataIndex: 'id',
                key: 'id',
                render: (text, record, index) => getEntryNo(index, router)
            },
            {
                title: 'Title',
                dataIndex: 'title',
                key: 'title',
            },
            {
                title: 'Title(vi)',
                dataIndex: 'title_vi',
                key: 'title_vi',
            },
            {
                title: 'Created At',
                dataIndex: 'created_at',
                key: 'created_at',
                render: (text) => dayjs(text).format("DD/MM/YYYY")
            },
            {
                title: 'Action',
                dataIndex: 'action',
                key: 'action',
                render: (text, record) => (
                    <div className="flex gap-2">
                        <UpdatePost post={record} />
                        <DeletePost post_id={record.id} />
                    </div>
                )
            },
        ],
        dataSource: data?.data,
        loading: isFetching,
        pagination: {
            current: page,
            pageSize: per_page
        },
        expandedRowRender: (record) => (
            <div className="p-4 rounded-lg">
                <p><strong>Description:</strong> {record.description}</p>
                <p><strong>Description (VI):</strong> {record.description_vi}</p>
            </div>
        ),

        onChange: (pagination) => {
            syncObjectToUrl(router, {
                page: pagination.current ?? 1,
                per_page: pagination.pageSize || 10
            });
        }
    };

    return (
        <>
            <WrapComponent filter={
                <div className="flex gap-2">
                    <SearchFilter />
                </div>
            } action={
                <CreatePost />
            } />
            <Card classNames={{ body: "!p-0" }}>
                <Table {...tableProps} />
            </Card>
        </>
    );
};

export default Page;

