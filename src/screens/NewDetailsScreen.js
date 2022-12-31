import React,{useEffect,useState} from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  Image,
  ScrollView,
  Pressable,
  ToastAndroid,

} from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import {useCart} from "react-use-cart";

import Back from "react-native-vector-icons/MaterialCommunityIcons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";











// image:require("../../assets/logo/logo.png"),






const NewDetailsScreen = ({ route, navigation }) => {


  function showToast() {
    ToastAndroid.show('successfully! Product Viewed', ToastAndroid.SHORT);
  }



  const {addItem} = useCart();


  const {data,id} = route.params;
  const persons = [
    {
    id: data.key,
    name: data.name,
    price: data.price,
        quantity: 1
    },
   
 
  ]


useEffect(() => {
  console.log("cart data: ",data);

},[])




  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor="#9C27B0" />

  

      <KeyboardAwareScrollView>
        <ImageBackground
          source={{ uri: data.imagePicture }}
          style={{ height: 600, justifyContent: "flex-end" }}
        >
          <View
            onPress={() => navigation.goBack()}
            style={{
              backgroundColor: "#E1E1E1",
              borderRadius: 20,
              width: 40,
              padding: 2,
              alignSelf: "auto",
              top: -450,
            }}
          >
            <Back
              name="arrow-left"
              size={33}
              onPress={() => navigation.goBack()}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 12,
            }}
          >
            <TouchableOpacity
              style={{ backgroundColor: "blue", padding: 7, borderRadius: 9 }}
              onPress={() => {}}
            >
              <Text style={{ color: "#fff", fontSize: 10 }}>
                +255{data.phonenumber}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ backgroundColor: "blue", padding: 7, borderRadius: 9 }}
              onPress={() => {}}
            >
              <Text style={{ color: "#fff", fontSize: 10 }}>
                {data.email}
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>

        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent:'space-around',
            backgroundColor: "#EBEFF4",
            paddingHorizontal: 17,
            paddingVertical: 12,
            elevation: 10,
            margin: 5,
            shadowOffset: {
              height: 3,
              width: 2,
            },
            shadowColor: "grey",
            shadowOpacity: 0.7,
          }}
        >
          <Text style={{ paddingLeft: 0, fontSize: 20, color: "#848788" }}>
            {" "}
            Product Caption
          </Text>
         <View style={{flexDirection:'column'}}>
         <Text style={{ padding: 12 }}> {data.title} </Text>
          <Text style={{ padding: 12 }}>Price : {data.price} Tsh </Text>
         </View>
        </View>

        <View
          style={{
            flex: 1,
            backgroundColor: "#EBEFF4",
            paddingHorizontal: 17,
            paddingVertical: 12,
            elevation: 10,
            margin: 5,
            shadowOffset: {
              height: 3,
              width: 2,
            },
            shadowColor: "grey",
            shadowOpacity: 0.7,
          }}
        >
          <Text style={{ paddingLeft: 0, fontSize: 20, color: "#848788" }}>
            {" "}
            Product Descriptios
          </Text>
          <Text style={{ paddingLeft: 12 }}>
            {" "}
            Product name : {data.name}
          </Text>
          <Text style={{ padding: 12 }}> {data.description} </Text>
        </View>

        <View
          style={{
            flex: 1,
            backgroundColor: "#EBEFF4",
            paddingHorizontal: 17,
            paddingVertical: 12,
            elevation: 10,
            margin: 5,
            shadowOffset: {
              height: 3,
              width: 2,
            },
            shadowColor: "grey",
            shadowOpacity: 0.7,
          }}
        >
            <Text style={{ paddingLeft: 0, fontSize: 20, color: "#848788" }}>
       
       Personal Descriptios
     </Text>
        <View style={{
          padding: 0,
          flexDirection: "row",
          marginBottom:22
          

        }}>
           
          <Image 
          source={{uri:data.userProfilePicture}}
          style={{ 
            height:100,
            width:100,
            padding: 12 }}/>
            <View>
          
          <Text style={{ paddingLeft: 12 }}>
            userName:  <Text style={{fontWeight:'bold'}}>{data.owner}</Text> 
          </Text>
          <Text style={{ paddingLeft: 12 }}>
            User Location: <Text style={{fontWeight:'bold'}}>Mlimba</Text>
          </Text>
          <Text style={{ paddingLeft: 12,fontSize: 13 }}>
          Address: 
          <Text style={{fontWeight:'bold'}}>P.O BOX 70, Morogoro</Text>
        
          </Text>
          <Text style={{ paddingLeft: 12,}}>
            Work Status:<Text style={{fontWeight:'bold'}}> {data.category}</Text>
          </Text>
            </View>
        </View>
          
             

          <View
            style={{
              padding: 0,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Pressable
              onPress={() =>{}}
              style={{
                padding: 12,
                backgroundColor: "#846699",
                borderRadius: 23,
              }}
            >
              {/* <Text
                style={{
                  color: "#fff",
                  fontSize:13,
                  fontWeight: "bold",
                  fontStyle: "italic",
                }}
              >
                Add to favorite
              </Text> */}




{persons.map((person) => {
  return (
    <View key={id}>
     
      <Pressable onPress={() => addItem(person)}><Text style={{color:'#fff'}}>Add to cart</Text></Pressable>
    </View>
  );
})}

            </Pressable>
            <Pressable
     
              onPress={showToast}
              style={{
                padding: 12,
                backgroundColor: "#846699",
                borderRadius: 23,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 13,
                  fontWeight: "bold",
                  fontStyle: "italic",
                }}
              >
                Mark as View
              </Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAwareScrollView>


     

      </SafeAreaView>

  );
};

export default NewDetailsScreen;

const styles = StyleSheet.create({});


{/* <View style={{
  padding:1 }}
 
  >
       {persons.map((person) => {
  return (
    <View key={id}>
     
      <Button onPress={() => addItem(person)}>Add to cart</Button>
    </View>
  );
})}

  </View> */}