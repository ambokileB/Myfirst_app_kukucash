import React, { useEffect, useState, useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  Image,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  TouchableHighlight,
  ScrollView,
  Pressable,
} from "react-native";
import { Button } from "react-native-paper";
import {useCart} from "react-use-cart";

import firebase from "../../util/firebase";


import Iconmenu from "react-native-vector-icons/Fontisto";

import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const { height, width } = Dimensions.get("screen");

const catego = [
  {
    id: 1,
    status: "ALL",
  },
  {
    id: 2,
    status: "VET",
  },
  {
    id: 3,
    status: "EQUIPMENT",
  },
  {
    id: 4,
    status: "TRANSPORTER",
  },
  {
    id: 5,
    status: "BUYER",
  },
  {
    id: 6,
    status: "PUOTLY",
  },
];

function HomeScreen({ navigation }){


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

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [postslist, setPostslist] = useState(posts);
  const [products, setProducts] = useState([]);

  // const [temp, setTemp] = useState(recievedProduct([]));

  const [selectedCategory, setSeletedCategory] = useState();
  const [filteredProduct, setFilteredProduct] = React.useState([]);

  useEffect(() => {
  
    console.log("your post", posts);
  }, []);

  // Function to get filtered list
  function getFilteredList() {
    // Avoid filter when selectedCategory is null
    if (!selectedCategory) {
      return posts;
    }
    if (selectedCategory == "ALL") {
      return posts;
    }
    return posts.filter((item) => item.category === selectedCategory);
  }

  // Avoid duplicate function calls with useMemo
  var filteredList = useMemo(getFilteredList, [selectedCategory, posts]);





  const fetchPostFromFireBase = async () => {
    // const subscriber = firebase
    firebase
    .firestore()
    .collection("posts")
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

    
  };

 


  useEffect(() => {
    fetchPostFromFireBase();
  }, []);







  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#CDCDCD",
          flexDirection: "row",
        }}
      >
        <StatusBar backgroundColor="#9C27B0" />
        <Text style={{ marginRight: 5, fontSize: 23, color: "#9C27B0" }}>
          Loading{" "}
        </Text>
        <ActivityIndicator animating={true} color="#9C27B0" />
      </View>
    );
  }

  const handleSignOut = async () => {
    try {
      await firebase.auth().signOut();
      console.log("Sign Out successfully");
    } catch (error) {
      console.log(error);
    }
  };

  function renderProduct({ item, key }){
    return (
 

      <Pressable
        onPress={() => {}}
        style={styles.cardContainer}
      >
        <View
          style={{
            // padding: 10,
            paddingVertical: 5,
            paddingHorizontal: 5,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
         
            <Image
            source={{ uri: item.userProfilePicture }}
            style={{
              height:42,
              width:42,
              borderRadius: 25,
              borderWidth:1.7,
              borderColor:'#9575CD'
            }}
             />
      
          <Text
            style={{
              alignSelf: "center",
              fontWeight: "bold",
              fontSize: 12,
              fontStyle: "normal",
              color: "#9C27B0",
            }}
          >
            {/* {item.owner.lenght < 6 ? item.owner.slice(0,2)+'...':item.owner} */}
            {item.owner }
          </Text>
        </View>
        <View style={{ height: .5, backgroundColor: "#9C27B0" }} />
        
        <Pressable
 
        onPress={() => navigation.navigate("NewDetailsScreen", { data:item , id: key})}
        style={{ minHeight: 240, paddingTop: 1 }}>
          <Image
            source={{ uri: item.imagePicture }}
            style={{
              minHeight: 240,
              // minWidth:400
            }}
          />
        </Pressable>
        <View style={{ padding: 9, color: "#fff" }}>
          <Text style={{ color: "#000", fontSize: 13 }}>{item.title}</Text>
        </View>
      </Pressable>
    );
  };

  function renderCategory({ item, index }){
    return (
      <TouchableOpacity
        onPress={() => {
          setSeletedCategory(item.status);
        }}
      >
        <View
          style={[
            styles.buttonCategory,
            {
              backgroundColor:
                selectedCategory == index.status ? "#e0e0e0" : "#fff",
            },
          ]}
        >
          <Text style={{paddingVertical:1,fontSize:10}}>{item.status}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#9C27B0" />

      <View style={styles.header}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 5,
            paddingTop:12,
           
          }}
        >
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
                marginBottom: 4,
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
              color: "#fff",
              fontWeight: "bold",
              fontSize: 20,
              textAlign: "center",
              alignItems: "center",
             
            }}
          >
            KUKUCASH
          </Text>

          <TouchableOpacity onPress={() => navigation.navigate("Cart")} style={{display:'flex',flexDirection:'row'}}>
            <Iconmenu name="favorite" size={23} color="#fff" />
          <Text>  {totalUniqueItems}</Text>
          </TouchableOpacity>
        </View>
        {/* categories backgroundColor:'#9C27B0',  */}

        <View
          style={{
            padding: 5,
            backgroundColor: "#9C27B0",
            borderWidth: 2,
            borderColor: "#CDCDCD",
            borderRadius: 23,
            marginHorizontal: 7,
          }}
        >
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={catego}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderCategory}
          />
        </View>
      </View>

      {/* render products */}

      <View
        style={{
          paddingVertical: 12,
          paddingHorizontal: 0,
          backgroundColor: "#E1E1E1",
          borderTopStartRadius: 12,
          borderTopEndRadius: 12,
          marginTop: 5,
          marginBottom: 20,
          height: (height / 3) * 2.4,
        }}
      >
        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={filteredList}
          keyExtractor={(item) => item.key.toString()}
          
          renderItem={renderProduct}
          contentContainerStyle={{
            paddingVertical: 8,
          }}
        />



      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: "#9575CD",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#CDCDCD",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    elevation: 10,
  },
  body: {
    flex: 1,
    // backgroundColor:'#CED4DA',
    backgroundColor: "#EBEFF4",
    paddingHorizontal: 15,
    paddingVertical: 4,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    marginTop: 12,
  },
  card: {
    height: 320,
    width: 180,
    backgroundColor: "#CED4DA",
    padding: 2,
    marginBottom: 12,
    borderRadius: 23,
    marginHorizontal: 5,
  },
  listTab: {
    flexDirection: "row",
  },

  btnTab: {
    // padding:12,
    paddingHorizontal: 8,
    flexDirection: "row",
    height: 40,
    alignItems: "center",

    borderColor: "#EBEBEB",
    // padding:10,
  },
  textTab: {
    fontSize: 16,
  },
  btnTabActive: {
    backgroundColor: "#E6838D",
    padding: 5,
    borderRadius: 12,
  },
  textTabActive: {
    color: "#fff",
  },

  itemContainer: {
    flexDirection: "row",
    paddingVertical: 15,
    justifyContent: "space-between",
  },
  buttonCategory: {
    paddingHorizontal: 23,
    paddingVertical: 5,
    backgroundColor: "#fff",
    marginHorizontal: 7,
    borderRadius: 12,
  },
  cardContainer: {
    flex: 1,
    backgroundColor: "white",
    marginHorizontal: 2,
    
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 0,
    borderColor: "#9C27B0",
    shadowOffset: {
      height: 10,
      width: 10,
    },
    shadowColor: "red",
    shadowOpacity: 0.8,
  },
});
