import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import { favoritePage, smallCardStyles } from '../styles/styles.js';
import SearchBar from './SearchBar.js';
import { SmallCard } from './Card';
import { DATA } from './Recipes.js';
import AppManager from '../utils/AppManager.js';
import { Constants } from '../utils/Constants.js';




const Favorite = (props) => {

    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        setTimeout(()=>{
            setRecipes(DATA);
        }, 500);
    });

	return (
        <View style={favoritePage.favoriteContainer}>
            <SearchBar />
            <ScrollView>   
                {recipes.length == 0 ? <Text style={{paddingTop: 100}}>Loading...</Text> : <Text style={{display: "none"}}>Hidden</Text>}
                
                {recipes.map((item, i)=><Pressable onPress={()=>{console.log(item); AppManager.currentRecipe = item; props.setScreen(Constants.RECIPEDETAILS)}}><SmallCard title={item.title} /></Pressable>)}
                
            </ScrollView>
        </View>
        
	);
}

export default Favorite;