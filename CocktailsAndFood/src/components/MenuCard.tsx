import { useNavigate } from "react-router-dom";
import { Meal } from "../orderTypes";
import { CartModifiers } from "../App";

export const MenuCard = ({
  meal,
  createOrder,
}: {
  meal: Meal;
  createOrder: CartModifiers["createOrder"];
}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    createOrder(meal);
    navigate(`/detail`);
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
            className="my-2 bg-yellow-400"
            onClick={handleClick}
          >
            Välj
          </button>
        </div>
      </div>
    </>
  );
};
