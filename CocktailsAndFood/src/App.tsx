import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Welcome } from "./pages/Welcome";
import { Menu } from "./pages/Menu";
import { NavButton } from "./components/NavButton";
import Detail from "./pages/Detail";
import { useState } from "react";
import { Order } from "./orderTypes";

function App() {
  const [orders, setOrders] = useState<Order[]>([]);

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
        <Route path="/menu" element={<Menu />} />
        <Route path="/detail" element={<Detail />} />
      </Routes>
    </>
  );
}

export default App;
