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

  console.log("DANNE: " + myProps.recipeInstructions);

  const [heartEmpty, setFillHeart] = useState(true);
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


  const toggleHeart = () => {

    setFillHeart((current) => !current);
    if (AppManager.uid.length == 0) {
      console.log("Must be logged in to add favorites");
      return;
    }

    //Firestore update
    Crud.updateFavorite(AppManager.uid, myProps.recipeId, heartEmpty);

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
                justifyContent: "space-around",
              }}
            >
              <View
                style={[
                  bigCardStyles.veganAttribute,
                  {
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.5,
                    shadowRadius: 2,
                    elevation: 20,
                    borderBottomRightRadius: 10,
                  },
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

              <TouchableOpacity
                onPress={() => {
                  toggleHeart();
                }}
                style={[
                  bigCardStyles.cardBanner,
                  { height: 50, borderBottomLeftRadius: 10 },
                ]}
              >
                <Icon
                  style={[
                    heartEmpty ? styles.bigHeartNotFill : styles.bigHeartFill,
                    { margin: 15 },
                  ]}
                  name={
                    heartEmpty
                      ? "favorite-heart-outline-button"
                      : "favorite-heart-button"
                  }
                  group="material-design"
                  height="25"
                  width="25"
                />
              </TouchableOpacity>
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
