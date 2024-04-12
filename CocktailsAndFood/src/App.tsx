import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Welcome } from "./pages/Welcome";
import { Menu } from "./pages/Menu";
import { NavButton } from "./components/NavButton";
import Detail from "./pages/Detail";
import { useEffect, useState } from "react";
import { Meal, Order } from "./orderTypes";
import { DrinkSelection } from "./pages/DrinkSelection";
import { ConditionalRoute } from "./components/ConditionalRoute";
import { NotFound } from "./pages/NotFound";
import { Checkout } from "./pages/Checkout";
import { DrinkList } from "./pages/DrinkList";

export type CartModifiers = {
  createOrder: (meal: Meal) => void;
  updateOrder: (updatedOrder: Order) => void;
  removeCurrentOrder: () => void;
  removeOrder: (orderId: number) => void;
};

function App() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    console.log(
      "orders: " +
        orders.map(
          (order) =>
            "\n  order " +
            order.OrderId +
            "\n    meal: " +
            order.Meal.title +
            "\n    protein: " +
            order.Protein?.Name +
            "\n    side: " +
            order.Side?.Name +
            "\n    cocktail: " +
            order.Cocktail?.CocktailName
        )
    );
  }, [orders]);

  function createOrder(meal: Meal): void {
    console.log("Creating new order with title " + meal.title);
    const newOrder: Order = {
      OrderId:
        orders.length === 0
          ? 1
          : Math.max(...orders.map((order) => order.OrderId)) + 1,
      Meal: meal,
    };
    setOrders([...orders, newOrder]);
  }

  function updateOrder(updatedOrder: Order) {
    setOrders((prevOrders) =>
      prevOrders.map((order) => {
        if (updatedOrder.OrderId === order.OrderId) {
          return updatedOrder;
        } else {
          return order;
        }
      })
    );
  }

  function removeOrder(orderId: number) {
    setOrders([...orders.filter((o) => o.OrderId !== orderId)]);
  }

  function removeCurrentOrder(): void {
    setOrders([...orders.filter((order) => order !== currentOrder)]);
  }

  const currentOrder = orders[orders.length - 1];

  return (
    <>
      <ul>
        <li>
          <NavButton param={""}>Hem</NavButton>
        </li>
        <li>
          <NavButton param={"menu"}>Menu</NavButton>
        </li>
        <li>
          <NavButton param={"drinkselection"}>Drink selection</NavButton>
        </li>
        <li>
          <NavButton param={"checkout"}>Checkout</NavButton>
        </li>
      </ul>
      <Routes>
        <Route path="/*" element={<NotFound />} />
        <Route path="/" element={<Welcome />} />
        <Route path="/menu" element={<Menu createOrder={createOrder} />} />
        <Route path="/drinklist" element={<DrinkList currentOrder={currentOrder} updateOrder={updateOrder}/>} />
        <Route
          path="/checkout"
          element={<Checkout orders={orders} removeOrder={removeOrder} />}
        />
        {ConditionalRoute({
          path: "/detail",
          checkIfTrue: currentOrder,
          elementIfTrue: (
            <Detail
              updateOrder={updateOrder}
              currentOrder={currentOrder}
              removeOrder={removeCurrentOrder}
            />
          ),
          navigateIfFalse: "/menu",
        })}
        {ConditionalRoute({
          path: "/drinkselection",
          checkIfTrue: currentOrder,
          elementIfTrue: (
            <DrinkSelection
              currentOrder={currentOrder}
              updateOrder={updateOrder}
            />
          ),
          navigateIfFalse: "/menu",
        })}
      </Routes>
    </>
  );
}

export default App;
