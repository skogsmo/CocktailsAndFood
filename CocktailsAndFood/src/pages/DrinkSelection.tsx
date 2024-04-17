import { useEffect, useState } from "react";
import { CocktailCard } from "../components/CocktailCard";
import { Cocktail, DrinkDetailsResponse, mapDrinkDetailsWithCocktail } from "../orderTypes";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useOrderContext } from "../context/Context";

export const DrinkSelection = () => {

  const {currentOrder, updateOrder, isOrdersEmpty} = useOrderContext();

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

    updateOrder(updatedOrder);
    navigate("/checkout");
  };

  return (
    <>
      <h1>Din cocktailrekommendation</h1>
      <p>
        Låt dig inspireras av vårt förslag eller valj att skapa din egen unika
        smakresa genom att byta ut rekommendationen mot en annan cocktail från
        vår meny.
      </p>
      {formattedDrink && (
        <>
          <CocktailCard cocktail={formattedDrink} />
          <Link to="/drinklist">Gå till drinkmenyn</Link>
          <button onClick={handleClick}>Acceptera förslag</button>
        </>
      )}
    </>
  );
};
