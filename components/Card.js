import {
  bigCardStyles,
  smallCardStyles,
  pantryCardStyles,
} from "../styles/styles";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Icon from "react-native-ico-material-design";
import { useState, useEffect } from "react";

export function BigCard(myProps) {
  const [heartEmpty, setFillHeart] = useState(true);

  const toggleHeart = () => {
    //let toggle = !heartEmpty;
    setFillHeart((current) => !current);
  };

  return (
    <View
      style={
        myProps.isSmallCard
          ? [smallCardStyles.superView]
          : [bigCardStyles.superView]
      }
    >
      <View style={[myProps.style, bigCardStyles.elevation]}>
        <TouchableOpacity
          style={myProps.topCard}
          onPress={() => {
            toggleHeart();
          }}
        >
          <Icon
            name={
              heartEmpty
                ? "favorite-heart-outline-button"
                : "favorite-heart-button"
            }
            group="material-design"
            height="38"
            width="38"
          />
        </TouchableOpacity>

        <View style={bigCardStyles.bottomCard}>
          <View style={bigCardStyles.kokTid}>
            <Icon name="set-timer-button" group="material-design" />
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
      <View style={[pantryCardStyles.container, bigCardStyles.elevation]}>
        <Text>{myProps.item.quantity}</Text>
        <Text>{myProps.item.measure}</Text>
        <Text> </Text>
        <Text>{myProps.item.title}</Text>
      </View>
    </View>
  );
}
