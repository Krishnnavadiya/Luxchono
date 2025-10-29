import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { prepareHeaders } from "./Utils";

export const LoginApi = createApi({
    reducerPath: 'loginApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BASE_URL,
        prepareHeaders: prepareHeaders,
    }),
    endpoints: (builder: any) => ({
        login: builder.mutation({
            query: (body: any) => ({
                url: '/admin/login',
                method: 'post',
                body,
            }),
        }),
        register: builder.mutation({
            query: (body: any) => ({
                url: '/admin/register',
                method: 'post',
                body,
            }),
        }),
        verifyEmail: builder.query({
            query: (id: any) => ({
                url: `/admin/verify-email?id=${id}`,
                method: 'get',
            }),
        }),
        ForgotPassword: builder.mutation({
            query: (body: any) => ({
                url: '/forgot-password',
                method: 'post',
                body,
            }),
        }),
        ResetPassword: builder.mutation({
            query: ({ id, newPassword }: any) => ({
                url: `/reset-password?id=${id || "-"}`,
                method: 'post',
                body: { newPassword },
            }),
        }),
        ChangePassword: builder.mutation({
            query: (body: any) => ({
                url: '/change-password',
                method: 'post',
                body,
            }),
        }),
        GetAllAdmin: builder.query({
            query: () => {
                return {
                    url: "/admin/get-all-admin",
                };
            },
        }),
        AdminVerified: builder.mutation({
            query: (id:any) => ({
                url: `/admin/admin-verified/${id}`,
                method: 'PATCH',
                body: {
                    isVerified: true
                }
            }),
        }),
        Profile: builder.query({
            query: () => {
                return {
                    url: '/profile',
                };
            },
        }),
    }),


});

export const { useLoginMutation, useRegisterMutation, useVerifyEmailQuery, useForgotPasswordMutation, useResetPasswordMutation, useChangePasswordMutation, useGetAllAdminQuery,useAdminVerifiedMutation,useProfileQuery } = LoginApi;





