import { StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';
import { useState } from 'react';
import { Card } from './Card';
import { smallCardStyles } from '../styles/styles';

pantryItems = [0,1,2,3,4]

const Pantry = (props) => {  

    return(
        <FullPantry></FullPantry>
    )
}

const EmptyPantry = () =>{
    return(
        <View>
        <Text>It looks empty in here! Start adding items to your pantry!</Text>
        <Button title='add' onPress={()=>{
            let i = 'apple';
            setPantryItems([0,1,2,3]);
        }}></Button>
        </View>
    )
}

const FullPantry = () =>{
    return(

        <ScrollView>
                {pantryItems.map((item, i)=><Card title={item} style={smallCardStyles.container} isSmallCard={true} />)}
        </ScrollView>
    )
}


export default Pantry;