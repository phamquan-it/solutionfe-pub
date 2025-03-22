// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './authApi';

// Create an API slice
export const userApi = createApi({
    reducerPath: 'userApi',
    tagTypes: ['Users'],
    baseQuery,
    endpoints: (builder) => ({
        getListUser: builder.query<PaginatedResponse<User>, BasicFilter>({
            query: (query) => ({ url: '/users', params: query }), // Fetching  types (categories),
            providesTags: (result, error, arg) => {
                return ['Users']
            }
        }),
        getTotalFundsAndRemains: builder.query<TotalFundsRemains, void>({
            query: () => ({
                url: '/users/total-funds-remains',
            }),
            providesTags: ['Users'],
        }),
        getAllUser: builder.query<User[], BasicFilter | void>({
            query: () => ({ url: '/users/all' }), // Fetching  types (categories),
            providesTags: (result, error, arg) => {
                return ['Users']
            }
        }),
        getUserInfo: builder.query<User, BasicFilter>({
            query: () => {
                return ({ url: '/user' })
            }, // Fetching  types (categories),
            providesTags: (result, error, arg) => {
                return ['Users']
            }
        }),
        changePassword: builder.mutation<any, ChangePassword>({
            query: (changePassword) => {
                console.log(changePassword)
                return ({
                    url: `/users/${changePassword.user_id}/update-password`,
                    method: 'POST',
                    body: {
                        "new_password": changePassword.new_password,
                        "new_password_confirmation": changePassword.new_password_confirmation
                    }
                })
            },
            invalidatesTags: ['Users']
        }),
        updateProfile: builder.mutation<UserProfile, UserProfile>({
            query: (userData) => ({
                url: '/user/update',
                method: 'PATCH',
                body: userData,
            }),
        }),

    }),
});

// Export hook
export const {
    useUpdateProfileMutation,
    useGetAllUserQuery,
    useGetListUserQuery,
    useGetUserInfoQuery,
    useChangePasswordMutation,
    useGetTotalFundsAndRemainsQuery
} = userApi;
