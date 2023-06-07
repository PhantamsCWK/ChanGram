import { apiSlice } from "../../app/services/apiSlice";

const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUser: builder.query({
            query: username => `/user/${username}`,
            transformResponse: responseData => {
                const user = responseData.user;
                return user
            },
            providesTags: (result, error, arg) => [
                { type: "User", id: arg }
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
                url: `/user/${username}/follow`,
                method: "PATCH"
            }),
            transformResponse: responseData => {
                const users = responseData.users;
                return users
            },
            invalidatesTags: (result, error, arg) => {
                if(result) {
                    return [
                        "User",
                        ...result.map(user => ({ type: "User", id: user.username }))
                    ]
                } else {
                    return ["User"]
                }
            }
        }),

        deleteUser: builder.mutation({
            query: username => ({
                url: `/user/${username}`,
                method: "DELETE"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "User", id: arg }
            ]
        })

    })
});

export const { useGetUserQuery, useGetFollowerUserQuery, useGetFollowingUserQuery, useAddRemoveFollowMutation, useDeleteUserMutation } = usersApiSlice