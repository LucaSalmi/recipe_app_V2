import { Constants } from "./Constants";

const AppManager = {
    isLoggedIn: false,
    uid: "",
    username: "",
    password: "",
    firstName: "",
    secondName: "",
    email: "",
    phone: "",
    currentRecipe: {},
    allRecipes: [],
    allIngredients: [],
    pantryContent: [],
    shoplistContent: [],
    previousScreen: Constants.RECIPES,
    previousRecipeIndex: 0,

}

export default AppManager;