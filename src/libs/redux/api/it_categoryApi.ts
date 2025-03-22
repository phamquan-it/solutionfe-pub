// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './authApi';

// Create an API slice
export const it_categoryApi = createApi({
    reducerPath: 'it_categoryApi',
    tagTypes: ['ITCategories'],
    baseQuery,
    endpoints: (builder) => ({
        getITCategory: builder.query<PaginatedResponse<ITCategory>, BasicFilter>({
            query: (query) => ({ url: '/it-categories', params: query }), // Fetching  types (it-categories),
            providesTags: (result, error, arg) => {
                return ['ITCategories']
            }
        }),
        getAllITCategory: builder.query<ITCategory[], void>({
            query: () => ({ url: '/it-categories/all' }), // Fetching  types (it-categories),
            providesTags: (result, error, arg) => {
                return ['ITCategories']
            }
        }),
        createITCategory: builder.mutation<ITCategory, Omit<ITCategory, 'id'>>({
            query: (body: ITCategory) => ({
                url: '/it-categories',
                method: 'POST',
                body
            }),
            invalidatesTags: ['ITCategories']
        }),
        updateITCategory: builder.mutation<ITCategory, ITCategory>({
            query: (category: ITCategory) => ({
                url: `/it-categories/${category.id}`,
                method: 'PATCH',
                body: { name: category.name }
            }),
            invalidatesTags: ['ITCategories']
        }),
        deleteITCategory: builder.mutation<ITCategory, number>({
            query: (body) => {
                console.log(body)
                return ({
                    url: `/it-categories/${body}`,
                    method: 'DELETE',
                })
            },
            invalidatesTags: ['ITCategories']
        }),
    }),
});

// Export hook
export const {
    useGetAllITCategoryQuery,
    useDeleteITCategoryMutation,
    useGetITCategoryQuery,
    useUpdateITCategoryMutation,
    useCreateITCategoryMutation
} = it_categoryApi;
