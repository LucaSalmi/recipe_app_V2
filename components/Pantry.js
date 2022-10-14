import { StyleSheet, Text, View, TextInput, Button, ScrollView, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { useState } from 'react';
import { Card, PantryCard, SmallCard } from './Card';
import { pantryItemStyle, smallCardStyles, Fab, shoplistPage } from '../styles/styles';
import Icon from "react-native-ico-material-design";
import { categories, meatCategories, fruits, vegetables, chicken, pig, cow, spices } from '../PantryData';



const Pantry = (props) => {

    const [showSheet, setShowSheet] = useState(false);

    const toggleSheet = () => {
        let newBool = !showSheet;
        setShowSheet(newBool);
        props.navBarChanger(newBool);
    };

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
        <PantryCard item={item} />
    );
    const renderItem2 = ({ item }) => (
        <Text title={item.title}>something</Text>
    );

    return (

        <View style={pantryItemStyle.superView}>

            <TouchableOpacity activeOpacity={0.7} onPress={() => {
                console.log('press');
                toggleSheet();
            }} style={Fab.TouchableOpacityStyle}>

                <Icon name= {showSheet ? "clear-button" : "add-plus-button"} group="material-design"></Icon>

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

            <View style={showSheet ? shoplistPage.sheetContainer : { display: "none" }}>

                <FlatList
                data={categories}
                renderItem={renderItem2}
                keyExtractor={(item) => {
                    item.id
                }}
                snapToAlignment="start"
                decelerationRate={"fast"}
                snapToInterval={Dimensions.get("window").width}
                />
            </View>

        </View>


    )
}

export default Pantry;