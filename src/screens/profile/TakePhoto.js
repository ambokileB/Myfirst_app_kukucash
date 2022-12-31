import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Image ,ScrollView,Alert,Pressable,ImageBackground} from 'react-native';
import { Camera } from 'expo-camera';
import { Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';


export  function TakePhoto({navigation}) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');

      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync()
      setHasGalleryPermission(cameraStatus.status === 'granted');
    })();
  }, []);

  const takePicture = async()=>{
    if (camera) {
      const data = await camera.takePictureAsync(null)
      
      setProfilePicture(data.uri)
      
    }

  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setProfilePicture(result.assets[0].uri);
    }
  };

  if (hasCameraPermission === null || hasGalleryPermission === null) {
    return <View />;
  }
  if (hasCameraPermission === false || hasGalleryPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
      <Camera 
      ref= {ref =>setCamera(ref)}
      style={styles.fixedRatio} 
      type={type}
      // ratio={'1:1'}
      />
      </View>
         <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
         <Pressable
          mode='contained'
            style={styles.button}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={{backgroundColor:'#9C27B0',paddingHorizontal:2,padding:5,color:'white'}}> Flip Camera</Text>
          </Pressable>
          <Pressable
          mode='contained'
          onPress={()=>takePicture()}
          >
            <Text style={{backgroundColor:'#9C27B0',paddingHorizontal:2,padding:5,color:'white'}}>Take picture</Text>
            </Pressable>

          <Pressable
          mode='contained'
          onPress={()=>pickImage()}
          >
            <Text style={{backgroundColor:'#9C27B0',paddingHorizontal:2,padding:5,color:'white'}}>Choose picture</Text>
          </Pressable>
         </View>
                   
            {profilePicture && <ImageBackground source={{uri:profilePicture}} style={{flex:1.3}}>
            <Button
          style={{padding:3,justifyContent:'flex-end',paddingRight:12,backgroundColor:'#9575CD'}}
          
          onPress={()=>navigation.navigate("save",{profilePicture})}
          >
            <Text style={{color:'white',paddingHorizontal:22,padding:12,bottom:-203,textAlign:'center',fontSize:17}}>Save Profile Photo</Text>
          </Button>
                </ImageBackground>}
        

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  cameraContainer:{
    flex:1,
    flexDirection:'row'
  },
  fixedRatio:{
    flex:1,
    aspectRatio:1
  }


});