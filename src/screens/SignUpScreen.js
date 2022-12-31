import React, { Component, useState, setState } from "react";
import {
  Text,
  StyleSheet,
  View,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  StatusBar,
  Alert,
  Image,
} from "react-native";
import { TextInput, Button, useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import firebase from "../../util/firebase";

import DropDownPicker from "react-native-dropdown-picker";

const { height, width } = Dimensions.get("screen");

import { Header } from "../../components/Header";

var headerTitle = "Create Account";

export default function SignUpScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [passwordVissible, setPasswordVissible] = useState(true);

  const [email, setEmail] = useState("");

  const [phone, setPhone] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [userNameerror, setUserNameerror] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [valueError, setValueError] = useState("");

  const [comfirmpssd, setComfirmpssd] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Poutly Farmer", value: "PUOTLY" },
    { label: "Equipment", value: "EQUIPMENT" },
    { label: "Buyer", value: "BUYER" },

    { label: "Transporter", value: "TRANSPORTER" },
    { label: "Vet", value: "VET" },
  ]);

  const onCheck = () => {
    if (username.length < 4) {
      setUserNameerror("username should be atleast 4 characters");
    }
    if (username == "") {
      setUserNameerror("username should not be Empty");
    }

    if (password.length < 6) {
      setPasswordError("too short Password atleast 6 characters ");
    }
    if (password == "") {
      setPasswordError("password should not be empty");
    }

    if (email.length < 6) {
      setEmailError("Too short Email address characters");
    }
    if (email == "") {
      setEmailError("Email address should not be Empty ");
    }
    if (phone.length < 9) {
      setPhoneError("phone number less than 9 characters lenght");
    }
    if (phone == "") {
      setPhoneError("phone number should not be Empty");
    }
    if (value == "") {
      setValueError("Please select an your option here");
    }
  };

  const { colors } = useTheme();

  return (
    <SafeAreaView style={{ backgroundColor: "#9575CD", flex: 1 }}>
      <StatusBar backgroundColor="#9C27B0" />
      <KeyboardAwareScrollView nestedScrollEnabled={true}>
        <Header title={headerTitle} />
        <View
          style={{
            backgroundColor: "transparent",
            height: 110,
            width: 150,
            borderRadius: 70,
            alignSelf: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../assets/logo/logo.png")}
            resizeMode="contain"
            style={{
              height:90,
              width: 90,
              borderRadius: 70,
            }}
          />
        </View>
        <View
          style={{
            backgroundColor: "transparent",

            paddingHorizontal: 12,

            paddingVertical: 12,
          }}
        >
          <TextInput
            mode="flat"
            label=" username"
            // keyboardType='name'
            onChangeText={(username) => {
              setUsername(username);
              setUserNameerror("");
            }}
            onEndEditing={onCheck}
            left={<TextInput.Icon name="account" color="#9900EF" />}
            style={{
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              marginTop: 12,
              height: 45,
              borderWidth: 2,
              borderColor: username.length > 3 ? "green" : "#a855f7",
            }}
          />
          {!!userNameerror && (
            <Text style={{ color: "yellowgreen", alignSelf: "center" }}>
              {userNameerror}
            </Text>
          )}
          <TextInput
            mode="flat"
            label=" Email address"
            keyboardType="email-address"
            onChangeText={(email) => {
              setEmail(email);
              setEmailError("");
            }}
            onEndEditing={onCheck}
            left={<TextInput.Icon name="email" color="#9900EF" />}
            style={{
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              marginTop: 12,
              height: 45,
              borderWidth: 2,
              borderColor: email.length > 11 ? "green" : "#a855f7",
            }}
          />
          {!!emailError && (
            <Text style={{ color: "yellowgreen", alignSelf: "center" }}>
              {emailError}
            </Text>
          )}
          <TextInput
            mode="flat"
            label="phone Number"
            placeholder="Eg:  765530882 or 683307420"
            maxLength={9}
            keyboardType="phone-pad"
            onChangeText={(phone) => {
              setPhone(phone);
              setPhoneError("");
            }}
            onEndEditing={onCheck}
            left={<TextInput.Icon name="phone" color="#9900EF" />}
            style={{
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              marginTop: 12,
              height: 45,
              borderWidth: 2,
              borderColor: phone.length > 8 ? "green" : "#a855f7",
            }}
          />
          {!!phoneError && (
            <Text style={{ color: "yellowgreen", alignSelf: "center" }}>
              {phoneError}
            </Text>
          )}
          <TextInput
            mode="flat"
            label=" password"
            onChangeText={(password) => {
              setPassword(password);
              setPasswordError("");
            }}
            onEndEditing={onCheck}
            secureTextEntry={passwordVissible}
            left={<TextInput.Icon name="lock" color="#9900EF" />}
            right={
              <TextInput.Icon
                name={passwordVissible ? "eye" : "eye-off"}
                color="#9900EF"
                onPress={() => setPasswordVissible(!passwordVissible)}
              />
            }
            style={{
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              marginTop: 12,
              height: 45,
              borderWidth: 2,
              borderColor: password.length > 5 ? "green" : "#a855f7",
            }}
          />
          {!!passwordError && (
            <Text style={{ color: "yellowgreen", alignSelf: "center" }}>
              {passwordError}
            </Text>
          )}
          {/* <TextInput
              mode='flat'
              label=' Comfirm Password'
            
              onChangeText={(comfirmpssd) =>setComfirmpssd(comfirmpssd)}
              left={<TextInput.Icon name="lock" color="#9900EF" />}
              right={<TextInput.Icon name="eye" color="#9900EF" />}
              secureTextEntry={true}
              style={{borderBottomLeftRadius:20,
                borderBottomRightRadius:20,
                borderTopLeftRadius:20,
                borderTopRightRadius:20,
                marginTop:12,
                height:45
              }}
            /> */}

          <View style={{ padding: 12, paddingHorizontal: 4 }}>
            <DropDownPicker
              nestedScrollEnabled={true}
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              onChangeValue={
                (item) => {
                  setValueError("");
                }

                //  console.log(item.label, item.value)
              }
              onEndEditing={onCheck}
              placeholder="Select an options"
              style={{
                backgroundColor: "#E1E1E1",
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                borderColor: "#fff",
                borderWidth: 2,
                borderColor: value && items !== "" ? "green" : "#a855f7",
              }}
              dropDownStyle={{
                backgroundColor: "#E1E1E1",
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                borderColor: "#fff",
              }}
            />
            {!!valueError && (
              <Text style={{ color: "yellowgreen", alignSelf: "center" }}>
                {valueError}
              </Text>
            )}
          </View>
        </View>
        <View style={{ height: 0 }}></View>
        <View
          style={{
            backgroundColor: "transparent",
            padding: 12,
          }}
        >
          <Button
            mode="contained"
            style={{
              marginHorizontal: 20,
              backgroundColor: "#c026d3",
              marginVertical: 12,
              borderRadius: 20,
            }}
            onPress={() => {
              if (
                username != "" &&
                phone != "" &&
                email != "" &&
                password != ""
              ) {
                firebase
                  .auth()
                  .createUserWithEmailAndPassword(email, password)
                  .then((result) => {
                    firebase
                      .firestore()
                      .collection("users")
                      .doc(firebase.auth().currentUser.uid)
                      .set({
                        email: email,
                        username: username,
                        phone: phone,
                        userCategory: value,
                      });
                    console.log(result);
                    navigation.replace("SignIn");
                  })
                  .catch((error) => {
                    alert(error);
                  });
              } else {
                alert("invalid email or password ");
              }
            }}
          >
            Create Account
          </Button>
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: 20,
            }}
          >
            <Text style={{ color: "#fff" }}> Already you have Account ? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("SignIn")}
              style={{}}
            >
              <Text style={{ color: "yellow" ,fontSize:15,}}>SignIn Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
