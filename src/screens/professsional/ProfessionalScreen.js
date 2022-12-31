import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Pressable,
} from "react-native";

import firebase from "../../../util/firebase";

const skilled = [
  {
    id: 1,
    username: "Adam",
    email: "adam@gmail.com",
    phoneNumber: "765530882",
    location: "Morogoro",
  },
  {
    id: 2,
    username: "Adam",
    email: "adam@gmail.com",
    phoneNumber: "765530882",
    location: "Dodoma",
  },
  {
    id: 3,
    username: "Adam",
    email: "adam@gmail.com",
    phoneNumber: "765530882",
    location: "Mwanza",
  },
  {
    id: 4,
    username: "Joseph",
    email: "joseph@gmail.com",
    phoneNumber: "765530882",
    location: "Dodoma",
  },
  {
    id: 5,
    username: "mapunga",
    email: "mapunga@gmail.com",
    phoneNumber: "765530882",
    location: "Dodoma",
  },
  {
    id: 6,
    username: "Adam",
    email: "adam@gmail.com",
    phoneNumber: "765530882",
    location: "Morogoro",
  },
  {
    id: 7,
    username: "Adam",
    email: "adam@gmail.com",
    phoneNumber: "765530882",
    location: "Dodoma",
  },
  {
    id: 8,
    username: "Gekko",
    email: "geggo@gmail.com",
    phoneNumber: "765530882",
    location: "Morogoro",
  },
  {
    id: 9,
    username: "Kelvin",
    email: "kelvin@gmail.com",
    phoneNumber: "765530882",
    location: "Dar es Salaam",
  },
  {
    id: 10,
    username: "Adam",
    email: "adam@gmail.com",
    phoneNumber: "765530882",
    location: "Morogoro",
  },
  {
    id: 11,
    username: "Adam",
    email: "adam@gmail.com",
    phoneNumber: "765530882",
    location: "Mbeya",
  },
  {
    id: 12,
    username: "Adam",
    email: "adam@gmail.com",
    phoneNumber: "765530882",
    location: "Morogoro",
  },
  {
    id: 13,
    username: "Joseph",
    email: "joseph@gmail.com",
    phoneNumber: "765530882",
    location: "Morogoro",
  },
  {
    id: 14,
    username: "mapunga",
    email: "mapunga@gmail.com",
    phoneNumber: "765530882",
    location: "Manyara",
  },
  {
    id: 15,
    username: "Adam",
    email: "adam@gmail.com",
    phoneNumber: "765530882",
    location: "Mpwapwa",
  },
  {
    id: 16,
    username: "Adam",
    email: "adam@gmail.com",
    phoneNumber: "765530882",
    location: "Dodoma",
  },
  {
    id: 17,
    username: "Gekko",
    email: "geggo@gmail.com",
    phoneNumber: "765530882",
    location: "Pwan",
  },
  {
    id: 18,
    username: "Kelvin",
    email: "kelvin@gmail.com",
    phoneNumber: "765530882",
    location: "Morogoro",
  },
];

const ProfessionalScreen = ({ navigation }) => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <View>
        <Text>Login</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#CED4DA" }}>
    
      <StatusBar backgroundColor="#9C27B0" />

      <View
        style={{
          paddingHorizontal: 12,
          paddingVertical: 6,
          backgroundColor: "#9575CD",
          justifyContent: "flex-start",
          flexDirection: "row",
          paddingTop:32,
   
        }}
      >
        <Pressable onPress={navigation.toggleDrawer}>
          <View
            style={{
              height: 3,
              width: 26,
              backgroundColor: "#fff",
              marginBottom: 4,
            }}
          />
          <View
            style={{
              height: 3,
                width: 26,
              backgroundColor: "#fff",
              marginBottom: 5,
            }}
          />
          <View
            style={{
              height: 3,
              width: 26,
              backgroundColor: "#fff",
              marginBottom: 0,
            }}
          />
        </Pressable>
        <Text
          style={{
            alignSelf: "center",
            alignItems: "center",
            marginLeft: 32,
            color: "#fff",
          }}
        >
          Meet With Chicks Professional Here
        </Text>
      </View>
      <View style={{ flex: 1, paddingHorizontal: 22, paddingVertical: 12 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={skilled}
          renderItem={({ item }) => (
            <Pressable
              style={{
                backgroundColor: "#fff",
                marginBottom: 15,
                borderRadius: 12,
                flexDirection: "row",
                padding: 3,
              }}
              onPress={() =>
                navigation.navigate("professionalDetail", { item })
              }
            >
              <View
                style={{
                  height: 55,
                  width: 55,
                  backgroundColor: "#A8B8D8",
                  borderRadius: 35,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text>IMG</Text>
              </View>
              <View style={{ flex: 1, marginLeft: 5 }}>
                <Text style={{ fontSize: 14, fontWeight: "700" }}>
                  {item.username}
                </Text>
                <Text style={{ fontSize: 12, fontWeight: "400" }}>
                  +255{item.phoneNumber}
                </Text>
                <View
                  style={{
                    paddingHorizontal: 6,
                    justifyContent: "space-between",
                    flexDirection: "row",
                  }}
                >
                  <Text style={{ fontSize: 13, fontWeight: "400" }}>
                    {item.email}
                  </Text>
                  <Text style={{ fontSize: 12, fontWeight: "400" }}>
                    {item.location}
                  </Text>
                </View>
              </View>
            </Pressable>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default ProfessionalScreen;

const styles = StyleSheet.create({
  container: {
    flwx: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ECECEC",
  },
});
