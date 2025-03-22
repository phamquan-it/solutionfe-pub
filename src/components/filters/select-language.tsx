import { syncObjectToUrl } from '@/common';
import { useGetLanguageQuery } from '@/libs/redux/api/languageApi';
import { Select } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';

const SelectLanguage = () => {
    const { data, isFetching, isSuccess } = useGetLanguageQuery({})
    const router = useRouter()
    return <>
        <Select
            options={data?.map((value) => ({
                value: value.id + '',
                label: value.name
            }))}
            className="w-48"
            allowClear
            placeholder="Select language"
            onChange={(e) => {
                syncObjectToUrl(router, { language_id: e })
            }}
            defaultValue={router.query?.language_id ?? null}
        />
    </>
}
export default SelectLanguage

