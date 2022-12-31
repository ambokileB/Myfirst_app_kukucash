import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ProfileScreen from "./ProfileScreen";
import CameraScreen from "./CameraScreen";
import UpdateInfo from "./UpdateInfo";
import Setting from "./Setting";
import { TakePhoto } from "./TakePhoto";
import {UploadProfileImage } from "./UploadProfileImage";
const Stack = createNativeStackNavigator();

const ProfileStack = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="camera"
        component={CameraScreen}
        options={{
          headerStyle: {
            backgroundColor: "#9C27B0",
          },
          headerTintColor: "#fff",
        }}
      />
       <Stack.Screen
        name="takePhoto"
        component={TakePhoto}
        options={{
          headerStyle: {
            backgroundColor: "#9C27B0",
          },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="save"
        component={UploadProfileImage}
        options={{
          headerStyle: {
            backgroundColor: "#9C27B0",
          },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="UpdateInfo"
        component={UpdateInfo}
        options={{
          headerStyle: {
            backgroundColor: "#9C27B0",
          },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="Setting"
        component={Setting}
        options={{
          headerStyle: {
            backgroundColor: "#9C27B0",
          },
          headerTintColor: "#fff",
        }}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;

const styles = StyleSheet.create({});
