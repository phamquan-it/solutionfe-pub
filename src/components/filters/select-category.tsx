import { syncObjectToUrl } from '@/common';
import { useGetCategoriesQuery } from '@/libs/redux/api/categoryApi';
import { Select } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';

const SelectCategory = () => {
    const { data, isFetching, isSuccess } = useGetCategoriesQuery({})
    const router = useRouter()
    return <>
        <Select
            options={data?.map((value) => ({ value: value.id+'', label: value.name }))}
            className="w-48"
            allowClear
            placeholder="Select category"
            onChange={(e) => {
                syncObjectToUrl(router, { category_id: e })
            }}
            defaultValue={router.query?.category_id??null}
        />
    </>
}
export default SelectCategory

