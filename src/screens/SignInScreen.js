import React, { Component, useState, useEffect } from "react";
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

import { Header } from "../../components/Header";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import firebase from "../../util/firebase";

const { height, width } = Dimensions.get("screen");

var headerTitle = "User Log in";

export default function SignInScreen({ navigation }) {
  const { colors } = useTheme();

  // state = {
  //   email:'',
  //   password:'',
  //   item: null,
  //   isLoggedIn:false,
  //   passwordVissible:true

  // }

  // componentDidMount(){
  //   const user = firebase.auth().currentUser

  //   firebase.auth().onAuthStateChanged(result =>{
  //     if (result) {
  //       this.props.navigation.replace("Home")

  //     }

  //   })

  // }

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [passwordVissible, setPasswordVissible] = useState(true);
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");

  // var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  // Validate  user Inputs

  const onCheck = () => {
    if (password.length < 6) {
      setPasswordError("You Entered too short Password atleast 6 characters");
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
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#9C27B0" />
      <KeyboardAwareScrollView nestedScrollEnabled={true}>
        <Header title={headerTitle} />

        <View
          style={{
            backgroundColor: "transparent",
            height: 150,
            width: 150,
            borderRadius: 70,
            alignSelf: "center",
            justifyContent: "center",
            alignItems: "center",
            top: 50,
          }}
        >
          <Image
            source={require("../../assets/logo/logo.png")}
            resizeMode="contain"
            style={{
              height: 100,
              width: 100,
              borderRadius: 70,
            }}
          />
        </View>
        <View style={{ height: 120 }}></View>
        <View
          style={{
            backgroundColor: "transparent",
            paddingVertical: 12,
            paddingHorizontal: 12,
          }}
        >
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
                onPress={() => setPasswordVissible(!passwordVissible)}
                color="#9900EF"
              />
            }
            style={{
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              marginTop: 12,
              height: 45,
              // backgroundColor:password.length  > 5? "#018786":"#fff",
              borderWidth: 2,
              borderColor: password.length > 5 ? "green" : "#a855f7",
              // borderColor:password.length  < 5? "blue":"#fff",
            }}
          />

          {!!passwordError && (
            <Text style={{ color: "yellowgreen", alignSelf: "center" }}>
              {passwordError}
            </Text>
          )}

          {/* <DropDownPicker
    items={[
        {label: 'Item 1', value: 'item1'},
        {label: 'Item 2', value: 'item2'},
    ]}
    defaultValue="item1"
    containerStyle={{height: 40}}
    style={{
      backgroundColor: '#fafafa',
      borderTopLeftRadius: 10, borderTopRightRadius: 10,
      borderBottomLeftRadius: 10, borderBottomRightRadius: 10
  }}
    dropDownStyle={{
      backgroundColor: '#fafafa',
      borderBottomLeftRadius: 20, borderBottomRightRadius: 20
    }}
    onChangeItem={item => console.log(item.label, item.value)}
 
  
        /> */}
          {/* 
<DropDownPicker
    items={[
        {label: 'Item 1', value: 'roger1' ,selected:true},
        {label: 'Item 2', value: 'deco'}
    ]}
    defaultNull={this.state.item === null}
    placeholder="Select an options"
    placeholderStyle={{fontWeight: 'bold'}}
    onChangeItem={(item)=> {
        this.setState({
            item: item.value
        });
    }}
    dropDownMaxHeight={45}
/> */}
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
              marginVertical: 12,
              borderRadius: 20,
              backgroundColor: "#c026d3",
            }}
            onPress={() => {
              if (email != "" && password != "") {
                firebase
                  .auth()
                  .signInWithEmailAndPassword(email, password)
                  .then((result) => {
                    console.log(result);
                  })
                  .catch((error) => {
                    Alert.alert(
                      "Ohooo My Lord!.....",
                    
                      "invalid email or password" + "\n\n... You can check for SignUp if you are not registered with KUKUCASH ",
                      [
                        {
                          text: "OK",
                          onPress: () => console.log("OK"),
                          style: "cancel",
                        },

                        {
                          text: "Sign Up",
                          onPress: () => navigation.push("SignUp"),
                        },
                      ]
                    );
                    // alert(error)
                  });
              } else {
                alert("incorrect email or password");
              }
            }}
          >
            Log In
          </Button>
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: 20,
            }}
          >
            <Text style={{ color: "#fff" }}> Already you have Account ? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("SignUp")}
              style={{}}
            >
              <Text style={{ color: "yellow" ,fontSize:15 }}>SignUp NOw</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#9575CD",
  },
});
