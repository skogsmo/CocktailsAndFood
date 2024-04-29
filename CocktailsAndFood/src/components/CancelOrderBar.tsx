import { useNavigate } from "react-router-dom";
import { ActionType, useOrderContext } from "../context/OrderContext";
import { CancelPopup } from "./CancelPopUp";
import { useState } from "react";

export const CancelOrderBar = () => {
    const { state, dispatch } = useOrderContext();
    const [isPopupOpen, togglePopup] = useState<boolean>(false);
    
    const navigate = useNavigate();

    
    function toggle(){
        togglePopup(!isPopupOpen)
    };

    function handleClick() {
        state.orders.forEach((o: { OrderId: number }) =>
            dispatch({
                type: ActionType.REMOVE_ORDER,
                payload: o.OrderId,
            })
        );
        toggle()
        navigate("/");
    }

    return (
        <>
            <CancelPopup isPopupOpen={isPopupOpen} submit={handleClick} closePopup={toggle} />
            
            <div className="bg-white w-full shadow-custom-big border-t border-neutral-200 flex justify-center">
                <button onClick={toggle} className="font-semibold leading-none p-[40px] text-sm">
                    <div className="flex gap-3 items-center">
                        <i className="fa-solid fa-xmark"></i>
                        <span>Avbryt beställning</span>
                    </div>
                </button>
            </div>
        </>
    );
};