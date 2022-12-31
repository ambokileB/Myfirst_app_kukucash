import firebase from 'firebase/compat/app';

import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyCJRIBGztqwGhnqai2IDT0fhjRi5_DpBXw",
  authDomain: "kukucash-f8c59.firebaseapp.com",
  projectId: "kukucash-f8c59",
  storageBucket: "kukucash-f8c59.appspot.com",
  messagingSenderId: "183659549461",
  appId: "1:183659549461:web:97c38a28ae6a178adccf1c",
  measurementId: "G-L5P5XQFH55"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}
 

 export default firebase;
