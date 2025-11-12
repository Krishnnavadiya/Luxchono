import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prepareHeaders } from './Utils';


export const OrderApi = createApi({
    reducerPath: 'OrderApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BASE_URL,
        prepareHeaders: prepareHeaders,
    }),
    tagTypes: ['Order'],
    endpoints: (builder) => ({
        MakeOrder: builder.mutation({
            query: (body) => {
                return {
                    url: "/order/make-order",
                    method: "post",
                    body,
                }
            },
            invalidatesTags: ['Order'],
        }),
        PaymentOrder: builder.mutation({
            query: (body) => {
                return {
                    url: "/order/payment-order",
                    method: "post",
                    body,
                }
            },
            invalidatesTags: ['Order'],
        }),
        GetOrder: builder.query({
            query: (orderId) => {
                return {
                    url: `/order/get-order?orderId=${orderId}`,
                };
            },
            providesTags: ['Order'],
        }),
        GetAllOrder :builder.query({
            query: (orderId) => {
                return {
                    url: `/order/get-user-order`,
                };
            },
            providesTags: ['Order'],
        }),
        CancelOrder :builder.query({
            query: (orderId) => {
                return {
                    url: `/order/cancel-order`,
                };
            },
            providesTags: ['Order'],
        }),
        CancelOrder: builder.mutation({
            query: (body) => {
                return {
                    url: `/order/cancel-order`,
                    method: "post",
                    body,
                }
            },
            invalidatesTags: ['Order'],
        }),

    }),
});

export const { useMakeOrderMutation, usePaymentOrderMutation, useGetOrderQuery ,useGetAllOrderQuery,useCancelOrderMutation } = OrderApi;