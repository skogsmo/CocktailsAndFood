import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Welcome } from "./pages/Welcome";
import { Menu } from "./pages/Menu";
import Detail from "./pages/Detail";
import { Meal, Order } from "./orderTypes";
import { DrinkSelection } from "./pages/DrinkSelection";
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
    return (
        <Routes>
            <Route path="/*" element={<NotFound />} />
            <Route path="/" element={<Welcome />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/drinklist" element={<DrinkList />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/detail" element={<Detail />} />
            <Route path="/drinkselection" element={<DrinkSelection />} />
        </Routes>
    );
}

export default App;
