import { createContext, useState } from "react";
import { Meal } from "../types/Meal";

export const CartContext = createContext<CartContextType | null>(null);

export type CartContextType = {
    meals: Meal[];
    addToCart: (meal: Meal) => void;
    updateMeal: (updatedMeal: Meal) => void;
};

// TODO: persist med localstorage?

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [meals, setMeals] = useState<Meal[]>([]);

    const addToCart = (meal: Meal) => {
        setMeals([...meals, meal]);
    }

    const updateMeal = (updatedMeal: Meal) => {
        setMeals(prevMeals => {
            return prevMeals.map((m) => {
                if (m.id === updatedMeal.id) {
                    return updatedMeal;
                }
                return m;
            });
        });
        
        console.log(meals)
    };

    return (
        <CartContext.Provider value={{ meals, addToCart, updateMeal }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
