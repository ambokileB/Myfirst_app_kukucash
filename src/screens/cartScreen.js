import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Pressable,
  ScrollView
} from "react-native";
import { Header } from "../../components/Header";
import {useCart} from "react-use-cart";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";


var headerTitle = "Your ";

export const CartScreen = ({ navigation }) => {
  const {
    isEmpty,
    totalUniqueItems,
    items,
    totalItems,
    cartTotal,
    updateItemQuantity,
    removeItem,
    emptyCart
  } = useCart();

  if (isEmpty) return     <SafeAreaView style={{ flex: 1 }}>
  <StatusBar backgroundColor="#9C27B0" />
  <View
    style={{
      backgroundColor: "#9C27B0",
      padding: 12,
    }}
  >
    

    <Text
      style={{
        textAlign: "center",
        fontSize: 23,
        fontWeight: "bold",
        color: "#fff",
      }}
    >
      {headerTitle}Cart ({totalUniqueItems})
    </Text>
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
      padding: 5,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Text style={{ color: "#9C27B0" }}>You Have No any Products Here</Text>


    <Pressable
      style={{ alignItems: "stretch",marginTop:34 }}
      onPress={() => navigation.goBack()}
    >
      <Text
        style={{
          fontSize: 23,
          fontWeight: "bold",
          color: "#000",
        }}
      >
        Go Home 
      </Text>
    </Pressable>
  </View>
</SafeAreaView>;






  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor="#9C27B0" />
      <View
        style={{
          backgroundColor: "#9C27B0",
          padding: 12,
        }}
      >
       

        <Text
          style={{
            textAlign: "center",
            fontSize: 23,
            fontWeight: "bold",
            color: "#fff",
          }}
        >
          {headerTitle}Cart ({totalUniqueItems})
        </Text>
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
          padding: 5,
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}>







<ScrollView>  
{items.map((item) => {
        return (
                 
            <View key={item.id}>
            <View style={styles.cartCard
            }>
              <View style={{backgroundColor:'#fff',padding:12}}></View>
              <View style={{backgroundColor:'#fff',justifyContent:'center',width:50}}>
              <Text style={{fontSize:12}}>{item.name} </Text>
              </View>
              <View style={{backgroundColor:'#fff',padding:1,display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
              <Pressable onPress={() => updateItemQuantity(item.id, item.quantity + 1)}>
                <Text style={{paddingHorizontal:12,paddingVertical:1,}}>+</Text>
                </Pressable>
              <Text style={{paddingHorizontal:12,paddingVertical:1,borderWidth:1,borderColor:'#999'}}> {item.quantity}</Text>
              <Pressable onPress={() => updateItemQuantity(item.id, item.quantity - 1)}>
                <Text style={{paddingHorizontal:12,paddingVertical:1,}}>-</Text>
                </Pressable>
              </View>
              <View style={{backgroundColor:'#fff',justifyContent:'center'}}>
              <Text style={{fontSize:11}}>Tsh : {item.price}</Text>
              </View>

              <View style={{backgroundColor:'#fff',padding:2,marginLeft:12,justifyContent:'center'}}>
              <Pressable onPress={() => removeItem(item.id)}><Text style={{color:'red'}}>Remove</Text></Pressable>
              {/* <Text>remove</Text> */}
              </View>
            </View>
         
          </View>
       

        );
      })}
   </ScrollView>


   <Pressable
          style={{ alignItems: "stretch" }}
          onPress={() => navigation.goBack()}
        >
          <Text
            style={{
              fontSize: 23,
              fontWeight: "bold",
              color: "#777",
            }}
          >
            Go Home 
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cartCard:{
    flexGrow:1,
    height:100,
    
    marginTop:0,
    display: 'flex',
    flexDirection:'row',
    backgroundColor:'#fff',
    border:'2px',
    borderWidth:1,
    borderColor:'#999',
    borderLeftWidth:0,
    borderRightWidth:0,
    borderTopWidth:0

  }
});

