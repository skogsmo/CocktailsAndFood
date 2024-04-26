import { DrinkCard } from "../components/DrinkComponent";
import { Navigate } from "react-router-dom";
import { useOrderContext } from "../context/OrderContext";
import StandardButton from "../components/StandardButton";
import StandardHeader from "../layout_components/StandardHeader";
import BigWhiteBox from "../layout_components/BigWhiteBox";
import BigWhiteBoxSection from "../layout_components/BigWhiteBoxSection";
import BigWhiteBoxDivider from "../layout_components/BigWhiteBoxDivider";
import { useDataContext } from "../context/DataContext";

export const DrinkList = () => {
    const { isOrdersEmpty } = useOrderContext();

    const {drinksInfo} = useDataContext();

    if (isOrdersEmpty) return <Navigate to="/menu" />;

    return (
        <>
            <StandardHeader head={"Välj egen cocktail"} />
            <BigWhiteBox>
                <BigWhiteBoxSection>
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(175px,1fr))] gap-x-8 gap-y-12">
                        {drinksInfo
                            .filter((d) => d.selectable)
                            .map((d) => (
                                <DrinkCard key={d.drinkId} drinkId={d.drinkId} />
                            ))}
                    </div>
                </BigWhiteBoxSection>

                <BigWhiteBoxDivider />

                <BigWhiteBoxSection>
                    <StandardButton to="/drinkselection">
                        Tillbaka
                    </StandardButton>
                </BigWhiteBoxSection>
            </BigWhiteBox>
        </>
    );
};
