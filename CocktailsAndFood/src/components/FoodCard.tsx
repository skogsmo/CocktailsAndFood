import { useNavigate } from "react-router-dom";
import { Food } from "../types/Food";
// import { CartContext, CartContextType } from "../contexts/CartContext";
import { createMeal } from "../types/Meal";
import { ActionType, useCart } from "../contexts/CartContext";

export function FoodCard({ food }: { food: Food }) {
  const { dispatch } = useCart();

  const meal = createMeal(food);
  const navigate = useNavigate();

  const handleFoodSelect = () => {
    dispatch({ type: ActionType.ADD_MEAL, payload: meal });
    dispatch({ type: ActionType.SET_CURRENT_MEAL, payload: meal.id });
    navigate("/customize-order");
  };

  return (
    <div className="bg-white h-full text-gray-700 flex flex-col overflow-hidden rounded-2xl">
      <img
        src={food.imageUrl}
        alt={food.title}
        className="aspect-[4/2] object-cover"
      />
      <div className="p-4 flex flex-col gap-2 justify-between h-full">
        <div>
          <h2 className="font-bold text-xl">{food.title}</h2>
          <p className="font-semibold text-xl">{food.price} kr</p>
          <p className="">{food.description}</p>
        </div>
        <div>
          <button
            onClick={handleFoodSelect}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 rounded-full text-white font-bold"
          >
            Välj denna rätt
          </button>
        </div>
      </div>
    </div>
  );
}
