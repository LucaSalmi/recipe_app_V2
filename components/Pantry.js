import { StyleSheet, Text, View, TextInput, Button, ScrollView, TouchableOpacity, FlatList, Dimensions, Alert, KeyboardAvoidingView } from 'react-native';
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
        resetSearch();
    };

    const [foundItem, setFoundItem] = useState([]);

    const [pantryItems, setPantryItems] = useState([]);

    const pantryItemCard = ({ item }) => (
        <PantryCard item={item} />
    );
    const searchResultCard = ({ item }) => (
        <SearchCard title={item} />
    );

    function rngID() {
        return Math.floor(Math.random() * 9999);
    }

    function resetSearch() {
        setFoundItem([]);
        setSearchText("");
    }

    const deleteItemAlert = (props) => {
        Alert.alert(
            "Deleting Item",
            "Do you really want to remove " + props.item.title + " from your pantry?",
            [
                {
                    text: "No",
                    style: "cancel",
                    onPress: () => {
                        console.log(props.item)
                    }
                },
                {
                    text: "Yes", onPress: () => {
                        let x = [];
                        for (const ingredient of pantryItems) {
                            if (ingredient.id != props.item.id) {
                                let temp = ingredient;
                                x.push(temp);
                            }
                        }
                        setPantryItems(x);
                    }
                }
            ]
        );
    }

    const AlreadyAddedAlert = (props) => {
        Alert.alert(
            "You have this item already!",
            "Your pantry already has " + props.title,
            [
                {
                    text: "Ok",
                    style: "cancel",
                },
            ]
        );
    }

    function PantryCard(myProps) {
        return (
            <View style={pantryCardStyles.superView}>
                <View onTouchStart={() => {

                    deleteItemAlert(myProps)

                }} style={[pantryCardStyles.container, bigCardStyles.elevation]}>
                    <Text>{myProps.item.title}</Text>
                </View>
            </View>
        );
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
                        setPantryItems(i);
                        toggleSheet();
                    } else {
                        AlreadyAddedAlert(myProps);
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
                renderItem={pantryItemCard}
                keyExtractor={(item) => {
                    item.id
                }}
                snapToAlignment="start"
                decelerationRate={"fast"}
                snapToInterval={Dimensions.get("window").width}

            />

            <KeyboardAvoidingView
                style={showSheet ? shoplistPage.sheetContainer : { display: "none" }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <View style={SearchBarStyle.container}>
                    <TextInput value={searchText} onChangeText={(input) => {
                        let capitalized = input.toUpperCase();
                        setSearchText(input);
                        setFoundItem(showResults(capitalized));
                    }} style={SearchBarStyle.searchInput} placeholder="Search here..." />
                    <TouchableOpacity onPress={() => {
                        resetSearch();
                    }}>
                        {<Icon style={searchText == "" ? { display: "none" } : SearchBarStyle.icon} name="close-button" height="20" width="20" />}
                    </TouchableOpacity>
                </View>
                <FlatList

                    data={foundItem}
                    renderItem={searchResultCard}
                    keyExtractor={(item) => {
                        item.id
                    }}
                    snapToAlignment="start"
                    decelerationRate={"fast"}
                    snapToInterval={Dimensions.get("window").width}
                />
            </KeyboardAvoidingView>

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