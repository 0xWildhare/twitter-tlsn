import { DEFAULT_TWITTER_HEADERS } from ".";
import {
  NotarizationRequestInterface,
  rust_start,
} from "../../modules/my-rust-module";
import { UserProfileInterface } from "./getUserProfile";

//`/v2/consumers/me/`

export const notarizeTwitterRequest = (
  cookieString: string,
  csrf: string,
  path: string,
  redactStrings: string[] = [],
): NotarizationRequestInterface => ({
  host: "api.x.com",
  path,
  body: "",
  headers: [
    ["cookie", cookieString],
    ["x-csrf-token", csrf],
    ...DEFAULT_TWITTER_HEADERS,
  ],
  redact_strings: [cookieString, csrf, ...redactStrings],
  max_sent: 4096,
  max_recv: 32768,
});

export const getProfileRedactStrings = (
  profile: UserProfileInterface,
): string[] => [
  // profile.email,
  //   profile.last_name,
  //   profile.first_name,
  // profile.phone_number,
  // profile.phone_number_components.formatted_national_number,
  // profile.phone_number_components.formatted_international_number,
  // profile.phone_number_components.international_number,
  // profile.phone_number_components.national_number,
  // profile.default_profile_address.lat.toFixed(2),
  // profile.default_profile_address.lng.toFixed(2),
  //   profile.default_profile_address.printable_address,
  //   profile.default_profile_address.subpremise,
  //   profile.default_profile_address.street,
  //   profile.default_profile_address.zip_code,
  //   profile.default_profile_address.shortname,
  //   profile.default_profile_address.city,
  //   profile.default_profile_address.state,
];

export const notarizeTwitterProfileRequest = (
  cookieString: string,
  csrf: string,
  redactStrings: string[] = [],
) =>
  notarizeTwitterRequest(
    cookieString,
    csrf,
    `/graphql/-876iyxD1O_0X0BqeykjZA/Viewer?variables=%7B%22withCommunitiesMemberships%22%3Atrue%7D&features=%7B%22rweb_tipjar_consumption_enabled%22%3Atrue%2C%22responsive_web_graphql_exclude_directive_enabled%22%3Atrue%2C%22verified_phone_label_enabled%22%3Afalse%2C%22creator_subscriptions_tweet_preview_api_enabled%22%3Atrue%2C%22responsive_web_graphql_skip_user_profile_image_extensions_enabled%22%3Afalse%2C%22responsive_web_graphql_timeline_navigation_enabled%22%3Atrue%7D&fieldToggles=%7B%22isDelegate%22%3Afalse%2C%22withAuxiliaryUserLabels%22%3Afalse%7D`,
    redactStrings,
  );

export const generateTwitterProof = async (
  request: NotarizationRequestInterface,
): Promise<String> => {
  const proof_str = await rust_start(request);
  const proof = JSON.parse(proof_str as string);
  return JSON.stringify(proof);
};
