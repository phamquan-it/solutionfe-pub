import { removeEmptyProperties, syncObjectToUrl } from '@/common';
import { useQueryParams } from '@/pages/dashboard/cashflow';
import { Input } from 'antd';
import { debounce } from 'lodash';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import React from 'react';

const SearchFilter = () => {
    const searchParams = useQueryParams()
    const router = useRouter();

    const searchKeyword = debounce((e) => {
        syncObjectToUrl(router, {keyword: e.target.value??''})
    }, 300);
    const t =useTranslations("PlaceHoder")
    return <>
        <Input
            type="search"
            className={router.pathname=="/template"?"w-full":"w-full sm:w-48 "}
            onChange={searchKeyword}
            defaultValue={searchParams?.keyword ?? ''}
            placeholder={t('search')}
        />
    </>
}

export default SearchFilter
