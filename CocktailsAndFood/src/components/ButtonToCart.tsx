import { useOrderContext } from "../context/Context";
import { Order } from "../orderTypes";
import { calculateOrderSum } from "../pages/Checkout";
import StandardButton from "./StandardButton";

export const ButtonToCart = () => {
    const { state } = useOrderContext();
    const filteredOrders = state.orders.filter((o) => o.Cocktail !== undefined);
    const totalPrice = filteredOrders.reduce(
        (total: number, o: Order) => total + calculateOrderSum(o),
        0
    );

    return (
        <>
            <StandardButton
                yellow
                noFixedWidth
                to="/checkout"
                className="">
                <div className="flex items-center gap-4 px-8">
                    <i className="fa-solid fa-cart-shopping text-xl"></i>
                    <span>{totalPrice} kr</span>
                </div>
            </StandardButton>
        </>
    );
};
