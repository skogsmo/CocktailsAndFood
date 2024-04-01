import { Meal } from "../types/Meal";

type MealSummaryProps = {
    meal: Meal;
    onRemove: (mealId: string) => void;
}

export default function MealSummary({ meal, onRemove }: MealSummaryProps) {

    const handleRemoveClick = () => {
        onRemove(meal.id);
    };

    return (
        <>
            {meal.drink && meal.carb && meal.protein &&
                <div className="flex flex-col gap-4 text-slate-700">
                    <div className="flex gap-4 flex-col sm:flex-row">
                        <img src={meal.food.imageUrl} className="object-cover max-h-44 sm:max-h-full sm:w-40 shadow" />
                        <div className="flex flex-col gap-2 justify-between w-full">
                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between items-baseline">
                                    <h3 className="font-bold text-xl">{meal.food.title}</h3>
                                    <p className="font-semibold text-lg text-nowrap">{meal.food.price} kr</p>
                                </div>
                                <p className="text-slate-600 leading-tight">{meal.food.description}</p>
                                <h4 className="font-bold">Tillval:</h4>
                                <div>
                                    <div className="flex justify-between">
                                        <p>{meal.protein.name}</p>
                                        <p className="font-semibold">{meal.protein.price} kr</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p>{meal.carb.name}</p>
                                        <p className="font-semibold">{meal.carb.price} kr</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="flex gap-4">
                        <img src={`${meal.drink.imageUrl}/preview`} className="object-cover min-h-full w-40 shadow" />
                        <div className="flex flex-col gap-2 justify-between w-full">
                            <div className="leading-tight flex flex-col gap-2">
                                <div className="flex justify-between items-baseline">
                                    <h3 className="font-bold text-xl">{meal.drink.name}</h3>
                                    <p className="font-semibold text-end text-lg text-nowrap">{meal.drink.price} kr</p>
                                </div>
                                <h4 className="font-bold">Ingredienser:</h4>
                                <ul className="list-disc">
                                    {meal.drink.ingredients?.map((ingredient, index) => (
                                        <li key={index} className="ml-6">
                                            <span className="">{ingredient}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between items-baseline">
                        <button onClick={handleRemoveClick} className="font-semibold text-slate-500 hover:text-slate-700">Ta bort måltid</button>
                        <p className="font-bold text-xl"><span className="font-semibold">Pris: </span>
                            {
                                meal.food.price +
                                meal.protein.price +
                                meal.carb.price +
                                (meal.drink.price ? meal.drink.price : 0)
                            }
                            <span> kr</span>
                        </p>
                    </div>
                </div>
            }
        </>
    )
};