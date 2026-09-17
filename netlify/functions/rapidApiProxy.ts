import type { Config } from "@netlify/functions";

type RapidApiProxyOptions = {
  upstreamOrigin: string;
  hostHeader: string;
  pathPrefix: string;
  extraHeaders?: Record<string, string>;
};

export const createRapidApiProxy = ({
  upstreamOrigin,
  hostHeader,
  pathPrefix,
  extraHeaders = {},
}: RapidApiProxyOptions) => {
  return async (request: Request) => {
    if (request.method !== "GET") {
      return new Response("Method not allowed", { status: 405 });
    }

    const apiKey = process.env.RAPID_API_KEY;

    if (!apiKey) {
      return Response.json(
        { message: "Missing RAPID_API_KEY server environment variable" },
        { status: 500 }
      );
    }

    const incomingUrl = new URL(request.url);

    if (!incomingUrl.pathname.startsWith(pathPrefix)) {
      return new Response("Not found", { status: 404 });
    }

    const upstreamPath = incomingUrl.pathname.slice(pathPrefix.length) || "/";

    if (upstreamPath.includes("..")) {
      return new Response("Bad request", { status: 400 });
    }

    const upstreamUrl = new URL(upstreamOrigin);
    upstreamUrl.pathname = upstreamPath;
    upstreamUrl.search = incomingUrl.search;

    const upstreamResponse = await fetch(upstreamUrl, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": hostHeader,
        ...extraHeaders,
      },
    });

    const body = await upstreamResponse.arrayBuffer();
    const headers = new Headers();
    const contentType = upstreamResponse.headers.get("content-type");

    if (contentType) {
      headers.set("content-type", contentType);
    }

    return new Response(body, {
      status: upstreamResponse.status,
      headers,
    });
  };
};

export const cryptoFunctionConfig = {
  path: "/api/crypto/*",
  method: "GET",
} as const satisfies Config;

export const newsFunctionConfig = {
  path: "/api/news/*",
  method: "GET",
} as const satisfies Config;
