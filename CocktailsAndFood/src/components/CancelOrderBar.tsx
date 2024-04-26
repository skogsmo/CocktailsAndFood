import { useNavigate } from "react-router-dom";
import { ActionType, useOrderContext } from "../context/OrderContext";

export const CancelOrderBar = () => {
    const { state, dispatch } = useOrderContext();
    const navigate = useNavigate();

    function handleClick() {
        state.orders.forEach((o: { OrderId: number }) =>
            dispatch({
                type: ActionType.REMOVE_ORDER,
                payload: o.OrderId,
            })
        );
        navigate("/");
    }
    return (
        <div className="bg-white w-full shadow-custom-big border-t border-neutral-200 flex justify-center">
            <button onClick={handleClick} className="font-semibold leading-none p-[40px] text-sm">
                <div className="flex gap-3 items-center">
                    <i className="fa-solid fa-xmark"></i>
                    <span>Avbryt beställning</span>
                </div>
            </button>
        </div>
    );
};