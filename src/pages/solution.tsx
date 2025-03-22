import OrderBuider from '@/components/order';
import { useGetCategoriesQuery } from '@/libs/redux/api/categoryApi';
import { Card, List, Image, Button } from 'antd';
import Title from 'antd/es/typography/Title';
import { GetStaticPropsContext } from 'next';
import { useTranslations } from 'next-intl';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

const Page = ({ technologies, categories, services }: {
    technologies: Technology[],
    categories: Category[],
    services: Service[]
}) => {
    const t = useTranslations("SolutionPage")
    const data = [
        {
            title: 'Web',
            icon: '/web.png',
            path: { platform: "web" },
            description: <span>
                {t('At')} <span className="font-semibold">Solution</span>,
                {t('weoffer')} <strong>{t('customwebsolutions')}</strong> {t('tailoredtobusinesses')}. {t('ourwebsites')} <strong>{t('flexibility')}</strong>, <strong>{t('scalability')}</strong>, {t('and')} <strong>{t('performance')}</strong>. {t('weprovide')}
            </span>
        },
        {
            title: 'Mobile',
            icon: '/mobile-app.png',
            path: { platform: "mobile" },
            description: <span>
                {t('wespeci')} <strong>{t('custommobileapps')}</strong> {t('for')} iOS {t('and')} Android. {t('ourapp')} <strong>{t('highperformance')}</strong> {t('and')} <strong>{t('scalability')}</strong>. {t('whetheryouneed')}
            </span>
        },
        {
            title: 'Desktop',
            path: { platform: "desktop" },
            icon: '/desktop.png',
            description: <span>
                {t('our')} <strong>{t("customdesktopapplications")}</strong> {t('arebuilt')} <strong>{t('performance')}</strong> {t('and')} <strong>{t('userfriendliness')}</strong>.
            </span>
        },
        {
            title: 'Cross-platform',
            path: { platform: "cross-platform" },
            icon: '/cross-platform.png',
            description: <span>
                {t('wedev')} <strong>{t('crossplatformapps')}</strong> {t("thatwork")} <strong>{t('performance')}</strong> {t('acrossalldevices')}            </span>
        },
    ];
    const router = useRouter()
    return <>
        <OrderBuider technologies={technologies} categories={categories} services={services} />
        <div className="p-2">
            <Card>
                <Title level={3}>Solutions</Title>

                <List
                    grid={{ gutter: 8, column: 1, sm: 1, lg: 2, md: 1, xl: 2, xs: 1 }}
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={(item, index) => (
                        <div className="p-1 !h-full" key={index}>
                            <Card className="!w-full !h-full">
                                <div className="sm:grid gap-2">
                                    <div className="flex gap-2 items-center">
                                        <Image alt="" width={50} src={item.icon} preview={false} />
                                        <Title level={3} className="w-64">{item.title}</Title>
                                    </div>
                                    <div className="col-span-5">
                                        <p className="text-justify">
                                            {item.description}
                                        </p>
                                        <div className="mt-2">
                                            <Button type="primary" size="large" shape="round"
                                                onClick={() => {
                                                    router.push({ query: item.path })
                                                }}
                                            >{t('buildnow')}</Button>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                        </div>
                    )}
                />

            </Card>
        </div>
    </>
}

export default Page

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    const technologiesRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/technologies/all`);
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/services/all`);
    const services = await res.json();
    const technologies = await technologiesRes.json()
    const categoriesRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/categories`)
    const categories = await categoriesRes.json()
    return {
        props: {
            technologies,
            categories,
            services
        }
    };
}
