export const PCD_GITHUB_URL = "https://github.com/proofcarryingdata/pcd";

export const IS_PROD = process.env.NODE_ENV === "production";
export const IS_STAGING = process.env.NODE_ENV === "test";

export const ZUPASS_URL = IS_PROD
  ? "https://zupass.org/"
  : IS_STAGING
  ? "https://staging.zupass.org/"
  : "https://zupass.org/";

export const ZUPASS_SERVER_URL = IS_PROD
  ? "https://api.zupass.org/"
  : IS_STAGING
  ? "https://api-staging.zupass.org/"
  : "http://localhost:3002/";

export const EVERYONE_SEMAPHORE_GROUP_URL = IS_PROD
  ? "https://api.zupass.org/semaphore/5"
  : IS_STAGING
  ? "https://api-staging.zupass.org/semaphore/5"
  : "http://localhost:3002/semaphore/5";

export const ticketTypeNames = [
  "Zuzalu",
  "ZuConnect",
  "Vitalia",
  "ZuVillage",
  "Esmeralda",
  "AgoraCore"
] as const;
