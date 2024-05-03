import { useEffect, useState } from "react";
import { Cocktail } from "../orderTypes";
import { useNavigate } from "react-router-dom";
import { ActionType, useOrderContext } from "../context/OrderContext";
import StandardButton from "./StandardButton";
import { useDataContext } from "../context/DataContext";

export const DrinkCard = ({ drinkId }: { drinkId: string }) => {
    const { dispatch, currentOrder } = useOrderContext();
    const { getCocktail } = useDataContext();
    const [cocktail, setCocktail] = useState<Cocktail | undefined>(undefined);

    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const cocktail = await getCocktail(drinkId);
            setCocktail(cocktail);
        })();
    }, []);

    const handleClick = () => {
        const updatedOrder = {
            ...currentOrder,
            Cocktail: cocktail,
        };

        dispatch({
            type: ActionType.UPDATE_ORDER,
            payload: updatedOrder,
        });
        navigate("/checkout");
    };

    return (
        <>
            {cocktail ? (
                <div
                    onClick={handleClick}
                    className="flex bg-white md:rounded-2xl shadow-custom-big overflow-hidden h-full cursor-pointer group">
                    <div className="w-1/3 h-full overflow-hidden">
                        <img
                            src={cocktail.ImgUrl}
                            className="h-full object-cover w-full group-hover:scale-110 duration-150"
                        />
                    </div>
                    <div className="flex flex-col justify-between gap-4 w-2/3 p-8 pt-7">
                        <div className="flex flex-col gap-1">
                            <div>
                                <h4 className="font-bold leading-tight -my-1">
                                    {cocktail.CocktailName}
                                </h4>
                                <div className="flex gap-3 items-center">
                                    <p className="font-semibold my-2 text-sm">
                                        {cocktail.Price.toFixed(2)} kr
                                    </p>
                                </div>
                            </div>
                            <p className="text-xs">{cocktail.Description}</p>
                        </div>
                        <StandardButton yellow small>
                            Välj
                        </StandardButton>
                    </div>
                </div>
            ) : (
                <div className="flex bg-white md:rounded-2xl shadow-custom-big overflow-hidden h-full cursor-pointer group p-8">
                    Laddar cocktail...
                </div>
            )}
        </>
    );
};
