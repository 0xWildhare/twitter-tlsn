export const getUserProfile = async (cookieString: string, csrf: string) => {
  console.log("HERE", cookieString, csrf);
  const resp = await fetch(
    "https://api.x.com/graphql/-876iyxD1O_0X0BqeykjZA/Viewer?variables=%7B%22withCommunitiesMemberships%22%3Atrue%7D&features=%7B%22rweb_tipjar_consumption_enabled%22%3Atrue%2C%22responsive_web_graphql_exclude_directive_enabled%22%3Atrue%2C%22verified_phone_label_enabled%22%3Afalse%2C%22creator_subscriptions_tweet_preview_api_enabled%22%3Atrue%2C%22responsive_web_graphql_skip_user_profile_image_extensions_enabled%22%3Afalse%2C%22responsive_web_graphql_timeline_navigation_enabled%22%3Atrue%7D&fieldToggles=%7B%22isDelegate%22%3Afalse%2C%22withAuxiliaryUserLabels%22%3Afalse%7D",
    {
      headers: {
        Host: "api.x.com",
        Cookie: cookieString,
        authorization:
          "Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA",
        "x-csrf-token": csrf,
        // "x-client-transaction-id":
        //   "sAPsdr73o+Li2D90dBvmsKZrkqh4Hv1DIIud6MjqINjnq1/w607+WjEBjCnyp4NN85ya8rKMbUdkSbNffduR7RXium0dsw",
        accept: "*/*",
        "content-type": "application/json",
        "x-twitter-active-user": "yes",
        "sec-fetch-site": "same-site",
        "x-twitter-client-language": "en",
        "accept-language": "en-US,en;q=0.9",
        "sec-fetch-mode": "cors",
        origin: "https://x.com",
        "user-agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.15",
        referer: "https://x.com/",
        "sec-fetch-dest": "empty",
      },
      credentials: "omit",
    },
  );

  if (!resp.ok) {
    throw new Error(
      `Failed to fetch user twitter profile ${await resp.text()}`,
    );
  }
  return (await resp.json()) as UserProfileInterface;
};

const userProfileResp = {
  data: {
    viewer: {
      has_community_memberships: true,
      create_community_action_result: {
        __typename: "CommunityCreateActionUnavailable",
        reason: "NotVerified",
        message: "Subscribe to Premium to be able to create a community.",
      },
      user_features: [
        {
          feature: "mediatool_studio_library",
          enabled: false,
        },
      ],
      user_results: {
        result: {
          __typename: "User",
          id: "VXNlcjoxNDYwNzA4MzEwMTU2NDYwMDMy",
          rest_id: "1460708310156460032",
          affiliates_highlighted_label: {},
          has_graduated_access: true,
          is_blue_verified: false,
          profile_image_shape: "Circle",
          legacy: {
            can_dm: true,
            can_media_tag: true,
            created_at: "Tue Nov 16 20:36:37 +0000 2021",
            default_profile: true,
            default_profile_image: false,
            description:
              "Working on building zkTLS infra/products. A ruthless empiricist. @OpacityNetwork Advisor @EV3Ventures. Find me on Farcaster more than here.",
            entities: {
              description: {
                urls: [],
              },
              url: {
                urls: [
                  {
                    display_url: "warpcast.com/eulerlagrange.…",
                    expanded_url: "https://warpcast.com/eulerlagrange.eth",
                    url: "https://t.co/hdZj5ABEEO",
                    indices: [0, 23],
                  },
                ],
              },
            },
            fast_followers_count: 0,
            favourites_count: 324,
            followers_count: 564,
            friends_count: 947,
            has_custom_timelines: true,
            is_translator: false,
            listed_count: 0,
            location: "Farcaster",
            media_count: 16,
            name: "Hersh / EulerLagrange.eth",
            needs_phone_verification: false,
            normal_followers_count: 564,
            pinned_tweet_ids_str: ["1795885259067723985"],
            possibly_sensitive: false,
            profile_image_url_https:
              "https://pbs.twimg.com/profile_images/1809383192635535360/WFcOp85n_normal.jpg",
            profile_interstitial_type: "",
            screen_name: "Euler__Lagrange",
            statuses_count: 424,
            translator_type: "none",
            url: "https://t.co/hdZj5ABEEO",
            verified: false,
            want_retweets: false,
            withheld_in_countries: [],
          },
          tipjar_settings: {},
          legacy_extended_profile: {
            birthdate: {
              day: 15,
              month: 7,
              year: 1996,
              visibility: "Self",
              year_visibility: "Self",
            },
          },
          is_profile_translatable: false,
          super_follows_application_status: "NotStarted",
          creator_subscriptions_count: 0,
        },
      },
      educationFlags: [
        {
          flag: "ChangeConversationControlsEducation",
          timestamp: 1720456981727,
        },
        {
          flag: "CommunitiesEducationComposerControls",
          timestamp: 1717527041480,
        },
        {
          flag: "SpacesGeneralEducation",
          timestamp: 1648697371624,
        },
        {
          flag: "PinnedConversationsEducation",
          timestamp: 1717437563056,
        },
        {
          flag: "TrustedFriendsEducationFlag",
          timestamp: 1717527041489,
        },
        {
          flag: "NewUserPromptEducation",
          timestamp: 1719591726463,
        },
        {
          flag: "GraduatedUserPromptEducation",
          timestamp: 1720456338743,
        },
        {
          flag: "GrokEducation",
          timestamp: 1703839510392,
        },
      ],
      is_tfe_restricted_session: false,
      is_active_creator: false,
      super_followers_count: 0,
    },
    is_super_follow_subscriber: false,
  },
};

export type UserProfileInterface = typeof userProfileResp;
