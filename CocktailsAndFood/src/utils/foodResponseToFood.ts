import IFoodResponse from "../interfaces/IFoodResponse";
import { Food } from "../types/Food";

const foodDataToFood = (foodResponse: IFoodResponse): Food => ({
    _id: foodResponse._id,
    title: foodResponse.title,
    description: foodResponse.description,
    price: foodResponse.price,
    imageUrl: foodResponse.imageUrl,
    recommendedDrinkIngredients: foodResponse.categories,
});

export default foodDataToFood;