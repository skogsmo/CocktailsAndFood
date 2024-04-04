import { Link, Navigate, useNavigate } from "react-router-dom";
import { Food } from "../types/Food";
import { CartContext, CartContextType } from "../contexts/CartContext";
import { useContext } from "react";
import { createMeal } from "../types/Meal";

export function FoodCard({ food }: { food: Food }) {

    const { addMeal, setCurrentMeal } = useContext(CartContext) as CartContextType;
    const meal = createMeal(food);
    const navigate = useNavigate();

    const handleFoodSelect = () => {
        addMeal(meal);
        setCurrentMeal(meal.id);
        navigate("/customize-order");
    }

    return (
        <div className="bg-white h-full text-gray-700 flex flex-col overflow-hidden rounded-2xl">
            <img src={food.imageUrl} alt={food.title} className="aspect-[4/2] object-cover" />
            <div className="p-4 flex flex-col gap-2 justify-between h-full">
                <div>
                    <h2 className="font-bold text-xl">{food.title}</h2>
                    <p className="font-semibold text-xl">{food.price} kr</p>
                    <p className="">{food.description}</p>
                </div>
                <div>
                    {/* <Link to="/customize-order"> */}
                        <button onClick={handleFoodSelect} className="px-4 py-2 bg-amber-500 hover:bg-amber-400 rounded-full text-white font-bold">
                            Välj denna rätt
                        </button>
                    {/* </Link> */}
                </div>
            </div>
        </div>
    );
}