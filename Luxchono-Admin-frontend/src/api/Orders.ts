import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { prepareHeaders } from "./Utils";
import queryString from 'query-string';

export const OrdersApi = createApi({
    reducerPath: 'OrdersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BASE_URL,
        prepareHeaders: prepareHeaders,
        paramsSerializer: function (params: any) {
            return queryString.stringify(params, { arrayFormat: 'index' });
        },
    }),
    tagTypes: ["Orders"],
    endpoints: (builder) => ({
        GetAllOrders: builder.query({
            query: () => {
                return {
                    url: '/admin/order/',
                    method: "GET",
                };
            },
            providesTags: ["Orders"],
        }),

        UpdateOrderStatus: builder.mutation({
            query: (body) => {
                return {
                    url: `/admin/order/status-change`,
                    method: 'PATCH',
                    body
                };
            },
            invalidatesTags: ['Orders'],
        })

    }),
});

export const { useGetAllOrdersQuery,useUpdateOrderStatusMutation } = OrdersApi;