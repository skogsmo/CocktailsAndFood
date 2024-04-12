import { Link, useNavigate } from "react-router-dom";
import { CartModifiers } from "../App";
import { Order } from "../orderTypes";

export const Checkout = ({
  orders,
  removeOrder,
}: {
  orders: Order[];
  removeOrder: CartModifiers["removeOrder"];
}) => {
  
  const navigate = useNavigate();
  const totalPrice = orders.reduce(
    (total, order) => total + calculateOrderSum(order),
    0
  );

  const mappedOrders = orders.map((o) => {
    return (
      <li key={o.OrderId}>
        <button onClick={() => removeOrder(o.OrderId)}>x</button>
        <h2>
          {o.Meal.title} ({o.Meal.price} kr)
        </h2>
        <p>{o.Meal.description}</p>
        <p>
          Protein: {o.Protein?.Name} ({o.Protein?.Price} kr)
        </p>
        <p>
          Sidotillbehör: {o.Side?.Name} ({o.Side?.Price} kr)
        </p>
        <p>
          Cocktail: {o.Cocktail?.CocktailName} ({o.Cocktail?.Price} kr)
        </p>
        <span>{calculateOrderSum(o).toFixed(2)} kr</span>
      </li>
    );
  });

  const handleClick = () => {
    if (totalPrice){
      window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    }
  }

  const buttonClass = totalPrice ? "text-neutral-900" : "text-neutral-500 cursor-default";

  return (
    <>
      <h1>Din Varukorg</h1>
      <ul>{mappedOrders}</ul>
      <p className="text-xl font-bold">
        Totalt: <span className="text-end">{totalPrice} kr</span>
      </p>
      <Link to="/menu" className="bg-yellow-400">Beställa mer</Link>
      <button className={buttonClass} onClick={handleClick}>Slutför order</button>
      
    </>
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
