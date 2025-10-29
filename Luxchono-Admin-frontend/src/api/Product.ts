import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { prepareHeaders } from "./Utils";
import queryString from 'query-string';
import { productFromDatApi } from "./FormData";

export const ProductApi = createApi({
    reducerPath: 'ProductApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BASE_URL,
        prepareHeaders: prepareHeaders,
        paramsSerializer: function (params: any) {
            return queryString.stringify(params, { arrayFormat: 'index' });
        },
    }),
    tagTypes: ["Product"],
    endpoints: (builder) => ({
        GetAllProduct: builder.query({
            query: (params) => {
                return {
                    url: '/admin/product',
                    params
                }
            },
            providesTags: ["Product"],
        }),
        DeleteProduct: builder.mutation({
            query: (params) => ({
                url: `/admin/product`,
                method: 'DELETE',
                params
            }),
            invalidatesTags: ["Product"],
        }),
        AddProduct: builder.mutation({
            query: (body) => {
                const formData = productFromDatApi.createProduct(body);
                return {
                    url: "/admin/product",
                    method: "POST",
                    body: formData
                };
            },
            invalidatesTags: ["Product"],
        }),
        EditProduct: builder.mutation({
            query: (body) => {
                const formData = productFromDatApi.createProduct(body);
                return {
                    url: `/admin/product/${body?.id}`,
                    method: 'PUT',
                    body: formData,

                };
            },
            invalidatesTags: ["Product"],
        }),
    }),
});

export const { useGetAllProductQuery, useDeleteProductMutation, useAddProductMutation, useEditProductMutation } = ProductApi;