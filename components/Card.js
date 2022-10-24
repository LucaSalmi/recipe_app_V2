import {
  bigCardStyles,
  smallCardStyles,
  pantryCardStyles,
} from "../styles/styles";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import Icon from "react-native-ico-material-design";
import { useState, useEffect } from "react";
import { styles } from "./RecipeDetails";
import AppManager from '../utils/AppManager';
import { Crud } from '../src/db.js'
import { LinearGradient } from "expo-linear-gradient";

export function BigCard(myProps) {
  // stringArray
  const textAttributeArray = [
    "Vegan  🌱",
    "Editor's Choice  ⭐",
    "Easy-to-Cook  ⏳",
    "Recommended  🍳",
    "Speedrun Food :clock:",
    "Gamer food :console:",
    "",
  ];

  return (
    <View
      style={
        myProps.isSmallCard
          ? [smallCardStyles.superView]
          : [bigCardStyles.superView]
      }
    >
      <View style={[bigCardStyles.card]}>
        <ImageBackground
          style={bigCardStyles.imageInCard}
          source={{ uri: myProps.imageSource }}
        >

          <LinearGradient
            style={[
              bigCardStyles.imageInCard,
              { flexDirection: "row-reverse" },
            ]}
            colors={[
              //"#F3F3F3",
              "transparent",
              "transparent",
              "transparent",
              "transparent",
              "transparent",
              "transparent",
              "transparent",
            ]}
          >
            <View
              style={{
                flexDirection: "row",

              }}
            >
              <View
                style={[
                  bigCardStyles.veganAttribute,
                ]}
              >
                <Text
                  style={{
                    fontWeight: "700",
                    margin: 10,
                    color: "white",
                    fontSize: 15,
                  }}
                >
                  {textAttributeArray[0]}
                </Text>
              </View>
              <View>
                <Icon
                  style={
                    [styles.bigHeartFill,
                    bigCardStyles.favIcon]
                  }
                  name={
                    "favorite-heart-button"
                  }
                  group="material-design"
                  width="25"
                  height="25"
                ></Icon>
              </View>
            </View>
          </LinearGradient>
        </ImageBackground>

        <View style={bigCardStyles.bottomCard}>
          <View
            style={[bigCardStyles.kokTid, { marginStart: 8, marginTop: 8 }]}
          >
            <Icon name="set-timer-button" group="material-design" />
            <Text
              style={[
                bigCardStyles.kokTid,
                { marginLeft: 7, fontWeight: "500", fontSize: 16 },
              ]}
            >
              {"20 min"}
            </Text>

          </View>
          <Text
            style={[
              bigCardStyles.dishName,
              { marginStart: 10, marginBottom: 5 },
            ]}
            numberOfLines={1}
          >
            {myProps.title}
          </Text>
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

export const stylesTwo = StyleSheet.create({
  bigHeartFill: {
    fill: "green",
  },
  bigHeartNotFill: {
    fill: "black",
  },
});

export function SmallCard(myProps) {
  return (
    <View style={smallCardStyles.superView}>
      <View style={[smallCardStyles.container, bigCardStyles.elevation]}>
        <Text>{myProps.title}</Text>
      </View>
    </View>
  );
}
