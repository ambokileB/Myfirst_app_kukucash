import { StyleSheet, Text, View,TouchableOpacity ,Image} from 'react-native'
import React from 'react'


export const ProductCard = ({owner,title,image,onPress}) => {
  return (
    <TouchableOpacity
    
    style={styles.container}
    >
        <View style={{padding:10,paddingVertical:5,flexDirection:'row',justifyContent:'space-between'}}>
            <View style={{height:50,width:50,borderRadius:25,backgroundColor:'tomato',opacity:.6}}></View>
            <Text style={{alignSelf:'center',fontWeight:'700',fontSize:18,fontStyle:'italic',color:'#9C27B0'}}>{owner}</Text>
        </View>
        <View style={{height:4,backgroundColor:'#9C27B0'}}/>
        <View style={{height:240,padding:2}}>
            <Image
                source={{uri:image}}
                style={{
                    height:240,
                    
                }}
            />

            
            
        </View>
        <View style={{padding:12,color:'#fff'}}>
            <Text style={{color:'#000',fontSize:13}}>{title}</Text>
        </View>

    </TouchableOpacity>
 
  )
}



const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#EFEFEF',
        marginHorizontal:5,
        borderRadius:12,
        marginBottom:12,
        borderWidth:0,
        borderColor:'#9C27B0',
        shadowOffset:{
            height:10,
            width:10
        },
        shadowColor:'red',
        shadowOpacity:.8

       
    }
})