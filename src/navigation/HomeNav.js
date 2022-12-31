import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ProfessionalDetails from "../screens/professsional/ProfessionalDetails";
import NewDetailsScreen from "../screens/NewDetailsScreen";
import HomeScreen from "../screens/HomeScreen";
// import DetailsScreen from "../screens/DetailsScreen";
import { CartScreen } from "../screens/cartScreen";

const Stack = createNativeStackNavigator();

export const HomeNav = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      {/* <Stack.Screen name="DetailsScreen" component={DetailsScreen} /> */}
      <Stack.Screen name="NewDetailsScreen" component={NewDetailsScreen} />
      <Stack.Screen
        name="ProfessionalDetails"
        component={ProfessionalDetails}
      />
      <Stack.Screen name="Cart" component={CartScreen} />
    </Stack.Navigator>
  );
};
