import { DrinkCard } from "../components/DrinkComponent";
import { Navigate } from "react-router-dom";
import { useOrderContext } from "../context/Context";
import StandardButton from "../components/StandardButton";
import { useCancelOrderBar, useCartButton } from "../layout/BaseLayout";

export const DrinkList = () => {
    useCartButton(true);
    useCancelOrderBar(true);
    
    const { isOrdersEmpty } = useOrderContext();

    if (isOrdersEmpty) return <Navigate to="/menu" />;

    return (
        <>
        <div className="main-wrapper">
            <h2 className="pb-[50px]">Välj egen cocktails</h2>

            <div className="w-full md:rounded-[25px] overflow-hidden bg-white shadow-custom-big p-[30px]">
                <div className="grid grid-cols-[repeat(auto-fit,minmax(175px,1fr))] gap-8">
                    <DrinkCard drinkId={"11000"} />
                    <DrinkCard drinkId={"11002"} />
                    <DrinkCard drinkId={"11007"} />
                    <DrinkCard drinkId={"178369"} />
                    <DrinkCard drinkId={"12572"} />
                    <DrinkCard drinkId={"15801"} />
                    <DrinkCard drinkId={"11938"} />
                    <DrinkCard drinkId={"13847"} />
                </div>
                    <hr className="border-neutral-300 border-t mt-[50px] mb-[35px]" />
                    <StandardButton to="/drinkselection">Tillbaka</StandardButton>
                </div>
            </div>

            
        </>
    );
};
