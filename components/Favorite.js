import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { favoritePage, smallCardStyles } from '../styles/styles.js';
import SearchBar from './SearchBar.js';
import { Card } from './Card';

var SingletonInstance = {
    recipes: [{id: 0, title: "First Card"}, {id: 1, title: "Second Card"}, {id: 2, title: "Third Card"}, {id: 3, title: "Fourth Card"}, {id: 3, title: "Fifth Card"}]
};


const Favorite = (props) => {

    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        setTimeout(()=>{
            setRecipes(SingletonInstance.recipes);
        }, 500);
    });

	return (
        <View style={favoritePage.favoriteContainer}>
            <SearchBar />
            <ScrollView>   
                {recipes.length == 0 ? <Text style={{paddingTop: 100}}>Loading...</Text> : <Text style={{display: "none"}}>Hidden</Text>}
                {recipes.map((item, i)=><Card title={item.title} style={smallCardStyles.container} isSmallCard={true} />)}
            </ScrollView>
        </View>
        
	);
}

export default Favorite;