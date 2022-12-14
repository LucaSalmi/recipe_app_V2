import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useState, useEffect } from "react";
import Icon from "react-native-ico-material-design";
import { LinearGradient } from "expo-linear-gradient";
import { IngredientsView } from "./Ingredients";
import InstructionsView from "./Instructions";
import AppManager from '../utils/AppManager.js'
import { Crud } from "../src/db";
import { pageStyles, recipePage } from "../styles/styles";
import { Constants } from "../utils/Constants";


const RecipeDetails = (props) => {
  const imageSource = "../assets/jerkchicken.jpg";
  const recipeName = "Jerk chicken with cocoa rice";

  const [count, setCount] = useState(Constants.DEFAULT_SERVINGS);
  const [heartEmpty, setFillHeart] = useState(true);

  const [ingredients, setIngredients] = useState([])
  const [roundedIngredients, setRoundedIngredients] = useState([]);
  const [initiated, setInitiated] = useState(false);

  const [hideAddButton, setHideAddButton] = useState(false);

  //Run once
  useEffect(() => {
    Crud.getIngredients(setIngredients)
  }, []);

  //Is called when this component is rendered to show correct amount per ingredients
  const changeRoundedIngredients = () => {

    let newRoundedIngredients = [];

    for (let i = 0; i < ingredients.length; i++) {
      let oldAmount = ingredients[i].amount.toString();

      let split = oldAmount.split(".");
      if (split.length < 2) {
        newRoundedIngredients.push(ingredients[i]);
        continue;
      }

      let firstDecimal = parseInt(split[1][0]);

      let newAmount = split[0];

      if (firstDecimal != 0) {
        newAmount += "." + firstDecimal;
      }

      if (parseFloat(newAmount) <= 0) {
        newAmount = "0.1";
      }

      let newIngredient = ingredients[i];
      newIngredient.amount = newAmount;

      newRoundedIngredients.push(newIngredient);
    }

    setRoundedIngredients(newRoundedIngredients);
  };

  //Is called every time the user presses + or - buttons for servings.
  const updateIngredientAmounts = (newCount) => {

    let newRoundedIngredients = [];

    for (let ingredient of ingredients) {

      let ingredientName = ingredient.name;
      let ingredientUnit = ingredient.unit;
      let oldAmount = ingredient.amount;

      let oneServing = oldAmount / Constants.DEFAULT_SERVINGS;
      let newAmount = (oneServing * newCount).toString();

      //Code for rounding decimals in amount
      let amountSplit = newAmount.split(".");
      if (amountSplit.length >= 2) {
        let decimals = amountSplit[1];
        let firstDecimal = decimals[0];
        newAmount = amountSplit[0] + "." + firstDecimal;
      }

      let roundedIngredient = { name: ingredientName, unit: ingredientUnit, amount: newAmount.toString() };
      newRoundedIngredients.push(roundedIngredient);
    }

    setRoundedIngredients(newRoundedIngredients);

    refreshCurrentTab();

  };

  useEffect(() => {

    if (ingredients.length > 0 && !initiated) {
      changeRoundedIngredients();
      setInitiated(true);
    }

  }, [ingredients]);

  const toggleHeart = () => {
   
    if (AppManager.uid.length == 0) {
      console.log("Must be logged in to add favorites");
      return;
    }

    //Firestore update
    Crud.updateFavorite(AppManager.uid, AppManager.currentRecipe.id, heartEmpty);

    //let toggle = !heartEmpty;
    setFillHeart((current) => !current);

  };

  const refreshCurrentTab = () => {
    const currentTabId = tabId;
    setTabId(LOADING);
    setTimeout(()=>{
      setTabId(currentTabId);
    }, 50);
  };

  const INGREDIENTS = 0;
  const INSTRUCTIONS = 1;
  const LOADING = 2;

  const [tabId, setTabId] = useState(INGREDIENTS);


  let tab;

  switch (tabId) {
    case INGREDIENTS:
      if (roundedIngredients.length > 0) {
        tab = <IngredientsView setTabId={setTabId}
          ingredients={roundedIngredients} />;
      }
      else {
        tab = <Text>Loading ingredients...</Text>;
      }
      

      break;

    case INSTRUCTIONS:
      tab = <InstructionsView setTabId={setTabId} />;
      break;
  }

  const changeTab = (tabName) => {
    setTabId(tabName);
  };

  const addToShoplist = () => {

    if(!AppManager.isLoggedIn){
      return;
    }

    let ingredientsToAdd = [];

    //Check pantry
    for (let ingredient of ingredients) {

      let found = false;

      for (let pantryItem of AppManager.pantryContent) {
        if (pantryItem.title == ingredient.name) {
          found = true;
        }
      }

      if (!found) {
        ingredientsToAdd.push(ingredient.name);
      }

      let tempRoundedIngredients = roundedIngredients;
      setRoundedIngredients([]);

      setTimeout(()=>{
        setRoundedIngredients(tempRoundedIngredients);
      }, 100);

    }

    let filteredIngredients = [];

    //Check shoplist
    for (let ingredientToAdd of ingredientsToAdd) {

      let found = false;

      for (let shoplistItem of AppManager.shoplistContent) {


        if (ingredientToAdd == shoplistItem.desc) {
          found = true
        }
      }

      if (!found) {
        filteredIngredients.push(ingredientToAdd);
      }
    }

    setHideAddButton(true);

    if (filteredIngredients.length < 1) {
      console.log("All ingredients already exists in shoplist or pantry.");
      Alert.alert(
        "Info",
        "All ingredients already exists in shoplist or pantry.",
        [
          {
            text: "Return",
            style: "cancel",

          },

        ]
      );
      return;
    }

    //Finally add to firestore
    for (let ingredient of filteredIngredients) {
      let item = { desc: ingredient, checked: false };
      Crud.updateShoplist(item, true);
      AppManager.shoplistContent.push(item);
    }

  };

  return (
    <View style={{ height: "100%", flex: 1 }}>
      <ScrollView>
        <View>
          <ImageBackground
            style={styles.image}
            source={{ uri: AppManager.currentRecipe.image }}
          >
            <LinearGradient
              style={[styles.image, styles.niceContainer]}
              colors={["transparent", "#000"]}
            >
              <View style={styles.topCard}>
                <TouchableOpacity
                  onPress={() => {
                    props.setScreen(AppManager.previousScreen);
                  }}
                  style={pageStyles.iconBackground}
                >
                  <Icon
                    name="go-back-left-arrow"
                    group="material-design"
                    width="20"
                    height="20"
                  ></Icon>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    toggleHeart();
                  }}
                  style={pageStyles.iconBackground}
                >
                  <Icon
                    style={
                      heartEmpty ? styles.bigHeartNotFill : styles.bigHeartFill
                    }
                    name={
                      heartEmpty
                        ? "favorite-heart-outline-button"
                        : "favorite-heart-button"
                    }
                    group="material-design"
                    width="25"
                    height="25"
                  ></Icon>
                </TouchableOpacity>
              </View>
              <View style={styles.bottomCard}>
                <Text style={styles.detailText}>
                  {AppManager.currentRecipe.title}
                </Text>
              </View>
            </LinearGradient>
          </ImageBackground>
        </View>


        <View>
          <LinearGradient colors={["transparent", "transparent"]}>
            <View>
              <View style={styles.topInfo}>
                <TouchableOpacity
                  disabled={count < 24 ? false : true}
                  onPress={() => {
                    let newCount = count + 2;
                    setCount(newCount);
                    updateIngredientAmounts(newCount);
                  }}
                >
                  <Icon
                    color={count < 24 ? "#000000" : "#B2BEB5"}
                    name="round-add-button"
                    width="25"
                    height="25"
                  ></Icon>
                </TouchableOpacity>

                <View
                  style={{
                    flexDirection: "column",
                    alignItems: "center",
                    marginHorizontal: 5,
                  }}
                >
                  <Text style={styles.detailTextTwo}>{count}</Text>
                  <Text style={{ marginTop: -10 }}>serv</Text>
                </View>

                <TouchableOpacity
                  disabled={count <= 2 ? true : false}
                  onPress={() => {
                    let newCount = count - 2;
                    setCount(newCount);
                    updateIngredientAmounts(newCount);
                  }}
                >
                  <Icon
                    color={count <= 2 ? "#B2BEB5" : "#000000"}
                    name="round-remove-button"
                    width="25"
                    height="25"
                  ></Icon>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.tabs}>

              <TouchableOpacity
                onPress={() => {
                  changeTab(INGREDIENTS);
                }}
                style={tabId == INGREDIENTS
                  ? recipePage.shadowProp
                  : recipePage.button}

              >

                <Text>
                  Ingredients
                </Text>

              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  changeTab(INSTRUCTIONS);
                }}
                style={tabId == INSTRUCTIONS
                  ? recipePage.shadowProp
                  : recipePage.button}
              >
                <Text>
                  Instructions
                </Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>

        <View>{tab}</View>

      </ScrollView>

      {AppManager.isLoggedIn && !hideAddButton ? <Button title="Add to shoplist" onPress={() => { addToShoplist() }}></Button> : <Text style={{display: "none"}}></Text>}

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
    height: Dimensions.get("window").height * 0.4,
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
    marginBottom: 10,
    marginStart: 15,
  },
  detailText: {
    fontSize: 26,
    alignItems: "flex-start",
    color: "white",
    fontWeight: "bold",
  },
  detailTextContainer: {
    marginStart: 10,
    flexDirection: "row",
    marginBottom: 10,
  },
  niceContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  detailTextTwo: {
    fontSize: 26,
    alignItems: "flex-start",
    color: "black",
    fontWeight: "bold",
  },
  topInfo: {
    flexDirection: "row-reverse",
    justifyContent: "center",
    alignItems: "center",
    marginStart: 15,
    marginTop: 10,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 9,
    marginBottom: 16,
  },
  bigHeartFill: {
    fill: "green",
  },
  bigHeartNotFill: {
    fill: "black",
  },
});
