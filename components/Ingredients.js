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
import AppManager from "../utils/AppManager";
import { styles } from "./RecipeDetails";

export function IngredientsView(props) {
  const title = "Gör så här";



  return (
    <View>

      {props.ingredients.map((ingredient, i) => {

        let ingredientname = ingredient.name
        let fixedName = ingredientname.charAt(0).toUpperCase() + ingredientname.slice(1)
        
        
        return (

          
          <View style={{ flexDirection: "column" }}>

            <View style={{ flexDirection: "row", marginStart: 10}}>
              
              <Text style={{ fontSize: 16, margin: 6, fontWeight: 'bold'}}>{ingredient.amount}</Text>
              <Text style={{ fontSize: 16, margin: 6}}>{ingredient.unit}</Text>
              <Text style={{ fontSize: 16, margin: 6, fontWeight:'bold'}}>{fixedName}</Text>
            </View>

            <View style={{
              borderBottomColor: 'black',
              borderBottomWidth: StyleSheet.hairlineWidth,
              marginStart: 10
            }}>
                
            </View>

          </View>

        );
      })}

    </View>
  );
}

export default IngredientsView;
