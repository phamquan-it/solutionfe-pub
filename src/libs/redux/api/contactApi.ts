// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './authApi';

// Create an API slice
export const contactApi = createApi({
    reducerPath: 'contactApi',
    tagTypes: ['Contact'],
    baseQuery,
    endpoints: (builder) => ({
        getContact: builder.query<PaginatedResponse<Contact>, BasicFilter>({
            query: (query) => ({
                url: '/contacts',
                params: query
            }), // Fetching  types (categories),
            providesTags: (result, error, arg) => {
                return ['Contact']
            }
        }),
        createContact: builder.mutation<Contact, Omit<Contact, 'id'>>({
            query: (body: Contact) => ({
                url: '/contacts',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Contact']
        }),
        updateContact: builder.mutation<Contact, Contact>({
            query: (contact) => ({
                url: `/contacts/${contact.id}`,
                method: 'PATCH',
                body: contact
            }),
            invalidatesTags: ['Contact']
        }),
        deleteContact: builder.mutation<Contact, number>({
            query: (contact_id) => ({
                url: `/contacts/${contact_id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Contact']
        }),
    }),
});

// Export hook
export const { 
    useDeleteContactMutation,
    useGetContactQuery,
    useUpdateContactMutation,
    useCreateContactMutation
} = contactApi;
