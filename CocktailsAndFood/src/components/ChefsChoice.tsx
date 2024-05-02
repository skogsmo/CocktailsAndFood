import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ActionType, useOrderContext } from "../context/OrderContext";
import {
  Cocktail,
  DrinkDetailsResponse,
  Meal,
  Order,
  mapDrinkDetailsWithCocktail,
} from "../orderTypes";

import jsonProteins from "../../public/data/proteins.json";
import jsonSides from "../../public/data/sides.json";
import jsonMeals from "../../public/data/menu.json";
import jsonCocktailInfo from "../../public/data/drink-info.json";

const ChefsChoice = () => {
  const { state, dispatch } = useOrderContext();
  const [meal, setMeal] = useState<Meal>();
  const [cocktail, setCocktail] = useState<Cocktail>();

  const navigate = useNavigate();

  useEffect(() => {
    const getCocktails = async () => {
      const recommendedCocktailInfo = jsonCocktailInfo[0];

      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recommendedCocktailInfo.drinkId}`
      );
      const data: DrinkDetailsResponse = await response.json();
      setCocktail(
        mapDrinkDetailsWithCocktail(data, recommendedCocktailInfo.price)
      );
    };
    getCocktails();
  }, []);

  const handleClick = () => {
    const recommendedProtein = jsonProteins[0];
    const recommendedSideDish = jsonSides[0];
    const recommendedMeal = jsonMeals[0];

    const meal: Meal = {
      _id: recommendedMeal._id,
      title: recommendedMeal.title,
      imageUrl: recommendedMeal.imageUrl,
      description: recommendedMeal.description,
      price: recommendedMeal.price,
      spiciness: recommendedMeal.timeInMins,
      ingredients: recommendedMeal.categories.map((category) => ({
        Name: category,
        IsIncluded: true,
      })),
    };
    setMeal(meal);

    const order: Order = {
      OrderId:
        state.orders.length === 0
          ? 1
          : Math.max(...state.orders.map((order) => order.OrderId)) + 1,
      Meal: meal,
      Cocktail: cocktail,
      Protein: {
        Id: recommendedProtein.Id,
        Name: recommendedProtein.Name,
        Price: recommendedProtein.Price,
      },
      Side: {
        Id: recommendedSideDish.Id,
        Name: recommendedSideDish.Name,
        Price: recommendedSideDish.Price,
      },
      IsRecommended: true,
    };

    dispatch({
      type: ActionType.CREATE_RECOMMENDED_ORDER,
      payload: order,
    });

    navigate("/checkout");
  };

  return (
    <>
      <button onClick={handleClick}>
        <img className="size-56" src="/img/chefs-choice-logo.png" alt="" />
        <h3 className="text-center py-2 font-ultra tracking-wider">
          KOCKENS VAL
        </h3>
      </button>
    </>
  );
};

export default ChefsChoice;
