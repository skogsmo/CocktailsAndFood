export type Meal = {
  _id: string;
  title: string;
  imageUrl: string;
  description: string;
  price: number;
};

export type Cocktail = {
  CocktailName: string;
  CocktailId: string;
  Description: string;
  Price: number;
  ImgUrl: string;
};

export type Extra = {
  name: string;
  price: number;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type Order = {
  OrderId: number;
  Meal: Meal;
  Cocktail?: Cocktail;
  Protein?: Extra;
  Side?: Extra;
};
