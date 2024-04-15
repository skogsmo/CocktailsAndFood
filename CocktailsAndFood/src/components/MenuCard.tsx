import { useNavigate } from "react-router-dom";
import { Meal, Order } from "../orderTypes";
import { CartModifiers } from "../App";
import { OrderContext, useOrders } from "../context/Context";
import { useContext } from "react";

export const MenuCard = ({
  meal,
  createOrder,
}: {
  meal: Meal;
  createOrder: CartModifiers["createOrder"];
}) => {
  const navigate = useNavigate();

  const [orders, setOrders] = useOrders();

  const handleClick = () => {
    // createOrder(meal);
    const newOrder: Order = {
      OrderId:
        orders.length === 0
          ? 1
          : Math.max(...orders.map((order) => order.OrderId)) + 1,
      Meal: meal,
    };
    setOrders([...orders, newOrder]);
    navigate(`/detail`);
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
              <h4 className="font-bold leading-[0.5]">{meal.title}</h4>
              <p className="font-semibold my-2 text-sm">
                {meal.price.toFixed(2)} kr
              </p>
            </div>
            <p className="text-xs">{meal.description}</p>
          </div>
          <button
            className="bg-yellow-400 hover:bg-yellow-300 rounded-3xl w-full self-center py-2 text-sm font-semibold"
            onClick={handleClick}
          >
            Välj
          </button>
        </div>
      </div>
    </>
  );
};
