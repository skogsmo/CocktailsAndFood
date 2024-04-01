import { Drink } from "../types/Drink";

export default function DrinkDetails({ drink, highlightIngredient, onImageLoad, hidden }: { drink: Drink, highlightIngredient?: string, onImageLoad?: () => void, hidden?: boolean }) {

    return (
        <div className={`${hidden ? "hidden" : "flex"} flex flex-col gap-2`}>
            <div>
                <p className="font-bold text-2xl text-sky-500 leading-tight">{drink.name}</p>
                <p className="text-gray-600 text-sm">({drink.alcoholic ? "Innehåller alkohol" : "Alkoholfri"})</p>
            </div>
            <div>
                <p className="font-bold">Ingredienser ({drink.ingredients?.length} st): </p>
                <ul className="list-disc">
                    {drink.ingredients?.map((ingredient, index) => (
                        <li key={index} className="ml-6">
                            <span className={ingredient.toLowerCase() === highlightIngredient ? "text-green-600 font-bold" : "text-gray-700"}>{ingredient}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <p className="font-bold text-lg">{drink.price} kr</p>
            <img
                className="max-w-[200px]"
                src={`${drink.imageUrl}/preview`}
                onLoad={onImageLoad} />
            <p>thecocktaildb id: {drink.id}</p>
        </div>
    )
}

