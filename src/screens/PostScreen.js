import React, { Component, useState, setState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  Platform,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  StatusBar,
  Alert,
  Image,
  Modal,
  Pressable,
} from "react-native";
import { TextInput, Button, FAB, Portal, Provider } from "react-native-paper";

import * as MediaLibrary from "expo-media-library";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Iconpost from "react-native-vector-icons/MaterialIcons";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import firebase from "../../util/firebase";

import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import Cross from "react-native-vector-icons/MaterialCommunityIcons";
import Logout from "react-native-vector-icons/SimpleLineIcons";

import Iconmenu from "react-native-vector-icons/Ionicons";

const { height, width } = Dimensions.get("screen");

export default function PostScreen({ navigation }) {
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [userData, setUserData] = useState([]);
  const [userPicture, setUserPicture] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const [active, setactive] = useState(false);





  


  const fetchUserProfilePicture = async () => {
    firebase
      .firestore()
      .collection("userProfileImage")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          console.log("UserPicture", documentSnapshot.data());
          setUserPicture(documentSnapshot.data());
        }
      });
  };

 


  useEffect(() => {
    fetchUserProfilePicture();
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

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");

      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);

      setImage(data.uri);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
    }
  };

  if (hasCameraPermission === null || hasGalleryPermission === null) {
    return <View />;
  }
  if (hasCameraPermission === false || hasGalleryPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const uploadImage = async () => {
    if (name != "" && title != "" && description != "" && image != "") {
      const childPath = `posts/${
        firebase.auth().currentUser.uid
      }/${Math.random().toString(36)}`;

      const response = await fetch(image);
      const blob = await response.blob();

      const task = firebase.storage().ref().child(childPath).put(blob);

      const taskProgress = (snapshot) => {
        console.log(`transferred: ${snapshot.bytesTransferrred}`);
      };
      const taskCompleted = () => {
        task.snapshot.ref.getDownloadURL().then((snapshot) => {
         savePostData(snapshot);
         console.log(snapshot)
        })
      }

      const taskError = (snapshot) => {
        console.log(snapshot);
      };
      task.on("state_changed", taskProgress, taskError, taskCompleted);
    } else {
      Alert.alert("make sure to fill all field");
    }
  };

  const savePostData = (imagePicture) => {
    firebase
    .firestore()
    .collection("posts")
    .add({
      category: userData.userCategory,
      owner: userData.username,
      phonenumber: userData.phone,
      email: userData.email,
      displayName:userPicture.nickName,
      userProfilePicture:userPicture.profileImage,
      name,
      title,
      description,
      price,
      imagePicture,
      userId: firebase.auth().currentUser.uid,
      creation: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then(function () {
      Alert.alert(
        "FeedBack  ",
        "Your post Already uploaded succesfuly",
        [
          {
            text: "OK",
            onPress: () => navigation.navigate("Home"),
            style: "cancel",
          },

          {
            text: "Add Post Again",
            onPress: () => console.log("add again"),
          },
        ]
      );

      // navigation.navigate('Home')
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor="#9900EF" />

      <View
        style={{
          backgroundColor: "#9575CD",
          flex: 1 / 11,
          justifyContent: "flex-end",
          paddingTop:32,
        
        }}
      >
        <View style={{ justifyContent: "space-around", flexDirection: "row" }}>
          <Pressable onPress={navigation.toggleDrawer} style={{marginTop:6}}>
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
              textAlign: "center",
              fontSize: 23,
              fontWeight: "bold",
              color: "#fff",
            }}
          >
            Create New Post
          </Text>
          <Text></Text>
        </View>
        <View
          style={{
            borderBottomColor: "#fff",
            borderBottomWidth: 2,
            marginHorizontal: 5,
          }}
        />
      </View>
      <View
        style={{
          backgroundColor: "transparent",
          flex: 1,
          paddingHorizontal: 12,

          paddingVertical: 0,
          marginTop: 5,
        }}
      >
        <KeyboardAwareScrollView>
          {/* <View style={{
            padding:2,
            marginHorizontal:5,
            borderRadius:23,
            
        

          }}>
            <Text style={{textAlign:'center',fontWeight:'bold',color:'#fff',fontSize:12}}></Text>
            <TextInput 
            placeholder="product category"   
            style={styles.textInput}
            onChangeText={(category) => setCategory(category)}
             />
          </View> */}
          <View
            style={{
              padding: 2,

              borderRadius: 23,

              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                color: "#fff",
                fontSize: 12,
              }}
            ></Text>
            <TextInput
              placeholder="write product Name"
              style={styles.textInput}
              onChangeText={(name) => setName(name)}
            />
          </View>

          <View style={{
            padding:2,
           
            borderRadius:23,
           
            justifyContent:'space-between',
        

          }}>
            <Text style={{textAlign:'center',fontWeight:'bold',color:'#fff',fontSize:12}}>   </Text>
            <TextInput 
            placeholder="write product Price" 
            style={styles.textInput} 
            
            keyboardType='phone-pad'
            onChangeText={(price) => setPrice(price)}
            />
          </View>
          <View
            style={{
              padding: 2,

              borderRadius: 23,

              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                color: "#fff",
                fontSize: 12,
              }}
            ></Text>
            <TextInput
              placeholder="write product Caption"
              style={styles.textInput}
              onChangeText={(title) => setTitle(title)}
            />
          </View>
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              color: "#fff",
              fontSize: 12,
            }}
          ></Text>

          <View
            style={{
              padding: 1,

              borderRadius: 23,
            }}
          >
            <TextInput
              multiline
              numberOfLines={1}
              placeholder="write product Descriptions"
              style={{
                backgroundColor: "#CDCDCD",
                borderRadius: 20,
                paddingHorizontal: 20,
              }}
              onChangeText={(description) => setDescription(description)}
            />
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={active}
            onRequestClose={() => {
              console.warn("closed");
            }}
            >
            <View
              style={{
                flex: 2,
                backgroundColor: "#9900EF",
                alignItems: "center",
                marginTop: 20,

                marginHorizontal: 10,
                borderRadius: 25,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setactive(!active);
                }}
                style={{
                  justifyContent: "space-around",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Cross name="close" size={33} color="#fff" />

                <Text style={{ fontWeight: "400", color: "#fff" }}>
                  Close Camera Modal
                </Text>
              </TouchableOpacity>

              <View
                style={{ borderBottomWidth: 2, borderBottomColor: "#fff" }}
              />

              <View style={styles.cameraContainer}>
                <Camera
                  ref={(ref) => setCamera(ref)}
                  style={styles.fixedRatio}
                  type={type}
                  ratio={"1:1"}
                />
              </View>
              {image && (
                <Image
                  source={{ uri: image }}
                  style={{ flex: 1.3, borderRadius: 16 }}
                />
              )}

              <Provider>
                <Portal>
                  <FAB.Group
                    open={open}
                    icon={open ? "star" : "plus"}
                    actions={[
                      {
                        icon: "camera",
                        label: "Take photo",
                        onPress: () => takePicture(),
                      },
                      {
                        icon: "camera-flip",
                        label: "front camera",
                        onPress: () =>
                          setType(
                            type === Camera.Constants.Type.back
                              ? Camera.Constants.Type.front
                              : Camera.Constants.Type.back
                          ),
                        small: false,
                      },
                    ]}
                    onStateChange={onStateChange}
                    onPress={() => {
                      if (open) {
                      }
                    }}
                  />
                </Portal>
              </Provider>
            </View>
          </Modal>

          <View style={{ paddingHorizontal: 6 }}>
            <View
              style={{
                padding: 7,
                borderRadius: 30,
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <Logout
                name="camera"
                size={40}
                color="#CDCDCD"
                onPress={() => {
                  setactive(!active);
                }}
                style={{}}
              />

              <Text
                style={{
                  textAlign: "center",
                  alignSelf: "center",
                  color: "#fff",
                  fontSize: 17,
                  fontWeight: "700",
                }}
              >
                Choose Photo here
              </Text>

              <Iconpost
                name="image"
                size={40}
                color="#CDCDCD"
                onPress={() => pickImage()}
              />
            </View>
          </View>

          <View
            style={{
              padding: 1,
              marginHorizontal: 12,

              borderRadius: 23,

              paddingHorizontal: 12,
              alignItems: "center",
              marginTop: 7,
            }}
          >
            <View style={{ height: 350, width: 400 }}>
              {image && (
                <Image
                  source={{ uri: image }}
                  style={{ flex: 1, borderRadius: 16 }}
                />
              )}
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
      <View
        style={{
          backgroundColor: "transparent",
          flex: 1 / 5,
          justifyContent: "flex-end",
        }}
      >
        <Button
          mode="contained"
          onPress={() => uploadImage()}
          style={{
            padding: 1,
            marginHorizontal: 12,
            borderRadius: 23,
            backgroundColor: "#9575CD",
            bottom: 17,
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: "bold", color: "#fff" }}>
            Add Post
          </Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}

const Header = ({ props, navigation }) => (
  <View
    style={{
      backgroundColor: "transparent",
      flex: 1 / 11,
      justifyContent: "flex-end",
    }}
  >
    <View style={{ justifyContent: "space-around", flexDirection: "row" }}>
      <Iconmenu
        name="ios-menu"
        size={28}
        color="#ffffff"
        onPress={() => navigation.toggleDrawer}
        style={{}}
      />
      <Text
        style={{
          textAlign: "center",
          fontSize: 23,
          fontWeight: "bold",
          color: "#fff",
        }}
      >
        Create New Post
      </Text>
      <Text></Text>
    </View>
    <View
      style={{
        borderBottomColor: "#fff",
        borderBottomWidth: 2,
        marginHorizontal: 5,
      }}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#fff",
  },
  button: {
    marginHorizontal: 20,
    marginVertical: 12,
    borderRadius: 20,
  },
  textInput: {
    flex: 1,
    height: 50,

    marginBottom: 5,
    paddingHorizontal: 10,
    borderRadius: 7,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
  },
  cameraContainer: {
    flex: 1,
    flexDirection: "row",
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
  },
});
