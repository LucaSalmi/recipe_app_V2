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

const RECIPE_COLLECTION = "recipies"

/* CRUD */
export const Crud = {

    jsonTest: () => {
        const jsonObj = require('../src/test.json')

        
        
        
        
        for (let recipe of jsonObj.recipes){

            let instructions = recipe.instructions;

            while (instructions.includes("<ol>") || instructions.includes("<li>") || instructions.includes("</ol>") || instructions.includes("</li>")) {
                instructions = instructions.replace("<ol>", "");
                instructions = instructions.replace("<li>", "");
                instructions = instructions.replace("</ol>", "");
                instructions = instructions.replace("</li>", "");
            };
            

            db.collection(RECIPE_COLLECTION).doc(recipe.id.toString()).set(
            {
                id: recipe.id,
                title: recipe.title, 
                image: recipe.image, 
                instructions: instructions,
            })
           
            const SUB_COLLECTION_NAME = "ingredients"
            let ingredientId = 0
           

            for(let ingredientname of recipe.extendedIngredients){
                
                db.collection(RECIPE_COLLECTION).doc(recipe.id.toString()).collection(SUB_COLLECTION_NAME).doc(ingredientId.toString()).set({name: ingredientname.name, amount: ingredientname.amount, unit: ingredientname.unit})
                ingredientId++

            }

        }
    },

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

    getRecipies: async(setRecipeData) => {
        
        let documents;
        const events = firebase.firestore().collection(RECIPE_COLLECTION)
        await events.get().then((querySnapshot) => {
            const tempDoc = querySnapshot.docs.map((doc) => {
                return {id: doc.id, ...doc.data()}
            })
            documents = tempDoc;
            setRecipeData(documents)
        })
        
        
        
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

