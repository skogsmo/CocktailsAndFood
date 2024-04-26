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
            <div
                className="bg-white rounded-2xl overflow-hidden shadow-custom-big flex flex-col hover:scale-[1.02] transition duration-[150ms] cursor-pointer"
                onClick={handleClick}>
                {cocktail ? (
                    <>
                        <img
                            src={cocktail?.ImgUrl}
                            className="object-cover aspect-square"
                        />
                        <div className="flex flex-col p-6 pb-8 gap-4 items-center justify-between grow">
                            <div className="flex flex-col gap-1 text-center">
                                <h4 className="font-bold leading-tight">
                                    {cocktail.CocktailName}
                                </h4>
                                <p className="font-semibold">
                                    {cocktail.Price} kr
                                </p>
                            </div>
                            <StandardButton
                                onClick={handleClick}
                                small
                                className="">
                                Välj
                            </StandardButton>
                        </div>
                    </>
                ) : (
                    <div className="w-full p-8 text-center">
                        Laddar cocktail...
                    </div>
                )}
            </div>
        </>
    );
};
