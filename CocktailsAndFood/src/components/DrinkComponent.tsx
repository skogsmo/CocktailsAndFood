import { useEffect, useState } from "react";
import {
    Cocktail,
    DrinkDetailsResponse,
    mapDrinkDetailsWithCocktail,
} from "../orderTypes";
import { useNavigate } from "react-router-dom";
import { ActionType, useOrderContext } from "../context/OrderContext";
import StandardButton from "./StandardButton";

export const DrinkCard = ({ drinkId, drinkPrice }: { drinkId: string, drinkPrice: number; }) => {
    const { dispatch, currentOrder } = useOrderContext();
    const [formattedDrink, setFormattedDrink] = useState<Cocktail | undefined>(
        undefined
    );

    const navigate = useNavigate();

    useEffect(() => {
        const getCocktails = async () => {
            const response = await fetch(
                `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`
            );
            const data: DrinkDetailsResponse = await response.json();
            setFormattedDrink(mapDrinkDetailsWithCocktail(data, drinkPrice));
        };
        getCocktails();
    }, [drinkId]);

    const handleClick = () => {
        const updatedOrder = {
            ...currentOrder,
            Cocktail: formattedDrink,
        };

        dispatch({
            type: ActionType.UPDATE_ORDER,
            payload: updatedOrder,
        });
        navigate("/checkout");
    };

    return (
        <>
            <div>
                <img
                    src={formattedDrink?.ImgUrl}
                    className="object-fit md:rounded-[25px]"
                />
                <div className="flex flex-col items-center">
                    <div className="flex flex-col gap-1 text-center">
                        <h4 className="font-bold leading-tight pt-[20px]">
                            {formattedDrink?.CocktailName}
                        </h4>
                        <p className="font-semibold mb-[15px]">
                            {formattedDrink?.Price} kr
                        </p>
                    </div>
                    <StandardButton onClick={handleClick} small>
                        Välj
                    </StandardButton>
                </div>
            </div>
        </>
    );
};
