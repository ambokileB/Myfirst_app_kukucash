import { StyleSheet, Text, View } from 'react-native'
import React,{useEffect,useState} from 'react'
import { SignedInStack,SignedOutStack } from '../src/navigation/StackNavigator'
import firebase from '../util/firebase'


 const Authnav = () => {
    const [currentUser,   setCurrentUser] = useState(null)

    const useHandler =user=>{
        user ? setCurrentUser(user) : setCurrentUser(null)

    }
   

    useEffect(()=>
     firebase.auth().onAuthStateChanged(user =>useHandler(user)) ,[])


  return <>{ currentUser ? <SignedInStack/>   : <SignedOutStack/>}</>
}


export default Authnav;