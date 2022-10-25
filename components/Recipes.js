import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  FlatList,
  Dimensions,
  Pressable,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useEffect, useState, useRef } from "react";
import { BigCard, SmallCard } from "./Card";
import { bigCardStyles, recipePage, shoplistPage, filterItemCard } from "../styles/styles";
import SearchBar from "./SearchBar.js";
import AppManager from "../utils/AppManager.js";
import { Constants } from "../utils/Constants";
import { Crud, generateUid } from "../src/db.js";

const Recipes = (props) => {
  const [initiated, setInitated] = useState(false);
  const [recipeData, setRecipeData] = useState(props.recipeData);
  const [favorites, setFavorites] = useState([]);
  const [favoritesIds, setFavoritesIds] = useState([]);
  const [searchData, setSearchData] = useState([])
  const [showSheet, setShowSheet] = useState(false);
  const [activeFilter, setActiveFilter] = useState([]);
  const [filterItems, setFilterItems] = useState([
    {
      id: 0,
      value: "Vegetarian",
      isActive: false
    },
    {
      id: 1,
      value: "Vegan",
      isActive: false
    },
    {
      id: 2,
      value: "GlutenFree",
      isActive: false
    },
    {
      id: 3,
      value: "DairyFree",
      isActive: false

    },
    {
      id: 4,
      value: "Very Healthy",
      isActive: false
    },
    {
      id: 5,
      value: "Cheap",
      isActive: false
    },
    {
      id: 6,
      value: "Very Popular",
      isActive: false
    },
    {
      id: 7,
      value: "Sustainable",
      isActive: false
    },
  ]);


  var flatListRef = useRef();

  const cardWidth = 393;

  var getItemLayout = (recipeData, index) => ({ length: cardWidth, offset: cardWidth * index, index })

  if (!initiated) {

    if (AppManager.uid.length > 0) {
      Crud.getFavorites(setFavorites);
    }

    setInitated(true);
  }

  useEffect(() => {
    if (searchData.length > 0) {
      flatListRef.scrollToIndex({ animated: false, index: 0 });
    }
  }, [searchData]);

  useEffect(() => {
    let newFavoritesIds = [];
    for (let favorite of favorites) {
      newFavoritesIds.push(favorite.id.toString());
    }
    setFavoritesIds(newFavoritesIds);
  }, [favorites]);

  useEffect(() => {

    let prevIndex = AppManager.previousRecipeIndex;

    if (recipeData.length > prevIndex && flatListRef != null) {

      flatListRef.scrollToIndex({ animated: false, index: prevIndex });
    }
  }, [recipeData]);

  const renderItem = ({ item }) => (

    <TouchableOpacity
      id={item.id}
      onPress={() => {
        for (let i = 0; i < recipeData.length; i++) {
          if (recipeData[i].id == item.id) {
            AppManager.previousRecipeIndex = i;
          }
        }
        AppManager.currentRecipe = item;
        props.setScreen(Constants.RECIPEDETAILS);
      }}
    >
      <BigCard
        title={item.title}
        style={bigCardStyles.container}
        topCard={bigCardStyles.topCard}
        imageSource={item.image}
        cookingTime={item.cookingTime}
        isFavorite={favoritesIds.includes(item.id.toString()) ? true : false}
        recipeId={item.id}
      />
    </TouchableOpacity>

  );

  const filterObj = ({ item }) => {
    <FilterList item={item} />
  };

  function FilterList(props) {
    return (
      <View
        style={[filterItemCard.container, props.item.isActive ? { backgroundColor: 'green' } : { backgroundColor: "#fff" }]}>
        <Pressable
          onPress={() => {
            props.item.isActive = !item.isActive
          }}>
          <Text style={filterItemCard.text}>{props.item.value}</Text>
        </Pressable>
      </View>
    )
  }

  return (
    <View style={recipePage.recipeContainer}>
      <SearchBar recipeData={recipeData} setSearchData={setSearchData} setShowSheet={setShowSheet} showSheet={showSheet} />

      <FlatList
        data={searchData.length > 0 ? searchData : recipeData}
        ref={(ref) => { flatListRef = ref; }}
        getItemLayout={getItemLayout}
        renderItem={renderItem}
        keyExtractor={(item) => {
          item.id
        }}
        horizontal
        snapToAlignment="start"
        decelerationRate={"fast"}
        snapToInterval={Dimensions.get("window").width}
      />

      {/* View in the Sheet for filter*/}
      <View
        style={showSheet ? shoplistPage.sheetContainer : { display: "none" }}>
        <View style={filterItemCard.superView}>
          <FlatList
            data={filterItems}
            renderItem={filterObj}
            keyExtractor={(item) => {
              item.id
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default Recipes;
