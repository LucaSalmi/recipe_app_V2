
export const Constants = {
    RECIPES : 0,
    FAVORITE : 1,
    SHOPLIST : 2,
    PANTRY : 3,
    PROFILE : 4,
    RECIPEDETAILS : 5,
    DEFAULT_SERVINGS: 4,
    
    
    NAVBAR_AND_SAFEAREA_COLOR: "#F3F3F3",
    DEFAULT_BORDER_RADIUS: 10,

    DEFAULT_WIDTH_FILTER_BADGE: 20,
    DEFAULT_HEIGHT_FILTER_BADGE: 20,

}

export const filterItems = [
    {
      id: 0,
      value: "Vegetarian 🌿",
      isActive: false,
      key: 'vegetarian'
    },
    {
      id: 1,
      value: "Vegan 🌱",
      isActive: false,
      key: 'vegan'
    },
    {
      id: 2,
      value: "Gluten Free 🌾",
      isActive: false,
      key: 'glutenFree'
    },
    {
      id: 3,
      value: "Dairy Free 🥛",
      isActive: false,
      key: 'dairyFree'

    },
    {
      id: 4,
      value: "Very Healthy 🥦",
      isActive: false,
      key: 'veryHealthy'
    },
    {
      id: 5,
      value: "Cheap 💲",
      isActive: false,
      key: 'cheap'
    },
    {
      id: 6,
      value: "Very Popular 👍",
      isActive: false,
      key: 'veryPopular'
    },
    {
      id: 7,
      value: "Sustainable ♻️",
      isActive: false,
      key: 'sustainable'
    },
  ];