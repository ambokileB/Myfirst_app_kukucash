import React, { useState, Component, useEffect } from "react";
import * as ScreenOrientation from "expo-screen-orientation";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  Pressable,
  SafeAreaView
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

import ProfileScreen from "../screens/profile/ProfileStack";
import PostScreen from "../../src/screens/PostScreen";
import ProfessionalScreen from "../../src/screens/professsional/ProfessionalStack";
import firebase from "../../util/firebase";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";

import { HomeNav } from "./HomeNav";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export const SignedInStack = ({ navigation }) => {
  useEffect(() => {
    fetchUserProfilePicture();
  
  }, []);

  const [userData, setUserData] = useState([]);
  const [image, setImage] = useState([]);




  const fetchUserProfilePicture = async () => {
    firebase
      .firestore()
      .collection("userProfileImage")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          console.log("User Image", documentSnapshot.data());
          setImage(documentSnapshot.data());
        }
      });
  };

 


  

  React.useEffect(() => {
    getUser();
  }, []);

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

  var userName = userData.username;
  var profilePicture = image.profileImage;
  var nickName  = image.nickName;
  var emailAddress = userData.email;

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        drawerInactiveBackgroundColor: "#9575CD",
        drawerActiveBackgroundColor: "#9C27B0",
        
        
      }}
      drawerContent={(props) => (
         <CustomDrawer
          {...props} 
         name={userName} 
         email={emailAddress} 
         userImage={profilePicture}
         
         
           />

     
      )}
    >
      <Drawer.Screen
        name="HomeStack"
        component={HomeNav}
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
  );
};

const CustomDrawer = (props, { navigation }) => {




 

  // useEffect(() => {
  //   handleSignOut();
  // }, []);

  const handleSignOut = async () => {
    try {
      await firebase.auth().signOut();
      console.log("Sign Out successfully");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#9575CD" }}>
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
            paddingTop:22,
            paddingHorizontal: 5,
            backgroundColor: "#9575CD",
          }}
        >
          {/* <Image
            source={require('../../assets/logo/logo.png')}
            resizeMode="contain"
            style={{
              height: 70,
              width: 70,
              borderRadius: 100,
              alignSelf: "flex-start",
            }}
          /> */}

           <Image
            source={{uri: props.userImage}}
            resizeMode="contain"
            style={{
              height: 70,
              width: 70,
              borderRadius: 100,
              alignSelf: "flex-start",
            }}
          />
          
        
        <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
        <Text
            style={{
              textAlign: 'left',
              fontSize: 13,
              fontWeight: "bold",
              color: "#fff",
              marginRight:23
            }}
          >
            {props.name}
          </Text>
          <Text
            style={{
              textAlign: "right",
              fontSize: 13,
              fontWeight: "bold",
              color: "#fff",
              marginLeft:23
            }}
          >
            {props.email}
          </Text>
        </View>
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
          onPress={() => handleSignOut()}
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
    </SafeAreaView>
  );
};

export const SignedOutStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );
};
