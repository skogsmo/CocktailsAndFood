import { useEffect, useState } from "react";
import { FoodCard } from "./FoodCard";
import { Food } from "../types/Food";
import { USE_CACHED_API_CALLS } from "../constants";
import cachableGetUrl from "../utils/apiUrl";

export function Menu() {

    const [foods, setFoods] = useState<Food[]>([]);

    useEffect(() => {
        fetch(cachableGetUrl("https://iths-2024-recept-grupp3-3j1u35.reky.se/recipes", USE_CACHED_API_CALLS))
            .then((res) => res.json())
            .then((foodsData: any[]) => {
                const foods: Food[] = foodsData.map(({ _id, title, description, price, imageUrl, categories }) => ({
                    _id,
                    title,
                    description,
                    price,
                    imageUrl,
                    recommendedDrinkIngredients: categories,
                }));
                setFoods(foods);
            })
            .catch((error) => {
                console.error("Error fetching foods: ", error);
            });
    }, []);

    return (
        <>
            <ul className="flex flex-wrap gap-4">
                {foods.map(food => (
                    <li key={food._id} className="bg-white p-4 rounded-xl w-[400px]">
                        <FoodCard food={food} />
                    </li>
                ))}
            </ul>
        </>
    );
}