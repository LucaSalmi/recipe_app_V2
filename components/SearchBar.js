import { React, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
  Text,
} from "react-native";
import Icon from "react-native-ico-material-design";

const SearchBar = (myProps) => {
  const [searchText, setSearchText] = useState("");
  var tempArray = []

  const searchRecipeFromWord = () => {
    
    for (recipe of myProps.recipeData){
    
    let title = recipe.title
      
    if(title.toUpperCase().includes(searchText.toUpperCase())){
          console.log(recipe.title)
          tempArray.push(recipe)

      }
    }
    myProps.setSearchData(tempArray)
    
  };


  return (
    <View style={{ flexDirection: "row" }}>
      <View style={styles.container}>
        <TextInput
          value={searchText}
          onChangeText={(input) => {

            setSearchText(input);
            
            

          }}
          onSubmitEditing={() => {
            searchRecipeFromWord()
          }}
          style={styles.searchInput}
          placeholder="Search here..."
        />
        <TouchableOpacity
          styles={styles.icon}
          onPress={() => {
            setSearchText("");
            myProps.setSearchData([])
          }}
        >
          {
            <Icon
              style={searchText == "" ? { display: "none" } : styles.icon}
              name="close-button"
              height="20"
              width="20"
            />
          }
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={{
          justifyContent: "center",
          padding: 10,
        }}
      >
        <Icon name="sort-button-with-three-lines" height="22" width="22"></Icon>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    // alignItems: "center",
    width: "85%",
    height: 50,
    backgroundColor: "#EAE9E9",
    borderRadius: 8,
    marginTop: 10,
    
  },
  searchInput: {
    width: "90%",
    height: "100%",
    fontSize: 16,
    display: "flex",
    justifyContent: "center",
    marginStart: 15,
  },
  icon: {
    marginStart: -15,
  },
});

export default SearchBar;
