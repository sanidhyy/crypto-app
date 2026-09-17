import { createRapidApiProxy, cryptoFunctionConfig } from "./rapidApiProxy";

export default createRapidApiProxy({
  upstreamOrigin: "https://coinranking1.p.rapidapi.com",
  hostHeader: "coinranking1.p.rapidapi.com",
  pathPrefix: "/api/crypto",
});

export const config = cryptoFunctionConfig;
