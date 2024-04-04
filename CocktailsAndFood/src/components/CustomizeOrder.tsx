import { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Meal } from "../types/Meal";
import { ExtraIngredient } from "../types/ExtraIngredient";
import { CartContext, CartContextType } from "../contexts/CartContext";

export function CustomizeOrder() {

    const [proteins, setProteins] = useState<ExtraIngredient[]>([]);
    const [carbs, setCarbs] = useState<ExtraIngredient[]>([]);
    
    const { updateMeal, getCurrentMeal } = useContext(CartContext) as CartContextType;

    useEffect(() => {
        fetch("data/proteins.json")
            .then((response) => response.json())
            .then((data) => setProteins(data));
        fetch("data/carbs.json")
            .then((response) => response.json())
            .then((data) => setCarbs(data));
    }, []);

    const [meal] = useState(() => getCurrentMeal());

    if (!meal) {
        console.warn("Meal not found in CustomizeOrder");
        return <Navigate to="/menu" />;
    }

    const handleIngredientChange = (type: keyof Meal, event: React.ChangeEvent<HTMLInputElement>) => {
        const ingredientObject = JSON.parse(event.target.dataset[type] as string);
        (meal[type] as ExtraIngredient) = ingredientObject;
        updateMeal(meal);
    };

    return (
        <div className="flex flex-col gap-4 p-4 bg-slate-200 min-h-screen">
            <img src={meal.food.imageUrl} className="w-[300px]" />
            <h2 className="font-bold text-xl">{meal.food.title}</h2>
            <p>{meal.food.description}</p>
            <p className="font-semibold">Pris: {meal.food.price} kr</p>

            <div className="p-2 rounded-lg bg-white w-fit">
                <h3 className="font-bold">Val av protein, välj 1 st</h3>
                {proteins.map((protein, index) => (
                    <div key={index}>
                        <input
                            type="radio"
                            id={`protein-${index}`}
                            name="protein"
                            value={protein.id}
                            checked={meal.protein ? meal.protein.id === protein.id : false}
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
                            checked={meal.carb ? meal.carb.id === carb.id : false}
                            onChange={e => handleIngredientChange("carb", e)}
                            data-carb={JSON.stringify(carb)}
                        />
                        <label htmlFor={`carb-${index}`}>{carb.name} <span className="text-gray-400">(+{carb.price} kr)</span></label>
                    </div>
                ))}
            </div>
            {meal.carb && meal.protein &&
                <div>
                    <Link to="/drink-recommendation" onClick={() => {meal.drink = undefined; updateMeal(meal)}}>
                        <button className="px-4 py-2 bg-amber-500 hover:bg-amber-400 rounded-full text-white font-bold">
                            Till drinkrekommendation!
                        </button>
                    </Link>
                </div>
            }
        </div>
    );
}