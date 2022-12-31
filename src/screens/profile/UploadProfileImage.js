import React,{ useState,useEffect} from 'react'
import { View, Text ,Image} from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// To show TAsk completed with activityIndicator
//https://instamobile.io/mobile-development/react-native-firebase-storage/
//https://instamobile.io/react-native-tutorials/capturing-photos-and-videos-with-the-camera-in-react-native/


import firebase from '../../../util/firebase';

export function UploadProfileImage(props,{navigation}) {

    const [nickName, setNickName] = useState("")


    useEffect(() => {
        const uri= props.route.params.profilePicture;
      }, []);

    const uploadImage = async() =>{
        const uri= props.route.params.profilePicture;

        const childPath = `profileimage/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`;
        console.log(childPath)
        const response = await fetch(uri);
        const blob = await response.blob();

        const task = firebase
        .storage()
        .ref()
        .child(childPath)
        .put(blob)

        const taskProgress = snapshot =>{
            console.log(`transferred: ${snapshot.bytesTransferrred}`)
        }
        const taskCompleted = () =>{
            task.snapshot.ref.getDownloadURL().then((snapshot) =>{
                savePostData(snapshot);
                console.log(snapshot)
            })
        }

        const taskError = snapshot =>{
            console.log(snapshot)
        }
        task.on("state_changed",taskProgress,taskError,taskCompleted)

    }
    const savePostData = (profileImage) =>{
        firebase.firestore()
        .collection('userProfileImage')
        .doc(firebase.auth().currentUser.uid)
        .set({
            profileImage,
            nickName,
            creation:firebase.firestore.FieldValue.serverTimestamp()
        })
        .then((function (){
            props.navigation.navigate('profile')
        }))

    }
  return (
    <View style={{flex:1}}>
        <KeyboardAwareScrollView>
        <Image source={{uri:props.route.params.profilePicture}} style={{height:230,}}/>
        {/* <TextInput
            placeholder='Write your nickName That anyone will see..'
            onChangeText={(nickName) => setNickName(nickName)}
            /> */}
      <Button 
      mode='contained'
      onPress={()=>uploadImage()}
      >
          <Text>Upload Profile picture</Text>
      </Button>
      </KeyboardAwareScrollView>
    </View>
  )
}