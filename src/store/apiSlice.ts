import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const Api = createApi({
  reducerPath: "Api",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),

  endpoints: (builder) => ({
    popularCrypto: builder.query<any, any>({
      query: ({ page, filter }) =>
        `/crypto/popular?start=${
          page === 1 ? page : (page - 1) * 10 + 1
        }&limit=${10}&sort=${filter}`,
    }),
    latestCrypto: builder.query<any, any>({
      query: (limit) => `/crypto/latest?limit=${limit ? limit : 20}`,
    }),
    allCrypto: builder.query<any, any>({
      query: () => `/crypto/all`,
    }),
  }),
});

export const {
  usePopularCryptoQuery,
  useLatestCryptoQuery,
  useAllCryptoQuery,
} = Api;
