// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './authApi';

// Create an API slice
export const paymentApi = createApi({
    reducerPath: 'paymentApi',
    tagTypes: ['Payments'],
    baseQuery,
    endpoints: (builder) => ({
        getPayment: builder.query<PaginatedResponse<Payment>, BasicFilter>({
            query: (params) => ({
                url: '/payments',
                params
            }), // Fetching  types (payments),
            providesTags: (result, error, arg) => {
                return ['Payments']
            }
        }),
        createPayment: builder.mutation<Payment, number>({
            query: (amount) => ({
                url: '/payments',
                method: 'POST',
                body: { amount }
            }),
            invalidatesTags: ['Payments']
        }),
        updatePayment: builder.mutation<Payment, Payment>({
            query: (payment: Payment) => ({
                url: `/payments/${payment.id}`,
                method: 'PATCH',
                body: { status: payment.status }
            }),
            invalidatesTags: ['Payments']
        }),
        countPayments: builder.query<PaymentStats, void>({
            query: () => ({ url: '/payments/stats' }),
            providesTags: ['Payments']
        }),
    }),
});

// Export hook
export const {
    useCountPaymentsQuery,
    useGetPaymentQuery,
    useUpdatePaymentMutation,
    useCreatePaymentMutation
} = paymentApi;
