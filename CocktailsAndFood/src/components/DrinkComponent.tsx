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
    <div className="h-[300px] w-[212px] mt-[50px]">
      <img src={formattedDrink?.ImgUrl} className="object-fit md:rounded-[25px]" />
      <div className="flex flex-col items-center">
        <div className="flex flex-col gap-1">
        <h4 className="font-bold leading-[0.5] pt-[25px]">{formattedDrink?.CocktailName}</h4>
        <p className="font-semibold mb-[15px] mt-[5px]">
          {formattedDrink?.Price} KR
        </p>
        </div>
        <button onClick={(handleClick)} className="border-neutral-500 text-neutral-900 flex justify-center border-2 rounded-full p-1 text-sm text-center w-[180px] mb-[50px]">Välj</button>
      </div> 
    </div>
  </>;
};