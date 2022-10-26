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
import { pageStyles, bigCardStyles, navBarStyles } from "./styles/styles.js";
import { useState, useEffect } from "react";
import Icon from "react-native-ico-material-design";
import { NavButton } from "./components/NavButton";
import RecipeDetails from "./components/RecipeDetails";
import { Constants } from "./utils/Constants";
import { Crud } from "./src/db.js";
import AppManager from "./utils/AppManager";
import AsyncStorage from '@react-native-async-storage/async-storage';

//testing more hello
//a comment from ankan, hello guys
//dev WHAT

export default function App() {
  const [recipeData, setRecipeData] = useState([]);

  //Run once
  useEffect(()=>{
    if (recipeData.length < 1) {
      Crud.getRecipies(setRecipeData);
    }
  
    if (AppManager.allIngredients.length < 1) {
      Crud.getAllIngredients();
    }
  }, []);

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
  const RECIPES = 0;
  const FAVORITE = 1;
  const SHOPLIST = 2;
  const PANTRY = 3;
  const PROFILE = 4;
  const RECIPEDETAILS = 5;


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
        <RecipeDetails setScreen={setScreen}/>
      );
      break;
  }

  const changePage = (pageName) => {
    if(pageName != Constants.RECIPEDETAILS){
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
