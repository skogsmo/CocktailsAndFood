import { useContext, useEffect, useRef, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { CartContextType, CartContext } from "../contexts/CartContext";
import cachableGetUrl from "../utils/apiUrl";
import { API_CACHER_BASE_URL, USE_CACHED_API_CALLS } from "../constants";
import ICategoriesResponse from "../interfaces/ICategoriesResponse";
import IDrinksResponse from "../interfaces/IDrinksResponse";
import { Drink, getDrinkPrice } from "../types/Drink";
import IDrinkDetailsResponse from "../interfaces/IDrinkDetailsResponse";
import drinkResponseToDrink from "../utils/drinkResponseToDrink";
import DrinkDetails from "./DrinkDetails";
import DrinksList from "./DrinksList";

export function ChooseDrink() {

    const { meals, updateMeal } = useContext(CartContext) as CartContextType;
    const meal = meals.find(m => m.id === useLocation().state);
    if (!meal) return <Navigate to="/menu" />;

    const navigate = useNavigate();

    const [drinkCategories, setDrinkCategories] = useState<string[]>([]);
    const [currentCategory, setCurrentCategory] = useState<string>("");
    const [drinksInCategory, setDrinksInCategory] = useState<Drink[]>([])
    const [selectedDrink, setSelectedDrink] = useState<Drink | undefined>(undefined)
    const [imageLoaded, setImageLoaded] = useState<boolean>(false)

    const abortControllerRef = useRef<AbortController | undefined>(undefined);

    useEffect(() => {
        fetchCategories();

        return () => {
            abortControllerRef.current?.abort();
        }
    }, []);

    const fetchCategories = async () => {
        abortControllerRef.current?.abort();
        abortControllerRef.current = new AbortController();
        const signal = abortControllerRef.current.signal;

        try {
            const response = await fetch(cachableGetUrl(API_CACHER_BASE_URL, "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list", USE_CACHED_API_CALLS), { signal });
            console.log("response: ");
            console.log(response);
            const json: ICategoriesResponse = await response.json();
            console.log("json: ");
            console.log(json);
            const categories: string[] = json.drinks.map(cat => cat.strCategory)

            setDrinkCategories(categories);
        } catch (error: any) {
            if (error.name === 'AbortError') {
                console.log('Categories fetch aborted');
            } else {
                console.error('Error fetching drink categories:', error);
            }
        }
    }

    const handleCategoryClick = async (e: React.MouseEvent<HTMLButtonElement>) => {

        const category = e.currentTarget.value;

        await getDrinksForCategory(category);
    };

    const getDrinksForCategory = async (category: string) => {

        abortControllerRef.current?.abort();
        abortControllerRef.current = new AbortController();
        const signal = abortControllerRef.current.signal;

        try {
            const response = await fetch(cachableGetUrl(API_CACHER_BASE_URL, `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`, USE_CACHED_API_CALLS), { signal });
            const drinksResponse: IDrinksResponse = await response.json();
            const drinks: Drink[] = drinksResponse.drinks.map((drink) => {
                return {
                    id: drink.idDrink,
                    name: drink.strDrink,
                    imageUrl: drink.strDrinkThumb
                }
            });

            setCurrentCategory(category);
            setDrinksInCategory(drinks);
        } catch (error: any) {
            if (error.name === 'AbortError') {
                console.log('Drink fetch aborted');
            } else {
                console.error('Error fetching drink:', error);
            }
        }
    };

    const getDrinkDetails = async (drinkId: string): Promise<Drink | undefined> => {
        console.log(`Fetching drinks with id: ${drinkId}`);

        abortControllerRef.current?.abort();
        abortControllerRef.current = new AbortController();
        const signal = abortControllerRef.current.signal;

        setImageLoaded(false);

        try {
            const result = await fetch(cachableGetUrl(API_CACHER_BASE_URL, `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`, USE_CACHED_API_CALLS), { signal });
            const drinkDetailsResponse: IDrinkDetailsResponse = await result.json();
            const drink = drinkResponseToDrink(drinkDetailsResponse);

            drink.price = getDrinkPrice(drink);

            setSelectedDrink(drink);
        } catch (error: any) {
            if (error.name === 'AbortError') {
                console.log('Drink fetch aborted');
            } else {
                console.error('Error fetching drink:', error);
            }
            return undefined;
        }
    };

    const handleDrinkClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        getDrinkDetails(e.currentTarget.value)
    }

    const handleSubmitClick = async () => {
        meal.drink = selectedDrink;
        updateMeal(meal);

        navigate("/summary", { state: { key: meal.id } })
    }

    return (
        <div className="flex flex-col gap-4 p-4">
            <div className="flex flex-col gap-2">
                <h2 className="font-bold text-3xl text-orange-600">Välj kategori:</h2>
                <ul className="flex flex-wrap gap-2">
                    {drinkCategories.map(category => (
                        <li key={category}>
                            <button
                                value={category}
                                disabled={category === currentCategory}
                                className={`px-4 py-2 ${category === currentCategory ? "bg-orange-600" : "bg-amber-500 hover:bg-amber-400"} text-white rounded-full w-full font-bold`}
                                onClick={(e) => handleCategoryClick(e)}
                            >
                                {category}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            {currentCategory &&
                <>
                    <div className="flex flex-col gap-4 w-fit">

                        <div className="flex flex-col gap-2">
                            <h2 className="font-bold text-2xl text-green-500">{currentCategory}s</h2>
                            <DrinksList key={currentCategory} items={drinksInCategory} onDrinkClick={handleDrinkClick} />

                        </div>
                        <hr className="border-t-4 border-slate-500 border-dotted" />
                        {selectedDrink &&
                            <div className="flex flex-col gap-4">
                                <DrinkDetails drink={selectedDrink} onImageLoad={() => setImageLoaded(true)} hidden={!imageLoaded} />
                            </div>
                        }
                        <div className={`${!imageLoaded ? "invisible" : "visible"}`}>
                            <button onClick={handleSubmitClick} className="px-4 py-2 bg-amber-500 hover:bg-amber-400 rounded-full text-white font-bold">
                                Acceptera dryck och se ordersammanfattning
                            </button>
                        </div>
                    </div>
                </>
            }
            <Link to="/drink-recommendation">
                <button className="px-4 py-2 bg-sky-500 hover:bg-sky-400 rounded-full text-white font-bold">
                    Tillbaka till drinkrekommendationer
                </button>
            </Link>
        </div>
    )
}