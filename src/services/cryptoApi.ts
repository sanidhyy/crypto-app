import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type {
  CryptoDetailsResponse,
  CryptoHistoryResponse,
  CryptosResponse,
} from "../types/crypto";

const createRequest = (url: string) => ({ url });

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/crypto/" }),
  endpoints: (builder) => ({
    getCryptos: builder.query<CryptosResponse, number>({
      query: (count) => createRequest(`coins?limit=${count}`),
    }),
    getCryptoDetails: builder.query<CryptoDetailsResponse, string>({
      query: (coinId) => createRequest(`coin/${coinId}`),
    }),
    getCryptoHistory: builder.query<
      CryptoHistoryResponse,
      { coinId: string; timePeriod: string }
    >({
      query: ({ coinId, timePeriod }) =>
        createRequest(`coin/${coinId}/history?timePeriod=${timePeriod}`),
    }),
  }),
});

export const {
  useGetCryptosQuery,
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} = cryptoApi;
