import { StyleSheet, Dimensions } from "react-native";
import { Constants } from "../utils/Constants";

export const pageStyles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: "blue",
  },
  iconBackground: {
    height: 38,
    justifyContent: "center",
    alignItems: "center",
    width: 38,
    borderRadius: 38 / 2,
    backgroundColor: Constants.NAVBAR_AND_SAFEAREA_COLOR,
  },
});

export const bigCardStyles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#fff",
    justifyContent: "space-between",
    height: "70%",
    width: "85%",
    borderRadius: Constants.DEFAULT_BORDER_RADIUS,
    borderWidth: 1,
    marginTop: 20,
  },
  imageInCard: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "contain",
    overflow: "hidden",
    borderTopLeftRadius: Constants.DEFAULT_BORDER_RADIUS,
    borderTopRightRadius: Constants.DEFAULT_BORDER_RADIUS,
  },
  card: {
    height: "95%",
    width: "95%",

    borderColor: "black",

    margin: 10,
    //justifyContent: "space-between",
  },
  elevation: {
    elevation: 10,
    shadowColor: "#52006A",
  },
  superView: {
    flex: 1,
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    alignItems: "center",
    flexDirection: "column",
  },
  bottomCard: {
    flexDirection: "column",
    //marginBottom: 30,
    //marginStart: 15,
    //marginTop: 2,
    backgroundColor: "white",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  kokTid: {
    flexDirection: "row",
    fontSize: 15,
    marginStart: 5,
  },
  dishName: {
    fontSize: 20,
    fontWeight: "450",
  },
  veganAttribute: {
    backgroundColor: "green",
    height: 50,
    justifyContent: "center",
    borderRadius: 3,
    width: 95,
  },
  editorsChoiceAttribute: {
    backgroundColor: "yellow",
    height: 50,
    justifyContent: "center",
    borderRadius: 3,

    width: 95,
  },
  cardBanner: {
    flexDirection: "row",
    //backgroundColor: "#90EE90",
    backgroundColor: "#F9F6EE",
    justifyContent: "space-between",
    borderRadius: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
  },
});

export const navBarStyles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
  },
  icon: {
    //backgroundColor: "red",
    //width: 200,
    alignSelf: "center",
  },
  currentPage: {
    flex: 1,
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: Constants.NAVBAR_AND_SAFEAREA_COLOR,

    //backgroundColor: "red",
    //paddingBottom: 18,
    //paddingTop: 18,
  },
  navBarHidden: {
    display: "none",
  },
  navButton: {
    flexDirection: "column",
    alignItems: "center",
    //width: 80,
    //height: 45,
    paddingVertical: 18,
    //paddingHorizontal: 10,
    width: "20%",
    //height: "100%",
  },
  activeButton: {
    flexDirection: "column",
    alignItems: "center",
    //width: 80,
    //height: 45,
    paddingVertical: 18,
    //paddingHorizontal: 10,
    width: "20%",
    backgroundColor: "gray",
    //paddingVertical: 18,
    //paddingHorizontal: 18,
  },
  defaultText: {
    fontColor: "black",
  },
  activeText: {
    fontColor: "white",
  },
});

export const smallCardStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
    height: Dimensions.get("window").height * 0.2,
    width: Dimensions.get("window").width * 0.95,
    borderRadius: Constants.DEFAULT_BORDER_RADIUS,
    marginVertical: 5,
  },
  superView: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",
  },
  imageStyle: {
    width: "33.3%",
    height: "100%",
    borderBottomLeftRadius: Constants.DEFAULT_BORDER_RADIUS,
    borderTopLeftRadius: Constants.DEFAULT_BORDER_RADIUS,

    overflow: "hidden",
  },
  rightSide: {
    height: "100%",
    width: "66%",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
});

export const filterItemCard = StyleSheet.create({
  sheetContainer: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.18,
    paddingTop: 7,
    alignItems: "center",
    backgroundColor: "#353839",
  },
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Constants.DEFAULT_BORDER_RADIUS,
    borderWidth: 1,
    alignSelf: "center",
    padding: 5,
    width: "33%",
  },
  superView: {
    flex: 1,
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    textSize: 13,
  },
});

export const pantryCardStyles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: Constants.NAVBAR_AND_SAFEAREA_COLOR,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: "49%",
    borderRadius: Constants.DEFAULT_BORDER_RADIUS,
    elevation: 2,
    shadowColor: "black",
    shadowOffset: 3,
    marginRight: "2%",
    marginTop: 10,
    backgroundColor: "rgb(126, 205, 207)",
  },
  superView: {
    flex: 1,
    height: Dimensions.get("window").height * 0.1,
    width: Dimensions.get("window").width,
    alignItems: "center",
    justifyContent: "center",
  },
});

export const shoplistStyles = StyleSheet.create({
  list: {
    flex: 1,
    width: Dimensions.get("window").width * 0.9,
  },
});

export const shoplistPage = StyleSheet.create({
  shoplistContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  headerContainer: {
    width: Dimensions.get("window").width,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "500",
  },
  listItemText: {
    fontSize: 20,
    fontWeight: "500",
  },

  filterButton: {},
  shoppingItemsContainer: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    padding: 20,
  },
  sheetContainer: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.18,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    //padding: 20,
    alignItems: "center",
    backgroundColor: "#353839",
  },
});

export const favoritePage = StyleSheet.create({
  favoriteContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: Constants.NAVBAR_AND_SAFEAREA_COLOR,
  },
});

export const recipePage = StyleSheet.create({
  recipeContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: "#F3F3F3",
  },

  button: {
    borderRadius: 5,
    padding: 5,
    //backgroundColor: "#F3F3F3",
  },
  shadowProp: {
    shadowColor: "rgba(0,0,0, .4)", // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    backgroundColor: "#fff",
    elevation: 2, // Android
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    padding: 5,
  },
});
export const pantryItemStyle = StyleSheet.create({
  itemCard: {
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    height: "15%",
    width: "85%",
    borderRadius: 25,
    borderWidth: 1,
  },
  elevation: {
    elevation: 10,
    shadowColor: "#52006A",
  },
  superView: {
    flex: 1,
    //height: Dimensions.get("window").height,
    //width: Dimensions.get("window").width,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export const profilePage = StyleSheet.create({
  profileContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    //backgroundColor: "#0005",
  },
  inputField: {
    backgroundColor: "#f3f3f3",
    height: 30,
    width: 130,
    borderRadius: 5,
    padding: 5,
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  hidden: {
    display: "none",
  },
  defaultMarginTop: {
    marginTop: 15,
  },
  defaultMarginBottom: {
    marginBottom: 15,
  },
});

export const Fab = StyleSheet.create({
  TouchableOpacityStyle: {
    //Here is the trick
    position: "absolute",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    right: 10,
    bottom: 10,
    borderWidth: 2,
    borderRadius: 50,
    zIndex: 100,
    backgroundColor: "white",
  },
  floatingButtonStyle: {
    resizeMode: "contain",
    width: 50,
    height: 50,
    zIndex: 100,

    //backgroundColor:'black'
  },
});

export const SearchBarStyle = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    height: 50,
    backgroundColor: "gray",
    borderRadius: 8,
    marginTop: 10,
  },
  searchInput: {
    width: "90%",
    height: "100%",
    paddingLeft: 8,
    fontSize: 16,
    display: "flex",
    justifyContent: "center",
  },
  icon: {},
});

export const customModalStyles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
  },
  column: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  modalView: {
    justifyContent: "space-around",
    alignItems: "center",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 1.5,
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingTop: 10,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.55,
    shadowRadius: 8,
    elevation: 20,
    flexDirection: "column",
  },
  textSize: {
    textAlign: "center",
    fontSize: 15,
  },
  inputStyle: {
    textAlign: "center",
    width: "20%",
    backgroundColor: "grey",
    borderColor: "black",
    borderWidth: 1,
  },
});
