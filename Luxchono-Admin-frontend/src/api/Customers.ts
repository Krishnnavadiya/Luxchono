import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { prepareHeaders } from "./Utils";


export const CustomersApi = createApi({
    reducerPath: 'CustomersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BASE_URL,
        prepareHeaders: prepareHeaders,
    }),
    tagTypes: ["Customers"],
    endpoints: (builder) => ({
        GetAllCustomer: builder.query({
            query: (params) => {
                return {
                    url: '/admin/get-all-user',
                    params
                }
            },
            providesTags: ["Customers"],
        }),
    }),
});

export const { useGetAllCustomerQuery } = CustomersApi;