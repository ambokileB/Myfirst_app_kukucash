
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export const Header = (props) => {
  return (
    <View style={{
        backgroundColor:'transparent',
        padding:12,
       
      }}>
        <Text style={{
          textAlign:'center',
          fontSize:23,
          fontWeight:'bold',
          color:'#fff'
          }}>
            {props.title}
            </Text>
        <View style={{
          borderBottomColor:'#fff',
          borderBottomWidth:2,
          marginHorizontal:5,
        }}/>
    
      </View>
  )
}



const styles = StyleSheet.create({})


