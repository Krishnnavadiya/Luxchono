import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prepareHeaders } from './Utils';

export const AddressApi = createApi({
    reducerPath: 'AddressApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BASE_URL,
        prepareHeaders: prepareHeaders,
    }),
    tagTypes: ['Address'],
    endpoints: (builder) => ({
        GetAddress: builder.query({
            query: () => {
                return {
                    url: '/address',
                };
            },
            providesTags: ['Address'],
        }),
        AddAddress: builder.mutation({
            query: (body) => {
                return {
                    url: "/address",
                    method: "post",
                    body,
                }
            },
            invalidatesTags: ['Address'],
        }),
        DeleteAddress: builder.mutation({
            query: (id) => {
                return {
                    url: `/address/${id}`,
                    method: "DELETE"
                }
            },
            invalidatesTags: ['Address'],
        }),
        EditAddress: builder.mutation({
            query: (body) => {
                const { id, ...rest } = body
                return {
                    url: `/address/${id}`,
                    method: "PUT",
                    body: rest
                }
            },
            invalidatesTags: ['Address'],
        }),

        GetSingleAddress: builder.query({
            query: (id) => {
                return {
                    url: `/address/${id}`,
                };
            },
            providesTags: ['Address'],
        }),
    }),
});

export const { useAddAddressMutation, useGetAddressQuery, useDeleteAddressMutation, useEditAddressMutation, useGetSingleAddressQuery } = AddressApi;