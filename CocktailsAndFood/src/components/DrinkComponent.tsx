import { useEffect, useState } from "react";

interface DrinkDetailsResponse {
  drinks: {
    idDrink: string;
    strDrink: string;
    strDrinkThumb: string;
  
  }[];
}

export const DrinkCard = ({ drinkId, price }: { drinkId: String, price: number }) => {
  const [formattedDrink, setFormattedDrink] = useState<DrinkDetailsResponse | undefined>(
    undefined
  );
  useEffect(() => {
    const getCocktails = async () => {
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`
      );
      console.log("API response:", response);
      const data: DrinkDetailsResponse = await response.json();
      setFormattedDrink(data);
      console.log("data:", data);
    };
    getCocktails();
  }, [drinkId]);

  return <>
    <div>
    <img src={formattedDrink?.drinks[0].strDrinkThumb} />
      <h2>{formattedDrink?.drinks[0].strDrink}</h2>
      <p>
        <strong>{price} KR</strong>
      </p>
      <button onClick={() => ""}>Välj</button>
    </div>
  </>;
};