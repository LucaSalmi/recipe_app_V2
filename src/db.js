// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const config = {
  apiKey: "AIzaSyDE0c47TKhRCZgsIK-H5UIownUr2Ma7Bok",
  authDomain: "recipe-app-v2-2d701.firebaseapp.com",
  projectId: "recipe-app-v2-2d701",
  storageBucket: "recipe-app-v2-2d701.appspot.com",
  messagingSenderId: "924786907123",
  appId: "1:924786907123:web:73d16a71186508cfe82486",
  measurementId: "G-4DS5YDRCL1"
};

// Initialize Firebase
let app = firebase.initializeApp(config);

export const db = app.firestore();

/* CRUD */

export const dbAddItem =  (item) => {

    const res = db.collection('cities').doc('Uppsala').set({name: "Luca", location: "Unknown"});

}