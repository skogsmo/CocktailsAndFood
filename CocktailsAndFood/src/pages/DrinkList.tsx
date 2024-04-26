import { DrinkCard } from "../components/DrinkComponent";
import { Navigate } from "react-router-dom";
import { useOrderContext } from "../context/OrderContext";
import StandardButton from "../components/StandardButton";
import StandardHeader from "../layout_components/StandardHeader";
import BigWhiteBox from "../layout_components/BigWhiteBox";
import BigWhiteBoxSection from "../layout_components/BigWhiteBoxSection";
import { useDataContext } from "../context/DataContext";

export const DrinkList = () => {
    const { isOrdersEmpty } = useOrderContext();

    const { drinksInfo } = useDataContext();

    if (isOrdersEmpty) return <Navigate to="/menu" />;

    return (
        <>
            <StandardHeader head={"Välj egen cocktail"} />

            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-8 mb-8">
                {drinksInfo
                    .filter((d) => d.selectable)
                    .map((d) => (
                        <DrinkCard key={d.drinkId} drinkId={d.drinkId} />
                    ))}
            </div>

            <BigWhiteBox>
                <BigWhiteBoxSection>
                    <div className="flex justify-center">
                        <StandardButton
                            to="/drinkselection"
                            className="min-w-fit px-8 flex items-center gap-4">
                            <i className="fa-solid fa-arrow-left-long"></i>
                            <span>Tillbaka</span>
                        </StandardButton>
                    </div>
                </BigWhiteBoxSection>
            </BigWhiteBox>
        </>
    );
};
