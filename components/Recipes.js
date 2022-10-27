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
import { bigCardStyles, recipePage, shoplistPage, filterItemCard, filterIndicator } from "../styles/styles";
import SearchBar from "./SearchBar.js";
import AppManager from "../utils/AppManager.js";
import { Constants, filterItems } from "../utils/Constants";
import { Crud, generateUid } from "../src/db.js";

const Recipes = (props) => {
  const [initiated, setInitated] = useState(false);
  const [recipeData, setRecipeData] = useState(props.recipeData);
  const [favorites, setFavorites] = useState([]);
  const [favoritesIds, setFavoritesIds] = useState([]);
  const [searchData, setSearchData] = useState([])
  const [showSheet, setShowSheet] = useState(false);
  const [activeFilter, setActiveFilter] = useState([]);

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
        cookingTime={item.readyInMinutes}
        isFavorite={favoritesIds.includes(item.id.toString()) ? true : false}
        recipeId={item.id}
        recipe={item}
      />
    </TouchableOpacity>

  );

  const filterObj = ({ item }) => {
    return (
      <FilterList item={item} />
    )
  };

  function FilterList(props) {

    let selected = props.item;
    const [isActive, setIsActive] = useState(props.item.isActive);

    return (
      <TouchableOpacity

        style={[filterItemCard.container, isActive ? { backgroundColor: 'green' } : { backgroundColor: "#fff" }]}
        onPress={() => {

          selected.isActive = !selected.isActive
          setIsActive(selected.isActive)

          if (selected.isActive) {
            let array = activeFilter;
            array.push(selected);
            setActiveFilter(array);
          } else {
            let array = activeFilter;
            array.splice(selected, 1);
            setActiveFilter(array);
          }
        }}>
        <Text numberOfLines={1} style={filterItemCard.text}>{props.item.value}</Text>

      </TouchableOpacity>
    )
  };

  return (
    <View style={recipePage.recipeContainer}>
      <SearchBar recipeData={recipeData} setSearchData={setSearchData} setShowSheet={setShowSheet} showSheet={showSheet} activeFilter ={activeFilter} />
      <View style={activeFilter.length > 0 ? [filterIndicator.container] : { display: "none" }}>
        <Text style={filterIndicator.text}>{activeFilter.length}</Text>
      </View>

      {/* View in the Sheet for filter*/}
      <View
        style={showSheet ? [filterItemCard.sheetContainer] : { display: "none" }}>
        <View style={filterItemCard.superView}>
          <FlatList
            style={{ width: '100%' }}
            data={filterItems}
            renderItem={filterObj}
            keyExtractor={(item) => {
              item.id
            }}
            numColumns={3}
          />
        </View>
      </View>

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

    </View>
  );
};

export default Recipes;
