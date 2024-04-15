import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Meal } from "../types/Meal";
import { ExtraIngredient } from "../types/ExtraIngredient";
import { ActionType, useCart } from "../contexts/CartContext";

export function CustomizeOrder() {

    const [proteins, setProteins] = useState<ExtraIngredient[]>([]);
    const [carbs, setCarbs] = useState<ExtraIngredient[]>([]);
    
    const { state, dispatch } = useCart();

    useEffect(() => {
        fetch("data/proteins.json")
            .then((response) => response.json())
            .then((data) => setProteins(data));
        fetch("data/carbs.json")
            .then((response) => response.json())
            .then((data) => setCarbs(data));
    }, []);

    const currentMeal = state.meals.find(meal => meal.id === state.currentMealId);

    if (!currentMeal) {
        console.warn("Meal not found in CustomizeOrder");
        return <Navigate to="/menu" />;
    }

    const handleIngredientChange = (type: keyof Meal, event: React.ChangeEvent<HTMLInputElement>) => {
        const ingredientObject = JSON.parse(event.target.dataset[type] as string);
        const updatedMeal = {...currentMeal, [type]: ingredientObject};
        dispatch({ type: ActionType.UPDATE_MEAL, payload: updatedMeal });
    };

    return (
        <div className="flex flex-col gap-4 p-4 bg-slate-200 min-h-screen">
            <img src={currentMeal.food.imageUrl} className="w-[300px]" />
            <h2 className="font-bold text-xl">{currentMeal.food.title}</h2>
            <p>{currentMeal.food.description}</p>
            <p className="font-semibold">Pris: {currentMeal.food.price} kr</p>

            <div className="p-2 rounded-lg bg-white w-fit">
                <h3 className="font-bold">Val av protein, välj 1 st</h3>
                {proteins.map((protein, index) => (
                    <div key={index}>
                        <input
                            type="radio"
                            id={`protein-${index}`}
                            name="protein"
                            value={protein.id}
                            checked={currentMeal.protein ? currentMeal.protein.id === protein.id : false}
                            onChange={e => handleIngredientChange("protein", e)}
                            data-protein={JSON.stringify(protein)}
                        />
                        <label htmlFor={`protein-${index}`}>{protein.name} <span className="text-gray-400">(+{protein.price} kr)</span></label>
                    </div>
                ))}
            </div>

            <div className="p-2 rounded-lg bg-white w-fit">
                <h3 className="font-bold">Ris eller sallad för bowl, välj 1 St</h3>
                {carbs.map((carb, index) => (
                    <div key={index}>
                        <input
                            type="radio"
                            id={`carb-${index}`}
                            name="carb"
                            value={carb.id}
                            checked={currentMeal.carb ? currentMeal.carb.id === carb.id : false}
                            onChange={e => handleIngredientChange("carb", e)}
                            data-carb={JSON.stringify(carb)}
                        />
                        <label htmlFor={`carb-${index}`}>{carb.name} <span className="text-gray-400">(+{carb.price} kr)</span></label>
                    </div>
                ))}
            </div>
            {currentMeal.carb && currentMeal.protein &&
                <div>
                    <Link to="/drink-recommendation" onClick={() => {dispatch({ type: ActionType.SET_DRINK, payload: undefined })}}>
                        <button className="px-4 py-2 bg-amber-500 hover:bg-amber-400 rounded-full text-white font-bold">
                            Till drinkrekommendation!
                        </button>
                    </Link>
                </div>
            }
        </div>
    );
}