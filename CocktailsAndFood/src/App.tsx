import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Welcome } from "./pages/Welcome";
import { Menu } from "./pages/Menu";
import { NavButton } from "./components/NavButton";
import Detail from "./pages/Detail";
import { useEffect, useState } from "react";
import { Meal, Order } from "./orderTypes";

export type CartModifiers = {
  createOrder: (meal: Meal) => void;
  updateOrder: (updatedOrder: Order) => void;
  removeCurrentOrder: () => void;
}

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
            order.Side?.Name
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

  function removeCurrentOrder(): void {
    orders.pop();
    setOrders([...orders]);
  }

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
          <NavButton param={"detail"}>Detail</NavButton>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/menu" element={<Menu createOrder={createOrder} />} />
        <Route
          path="/detail"
          element={
            <Detail
              updateOrder={updateOrder}
              currentOrder={orders[orders.length - 1]}
              removeOrder={removeCurrentOrder}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
