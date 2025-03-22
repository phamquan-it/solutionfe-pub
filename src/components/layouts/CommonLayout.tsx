import React, { ReactNode } from 'react';
import { Flex, Layout, Image, MenuProps, Menu, Button, Dropdown, Divider } from 'antd';
import LocaleSwitcher from '../LocaleSwitcher';
import { AppstoreOutlined, DesktopOutlined, HomeFilled, MailOutlined, ProductFilled, SettingOutlined, UserOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Order from '../order';
import OrderBuider from '../order';
import { useTranslations } from 'next-intl';
import { isLogin } from '@/common';
import { useGetUserInfoQuery } from '@/libs/redux/api/userApi';
import { useLogoutMutation } from '@/libs/redux/api/authApi';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { clearToken } from '@/libs/redux/slices/authSlice';
import { RootState } from '@/libs/redux/store';
import { clearUser } from '@/libs/redux/slices/userSlice';
const { Header, Footer, Sider, Content } = Layout;

interface CommonLayoutProps {
    children: ReactNode
}

const CommonLayout: React.FC<CommonLayoutProps> = ({ children }) => {
    type MenuItem = Required<MenuProps>['items'][number];
    const router = useRouter()
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const t = useTranslations('Index')// init language
    const token = localStorage.getItem("token"); // Get token from storage/state
    const shouldFetch = Boolean(token); // Check if token exists
    const [logout, { data, isLoading, isError }] = useLogoutMutation()
    const items: MenuItem[] = [
        {
            key: '/',
            label: <Link href={'/'}>{t('home')}</Link>,
            icon: <HomeFilled />,

        },
        {
            key: '/solution',
            label: <Link href={'/solution'}>{t('solutions')}</Link>,
            icon: <ProductFilled />,
        },
        {
            type: 'divider',
        },
        {
            key: '/template',
            label: <Link href={'/template'}>{t('templates')}</Link>,
            icon: <UserOutlined />,
        },
        {
            key: '/contact',
            label: <Link href={'/contact'}>{t('contact')}</Link>,
            icon: <UserOutlined />,
        },
    ];


    return <>
        <Head>
            {/* Title & Meta Description */}
            <title>Solution.dev - Best IT Solutions</title>
            <meta name="description" content="Get the best IT solutions for your business. We provide web development, AI services, and more." />
            <meta name="keywords" content="IT solutions, web development, AI, software services" />
            <meta name="author" content="Solution.dev Team" />

            {/* Open Graph / Facebook */}
            <meta property="og:title" content="Solution.dev - Best IT Solutions" />
            <meta property="og:description" content="Get the best IT solutions for your business. We provide web development, AI services, and more." />
            <meta property="og:image" content="https://soluti0n.dev/og-image.jpg" />
            <meta property="og:url" content="https://soluti0n.dev/" />
            <meta property="og:type" content="website" />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Solution.dev - Best IT Solutions" />
            <meta name="twitter:description" content="Get the best IT solutions for your business. We provide web development, AI services, and more." />
            <meta name="twitter:image" content="https://soluti0n.dev/twitter-image.jpg" />

            {/* Canonical URL */}
            <link rel="canonical" href="https://soluti0n.dev/" />
        </Head>
        <Layout className="h-screen">
            <Header className="border-b">
                <div className="flex justify-between h-full items-center container-common">
                    <div className="flex items-center">
                        <Image width={145} height={50} src="/logo-text.png" preview={false} />
                        <div className="hidden sm:block w-full">
                            <Menu
                                defaultSelectedKeys={[router.pathname]}
                                mode="horizontal"
                                items={items}
                            />
                        </div>

                    </div>
                    <div className="flex h-full items-center gap-2">
                        {user.email != null ?
                            <Dropdown trigger={['click']} menu={{
                                items: [
                                    {
                                        key: '1',
                                        label: <Link href={'/dashboard'}>{t("mysolution")}</Link>
                                    },
                                    {
                                        key: '2',
                                        label: <Link href={''}>{t("myprofile")}</Link>
                                    },
                                    {
                                        key: '/register',
                                        label: <span onClick={() => {
                                            logout().then((res) => {
                                                dispatch(clearToken());
                                                dispatch(clearUser());
                                                router.replace("/login")
                                            })
                                        }}>{t("logout")}</span>
                                    },
                                ]
                            }} placement="bottomLeft">
                                <Button loading={isLoading}>{user?.name}{isLoading ? "Logout..." : ''}</Button>
                            </Dropdown>
                            :
                            <Dropdown menu={{
                                items: [
                                    {
                                        key: '/login',
                                        label: <Link href={'/login'}>{t("login")}</Link>
                                    },
                                    {
                                        key: '/register',
                                        label: <Link href={'/register'}>{t("register")}</Link>
                                    }
                                ]
                            }} placement="bottomLeft">
                                <Button icon={
                                    <UserOutlined />
                                }></Button>
                            </Dropdown>
                        }

                        <LocaleSwitcher />
                    </div>
                </div>
            </Header>
            <Menu
                className="sm:hidden"
                defaultSelectedKeys={[router.pathname]}
                mode="horizontal"
                items={items}
            />
            <Content className="!h-full !overflow-auto">
                <div className="container-common">
                    {children}
                </div>
                <Footer className="!bg-slate-900 !text-slate-50">
                    <div className="grid grid-cols-3 lg:grid-cols-4 container-common">
                        <div className="grid col-span-3 md:col-span-3 lg:col-span-1 mb-3">
                            <Image width={150} src="/logo-text2.png" className="col-span-4" preview={false} />
                        </div>
                        <ul className="">
                            <li className="font-semibold">
                                Products
                            </li>
                            <li>
                                <Link href={'/'} className="text-slate-200 !text-ssm">
                                    Desktop
                                </Link>
                            </li>
                            <li>
                                <Link href={'/'} className="text-slate-200 !text-ssm">
                                    Mobile
                                </Link>
                            </li>
                        </ul>
                        <ul>
                            <li className="font-semibold">
                                Buiders
                            </li>
                            <li>
                                <Link href={'/template?template=2'} className="text-slate-200 !text-ssm">
                                    E-comerge
                                </Link>
                            </li>
                            <li>
                                <Link href={'/'} className="text-slate-200 !text-ssm">
                                    CMS
                                </Link>
                            </li>
                        </ul>
                        <ul>
                            <li className="font-semibold">
                                Socials
                            </li>
                            <li>
                                <Link href={'/'} className="text-slate-200 !text-ssm">
                                    Facebook
                                </Link>
                            </li>
                            <li>
                                <Link href={'/'} className="text-slate-200 !text-ssm">
                                    Twiter
                                </Link>
                            </li>

                            <li>
                                <Link href={'/'} className="text-slate-200 !text-ssm">
                                    LinkedIn
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="container-common">
                        <Divider orientation='center' className="bg-slate-700 mb-1" />
                    </div>
                    <div className="pt-5 container-common">
                        © {new Date().getFullYear()} Solution. All rights reserved.
                    </div>
                </Footer>
            </Content>
        </Layout>
    </>
}

export default CommonLayout
