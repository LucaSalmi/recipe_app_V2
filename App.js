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
  Animated,
  Pressable,
} from "react-native";
import Recipes from "./components/Recipes.js";
import Favorite from "./components/Favorite.js";
import Shoplist from "./components/Shoplist.js";
import Pantry from "./components/Pantry.js";
import Profile from "./components/Profile.js";
import { pageStyles, bigCardStyles } from "./styles/styles.js";
import { useState, useEffect } from "react";
import Icon from "react-native-ico-material-design";
import { NavButton } from "./components/NavButton";
import RecipeDetails from "./components/RecipeDetails";
import { Constants } from "./utils/Constants";
import { Crud } from "./src/db.js";
import AppManager from "./utils/AppManager";
import { navBarStyles } from "./styles/styles.js";

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
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: Constants.NAVBAR_AND_SAFEAREA_COLOR,
          }}
        >
          <MainContent recipeData={recipeData} />
        </SafeAreaView>
      );
    } else {
      return <Text>Loading...</Text>;
    }
  }
}

const MainContent = (props) => {
  //Animation

  const animation = new Animated.Value(0);
  const inputRange = [0, 1];
  const outputRange = [1, 0.8];
  const scale = animation.interpolate({ inputRange, outputRange });

  const onPressIn = () => {
    Animated.spring(animation, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(animation, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };
  // End of animations

  const RECIPES = 0;
  const FAVORITE = 1;
  const SHOPLIST = 2;
  const PANTRY = 3;
  const PROFILE = 4;
  const RECIPEDETAILS = 5;

  const [screen, setScreen] = useState(Constants.RECIPES); // defaultar till Constants.RECIPES

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
      view = <RecipeDetails setScreen={setScreen} />;
      break;
  }

  const changePage = (pageName) => {
    if (pageName != Constants.RECIPEDETAILS) {
      AppManager.previousScreen = pageName;
    }
    setScreen(pageName);
  };

  return (
    <View style={navBarStyles.container}>
      <View style={navBarStyles.currentPage}>{view}</View>
      <View style={[hideNav ? navBarStyles.navBarHidden : navBarStyles.navBar]}>
        <NavButton
          name={"list-button-with-3-elements"}
          group={"material-design"}
          screen={screen}
          changePage={changePage}
          page={Constants.RECIPES}
          title={"Recipes"}
        />

        <NavButton
          name={"favorite-heart-outline-button"}
          group={"material-design"}
          screen={screen}
          changePage={changePage}
          page={Constants.FAVORITE}
          title={"Favorites"}
        />

        <NavButton
          name={"shopping-cart"}
          group={"basic"}
          screen={screen}
          changePage={changePage}
          page={Constants.SHOPLIST}
          title={"Shoplist"}
        />

        <NavButton
          name={"rounded-add-button"}
          group={"material-design"}
          screen={screen}
          changePage={changePage}
          page={Constants.PANTRY}
          title={"Pantry"}
        />

        <NavButton
          name={"user-outline"}
          group={"material-design"}
          screen={screen}
          changePage={changePage}
          page={Constants.PROFILE}
          title={"Profile"}
        />
      </View>

      <StatusBar hidden={false} backgroundColor="white" translucent={false} />
    </View>
  );
};
