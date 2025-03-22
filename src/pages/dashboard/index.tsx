import LineChart from '@/components/charts/line-chart';
import CashflowOverview from '@/components/dashboad/overview/cashflow-overview';
import { useGetProjectStatisicQuery } from '@/libs/redux/api/projectApi';
import { useGetTotalFundsAndRemainsQuery } from '@/libs/redux/api/userApi';
import { RootState } from '@/libs/redux/store';
import { isUser } from '@/utils/authUtils';
import { BellOutlined, CheckOutlined, ClockCircleOutlined, CloseCircleFilled, CloseCircleOutlined, CloseOutlined, FireOutlined, LikeOutlined, LoadingOutlined } from '@ant-design/icons';
import { Card, List, Statistic, Table } from 'antd';
import { GetStaticPropsContext } from 'next';
import { useTranslations } from 'next-intl';
import React from 'react';
import { useSelector } from 'react-redux';

const Page = () => {
    const query = useGetProjectStatisicQuery()
    const user = useSelector((state: RootState) => state.user);
    const { data, isLoading, isError } = useGetTotalFundsAndRemainsQuery();
    const t = useTranslations("statistics")
    return <>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2">
            <Card>
                <Statistic title={t('solutions')} value={query?.data?.initalize} prefix={<FireOutlined />} />
            </Card>
            <Card>
                <Statistic title={t('funds')} value={isUser(user.role) ? user.fund + '' : data?.total_fund} prefix={"$"} />
            </Card>
            <Card>
                <Statistic title={t('remains')} value={isUser(user.role) ? user.remains + '' : data?.total_remains} prefix={<LikeOutlined />} />
            </Card>
            <Card>
                <Statistic title={t("notifications")} value={0} prefix={<BellOutlined />} />
            </Card>
        </div>
        <div className={
            isUser(user.role) ? "mt-2" :
                "md:grid grid-cols-10 gap-2 mt-2"
        }>

            <Card className={isUser(user.role) ? "" : "md:col-span-10 lg:col-span-7"
            }>
                <LineChart />
            </Card>
            {!isUser(user.role) ?

                <Card className="md:col-span-10 lg:col-span-3 mt-2 md:mt-0" title="Cashflows"
                    styles={{
                        header: {
                            minHeight: 50,
                            fontSize: 14
                        },
                        body: { padding: 5, paddingLeft: 10 }
                    }}
                >
                    <CashflowOverview />
                </Card>
                :
                <>
                </>
            }

        </div>
    </>
}

export default Page
