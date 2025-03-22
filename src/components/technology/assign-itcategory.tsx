import { useGetAllITCategoryQuery } from '@/libs/redux/api/it_categoryApi';
import { useUpdateITTechnologiesTechnologyMutation } from '@/libs/redux/api/technologyApi';
import { Button, Table, message } from 'antd';
import React, { useState } from 'react';
interface AssignITCategoryProps {
    technology: Technology,
}

const AssignITCategory: React.FC<AssignITCategoryProps> = ({ technology }) => {
    const { data, isFetching, isError } = useGetAllITCategoryQuery()
    const [assignItTechnologies, assignTechnology] = useUpdateITTechnologiesTechnologyMutation()
    const itcategories = technology?.itcategories || [];
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>(
        itcategories.map((language) => (language.id || -1) as React.Key)
    )
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        }
    ];
    const [messageApi, contextHolder] = message.useMessage();
    const handleAssign = async () => {
       const result = await  assignItTechnologies({
            technology_id: technology.id || -1,
            ittechnology_ids: selectedRowKeys.map((key)=>Number(key)) 
        })
        if(!result.error)messageApi.success("update ittechnology success")
            else messageApi.error("update ittechnology err!")
    }

    return <>
        {contextHolder}
        <Table
            scroll={{ y: 200 }}
            rowKey="id"
            dataSource={data}
            columns={columns}
            pagination={false}
            loading={isFetching}
            rowSelection={{
                type: "checkbox",
                selectedRowKeys,
                onChange: (selectedKeys) => {
                    setSelectedRowKeys(selectedKeys)
                }
            }}
        />
        <Button
            type="primary"
            onClick={handleAssign}
            block
            className="mt-2"
            loading={assignTechnology.isLoading}
        >Assign</Button>
    </>

}

export default AssignITCategory
