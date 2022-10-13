import {StyleSheet, Text, View } from 'react-native';
import { bigCardStyles, smallCardStyles } from '../styles/styles';


export function Card(myProps) {

    return (
        <View style={myProps.isSmallCard ? [smallCardStyles.superView] : [bigCardStyles.superView]}>
          <View style={[myProps.style, bigCardStyles.elevation]}>
            <Text>{myProps.title}</Text>
        </View>  
        </View>
        
    );
}