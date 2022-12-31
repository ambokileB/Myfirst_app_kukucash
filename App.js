import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import 'react-native-gesture-handler';
import  Authnav  from './inAthNavigation/Authnav'
import {CartProvider} from 'react-use-cart'

const App = () => {
  return (
  
    <NavigationContainer>
        <CartProvider> 
      <Authnav />
      </CartProvider>
    </NavigationContainer>
    
  )
}

export default App

const styles = StyleSheet.create({})