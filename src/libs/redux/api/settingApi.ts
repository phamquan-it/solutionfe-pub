// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './authApi';

// Create an API slice
export const settingApi = createApi({
    reducerPath: 'settingApi',
    tagTypes: ['Setting'],
    baseQuery,
    endpoints: (builder) => ({
        getSetting: builder.query<Setting, void>({
            query: () => '/settings', // Fetching  types (categories),
            providesTags: (result, error, arg) => {
                return ['Setting']
            }
        }),
        updateSetting: builder.mutation<Setting,Setting>({
            query: (body: Setting) => ({
                url: '/settings',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Setting']
        }),
    }),
});

// Export hook
export const {
    useGetSettingQuery,
    useUpdateSettingMutation,
} = settingApi;
