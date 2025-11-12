import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { prepareHeaders } from "./Utils";

export const CartApi = createApi({
  reducerPath: "CartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: prepareHeaders,
  }),
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    GetCartProduct: builder.query({
      query: () => {
        return {
          url: "/cart",
        };
      },
      providesTags: ["Cart"],
    }),
    AddToCart: builder.mutation({
      query: (body) => {
        return {
          url: "/cart/add-cart",
          method: "post",
          body,
        };
      },
      invalidatesTags: ["Cart"],
    }),
    RemoveToCart: builder.mutation({
      query: (id) => {
        return {
          url: `/cart/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Cart"],
    }),
    CartQuantity: builder.mutation({
      query: (body) => {
        return {
          url: `/cart/${body?.id}`,
          method: "PATCH",
          body: {
            quantity: body?.quantity,
          },
        };
      },
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useAddToCartMutation,
  useGetCartProductQuery,
  useCartQuantityMutation,
  useRemoveToCartMutation,
} = CartApi;
