import { StyleSheet, Text, View, TextInput, Button, ScrollView, FlatList, Dimensions, Pressable } from 'react-native';
import { useState } from 'react';
import { BigCard, SmallCard } from './Card';
import { bigCardStyles, recipePage } from '../styles/styles';
import SearchBar from './SearchBar.js';
import AppManager from '../utils/AppManager.js'
import { Constants } from '../utils/Constants';
import { Crud } from '../src/db.js';


export const DATA = [
    {
        id: 0,
        title: 'Delicious banana bread',
        cookingTime: '25 min'
        
    },
    {
        id: 1,
        title: "Bananasplit with icecream",
        cookingTime: '15 min'
    },
    {
        id: 3,
        title: "Meatball parm",
        cookingTime: '20 min'
    },
    {
        id: 4,
        title: "Goomba bread with a slice of ham",
        cookingTime: '10 min'
    },
]

const Recipes = (props) => {

    const [jsonString, setJsonString] = useState("Loading...");
    
    
    fetch('http://10.0.2.2/danne/test.json')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(JSON.stringify(data));
        setJsonString(JSON.stringify(data));
        //Crud.createJSON(JSON.stringify(data));
    })
    .catch((err)=> console.log(err));
    

    
    

    const renderItem = ({ item }) => (
        
        <Pressable onPress={ () => {
            AppManager.currentRecipe = item
            props.setScreen(Constants.RECIPEDETAILS)
        }}>
            <BigCard title={item.title} style={bigCardStyles.container} topCard={bigCardStyles.topCard} cookingTime={item.cookingTime} />
        </Pressable>
        
    );

    return (
        <View style={recipePage.recipeContainer}>
            <SearchBar/>
            
            <ScrollView>
                <Text>{jsonString}</Text>
            </ScrollView>

            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={(item) => {
                    item.id
                }}
                horizontal
                snapToAlignment="start"
                decelerationRate={"fast"}
                snapToInterval={Dimensions.get("window").width}
            />
        </View>
    );

}

export default Recipes;