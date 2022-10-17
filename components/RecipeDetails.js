import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  FlatList,
  Dimensions,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import Icon from "react-native-ico-material-design";
import { LinearGradient } from "expo-linear-gradient";
import { IngredientsView } from "./Ingredients";
import InstructionsView from "./Instructions";

const RecipeDetails = (props) => {
  const imageSource = "../assets/jerkchicken.jpg";
  const recipeName = "Jerk chicken with cocoa rice";

  const [count, setCount] = useState(2);
  const [heartEmpty, setFillHeart] = useState(true);

  const toggleHeart = () => {
    setFillHeart((current) => !current);
  };

  const INGREDIENTS = 0;
  const INSTRUCTIONS = 1;

  const [tabId, setTabId] = useState(INGREDIENTS);

  let tab;

  switch (tabId) {
    case INGREDIENTS:
      tab = <IngredientsView setTabId={setTabId} />;
      break;

    case INSTRUCTIONS:
      tab = <InstructionsView setTabId={setTabId} />;
      break;
  }

  const changeTab = (tabName) => {
    setTabId(tabName);
  };

  return (
    <View>
      <ScrollView>
        <View>
          <ImageBackground style={styles.image} source={require(imageSource)}>
            <LinearGradient
              style={[styles.image, styles.niceContainer]}
              colors={["transparent", "#000"]}
            >
              <View style={styles.topCard}>
                <TouchableOpacity
                  onPress={() => {
                    props.setScreen(props.previousPage);
                  }}
                >
                  <Icon
                    name="go-back-left-arrow"
                    group="material-design"
                    width="25"
                    height="25"
                  ></Icon>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    toggleHeart();
                  }}
                >
                  <Icon
                    style={
                      heartEmpty ? styles.bigHeartFill : styles.bigHeartNotFill
                    }
                    name={
                      heartEmpty
                        ? "favorite-heart-outline-button"
                        : "favorite-heart-button"
                    }
                    group="material-design"
                    width="25"
                    height="25"
                  ></Icon>
                </TouchableOpacity>
              </View>

              <View style={styles.bottomCard}>
                <Text style={styles.detailText}>{recipeName}</Text>
              </View>
            </LinearGradient>
          </ImageBackground>
        </View>

        <View>
          <View style={styles.topInfo}>
            <TouchableOpacity
              disabled={count < 12 ? false : true}
              onPress={() => {
                setCount(count + 2);
              }}
            >
              <Icon name="round-add-button" width="25" height="25"></Icon>
            </TouchableOpacity>

            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                marginHorizontal: 5,
              }}
            >
              <Text style={styles.detailTextTwo}>{count}</Text>
              <Text style={{ marginTop: -10 }}>port</Text>
            </View>

            <TouchableOpacity
              disabled={count <= 2 ? true : false}
              onPress={() => {
                setCount(count - 2);
              }}
            >
              <Icon name="round-remove-button" width="25" height="25"></Icon>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.tabs}>
          <TouchableOpacity
            onPress={() => {
              changeTab(INGREDIENTS);
            }}
          >
            <Text>Ingredients</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              changeTab(INSTRUCTIONS);
            }}
          >
            <Text>Instructions</Text>
          </TouchableOpacity>
        </View>

        <View>{tab}</View>
      </ScrollView>
    </View>
  );
};

export default RecipeDetails;

export const styles = StyleSheet.create({
  image: {
    /*
		height: Dimensions.get('window').height * 0.4,
		width: Dimensions.get('window').width,
        */
    width: "100%",
    height: Dimensions.get("window").height * 0.4,
  },
  topCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginStart: 25,
    marginTop: 20,
    marginEnd: 25,
  },
  bottomCard: {
    flexDirection: "column",
    marginBottom: 10,
    marginStart: 15,
  },
  detailText: {
    fontSize: 26,
    alignItems: "flex-start",
    color: "white",
    fontWeight: "bold",
  },
  detailTextContainer: {
    marginStart: 10,
    flexDirection: "row",
    marginBottom: 10,
  },
  niceContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  detailTextTwo: {
    fontSize: 26,
    alignItems: "flex-start",
    color: "black",
    fontWeight: "bold",
  },
  topInfo: {
    flexDirection: "row-reverse",
    justifyContent: "center",
    alignItems: "center",
    marginStart: 15,
    marginTop: 10,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 9,
    marginBottom: 16,
  },
  bigHeartFill: {
    backgroundColor: "green",
  },
  bigHeartNotFill: {
    color: "black",
  },
});
