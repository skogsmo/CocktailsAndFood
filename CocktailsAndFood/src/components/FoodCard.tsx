import { Link } from "react-router-dom";
import { Food } from "../types/Food";
import { CartContext, CartContextType } from "../contexts/CartContext";
import { useContext } from "react";
import { createMeal } from "../types/Meal";

type FoodCardProps = {
    food: Food;
}

export function FoodCard(props: FoodCardProps) {
    const { food } = props;
    const { addToCart } = useContext(CartContext) as CartContextType;
    const meal = createMeal(food)

    const handleFoodSelect = () => {
        addToCart(meal)
    }

    return (
        <div className="text-gray-700 flex flex-col gap-2">
            <img src={food.imageUrl} alt={food.title} className="max-w-[300px]" />
            <h2 className="font-bold text-xl">{food.title}</h2>
            <p>{food.description}</p>
            <p className="font-semibold">{food.price} kr</p>
            <Link to="/customize-order" state={meal.id}>
                <button onClick={handleFoodSelect} className="px-4 py-2 bg-amber-500 hover:bg-amber-400 rounded-full w-full text-white font-bold">
                    Välj denna rätt
                </button>
            </Link>
        </div>
    );
}