import { Order } from "../orderTypes";
import StandardButton from "../components/StandardButton";
import { ActionType, useOrderContext } from "../context/Context";

export const Checkout = () => {
  const { state, dispatch } = useOrderContext();
  const totalPrice = state.orders.reduce(
    (total, order) => total + calculateOrderSum(order),
    0
  );

  const mappedOrders = state.orders.map((o) => {
    return (
      <li key={o.OrderId}>
        <div className="flex flex-row justify-between gap-[30px] pt-[50px] pb-[35px]">
          <div className="">
            <button
              onClick={() =>
                dispatch({
                  type: ActionType.REMOVE_ORDER,
                  payload: o.OrderId,
                })
              }
              className="border border-solid rounded-full p-1 w-[30px] ml-[30px]"
            >
              X
            </button>
          </div>

          <div className="flex flex-row gap-[20px] h-[200px] w-[200px] pr-[8px]">
            <img
              className="object-cover"
              src={o.Meal.imageUrl}
              alt="meal image"
            />
            <img
              className="object-cover"
              src={o.Cocktail?.ImgUrl}
              alt="meal image"
            />
          </div>

          <div className="pl-[30px]">
            <h4>
              {o.Meal.title} ({o.Meal.price} kr)
            </h4>
            <p className="text-xs font-bold pt-[15px]">{o.Meal.description}</p>
            <p className="text-xs pt-[15px]">
              <span className="font-bold">Protein:</span> {o.Protein?.Name} (
              {o.Protein?.Price} kr)
            </p>
            <p className="text-xs">
              <span className="font-bold">Sidotillbehör:</span> {o.Side?.Name} (
              {o.Side?.Price} kr)
            </p>
            <p className="text-xs">
              <span className="font-bold">Cocktail:</span>{" "}
              {o.Cocktail?.CocktailName} ({o.Cocktail?.Price} kr)
            </p>
            <h3 className="">{calculateOrderSum(o).toFixed(2)} kr</h3>
          </div>
        </div>
        <hr className="border-neutral-300 border-t mt-[50px] mb-[35px]" />
      </li>
    );
  });

  const handleClick = () => {
    if (totalPrice) {
      window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    }
  };

  return (
    <div className="main-wrapper">
      <h2 className="mb-[50px] uppercase">Din Varukorg</h2>
      <div className="w-full md:rounded-[25px] overflow-hidden bg-white shadow-custom-big">
        <ul>{mappedOrders}</ul>
        <p className="text-xl font-bold">
          Totalt: <span className="text-end">{totalPrice} kr</span>
        </p>
        <hr className="border-neutral-300 border-t mt-[50px] mb-[35px]" />
        <div className="flex justify-between ">
          <StandardButton to="/menu">Beställa mer</StandardButton>

          <StandardButton onClick={handleClick} yellow={true}>
            Slutför order
          </StandardButton>
        </div>
      </div>
    </div>
  );
};

const calculateOrderSum = (order: Order): number => {
  let sum = 0;
  sum += order.Meal.price;
  sum += order.Protein?.Price ?? 0;
  sum += order.Side?.Price ?? 0;
  sum += order.Cocktail?.Price ?? 0;

  return sum;
};
