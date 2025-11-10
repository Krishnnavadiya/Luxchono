import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { prepareHeaders } from "./Utils";
import queryString from "query-string";
import { OfferFromDataApi } from "./FormData";

export const OfferApi = createApi({
  reducerPath: "OfferApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: prepareHeaders,
    paramsSerializer: function (params: any) {
      return queryString.stringify(params, { arrayFormat: "index" });
    },
  }),
  tagTypes: ["Offer"],
  endpoints: (builder) => ({
    GetAllOffer: builder.query({
      query: (params) => {
        return {
          url: "/admin/offer",
          params,
        };
      },
      providesTags: ["Offer"],
    }),
    AddOffer: builder.mutation({
      query: (body) => {
        const formData = OfferFromDataApi.createOffer(body);
        return {
          url: "/admin/offer",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Offer"],
    }),
    DeleteOffer: builder.mutation({
      query: (params) => ({
        url: `/admin/offer`,
        method: "DELETE",
        params,
      }),
      invalidatesTags: ["Offer"],
    }),
    EditOffer: builder.mutation({
      query: (body) => {
        const formData = OfferFromDataApi.createOffer(body);
        return {
          url: `/admin/offer/${body.id}`,
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: ["Offer"],
    }),
  }),
});

export const {
  useGetAllOfferQuery,
  useAddOfferMutation,
  useDeleteOfferMutation,
  useEditOfferMutation,
} = OfferApi;
