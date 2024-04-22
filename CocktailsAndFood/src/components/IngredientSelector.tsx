import { ActionType, useOrderContext } from "../context/Context";
import { Order } from "../orderTypes";

export default function IngredientSelector() {
    const { dispatch, currentOrder } = useOrderContext();

    const toggleIngredient = (ingredientName: string) => {
        const updatedOrder: Order = {
            ...currentOrder,
            Meal: {
                ...currentOrder.Meal,
                ingredients: currentOrder.Meal.ingredients.map((i) =>
                    i.Name === ingredientName
                        ? { ...i, IsIncluded: !i.IsIncluded }
                        : { ...i }
                ),
            },
        };

        dispatch({
            type: ActionType.UPDATE_ORDER,
            payload: updatedOrder,
        });
    };

    return (
        <>
            {currentOrder.Meal.ingredients.map((item) => (
                <label
                    key={item.Name}
                    htmlFor={`${item.Name}-checkbox`}
                    className="flex justify-between p-4 rounded-xl border-2 border-neutral-300 items-center gap-2 hover:bg-neutral-100 cursor-pointer">
                    <div className="flex gap-2 text-xs flex-wrap text-nowrap select-none capitalize">
                        {item.Name}
                    </div>

                    <input
                        id={`${item.Name}-checkbox`}
                        type="checkbox"
                        name={item.Name}
                        value={item.Name}
                        checked={item.IsIncluded}
                        onChange={(e) => toggleIngredient(e.target.value)}
                        className="size-6 flex-shrink-0 cursor-pointer"
                    />
                </label>
            ))}
        </>
    );
}
