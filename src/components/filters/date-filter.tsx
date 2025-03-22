import { syncObjectToUrl } from '@/common';
import { DatePicker } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';

const { RangePicker } = DatePicker;

const DateFilter: React.FC = () => {
    const router = useRouter();

    // Function to parse and validate date values
    const getValidDateRange = (): [Dayjs, Dayjs] | null => {
        const start_date = router.query?.start_date as string | undefined;
        const end_date = router.query?.end_date as string | undefined;

        // Validate if both dates exist and are valid
        if (start_date && end_date && dayjs(start_date, 'YYYY/MM/DD', true).isValid() && dayjs(end_date, 'YYYY/MM/DD', true).isValid()) {
            return [dayjs(start_date, 'YYYY/MM/DD'), dayjs(end_date, 'YYYY/MM/DD')];
        }
        return null;
    };

    // Set initial state
    const [dateRange, setDateRange] = useState<[Dayjs, Dayjs] | null>(getValidDateRange);

    // Update state when URL query changes
    useEffect(() => {
        setDateRange(getValidDateRange());
    }, [router.query?.start_date, router.query?.end_date]);

    const handleDateChange = (dates: [Dayjs | null, Dayjs | null] | null) => {
        if (dates && dates[0] && dates[1]) {
            setDateRange(dates as [Dayjs, Dayjs]); // Update state
            syncObjectToUrl(router, { 
                start_date: dates[0].format('YYYY/MM/DD'), 
                end_date: dates[1].format('YYYY/MM/DD') 
            });
        } else {
            setDateRange(null);
            syncObjectToUrl(router, { start_date: '', end_date: '' });
        }
    };

    return (
        <RangePicker 
            value={dateRange} 
            onChange={handleDateChange} 
            placeholder={['Start Date', 'End Date']}
        />
    );
};

export default DateFilter;

