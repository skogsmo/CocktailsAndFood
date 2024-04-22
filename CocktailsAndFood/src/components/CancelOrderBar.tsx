import { useNavigate } from "react-router-dom";
import { ActionType, useOrderContext } from "../context/Context";

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
    <div className="bg-white sticky bottom-0 w-full text-center overflow-hidden shadow-custom-big mt-[75px]">
      <button onClick={handleClick} className="font-semibold py-[45px]">
        X Avbryt Beställning
      </button>
    </div>
  );
};
