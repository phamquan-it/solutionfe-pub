import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './authApi';

// Define API slice
export const faqApi = createApi({
    reducerPath: 'faqApi',
    tagTypes: ['Faqs'],
    baseQuery,
    endpoints: (builder) => ({
        getFAQs: builder.query<PaginatedResponse<FAQ>, BasicFilter>({
            query: (params) => ({ url: '/faqs', params }),
            providesTags: (result) => result ? ['Faqs'] : [],
        }),
        createFAQ: builder.mutation<FAQ, Omit<FAQ, 'id'>>({
            query: (newFAQ) => ({
                url: '/faqs',
                method: 'POST',
                body: newFAQ,
            }),
            invalidatesTags: ['Faqs'],
        }),
        updateFAQ: builder.mutation<FAQ, Partial<FAQ> & { id: number }>({
            query: ({ id, ...updates }) => ({
                url: `/faqs/${id}`,
                method: 'PATCH',
                body: updates,
            }),
            invalidatesTags: ['Faqs'],
        }),
        deleteFAQ: builder.mutation<{ success: boolean }, number>({
            query: (id) => ({
                url: `/faqs/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Faqs'],
        }),
    }),
});

// Export hooks
export const {
    useGetFAQsQuery,
    useCreateFAQMutation,
    useUpdateFAQMutation,
    useDeleteFAQMutation,
} = faqApi;

