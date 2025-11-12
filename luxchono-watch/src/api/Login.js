import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { prepareHeaders } from "./Utils";

export const LoginApi = createApi({
  reducerPath: "loginApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: prepareHeaders,
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "/login",
        method: "post",
        body,
      }),
    }),
    verifyEmail: builder.mutation({
      query: (body) => ({
        url: `/verify-email`,
        method: "post",
        body,
      }),
    }),
    verifyOtp: builder.mutation({
      query: (body) => ({
        url: `/verify-otp`,
        method: "post",
        body,
      }),
    }),
    Register: builder.mutation({
      query: (body) => ({
        url: `/register`,
        method: "post",
        body,
      }),
    }),
    ForgotPassword: builder.mutation({
      query: (body) => ({
        url: "/forgot-password",
        method: "post",
        body,
      }),
    }),
    ResetPassword: builder.mutation({
      query: ({ id, newPassword }) => ({
        url: `/reset-password?id=${id || "-"}`,
        method: "post",
        body: { newPassword },
      }),
    }),
    ChangePassword: builder.mutation({
      query: (body) => ({
        url: `/change-password`,
        method: "post",
        body,
      }),
    }),
    profile: builder.query({
      query: () => {
        return {
          url: `/profile`,
        };
      },
    }),
    EditProfile : builder.mutation({
      query: (body) => ({
        url: `/edit-profile`,
        method: "post",
        body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useVerifyEmailMutation,
  useVerifyOtpMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useProfileQuery,
  useEditProfileMutation
} = LoginApi;
