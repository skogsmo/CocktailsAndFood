import { useEffect, useRef, useState } from "react";
import { FoodCard } from "./FoodCard";
import { Food } from "../types/Food";
import { API_CACHER_BASE_URL, USE_CACHED_API_CALLS } from "../constants";
import cachableGetUrl from "../utils/apiUrl";
import IFoodResponse from "../interfaces/IFoodResponse";
import foodResponseToFood from "../utils/foodResponseToFood";

export function Menu() {

    const [foods, setFoods] = useState<Food[]>([]);

    const abortControllerRef = useRef<AbortController | undefined>(undefined);

    useEffect(() => {
        const fetchMenu = async () => {
            abortControllerRef.current?.abort();
            abortControllerRef.current = new AbortController();
            const signal = abortControllerRef.current.signal;

            try {
                const data = await fetch(cachableGetUrl(API_CACHER_BASE_URL, "https://iths-2024-recept-grupp3-3j1u35.reky.se/recipes", USE_CACHED_API_CALLS), { signal });
                const foodsResponse: IFoodResponse[] = await data.json();
                const foods: Food[] = foodsResponse.map(foodResponseToFood);
                setFoods(foods);
                console.log('Menu set');
            } catch (error: any) {
                if (error.name === 'AbortError') {
                    console.log('Menu fetch aborted');
                } else {
                    console.error('Error fetching drink:', error);
                }
            }
        }

        fetchMenu();

        return () => {
            abortControllerRef.current?.abort();
        }
    }, []);

    return (
        <div className="p-4 bg-slate-100 min-h-screen flex justify-center">
            <div className="max-w-[1200px]">
                <ul className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] justify-around gap-4">
                    {foods.map(food => (
                        <li key={food._id} className="">
                            <FoodCard food={food} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}