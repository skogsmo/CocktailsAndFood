import { useEffect, useState } from "react";
import { CocktailCard } from "../components/CocktailCard";
import { Cocktail, Order } from "../orderTypes";

interface DrinkDetailsResponse {
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

const mapDrinkDetailsWithCocktail = (response: DrinkDetailsResponse) => {
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
  ];

  const filteredIngredients = ingredients.filter((i) => typeof i === "string");

  const cocktail: Cocktail = {
    CocktailName: drink.strDrink,
    CocktailId: drink.idDrink,
    Description: `This is a ${drink.strAlcoholic} ${
      drink.strCategory
    } with the ingredients 
    ${filteredIngredients.join(", ")}. It is served in a ${drink.strGlass}.`,
    Price: 125,
    ImgUrl: drink.strDrinkThumb,
  };
  return cocktail;
};

export const DrinkSelection = ({ currentOrder }: { currentOrder: Order }) => {
  const [formattedDrink, setFormattedDrink] = useState<Cocktail | undefined>(
    undefined
  );
  const [cocktailId, setCocktailId] = useState("");

  switch (currentOrder.Protein?.Id) {
    case 1:
      setCocktailId("11410");
      break;
    case 2:
      setCocktailId("12198");
      break;
    case 3:
      setCocktailId("11422");
      break;
    case 4:
      setCocktailId("13731");
      break;
    case 5:
      setCocktailId("12690");
      break;
    default:
      break;
  }

  useEffect(() => {
    const getCocktails = async () => {
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailId}`
      );
      console.log("API response:", response);
      const data: DrinkDetailsResponse = await response.json();
      setFormattedDrink(mapDrinkDetailsWithCocktail(data));
      // const cocktail = data.drinks;
      console.log("data:", data);
      // setfetchedCocktail(cocktail);
      // console.log("fetchedCocktail:", fetchedCocktail);
    };
    getCocktails();
  }, [cocktailId]);

  return <>{formattedDrink && <CocktailCard cocktail={formattedDrink} />}</>;
};
