import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { CryptoNewsResponse } from "../types/crypto";

const createRequest = (url: string) => ({ url });

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/news/" }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query<
      CryptoNewsResponse,
      { newsCategory: string; count: number }
    >({
      query: ({ newsCategory, count }) =>
        createRequest(
          `news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`
        ),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
