// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './authApi';

// Create an API slice
export const technologyApi = createApi({
    reducerPath: 'technologyApi',
    tagTypes: ['Technology'],
    baseQuery,
    endpoints: (builder) => ({
        getTechnology: builder.query<PaginatedResponse<Technology>, BasicFilter>({
            query: (query) => ({
                url: '/technologies',
                params: query
            }), // Fetching  types (categories),
            providesTags: (result, error, arg) => {
                return ['Technology']
            }
        }),
        getAllTechnology: builder.query<Technology[], void>({
            query: () => '/technologies/all', // Fetching  types (categories),
            providesTags: (result, error, arg) => {
                return ['Technology']
            }
        }),
        createTechnology: builder.mutation<Technology, Omit<Technology, 'id'>>({
            query: (body: Technology) => ({
                url: '/technologies',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Technology']
        }),
        updateTechnology: builder.mutation<Technology, Technology>({
            query: (technology: Technology) => ({
                url: `/technologies/${technology.id}`,
                method: 'PATCH',
                body: technology
            }),
            invalidatesTags: ['Technology']
        }),
        updateLanguagesTechnology: builder.mutation<Technology, {
            technology_id: number,
            language_ids: number[]
        }>({
            query: (query) => ({
                url: `/technologies/update-language/${query.technology_id}`,
                method: 'PATCH',
                body: { language_ids: query.language_ids }
            }),
            invalidatesTags: ['Technology']
        }),
        updateITTechnologiesTechnology: builder.mutation<Technology, {
            technology_id: number,
            ittechnology_ids: number[]
        }>({
            query: (query) => ({
                url: `/technologies/update-ittechnology/${query.technology_id}`,
                method: 'PATCH',
                body: { ittechnology_ids: query.ittechnology_ids }
            }),
            invalidatesTags: ['Technology']
        }),
        deleteTechnology: builder.mutation<Technology, number>({
            query: (technology_id) => ({
                url: `/technologies/${technology_id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Technology']
        }),
    }),
});

// Export hook
export const {
    useGetAllTechnologyQuery,
    useDeleteTechnologyMutation,
    useGetTechnologyQuery,
    useUpdateITTechnologiesTechnologyMutation,
    useUpdateLanguagesTechnologyMutation,
    useUpdateTechnologyMutation,
    useCreateTechnologyMutation
} = technologyApi;
