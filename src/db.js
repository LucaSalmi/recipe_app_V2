// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { DatePickerIOSComponent } from 'react-native';
import { PantryItem } from '../PantryItem';
import { Fab } from '../styles/styles';
import AppManager from '../utils/AppManager';

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

const USERS_COLLECTION = "users";
const RECIPE_COLLECTION = "recipies";
const FAVORITE_COLLECTION = "favorites";
const INGREDIENTS_COLLECTION = "ingredients"
const PANTRY_COLLECTION = "pantry";


/* CRUD */
export const Crud = {

    apiImport: () => {

        //Remove "return" if you really want to fetch API-data.
        console.log("Remove return if you really want to fetch API-data ( in Crud.apiImport() ).");
        return;

        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '071c24e17fmsh4275638029000d1p173340jsncf3efebc4e7a',
                'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
            }
        };

        fetch('https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?tags=italian&number=100&limitLicense=true', options)
            .then(response => {
                return response.json();
            })
            .then(data => {
                Crud.jsonTest(data);
                //setJsonString(JSON.stringify(data));
                //console.log(JSON.stringify(data));
                //Crud.createJSON(JSON.stringify(data));
            })
            .catch(err => console.error(err));

    },

    jsonTest: (jsonObj = null) => {

        if (jsonObj == null) {
            console.log("jsonObj is null in Crud.jsonTest()");
            return;
        }

        //For test data:
        //jsonObj = require('../src/test.json')

        for (let recipe of jsonObj.recipes) {

            console.log(recipe.title);
            console.log(recipe.image);

            for (let key in recipe) {
                if (recipe[key] == null) {
                    recipe[key] = "Unknown value";
                }
            }

            if (recipe.image == null || typeof recipe.image == "undefined") {
                recipe.image = "Unknown value";
            }

            console.log(recipe.image);

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
                    servings: recipe.servings,
                    readyInMinutes: recipe.readyInMinutes,
                    aggregateLikes: recipe.aggregateLikes,
                    image: recipe.image,
                    instructions: instructions,
                })

            const SUB_COLLECTION_NAME = "ingredients"
            let ingredientId = 0


            for (let ingredientname of recipe.extendedIngredients) {

                db.collection(RECIPE_COLLECTION).doc(recipe.id.toString()).collection(SUB_COLLECTION_NAME).doc(ingredientId.toString()).set({ name: ingredientname.name, amount: ingredientname.amount, unit: ingredientname.unit })
                ingredientId++

            }

        }
    },

    addUser: async (username, password) => {

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
        let userData = { id: "" };
        return userData;
    },

    getRecipies: async (setRecipeData) => {

        let documents;
        const events = firebase.firestore().collection(RECIPE_COLLECTION)
        await events.get().then((querySnapshot) => {
            const tempDoc = querySnapshot.docs.map((doc) => {
                return {id: doc.id, isFavorite: false, ...doc.data()}

            })
            documents = tempDoc;
            setRecipeData(documents)
            AppManager.allRecipes = documents;
        })



    },

    getIngredients: async (setIngredients) => {
        
        const location = firebase.firestore()
        .collection(RECIPE_COLLECTION)
        .doc(AppManager.currentRecipe.id.toString())
        .collection(INGREDIENTS_COLLECTION)
        await location.get().then((querySnapshot) => {
            const documents = querySnapshot.docs.map((doc) => {
                return {id: doc.id, ...doc.data()}
            })
            setIngredients(documents)
            
        })

    },

    updateFavorite: (uid, recipeId, add) => {

        console.log("Add?" + add);



        if (add) {
            db.collection(USERS_COLLECTION).doc(uid.toString()).collection(FAVORITE_COLLECTION).doc(recipeId.toString()).set({ id: recipeId.toString() });
        }
        else {
            db.collection(USERS_COLLECTION).doc(uid.toString()).collection(FAVORITE_COLLECTION).doc(recipeId.toString()).delete().then(() => {
                console.log("Document successfully deleted!");
            }).catch((error) => {
                console.error("Error removing document: ", error);
            });
        }
    },

    getFavorites: async (setFavorites) => {

        let favoriteIds = [];

        const events = firebase.firestore().collection(USERS_COLLECTION).doc(AppManager.uid.toString()).collection(FAVORITE_COLLECTION)
        await events.get().then((querySnapshot) => {
            const tempDoc = querySnapshot.docs.map((doc) => {
                return { id: doc.id, ...doc.data() }
            })
            for (let document of tempDoc) {
                favoriteIds.push(document.id.toString());
            }
        })

        let allRecipies = AppManager.allRecipes;

        let documents = [];

        for (let recipe of allRecipies) {
            if (recipe.id == favoriteIds[0]) {
                console.log(true);
            }
            if (favoriteIds.includes(recipe.id.toString())) {
                documents.push(recipe);
            }
        }

        setFavorites(documents);
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
        db.collection("JSON").doc("test").set({ content: jsonString });
    },

    getPantry: async (setPantryItems) => {

        const events = firebase.firestore().collection(USERS_COLLECTION).doc(AppManager.uid.toString()).collection(PANTRY_COLLECTION)
        await events.get().then((querySnapshot) => {
            const tempDoc = querySnapshot.docs.map((doc) => {
                return { id: doc.id, ...doc.data() }
            })
            let array = [];
            for (let document of tempDoc) {
                let item = new PantryItem(document.id, document.title);
                array.push(item);
            }
            setPantryItems(array);
        })
    },

    updatePantry: (pantryItem, add) => {

        console.log("Add?" + add);

        if (add) {
            db.collection(USERS_COLLECTION).doc(AppManager.uid.toString())
                .collection(PANTRY_COLLECTION)
                .doc(pantryItem.id.toString())
                .set({ id: pantryItem.id.toString(), title: pantryItem.title.toString()});
        }
        else {
            db.collection(USERS_COLLECTION).doc(AppManager.uid.toString()).collection(PANTRY_COLLECTION).doc(pantryItem.id.toString()).delete().then(() => {
                console.log("Document successfully deleted!");
            }).catch((error) => {
                console.error("Error removing document: ", error);
            });
        }
    },

};

export const generateUid = () => {
    let uid = "";

    for (let i = 0; i < 32; i++) {
        let char = Math.floor(Math.random() * 10);
        uid += char;
    }

    return uid;
}

