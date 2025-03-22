// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './authApi';

// Create an API slice
export const logApi = createApi({
    reducerPath: 'logApi',
    tagTypes: ['Logs'],
    baseQuery,
    endpoints: (builder) => ({
        getLog: builder.query<PaginatedResponse<Log>, BasicFilter>({
            query: (params) =>({url: '/logs', params}), // Fetching  types (categories),
            providesTags: (result, error, arg) => {
                return ['Logs']
            }
        }),
       
    }),
});

// Export hook
export const { 
    useGetLogQuery,
} = logApi;
