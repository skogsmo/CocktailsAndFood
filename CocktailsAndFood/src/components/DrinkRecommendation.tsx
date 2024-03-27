import { useContext, useEffect, useState } from "react";
import { CartContext, CartContextType } from "../contexts/CartContext";
import { useLocation, useNavigate } from "react-router-dom";
import getRandomIndex from "../utils/getRandomIndex";
import cachableGetUrl from "../utils/apiUrl";
import { USE_CACHED_API_CALLS } from "../constants";
import IDrinkDetailsResponse from "../interfaces/IDrinkDetailsResponse";
import IDrinksResponse from "../interfaces/IDrinksResponse";
import drinkResponseToDrink from "../utils/drinkResponseToDrink";

export function DrinkRecommendation() {

    const navigate = useNavigate();
    const { meals, updateMeal } = useContext(CartContext) as CartContextType;
    const meal = meals.find(m => m.id === useLocation().state);

    if (!meal) {
        useEffect(() => {
            navigate("/menu");
        }, []);
        return null;
    }

    const [chosenDrinkIngredient, setChosenDrinkIngredient] = useState<string>("");

    const [imageLoaded, setImageLoaded] = useState<boolean>(false);

    useEffect(() => {
        meal.drink = undefined;
        setImageLoaded(false);

        const ingredients: string[] = meal.food.recommendedDrinkIngredients.filter(ingredient => meal.protein?.recommendedDrinkIngredients.includes(ingredient)
        );

        if (ingredients.length === 0) {
            ingredients.push(...meal.food.recommendedDrinkIngredients);
        }

        const randomIndex = getRandomIndex(ingredients.length);
        setChosenDrinkIngredient(ingredients[randomIndex]);
    }, []);

    useEffect(() => {
        if (chosenDrinkIngredient.length === 0) {
            return;
        };

        fetch(cachableGetUrl(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${chosenDrinkIngredient}`, USE_CACHED_API_CALLS))
            .then((res) => res.json())
            .then((drinksResponse: IDrinksResponse) => {
                const drinkIds = drinksResponse.drinks.map((drink) => drink.idDrink);
                const chosenDrinkId = drinkIds[getRandomIndex(drinkIds.length)];

                fetch(cachableGetUrl(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${chosenDrinkId}`, USE_CACHED_API_CALLS))
                    .then((res) => res.json())
                    .then((drinkResponse: IDrinkDetailsResponse) => {
                        const drink = drinkResponseToDrink(drinkResponse)
                        meal.drink = drink;
                        updateMeal(meal);
                    })
                    .catch((error) => {
                        console.error("Error fetching drink details: ", error);
                    });
            })
            .catch((error) => {
                console.error("Error fetching drinks based on chosen ingredient: ", error);
            });

    }, [chosenDrinkIngredient]);

    console.log(`ingredienser i vald drink: ${meal.drink?.ingredients}`);

    return (
        <>
            <div className="flex flex-col gap-4">

                <div className="flex flex-col gap-2">
                    <h2 className="font-bold">Rekommenderade drinkingredienser för <span className="text-orange-600">{meal.food.title}</span>:</h2>
                    <ul className="flex flex-wrap gap-2">
                        {meal.food.recommendedDrinkIngredients.map(ingredient => (
                            <li key={ingredient} className={`bg-white rounded-full px-2 ${ingredient === chosenDrinkIngredient ? "bg-green-600 font-semibold text-white" : "text-gray-700"}`}>
                                <span>{ingredient}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex flex-col gap-2">
                    <h2 className="font-bold">Rekommenderade drinkingredienser för <span  className="text-orange-600">{meal.protein?.name}</span>:</h2>
                    <ul className="flex flex-wrap gap-2">
                        {meal.protein?.recommendedDrinkIngredients.map(ingredient => (
                            <li key={ingredient} className={`bg-white rounded-full px-2 ${ingredient === chosenDrinkIngredient ? "bg-green-600 font-semibold text-white" : "text-gray-700"}`}>
                                <span>{ingredient}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h2 className="font-bold">Vald drinkingrediens:</h2>
                    <p className="text-green-600 font-bold text-xl">{chosenDrinkIngredient}</p>
                </div>

                {meal.drink &&
                    <div hidden={!imageLoaded} className="flex flex-col gap-2">
                        <div>
                            <h2 className="font-bold leading-tight">Föreslagen drink:</h2>
                            <p className="font-bold text-2xl text-sky-500 leading-tight">{meal.drink.name}</p>
                            <p className="text-gray-600">({meal.drink.alcoholic ? "Innehåller alkohol" : "Alkoholfri"})</p>
                        </div>
                        <div>
                            <p className="font-bold">Ingredienser ({meal.drink.ingredients.length} st): </p>
                            <ul className="list-disc">
                                {meal.drink.ingredients.map((ingredient, index) => (
                                    <li key={index} className="ml-6">
                                        <span className={ingredient === chosenDrinkIngredient ? "text-green-600 font-bold" : "text-gray-700"}>{ingredient}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <img
                            className="max-w-[200px]"
                            src={`${meal.drink.imageUrl}/preview`}
                            onLoad={() => setImageLoaded(true)}
                        />
                        <p>thecocktaildb id: {meal.drink.id}</p>
                    </div>
                }
            </div>
        </>
    );
}
