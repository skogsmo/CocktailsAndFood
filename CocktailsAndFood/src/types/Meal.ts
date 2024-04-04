import { v4 } from "uuid";
import { Drink } from "./Drink";
import { Food, createFood } from "./Food";
import { ExtraIngredient } from "./ExtraIngredient";

export type Meal = {
    id: string;
    food: Food;
    protein?: ExtraIngredient;
    carb?: ExtraIngredient;
    drink?: Drink;
};

export function createMeal(food?: Food, protein?: ExtraIngredient, drink?: Drink): Meal {
    return {
        id: v4(),
        food: food ?? createFood(),
        protein,
        drink
    };
}

export const mealIsFinalized = (meal: Meal) => 
    (meal.id && meal.food && meal.protein && meal.carb && meal.drink) ? true : false;

export const getMealTotalPrice = (meal: Meal) =>
    meal.food.price +
    (meal.carb ? meal.carb.price : 0) +
    (meal.drink?.price ? meal.drink.price : 0) +
    (meal.protein ? meal.protein?.price : 0);