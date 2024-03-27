import { v4 } from "uuid";
import { Drink } from "./Drink";
import { Food } from "./Food";
import { ExtraIngredient } from "./ExtraIngredient";

export type Meal = {
    id: string;
    food: Food;
    protein?: ExtraIngredient;
    carb?: ExtraIngredient;
    drink?: Drink;
};

export function createMeal(food: Food, protein?: ExtraIngredient, drink?: Drink): Meal {
    return {
        id: v4(),
        food,
        protein,
        drink
    };
}