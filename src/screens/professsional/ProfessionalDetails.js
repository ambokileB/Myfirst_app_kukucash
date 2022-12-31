import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Iconmenu from "react-native-vector-icons/MaterialCommunityIcons";
import { Button, IconButton } from "react-native-paper";
import * as Contacts from "expo-contacts";
import ProfileScreen from "../profile/ProfileScreen";

const ProfessionalDetails = ({ navigation, route }) => {
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Emails],
        });

        if (data.length > 0) {
          const contact = data[0];
          console.log(contact);
        }
      }
    })();
  }, []);

  const item = route.params;
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#7928CA" ,paddingTop:12}}>
      <View style={{ flex: 1 / 2, backgroundColor: "#CED4DA" }}></View>
      <View style={{ flex: 1, backgroundColor: "#EBEFF4" }}>
        
        <View
          style={{
            padding: 12,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text>{item.item.username}</Text>
            <Text>+255{item.item.phoneNumber}</Text>
          </View>
          <Button onPress={() => {}}>
            <Iconmenu
              name="phone"
              size={23}
              color="tomato"
              onPress={() => {}}
            />
          </Button>
        </View>
        <View style={{ flex: 1 }}>
          <Text> Professional details, service provide</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfessionalDetails;

const styles = StyleSheet.create({});
