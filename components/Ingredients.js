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
      
      {props.ingredients.map((ingredient) => {
        return (
          <View style={{ flexDirection: "row", marginStart: 10 }}>
            <Text style={{ marginEnd: 8, fontSize: 13, marginBottom: 5 }}>
              {""}
            </Text>
            <Text style={{ fontSize: 13, margin: 2 }}>{ingredient.amount}</Text>
            <Text style={{ fontSize: 13, margin: 2 }}>{ingredient.unit}</Text>
            <Text style={{ fontSize: 13, margin: 2 }}>{ingredient.name}</Text>
          </View>
        );
      })}
      
    </View>
  );
}

export default IngredientsView;
