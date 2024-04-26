import { useEffect, useState } from "react";
import StandardButton from "../components/StandardButton";
import { Cocktail } from "../orderTypes";
import { Navigate, useNavigate } from "react-router-dom";
import { ActionType, useOrderContext } from "../context/OrderContext";
import StandardHeader from "../layout_components/StandardHeader";
import BigWhiteBox from "../layout_components/BigWhiteBox";
import BigWhiteBoxSection from "../layout_components/BigWhiteBoxSection";
import BigWhiteBoxDivider from "../layout_components/BigWhiteBoxDivider";
import { useDataContext } from "../context/DataContext";

export const DrinkSelection = () => {
    const { currentOrder, dispatch, isOrdersEmpty } = useOrderContext();

    const { drinksInfo, getCocktail } = useDataContext();

    if (isOrdersEmpty) return <Navigate to="/menu" />;

    const navigate = useNavigate();

    const [formattedDrink, setFormattedDrink] = useState<Cocktail | undefined>(
        undefined
    );

    useEffect(() => {
        (async () => {
            const drinkInfo = drinksInfo.find(
                (d) => d.associatedProteinId === currentOrder.Protein?.Id
            );
            if (!drinkInfo) return;
            const cocktail = await getCocktail(drinkInfo?.drinkId);
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
            <StandardHeader
                head={"Din cocktailrekommendation"}
                subHead="Låt dig inspireras av vårt förslag eller valj att skapa din egen unika smakresa genom att byta ut rekommendationen mot en annan cocktail från vår meny."
            />
            {formattedDrink ? (
                <BigWhiteBox>
                    <BigWhiteBoxSection>
                        <div className="w-full flex flex-col-reverse gap-10 items-center md:flex-row justify-between">
                            <img
                                className="h-52 md:rounded-[25px]"
                                src={formattedDrink.ImgUrl}
                            />
                            <div>
                                <h3>{formattedDrink.CocktailName}</h3>
                                <p className="font-semibold mt-2 mb-4">
                                    {formattedDrink.Price.toFixed(2)} kr
                                </p>
                                <p>{formattedDrink.Description}</p>
                            </div>
                        </div>
                    </BigWhiteBoxSection>

                    <BigWhiteBoxDivider />

                    <BigWhiteBoxSection>
                        <div className="w-full flex flex-col-reverse gap-4 items-center md:flex-row justify-between">
                            <StandardButton to={"/detail"}>
                                Tillbaka
                            </StandardButton>
                            <StandardButton to={"/drinklist"}>
                                Välj egen cocktail
                            </StandardButton>
                            <StandardButton onClick={handleClick} yellow>
                                Acceptera förslag
                            </StandardButton>
                        </div>
                    </BigWhiteBoxSection>
                </BigWhiteBox>
            ) : (
                <BigWhiteBox>
                    <BigWhiteBoxSection>
                        <div className="w-full text-center">
                            Laddar cocktail...
                        </div>
                    </BigWhiteBoxSection>
                </BigWhiteBox>
            )}
        </>
    );
};
