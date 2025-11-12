import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prepareHeaders } from './Utils';
import queryString from 'query-string';

export const ProductApi = createApi({
    reducerPath: 'ProductApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BASE_URL,
        prepareHeaders: prepareHeaders,
        paramsSerializer: function (params) {
            return queryString.stringify(params, { arrayFormat: 'index' });
        },
    }),
    tagTypes: ['Product'],
    endpoints: (builder) => ({
        GetProduct: builder.query({
            query: (params) => {
                return {
                    url: '/product',
                    params
                };
            },
            providesTags: ['Product'],
        }),
        LikeProduct: builder.mutation({
            query: (body) => {
                return {
                    url: "/wishlist/add-remove-wishlist",
                    method: "post",
                    body,
                }
            },
            invalidatesTags: ['Like'],
        }),
        GetLikeProduct: builder.query({
            query: () => {
                return {
                    url: '/wishlist/wishlist-id',
                };
            },
            providesTags: ['Like'],
        }),
        GetWishlistProduct: builder.query({
            query: () => {
                return {
                    url: '/wishlist',
                };
            },
            providesTags: ['Like'],
        }),
        GetSingleProduct: builder.query({
            query: (id) => {
                return {
                    url: `/product/${id}`,
                   
                };
            },
            providesTags: ['Product'],
        }),
    }),
});

export const { useGetProductQuery, useLikeProductMutation, useGetLikeProductQuery, useGetWishlistProductQuery,useGetSingleProductQuery } = ProductApi;