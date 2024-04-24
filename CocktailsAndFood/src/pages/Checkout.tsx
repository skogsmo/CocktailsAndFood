import { Order } from "../orderTypes";
import StandardButton from "../components/StandardButton";
import { ActionType, useOrderContext } from "../context/Context";
import { useEffect } from "react";
import BigWhiteBox from "../layout_components/BigWhiteBox";
import BigWhiteBoxSection from "../layout_components/BigWhiteBoxSection";
import BigWhiteBoxDivider from "../layout_components/BigWhiteBoxDivider";

export const Checkout = () => {
    const { state, dispatch } = useOrderContext();
    const totalPrice = state.orders.reduce(
        (total, order) => total + calculateOrderSum(order),
        0
    );

    useEffect(() => {
        // Code credit: Claes Wikman et al.
        state.orders.forEach((order) => {
            if (order.Cocktail === undefined) {
                dispatch({
                    type: ActionType.REMOVE_ORDER,
                    payload: order.OrderId,
                });
            }
        });
        // Code credit end
    }, []);

    const mappedOrders = state.orders.map((o) => {
        const excludedIngredients = o.Meal.ingredients.filter(
            (i) => !i.IsIncluded
        );
        return (
            <>
                <BigWhiteBoxSection>
                    <li key={o.OrderId} className="list-none">
                        <div className="flex gap-8">
                            <div className="-mx-3 -mt-2">
                                <button
                                    onClick={() =>
                                        dispatch({
                                            type: ActionType.REMOVE_ORDER,
                                            payload: o.OrderId,
                                        })
                                    }
                                    className="group size-10 flex items-center justify-center">
                                    <div className="border border-neutral-300 border-solid rounded-full p-1 size-6 flex items-center justify-center group-hover:bg-neutral-100 group-hover:border-neutral-400">
                                        <i className="fa-solid fa-xmark text-neutral-600"></i>
                                    </div>
                                </button>
                            </div>

                            <div className="flex flex-row gap-[20px] shrink-0">
                                <img
                                    className="object-cover size-[200px] rounded-[25px]"
                                    src={o.Meal.imageUrl}
                                    alt="meal image"
                                />
                                <img
                                    className="object-cover size-[200px] rounded-[25px]"
                                    src={o.Cocktail?.ImgUrl}
                                    alt="meal image"
                                />
                            </div>

                            <div className="flex flex-col grow justify-between">
                                <div>
                                    <div className="flex justify-between text-lg font-semibold">
                                        <h6>{o.Meal.title}</h6>
                                        <span>{o.Meal.price} kr</span>
                                    </div>

                                    {o.Meal.ingredients.some(
                                        (i) => !i.IsIncluded
                                    ) && (
                                        <p className="font-medium text-sm pr-12">
                                            Bortvalt:
                                            {excludedIngredients.map(
                                                (i, index) => (
                                                    <span
                                                        key={i.Name}
                                                        className="font-normal pl-[3px]">
                                                        {i.Name +
                                                            (index !=
                                                            excludedIngredients.length -
                                                                1
                                                                ? ","
                                                                : "")}
                                                    </span>
                                                )
                                            )}
                                        </p>
                                    )}

                                    <div className="text-base pt-2">
                                        <div className="flex justify-between">
                                            <p>{o.Protein?.Name}</p>
                                            <span>{o.Protein?.Price} kr</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <p>{o.Side?.Name}</p>
                                            <span>{o.Side?.Price} kr</span>
                                        </div>
                                    </div>
                                    <div className="text-lg font-semibold flex justify-between pt-2">
                                        <h6>{o.Cocktail?.CocktailName}</h6>
                                        <span>{o.Cocktail?.Price} kr</span>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-end leading-none -mb-[2px]">
                                        <p className="text-lg font-bold">
                                            <span className="pr-[10px]">
                                                Pris:
                                            </span>{" "}
                                            {calculateOrderSum(o)} kr
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                </BigWhiteBoxSection>
                <BigWhiteBoxDivider />
            </>
        );
    });

    const handleClick = () => {
        if (totalPrice) {
            window.location.href =
                "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
        }
    };

    return (
        <>
            <div className="main-wrapper">
                <h2 className="mb-[50px] uppercase">Din Varukorg</h2>
                {totalPrice > 0 ? (
                    <BigWhiteBox>
                        {mappedOrders}
                        <BigWhiteBoxSection>
                            <div className="flex justify-end">
                                <h3 className="text-xl font-bold flex gap-4">
                                    <span>Totalt: </span>
                                    <span>{totalPrice} kr</span>
                                </h3>
                            </div>
                        </BigWhiteBoxSection>
                        <BigWhiteBoxDivider />
                        <BigWhiteBoxSection>
                            <div className="flex justify-between">
                                <StandardButton to="/menu">
                                    Beställa mer
                                </StandardButton>

                                <StandardButton
                                    onClick={handleClick}
                                    yellow={true}>
                                    Slutför order
                                </StandardButton>
                            </div>
                        </BigWhiteBoxSection>
                    </BigWhiteBox>
                ) : (
                    <BigWhiteBox>
                        <BigWhiteBoxSection>
                            <div className="text-center text-xl">
                                Din varukorg är tom
                            </div>
                        </BigWhiteBoxSection>
                        <BigWhiteBoxDivider />
                        <BigWhiteBoxSection>
                            <div className="flex justify-center">
                                <StandardButton to="/menu" yellow>
                                    Beställ mat
                                </StandardButton>                               
                            </div>
                        </BigWhiteBoxSection>
                    </BigWhiteBox>
                )}
            </div>
        </>
    );
};

export const calculateOrderSum = (order: Order): number => {
    let sum = 0;
    sum += order.Meal.price;
    sum += order.Protein?.Price ?? 0;
    sum += order.Side?.Price ?? 0;
    sum += order.Cocktail?.Price ?? 0;

    return sum;
};
