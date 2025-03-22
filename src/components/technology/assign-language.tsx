import { useGetLanguageQuery } from '@/libs/redux/api/languageApi';
import { useUpdateLanguagesTechnologyMutation } from '@/libs/redux/api/technologyApi';
import { Table, Image, Button, message } from 'antd';
import React, { useState } from 'react';
import SvgRenderer from '../svg-render';
import { ColumnsType } from 'antd/es/table';
interface AssignLanguageProps {
    technology: Technology,
}

const AssignLanguage: React.FC<AssignLanguageProps> = ({ technology }) => {
    const languages = technology.languages ?? [];
    const { data, isFetching, isError } = useGetLanguageQuery({})
    const [assignLanguagesTechnology, ltState] = useUpdateLanguagesTechnologyMutation();
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>(
        languages.map((language) => (language.id || -1) as React.Key)
    )
    const columns:ColumnsType<Language> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'icon',
            dataIndex: 'icon',
            key: 'icon',
            render: (text) => (
                <SvgRenderer svgContent={text}/>
            )
        },
    ];

    const [messageApi, contextHolder] = message.useMessage();
    const handleAssign = async () => {
        const result = await assignLanguagesTechnology({
            technology_id: technology.id || -1,
            language_ids: selectedRowKeys.map((key) => Number(key))
        })
        if(!result.error)messageApi.success("update program language success!")
            else messageApi.error("update err!")
    }

    return <>
        {contextHolder}
        <Table
            rowKey="id"
            dataSource={data}
            columns={columns}
            loading={isFetching}
            pagination={false}
            rowSelection={{
                type: "checkbox",
                selectedRowKeys,
                onChange: (selectedKeys) => {
                    setSelectedRowKeys(selectedKeys)
                }
            }}
            scroll={{ y: 200 }}

        />
        <Button
            type="primary"
            className="mt-2"
            block
            loading={ltState.isLoading}
            onClick={handleAssign}
        >Assign</Button>
    </>

}

export default AssignLanguage
