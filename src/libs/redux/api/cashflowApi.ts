// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './authApi';

// Create an API slice
export const cashflowApi = createApi({
    reducerPath: 'cashflowApi',
    tagTypes: ['Categories'],
    baseQuery,
    endpoints: (builder) => ({
        getCashflow: builder.query<PaginatedResponse<Cashflow>, BasicFilter>({
            query: (query) => ({ url: "/cashflows", params:query }), // Fetching  types (categories),
            providesTags: (result, error, arg) => {
                return ['Categories']
            }
        }),
        getNewestCashflow: builder.query<Cashflow[], void>({
            query: () => ({ url: "/cashflows/newest" }), // Fetching  types (categories),
            providesTags: (result, error, arg) => {
                return ['Categories']
            }
        }),
    }),
});

// Export hook
export const {
    useGetCashflowQuery,
    useGetNewestCashflowQuery
} = cashflowApi;
