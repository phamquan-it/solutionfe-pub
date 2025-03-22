import SvgRenderer from '@/components/svg-render';
import { useUpdateServiceTechnologyMutation } from '@/libs/redux/api/serviceApi';
import { useGetAllTechnologyQuery } from '@/libs/redux/api/technologyApi';
import { EditFilled } from '@ant-design/icons';
import { Button, Modal, Table, Tabs, TabsProps } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react';
import UpdateServiceForm from './update-service-form';
interface UpdateService {
    service: Service
}
const UpdateService: React.FC<UpdateService> = ({ service }) => {
    const technologies = service?.technologies?.map((techlology) => techlology.id as React.Key) ?? [];
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { data, isFetching, isError } = useGetAllTechnologyQuery()
    const [syncServiceTechnology, syncServiceTechnologyState] = useUpdateServiceTechnologyMutation()

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>(
        technologies
    )
    const handleOk = () => {
        syncServiceTechnology({
            service_id: service.id || -1,
            technology_ids: selectedRowKeys.map((key) => (Number(key)))
        }).then((res) => {

        })
    }
    const handleCancel = () => {
        setIsModalOpen(false);
    }
    const columns: ColumnsType<Technology> = [
        {
            title: 'Technology',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Icon',
            dataIndex: 'icon',
            key: 'icon',
            render: (text: any) => <SvgRenderer svgContent={text} />
        },
    ];


    const onChange = (key: string) => {
        console.log(key);
    };

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Service',
            children: (
                <UpdateServiceForm service={service} />
            ),
        },
        {
            key: '2',
            label: 'Technologies',
            children: (
                <>
                    <Table
                        rowKey="id"
                        loading={isFetching}
                        rowSelection={{
                            type: "checkbox",
                            selectedRowKeys,
                            onChange: (selectedRowKeys) => {
                                setSelectedRowKeys(selectedRowKeys)
                            }
                        }}
                        scroll={{ y: 250 }}
                        pagination={false}
                        dataSource={data}
                        columns={columns} />
                    <Button type="primary"
                        onClick={handleOk}
                        loading={syncServiceTechnologyState.isLoading}
                        className="mt-2"
                    >Update</Button>
                </>
            ),
        },
    ];

    return <>
        <Button type="primary"
            onClick={() => {
                setIsModalOpen(true);
            }}
            iconPosition="end"
            icon={
                <EditFilled />
            }
        ></Button>
        <Modal title="Update"
            footer={[]}
            open={isModalOpen}
            okButtonProps={{
                loading: syncServiceTechnologyState.isLoading
            }} onOk={handleOk} onCancel={handleCancel}>
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />

        </Modal>
    </>

}

export default UpdateService
