import {StyleSheet, Text, View } from 'react-native';
import { bigCardStyles, smallCardStyles } from '../styles/styles';


export function BigCard(myProps) {

    return (
        <View style={bigCardStyles.superView}>
          <View style={[bigCardStyles.container, bigCardStyles.elevation]}>
            <Text>{myProps.title}</Text>
        </View>  
        </View>
        
    );
}

export function SmallCard(myProps) {

    return (
        <View style={smallCardStyles.superView}>
          <View style={[smallCardStyles.container, bigCardStyles.elevation]}>
            <Text>{myProps.title}</Text>
        </View>  
        </View>
        
    );
}