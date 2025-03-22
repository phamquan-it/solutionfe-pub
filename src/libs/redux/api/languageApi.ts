// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './authApi';

// Create an API slice
export const languageApi = createApi({
    reducerPath: 'languageApi',
    tagTypes: ['Languages'],
    baseQuery,
    endpoints: (builder) => ({
        getLanguage: builder.query<Language[], BasicFilter>({
            query: (params) => ({
                url: '/languages', params
            }), // Fetching  types (languages),
            providesTags: (result, error, arg) => {
                return ['Languages']
            }
        }),
        createLanguage: builder.mutation<Language, Omit<Language, 'id'>>({
            query: (body: Language) => ({
                url: '/languages',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Languages']
        }),
        updateLanguage: builder.mutation<Language, Language>({
            query: (language: Language) => ({
                url: `/languages/${language.id}`,
                method: 'PATCH',
                body: language 
            }),
            invalidatesTags: ['Languages']
        }),
        deleteLanguage: builder.mutation<Language, number>({
            query: (body) => {
                return ({
                    url: `/languages/${body}`,
                    method: 'DELETE',
                })
            },
            invalidatesTags: ['Languages']
        }),
    }),
});

// Export hook
export const {
    useDeleteLanguageMutation,
    useGetLanguageQuery,
    useUpdateLanguageMutation,
    useCreateLanguageMutation
} = languageApi;
