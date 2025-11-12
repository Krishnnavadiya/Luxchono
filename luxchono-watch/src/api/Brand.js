import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prepareHeaders } from './Utils';

export const BrandApi = createApi({
    reducerPath: 'BrandApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BASE_URL,
        prepareHeaders: prepareHeaders,

    }),
    tagTypes: ['Brand'],
    endpoints: (builder) => ({
        GetAllBrandApi: builder.query({
            query: () => {
                return {
                    url: '/admin/brand',
                };
            },
            providesTags: ['Brand'],
        }),


    }),
});

export const { useGetAllBrandApiQuery } = BrandApi;