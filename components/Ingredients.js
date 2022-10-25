import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  SectionList,
  Item,
  FlatList,
} from "react-native";
import { useState, useEffect } from "react";
import AppManager from "../utils/AppManager";
import { styles } from "./RecipeDetails";
import { Crud } from "../src/db";

export function IngredientsView(props) {
  const title = "Gör så här";

  const [pantryItems, setPantryItems] = useState([]);

  const [ingredients, setIngredients] = useState([]);

  const ingredientsFromProp = props.ingredients;

  //Run once
  useEffect(() => {

    setIngredients(props.ingredients);

    if (AppManager.isLoggedIn && AppManager.uid.length > 0) {
      Crud.getPantry(setPantryItems);
    }
  }, []);

  useEffect(()=>{

    if (pantryItems.length > 0) {
      console.log("1. " + pantryItems[0].title);

      let pantryTitles = [];

      for (let pantryItem of pantryItems) {
        pantryTitles.push(pantryItem.title);
      }

      console.log("2. " + pantryTitles);

      let updatedIngredients = [];

      for (let ingredient of ingredientsFromProp) {

        console.log("2b. " + ingredient.name);

        ingredient.isInPantry = false;
        if (pantryTitles.includes(ingredient.name)) {
          ingredient.isInPantry = true;
        }
        console.log("2c. " + ingredient.isInPantry);
        updatedIngredients.push(ingredient);
      }

      console.log("3. " + updatedIngredients.length);

      setIngredients(updatedIngredients);

    }

  }, [pantryItems]);

  return (
    <View>

      {ingredients.map((ingredient, i) => {

        let ingredientname = ingredient.name;
        let fixedName = ingredientname.charAt(0).toUpperCase() + ingredientname.slice(1);


        return (


          <View style={{ flexDirection: "column" }}>

            <View
              style={{
                borderBottomColor: "black",
                borderBottomWidth: StyleSheet.hairlineWidth,
                marginStart: 10,
              }}
            >
              <View style={{ flexDirection: "row", marginStart: 10 }}>
                <Text style={{ fontSize: 16, margin: 6, fontWeight: "bold" }}>
                  {ingredient.amount}
                </Text>
                <Text style={{ fontSize: 16, margin: 6 }}>
                  {ingredient.unit}
                </Text>
                <Text style={{ fontSize: 16, margin: 6, fontWeight: "bold" }}>
                  {fixedName}
                </Text>
                {ingredient.isInPantry ? <Text>X</Text> : <Text style={{display: "none"}}></Text>}
              </View>
            </View>
          </View>

        );
      })}

    </View>
  );
}

export default IngredientsView;
