// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const config = {
    apiKey: "AIzaSyCirTTc8qZNPeHClVNLlThzUuIf7sBMyCE",
    authDomain: "recipes-app-v2.firebaseapp.com",
    projectId: "recipes-app-v2",
    storageBucket: "recipes-app-v2.appspot.com",
    messagingSenderId: "296424842617",
    appId: "1:296424842617:web:69face62f1a2f5d6993ba8"  
};

// Initialize Firebase
let app = firebase.initializeApp(config);

export const db = app.firestore();

/* Google Sign-in */

const provider = new GoogleAuthProvider();

/* CRUD */

export const dbAddItem =  (item) => {

    const res = db.collection('cities').doc('Uppsala').set({name: "Luca", location: "Unknown"});

}