export * from "./getUserProfile";

export const TWITTER_HOST = "api.x.com";
export const DEFAULT_TWITTER_HEADERS: [string, string][] = [
  ["host", TWITTER_HOST],
  [
    "user-agent",
    "Mozilla/5.0 (Linux; Android 14; Pixel 8 Pro Build/AP1A.240305.019.A1; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/125.0.6422.3 Mobile Safari/537.36",
  ],
  [
    "authorization",
    "Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA",
  ],
  ["content-type", "application/json"],
  ["x-twitter-active-user", "yes"],
  ["sec-fetch-site", "same-site"],
  ["x-twitter-client-language", "en"],
  ["accept-language", "en-US,en;q=0.9"],
  ["sec-fetch-mode", "cors"],
  ["origin", "https://x.com"],
  ["referer", "https://x.com/"],
  ["sec-fetch-dest", "empty"],
  ["accept", "application/json"],
  ["accept-encoding", "identity"],
  ["connection", "close"],
];
