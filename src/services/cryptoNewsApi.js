import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoNewsApiHeaders = {
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Key': '1dfeab7b7amsh07c7ca87ffb20efp15c295jsn836800360cfc',
    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
  };

const baseUrl = 'https://bing-news-search1.p.rapidapi.com';

const createRequest = ({ newsCategory, count }) => { 
    const queryString = `q=${encodeURIComponent(newsCategory)}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`;
    return { url: `/news/search?${queryString}`, headers: cryptoNewsApiHeaders }
};

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: (options) => createRequest(options),
        }),
    }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
