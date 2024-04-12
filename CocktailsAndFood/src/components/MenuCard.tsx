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
      <div className="flex bg-white rounded-2xl h-48 shadow-md">
        <div className=" w-1/3 h-full">
          <img
            src={meal.imageUrl}
            className="rounded-lg h-full object-cover w-full"
          />
        </div>
        <div className="flex flex-col justify-center mx-4 w-2/3 py-4">
          <h4 className="font-bold mt-6">{meal.title}</h4>
          <p className="font-medium my-2 text-sm">{meal.price.toFixed(2)}</p>
          <p className="my-2 text-xs">{meal.description}</p>
          <button
            className="my-2 bg-yellow-400 rounded-3xl w-5/6 self-center py-2 text-sm font-bold mb-8"
            onClick={handleClick}
          >
            Välj
          </button>
        </div>
      </div>
    </>
  );
};
