import { StyleSheet, Text, View, TextInput, Button, ScrollView, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { useState } from 'react';
import { Card, SmallCard } from './Card';
import { pantryItemStyle, smallCardStyles, Fab } from '../styles/styles';
import Icon from "react-native-ico-material-design";



const Pantry = (props) => {
    //props.navBarChanger(true);

    const [pantryItems, setPantryItems] = useState([
        {
            id: 0,
            title: 'Onions',
            quantity: 5,
            measure: 'st.'
        },
        {
            id: 1,
            title: 'chicken breast',
            quantity: 5,
            measure: 'kg'
        },
        {
            id: 2,
            title: 'Cream',
            quantity: 2,
            measure: 'lt'
        },
        {
            id: 3,
            title: 'Pepper',
            quantity: 1,
            measure: 'st.'
        },
        {
            id: 4,
            title: 'Onions',
            quantity: 5,
            measure: 'st.'
        },
        {
            id: 5,
            title: 'chicken breast',
            quantity: 5,
            measure: 'kg'
        },
        {
            id: 6,
            title: 'Cream',
            quantity: 2,
            measure: 'lt'
        },
        {
            id: 7,
            title: 'Pepper',
            quantity: 1,
            measure: 'st.'
        },
    ]);


    const renderItem = ({ item }) => (
        <SmallCard title={item.title} />
    );

    return (

        <View style={pantryItemStyle.superView}>

            <TouchableOpacity activeOpacity={0.7} onPress={()=>{console.log('press')}} style={Fab.TouchableOpacityStyle}>

                <Icon name="add-plus-button" group="material-design"></Icon>

            </TouchableOpacity>

            <FlatList

                data={pantryItems}
                renderItem={renderItem}
                keyExtractor={(item) => {
                    item.id
                }}
                snapToAlignment="start"
                decelerationRate={"fast"}
                snapToInterval={Dimensions.get("window").width}
            />
        </View>
    )
}

export default Pantry;