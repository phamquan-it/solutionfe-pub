import { Card, List } from 'antd';
import React from 'react';

const Page = () => {
    const data = [
        {
            title: 'Title 1',
        },
        {
            title: 'Title 2',
        },
        {
            title: 'Title 3',
        },
        {
            title: 'Title 4',
        },
    ];
    return <>
        <List
            grid={{ gutter: 8, column: 1 , sm:1, lg:2, md: 2, xl: 2, xs: 1, xxl:2 }}
            dataSource={data}
            renderItem={(item) => (
                <List.Item aria-colspan={2}>
                    <Card title={item.title}>Card content</Card>
                </List.Item>
            )}
        />
    </>
}

export default Page
