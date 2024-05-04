import capitalizeString from "./utils/capitalizeString";

export interface Item {
  _id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
}

export type Meal = Item & {
  _id: string;
  ingredients: Ingredient[];
  spiciness: number;
};

export type Cocktail = Item;

export type Ingredient = {
  Name: string;
  IsIncluded: boolean;
};

export type Extra = {
  Id: number;
  Name: string;
  Price: number;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type Order = {
  OrderId: number;
  Meal: Meal;
  Cocktail?: Cocktail;
  Protein?: Extra;
  Side?: Extra;
  IsRecommended?: boolean;
};

export interface DrinkDetailsResponse {
  drinks: {
    idDrink: string;
    strDrink: string;
    strAlcoholic: string;
    strDrinkThumb: string;
    strIngredient1: string;
    strIngredient2: string;
    strIngredient3: string;
    strIngredient4: string;
    strIngredient5: string;
    strIngredient6: string;
    strIngredient7: string;
    strIngredient8: string;
    strIngredient9: string;
    strIngredient10: string;
    strIngredient11: string;
    strIngredient12: string;
    strIngredient13: string;
    strIngredient14: string;
    strIngredient15: string;
    strCategory: string;
    strGlass: string;
  }[];
}

export const mapDrinkDetailsWithCocktail = (
  response: DrinkDetailsResponse,
  price?: number
) => {
  const drink = response.drinks[0];
  const ingredients = [
    drink.strIngredient1,
    drink.strIngredient2,
    drink.strIngredient3,
    drink.strIngredient4,
    drink.strIngredient5,
    drink.strIngredient6,
    drink.strIngredient7,
    drink.strIngredient8,
    drink.strIngredient9,
    drink.strIngredient10,
    drink.strIngredient11,
    drink.strIngredient12,
    drink.strIngredient13,
    drink.strIngredient14,
    drink.strIngredient15,
  ].filter((i) => typeof i === "string");

  const cocktail: Cocktail = {
    title: drink.strDrink,
    _id: drink.idDrink,
    description: capitalizeString(
      [
        "this is",
        drink.strAlcoholic[0].toLowerCase() === "a" ? "an" : "a",
        drink.strAlcoholic,
        drink.strCategory,
        "with the ingredients",
        ...ingredients.map((ingredient, index) =>
          index === ingredients.length - 2
            ? ingredient + " and"
            : index !== ingredients.length - 1
            ? ingredient + ","
            : ingredient + "."
        ),
        "it is served in a",
        drink.strGlass + ".",
      ].join(" ")
    ),
    price: price ?? 0,
    imageUrl: drink.strDrinkThumb,
  };
  return cocktail;
};

export type DrinkInfo = {
  drinkId: string;
  price: number;
  selectable: boolean;
  associatedProteinId?: number;
};
