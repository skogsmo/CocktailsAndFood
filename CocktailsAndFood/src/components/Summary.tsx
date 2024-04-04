import { Fragment, useContext } from "react";
import { CartContext, CartContextType } from "../contexts/CartContext";
import MealSummary from "./MealSummary";
import { getMealTotalPrice } from "../types/Meal";
import { Link, Navigate } from "react-router-dom";

export default function Summary() {

    const { getFinalizedMeals, removeMeal, emptyCart } = useContext(CartContext) as CartContextType;

    const meals = getFinalizedMeals();

    if (meals.length < 1) return <Navigate to="/menu" />;

    const totalPrice = meals.reduce((total, meal) => total + getMealTotalPrice(meal), 0);

    const handlePayClick = () => {
        alert("Du har betalat!");
    }

    return (
        <div className="flex flex-col lg:flex-row justify-center w-full min-h-screen bg-slate-100">
            <div className="w-full bg-white flex justify-center items-end lg:justify-end shadow-md flex-grow">
                <div className="flex flex-col justify-center min-w-[300px] lg:min-w-[600px] max-w-[650px] py-16 min-h-full">
                    <div className="lg:border-l border-slate-300 px-8 flex flex-col gap-12">
                        {meals.map((meal) => (
                            <Fragment key={meal.id}>
                                <MealSummary meal={meal} onRemove={() => removeMeal(meal.id)} />
                                {meal !== meals[meals.length - 1] &&
                                    <hr className="border-t-2 border-slate-300 border-dotted" />
                                }
                            </Fragment>
                        ))}
                    </div>
                </div>
            </div>
            <div className="w-full text-slate-800 flex justify-center lg:justify-start flex-grow">
                <div className="lg:m-0 flex justify-center lg:items-center items-start w-full min-h-64 lg:h-screen max-w-[500px]">
                    <div className="lg:fixed my-16 flex flex-col items-center text-center gap-4 text-nowrap">
                        <div>
                            <h2 className="text-2xl font-bold">Att betala: </h2>
                            <p className="text-xl font-bold">{totalPrice} kr</p>
                        </div>
                        <Link to="/menu">
                            <button className="w-full py-2 px-4 rounded-full bg-lime-500 hover:bg-lime-400 font-bold text-white hover:shadow-inner">
                                Lägg till måltid
                            </button>
                        </Link>
                        <button onClick={handlePayClick} className="w-full py-2 px-4 rounded-full bg-amber-500 hover:bg-amber-400 font-bold text-white hover:shadow-inner">
                            Betala
                        </button>
                        <button onClick={emptyCart} className="w-full font-semibold text-slate-500 hover:text-slate-600 hover:bg-slate-200 rounded-full px-4 py-2">
                            Töm kundvagn
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}