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
export const Crud = {

    addUser: async  (username, password) => {

        let documents;
        
        const events = firebase.firestore().collection('users')
        await events.get().then((querySnapshot) => {
            const tempDoc = querySnapshot.docs.map((doc) => {
                return { id: doc.id, ...doc.data() }
             })
             documents = tempDoc;

        })

        console.log(documents);

        for (let document of documents) {
            if (document.username == username) {
                //Username must be unique. Return false.
                return false;
            }
        }

        let userData = {
            username: username,
            password: password,
            firstName: "",
            secondName: "",
            email: "",
            phone: "",
        };

        let uid = generateUid();

        db.collection('users').doc(uid).set(userData);
        //Createing user successful. Returning the uid.
        return uid;
    },
    
    getUser: async (username, password) => {

        let documents;
        
        const events = firebase.firestore().collection('users')
        await events.get().then((querySnapshot) => {
            const tempDoc = querySnapshot.docs.map((doc) => {
                return { id: doc.id, ...doc.data() }
             })
             documents = tempDoc;

        })

        for (let document of documents) {
            if (document.username == username && document.password == password) {
                return document;
            }
        }

        //Return false if the user wasn't found
        let userData = {id: ""};
        return userData;
    },

    updateUser: (uid, userData) => {

       db.collection('users').doc(uid).set(userData);

    },

    createRecipies: (recipies) => {
        const collectionName = "recipies";

        
        for (let i = 0; i < recipies.length; i++) {
            let docId = i.toString();
            let recipe = recipies[i];

            db.collection(collectionName).doc(docId).set(recipe);
        }

    },

    createJSON: (jsonString) => {
        db.collection("JSON").doc("test").set({content: jsonString});
    },
    
};

const generateUid = () => {
    let uid = "";

    for (let i = 0; i < 32; i++) {
        let char = Math.floor(Math.random() * 10);
        uid += char;
    }

    return uid;
}

