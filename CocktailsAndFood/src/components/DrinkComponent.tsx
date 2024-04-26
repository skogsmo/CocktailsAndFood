import { useEffect, useState } from "react";
import { Cocktail } from "../orderTypes";
import { useNavigate } from "react-router-dom";
import { ActionType, useOrderContext } from "../context/OrderContext";
import StandardButton from "./StandardButton";
import { useDataContext } from "../context/DataContext";

export const DrinkCard = ({ drinkId }: { drinkId: string }) => {
    const { dispatch, currentOrder } = useOrderContext();
    const { getCocktail } = useDataContext();
    const [formattedDrink, setFormattedDrink] = useState<Cocktail | undefined>(
        undefined
    );

    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const cocktail = await getCocktail(drinkId);
            setFormattedDrink(cocktail);
        })();
    }, []);

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
