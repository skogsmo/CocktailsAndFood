import { DrinkCard } from "../components/DrinkComponent";
import { Navigate } from "react-router-dom";
import { useOrderContext } from "../context/Context";
import StandardButton from "../components/StandardButton";
import StandardHeader from "../layout_components/StandardHeader";
import BigWhiteBox from "../layout_components/BigWhiteBox";
import BigWhiteBoxSection from "../layout_components/BigWhiteBoxSection";
import BigWhiteBoxDivider from "../layout_components/BigWhiteBoxDivider";

export const DrinkList = () => {
    const { isOrdersEmpty } = useOrderContext();

    if (isOrdersEmpty) return <Navigate to="/menu" />;

    return (
        <>
            <StandardHeader head={"Välj egen cocktail"} />
            <BigWhiteBox>
                <BigWhiteBoxSection>
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(175px,1fr))] gap-x-8 gap-y-12">
                        <DrinkCard drinkId={"11000"} />
                        <DrinkCard drinkId={"11002"} />
                        <DrinkCard drinkId={"11007"} />
                        <DrinkCard drinkId={"178369"} />
                        <DrinkCard drinkId={"12572"} />
                        <DrinkCard drinkId={"15801"} />
                        <DrinkCard drinkId={"11938"} />
                        <DrinkCard drinkId={"13847"} />
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
