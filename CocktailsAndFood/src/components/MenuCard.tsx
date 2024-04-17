import { useNavigate } from "react-router-dom";
import { Meal } from "../orderTypes";
import {
    useOrderContext,
} from "../context/Context";
export const MenuCard = ({
    meal
}: {
    meal: Meal;
    }) => {
    const navigate = useNavigate();

    const { createOrder } = useOrderContext();

    const handleClick = () => {
        createOrder(meal);
        navigate("/detail");
    };
    return (
        <>
            <div className="flex bg-white md:rounded-2xl shadow-custom-big overflow-hidden h-full">
                <div className="w-1/3 h-full">
                    <img
                        src={meal.imageUrl}
                        className="h-full object-cover object-[35%_50%] w-full"
                    />
                </div>
                <div className="flex flex-col justify-between gap-4 w-2/3 p-8 pt-7">
                    <div className="flex flex-col gap-1">
                        <div>
                            <h4 className="font-bold leading-[0.5]">
                                {meal.title}
                            </h4>
                            <p className="font-semibold my-2 text-sm">
                                {meal.price.toFixed(2)} kr
                            </p>
                        </div>
                        <p className="text-xs">{meal.description}</p>
                    </div>
                    <button
                        className="bg-yellow-400 hover:bg-yellow-300 rounded-3xl w-full self-center py-2 text-sm font-semibold"
                        onClick={handleClick}>
                        Välj
                    </button>
                </div>
            </div>
        </>
    );
};
