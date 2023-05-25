import { apiSlice } from "../../app/services/apiSlice";
import { setCredentials, logOut } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: "/auth/login",
                method: "POST",
                body: {...credentials}
            }),
        }),

        register: builder.mutation({
            query: credentials => ({
                url: "/auth/register",
                method: "POST",
                body: {...credentials}
            })
        }),

        sendLogout: builder.mutation({
            query: () => ({
                url: "/auth/logout",
                method: "GET"
            }),
        }),

        refresh: builder.mutation({
            query: () => ({
                url: "/auth/refresh",
                method: "GET"
            }),
        }),
    })
});

export const { useLoginMutation, useRegisterMutation, useSendLogoutMutation, useRefreshMutation } = authApiSlice;