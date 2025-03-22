import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './authApi';

export const bankApi = createApi({
    reducerPath: 'bankApi',
    tagTypes: ['Banks'],
    baseQuery,
    endpoints: (builder) => ({
        getBanks: builder.query<any, void>({
            query: () => '/banks',
            providesTags: ['Banks']
        }),
        getExchangeRate: builder.query<{USD_to_VND: number}, void>({
            query: () => '/exchange-rate',
        }),
    }),
});

export const { useGetBanksQuery, useGetExchangeRateQuery } = bankApi;

