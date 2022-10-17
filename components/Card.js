
import { bigCardStyles, smallCardStyles, pantryCardStyles } from '../styles/styles';
import {StyleSheet, Text, View, TouchableOpacity } from 'react-native';
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
      <View style={[myProps.style, bigCardStyles.elevation]}>
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
      </View>
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

export function PantryCard(myProps) {
    return (
        <View style={pantryCardStyles.superView}>
            <View onTouchStart={() => {
              let x = myProps.array.pantryItems;
              x.splice(myProps.item)
              myProps.array.setPantryItems(x)

            }} style={[pantryCardStyles.container, bigCardStyles.elevation]}>
                <Text>{myProps.item.title}</Text>
            </View>
        </View>
    );
}

export function SearchCard(myProps) {
  return (
      <View style={pantryCardStyles.superView}>
          <View onTouchStart={() => {
            console.log("pressed")
          }} style={[pantryCardStyles.container, bigCardStyles.elevation]}>
              <Text>{myProps.title}</Text>
          </View>
      </View>
  );
}
