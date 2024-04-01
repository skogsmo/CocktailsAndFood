import { createContext, useState } from "react";
import { Meal } from "../types/Meal";

export const CartContext = createContext<CartContextType | null>(null);

export type CartContextType = {
    meals: Meal[];
    addMeal: (meal: Meal) => void;
    updateMeal: (updatedMeal: Meal) => void;
    removeMeal: (mealId: string) => void;
    emptyCart: () => void;
};

export const CartProvider = ({children}: { children: React.ReactNode }) => {

    const [meals, setMeals] = useState<Meal[]>([]);

    const addMeal = (meal: Meal) => {
        setMeals([...meals, meal]);
    }

    const updateMeal = (updatedMeal: Meal) => {
        setMeals(prevMeals =>
            prevMeals.map(m => {
                if (m.id === updatedMeal.id) {
                    return updatedMeal;
                }
                return m;
            })
        );
    };

    const removeMeal = (mealId: string) => {
        setMeals(prevMeals => prevMeals.filter(m => m.id !== mealId));
    };

    const emptyCart = () => {
        setMeals([]);
    };

    return (
        <CartContext.Provider value={{ meals, addMeal, updateMeal, removeMeal, emptyCart }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
