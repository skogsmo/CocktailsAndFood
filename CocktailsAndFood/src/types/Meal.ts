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

export const getMealTotalPrice = (meal: Meal) =>
    meal.food.price +
    (meal.carb ? meal.carb.price : 0) +
    (meal.drink?.price ? meal.drink.price : 0) +
    (meal.protein ? meal.protein?.price : 0);