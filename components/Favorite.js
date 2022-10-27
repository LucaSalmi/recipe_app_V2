import { Text, View, ScrollView, Pressable } from "react-native";
import { useState, useEffect } from "react";
import { favoritePage } from "../styles/styles.js";
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
      <SearchBar />
      <ScrollView>
        {favorites.length <= 0 ? (
          <Text style={{ paddingTop: 100 }}>Logged in? Added favorites?</Text>
        ) : (
          <Text style={{ display: "none" }}>Hidden</Text>
        )}

        {favorites != "undefined" && favorites.length > 0 ? (
          favorites.map((item) => (
            <Pressable
              key={item.id}
              onPress={() => {
                console.log(item);
                console.log(item.image);
                AppManager.currentRecipe = item;
                props.setScreen(Constants.RECIPEDETAILS);
              }}
            >
              <SmallCard title={item.title} imageSource={item.image} />
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
