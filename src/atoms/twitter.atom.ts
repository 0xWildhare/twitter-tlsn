import { atom, selector } from "recoil";
import { OrderInterface } from "../doordash/orderHistory";
import { ProfileInterface } from "../doordash/userProfile";
import { randomDeviceId, randomState } from "../utils";
import { SearchResultInterface } from "../doordash/searchRestaurants";
import { CartInterface } from "../doordash";
import { UserProfileInterface } from "../twitter/getUserProfile";

const IS_TESTING = true;

// Replace w/ string of auth token
const TESTING_TOKEN = undefined;

export const cookieStringState = atom<string | undefined>({
  key: "twitter-cookie-string",
  default: undefined,
});

export const twitterCSRFState = atom<string | undefined>({
  key: "twitter-csrf-string",
  default: undefined,
});

export const twitterHasAuthTokenState = selector({
  key: "twitter-has-auth-token",
  get: ({ get }) => {
    const cookieString = get(cookieStringState);
    const csrf = get(twitterCSRFState);
    return cookieString?.includes("auth_token=") && !!csrf;
  },
});

export const twitterProfileState = atom<UserProfileInterface | undefined>({
  key: "twitter-profile",
  default: undefined,
});
