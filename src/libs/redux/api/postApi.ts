// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './authApi';

// Create an API slice
export const postApi = createApi({
    reducerPath: 'postApi',
    tagTypes: ['Posts'],
    baseQuery,
    endpoints: (builder) => ({
        getPosts: builder.query<PaginatedResponse<Post>, BasicFilter>({
            query: (query) => ({ url: '/posts', params: query }), // Fetching posts
            providesTags: ['Posts']
        }),
        getAllPosts: builder.query<Post[], void>({
            query: () => ({ url: '/posts/all' }), // Fetching all posts
            providesTags: ['Posts']
        }),
        getCommentByPostId: builder.query<{
            total_comments: number,
            data:PaginatedResponse<Comment>
        }, { post_id: number }>({
            query: (query) => ({ url: '/comments', params: query }), // Fetching posts
            providesTags: ['Posts']
        }),
        createPost: builder.mutation<Post, Omit<Post, 'id'>>({
            query: (body: Post) => ({
                url: '/posts',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Posts']
        }),
        ratePost: builder.mutation<{ message: string, rate: Rate }, RateRequest>({
            query: (body) => ({
                url: '/rate',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Posts']
        }),
        commentPost: builder.mutation<Post, Comment>({
            query: (body) => ({
                url: '/posts',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Posts']
        }),

        updatePost: builder.mutation<Post, Post>({
            query: (post: Post) => ({
                url: `/posts/${post.id}`,
                method: 'PATCH',
                body: {
                    title: post.title,
                    title_vi: post.title_vi,
                    description: post.description,
                    description_vi: post.description_vi
                }
            }),
            invalidatesTags: ['Posts']
        }),
        deletePost: builder.mutation<Post, number>({
            query: (id) => ({
                url: `/posts/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Posts']
        }),
    }),
});

// Export hooks
export const {
    useGetAllPostsQuery,
    useDeletePostMutation,
    useGetPostsQuery,
    useUpdatePostMutation,
    useCreatePostMutation,
    useRatePostMutation,
    useCommentPostMutation,
    useGetCommentByPostIdQuery
} = postApi;

