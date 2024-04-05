import { useNavigate } from "react-router-dom";
import { Meal, Order } from "../orderTypes";
import { useState } from "react";

export const MenuCard = ({
  meal,
  createOrder,
  currentOrders,
}: {
  meal: Meal;
  createOrder: (meal: Meal, newId: number) => number;
  currentOrders: Order[];
}) => {
  // const [newOrderId, setNewOrderId] = useState(0);
  const navigate = useNavigate();
  const handleClick = () => {
    const newId = currentOrders.length ? currentOrders.length + 1 : 1;
    createOrder(meal, newId);
    navigate(`/detail/${newId}`);
  };
  return (
    <>
      <div className="flex">
        <div className="">
          <img src={meal.imageUrl} className="rounded-lg" />
        </div>
        <div className="flex flex-col justify-center mx-4">
          <p className="font-bold my-2">{meal.title}</p>
          <p className="font-medium my-2">{meal.price.toFixed(2)}</p>
          <p className="my-2">{meal.description}</p>
          <button
            className="my-2 text-black bg-yellow-400"
            onClick={handleClick}
          >
            Välj
          </button>
        </div>
      </div>
    </>
  );
};
