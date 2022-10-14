// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

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

/* CRUD */

export const dbAddItem =  (item) => {

    const res = db.collection('cities').doc('Uppsala').set({name: "Luca", location: "Unknown"});

}

export const Crud = {

    addUser:  (username, password) => {

        const res = db.collection('users').doc(getUid()).set({username: username, password: password});
    
    },
    
    getUser: (username, password) => {
        
        //TODO!!!

    },
    
};

const getUid = () => {
    let uid = "";

    for (let i = 0; i < 32; i++) {
        let char = Math.floor(Math.random() * 10);
        uid += char;
    }

    return uid;
  }
