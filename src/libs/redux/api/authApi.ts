// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const baseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
        // Get the token from the Redux state
        // Retrieve the token from localStorage
        const token = localStorage.getItem('token');
        if (token) {
            // If a token exists, set it in the Authorization header
            headers.set('Content-Type', 'application/json');
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});
// Create an API slice
export const authApi = createApi({
    reducerPath: 'authApi',
    tagTypes: ['Auth'],
    baseQuery,
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginType>({
            query: (body) => ({
                url: '/login',
                method: 'POST',
                body
            }),
        }),
        register: builder.mutation<{ message: string, token: string }, RegisterUser>({
            query: (body: Category) => ({
                url: '/register',
                method: 'POST',
                body
            }),
        }),
        forgot: builder.mutation<Category, Omit<Category, 'id'>>({
            query: (body: Category) => ({
                url: '/forgot',
                method: 'POST',
                body
            }),
        }),
        logout: builder.mutation<{ message: string }, void>({
            query: (body) => ({
                url: '/logout',
                method: 'POST',
            }),
        }),
        changePassword: builder.mutation<
            { message: string },
            { current_password: string; new_password: string; new_password_confirmation: string }
        >({
            query: (body) => ({
                url: '/change-password',
                method: 'POST',
                body
            }),
        }),

        updateProfile: builder.mutation<UserProfile, UserProfile>({
            query: (userData) => ({
                url: '/user/update',
                method: 'PUT',
                body: userData,
            }),
        }),

    }),
});

// Export hook
export const {
    useChangePasswordMutation,
    useLoginMutation,
    useRegisterMutation,
    useForgotMutation,
    useLogoutMutation
} = authApi;
