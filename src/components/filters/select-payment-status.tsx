import { syncObjectToUrl } from '@/common';
import { useQueryParams } from '@/pages/dashboard/cashflow';
import { Select } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';

const SelectPaymentStatus = () => {
    const router = useRouter();
    return <>
        <Select className="w-48" options={[
            { value: 'PENDDING', label: <span>Pendding</span> },
            { value: 'COMPLETED', label: <span>Completed</span> },
            { value: 'CANCELED', label: <span>Canceled</span> },
        ]}
            onChange={(e) => {
                syncObjectToUrl(router, { payment_status: e })
            }}
            defaultValue={useQueryParams().payment_status}
        />
    </>
}

export default SelectPaymentStatus
