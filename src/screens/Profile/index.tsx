import { NavigationProp } from "@react-navigation/core";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useMemo, useState } from "react";
import { Pressable, SafeAreaView, Text, View } from "react-native";
import { Chase } from "react-native-animated-spinkit";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  cartIdState,
  cartState,
  ordersState,
  profileState,
  searchResultsState,
  tokenState,
} from "../../atoms";
import {
  addItemToCart,
  getCart,
  orderHistory,
  searchRestaurants,
  userProfile,
} from "../../doordash";
import { NavParams } from "../../navigation";
import {
  generateDoorDashProof,
  getProfileRedactStrings,
  notarizeDoorDashProfileRequest,
} from "../../doordash/notarize";
import {
  cookieStringState,
  twitterCSRFState,
  twitterProfileState,
} from "../../atoms/twitter.atom";
import { getUserProfile } from "../../twitter/getUserProfile";
import {
  generateTwitterProof,
  notarizeTwitterProfileRequest,
} from "../../twitter/notarize";

interface Props {
  navigation: NavigationProp<NavParams, "Profile">;
}

export const Profile = ({ navigation }: Props) => {
  const { goBack } = navigation;

  const [profile, setProfile] = useRecoilState(twitterProfileState);
  const cookieString = useRecoilValue(cookieStringState);
  const csrf = useRecoilValue(twitterCSRFState);
  useEffect(() => {
    if (cookieString && csrf) {
      console.log("HERE", cookieString);
      getUserProfile(cookieString, csrf)
        .then((resp) => {
          console.log("User profile", resp);
          setProfile(resp);
        })
        .catch((err) => {
          console.log("Error getting user profile", err);
        });
    }
  }, [cookieString, csrf]);

  if (!profile) {
    return (
      <View className="flex-1 items-center justify-center">
        <Chase size={96} />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <SafeAreaView className="flex-1">
        <StatusBar style="auto" />

        <View className="mb-4 mt-2 flex-row items-center justify-between border-b border-gray-200 px-4 pb-2">
          <Pressable className="w-8" onPress={goBack}>
            <Text className="text-xs text-gray-600">Back</Text>
          </Pressable>
          <Text className="text-sm">Profile</Text>
          <View className="w-8"></View>
        </View>

        <View className="mt-4 flex-1 space-y-4 px-4">
          <View>
            <Text className="text-xs font-medium text-gray-600">Name</Text>
            <Text className="text-lg font-light text-black">
              {`${profile.data.viewer.user_results.result.legacy.name} ${profile.data.viewer.user_results.result.legacy.fast_followers_count}`}
            </Text>
          </View>
          <View>
            {profile && cookieString && (
              <Pressable
                className="h-14 w-full items-center justify-center rounded-full border border-black bg-white"
                onPress={async () => {
                  const request = notarizeTwitterProfileRequest(
                    cookieString,
                    csrf!,
                    [],
                  );
                  const proof = await generateTwitterProof(request);
                  console.log("MPC-TLS Proof", proof);
                }}
              >
                <Text className="text-lg text-black">Generate proof</Text>
              </Pressable>
            )}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};
