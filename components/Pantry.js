import { StyleSheet, Text, View, TextInput, Button, ScrollView, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { useState } from 'react';
import { Card, PantryCard, SmallCard } from './Card';
import { pantryItemStyle, bigCardStyles, Fab, shoplistPage, SearchBarStyle, pantryCardStyles } from '../styles/styles';
import Icon from "react-native-ico-material-design";
import { ingredients } from '../PantryData';



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
        <SearchCard title={item} />
    );

    function SearchCard(myProps) {
        return (
            <View style={pantryCardStyles.superView}>
                <View onTouchStart={() => {
                    let i = pantryItems;
                    i.push({id: 10, title: myProps.title, quantity: 1, measure: 'st.'})
                    setPantryItems([...i, pantryItems]);
                }} style={[pantryCardStyles.container, bigCardStyles.elevation]}>
                    <Text>{myProps.title}</Text>
                </View>
            </View>
        );
    }

    return (

        <View style={pantryItemStyle.superView}>

            <TouchableOpacity activeOpacity={0.7} onPress={() => {
                console.log('press');
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
                        setSearchText(input);
                        setFoundItem(showResults(searchText));
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

const tempStyle = StyleSheet.create({
    myText: {
        color: 'red',
        fontSize: 15,
    },
});

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