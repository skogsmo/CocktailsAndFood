import IDrinkDetailsResponse from "../interfaces/IDrinkDetailsResponse";
import { Drink } from "../types/Drink";

const drinkResponseToDrink = (drinkResponse: IDrinkDetailsResponse) => {
  const drinks: Drink[] = drinkResponse.drinks.map(
    ({
      idDrink,
      strDrink,
      strAlcoholic,
      strDrinkThumb,
      strIngredient1,
      strIngredient2,
      strIngredient3,
      strIngredient4,
      strIngredient5,
      strIngredient6,
      strIngredient7,
      strIngredient8,
      strIngredient9,
      strIngredient10,
      strIngredient11,
      strIngredient12,
      strIngredient13,
      strIngredient14,
      strIngredient15,
    }) => {
      const ingredients = [
        strIngredient1,
        strIngredient2,
        strIngredient3,
        strIngredient4,
        strIngredient5,
        strIngredient6,
        strIngredient7,
        strIngredient8,
        strIngredient9,
        strIngredient10,
        strIngredient11,
        strIngredient12,
        strIngredient13,
        strIngredient14,
        strIngredient15,
      ].filter((ingredient) => ingredient && ingredient.trim() !== "");

      return {
        id: idDrink,
        name: strDrink,
        alcoholic: strAlcoholic === "Alcoholic",
        imageUrl: strDrinkThumb,
        ingredients: ingredients,
      };
    }
  );

  return drinks[0];
};

export default drinkResponseToDrink;
