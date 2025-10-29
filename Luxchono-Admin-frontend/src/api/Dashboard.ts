import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { prepareHeaders } from "./Utils";

export const DashboardApi = createApi({
  reducerPath: "DashboardApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: prepareHeaders,
  }),
  tagTypes: ["Dashboard"],
  endpoints: (builder) => ({
    GetDashboard: builder.query({
      query: () => {
        return {
          url: "/admin/dashboard",
        };
      },
      providesTags: ["Dashboard"],
    }),
    BrandRevenue: builder.query({
      query: () => {
        return {
          url: "/admin/brand-revenue",
        };
      },
      providesTags: ["Dashboard"],
    }),
    OrderCount: builder.query({
      query: () => {
        return {
          url: "/admin/order-count",
        };
      },
      providesTags: ["Dashboard"],
    }),
    getRating: builder.query({
      query: () => {
        return {
          url: "/admin/get-rating",
        };
      },
      providesTags: ["Dashboard"],
    })

  }),
});

export const {
  useGetDashboardQuery,
  useBrandRevenueQuery,
  useOrderCountQuery,
  useGetRatingQuery
} = DashboardApi;
