import { useGetNewestCashflowQuery } from '@/libs/redux/api/cashflowApi';
import { Avatar, List } from 'antd';
import React from 'react';
interface CashflowOverviewProps {
    data?: string
}

const CashflowOverview: React.FC<CashflowOverviewProps> = () => {
    const { data,isFetching, isError } = useGetNewestCashflowQuery()
    if(isError) return <>Err</> 
    
    return <>
        <List loading={isFetching}
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item, index) => (
                <List.Item className="!px-2">
                    <List.Item.Meta
                        avatar={<Avatar src={`/bank.png`} />}
                        title={<a href="https://ant.design">{item.email}</a>}
                        description="Ant Design, a design language"
                    />
                </List.Item>
            )}
        />
    </>
}

export default CashflowOverview
