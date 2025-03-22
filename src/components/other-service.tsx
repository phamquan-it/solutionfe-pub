import { Card, List, Image } from 'antd';
import Title from 'antd/es/typography/Title';
import React from 'react';

const OtherService = () => {
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
        <div className="px-2 mb-2">
            <Card>
                <Title level={2} className="text-center mt-3">Other services</Title>
                <p className="pe-16">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <List

                    grid={{ gutter: 16, column: 4 }}
                    dataSource={data}
                    renderItem={(item) => (
                        <List.Item>
                            <Card
                                cover={
                                    <Image width={"100%"} src="https:/picsum.photos/200/200" />
                                }
                                title={item.title}></Card>
                        </List.Item>
                    )}
                />
            </Card>
        </div>

    </>
}

export default OtherService
