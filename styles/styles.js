import { StyleSheet, Dimensions } from "react-native";

export const pageStyles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: "blue",
  },
});

export const bigCardStyles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#fff",
    justifyContent: "space-between",
    height: "70%",
    width: "85%",
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 20,
  },
  imageInCard: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "contain",
    overflow: "hidden",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomWidth: 2,
    borderBottomColor: "black",
  },
  card: {
    height: "95%",
    width: "95%",
    borderRadius: 15,
    borderWidth: 1.5,
    borderColor: "black",
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
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
});

export const smallCardStyles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    height: "90%",
    width: "85%",
    borderRadius: 25,
    borderWidth: 1,
  },
  superView: {
    flex: 1,
    height: Dimensions.get("window").height * 0.2,
    width: Dimensions.get("window").width,
    alignItems: "center",
    justifyContent: "center",
  },
});

export const pantryCardStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    height: "90%",
    width: "75%",
    borderRadius: 25,
    borderWidth: 1,
  },
  superView: {
    flex: 1,
    height: Dimensions.get("window").height * 0.1,
    width: Dimensions.get("window").width,
    alignItems: "center",
    justifyContent: "center",
  },
});

export const shoplistPage = StyleSheet.create({
  shoplistContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: "#0005",
  },
  headerContainer: {
    width: Dimensions.get("window").width,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  headerText: {},
  filterButton: {},
  shoppingItemsContainer: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    padding: 20,
  },
  sheetContainer: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
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
    backgroundColor: "#0005",
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
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
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
    backgroundColor: "#0005",
  },
  inputField: {
    backgroundColor: "white",
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
