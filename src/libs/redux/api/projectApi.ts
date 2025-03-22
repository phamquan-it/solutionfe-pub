// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './authApi';

// Create an API slice
export const projectApi = createApi({
    reducerPath: 'projectApi',
    tagTypes: ['Projects'],
    baseQuery,
    endpoints: (builder) => ({
        getProjectStatistic: builder.query<ProjectStatisticRevenueType, void>({
            query: () => '/projects/statistics', // Your endpoint to fetch statistics
            providesTags: ['Projects'],
        }),

        getProjectStatisic: builder.query<ProjectStatisticType, void>({
            query: () => '/projects/count', // Fetching  types (categories),
            providesTags: (result, error, arg) => {
                return ['Projects']
            }
        }),

        updateProjectStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `/projects/${id}/status`,
                method: 'PATCH',
                body: { status },
            }),
            invalidatesTags: ['Projects'],
        }),

        getProjects: builder.query<PaginatedResponse<Project>, BasicFilter>({
            query: (params) => ({
                url: '/projects', params
            }), // Fetching  types (categories),
            providesTags: (result, error, arg) => {
                return ['Projects']
            }
        }),
        verifyTransactions: builder.mutation<{ message: string; transactions: any[] }, { project_id: number }>({
            query: (body) => ({
                url: '/transactions/verify',
                method: 'POST',
                body,
            }),
        }),

        createProject: builder.mutation<{
            message: string,
            data: Project
        }, CreateProject>({
            query: (body: CreateProject) => ({
                url: '/projects',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Projects']
        }),
        updateProject: builder.mutation<Project, { id: number; body: Partial<Project> }>({
            query: ({ id, body }) => ({
                url: `/projects/${id}`,  // Gửi yêu cầu cập nhật theo ID
                method: 'PATCH',
                body
            }),
            invalidatesTags: ['Projects'], // Cập nhật cache sau khi sửa
        }),
        deleteProject: builder.mutation<Project, number>({
            query: (body) => ({
                url: '/projects',
                method: 'DELETE',
            }),
            invalidatesTags: ['Projects']
        }),
        createTransaction: builder.mutation<Transaction, CreateTransactionPayload>({
            query: (transactionData) => ({
                url: '/transactions',
                method: 'POST',
                body: transactionData,
            }),
            invalidatesTags: ['Projects']
        }),
        checkConfirmProject: builder.mutation<{ confirmed: boolean }, { id: number }>({
            query: (data) => ({
                url: '/projects/confirm',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Projects']
        }),

    }),
});

// Export hook
export const {
    useVerifyTransactionsMutation,
    useCreateTransactionMutation,
    useUpdateProjectStatusMutation,
    useGetProjectStatisicQuery,
    useDeleteProjectMutation,
    useGetProjectsQuery,
    useUpdateProjectMutation,
    useCreateProjectMutation,
    useGetProjectStatisticQuery,
    useCheckConfirmProjectMutation
} = projectApi;
