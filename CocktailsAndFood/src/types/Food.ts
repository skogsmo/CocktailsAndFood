import { v4 } from "uuid";

export type Food = {
    _id: string;
    title: string;
    description: string;
    price: number;
    imageUrl: string;
    recommendedDrinkIngredients: string[];
}

export function createFood(
    title?: string,
    description?: string,
    price?: number,
    imageUrl?: string,
    recommendedDrinkIngredients?: string[]
    ): Food {
    return {
        _id: v4(),
        title: title ?? "",
        description: description ?? "",
        price: price ?? 0,
        imageUrl: imageUrl ?? "",
        recommendedDrinkIngredients: recommendedDrinkIngredients ?? []
    };
}