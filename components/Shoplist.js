import { StyleSheet, Text, View, Button, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { shoplistPage, Fab } from '../styles/styles.js';
import AppManager from '../utils/AppManager.js';
import SearchBar from './SearchBar.js';
import { Crud, generateUid } from '../src/db.js';
import Icon from "react-native-ico-material-design";
import { PantryItem } from '../PantryItem.js';


const Shoplist = (props) => {

    const [showSheet, setShowSheet] = useState(false);

    const [items, setItems] = useState(AppManager.shoplistContent);

    const [username, setUsername] = useState("Log on to use");

    useEffect(() => {

        if (AppManager.isLoggedIn) {
            setUsername(AppManager.username);
        }
    });

    const syncWithPantry = () => {

        let cleanedShoplist = [];
    
        for (const shopListItem of AppManager.shoplistContent) {
            if(shopListItem.checked){
                let temp = new PantryItem(generateUid(), shopListItem.desc);
                AppManager.pantryContent.push(temp);
                Crud.updateShoplist(shopListItem, false);
            }else{
                cleanedShoplist.push(shopListItem);
            }
        }
    
        setItems(cleanedShoplist);
        AppManager.shoplistContent = cleanedShoplist;
    
    }

    const toggleSheet = () => {
        let newBool = !showSheet;
        setShowSheet(newBool);
        props.navBarChanger(newBool);
    };

    return (
        <View style={shoplistPage.shoplistContainer}>
            <SearchBar />
            <View style={shoplistPage.headerContainer}>
                <Text style={shoplistPage.headerText}>{username} shopping list</Text>
                <Button style={shoplistPage.filterButton} title="FILTER" onPress={() => { toggleSheet() }}></Button>
            </View>

            <ScrollView style={showSheet ? { display: "none" } : shoplistPage.shoppingItemsContainer}>
                {items.map((item, i) => <ItemRow
                    key={i} itemName={item.desc} checked={item.checked} index={i} items={items} setItems={setItems} />)}
            </ScrollView>

            <TouchableOpacity activeOpacity={0.5} onPress={() => {
                if(AppManager.isLoggedIn){
                    syncWithPantry();
                }
            }} style={Fab.TouchableOpacityStyle}>
                <Icon name="synchronization-button-with-two-arrows" />
            </TouchableOpacity>

            <View style={showSheet ? shoplistPage.sheetContainer : { display: "none" }}>
                <Text>SHEET</Text>
            </View>

        </View>

    );
}

const ItemRow = (props) => {

    const [isReady, setIsReady] = useState(false);

    const [checked, setChecked] = useState(props.checked);

    const buttonPress = () => {

        let newCheckedValue = !checked;

        setChecked(newCheckedValue);

        let index = props.index;
        let newItems = props.items;
        newItems[index].checked = newCheckedValue;
        props.setItems(newItems);
        Crud.updateShoplist(newItems[index], true)

    };

    useEffect(() => {
        setTimeout(() => {
            setIsReady(true);
        }, 500);
    });

    return (
        <TouchableOpacity style={{ paddingTop: 5, paddingBottom: 5 }} onPress={() => { buttonPress() }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                {isReady ? <Text style={{ textDecorationLine: checked ? 'line-through' : '', textDecorationStyle: checked ? 'solid' : '' }}>{props.itemName}</Text> : <Text>Loading...</Text>}
                {isReady ? <Text style={{ width: 25, height: 25, borderStyle: 'solid', borderWidth: 1, borderColor: 'black', textAlign: 'center', paddingTop: 3.5 }}>{checked ? "X" : " "}</Text> : <Text>...</Text>}
            </View>

            <View style={{ borderBottomColor: 'black', borderBottomWidth: StyleSheet.hairlineWidth }} />

        </TouchableOpacity>
    );
}

export default Shoplist;