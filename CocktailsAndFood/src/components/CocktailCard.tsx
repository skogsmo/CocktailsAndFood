import { Cocktail } from "../orderTypes";

export const CocktailCard = ({ cocktail }: { cocktail: Cocktail }) => {
  return (
    <div>
      <img src={cocktail.ImgUrl} />
      <h2>{cocktail.CocktailName}</h2>
      <p>{cocktail.Description}</p>
      <p>
        <strong>{cocktail.Price}</strong>
      </p>
    </div>
  );
};
