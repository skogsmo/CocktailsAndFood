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

export const RecommendedOrder = () => {
  const { state, dispatch } = useOrderContext();
  const [meal, setMeal] = useState<Meal>();
  const [cocktail, setCocktail] = useState<Cocktail>();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMeals = async () => {
      const res = await fetch(
        "https://iths-2024-recept-grupp3-3j1u35.reky.se/recipes/66016db329f983c33c7c866e"
      );
      const json: {
        _id: string;
        title: string;
        imageUrl: string;
        description: string;
        price: number;
        categories: string[];
      } = await res.json();
      const meal: Meal = {
        _id: json._id,
        title: json.title,
        imageUrl: json.imageUrl,
        description: json.description,
        price: json.price,
        ingredients: json.categories.map((Name) => ({
          Name,
          IsIncluded: true,
        })),
      };
      setMeal(meal);
    };

    fetchMeals();
  }, []);

  useEffect(() => {
    const getCocktails = async () => {
      const response = await fetch(
        "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11410"
      );
      const data: DrinkDetailsResponse = await response.json();
      setCocktail(mapDrinkDetailsWithCocktail(data, 125));
    };
    getCocktails();
  }, []);

  const handleClick = () => {
    const order: Order = {
      OrderId:
        state.orders.length === 0
          ? 1
          : Math.max(...state.orders.map((order) => order.OrderId)) + 1,
      Meal: meal!,
      Cocktail: cocktail,
      Protein: { Id: 1, Name: "Chipotlegrillad kyckling", Price: 5 },
      Side: { Id: 1, Name: "Ris", Price: 15 },
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
