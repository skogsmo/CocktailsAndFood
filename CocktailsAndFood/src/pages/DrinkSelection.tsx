import { useEffect, useState } from "react";
import StandardButton from "../components/StandardButton";
import {
    Cocktail,
    DrinkDetailsResponse,
    mapDrinkDetailsWithCocktail,
} from "../orderTypes";
import { Navigate, useNavigate } from "react-router-dom";
import { ActionType, useOrderContext } from "../context/Context";
import { useCancelOrderBar, useCartButton } from "../layout/BaseLayout";

export const DrinkSelection = () => {
    useCartButton(true);
    useCancelOrderBar(true);
    
    const { currentOrder, dispatch, isOrdersEmpty } = useOrderContext();

    if (isOrdersEmpty) return <Navigate to="/menu" />;

    const navigate = useNavigate();
    const [formattedDrink, setFormattedDrink] = useState<Cocktail | undefined>(
        undefined
    );
    const [cocktailId] = useState(() => {
        switch (currentOrder.Protein?.Id) {
            case 1:
                return "11410";
            case 2:
                return "12198";
            case 3:
                return "11422";
            case 4:
                return "13731";
            case 5:
                return "12690";
            default:
                break;
        }
    });

    useEffect(() => {
        const getCocktails = async () => {
            const response = await fetch(
                `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailId}`
            );
            const data: DrinkDetailsResponse = await response.json();
            setFormattedDrink(mapDrinkDetailsWithCocktail(data));
        };
        getCocktails();
    }, [cocktailId]);

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
            <div className="main-wrapper">
                <div className="px-8 md:px-0 text-center flex flex-col gap-5 mb-[50px]">
                    <h2>Din cocktailrekommendation</h2>
                    <p className="text-lg">
                        Låt dig inspireras av vårt förslag eller valj att skapa
                        din egen unika smakresa genom att byta ut
                        rekommendationen mot en annan cocktail från vår meny.
                    </p>
                </div>

                {formattedDrink && (
                    <div className="w-full md:rounded-[25px] overflow-hidden bg-white shadow-custom-big">
                        <div className="w-full flex flex-col-reverse gap-4 items-center md:flex-row justify-between p-8">
                            <img
                                className="h-[350px] w-full object-fit md:rounded-[25px]"
                                src={formattedDrink.ImgUrl}
                            />
                            <div>
                                <h2>{formattedDrink.CocktailName}</h2>
                                <p className="font-semibold my-[15px]">
                                    {formattedDrink.Price.toFixed(2)} kr
                                </p>
                                <p>{formattedDrink.Description}</p>
                            </div>
                        </div>

                        <hr className="border-neutral-300 border-t" />

                        <div className="w-full flex flex-col-reverse gap-4 items-center md:flex-row justify-between p-8">
                            <StandardButton to={"/drinklist"}>
                                Gå till drinkmenyn
                            </StandardButton>
                            <StandardButton onClick={handleClick} yellow>
                                Acceptera förslag
                            </StandardButton>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};
