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

export function InstructionsView() {
  const title = "Gör så här";

  const dishesArray = [
    {
      step: "1",
      dish: "Börja med att hetta upp en stekpanna",
    },
    {
      step: "2",
      dish: "Skiva goombabrödet i små bitar",
    },
    {
      step: "3",
      dish: "Fräs vitlöken",
    },
    {
      step: "4",
      dish: "Ta en cigg",
    },
    {
      step: "5",
      dish: "Se till att acceptera poppen på faceit",
    },
    {
      step: "6",
      dish: "Pusha till dev",
    },
    {
      step: "7",
      dish: "Acceptera hampus friend request på Battle.net",
    },
    {
      step: "8",
      dish: "Enjoy the food",
    },
  ];

  return (
    <View>
      {dishesArray.map((calle) => {
        return (
          <View style={{ flexDirection: "row" }}>
            <Text style={{ marginEnd: 8 }}>{calle.step}</Text>
            <Text>{calle.dish}</Text>
          </View>
        );
      })}
    </View>
  );
}

export default InstructionsView;
