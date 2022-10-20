import { StatusBar } from "expo-status-bar";
import { Card } from "./components/Card";
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  SectionList,
} from "react-native";
import Recipes from "./components/Recipes.js";
import Favorite from "./components/Favorite.js";
import Shoplist from "./components/Shoplist.js";
import Pantry from "./components/Pantry.js";
import Profile from "./components/Profile.js";
import { pageStyles, bigCardStyles } from "./styles/styles.js";
import { useState, useEffect } from "react";
import Icon from "react-native-ico-material-design";

import RecipeDetails from "./components/RecipeDetails";
import { Constants } from "./utils/Constants";
import { Crud } from "./src/db.js";
import AppManager from "./utils/AppManager";

//testing more hello
//a comment from ankan, hello guys
//dev WHAT

export default function App() {
  const [recipeData, setRecipeData] = useState([]);

  if (recipeData.length < 1) {
    Crud.getRecipies(setRecipeData);
  }

  if (AppManager.allIngredients.length < 1) {
    Crud.getAllIngredients();
  }

  if (Platform.OS == "android") {
    if (recipeData.length > 0) {
      return <MainContent recipeData={recipeData} />;
    } else {
      return <Text>Loading...</Text>;
    }
  } else {
    if (recipeData.length > 0) {
      return (
        <SafeAreaView style={{ flex: 1 }}>
          <MainContent recipeData={recipeData} />
        </SafeAreaView>
      );
    } else {
      return <Text>Loading...</Text>;
    }
  }
}

const MainContent = (props) => {
  const RECIPES = 0;
  const FAVORITE = 1;
  const SHOPLIST = 2;
  const PANTRY = 3;
  const PROFILE = 4;
  const RECIPEDETAILS = 5;

  const previousScreen = Constants.RECIPES;

  const [screen, setScreen] = useState(Constants.RECIPES);

  const [hideNav, setHideNav] = useState(false);

  let view;

  switch (screen) {
    case Constants.RECIPES:
      view = <Recipes setScreen={setScreen} recipeData={props.recipeData} />;
      break;

    case Constants.FAVORITE:
      view = <Favorite setScreen={setScreen} />;
      break;

    case Constants.SHOPLIST:
      view = <Shoplist navBarChanger={setHideNav} />;
      break;

    case Constants.PANTRY:
      view = <Pantry navBarChanger={setHideNav} />;
      break;

    case Constants.PROFILE:
      view = <Profile props1={{ name: "test", styles: pageStyles }} />;
      break;

    case Constants.RECIPEDETAILS:
      view = (
        <RecipeDetails setScreen={setScreen} previousPage={previousScreen} />
      );
      break;
  }

  const changePage = (pageName) => {
    setScreen(pageName);
  };

  return (
    <View style={styles.container}>
      <View style={styles.currentPage}>{view}</View>
      <View style={hideNav ? styles.navBarHidden : styles.navBar}>
        <TouchableOpacity
          style={[
            styles.navButton,
            screen == RECIPES ? styles.activeButton : styles.navButton,
          ]}
          onPress={() => {
            changePage(Constants.RECIPES);
          }}
        >
          <Icon
            style={[
              styles.icon,
              screen == RECIPES ? { fill: "white" } : { fill: "black" },
            ]}
            name="list-button-with-3-elements"
            group="material-design"
          />
          <Text
            style={[
              screen == RECIPES ? { color: "white" } : { color: "black" },
            ]}
          >
            Recipes
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.navButton,
            screen == FAVORITE ? styles.activeButton : styles.navButton,
          ]}
          onPress={() => {
            changePage(Constants.FAVORITE);
          }}
        >
          <Icon
            style={[
              styles.icon,
              screen == FAVORITE ? { fill: "white" } : { fill: "black" },
            ]}
            name="favorite-heart-outline-button"
            group="material-design"
          />
          <Text
            style={[
              screen == FAVORITE ? { color: "white" } : { color: "black" },
            ]}
          >
            Favorites
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.navButton,
            screen == SHOPLIST ? styles.activeButton : styles.navButton,
          ]}
          onPress={() => {
            changePage(Constants.SHOPLIST);
          }}
        >
          <Icon
            style={[
              styles.icon,
              screen == SHOPLIST ? { fill: "white" } : { fill: "black" },
            ]}
            name="shopping-cart"
            group="basic"
          />
          <Text
            style={[
              screen == SHOPLIST ? { color: "white" } : { color: "black" },
            ]}
          >
            Shoplist
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.navButton,
            screen == PANTRY ? styles.activeButton : styles.navButton,
          ]}
          onPress={() => {
            changePage(Constants.PANTRY);
          }}
        >
          <Icon
            style={[
              styles.icon,
              screen == PANTRY ? { fill: "white" } : { fill: "black" },
            ]}
            name="rounded-add-button"
            group="material-design"
          />
          <Text
            style={[screen == PANTRY ? { color: "white" } : { color: "black" }]}
          >
            Pantry
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.navButton,
            screen == PROFILE ? styles.activeButton : styles.navButton,
          ]}
          onPress={() => {
            changePage(Constants.PROFILE);
          }}
        >
          <Icon
            style={[
              styles.icon,
              screen == PROFILE ? { fill: "white" } : { fill: "black" },
            ]}
            name="user-outline"
            group="material-design"
          />
          <Text
            style={[
              screen == PROFILE ? { color: "white" } : { color: "black" },
            ]}
          >
            Profile
          </Text>
        </TouchableOpacity>
      </View>

      <StatusBar hidden={false} backgroundColor="white" translucent={false} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
  },
  icon: {
    //backgroundColor: "red",
    //width: 200,
  },
  currentPage: {
    flex: 1,
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#F3F3F3",
    //backgroundColor: "red",
    //paddingBottom: 18,
    //paddingTop: 18,
  },
  navBarHidden: {
    display: "none",
  },
  navButton: {
    flexDirection: "column",
    alignItems: "center",
    //width: 80,
    //height: 45,
    paddingVertical: 18,
    //paddingHorizontal: 10,
    width: "20%",
    //height: "100%",
  },
  activeButton: {
    backgroundColor: "gray",
    //paddingVertical: 18,
    //paddingHorizontal: 18,
  },
  defaultText: {
    fontColor: "black",
  },
  activeText: {
    fontColor: "white",
  },
});
