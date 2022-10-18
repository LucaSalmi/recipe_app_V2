import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  FlatList,
  Dimensions,
  Pressable,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { BigCard, SmallCard } from "./Card";
import { bigCardStyles, recipePage } from "../styles/styles";
import SearchBar from "./SearchBar.js";
import AppManager from "../utils/AppManager.js";
import { Constants } from "../utils/Constants";
import { Crud } from "../src/db.js";

export var DATA = [
  {
    id: 0,
    title: "Delicious banana bread",
    cookingTime: "25 min",
  },
  {
    id: 1,
    title: "Bananasplit with icecream",
    cookingTime: "15 min",
  },
  {
    id: 3,
    title: "Meatball parm",
    cookingTime: "20 min",
  },
  {
    id: 4,
    title: "Goomba bread with a slice of ham",
    cookingTime: "10 min",
  },
];

const Recipes = (props) => {
  const [recipeData, setRecipeData] = useState([]);

  if (recipeData.length < 1) {
    Crud.getRecipies(setRecipeData);
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      id={item.id}
      onPress={() => {
        AppManager.currentRecipe = item;
        props.setScreen(Constants.RECIPEDETAILS);
      }}
    >
      <BigCard
        title={item.title}
        style={bigCardStyles.container}
        topCard={bigCardStyles.topCard}
        imageSource={item.image}
        cookingTime={item.cookingTime}
      />
    </TouchableOpacity>
  );

  return (
    <View style={recipePage.recipeContainer}>
      <SearchBar />
      <FlatList
        data={recipeData}
        renderItem={renderItem}
        keyExtractor={(item) => {
          item.id;
        }}
        horizontal
        snapToAlignment="start"
        decelerationRate={"fast"}
        snapToInterval={Dimensions.get("window").width}
      />
    </View>
  );
};

export default Recipes;
