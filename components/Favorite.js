import { StyleSheet, Text, View, ScrollView, Pressable, Button } from 'react-native';
import { useState, useEffect } from 'react';
import { favoritePage, smallCardStyles } from '../styles/styles.js';
import SearchBar from './SearchBar.js';
import { SmallCard } from './Card';
import { DATA } from './Recipes.js';
import AppManager from '../utils/AppManager.js';
import { Constants } from '../utils/Constants.js';
import { Crud } from '../src/db.js'



const Favorite = (props) => {

    const [initiated, setInitiated] = useState(false);
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {

        if (!initiated) {

            if (AppManager.uid.length > 0) {
                //Async
                
                Crud.getFavorites(setRecipes)
            }

            setInitiated(true);
        }

    });

	return (
        <View style={favoritePage.favoriteContainer}>
            <SearchBar />
            <ScrollView>   

                {recipes.length <= 0 ? <Text style={{paddingTop: 100}}>Logged in? Added favorites?</Text> : <Text style={{display: "none"}}>Hidden</Text>}
                
                {recipes != "undefined" && recipes.length > 0 ? recipes.map((item, i)=><Pressable onPress={()=>{console.log(item); AppManager.currentRecipe = item; props.setScreen(Constants.RECIPEDETAILS)}}><SmallCard title={item.title} /></Pressable>) : <Text style={{display: "none"}}>Hidden</Text>}
                
            </ScrollView>
        </View>
        
	);
}

export default Favorite;