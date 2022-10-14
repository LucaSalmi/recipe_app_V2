import { StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';
import { useState } from 'react';
import { Card } from './Card';
import { pantryItemStyle, smallCardStyles } from '../styles/styles';


const Pantry = (props) => {

    const [pantryItems, setPantryItems] = useState([]);
    loaded = [0,1,2,3,4,5];

    const EmptyPantry = () => {
        return (
            <View style={pantryItemStyle.superView}>
                <Text>It looks empty in here! Start adding items to your pantry!</Text>
                <Button title='add' onPress={() => {
                    setPantryItems(...pantryItems, loaded)
                }}></Button>
            </View>
        )
    }

    const FullPantry = () => {
        return (

            <ScrollView>
                {pantryItems.map((item, i) => <Card title={item} style={pantryItemStyle.itemCard} isSmallCard={true} />)}
            </ScrollView>
        )
    }

    if (pantryItems.length <= 0) {
        return (
            <EmptyPantry />
        )
    } else {
        return (
            <FullPantry />
        )
    }


}




export default Pantry;