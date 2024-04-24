import { Order } from "../orderTypes";
import StandardButton from "../components/StandardButton";
import { ActionType, useOrderContext } from "../context/Context";
import { Fragment, useEffect } from "react";
import BigWhiteBox from "../layout_components/BigWhiteBox";
import BigWhiteBoxSection from "../layout_components/BigWhiteBoxSection";
import BigWhiteBoxDivider from "../layout_components/BigWhiteBoxDivider";
import StandardHeader from "../layout_components/StandardHeader";

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
            <Fragment key={o.OrderId}>
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
                                    <div className="border-2 border-neutral-300 rounded-full p-1 size-6 flex items-center justify-center group-hover:border-neutral-400">
                                        <i className="fa-solid fa-xmark text-neutral-500 group-hover:text-neutral-600"></i>
                                    </div>
                                </button>
                            </div>

                            <div className="flex flex-row gap-4 shrink-0 overflow-hidden">
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
                                    <div className="flex gap-3 justify-between text-lg font-semibold">
                                        <h6 className="font-bold">
                                            {o.Meal.title}
                                        </h6>
                                        <div className="h-[20px] border-b-2 border-dotted border-white grow"></div>
                                        <span>{o.Meal.price} kr</span>
                                    </div>

                                    <div className="pl-3">
                                        {o.Meal.ingredients.some(
                                            (i) => !i.IsIncluded
                                        ) && (
                                            <p className="font-semibold text-sm pt-1 pr-12 w-[85%]">
                                                <span>Bortvalt: </span>
                                                {excludedIngredients.map(
                                                    (i, index) => (
                                                        <span
                                                            key={i.Name}
                                                            className="font-medium">
                                                            {i.Name +
                                                                (index !=
                                                                excludedIngredients.length -
                                                                    1
                                                                    ? ", "
                                                                    : "")}
                                                        </span>
                                                    )
                                                )}
                                            </p>
                                        )}

                                        <div className="text-base pt-2">
                                            <div className="flex gap-3 justify-between text-nowrap">
                                                <p>{o.Protein?.Name}</p>
                                                <div className="h-[17px] border-b-2 border-dotted border-white grow"></div>
                                                <span>
                                                    {o.Protein?.Price} kr
                                                </span>
                                            </div>
                                            <div className="flex gap-3 justify-between text-nowrap">
                                                <p>{o.Side?.Name}</p>
                                                <div className="h-[17px] border-b-2 border-dotted border-white grow"></div>
                                                <span>{o.Side?.Price} kr</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-lg font-semibold flex gap-3 justify-between text-nowrap pt-2">
                                        <h6 className="font-bold">
                                            {o.Cocktail?.CocktailName}
                                        </h6>
                                        <div className="h-[20px] border-b-2 border-dotted border-white grow"></div>
                                        <span>{o.Cocktail?.Price} kr</span>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex gap-2 justify-end leading-none mt-2 -mb-[6px]">
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
            </Fragment>
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
            <StandardHeader head={"Din Varukorg"} />
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
                                Beställ mer
                            </StandardButton>

                            <StandardButton onClick={handleClick} yellow={true}>
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
