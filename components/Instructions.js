import { useEffect, useState } from "react";
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

export function InstructionsView() {

  const [instructions, setInstructions] = useState([]);

  useEffect(()=>{

    //Remove unnecessary HTML-tags from API
    let tempInstructions = AppManager.currentRecipe.instructions.replace("<ol>", "").replace("</ol>", "");

    while (tempInstructions.includes("</li>")) {
      tempInstructions = tempInstructions.replace("</li>", "");
    } 

    console.log(tempInstructions);

    const instructionsList = tempInstructions.split("<li>");

    //Remove empty strings from the array
    for (let i = 0; i < instructionsList.length; i++) {
      let indexString = instructionsList[i];
      if (indexString.length == 0) {
        instructionsList.splice(indexString, 1);
      }
    }

    console.log(instructionsList);

    setInstructions(instructionsList);


  }, []);

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
      {instructions.length > 1 ? instructions.map((item, i) => {
        return (
          <View style={{ flexDirection: "row" }}>
            <Text style={{ marginEnd: 8, marginStart: 10 }}>{(i+1)}</Text>
            <Text style={{ marginStart: 8 }}>{item}</Text>
          </View>
        );
      }) : <Text style={{marginStart: 8, marginEnd: 8}}>{instructions[0]}</Text>}
    </View>
  );
}

export default InstructionsView;
