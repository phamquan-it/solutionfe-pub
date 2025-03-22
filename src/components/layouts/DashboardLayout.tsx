import { DashboardRouter } from '@/DashBoardRouter';
import { AppstoreFilled, AppstoreOutlined, BarsOutlined, BellOutlined, FileTextOutlined, FundOutlined, HomeFilled, MailOutlined, PlusOutlined, ProductFilled, SettingFilled, SettingOutlined, TeamOutlined } from '@ant-design/icons';
import { Layout, Menu, MenuProps, Image, Select, Button, Dropdown, Card, List } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactNode, useState } from 'react';
import { FaHistory, FaMoneyBill, FaQuestion } from 'react-icons/fa';
import { RiFundsLine } from 'react-icons/ri';
import LocaleSwitcher from '../LocaleSwitcher';
import { useTranslations } from 'next-intl';
import withAuth from '@/utils/withAuth';
import { useGetUserInfoQuery } from '@/libs/redux/api/userApi';
import { useSelector } from 'react-redux';
import { RootState } from '@/libs/redux/store';
import { isUser } from '@/utils/authUtils';
interface DashboardLayoutProps {
    children: ReactNode
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    const user = useSelector((state: RootState) => state.user);
    const router = useRouter()
    const [collaped, setCollaped] = useState(false)
    type MenuItem = Required<MenuProps>['items'][number];
    const t = useTranslations('DashboardLanguage')
    const items: MenuItem[] = [
        {
            type: 'group',
            label: <Button icon={<PlusOutlined />} className={collaped ? "!w-full" : "w-auto"} onClick={() => {
                router.push("/solution")
            }} style={{
                height: 40,
            }}>{collaped ? "" : t('newproject')}</Button>,
        },
        {
            key: DashboardRouter.HOME,
            label: <Link href={DashboardRouter.HOME}>{t('home')}</Link>,
            icon: <HomeFilled />,
        },
        {
            key: DashboardRouter.SERVICE,
            label: <Link href={DashboardRouter.SERVICE}>{t('service')}</Link>,
            icon: <BarsOutlined />,
        },
        {
            key: DashboardRouter.CATEGORY,
            label: <Link href={DashboardRouter.CATEGORY}>{t('category')}</Link>,
            icon: <AppstoreFilled />,

        },
        {
            key: DashboardRouter.TECHNOLOGY,
            label: <Link href={DashboardRouter.TECHNOLOGY}>{t('technology')}</Link>,
            icon: <AppstoreFilled />,
        },
        {
            key: DashboardRouter.POST,
            label: <Link href={DashboardRouter.POST}>{('Posts')}</Link>,
            icon: <AppstoreFilled />,

        },
        {
            key: DashboardRouter.PROJECT,
            label: <Link href={DashboardRouter.PROJECT}>{t('project')}</Link>,
            icon: <ProductFilled />,

        },
        {
            key: DashboardRouter.LANGUAGE,
            label: <Link href={DashboardRouter.LANGUAGE}>{t('language')}</Link>,
            icon: <AppstoreFilled />,

        },
        {
            key: DashboardRouter.CASHFLOW,
            label: <Link href={DashboardRouter.CASHFLOW}>{t('cashflow')}</Link>,
            icon: <FundOutlined />,
        },
        {
            key: DashboardRouter.REFUND,
            label: <Link href={DashboardRouter.REFUND}>{t('refund')}</Link>,
            icon: <FaMoneyBill />,
        },
        {
            key: DashboardRouter.FAQ,
            label: <Link href={DashboardRouter.FAQ}>{('FAQ')}</Link>,
            icon: <FaQuestion />,
        },
        {
            key: DashboardRouter.PAYMENT_HISTORY,
            label: <Link href={DashboardRouter.PAYMENT_HISTORY}>{t('payment-history')}</Link>,
            icon: <FaHistory />,
        },
        {
            key: DashboardRouter.ITCATEGORY,
            label: <Link href={DashboardRouter.ITCATEGORY}>{t('itcategory')}</Link>,
            icon: <AppstoreFilled />,

        },
        {
            key: DashboardRouter.USER,
            label: <Link href={DashboardRouter.USER}>{t('user')}</Link>,
            icon: <TeamOutlined />,
        },
        {
            key: DashboardRouter.CONTACT,
            label: <Link href={DashboardRouter.CONTACT}>{t('contact')}</Link>,
            icon: <TeamOutlined />,
        },
        {
            key: DashboardRouter.SETTING,
            label: <Link href={DashboardRouter.SETTING}>{t('setting')}</Link>,
            icon: <SettingFilled />,
        },
        {
            key: DashboardRouter.LOG,
            label: <Link href={DashboardRouter.LOG}>{t('log')}</Link>,
            icon: <FileTextOutlined />,
        },
        {
            key: DashboardRouter.MYPROFILE,
            label: <Link href={DashboardRouter.MYPROFILE}>{t('profile')}</Link>,
            icon: <FileTextOutlined />,
        }
    ];
    const filteredValues = items.filter((item: MenuItem) => {
        if (isUser(user.role)) return item?.key === DashboardRouter.PROJECT
            || item?.key === DashboardRouter.HOME
            || item?.key === DashboardRouter.MYPROFILE
            || item?.type == 'group'
        else return true
    })

    const data = [
        {
            title: 'Welcome to solution',
        },
    ];
    return <>
        <Layout className="h-screen">
            <Header className="border-b">
                <div className="flex justify-between h-full items-center">
                    <div className="h-full">
                        <Link href={'/'}>
                            <Image width={120} height={50} src="/logo-text.png" preview={false} />
                        </Link>
                    </div>
                    <div className="flex h-full items-center gap-1">
                        <Dropdown trigger={['click']} dropdownRender={() => <Card className="w-48" >
                            <List
                                itemLayout="horizontal"
                                dataSource={data}
                                renderItem={(item, index) => (
                                    <List.Item>
                                        <List.Item.Meta
                                            title={<a href="https://ant.design">{item.title}</a>}
                                            description="Ant Design, a design language f"
                                        />
                                    </List.Item>
                                )}
                            />
                        </Card>} placement="bottomRight">
                            <Button type="primary" icon={<BellOutlined />} shape="circle"></Button>
                        </Dropdown>
                        <LocaleSwitcher />
                    </div>
                </div>
            </Header>
            <Layout>
                <Sider theme={'light'}
                    className="border-r !h-full overflow-auto slide-menu"
                    collapsed={collaped}
                    onCollapse={(e) => {
                        setCollaped(e)
                    }}
                    breakpoint={"md"}
                    collapsible={true}

                >
                    <Menu
                        className="!border-none"
                        mode="inline"
                        items={filteredValues}
                        defaultSelectedKeys={[router.pathname]}
                    />

                    <div className="p-4"></div>
                </Sider>
                <Content className="overflow-auto p-3">
                    {children}
                </Content>
            </Layout>
        </Layout>
    </>

}

export default withAuth(DashboardLayout)
