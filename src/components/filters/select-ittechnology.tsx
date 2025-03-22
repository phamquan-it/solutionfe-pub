import { syncObjectToUrl } from '@/common';
import { useGetAllITCategoryQuery } from '@/libs/redux/api/it_categoryApi';
import { Select } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';

const SelectITCategory = () => {
    const { data, isFetching, isSuccess } = useGetAllITCategoryQuery()
    const router = useRouter()
    return <>
        <Select
            options={data?.map((value) => ({ value: value.id+'', label: value.name }))}
            className="w-48"
            allowClear
            placeholder="Select itcategory"
            onChange={(e) => {
                syncObjectToUrl(router, { itcategory_id: e })
            }}
            defaultValue={router.query?.itcategory_id??null}
        />
    </>
}
export default SelectITCategory

