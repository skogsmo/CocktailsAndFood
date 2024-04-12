import { DrinkCard } from "../components/DrinkComponent";
import { Order } from "../orderTypes";
import { CartModifiers } from "../App";
import { Link } from "react-router-dom";

export const DrinkList = ({currentOrder, updateOrder}: {currentOrder: Order, updateOrder: CartModifiers["updateOrder"]}) => {
    <h1>Välj egen cocktails</h1>
    return (
        <>

        <DrinkCard drinkId={"11000"} currentOrder={currentOrder} updateOrder={updateOrder}/>
        <DrinkCard drinkId={"11002"} currentOrder={currentOrder} updateOrder={updateOrder}/>
        <DrinkCard drinkId={"11007"} currentOrder={currentOrder} updateOrder={updateOrder}/>
        <DrinkCard drinkId={"178369"} currentOrder={currentOrder} updateOrder={updateOrder}/>
        <DrinkCard drinkId={"12572"} currentOrder={currentOrder} updateOrder={updateOrder}/>
        <DrinkCard drinkId={"15801"} currentOrder={currentOrder} updateOrder={updateOrder}/>
        <DrinkCard drinkId={"11938"} currentOrder={currentOrder} updateOrder={updateOrder}/>
        <DrinkCard drinkId={"13847"} currentOrder={currentOrder} updateOrder={updateOrder}/>


        <Link to="/drinkselection">Tillbaka</Link>
        </>
    )
}
