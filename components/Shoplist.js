import { StyleSheet, Text, View, Button, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { danneShoplist } from '../styles/styles.js';
import SearchBar from './SearchBar.js';

var SingletonInstance = {
    items: [{desc: "Några pallar äpplen", checked: true}, {desc: "En trave bananer", checked:false}, {desc: "Ett litet, litet bär", checked:false}],
};

const Shoplist = (props) => {

    const [showSheet, setShowSheet] = useState(false);

    const [items, setItems] = useState([]);

    useEffect(() => {

        //Download users shoppinglist from firestore
        setTimeout(() => {
            setItems(SingletonInstance.items);
        }, 100);
        
    });

    const toggleSheet = () => {
        let newBool = !showSheet;
        setShowSheet(newBool);  
        props.navBarChanger(newBool);
    };

	return (
        <View style={danneShoplist.shoplistContainer}>
            <SearchBar />
            <View style={danneShoplist.headerContainer}>
                <Text style={danneShoplist.headerText}>SHOPLIST PAGE!</Text>
                <Button style={danneShoplist.filterButton} title="FILTER" onPress={() => { toggleSheet() }}></Button>
            </View>

            <ScrollView style={showSheet ? {display: "none"} : danneShoplist.shoppingItemsContainer}>
                {items.map((item, i)=><ItemRow key={i} itemName={item.desc} checked={item.checked} index={i}/>)}
            </ScrollView>
            
            <View style={showSheet ? danneShoplist.sheetContainer : {display: "none"}}>
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