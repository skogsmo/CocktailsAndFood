import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { Welcome } from "./pages/Welcome";
import { Menu } from "./pages/Menu";
import { NavButton } from "./components/NavButton";
import Detail from "./pages/Detail";
import { useEffect, useState } from "react";
import { Meal, Order } from "./orderTypes";
import { DrinkSelection } from "./pages/DrinkSelection";

export type CartModifiers = {
  createOrder: (meal: Meal) => void;
  updateOrder: (updatedOrder: Order) => void;
  removeCurrentOrder: () => void;
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
    setOrders([...orders.filter((order) => order !== currentOrder)]);
  }

  const currentOrder = orders[orders.length - 1];

  const detailComponent = (
    <Detail
      updateOrder={updateOrder}
      currentOrder={currentOrder}
      removeOrder={removeCurrentOrder}
    />
  );

  const drinkSelectionComponent = (
    <DrinkSelection currentOrder={currentOrder} />
  );

  const redirectComponent = <Navigate to="/menu" replace />;

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
      </ul>
      <Routes>
        <Route path="/*" element={redirectComponent} />
        <Route path="/" element={<Welcome />} />
        <Route path="/menu" element={<Menu createOrder={createOrder} />} />
        <Route
          path="/detail"
          element={currentOrder ? detailComponent : redirectComponent}
        />
        <Route
          path="/drinkselection"
          element={currentOrder ? drinkSelectionComponent : redirectComponent}
        />
      </Routes>
    </>
  );
}

export default App;
