import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  FlatList,
  Dimensions,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import Icon from "react-native-ico-material-design";

const RecipeDetails = (props) => {
  const imageSource = "../assets/jerkchicken.jpg";

  const recipeName = "Jerk chicken with cocoa rice";

  return (
    <View>
      <View>
        <ImageBackground style={styles.image} source={require(imageSource)}>
          <TouchableOpacity
            style={styles.topCardLeft}
            onPress={() => {
              props.setScreen(props.previousPage);
            }}
          ></TouchableOpacity>

          <View style={styles.topCard}>
            <TouchableOpacity
              onPress={() => {
                props.setScreen(props.previousPage);
              }}
            >
              <Icon
                name="go-back-left-arrow"
                group="material-design"
                width="25"
                height="25"
              ></Icon>
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon
                name="favorite-heart-outline-button"
                group="material-design"
                width="25"
                height="25"
              ></Icon>
            </TouchableOpacity>
          </View>

          <View style={styles.detailTextContainer}>
            <Text style={styles.detailText}>{recipeName}</Text>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

export default RecipeDetails;

export const styles = StyleSheet.create({
  image: {
    /*
		height: Dimensions.get('window').height * 0.4,
		width: Dimensions.get('window').width,
        */
    width: "100%",
    height: Dimensions.get("window").height * 0.45,
  },
  topCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginStart: 25,
    marginTop: 20,
    marginEnd: 25,
  },
  bottomCard: {
    flexDirection: "column",
    marginBottom: 30,
    marginStart: 15,
  },
  detailText: {
    fontSize: 26,
    alignItems: "flex-start",
    color: "white",
    fontWeight: "bold",
  },
  detailTextContainer: {
    marginTop: Dimensions.get("window").height * 0.317,
    marginStart: 10,
    flexDirection: "row",
  },
});
