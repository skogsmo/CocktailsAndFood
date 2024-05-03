import { useNavigate } from "react-router-dom";
import { ActionType, useOrderContext } from "../context/OrderContext";
import { Order } from "../orderTypes";
import { useDataContext } from "../context/DataContext";

export const RecommendedOrder = () => {
    const { state, dispatch } = useOrderContext();
    const { getMenu, getCocktail } = useDataContext();

    const navigate = useNavigate();

    const handleClick = async () => {
        const menu = await getMenu();
        const cocktail = await getCocktail("13847");

        const meal = menu.find((m) => m._id === "66016db329f983c33c7c866e");

        if (!meal) return;

        const order: Order = {
            OrderId:
                state.orders.length === 0
                    ? 1
                    : Math.max(...state.orders.map((order) => order.OrderId)) +
                      1,
            Meal: meal,
            Cocktail: cocktail,
            Protein: { Id: 1, Name: "Chipotlegrillad kyckling", Price: 5 },
            Side: { Id: 1, Name: "Ris", Price: 15 },
        };
        dispatch({
            type: ActionType.CREATE_RECOMMENDED_ORDER,
            payload: order,
        });

        navigate("/checkout");
    };

    return (
        <>
            <button onClick={handleClick}>
                <img
                    className="size-56"
                    src="/img/chefs-choice-logo.png"
                    alt=""
                />
                <h3 className="text-center py-2 font-ultra tracking-wider">
                    KOCKENS VAL
                </h3>
            </button>
        </>
    );
};
