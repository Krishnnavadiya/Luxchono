import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prepareHeaders } from './Utils';


export const CategoryApi = createApi({
    reducerPath: 'CategoryApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BASE_URL,
        prepareHeaders: prepareHeaders,
       
    }),
    tagTypes: ['Category'],
    endpoints: (builder) => ({
        GetAllCategory: builder.query({
            query: (params) => {
                return {
                    url: '/admin/category',
                    params
                };
            },
            providesTags: ['Category'],
        }),
       
    }),
});

export const { useGetAllCategoryQuery } = CategoryApi;