import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Welcome } from "./pages/Welcome";
import { Menu } from "./pages/Menu";
import { NavButton } from "./components/NavButton";
import Detail from "./pages/Detail";
import { useState } from "react";
import { Meal, Order } from "./orderTypes";

function App() {
  const [orders, setOrders] = useState<Order[]>([]);

  function createOrder(meal: Meal, newId: number): number {
    console.log(
      "Creating new order with title " + meal.title + " and id " + newId
    );
    const newOrder: Order = {
      OrderId: newId,
      Meal: meal,
    };
    setOrders([...orders, newOrder]);

    return newOrder.OrderId;
  }

  // function updateOrder(updatedOrder: Order) {
  //   setOrders((prevOrders) =>
  //     prevOrders.map((order) => {
  //       if (updatedOrder.OrderId === order.OrderId) {
  //         return updatedOrder;
  //       } else {
  //         return order;
  //       }
  //     })
  //   );
  // }

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
        <Route
          path="/menu"
          element={<Menu createOrder={createOrder} currentOrders={orders} />}
        />
        <Route
          path="/detail/:id"
          element={<Detail updateOrder={updateOrder} />}
        />
      </Routes>
    </>
  );
}

export default App;
