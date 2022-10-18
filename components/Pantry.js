import { StyleSheet, Text, View, TextInput, Button, ScrollView, TouchableOpacity, FlatList, Dimensions, Alert, KeyboardAvoidingView, Modal } from 'react-native';
import { useState } from 'react';
import { Card, PantryCard, SmallCard } from './Card';
import { pantryItemStyle, bigCardStyles, Fab, shoplistPage, SearchBarStyle, pantryCardStyles, customModalStyles } from '../styles/styles';
import Icon from "react-native-ico-material-design";
import { ingredients } from '../PantryData';
import { PantryItem } from '../PantryItem';
import RadioButton from './RadioButton';
import RadioButtonContainer from './RadioButtonsContainer';

const Pantry = (props) => {

    const [showSheet, setShowSheet] = useState(false);
    const [isVisible, setisVisible] = useState(false);
    const [searchText, setSearchText] = useState();
    const [itemToAdd, setItemToAdd] = useState();

    const radioData = [
        {
            text: "Gr.",
        },
        {
            text: "Kg.",
        },
        {
            text: "Lt.",
        },
        {
            text: "P.",
        },
        {
            text: "Dl.",
        },
        {
            text: "Pc.",
        },
    ];


    const toggleSheet = () => {
        let newBool = !showSheet;
        setShowSheet(newBool);
        props.navBarChanger(newBool);
        resetSearch();
    };

    const toggleModal = () => {
        let newBool = !isVisible;
        setisVisible(newBool);
    };

    const [foundItem, setFoundItem] = useState([]);

    const [pantryItems, setPantryItems] = useState([]);

    const pantryItemCard = ({ item }) => (
        <PantryCard item={item} />
    );

    const searchResultCard = ({ item }) => (
        <SearchCard title={item} />
    );

    const onRadioButtonPress = (itemIdx) => {
        let temp = itemToAdd;
        temp.measure = radioData[itemIdx].text
        setItemToAdd(temp);
        console.log(temp)
    };

    function rngID() {
        return Math.floor(Math.random() * 9999);
    }

    function resetSearch() {
        setFoundItem([]);
        setSearchText("");
    }
    //Alert to confirm the elimination of an item in the pantry
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
    //this Alert triggers when an Item is already present in pantry 
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

    //The modal that houses the quantity inputs for new item added to the pantry
    const QuantityModal = () => {

        const [saveInactive, setSaveInactive] = useState(true);

        const toggleReadyToSave = () => {
            let newBool = !saveInactive;
            setSaveInactive(newBool);
        };

        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={isVisible}
            >
                <View style={customModalStyles.centeredView}>
                    <View style={customModalStyles.modalView}>
                        <Text
                            style={customModalStyles.textSize}>How much do you have?
                        </Text>

                        <TextInput
                            keyboardType='numeric'
                            style={customModalStyles.inputStyle}
                            onEndEditing={() => {

                                toggleReadyToSave();

                            }}
                            onChangeText={(input) => {
                                let temp = itemToAdd;
                                temp.quantity = input;
                                setItemToAdd(temp);
                            }}
                        />
                        <View style={customModalStyles.row}>
                            <RadioButtonContainer values={radioData} onPress={onRadioButtonPress} />
                        </View>

                        <View style={customModalStyles.row}>
                            <Button title='Save'
                                disabled={saveInactive}
                                onPress={() => {

                                    let i = pantryItems;
                                    i.push(itemToAdd);
                                    setPantryItems(i);
                                    toggleReadyToSave();
                                    toggleModal();
                                    toggleSheet();
                                }}
                            />
                            <Button title='Cancel'
                                onPress={() => {
                                    toggleModal();
                                    toggleReadyToSave();

                                }}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
    //card in the main page of the pantry
    function PantryCard(myProps) {
        return (
            <View style={pantryCardStyles.superView}>
                <View onTouchStart={() => {

                    deleteItemAlert(myProps)

                }} style={[pantryCardStyles.container, bigCardStyles.elevation]}>
                    <Text>{myProps.item.quantity}</Text>
                    <Text>{myProps.item.measure}</Text>
                    <Text>{myProps.item.title}</Text>
                </View>
            </View>
        );
    }

    //card in the add page of the pantry
    function SearchCard(myProps) {
        let doubleItem = false;

        return (
            <View style={pantryCardStyles.superView}>
                <View onTouchStart={() => {
                    //let i = pantryItems;
                    for (const item of pantryItems) {

                        if (item.title == myProps.title) {
                            doubleItem = true;
                            break;
                        }
                    }

                    if (!doubleItem) {
                        let pantryItem = new PantryItem(rngID(), myProps.title, radioData[0].text)
                        setItemToAdd(pantryItem);
                        toggleModal();

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
            {/* FAB */}
            <TouchableOpacity activeOpacity={0.7} onPress={() => {
                toggleSheet();
            }} style={Fab.TouchableOpacityStyle}>

                <Icon name={showSheet ? "clear-button" : "add-plus-button"} group="material-design"></Icon>

            </TouchableOpacity>

            {/* List of Items in Pantry */}
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

            {/* View in the Sheet to search and ass new items to pantry */}
            <KeyboardAvoidingView
                style={showSheet ? shoplistPage.sheetContainer : { display: "none" }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}>

                <QuantityModal />

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