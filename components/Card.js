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

export function BigCard(myProps) {
  const [heartEmpty, setFillHeart] = useState(!myProps.isFavorite);


  const toggleHeart = () => {

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
          style={[{ flexDirection: "row-reverse" }, bigCardStyles.imageInCard]}
          source={{ uri: myProps.imageSource }}
        >
          <TouchableOpacity
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
              style={{ margin: 15 }}
            />
          </TouchableOpacity>
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

export function SmallCard(myProps) {
  return (
    <View style={smallCardStyles.superView}>
      <View style={[smallCardStyles.container, bigCardStyles.elevation]}>
        <Text>{myProps.title}</Text>
      </View>
    </View>
  );
}
