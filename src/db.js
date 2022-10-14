// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDE0c47TKhRCZgsIK-H5UIownUr2Ma7Bok",
  authDomain: "recipe-app-v2-2d701.firebaseapp.com",
  projectId: "recipe-app-v2-2d701",
  storageBucket: "recipe-app-v2-2d701.appspot.com",
  messagingSenderId: "924786907123",
  appId: "1:924786907123:web:73d16a71186508cfe82486",
  measurementId: "G-4DS5YDRCL1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = app.database();

/* CRUD */

export const dbAddItem =  (item) => {
    db.ref('/items').push({
        name: item
    });
}