import { StyleSheet, Text, View, Button, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { shoplistPage } from '../styles/styles.js';
import AppManager from '../utils/AppManager.js';
import SearchBar from './SearchBar.js';

var SingletonInstance = {
    items: [{desc: "Några pallar äpplen", checked: true}, {desc: "En trave bananer", checked:false}, {desc: "Ett litet, litet bär", checked:false}],
};

const Shoplist = (props) => {

    const [showSheet, setShowSheet] = useState(false);

    const [items, setItems] = useState([]);

    const [username, setUsername] = useState("Guest");

    useEffect(() => {

        //Download users shoppinglist from firestore
        setTimeout(() => {
            setItems(SingletonInstance.items);
            setUsername(AppManager.username);
        }, 100);
        
    });

    const toggleSheet = () => {
        let newBool = !showSheet;
        setShowSheet(newBool);  
        props.navBarChanger(newBool);
    };

	return (
        <View style={shoplistPage.shoplistContainer}>
            <SearchBar />
            <View style={shoplistPage.headerContainer}>
                <Text style={shoplistPage.headerText}>{username}s shopping list</Text>
                <Button style={shoplistPage.filterButton} title="FILTER" onPress={() => { toggleSheet() }}></Button>
            </View>

            <ScrollView style={showSheet ? {display: "none"} : shoplistPage.shoppingItemsContainer}>
                {items.map((item, i)=><ItemRow key={i} itemName={item.desc} checked={item.checked} index={i}/>)}
            </ScrollView>
            
            <View style={showSheet ? shoplistPage.sheetContainer : {display: "none"}}>
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

        //Update on firestore
        let index = props.index;
        SingletonInstance.items[index].checked = newCheckedValue;
        
    };

    useEffect(() => {
        setTimeout(() => {
            setIsReady(true);
        }, 500);
    });

    return(
        <TouchableOpacity style={{paddingTop: 5, paddingBottom: 5}} onPress={() => {buttonPress()}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                {isReady ? <Text style={{textDecorationLine: checked ? 'line-through' : '', textDecorationStyle: checked ? 'solid' : ''}}>{props.itemName}</Text> : <Text>Loading...</Text>}
                {isReady ? <Text style={{width: 25, height: 25, borderStyle: 'solid', borderWidth: 1, borderColor: 'black', textAlign: 'center', paddingTop: 3.5}}>{checked ? "X" : " "}</Text> : <Text>...</Text>}
            </View>

            <View style={{borderBottomColor: 'black', borderBottomWidth: StyleSheet.hairlineWidth}}/>

        </TouchableOpacity>
         
    );

}

export default Shoplist;