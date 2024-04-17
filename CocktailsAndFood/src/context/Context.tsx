import React, {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import { Meal, Order } from "../orderTypes";

export type OrderContextType = {
    orders: Order[];
    setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
    createOrder: (meal: Meal) => void;
    updateOrder: (updatedOrder: Order) => void;
    removeOrder: (orderId: number) => void;
    currentOrder: Order;
    isOrdersEmpty: boolean;
};


export const OrderContext = createContext<OrderContextType | undefined>(
    undefined
);

export const useOrderContext = () => {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error("OrderContext was null");
    }
    return context;
};

export const OrderContextProvider = ({ children }: { children: ReactNode }) => {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        console.log(
            "orders: " +
                orders.map(
                    (order) =>
                        "\n  order " +
                        order.OrderId +
                        "\n    meal: " +
                        order.Meal.title +
                        "\n    protein: " +
                        order.Protein?.Name +
                        "\n    side: " +
                        order.Side?.Name +
                        "\n    cocktail: " +
                        order.Cocktail?.CocktailName
                )
        );
    }, [orders]);

    function createOrder(meal: Meal): void {
        console.log("Creating new order with title " + meal.title);
        const newOrder: Order = {
            OrderId:
                orders.length === 0
                    ? 1
                    : Math.max(...orders.map((order) => order.OrderId)) + 1,
            Meal: meal,
        };
        setOrders([...orders, newOrder]);
    }

    function updateOrder(updatedOrder: Order) {
        setOrders((prevOrders) =>
            prevOrders.map((order) => {
                if (updatedOrder.OrderId === order.OrderId) {
                    return updatedOrder;
                } else {
                    return order;
                }
            })
        );
    }

    function removeOrder(orderId: number) {
        setOrders([...orders.filter((o) => o.OrderId !== orderId)]);
    }

    const currentOrder = orders[orders.length - 1];
    const isOrdersEmpty = orders.length < 1;

    return (
        <OrderContext.Provider
            value={{
                orders,
                setOrders,
                createOrder,
                updateOrder,
                removeOrder,
                currentOrder,
                isOrdersEmpty
            }}>
            {children}
        </OrderContext.Provider>
    );
};
