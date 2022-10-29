import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Button,
} from "react-native";
import { useState, useEffect } from "react";
import { favoritePage, smallCardStyles } from "../styles/styles.js";
import SearchBar from "./SearchBar.js";
import { SmallCard } from "./Card";
import AppManager from "../utils/AppManager.js";
import { Constants } from "../utils/Constants.js";
import { Crud } from "../src/db.js";

const Favorite = (props) => {
  const [initiated, setInitiated] = useState(false);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (!initiated) {
      if (AppManager.uid.length > 0) {
        //Async

        Crud.getFavorites(setFavorites);
      }

      setInitiated(true);
    }
  });

  return (
    <View style={favoritePage.favoriteContainer}>
      <ScrollView>
        {AppManager.isLoggedIn && favorites.length <= 0 ? (
          <Text style={{ paddingTop: 100 }}>Please go to Recipe-tab to add favorites.</Text>
        ) : (
          <Text style={{ display: "none" }}>Hidden</Text>
        )}

        {!AppManager.isLoggedIn ? (
          <Text style={{ paddingTop: 100 }}>Please login to see/add favorties.</Text>
        ) : (
          <Text style={{ display: "none" }}>Hidden</Text>
        )}

        {favorites != "undefined" && favorites.length > 0 ? (
          favorites.map((item) => (
            <Pressable
              key={item.id}
              onPress={() => {
                AppManager.currentRecipe = item;
                props.setScreen(Constants.RECIPEDETAILS);
              }}
            >
              <SmallCard title={item.title} imageSource={item.image} item={item} favorites={favorites} setFavorites={setFavorites}/>
            </Pressable>
          ))
        ) : (
          <Text style={{ display: "none" }}>Hidden</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default Favorite;
