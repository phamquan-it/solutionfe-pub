// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './authApi';

// Create an API slice
export const refundApi = createApi({
    reducerPath: 'refundApi',
    tagTypes: ['Refund'],
    baseQuery,
    endpoints: (builder) => ({
        getRefund: builder.query<PaginatedResponse<Refund>, BasicFilter>({
            query: (query) => ({
                url: '/refunds',
                params: query
            }), // Fetching  types (categories),
            providesTags: (result, error, arg) => {
                return ['Refund']
            }
        }),
        updateRefund: builder.mutation<Refund, Refund>({
            query: (body: Refund) => ({
                url: '/refunds',
                method: 'PATCH',
                body
            }),
            invalidatesTags: ['Refund']
        }),
    }),
});

// Export hook
export const {
    useGetRefundQuery,
    useUpdateRefundMutation,
} = refundApi;
