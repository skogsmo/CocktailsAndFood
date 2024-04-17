import { useEffect, useState } from "react";
import { Cocktail, DrinkDetailsResponse, mapDrinkDetailsWithCocktail } from "../orderTypes";
import { useNavigate } from "react-router-dom";
import { useOrderContext } from "../context/Context";


export const DrinkCard = ({ drinkId}:
   { drinkId: String}) => {
  const {updateOrder, currentOrder} = useOrderContext();
  const [formattedDrink, setFormattedDrink] = useState<Cocktail | undefined>(
    undefined
  );

  const navigate = useNavigate();
  
  useEffect(() => {
    const getCocktails = async () => {
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`
      );
      const data: DrinkDetailsResponse = await response.json();
      setFormattedDrink(mapDrinkDetailsWithCocktail(data));
    };
    getCocktails();
  }, [drinkId]);
  
  const handleClick = () => {
    const updatedOrder = {
      ...currentOrder,
      Cocktail: formattedDrink,
    };

    updateOrder(updatedOrder);
    navigate("/checkout");
  };

  return <> 
    <div>
    <img src={formattedDrink?.ImgUrl} />
      <h2>{formattedDrink?.CocktailName}</h2>
      <p>
        <strong>{formattedDrink?.Price} KR</strong>
      </p>
      <button onClick={(handleClick)}>Välj</button>
    </div>
  </>;
};