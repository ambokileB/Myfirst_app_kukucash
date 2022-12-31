import React, { useState, Component, useEffect } from "react";
import * as ScreenOrientation from "expo-screen-orientation";
import {
  StyleSheet,
  Text,
  View,

  TouchableOpacity,
  Alert,
  Image
} from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import Logout from "react-native-vector-icons/SimpleLineIcons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Iconpost from "react-native-vector-icons/MaterialIcons";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ProfileScreen from "../screens/profile/ProfileStack";
import PostScreen from "../../src/screens/PostScreen";
import ProfessionalScreen from "../../src/screens/professsional/ProfessionalStack";
import firebase from "../../util/firebase";

import { SignedInStack } from "./StackNavigator";

const Drawer = createDrawerNavigator();

const Drawernavigator = () => {
  const userimg= require('../../assets/baraka.jpg');
  const getUser = async () => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          console.log("User Data", documentSnapshot.data());
          setUserData(documentSnapshot.data());
        }
      });
  };

  React.useEffect(() => {
    getUser();
  }, []);

  const [userData, setUserData] = useState([]);
  var NickName = userData.username;
  var emailAddress = userData.email;

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          drawerInactiveBackgroundColor: "#AEA1FF",
          drawerActiveBackgroundColor: "#9900EF",
        }}
        drawerContent={(props) => (
          <CustomDrawer {...props} name={NickName} email={emailAddress} />
        )}
      >
        <Drawer.Screen
          name="HomeStack"
          component={SignedInStack}
          options={{
            drawerLabel: "Home",
            drawerLabelStyle: {
              fontSize: 15,
              color: "#fff",
              fontWeight: "400",
            },
            drawerIcon: ({ focused }) => (
              <Icon name="home" size={20} color="#fff" />
            ),
          }}
        />

        <Drawer.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            drawerLabel: "Profile",
            drawerLabelStyle: {
              fontSize: 15,
              color: "#fff",
              fontWeight: "400",
            },
            drawerIcon: ({ focused }) => (
              <Icon name="account" size={20} color="#fff" />
            ),
          }}
        />
        <Drawer.Screen
          name="Post"
          component={PostScreen}
          options={{
            drawerLabel: "Post",
            drawerLabelStyle: {
              fontSize: 15,
              color: "#fff",
              fontWeight: "400",
            },
            drawerIcon: ({ focused }) => (
              <Iconpost name="post-add" size={20} color="#fff" />
            ),
          }}
        />
        <Drawer.Screen
          name="Professional"
          component={ProfessionalScreen}
          options={{
            drawerLabel: "Professionals",
            drawerLabelStyle: {
              fontSize: 15,
              color: "#fff",
              fontWeight: "400",
            },
            drawerIcon: ({ focused }) => (
              <Iconpost name="book" size={20} color="#fff" />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Drawernavigator;

const CustomDrawer = (props, { navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: "#9575CD" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 5,
          paddingTop: 0,
          alignItems: "center",
        }}
      >
        <View
          style={{
            paddingVertical: 1,
            paddingHorizontal: 5,
            backgroundColor: "#9575CD",
          }}
        >
          <Image
            source={require("../../assets/baraka.jpg")}
            resizeMode="contain"
            style={{
              height: 70,
              width: 70,
              borderRadius: 40,
              alignSelf: "center",
            }}
          />
      
          <Text
            style={{
              textAlign: "center",
              fontSize: 13,
              fontWeight: "bold",
              color: "#fff",
            }}
          >
            {props.name}
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontSize: 13,
              fontWeight: "bold",
              color: "#fff",
            }}
          >
            {props.email}
          </Text>
        </View>
        <Logout
          name="close"
          size={20}
          color="#ffffff"
          onPress={() => props.navigation.closeDrawer()}
        />
      </View>

      <DrawerContentScrollView>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <View style={{ padding: 6, backgroundColor: "#9C27B0" }}>
        <TouchableOpacity
          onPress={() =>
            // firebase.auth().signOut().then(()=>{
            //   navigation.navigate(Home)
            // }).catch((error)=>{
            //   alert(error)
            // })
            {}
          }
          style={{
            marginHorizontal: 12,

            paddingHorizontal: 0,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Logout name="logout" size={18} color="#ffffff" />
          <Text style={{ fontSize: 18, fontWeight: "400", color: "#E1E1E1" }}>
            Log Out
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
