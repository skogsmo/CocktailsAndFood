import { Order } from "../orderTypes";
import StandardButton from "../components/StandardButton";
import { ActionType, useOrderContext } from "../context/Context";

export const Checkout = () => {
  const { state, dispatch } = useOrderContext();
  const totalPrice = state.orders.reduce(
    (total, order) => total + calculateOrderSum(order),
    0
  );

  state.orders.forEach((order) => {
    if (order.Cocktail === undefined) {
      dispatch({
        type: ActionType.REMOVE_ORDER,
        payload: order.OrderId,
      });
    }
  });

  const mappedOrders = state.orders.map((o) => {
    return (
      <li key={o.OrderId}>
        <div className="flex">
          <div className="w-[90px] pt-[50px]">
            <button
              onClick={() =>
                dispatch({
                  type: ActionType.REMOVE_ORDER,
                  payload: o.OrderId,
                })
              }
              className="border border-solid md:rounded-full p-1 w-[30px]"
            >
              X
            </button>
          </div>
          <div className="pt-[50px]">
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
          </div>
          <div className="w-[250px]">
            <h3 className="pr-[30px] pl-[60px] pt-[50px]">
              {calculateOrderSum(o).toFixed(2)} kr
            </h3>
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
      <h2 className="mb-[50px]">Din Varukorg</h2>
      <div className="w-full md:rounded-[25px] overflow-hidden bg-white shadow-custom-big p-[30px]">
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

export const calculateOrderSum = (order: Order): number => {
  let sum = 0;
  sum += order.Meal.price;
  sum += order.Protein?.Price ?? 0;
  sum += order.Side?.Price ?? 0;
  sum += order.Cocktail?.Price ?? 0;

  return sum;
};
