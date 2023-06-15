import { apiSlice } from "../../app/services/apiSlice"

const postsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllPost: builder.query({
            query: () => ({
                url: "/posts",
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            transformResponse: responseData => {
                const newPosts = responseData.posts.map(post => {
                    post.id = post._id
                    delete post._id
                    return post
                });
                return newPosts
            },
            providesTags: (result, error, arg ) => {
                if (result) {
                    return [
                        { type: 'Post', id: 'LIST' },
                        ...result.map(post => ({ type: 'Post', id: post.id }))
                    ]
                } else {
                    return [{ type: 'Post', id: 'LIST' }]
                }
            }
        }),

        getPost: builder.query({
            query: postId => ({
                url: `/posts/${postId}`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            transformResponse: responseData => {
                const newPost = responseData.post
                newPost.id = newPost._id
                delete newPost._id
                return newPost
            },
            providesTags: (result, error, arg ) => [
                { type: "Post", id: arg }
            ]
            
        }),

        getUserPosts: builder.query({
            query: username => ({
                url: `/posts/${username}/user`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                }
            }),
            transformResponse: (responseData) => {
                const newPosts = responseData.posts.map(post => {
                    post.id = post._id;
                    delete post._id;
                    return post;
                });
                return newPosts;
            },
            providesTags: (result, error, arg) => {
                if (result) {
                    return [
                        { type: 'Post', id: 'LIST' },
                        ...result.map(post => ({ type: 'Post', id: post.id }))
                    ]
                } else {
                    return [{ type: 'Post', id: 'LIST' }]
                }
            }

        }),

        createPost: builder.mutation({
            query: formData => ({
                url: "/posts",
                method: "POST",
                body: formData
            }),
            transformResponse: responseData => responseData.post,
            invalidatesTags: (result) => {
                if (result) {
                    return [
                        { type: "Post", id: "LIST" },
                        { type: "User", id: result.username }
                    ]
                } else {
                    return [
                        { type: "Post", id: "LIST" },
                    ]
                }
            }
        }),

        deletePost: builder.mutation({
            query: postId => ({
                url: `/posts/${postId}`,
                method: "DELETE",
            }),
            invalidatesTags: () => [{ type: "Post", id: "LIST" }]
        }),

        likeAndDislike: builder.mutation({
            query: postId => ({
                url: `/posts/${postId}/like`,
                method: "PATCH"
            }),
            transformResponse: responseData => {
                const post = responseData.post
                post.id = post._id
                delete post._id
                return post
            },
            invalidatesTags: (result, error, arg) => {
                if (result) {
                    return [
                        'Post',
                        { type: 'Post', id: arg }
                    ]
                } else {
                    return ['Post']
                }
            }
        }),
    })
})


export const { useGetAllPostQuery, useGetPostQuery, useLazyGetPostQuery , useGetUserPostsQuery, useCreatePostMutation, useDeletePostMutation, useLikeAndDislikeMutation } = postsApiSlice

// export const selectPostResult = postsApiSlice.endpoints.getAllPost.select();