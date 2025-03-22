import Deposit from '@/components/deposit';
import ChangePassword from '@/components/user/change-password';
import UpdateProfileForm from '@/components/user/edit-profile';
import { Button, Card, Form, Input, Tabs, TabsProps } from 'antd';
import { useTranslations } from 'next-intl';
import React from 'react';

const Page = () => {
    const t = useTranslations("DashboardLanguage")
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: t("profile"),
            children: (
                <UpdateProfileForm/>    
            ),
        },
        {
            key: '2',
            label: t("change_password"),
            children: <>
                <ChangePassword/>
            </>,
        },
          {
            key: '3',
            label: t("deposit"),
            children: <>
                <Deposit/>
            </>,
        },

    ];

    return <>
        <Card style={{
            maxWidth: 600,
            margin: "auto"
        }}>

            <Tabs defaultActiveKey="1" items={items} />
        </Card>
    </>
}

export default Page
