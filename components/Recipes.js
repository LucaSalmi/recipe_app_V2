import { StyleSheet, Text, View, TextInput, Button, ScrollView, FlatList, Dimensions, Pressable } from 'react-native';
import { useState } from 'react';
import { BigCard, SmallCard } from './Card';
import { bigCardStyles, recipePage } from '../styles/styles';
import SearchBar from './SearchBar.js';
import AppManager from '../utils/AppManager.js'

DATA = [
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

    const renderItem = ({ item }) => (
        
        <Pressable onPress={ () => {
            AppManager.currentRecipe = item
            props.setScreen(props.detailId)
        }}>
            <BigCard title={item.title} style={bigCardStyles.container} topCard={bigCardStyles.topCard} cookingTime={item.cookingTime} />
        </Pressable>
        
    );

    return (
        <View style={recipePage.recipeContainer}>
            <SearchBar/>
            

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