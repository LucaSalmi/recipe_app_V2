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

export function IngredientsView() {
  const title = "Gör så här";

  const dishesArray = [
    {
      step: "1",
      dish: "1,5 kg kycklingklubba",
    },
    {
      step: "2",
      dish: "6 salladslökar",
    },
    {
      step: "3",
      dish: "5 klyftor vitlök",
    },
    {
      step: "4",
      dish: "1 gul lök",
    },
    {
      step: "5",
      dish: "1/2 potatis",
    },
    {
      step: "6",
      dish: "1-3 chilifrukter, scotch bonnet eller habanero beroende på hur starkt man vill ha det",
    },
    {
      step: "7",
      dish: "3 tomater",
    },
    {
      step: "8",
      dish: "12 goomba breads",
    },
    {
      step: "2",
      dish: "6 salladslökar",
    },
    {
      step: "3",
      dish: "5 klyftor vitlök",
    },
    {
      step: "4",
      dish: "1 gul lök",
    },
    {
      step: "5",
      dish: "1/2 potatis",
    },
  ];

  return (
    <View>
      {dishesArray.map((calle) => {
        return (
          <View style={{ flexDirection: "row" }}>
            <Text style={{ marginEnd: 8 }}>{"*"}</Text>
            <Text>{calle.dish}</Text>
          </View>
        );
      })}
    </View>
  );
}

export default IngredientsView;
