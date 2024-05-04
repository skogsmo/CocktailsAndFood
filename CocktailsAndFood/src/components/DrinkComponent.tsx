import { useEffect, useState } from "react";
import { Cocktail } from "../orderTypes";
import { useNavigate } from "react-router-dom";
import { ActionType, useOrderContext } from "../context/OrderContext";
import { useDataContext } from "../context/DataContext";
import ItemCard from "./ItemCard";

export const DrinkComponent = ({ drinkId }: { drinkId: string }) => {
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
                <ItemCard item={cocktail} onClicked={handleClick} />
            ) : (
                <div className="flex bg-white md:rounded-2xl shadow-custom-big overflow-hidden h-full cursor-pointer group p-8">
                    Laddar cocktail...
                </div>
            )}
        </>
    );
};
