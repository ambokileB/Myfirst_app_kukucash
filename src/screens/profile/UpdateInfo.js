import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

const UpdateInfo = () => {



  const uploadImage = async () => {
    if (image != "") {
      const childPath = `imagefolder/${
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
          firebase
            .firestore()
            .collection("userProfilemage")
            .add({
              
              image,
              userId: firebase.auth().currentUser.uid,
              creation: firebase.firestore.FieldValue.serverTimestamp(),
            })
            .then(function () {
              Alert.alert(
                "FeedBack  ",
                "Your profile image uploaded succesfuly",
                [
                  {
                    text: "OK",
                    onPress: () => navigation.navigate("Home"),
                    style: "cancel",
                  },

                  {
                    text: "change image",
                    onPress: () => console.log("upload"),
                  },
                ]
              );

              // navigation.navigate('Home')
            });
        });
      };

      const taskError = (snapshot) => {
        console.log(snapshot);
      };
      task.on("state_changed", taskProgress, taskError, taskCompleted);
    } else {
      Alert.alert("make sure to fill all field");
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        <TouchableOpacity style={styles.virtualIMG}>
          <Text style={{ color: "#fff", fontSize: 23 }}>User Image</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inforContainer}>
        <View
          style={{ padding: 12, borderBottomWidth: 1, borderColor: "tomato" }}
        >
          <Text>User infor1</Text>
        </View>
        <View
          style={{ padding: 12, borderBottomWidth: 1, borderColor: "tomato" }}
        >
          <Text>User infor2</Text>
        </View>
        <View
          style={{ padding: 12, borderBottomWidth: 1, borderColor: "tomato" }}
        >
          <Text>User infor3</Text>
        </View>
        <View
          style={{ padding: 12, borderBottomWidth: 1, borderColor: "tomato" }}
        >
          <Text>User infor4</Text>
        </View>
        <View
          style={{ padding: 12, borderBottomWidth: 1, borderColor: "tomato" }}
        >
          <Text>User infor5</Text>
        </View>
      </View>
      <View style={{ padding: 12 }}>
        <TouchableOpacity style={styles.uploadButton}>
          <Text style={{ fontSize: 23, color: "#EFEFEF", fontWeight: "bold" }}>
            Update Info
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default UpdateInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  profileContainer: {
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  inforContainer: {
    flex: 2,
    justifyContent: "flex-start",
    paddingHorizontal: 20,
  },
  virtualIMG: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "tomato",
    alignItems: "center",
    justifyContent: "center",
  },
  uploadButton: {
    borderRadius: 20,
    paddingHorizontal: 12,
    backgroundColor: "tomato",
    justifyContent: "center",
    alignItems: "center",
    bottom: 20,
  },
});
