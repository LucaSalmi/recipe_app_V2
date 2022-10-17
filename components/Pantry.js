import { StyleSheet, Text, View, TextInput, Button, ScrollView, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { useState } from 'react';
import { Card, PantryCard, SmallCard } from './Card';
import { pantryItemStyle, bigCardStyles, Fab, shoplistPage, SearchBarStyle, pantryCardStyles } from '../styles/styles';
import Icon from "react-native-ico-material-design";
import { ingredients } from '../PantryData';
import { PantryItem } from '../PantryItem';



const Pantry = (props) => {

    const [showSheet, setShowSheet] = useState(false);
    const [searchText, setSearchText] = useState()


    const toggleSheet = () => {
        let newBool = !showSheet;
        setShowSheet(newBool);
        props.navBarChanger(newBool);
    };

    const [foundItem, setFoundItem] = useState([]);

    const [pantryItems, setPantryItems] = useState([
        new PantryItem(rngID, "Black Pepper"),
        new PantryItem(rngID, "Chicken Breast"),
        new PantryItem(rngID, "Apple"),
        new PantryItem(rngID, "Beef Tenderloin"),
        new PantryItem(rngID, "Entrecote"),

    ]);

    const renderItem = ({ item }) => (
        <PantryCard item={item} />
    );
    const renderItem2 = ({ item }) => (
        <SearchCard title={item} />
    );

    function rngID() {
        return Math.floor(Math.random() * 9999);
    }

    function SearchCard(myProps) {
        let doubleItem = false;

        return (
            <View style={pantryCardStyles.superView}>
                <View onTouchStart={() => {
                    let i = pantryItems;
                    for (const item of i) {

                        if (item.title == myProps.title) {
                            doubleItem = true;
                            break;
                        }
                    }

                    if (!doubleItem) {
                        let pantryItem = new PantryItem(rngID(), myProps.title)
                        i.push(pantryItem)
                        setPantryItems([...i, pantryItems]);
                        toggleSheet();
                    }

                }} style={[pantryCardStyles.container, bigCardStyles.elevation]}>
                    <Text>{myProps.title}</Text>
                </View>
            </View>
        );
    }

    return (

        <View style={pantryItemStyle.superView}>

            <TouchableOpacity activeOpacity={0.7} onPress={() => {
                toggleSheet();
            }} style={Fab.TouchableOpacityStyle}>

                <Icon name={showSheet ? "clear-button" : "add-plus-button"} group="material-design"></Icon>

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

                <View style={SearchBarStyle.container}>
                    <TextInput value={searchText} onChangeText={(input) => {
                        let capitalized = input.toUpperCase();
                        setSearchText(input);
                        setFoundItem(showResults(capitalized));
                    }} style={SearchBarStyle.searchInput} placeholder="Search here..." />
                    <TouchableOpacity onPress={() => { setSearchText("") }}>
                        {<Icon style={searchText == "" ? { display: "none" } : SearchBarStyle.icon} name="close-button" height="20" width="20" />}
                    </TouchableOpacity>
                </View>
                <FlatList

                    data={foundItem}
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

function showResults(input) {
    let search = '';
    var foundItem = [];
    try {

        for (let i = 0; i < input.length; i++) {
            search = search + input[i];

            for (let i = 0; i < ingredients.length; i++) {

                if (ingredients[i].includes(search)) {
                    if (!foundItem.includes(ingredients[i])) {
                        foundItem.push(ingredients[i])
                    }
                }
            }
        }

    } catch (error) {
        console.log(error)
    }
    return foundItem;
}

export default Pantry;