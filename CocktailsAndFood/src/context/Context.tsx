import React, {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useReducer,
} from "react";
import { DrinkInfo, Extra, Meal, Order } from "../orderTypes";

export type OrderContextType = {
    currentOrder: Order;
    isOrdersEmpty: boolean;
    state: OrderState;
    dispatch: React.Dispatch<Action>;
};

interface OrderState {
    orders: Order[];
    drinksInfo: DrinkInfo[];
    proteinOptions: Extra[];
    sideOptions: Extra[];
}

type Action =
    | CreateOrderAction
    | RemoveOrderAction
    | UpdateOrderAction
    | SetDrinkInfo
    | SetProteinOptions
    | SetSideOptions;

export enum ActionType {
    CREATE_ORDER,
    REMOVE_ORDER,
    UPDATE_ORDER,
    SET_DRINK_INFO,
    SET_PROTEIN_OPTIONS,
    SET_SIDE_OPTIONS,
}

interface CreateOrderAction {
    type: ActionType.CREATE_ORDER;
    payload: Meal;
}

interface RemoveOrderAction {
    type: ActionType.REMOVE_ORDER;
    payload: number;
}

interface UpdateOrderAction {
    type: ActionType.UPDATE_ORDER;
    payload: Order;
}

interface SetDrinkInfo {
    type: ActionType.SET_DRINK_INFO;
    payload: DrinkInfo[];
}

interface SetProteinOptions {
    type: ActionType.SET_PROTEIN_OPTIONS;
    payload: Extra[];
}

interface SetSideOptions {
    type: ActionType.SET_SIDE_OPTIONS;
    payload: Extra[];
}

const initialState: OrderState = {
    orders: [],
    drinksInfo: [],
    proteinOptions: [],
    sideOptions: [],
};

const orderReducer = (state: OrderState, action: Action): OrderState => {
    switch (action.type) {
        case ActionType.CREATE_ORDER:
            // eslint-disable-next-line no-case-declarations
            const newOrder: Order = {
                OrderId:
                    state.orders.length === 0
                        ? 1
                        : Math.max(
                              ...state.orders.map((order) => order.OrderId)
                          ) + 1,
                Meal: action.payload,
            };
            return {
                ...state,
                orders: [...state.orders, newOrder],
            };
        case ActionType.REMOVE_ORDER:
            return {
                ...state,
                orders: [
                    ...state.orders.filter((o) => o.OrderId !== action.payload),
                ],
            };
        case ActionType.SET_DRINK_INFO:
            return {
                ...state,
                drinksInfo: [...action.payload],
            };
        case ActionType.SET_PROTEIN_OPTIONS:
            return {
                ...state,
                proteinOptions: [...action.payload],
            };
        case ActionType.SET_SIDE_OPTIONS:
            return {
                ...state,
                sideOptions: [...action.payload],
            };
        case ActionType.UPDATE_ORDER:
            return {
                ...state,
                orders: state.orders.map((order) => {
                    if (action.payload.OrderId === order.OrderId) {
                        return action.payload;
                    } else {
                        return order;
                    }
                }),
            };
        default:
            return state;
    }
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
    const [state, dispatch] = useReducer(orderReducer, initialState);

    useEffect(() => {
        console.log(
            "orders: " +
                state.orders
                    .map(
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
                            order.Cocktail?.CocktailName +
                            (order.Meal.ingredients.some((i) => !i.IsIncluded)
                                ? "\n    excluded ingredients: " +
                                  order.Meal.ingredients
                                      .filter((i) => !i.IsIncluded)
                                      .map((i) => "\n      " + i.Name)
                                      .join("")
                                : "")
                    )
                    .join("")
        );
    }, [state.orders]);

    useEffect(() => {
        console.log("drinkinfo: ", state.drinksInfo);
    }, [state.drinksInfo]);

    useEffect(() => {
        fetch("data/drink-info.json")
            .then((response) => response.json())
            .then((data: DrinkInfo[]) =>
                dispatch({ type: ActionType.SET_DRINK_INFO, payload: data })
            );
        fetch("data/proteins.json")
            .then((response) => response.json())
            .then((data: Extra[]) =>
                dispatch({ type: ActionType.SET_PROTEIN_OPTIONS, payload: data })
            );
        fetch("data/sides.json")
            .then((response) => response.json())
            .then((data: Extra[]) =>
                dispatch({ type: ActionType.SET_SIDE_OPTIONS, payload: data })
            );
        console.log("fetched drinkinfo");
    }, []);

    const currentOrder = state.orders[state.orders.length - 1];
    const isOrdersEmpty = state.orders.length < 1;

    return (
        <OrderContext.Provider
            value={{
                state,
                dispatch,
                currentOrder,
                isOrdersEmpty,
            }}>
            {children}
        </OrderContext.Provider>
    );
};
