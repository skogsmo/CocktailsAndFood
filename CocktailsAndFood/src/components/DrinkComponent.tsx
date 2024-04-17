import { useEffect, useState } from "react";
import {
    Cocktail,
    DrinkDetailsResponse,
    mapDrinkDetailsWithCocktail,
} from "../orderTypes";
import { useNavigate } from "react-router-dom";
import { ActionType, useOrderContext } from "../context/Context";
import StandardLinkButton from "./StandardLinkButton";

export const DrinkCard = ({ drinkId }: { drinkId: String }) => {
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
            setFormattedDrink(mapDrinkDetailsWithCocktail(data));
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
            <div className="h-[300px] w-[212px] mt-[50px]">
                <img
                    src={formattedDrink?.ImgUrl}
                    className="object-fit md:rounded-[25px]"
                />
                <div className="flex flex-col items-center">
                    <div className="flex flex-col gap-1">
                        <h4 className="font-bold leading-[0.5] pt-[25px]">
                            {formattedDrink?.CocktailName}
                        </h4>
                        <p className="font-semibold mb-[15px] mt-[5px]">
                            {formattedDrink?.Price} KR
                        </p>
                    </div>
                    <StandardLinkButton onClick={handleClick} small className="p-[0.4rem]">
                        Välj
                    </StandardLinkButton>
                </div>
            </div>
        </>
    );
};
