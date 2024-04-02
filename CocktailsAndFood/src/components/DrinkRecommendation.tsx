import { useContext, useEffect, useRef, useState } from "react";
import { CartContext, CartContextType } from "../contexts/CartContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import getRandomIndex from "../utils/getRandomIndex";
import cachableGetUrl from "../utils/apiUrl";
import { API_CACHER_BASE_URL, USE_CACHED_API_CALLS } from "../constants";
import IDrinkDetailsResponse from "../interfaces/IDrinkDetailsResponse";
import IDrinksResponse from "../interfaces/IDrinksResponse";
import drinkResponseToDrink from "../utils/drinkResponseToDrink";
import { Drink, getDrinkPrice as getDrinkPrice } from "../types/Drink";
import DrinkDetails from "./DrinkDetails";

function DrinkRecommendation() {

    const { meals, updateMeal } = useContext(CartContext) as CartContextType;
    const meal = meals.find(m => m.id === localStorage.getItem("currentMealId"));
    if (!meal) return <Navigate to="/menu" />;

    const navigate = useNavigate();

    const [recommendedDrink, setRecommendedDrink] = useState<Drink | undefined>(undefined)

    const [chosenDrinkIngredient, setChosenDrinkIngredient] = useState("");

    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        newRecommendation();

        return () => {
            abortControllerRef.current?.abort();
        }
    }, []);

    const newRecommendation = async () => {
        console.log("New recommendation on the way!");

        const ingredients: string[] = meal.food.recommendedDrinkIngredients
            .filter(ingredient => meal.protein?.recommendedDrinkIngredients.includes(ingredient));

        if (ingredients.length === 0) {
            ingredients.push(...meal.food.recommendedDrinkIngredients);
        }

        let randomIndex = getRandomIndex(ingredients.length);

        if (ingredients.length > 1) {
            while (chosenDrinkIngredient === ingredients[randomIndex]) {
                randomIndex = getRandomIndex(ingredients.length);
            }
        }

        const newIngredient = ingredients[randomIndex];

        setImageLoaded(false);

        const drink = await getRandomDrinkByIngredient(newIngredient);

        if (!drink) return;

        drink.price = getDrinkPrice(drink);

        setChosenDrinkIngredient(newIngredient);

        setRecommendedDrink(drink);
    };

    const abortControllerRef = useRef<AbortController | undefined>(undefined);

    const getRandomDrinkByIngredient = async (ingredient: string): Promise<Drink | undefined> => {
        console.log(`Fetching drinks with ingredient: ${ingredient}`);

        abortControllerRef.current?.abort();
        abortControllerRef.current = new AbortController();
        const signal = abortControllerRef.current.signal;

        try {
            const response = await fetch(cachableGetUrl(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`, USE_CACHED_API_CALLS, API_CACHER_BASE_URL), { signal });
            const drinksResponse: IDrinksResponse = await response.json();
            const drinkIds = drinksResponse.drinks.map((drink) => drink.idDrink);
            const randomDrinkId = drinkIds[getRandomIndex(drinkIds.length)];

            console.log(`Fetching drink: ${randomDrinkId}`);

            const result = await fetch(cachableGetUrl(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${randomDrinkId}`, USE_CACHED_API_CALLS, API_CACHER_BASE_URL), { signal });
            const drinkDetailsResponse: IDrinkDetailsResponse = await result.json();
            const drink = drinkResponseToDrink(drinkDetailsResponse);

            return drink;
        } catch (error: any) {
            if (error.name === 'AbortError') {
                console.log('Drink fetch aborted');
            } else {
                console.error('Error fetching drink:', error);
            }
            return undefined;
        }
    };

    const handleSubmitClick = async () => {
        meal.drink = recommendedDrink;
        updateMeal(meal);

        navigate("/summary")
    }

    return (
        <div className="flex flex-col gap-4 p-4 bg-slate-200 min-h-screen">

            <div className="flex flex-col gap-2">
                <h2 className="font-bold">Rekommenderade drinkingredienser för <span className="text-orange-600">{meal.food.title}</span>:</h2>
                <ul className="flex flex-wrap gap-2">
                    {meal.food.recommendedDrinkIngredients.map(ingredient => (
                        <li key={ingredient} className={`rounded-full px-2 ${ingredient === chosenDrinkIngredient ? "bg-green-600 font-semibold text-white" : "text-gray-700 bg-white"}`}>
                            <span>{ingredient}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="flex flex-col gap-2">
                <h2 className="font-bold">Rekommenderade drinkingredienser för <span className="text-orange-600">{meal.protein?.name}</span>:</h2>
                <ul className="flex flex-wrap gap-2">
                    {meal.protein?.recommendedDrinkIngredients.map(ingredient => (
                        <li key={ingredient} className={`rounded-full px-2 ${ingredient === chosenDrinkIngredient ? "bg-green-600 font-semibold text-white" : "text-gray-700 bg-white"}`}>
                            <span>{ingredient}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h2 className="font-bold">Vald drinkingrediens:</h2>
                <p className="text-green-600 font-bold text-xl">{chosenDrinkIngredient}</p>
            </div>

            {recommendedDrink &&
                <div className="flex flex-col gap-2">
                    <div>
                        <h2 className="font-bold leading-tight">Rekommenderad drink:</h2>
                        <DrinkDetails drink={recommendedDrink} highlightIngredient={chosenDrinkIngredient.toLowerCase()} onImageLoad={() => setImageLoaded(true)} hidden={!imageLoaded} />
                    </div>
                    <div>
                        <button onClick={handleSubmitClick} className="px-4 py-2 bg-amber-500 hover:bg-amber-400 rounded-full text-white font-bold">
                            Acceptera dryck och se ordersammanfattning
                        </button>
                    </div>
                    <div>
                        <button onClick={newRecommendation} className="px-4 py-2 bg-lime-500 hover:bg-lime-400 rounded-full text-white font-bold">
                            Ny rekommendation
                        </button>
                    </div>
                    <div>
                        <Link to="/choose-drink">
                            <button className="px-4 py-2 bg-sky-500 hover:bg-sky-400 rounded-full text-white font-bold">
                                Välj annan dryck
                            </button>
                        </Link>
                    </div>
                </div>
            }
        </div>
    );
}

export default DrinkRecommendation;