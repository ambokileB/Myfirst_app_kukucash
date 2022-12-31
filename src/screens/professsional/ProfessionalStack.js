import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ProfessionalDetails from "./ProfessionalDetails";
import ProfessionalScreen from "./ProfessionalScreen";

const Stack = createNativeStackNavigator();

const ProfessionalStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="professional"
        component={ProfessionalScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="professionalDetail"
        component={ProfessionalDetails}
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

export default ProfessionalStack;

const styles = StyleSheet.create({});
