import { DrinkCard } from "../components/DrinkComponent";
import { Link, Navigate } from "react-router-dom";
import { useOrderContext } from "../context/Context";

export const DrinkList = () => {
    const { isOrdersEmpty } = useOrderContext();

    if (isOrdersEmpty) return <Navigate to="/menu" />;

    <h1>Välj egen cocktails</h1>;
    return (
        <>
            <DrinkCard drinkId={"11000"} />
            <DrinkCard drinkId={"11002"} />
            <DrinkCard drinkId={"11007"} />
            <DrinkCard drinkId={"178369"} />
            <DrinkCard drinkId={"12572"} />
            <DrinkCard drinkId={"15801"} />
            <DrinkCard drinkId={"11938"} />
            <DrinkCard drinkId={"13847"} />

            <Link to="/drinkselection">Tillbaka</Link>
        </>
    );
};
