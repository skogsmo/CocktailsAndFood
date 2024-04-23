import { Order } from "../orderTypes";
import StandardButton from "../components/StandardButton";
import { ActionType, useOrderContext } from "../context/Context";
import { useEffect } from "react";

export const Checkout = () => {
  const { state, dispatch } = useOrderContext();
  const totalPrice = state.orders.reduce(
    (total, order) => total + calculateOrderSum(order),
    0
  );

  useEffect(() => {
    // Code credit: Claes Wikman et al.
    state.orders.forEach((order) => {
      if (order.Cocktail === undefined) {
        dispatch({
          type: ActionType.REMOVE_ORDER,
          payload: order.OrderId,
        });
      }
    });
    // Code credit end
  }, []);

  const mappedOrders = state.orders.map((o) => {
    return (
      <li key={o.OrderId}>
        <div className="flex flex-row gap-[30px] pt-[50px] pb-[35px]">
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

          <div className="flex flex-row gap-[20px] shrink-0">
            <img
              className="object-cover size-[200px] rounded-[25px]"
              src={o.Meal.imageUrl}
              alt="meal image"
            />
            <img
              className="object-cover size-[200px] rounded-[25px]"
              src={o.Cocktail?.ImgUrl}
              alt="meal image"
            />
          </div>

          <div className="flex flex-col grow mr-[30px] justify-between">
            <div>
              <div className="flex justify-between">
                <h5>{o.Meal.title}</h5>
                <span className="font-bold">{o.Meal.price} kr</span>
              </div>

              <p className="font-bold py-[5px]">
                Bortvalt:
                {o.Meal.ingredients.map((i) => {
                  return !i.IsIncluded ? (
                    <span className="font-normal pl-[3px]">{i.Name}</span>
                  ) : (
                    ""
                  );
                })}
              </p>

              <div className="flex justify-between">
                <p>{o.Protein?.Name}</p>
                <span>{o.Protein?.Price} kr</span>
              </div>

              <div className="flex justify-between">
                <p>{o.Side?.Name}</p>
                <span>{o.Side?.Price} kr</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between">
                <h5 className="font-bold pb-[20px]">
                  {o.Cocktail?.CocktailName}
                </h5>
                <span className="font-bold">{o.Cocktail?.Price} kr</span>
              </div>
              <div className="flex justify-end">
                <h4>
                  <span className="pr-[10px]">Pris:</span>{" "}
                  {calculateOrderSum(o).toFixed(2)} kr
                </h4>
              </div>
            </div>
          </div>
        </div>
        <hr className="border-neutral-300 border-t mb-[35px]" />
      </li>
    );
  });

  const handleClick = () => {
    if (totalPrice) {
      window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    }
  };

  return (
    <>
      <div className="main-wrapper">
        <h2 className="mb-[50px] uppercase">Din Varukorg</h2>
        <div className="w-full md:rounded-[25px] overflow-hidden bg-white shadow-custom-big">
          <ul>{mappedOrders}</ul>
          <div className="flex justify-end">
            <h3 className="text-xl font-bold px-[15px]">
              <span className="pr-[10px]">Totalt: </span>
              {totalPrice} kr
            </h3>
          </div>
          <hr className="border-neutral-300 border-t mt-[35px] mb-[35px]" />
          <div className="flex justify-between mb-[35px] mx-[35px]">
            <StandardButton to="/menu">Beställa mer</StandardButton>

            <StandardButton onClick={handleClick} yellow={true}>
              Slutför order
            </StandardButton>
          </div>
        </div>
      </div>
    </>
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
