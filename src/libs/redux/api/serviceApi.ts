// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './authApi';

// Create an API slice
export const serviceApi = createApi({
    reducerPath: 'serviceApi',
    tagTypes: ['Services'],
    baseQuery,
    endpoints: (builder) => ({
        getServices: builder.query<PaginatedResponse<Service>, BasicFilter>({
            query: (params) => ({
                url: '/services',
                params
            }), // Fetching  types (categories),
            providesTags: (result, error, arg) => {
                return ['Services']
            }
        }),
        getAllServices: builder.query<Service[], void>({
            query: () => '/services/all', // Fetching  types (categories),
            providesTags: (result, error, arg) => {
                return ['Services']
            }
        }),
        createService: builder.mutation<Service, Service>({
            query: (service: Service) => ({
                url: '/services',
                method: 'POST',
                body: ({
                    "name": service.name+'',
                    "amount": Number(service.amount),
                    "price": Number(service.price),
                    "description": service.description+'',
                    "rate": Number(service.rate),
                    "image": service.image+''
                })
            }),
            invalidatesTags: ['Services']
        }),
        updateService: builder.mutation<Service, UpdateService>({
            query: (service) =>{
                console.log("ID",service.id)
                return  ({
                url: `services/${service.id}`,
                method: 'PUT',
                body: service
            })
            },
            invalidatesTags: ['Services']
        }),
        updateServiceTechnology: builder.mutation<Service, SyncServiceTechnology>({
            query: (synctechnology) => ({
                url: `/services/${synctechnology.service_id}`,
                method: 'PATCH',
                body: {
                    technologies: synctechnology.technology_ids
                }
            }),
            invalidatesTags: ['Services']
        }),

        deleteService: builder.mutation<Service, number>({
            query: (service_id) => ({
                url: `/services/${service_id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Services']
        }),
    }),
});

// Export hook
export const {
    useGetAllServicesQuery,
    useDeleteServiceMutation,
    useGetServicesQuery,
    useUpdateServiceTechnologyMutation,
    useUpdateServiceMutation,
    useCreateServiceMutation
} = serviceApi;
