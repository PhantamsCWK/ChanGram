import { apiSlice } from "../../app/services/apiSlice";

const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUser: builder.query({
            query: username => `/user/${username}`,
            transformResponse: responseData => {
                const user = responseData.user;
                user.id = user._id
                delete user._id
                return user
            },
            providesTags: (result, error, arg) => [
                { type: "Post", id: arg }
            ]
        }),

        getFollowingUser: builder.query({
            query: username => `/user/${username}/following`,
            transformResponse: responseData => responseData.following
        }),


        getFollowerUser: builder.query({
            query: username => `/user/${username}/follower`,
            transformResponse: responseData => responseData.follower
        }),

        addRemoveFollow: builder.mutation({
            query: username => ({
                url: `/user/${username}`,
                method: "PATCH"
            })

        }),

        deleteUser: builder.mutation({
            query: username => ({
                url: `/user/${username}`,
                method: "DELETE"
            })
        })

    })
});

export const { useGetUserQuery, useGetFollowerUserQuery, useGetFollowingUserQuery, useAddRemoveFollowMutation, useDeleteUserMutation } = usersApiSlice