import { Meal } from "../orderTypes";

export const MenuCard = ({
  meal,
  setOrders,
}: {
  meal: Meal;
  setOrders: (meal: Meal) => void;
}) => {
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
            onClick={() => setOrders(meal)}
          >
            Välj
          </button>
        </div>
      </div>
    </>
  );
};
