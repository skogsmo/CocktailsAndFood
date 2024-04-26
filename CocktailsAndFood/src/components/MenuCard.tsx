import { useNavigate } from "react-router-dom";
import { Meal } from "../orderTypes";
import { ActionType, useOrderContext } from "../context/OrderContext";
import StandardButton from "./StandardButton";
import { SpicyChilis } from "./SpicyChilis";
export const MenuCard = ({ meal }: { meal: Meal }) => {
    const navigate = useNavigate();

    const { dispatch } = useOrderContext();

    const handleClick = () => {
        dispatch({ type: ActionType.CREATE_ORDER, payload: meal });
        navigate("/detail");
    };

    return (
        <>
            <div className="flex bg-white md:rounded-2xl shadow-custom-big overflow-hidden h-full">
                <div className="w-1/3 h-full">
                    <img
                        src={meal.imageUrl}
                        className="h-full object-cover object-[0%_50%] w-full"
                    />
                </div>
                <div className="flex flex-col justify-between gap-4 w-2/3 p-8 pt-7">
                    <div className="flex flex-col gap-1">
                        <div>
                            <h4 className="font-bold leading-tight -my-1">
                                {meal.title}
                            </h4>
                            <div className="flex gap-3 items-center">
                                <p className="font-semibold my-2 text-sm">
                                    {meal.price.toFixed(2)} kr
                                </p>
                                <SpicyChilis spiciness={meal.spiciness}/>
                            </div>
                        </div>
                        <p className="text-xs">{meal.description}</p>
                    </div>
                    <StandardButton onClick={handleClick} yellow small>
                        Välj
                    </StandardButton>
                </div>
            </div>
        </>
    );
};
