import { DrinkCard } from "../components/DrinkComponent";
import { Navigate } from "react-router-dom";
import { useOrderContext } from "../context/Context";
import StandardButton from "../components/StandardButton";

export const DrinkList = () => {
    const { isOrdersEmpty } = useOrderContext();

    if (isOrdersEmpty) return <Navigate to="/menu" />;

    return (
        <>
            <div className="main-wrapper relative">
                <h2 className="pb-[50px]">Välj egen cocktail</h2>

                <div className="w-full md:rounded-[25px] overflow-hidden bg-white shadow-custom-big">
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(175px,1fr))] gap-8 p-8">
                        <DrinkCard drinkId={"11000"} />
                        <DrinkCard drinkId={"11002"} />
                        <DrinkCard drinkId={"11007"} />
                        <DrinkCard drinkId={"178369"} />
                        <DrinkCard drinkId={"12572"} />
                        <DrinkCard drinkId={"15801"} />
                        <DrinkCard drinkId={"11938"} />
                        <DrinkCard drinkId={"13847"} />
                    </div>
                    <hr className="border-neutral-300 border-t" />
                    <div className="p-8">
                        <StandardButton to="/drinkselection">
                            Tillbaka
                        </StandardButton>
                    </div>
                </div>
            </div>
        </>
    );
};
