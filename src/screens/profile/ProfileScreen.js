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
  Image,
  Pressable,
} from "react-native";

import firebase from "../../../util/firebase";

import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import { Button } from "react-native-paper";
import { color } from "react-native-reanimated";


function ProfileScreen ({ navigation }) {
  const [initializing, setInitializing] = useState(true);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [image, setImage] = useState([]);
  const [posts, setPosts] = useState([]);
  // const [profilePicture, setProfilePicture] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();



 















  // function fetchUserPosts() {
  //   return (dispatch) => {
  //     firebase
  //       .firestore()
  //       .collection("posts")
  //       .doc(firebase.auth().currentUser.uid)
  //       .orderBy("creation", "asc")
  //       .get()
  //       .then((snapshot) => {
  //         let posts = snapshot.docs.map((doc) => {
  //           const data = doc.data();
  //           const id = doc.id;
  //           return { id, ...data };
  //         });
  //         console.log(posts);
  //       });
  //   };
  // }
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

 


  useEffect(() => {
    fetchUserProfilePicture();
  }, []);

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    const user = firebase.auth().currentUser.uid;
    const subscriber = firebase
      .firestore()
      .collection("posts")
      .where("userId", "==", firebase.auth().currentUser.uid)
      .orderBy("creation", "desc")

      .onSnapshot((querySnaphot) => {
        const posts = [];

        querySnaphot.forEach((documentSnapshot) => {
          posts.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
            category: documentSnapshot.data().category,
            image: documentSnapshot.data().image,
          });
        });
        setPosts(posts);
        setLoading(false);
      });
    return () => subscriber();
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <View>
        <Text>Please Go to Login</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* <Text>Welcome {user.email}</Text> */}
      <StatusBar backgroundColor="#9C27B0" />

      <View style={styles.header}>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
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

          <Text style={{color:'#fff',fontSize:16,fontWeight:'bold'}}>Powered By  KUKUCASH</Text>
          <Text>KKC</Text>

         
       
        </View>

      
           
            <TouchableOpacity 
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 55,
                  alignSelf: "center",
                  backgroundColor: "#9575CD",
                  borderWidth:2,
                  borderColor: "yellowgreen",
                  justifyContent: "center",
              
                }}

             onPress={() => navigation.navigate("takePhoto")}>

          
                <Image
                  source={{ uri: image.profileImage }}
                  style={{
                    //  flex: 1,
                     height: 100,
                width: 100,
                borderRadius: 55,
                alignSelf: "center",  
                      }}
                />
              
                   </TouchableOpacity>


        
       

          <TouchableOpacity 
           onPress={() => uploadImage()}
            ><Text style={{textAlign:'center',color:'white'}}>{image.nickName}</Text></TouchableOpacity>
           
        
        
        <View
          style={{
            
            flexDirection: "row",
            justifyContent: "space-between",
             alignItems: "center",
       
        
          }}
        >
          <Button onPress={() => {}}>
            
            <Text style={{ color: "#fff" , fontSize:12}}>Setting</Text>{" "}
          </Button>
          <Text style={{ color: "#fff" , fontSize:12}}>{user.email}</Text>
          <Button onPress={() => {}}>
            
            <Text style={{ color: "#fff" , fontSize:12}}> Update info</Text>{" "}
          </Button>
        </View>
        {/* <View style={{ borderBottomWidth: 2, borderBottomColor: "#fff" }} /> */}
      </View>

      <View
        style={{
          display:'flex',
          flexGrow: .2,
          
          paddingHorizontal: 5,
          paddingVertical: 12,
          backgroundColor: "#fff",
         
        }}
      >
        <FlatList
          numColumns={2}
          horizontal={false}
          data={posts}
          renderItem={({ item }) => (
            <View
              style={{
                flex: 1 / 2,
                backgroundColor: "transparent",
                justifyContent: "space-around",
                paddingHorizontal: 0,
              }}
            >
              <Image
                source={{ uri: item.imagePicture }}
                style={{
                  flex: 1,
                  aspectRatio: 1 / 1,
                }}
              />

              <Text
                style={{ color: "#9C27B0", textAlign: "justify", fontSize: 12 }}
              >
                {item.name}
              </Text>
              <Text
                style={{ color: "#fff", textAlign: "justify", fontSize: 12 }}
              >
                {item.category}
              </Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    display:'flex',
    flexGrow: 1,

    backgroundColor: "#fff",
  },
  header: {
    display:'flex',
    flexGrow: .2,
    // backgroundColor: "#a855f7",
    backgroundColor: "#9575CD",
    justifyContent: "space-between",
    paddingHorizontal: 4,
    paddingVertical: 12,
    paddingTop:32,

  },
});
