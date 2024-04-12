import { DrinkCard } from "../components/DrinkComponent";

export const DrinkList = () => {
    <h1>Välj egen cocktails</h1>
    return (
        <>

        <DrinkCard drinkId={"11000"} price={120}/>
        <DrinkCard drinkId={"11002"} price={125}/>
        <DrinkCard drinkId={"11007"} price={130}/>
        <DrinkCard drinkId={"178369"} price={150}/>
        <DrinkCard drinkId={"12572"} price={90}/>
        <DrinkCard drinkId={"15801"} price={95}/>
        <DrinkCard drinkId={"11938"} price={110}/>
        <DrinkCard drinkId={"13847"} price={117}/>

        </>
    )
}
