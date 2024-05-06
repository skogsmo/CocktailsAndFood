import { Cocktail } from "../orderTypes";

export const CocktailCard = ({ cocktail }: { cocktail: Cocktail }) => {
  return (
    <div>
      <img src={cocktail.imageUrl} />
      <h2>{cocktail.title}</h2>
      <p>{cocktail.description}</p>
      <p>
        <strong>{cocktail.price}</strong>
      </p>
    </div>
  );
};
