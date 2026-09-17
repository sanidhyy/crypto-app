import { createRapidApiProxy, newsFunctionConfig } from "./rapidApiProxy";

export default createRapidApiProxy({
  upstreamOrigin: "https://bing-news-search1.p.rapidapi.com",
  hostHeader: "bing-news-search1.p.rapidapi.com",
  pathPrefix: "/api/news",
  extraHeaders: {
    "X-BingApis-SDK": "true",
  },
});

export const config = newsFunctionConfig;
