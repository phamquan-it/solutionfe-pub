// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './authApi';

// Create an API slice
export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    tagTypes: ['Categories'],
    baseQuery,
    endpoints: (builder) => ({
        getCategories: builder.query<Category[], BasicFilter>({
            query: (params) => ({
                url: '/categories', params
            }), // Fetching  types (categories),
            providesTags: (result, error, arg) => {
                return ['Categories']
            }
        }),
        createCategory: builder.mutation<Category, Omit<Category, 'id'>>({
            query: (body: Category) => ({
                url: '/categories',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Categories']
        }),
        updateCategory: builder.mutation<Category, Category>({
            query: (category: Category) => ({
                url: `/categories/${category.id}`,
                method: 'PATCH',
                body: { name: category.name}
            }),
            invalidatesTags: ['Categories']
        }),
        deleteCategory: builder.mutation<Category, number>({
            query: (body) => {
                console.log(body)
                return ({
                    url: `/categories/${body}`,
                    method: 'DELETE',
                })
            },
            invalidatesTags: ['Categories']
        }),
    }),
});

// Export hook
export const {
    useDeleteCategoryMutation,
    useGetCategoriesQuery,
    useUpdateCategoryMutation,
    useCreateCategoryMutation
} = categoryApi;
