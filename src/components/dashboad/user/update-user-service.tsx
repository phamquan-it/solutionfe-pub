import { Input, Table, TableProps } from 'antd';
import React from 'react';
interface UpdateUserServiceProps {
    user?:User
}

const UpdateUserService: React.FC<UpdateUserServiceProps> = () => {
    const dataSource = [
        {
            id: 1,
            name: 'Mike',
        },
        {
            id: 2,
            name: 'John',
        },
    ];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
    ];
    const tableProps: TableProps = {
        rowKey:"id",
        dataSource,
        columns,
        className:"mt-2",
        rowSelection: {
            type: 'checkbox'
        }
    }
    return <>
        <Input/>
        <Table {...tableProps} />
    </>
}

export default UpdateUserService
