
import { bigCardStyles, smallCardStyles, pantryCardStyles } from '../styles/styles';
import {StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import Icon from "react-native-ico-material-design";

export function BigCard(myProps) {

  return (
    <View
      style={
        myProps.isSmallCard
          ? [smallCardStyles.superView]
          : [bigCardStyles.superView]
      }
    >
      

      <ImageBackground style={[myProps.style, bigCardStyles.elevation, {resizeMode: "stretch"}]} source={{uri: myProps.imageSource}}>
        <TouchableOpacity style={myProps.topCard}>
          
          <Icon
            name="favorite-heart-outline-button"
            group="material-design"
            height="38"
            width="38"
          />
          
        </TouchableOpacity>

        <View style={bigCardStyles.bottomCard}>
          <View style={bigCardStyles.kokTid}>
            <Icon name="list-button-with-3-elements" group="material-design" />
            <Text style={{ marginLeft: 7 }}>{myProps.cookingTime}</Text>
          </View>
          <Text style={bigCardStyles.dishName}>{myProps.title}</Text>
        </View>

      </ImageBackground>
      
    </View>
  );
}

/*
export function BigCard(myProps) {

    return (
        <View style={bigCardStyles.superView}>
            <View style={[bigCardStyles.container, bigCardStyles.elevation]}>
                <Text>{myProps.title}</Text>
            </View>
        </View>

    );
}
*/

export function SmallCard(myProps) {
    return (
        <View style={smallCardStyles.superView}>
            <View style={[smallCardStyles.container, bigCardStyles.elevation]}>
                <Text>{myProps.title}</Text>
            </View>
        </View>

    );
}


