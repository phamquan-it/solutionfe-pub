import "@/styles/globals.css";
import React, { useEffect, useState } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { ConfigProvider, Spin, Image, Flex } from 'antd';
import type { AppProps } from 'next/app';
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useRouter } from "next/router";
import NextNProgress from 'nextjs-progressbar';
import { DashboardRouter } from "@/DashBoardRouter";
import PageLayout from "@/components/layouts/PageLayout";
import CommonLayout from "@/components/layouts/CommonLayout";
import { Provider } from "react-redux";
import { store } from "@/libs/redux/store";
import theme from "@/theme/themeConfig";
import vi_VN from 'antd/locale/vi_VN';
import en_US from 'antd/locale/en_US';

const App = ({ Component, pageProps }: AppProps) => {
    const { locale = "en" } = useRouter(); // Lấy locale từ URL
    const messages = require(`@/messages/${locale}.json`); // Load file ngôn ngữ
    const router = useRouter();
    const [isReady, setIsReady] = useState(false)
    const routerPath = Object.values(DashboardRouter)
    useEffect(() => {
        setIsReady(router.isReady)
    }, [router.isReady])
    const Layout = routerPath.includes(router.pathname as DashboardRouter) ?
        DashboardLayout :
        (['/login', '/register']
            .includes(router.pathname)) ?
            PageLayout :
            CommonLayout
    return (
        <ConfigProvider theme={theme} locale={router.locale=="vi"?vi_VN: en_US}>
            <Provider store={store}>
                <NextIntlClientProvider
                    locale={locale}
                    messages={messages}
                    timeZone="Europe/Vienna"
                >
                    <NextNProgress height={2} showOnShallow={true} options={{ showSpinner: false }} />
                    {isReady ?
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                        :
                        <Flex align="center" justify="center" className="bg-white h-screen">
                            <Spin />
                        </Flex>
                    }
                </NextIntlClientProvider>

            </Provider>
        </ConfigProvider>
    )
};

export default App;
