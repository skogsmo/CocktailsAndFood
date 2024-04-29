import { useOrderContext } from "../context/OrderContext";
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
                to="/checkout"
                className="shadow-custom-big w-fit">
                <div className="flex items-center gap-4">
                    <i className="fa-solid fa-cart-shopping text-xl"></i>
                    <span>{totalPrice} kr</span>
                </div>
            </StandardButton>
        </>
    );
};