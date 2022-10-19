import { StyleSheet, Text, View, TextInput, Button, ScrollView, TouchableOpacity, FlatList, Dimensions, Alert, KeyboardAvoidingView, Modal } from 'react-native';
import { useState, useEffect } from 'react';
import { pantryItemStyle, bigCardStyles, Fab, shoplistPage, SearchBarStyle, pantryCardStyles, customModalStyles } from '../styles/styles';
import Icon from "react-native-ico-material-design";
import { ingredients } from '../PantryData';
import { PantryItem } from '../PantryItem';
import RadioButtonContainer from './RadioButtonsContainer';
import AppManager from '../utils/AppManager.js';
import { Constants } from '../utils/Constants.js';
import { Crud } from '../src/db.js'

const Pantry = (props) => {

    const [showSheet, setShowSheet] = useState(false);
    const [isVisible, setisVisible] = useState(false);
    const [searchText, setSearchText] = useState();
    const [itemToAdd, setItemToAdd] = useState();
    const [foundItem, setFoundItem] = useState([]);
    const [pantryItems, setPantryItems] = useState([
        new PantryItem(-1, " by clicking the button below", "adding", "Start ")
    ]);
    const [initiated, setInitiated] = useState(false);


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

    useEffect(() => {
        if (!initiated) {
            if (AppManager.uid.length > 0) {
                //Async

                Crud.getPantry(setPantryItems);
            }
            setInitiated(true);
        }
    });

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

    function deleteItem(props) {
        let x = [];
        for (const ingredient of pantryItems) {
            if (ingredient.id != props.currentItem.id) {
                let temp = ingredient;
                x.push(temp);
            } else {
                Crud.updatePantry(ingredient, false);
            }
        }
        setPantryItems(x);
    }

    //Alert to confirm the elimination of an item in the pantry
    const deleteItemAlert = (props) => {
        let currentItem = props.item;
        Alert.alert(
            props.item.quantity + props.item.measure + props.item.title,
            "What do You want to do?",
            [
                {
                    text: "Return",
                    style: "cancel",

                },
                {
                    text: "Delete", onPress: () => {
                        deleteItem(currentItem = { currentItem });
                    }
                },
                {
                    text: "Modify", onPress: () => {
                        setItemToAdd(currentItem);
                        deleteItem(currentItem = { currentItem });
                        toggleSheet();
                        toggleModal();
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

    const notLoggedAlert = () => {
        Alert.alert(
            "Not Logged In",
            "You need to login to use this functionality..",
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
                            onSelectionChange={() => {

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

                        <View style={customModalStyles.buttonsContainer}>
                            <Button
                                title='Save'
                                disabled={saveInactive}
                                onPress={() => {

                                    let i = pantryItems;
                                    i.push(itemToAdd);
                                    setPantryItems(i);
                                    Crud.updatePantry(itemToAdd, true);
                                    toggleReadyToSave();
                                    toggleModal();
                                    toggleSheet();
                                }}
                            />
                            
                            <Button title='Delete'
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
                if (AppManager.isLoggedIn) {
                    toggleSheet();
                } else {
                    notLoggedAlert();
                }
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

            {/* View in the Sheet to search and add new items to pantry */}
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