type Meal = {
  MealName: string;
  MealId: string;
  Description: string;
  Price: number;
  ImgUrl: string;
};

type Cocktail = {
  CocktailName: string;
  CocktailId: string;
  Description: string;
  Price: number;
  ImgUrl: string;
};

type Extra = {
  name: string;
  price: number;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Order = {
  OrderId: string;
  Meal: Meal;
  Cocktail: Cocktail;
  Protein: Extra;
  Side: Extra;
};
