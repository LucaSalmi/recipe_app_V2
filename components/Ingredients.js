import { StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";
import AppManager from "../utils/AppManager";
import { Crud } from "../src/db";
import Icon from "react-native-ico-material-design";

export function IngredientsView(props) {
  const title = "Gör så här";

  const [pantryItems, setPantryItems] = useState([]);
  const [shoplistItems, setShoplistItems] = useState([]);

  const [ingredients, setIngredients] = useState([]);

  const ingredientsFromProp = props.ingredients;

  //Run once
  useEffect(() => {
    setIngredients(props.ingredients);

    if (AppManager.isLoggedIn && AppManager.uid.length > 0) {
      Crud.getPantry(setPantryItems);

      const updateShoplist = async () => {
        let result = await Crud.getShoplist(); //Stores result in AppManager.shoplistContent

        let shoplistItemNames = [];

        for (let item of AppManager.shoplistContent) {
          let itemDesc = item.desc;
          shoplistItemNames.push(itemDesc);
        }

        setShoplistItems(shoplistItemNames);
      };
      updateShoplist();
    }
  }, []);

  useEffect(() => {
    let userItems = [];

    //Get all names from pantry
    for (let pantryItem of pantryItems) {
      userItems.push(pantryItem.title);
    }

    //Get all names from shoplist
    for (let shoplistItem of AppManager.shoplistContent) {
      userItems.push(shoplistItem.desc);
    }

    let updatedIngredients = [];

    for (let ingredient of ingredientsFromProp) {
      ingredient.isInPantry = false;
      if (userItems.includes(ingredient.name)) {
        ingredient.isInPantry = true;
      }
      updatedIngredients.push(ingredient);
    }

    setIngredients(updatedIngredients);
  }, [pantryItems, shoplistItems]);

  return (
    <View>
      {ingredients.map((ingredient, i) => {
        let ingredientname = ingredient.name;
        let fixedName =
          ingredientname.charAt(0).toUpperCase() + ingredientname.slice(1);

        return (
          <View style={{ flexDirection: "column" }}>
            <View
              style={{
                borderBottomColor: "black",
                borderBottomWidth: StyleSheet.hairlineWidth,
                marginStart: 16,
                marginEnd: 16,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
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
                </View>
                <View style={{ marginEnd: 16 }}>
                  {ingredient.isInPantry ? (
                    <Icon
                      style={{ fill: "green", marginTop: 9, marginStart: 5 }}
                      name="circle-with-check-symbol"
                      group="material-design"
                      height="16"
                      width="16"
                    />
                  ) : (
                    <Text style={{ display: "none" }}></Text>
                  )}
                </View>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
}

export default IngredientsView;
