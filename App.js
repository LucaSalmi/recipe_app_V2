import { StatusBar } from 'expo-status-bar';
import { Card } from './components/Card';
import { StyleSheet, Text, View, Button, SafeAreaView, Platform, TouchableOpacity } from 'react-native';
import Recipes from './components/Recipes.js';
import Favorite from './components/Favorite.js';
import Shoplist from './components/Shoplist.js';
import Pantry from './components/Pantry.js';
import Profile from './components/Profile.js';
import { pageStyles, bigCardStyles } from './styles/styles.js';
import { useState, useEffect } from 'react';
import Icon from "react-native-ico-material-design";

//testing more hello
// a comment from ankan, hello guys
//dev WHAT


export default function App() {

  if (Platform.OS == "android") {
    return (

      <MainContent />

    );
  }
  else {

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <MainContent />
      </SafeAreaView>
    );
  }

}

const MainContent = () => {

  const RECIPES = 0;
  const FAVORITE = 1;
  const SHOPLIST = 2;
  const PANTRY = 3;
  const PROFILE = 4;

  const [screen, setScreen] = useState(RECIPES);

  const [hideNav, setHideNav] = useState(false);

  let view;



  switch (screen) {

    case RECIPES:
      view = <Recipes />
      break;

    case FAVORITE:
      view = <Favorite props1={{ name: "test", styles: pageStyles }} />
      break;

    case SHOPLIST:
      view = <Shoplist navBarChanger={setHideNav} />
      break;

    case PANTRY:
      view = <Pantry navBarChanger={setHideNav} />
      break;

    case PROFILE:
      view = <Profile props1={{ name: "test", styles: pageStyles }} />
      break;
  }

  const changePage = (pageName) => {
    setScreen(pageName);
  }

  return (
    <View style={styles.container}>

      <View style={styles.currentPage}>
        {view}
      </View>
      <View style={hideNav ? styles.navBarHidden : styles.navBar}>
        {/*
        <Button title="Recipes" onPress={() => { changePage(RECIPES) }}></Button>
        <Button title="Favorite" onPress={() => { changePage(FAVORITE) }}></Button>
        <Button title="Shoplist" onPress={() => { changePage(SHOPLIST) }}></Button>
        <Button title="Pantry" onPress={() => { changePage(PANTRY) }}></Button>
        <Button title="Profile" onPress={() => { changePage(PROFILE) }}></Button>
        */}
        <TouchableOpacity style={styles.navButton} onPress={() => { changePage(RECIPES) }}>

          <Icon name="list-button-with-3-elements" group="material-design"/>
          <Text>Recipes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={() => { changePage(FAVORITE) }}>
          <Icon name="favorite-heart-outline-button" group="material-desig" />
          <Text>Favorites</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={() => { changePage(SHOPLIST) }}>
          <Icon name="shopping-cart" group="basic" />
          <Text>Shoplist</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={() => { changePage(PANTRY) }}>
          <Icon name="rounded-add-button" group="material-design"/>
          <Text>Pantry</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={() => { changePage(PROFILE) }}>
          <Icon name="user-outline" group="material-design"/>
          <Text>Profile</Text>
        </TouchableOpacity>


      </View>

      <StatusBar hidden={false} backgroundColor="white" translucent={false} />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',

  },
  currentPage: {
    flex: 1,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#F3F3F3',
    paddingBottom: 18,
    paddingTop: 18,


  },
  navBarHidden: {
    display: 'none',
  },
  navButton: {
    flexDirection: 'column',
    alignItems: 'center'


  },
});