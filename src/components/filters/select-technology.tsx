import { syncObjectToUrl } from '@/common';
import { useGetAllTechnologyQuery } from '@/libs/redux/api/technologyApi';
import { Select } from 'antd';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import React from 'react';

const SelectTechnology = () => {
    const { data, isFetching, isSuccess } = useGetAllTechnologyQuery()
    const router = useRouter()
    const t = useTranslations("PlaceHoder")
    return <>
        <Select
            options={data?.map((value) => ({ value: value.id+'', label: value.name }))}
            className="w-full sm:w-48"
            allowClear
            placeholder={t('selecttechnology')}
            onChange={(e) => {
                syncObjectToUrl(router, { technology_id: e })
            }}
            defaultValue={router.query?.technology_id??null}
        />
    </>
}
export default SelectTechnology

