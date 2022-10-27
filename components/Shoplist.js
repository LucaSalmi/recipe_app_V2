import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import { useState, useEffect } from "react";
import { shoplistPage, Fab, shoplistStyles } from "../styles/styles.js";
import AppManager from "../utils/AppManager.js";
import SearchBar from "./SearchBar.js";
import { Crud, generateUid } from "../src/db.js";
import Icon from "react-native-ico-material-design";
import { PantryItem } from "../PantryItem.js";

const Shoplist = (props) => {
  const [showSheet, setShowSheet] = useState(false);


    const [items, setItems] = useState(AppManager.shoplistContent);

    const [username, setUsername] = useState("Log on to use");

    const shopListItemField = ({ item }) => (
        <ItemRow item={item} items={items} setItems={setItems} />
    );

  const [username, setUsername] = useState("Log on to use");

  const shopListItemField = ({ item }) => (
    <ItemRow item={item} items={items} setItems={setItems} />
  );

  useEffect(() => {
    if (AppManager.isLoggedIn) {
      setUsername(AppManager.username);
    }
  });

  const ItemRow = (props) => {
    const [checked, setChecked] = useState(props.checked);
    let itemName = props.item.desc;
    itemName = itemName.charAt(0).toUpperCase() + itemName.slice(1);
    const buttonPress = () => {
      let newCheckedValue = !checked;
      let newItems = props.items;
      let toChange;

      setChecked(newCheckedValue);
      for (const item of newItems) {
        if (item.desc == props.item.desc) {
          item.checked = newCheckedValue;
          toChange = item;
        }
      }

        setItems(cleanedShoplist);
        AppManager.shoplistContent = cleanedShoplist;
    }

    

    return (
        <View style={shoplistPage.shoplistContainer}>
            <View style={shoplistPage.headerContainer}>
                <Text style={shoplistPage.headerText}>{username}'s shopping list</Text>
            </View>
        
            <FlatList
                style={shoplistStyles.list}
                data={items}
                renderItem={shopListItemField}
                keyExtractor={(item) => item.id}
                snapToAlignment="start"
                decelerationRate={"fast"}
                snapToInterval={Dimensions.get("window").width}

            />
            
            <TouchableOpacity activeOpacity={0.5} onPress={() => {
                if (AppManager.isLoggedIn) {
                    syncWithPantry();
                }
            }} style={Fab.TouchableOpacityStyle}>
                <Icon name="synchronization-button-with-two-arrows" />
            </TouchableOpacity>

        </View>

        <View style={{}} />
      </TouchableOpacity>
    );
  };

  const syncWithPantry = () => {
    let cleanedShoplist = [];

    for (const shopListItem of AppManager.shoplistContent) {
      if (shopListItem.checked) {
        let temp = new PantryItem(generateUid(), shopListItem.desc);
        AppManager.pantryContent.push(temp);
        Crud.updateShoplist(shopListItem, false);
        Crud.updatePantry(temp, true);
      } else {
        cleanedShoplist.push(shopListItem);
      }
    }

    setItems(cleanedShoplist);
    AppManager.shoplistContent = cleanedShoplist;
  };

  const toggleSheet = () => {
    let newBool = !showSheet;
    setShowSheet(newBool);
    props.navBarChanger(newBool);
  };

  return (
    <View style={shoplistPage.shoplistContainer}>
      <SearchBar />
      <View style={shoplistPage.headerContainer}>
        <Text style={shoplistPage.headerText}>{username}'s shopping list</Text>
        <Button
          style={shoplistPage.filterButton}
          title="FILTER"
          onPress={() => {
            toggleSheet();
          }}
        ></Button>
      </View>

      <FlatList
        style={shoplistStyles.list}
        data={items}
        renderItem={shopListItemField}
        keyExtractor={item => item.id }
        snapToAlignment="start"
        decelerationRate={"fast"}
        snapToInterval={Dimensions.get("window").width}
      />

      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          if (AppManager.isLoggedIn) {
            syncWithPantry();
          }
        }}
        style={Fab.TouchableOpacityStyle}
      >
        <Icon name="synchronization-button-with-two-arrows" />
      </TouchableOpacity>

      <View
        style={showSheet ? shoplistPage.sheetContainer : { display: "none" }}
      >
        <Text>SHEET</Text>
      </View>
    </View>
  );
};

export default Shoplist;
