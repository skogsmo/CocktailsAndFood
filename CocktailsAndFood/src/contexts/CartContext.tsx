import { createContext, useState } from "react";
import { Meal, mealIsFinalized } from "../types/Meal";

export const CartContext = createContext<CartContextType | null>(null);

export type CartContextType = {
    getFinalizedMeals: () => Meal[];
    addMeal: (meal: Meal) => void;
    updateMeal: (updatedMeal: Meal) => void;
    removeMeal: (mealId: string) => void;
    emptyCart: () => void;
    getCurrentMeal: () => Meal | undefined;
    setCurrentMeal: (id: string) => void;
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {

    const [meals, setMeals] = useState<Meal[]>([]);
    const [currentMealId, setCurrentMealId] = useState<string | undefined>(undefined);

    const addMeal = (meal: Meal) => {
        console.log("Added meal with id " + meal.id);
        setMeals([...meals, meal]);
    }

    const getFinalizedMeals = (): Meal[] => {
        console.log("Getting finalized meals");
        return meals.filter(m => mealIsFinalized(m));
    }

    const getCurrentMeal = (): Meal | undefined => {
        console.log("Getting current meal");
        if (meals) {
            const meal = meals.find(m => m.id === currentMealId);
            if (meal) return meal;
            else return undefined;
        } else {
            console.warn("No meals found.");
            return undefined;
        }
    }

    const setCurrentMeal = (id: string) => {
        console.log("Current meal set to " + id);
        setCurrentMealId(id);
    }

    const updateMeal = (updatedMeal: Meal) => {
        console.log("Updating meal " + updatedMeal.id);
        setMeals(prevMeals =>
            prevMeals.map(m =>
                m.id === updatedMeal.id ? updatedMeal : m
            )
        );
    };

    const removeMeal = (mealId: string) => {
        console.log("Removing meal " + mealId);
        setMeals(prevMeals => prevMeals.filter(m => m.id !== mealId));
    };

    const emptyCart = () => {
        console.log("Emptying cart");
        setMeals([]);
    };

    return (
        <CartContext.Provider value={{ getFinalizedMeals: getFinalizedMeals, addMeal, updateMeal, removeMeal, emptyCart, getCurrentMeal, setCurrentMeal }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
