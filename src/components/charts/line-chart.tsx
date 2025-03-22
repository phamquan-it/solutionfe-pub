'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useGetProjectStatisticQuery } from '@/libs/redux/api/projectApi'; // Adjust path
import { useTranslations } from 'next-intl';

// Ensure Chart is only imported on the client side
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const LineChart: React.FC = () => {
    const [isClient, setIsClient] = useState(false);
    const { data, isLoading, isError } = useGetProjectStatisticQuery();
    const t = useTranslations('statistics'); // Ensure the context is provided

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient || isLoading) {
        return <div>{('loading')}</div>;
    }

    if (isError) {
        return <div>{('error')}</div>;
    }

    // Prepare data for the chart
    const revenueByMonth = data?.revenueByMonth || {};
    
    const categories = Object.keys(revenueByMonth).map((month) => {
        const [year, monthNumber] = month.split('-');
        return `${monthNumber}-${year}`; // E.g., "03-2025"
    });

    const revenue = Object.values(revenueByMonth).map((rev) => parseFloat(rev));

    const series = [{ name: ('revenue'), data: revenue }];

    const options: ApexCharts.ApexOptions = {
        chart: { height: 350, type: 'line', zoom: { enabled: false } },
        dataLabels: { enabled: false },
        stroke: { curve: 'smooth' },
        title: { text: t('projectRevenue'), align: 'left' },
        grid: { row: { colors: ['#f3f3f3', 'transparent'], opacity: 0.5 } },
        xaxis: { categories },
    };

    return (
        <div>
            <Chart options={options} series={series} type="line" height={350} />
        </div>
    );
};

export default LineChart;

