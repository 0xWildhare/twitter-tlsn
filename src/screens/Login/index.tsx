import { NavigationProp } from "@react-navigation/native";
import parseUrl from "parse-url";
import React, { useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import WebView from "react-native-webview";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  codeState,
  randomDeviceIdState,
  randomStateState,
  tokenState,
} from "../../atoms";
import { submitCode } from "../../doordash";
import { NavParams } from "../../navigation";
import { generateDoordashLoginUrl } from "../../utils";
import CookieManager, { Cookies } from "@react-native-cookies/cookies";
import {
  cookieStringState,
  twitterCSRFState,
  twitterHasAuthTokenState,
} from "../../atoms/twitter.atom";
interface Props {
  navigation: NavigationProp<NavParams, "Profile">;
}

export const Login = ({ navigation }: Props) => {
  const { goBack } = navigation;

  const [_, setCookieString] = useRecoilState(cookieStringState);
  const hasAuthToken = useRecoilValue(twitterHasAuthTokenState);
  const setCSRF = useSetRecoilState(twitterCSRFState);
  useEffect(() => {
    if (hasAuthToken) {
      goBack();
    }
  }, [hasAuthToken]);

  return (
    <View className="flex-1">
      <View className="h-12 flex-row items-center justify-between bg-black px-4">
        <View className="w-8"></View>
        <Text className="text-white">X Login</Text>
        <Pressable
          className="h-8 w-8 items-end justify-center"
          onPress={goBack}
        >
          <Text className="text-xs text-gray-200">Close</Text>
        </Pressable>
      </View>

      <WebView
        className="flex-1"
        scalesPageToFit={false}
        // Remove incognito to preserve cache and restore login between sessions
        incognito={false}
        userAgent={
          "Mozilla/5.0 (Linux; Android 14; Pixel 8 Pro Build/AP1A.240305.019.A1; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/125.0.6422.3 Mobile Safari/537.36"
        }
        source={{ uri: "https://x.com" }}
        onNavigationStateChange={async (navState) => {
          const goodCookies = [];

          const cookies: Cookies = await CookieManager.getAll(true);
          for (const key in cookies) {
            const cookie = cookies[key];
            if (cookie.domain === ".twitter.com") {
              const key = cookie.name;
              const value = cookie.value;
              goodCookies.push(`${key}=${value}`);

              if (key === "ct0") {
                setCSRF(value);
              }
            }
          }
          setCookieString(goodCookies.join("; "));
        }}
      />
    </View>
  );
};
