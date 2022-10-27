import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert,
  KeyboardAvoidingView,
  Modal,
} from "react-native";
import { useState, useEffect } from "react";
import {
  pantryItemStyle,
  bigCardStyles,
  Fab,
  shoplistPage,
  SearchBarStyle,
  pantryCardStyles,
  customModalStyles,
} from "../styles/styles";
import Icon from "react-native-ico-material-design";
import { PantryItem } from "../PantryItem";
import AppManager from "../utils/AppManager.js";
import { Crud } from "../src/db.js";
import { generateUid } from "../src/db.js";
import SearchBar from "./SearchBar";

const Pantry = (props) => {
  const [showSheet, setShowSheet] = useState(false);
  const [searchText, setSearchText] = useState();
  const [foundItem, setFoundItem] = useState([]);
  const [pantryItems, setPantryItems] = useState(AppManager.pantryContent);

  const toggleSheet = () => {
    let newBool = !showSheet;
    setShowSheet(newBool);
    props.navBarChanger(newBool);
    resetSearch();
  };

  const pantryItemCard = ({ item }) => <PantryCard item={item} />;

  const searchResultCard = ({ item }) => <SearchCard title={item} />;

  function resetSearch() {
    setFoundItem([]);
    setSearchText("");
  }

  function deleteItem(props) {
    let x = [];
    for (const ingredient of pantryItems) {
      if (ingredient.id != props.currentItem.id) {
        let temp = ingredient;
        x.push(temp);
      } else {
        Crud.updatePantry(ingredient, false);
      }
    }
    setPantryItems(x);
    AppManager.pantryContent = x;
  }

  //Alert to confirm the elimination of an item in the pantry
  const deleteItemAlert = (props) => {
    let currentItem = props.item;
    Alert.alert(props.item.title, "What do you want to do?", [
      {
        text: "Return",
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => {
          deleteItem((currentItem = { currentItem }));
        },
      },
    ]);
  };

  //this Alert triggers when an Item is already present in pantry
  const AlreadyAddedAlert = (props) => {
    Alert.alert(
      "You have this item already!",
      "Your pantry already has " + props.title,
      [
        {
          text: "Ok",
          style: "cancel",
        },
      ]
    );
  };

  const notLoggedAlert = () => {
    Alert.alert(
      "Not Logged In",
      "You need to login to use this functionality..",
      [
        {
          text: "Ok",
          style: "cancel",
        },
      ]
    );
  };

  //card in the main page of the pantry
  function PantryCard(myProps) {
    return (
      <TouchableOpacity
        style={pantryCardStyles.container}
        activeOpacity={0.8}
        onPress={() => {
          deleteItemAlert(myProps);
        }}
      >
        <Text style={{ color: "black", fontWeight: "600", fontSize: 17, textAlign: "center", width: "85%"}}>
          {myProps.item.title}
        </Text>
      </TouchableOpacity>
    );
  }

  //card in the add page of the pantry
  function SearchCard(myProps) {
    let doubleItem = false;

    return (
      <View style={pantryCardStyles.superView}>
        <View
          onTouchEnd={() => {
            for (const item of pantryItems) {
              if (item.title == myProps.title) {
                doubleItem = true;
                break;
              }
            }

            if (!doubleItem) {
              let newItem = new PantryItem(generateUid(), myProps.title);
              let tempArray = pantryItems;
              tempArray.push(newItem);
              setPantryItems(tempArray);
              AppManager.pantryContent = tempArray;
              Crud.updatePantry(newItem, true);
              toggleSheet();
            } else {
              AlreadyAddedAlert(myProps);
            }
          }}
          style={[pantryCardStyles.container, bigCardStyles.elevation]}
        >
          <Text>{myProps.title}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={pantryItemStyle.superView}>
      {/* FAB */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          if (AppManager.isLoggedIn) {
            toggleSheet();
          } else {
            notLoggedAlert();
          }
        }}
        style={Fab.TouchableOpacityStyle}
      >
        <Icon
          name={showSheet ? "clear-button" : "add-plus-button"}
          group="material-design"
        ></Icon>
      </TouchableOpacity>

      {/* List of Items in Pantry */}
      <FlatList
        contentContainerStyle={{
          width: "90%",
          paddingBottom: 10,
          paddingTop: 5,
          justifyContent: "center",
        }}
        numColumns={2}
        data={pantryItems}
        renderItem={pantryItemCard}
        keyExtractor={item => item.id}
        snapToAlignment="start"
        decelerationRate={"fast"}
        snapToInterval={Dimensions.get("window").width}
      />

      {/* View in the Sheet to search and add new items to pantry */}
      <KeyboardAvoidingView
        style={showSheet ? shoplistPage.sheetContainer : { display: "none" }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={SearchBarStyle.container}>
          <TextInput
            value={searchText}
            onChangeText={(input) => {
              setSearchText(input);
              setFoundItem(showResults(input));
            }}
            style={SearchBarStyle.searchInput}
            placeholder="Search here..."
          />
          <TouchableOpacity
            onPress={() => {
              resetSearch();
            }}
          >
            {
              <Icon
                style={
                  searchText == "" ? { display: "none" } : SearchBarStyle.icon
                }
                name="close-button"
                height="20"
                width="20"
              />
            }
          </TouchableOpacity>
        </View>

        <FlatList
          data={foundItem}
          renderItem={searchResultCard}
          keyExtractor={(item) => {
            item.id;
          }}
          snapToAlignment="start"
          decelerationRate={"fast"}
          snapToInterval={Dimensions.get("window").width}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

function showResults(input) {
  let search = "";
  var foundItem = [];
  let allIng = AppManager.allIngredients;
  try {
    for (let i = 0; i < input.length; i++) {
      search = search + input[i];

      for (let i = 0; i < allIng.length; i++) {
        if (allIng[i].includes(search)) {
          if (!foundItem.includes(allIng[i])) {
            foundItem.push(allIng[i]);
          }
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
  return foundItem;
}

export default Pantry;
